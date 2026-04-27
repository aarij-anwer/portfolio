import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { unstable_noStore as noStore } from 'next/cache';
import {
  ResumeContact,
  ResumeTextSegment,
  ResumeCompetency,
  ResumeExperience,
  ResumeEducation,
  ParsedResume,
} from '@/lib/types';
import { defaultResume } from '@/lib/default-resume';

// Re-export types for backward compatibility
export type {
  ResumeContact,
  ResumeTextSegment,
  ResumeCompetency,
  ResumeExperience,
  ResumeEducation,
  ParsedResume,
};

type LatexCommand = {
  args: string[];
  start: number;
  end: number;
};

const competencyIcons: Record<string, string> = {
  'Engineering Leadership': 'psychology',
  Languages: 'code',
  'Frameworks & Libraries': 'layers',
  'Architecture & Systems': 'architecture',
  'Reliability & Operations': 'monitoring',
  'Cloud & DevOps': 'cloud',
  'ML & AI': 'generative_ai',
};

const resumeTexPath = path.join(process.cwd(), 'public', 'resume.tex');
const resumePdfPath = path.join(
  process.cwd(),
  'public',
  'Muhammad_Anwer_Resume.pdf'
);

function findMatchingBrace(input: string, openIndex: number) {
  let depth = 0;

  for (let index = openIndex; index < input.length; index += 1) {
    if (input[index] === '\\' && index + 1 < input.length) {
      index += 1;
      continue;
    }

    if (input[index] === '{') {
      depth += 1;
    }

    if (input[index] === '}') {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

function readBraceGroup(input: string, openIndex: number) {
  const closeIndex = findMatchingBrace(input, openIndex);

  if (closeIndex === -1) {
    return null;
  }

  return {
    value: input.slice(openIndex + 1, closeIndex),
    end: closeIndex + 1,
  };
}

function readCommandArgs(
  input: string,
  command: string,
  start: number
): LatexCommand | null {
  let commandStart = input.indexOf(`\\${command}`, start);

  while (commandStart !== -1) {
    const nextCharacter = input[commandStart + command.length + 1];

    if (!nextCharacter || !/[A-Za-z]/.test(nextCharacter)) {
      break;
    }

    commandStart = input.indexOf(`\\${command}`, commandStart + 1);
  }

  if (commandStart === -1) {
    return null;
  }

  const args: string[] = [];
  let cursor = commandStart + command.length + 1;

  while (input[cursor] && /\s/.test(input[cursor])) {
    cursor += 1;
  }

  while (input[cursor] === '{') {
    const group = readBraceGroup(input, cursor);

    if (!group) {
      break;
    }

    args.push(group.value);
    cursor = group.end;

    while (input[cursor] && /\s/.test(input[cursor])) {
      cursor += 1;
    }
  }

  return {
    args,
    start: commandStart,
    end: cursor,
  };
}

function readAllCommands(input: string, command: string) {
  const commands: LatexCommand[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    const nextCommand = readCommandArgs(input, command, cursor);

    if (!nextCommand) {
      break;
    }

    commands.push(nextCommand);
    cursor = nextCommand.end;
  }

  return commands;
}

function getSection(input: string, name: string) {
  const sectionStart = input.indexOf(`\\section{${name}}`);

  if (sectionStart === -1) {
    return '';
  }

  const nextSection = input.indexOf('\\section{', sectionStart + 1);

  return input.slice(
    sectionStart,
    nextSection === -1 ? undefined : nextSection
  );
}

function appendSegment(
  segments: ResumeTextSegment[],
  text: string,
  marks: Omit<ResumeTextSegment, 'text'>
) {
  if (!text) {
    return;
  }

  const lastSegment = segments[segments.length - 1];

  if (
    lastSegment &&
    lastSegment.bold === marks.bold &&
    lastSegment.italic === marks.italic
  ) {
    lastSegment.text += text;
    return;
  }

  segments.push({ text, ...marks });
}

function readCommandGroupAt(input: string, command: string, start: number) {
  const prefix = `\\${command}`;

  if (!input.startsWith(prefix, start)) {
    return null;
  }

  let cursor = start + prefix.length;

  while (input[cursor] && /\s/.test(input[cursor])) {
    cursor += 1;
  }

  if (input[cursor] !== '{') {
    return null;
  }

  return readBraceGroup(input, cursor);
}

function normalizeSegments(segments: ResumeTextSegment[]) {
  return segments
    .map((segment) => ({
      ...segment,
      text: segment.text
        .replace(/---/g, '-')
        .replace(/--/g, '-')
        .replace(/–/g, '-')
        .replace(/~/g, ' ')
        .replace(/\s+/g, ' '),
    }))
    .filter((segment) => segment.text.length > 0)
    .map((segment, index, allSegments) => ({
      ...segment,
      text:
        index === 0
          ? segment.text.trimStart()
          : index === allSegments.length - 1
            ? segment.text.trimEnd()
            : segment.text,
    }))
    .filter((segment) => segment.text.length > 0);
}

function parseLatexInline(
  input: string,
  marks: Omit<ResumeTextSegment, 'text'> = {}
): ResumeTextSegment[] {
  const source = input.replace(/%.*$/gm, '');
  const segments: ResumeTextSegment[] = [];
  let cursor = 0;

  while (cursor < source.length) {
    const boldGroup = readCommandGroupAt(source, 'textbf', cursor);

    if (boldGroup) {
      parseLatexInline(boldGroup.value, { ...marks, bold: true }).forEach(
        (segment) => segments.push(segment)
      );
      cursor = boldGroup.end;
      continue;
    }

    const italicGroup = readCommandGroupAt(source, 'textit', cursor);

    if (italicGroup) {
      parseLatexInline(italicGroup.value, { ...marks, italic: true }).forEach(
        (segment) => segments.push(segment)
      );
      cursor = italicGroup.end;
      continue;
    }

    const smallGroup = readCommandGroupAt(source, 'small', cursor);

    if (smallGroup) {
      parseLatexInline(smallGroup.value, marks).forEach((segment) =>
        segments.push(segment)
      );
      cursor = smallGroup.end;
      continue;
    }

    if (source.startsWith('\\href', cursor)) {
      const hrefGroup = readCommandGroupAt(source, 'href', cursor);

      if (hrefGroup && source[hrefGroup.end] === '{') {
        const labelGroup = readBraceGroup(source, hrefGroup.end);

        if (labelGroup) {
          parseLatexInline(labelGroup.value, marks).forEach((segment) =>
            segments.push(segment)
          );
          cursor = labelGroup.end;
          continue;
        }
      }
    }

    if (source.startsWith('\\textasciitilde{}', cursor)) {
      appendSegment(segments, '~', marks);
      cursor += '\\textasciitilde{}'.length;
      continue;
    }

    if (source.startsWith('\\\\', cursor)) {
      appendSegment(segments, ' ', marks);
      cursor += 2;
      continue;
    }

    if (source.startsWith('\\&', cursor)) {
      appendSegment(segments, '&', marks);
      cursor += 2;
      continue;
    }

    if (source.startsWith('\\%', cursor)) {
      appendSegment(segments, '%', marks);
      cursor += 2;
      continue;
    }

    const commandMatch = source
      .slice(cursor)
      .match(/^\\(?:small|scshape|Huge|fa[A-Za-z]+)/);

    if (commandMatch) {
      cursor += commandMatch[0].length;
      continue;
    }

    if (source[cursor] === '{' || source[cursor] === '}') {
      cursor += 1;
      continue;
    }

    appendSegment(segments, source[cursor], marks);
    cursor += 1;
  }

  return normalizeSegments(segments);
}

function textFromSegments(segments: ResumeTextSegment[]) {
  return segments
    .map((segment) => segment.text)
    .join('')
    .trim();
}

function decodeLatex(input: string) {
  return textFromSegments(parseLatexInline(input));
}

function getHref(input: string) {
  const match = input.match(/\\href\{([^{}]+)\}/);
  return match?.[1];
}

function parseHeading(input: string) {
  const centerMatch = input.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/);
  const heading = centerMatch?.[1] ?? '';
  const lines = heading
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const name = decodeLatex(lines[0] ?? 'Muhammad Anwer')
    .replace(/\\\\.*$/, '')
    .trim();
  const contactLine = lines.slice(1).join(' ');
  const contactParts = contactLine
    .split(/\$\\mid\$/)
    .map((part) => part.replace(/^\\;|\\;$/g, '').trim())
    .filter(Boolean);

  const contact = contactParts.map((part) => {
    const label = decodeLatex(part);
    const href = getHref(part);

    if (part.includes('faPhone')) {
      return { label, icon: 'phone' };
    }

    if (part.includes('faEnvelope')) {
      return { label, href, icon: 'mail' };
    }

    if (part.includes('faLinkedin')) {
      return { label, href, icon: 'open_in_new' };
    }

    if (part.includes('faGithub')) {
      return { label, href, icon: 'open_in_new' };
    }

    return { label, href, icon: 'open_in_new' };
  });

  return { name, contact };
}

function parseCompetencies(input: string) {
  return readAllCommands(
    getSection(input, 'Core Competencies'),
    'resumeItem'
  ).map((item) => {
    const raw = item.args[0] ?? '';
    const decoded = decodeLatex(raw);
    const [label = 'Competency', ...valueParts] = decoded.split(':');
    const normalizedLabel = label.trim();
    const rawValue = raw.replace(/^\\textbf\{[^{}]+\}\s*:\s*/, '');

    return {
      label: normalizedLabel,
      value: parseLatexInline(rawValue || valueParts.join(':').trim()),
      icon: competencyIcons[normalizedLabel] ?? 'code',
    };
  });
}

function parseExperience(input: string) {
  const section = getSection(input, 'Professional Experience');
  const headings = readAllCommands(section, 'resumeSubheading');

  return headings.map((heading, index) => {
    const nextHeading = headings[index + 1];
    const body = section.slice(heading.end, nextHeading?.start);
    const [role = '', dates = '', company = '', location = ''] =
      heading.args.map(decodeLatex);
    const bullets = readAllCommands(body, 'resumeItem').map((item) =>
      parseLatexInline(item.args[0] ?? '')
    );

    return {
      role,
      companyLine: [company, location, dates].filter(Boolean).join(' | '),
      bullets,
      current: /present/i.test(dates),
    };
  });
}

function parseEducation(input: string) {
  const section = getSection(input, 'Education');

  return readAllCommands(section, 'resumeSubheading').map((heading) => {
    const [school = '', dates = '', credential = '', location = ''] =
      heading.args.map(decodeLatex);

    return {
      school,
      credential,
      details: [location, dates].filter(Boolean).join(' | '),
    };
  });
}

function parseInterests(input: string) {
  return readAllCommands(
    getSection(input, 'Interests \\& Affiliations'),
    'resumeItem'
  ).map((item) => decodeLatex(item.args[0] ?? ''));
}

export async function getResumeFromTex(): Promise<ParsedResume> {
  noStore();

  try {
    const tex = await readFile(resumeTexPath, 'utf8');
    const heading = parseHeading(tex);

    return {
      name: heading.name,
      contact: heading.contact,
      competencies: parseCompetencies(tex),
      experience: parseExperience(tex),
      education: parseEducation(tex),
      interests: parseInterests(tex),
    };
  } catch {
    return defaultResume;
  }
}

export async function hasResumePdf() {
  noStore();

  try {
    await access(resumePdfPath);
    return true;
  } catch {
    return false;
  }
}
