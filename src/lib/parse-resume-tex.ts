import type { ParsedResume, ResumeContact, ResumeSummary, ResumeTextSegment } from '@/lib/types';

const iconByCompetency: Record<string, string> = {
  'Engineering Leadership': 'psychology',
  Languages: 'code',
  'Frameworks & Libraries': 'layers',
  'Architecture & Systems': 'architecture',
  'Reliability & Operations': 'monitoring',
  'Cloud & DevOps': 'cloud',
  'AI in Practice': 'generative_ai',
  'AI in Practice (Daily)': 'generative_ai',
  'Stakeholder & Delivery': 'psychology',
};

type MacroMatch = { args: string[]; end: number; start: number };
type Style = Pick<ResumeTextSegment, 'bold' | 'italic'>;

const decodeInline = (value: string) =>
  value
    .replace(/\$\\to\$/g, '→')
    .replace(/\\textasciitilde\{\}/g, '%%TILDE%%')
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\~/g, '%%TILDE%%')
    .replace(/\$\\mid\$/g, '|')
    .replace(/\\;/g, '')
    .replace(/\\,/g, '')
    .replace(/~+/g, ' ')
    .replace(/%%TILDE%%/g, '~')
    .replace(/[–—‑]/g, '-')
    .replace(/\s*--\s*/g, ' - ')
    .replace(/\s+/g, ' ');

const decodeLatex = (value: string) => decodeInline(value).trim();

const mergeSegment = (segments: ResumeTextSegment[], text: string, style: Style) => {
  const decoded = decodeInline(text);
  if (!decoded) return;
  const previous = segments[segments.length - 1];
  if (previous && previous.bold === style.bold && previous.italic === style.italic) {
    previous.text += decoded;
    return;
  }
  segments.push({ text: decoded, ...style });
};

const readGroup = (source: string, openIndex: number) => {
  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) {
      return { value: source.slice(openIndex + 1, index), end: index + 1 };
    }
  }
  throw new Error('Unclosed LaTeX group');
};

const readMacroAt = (source: string, start: number, name: string, args: number) => {
  let cursor = start + name.length + 1;
  const values: string[] = [];
  while (values.length < args) {
    while (/\s/.test(source[cursor])) cursor += 1;
    if (source[cursor] !== '{') throw new Error(`Expected argument for ${name}`);
    const group = readGroup(source, cursor);
    values.push(group.value);
    cursor = group.end;
  }
  return { args: values, end: cursor, start };
};

const collectMacro = (source: string, name: string, args: number): MacroMatch[] => {
  const matches: MacroMatch[] = [];
  const pattern = `\\${name}`;
  let cursor = 0;
  while (cursor < source.length) {
    const start = source.indexOf(pattern, cursor);
    if (start === -1) break;
    const next = source[start + pattern.length];
    if (next && /[A-Za-z]/.test(next)) {
      cursor = start + pattern.length;
      continue;
    }
    let firstArg = start + pattern.length;
    while (/\s/.test(source[firstArg])) firstArg += 1;
    if (source[firstArg] !== '{') {
      cursor = start + pattern.length;
      continue;
    }
    const match = readMacroAt(source, start, name, args);
    matches.push(match);
    cursor = match.end;
  }
  return matches;
};

const parseInline = (source: string, style: Style = {}): ResumeTextSegment[] => {
  const segments: ResumeTextSegment[] = [];
  let cursor = 0;
  while (cursor < source.length) {
    const next = source.slice(cursor).search(/\\(?:textbf|textit|texttt|emph|underline|href|fa[A-Za-z]+)/);
    if (next === -1) {
      mergeSegment(segments, source.slice(cursor), style);
      break;
    }
    const start = cursor + next;
    mergeSegment(segments, source.slice(cursor, start), style);
    if (source.startsWith('\\textbf', start) || source.startsWith('\\textit', start)) {
      const name = source.startsWith('\\textbf', start) ? 'textbf' : 'textit';
      const match = readMacroAt(source, start, name, 1);
      segments.push(...parseInline(match.args[0], {
        ...style,
        [name === 'textbf' ? 'bold' : 'italic']: true,
      }));
      cursor = match.end;
      continue;
    }
    const plain = /^\\(texttt|emph|underline)(?![A-Za-z])/.exec(source.slice(start));
    if (plain) {
      const match = readMacroAt(source, start, plain[1], 1);
      segments.push(...parseInline(match.args[0], plain[1] === 'emph' ? { ...style, italic: true } : style));
      cursor = match.end;
      continue;
    }
    if (source.startsWith('\\href', start)) {
      const match = readMacroAt(source, start, 'href', 2);
      segments.push(...parseInline(match.args[1], style));
      cursor = match.end;
      continue;
    }
    cursor = start + /^\\fa[A-Za-z]+/.exec(source.slice(start))![0].length;
  }
  return segments;
};

const plainText = (source: string) => parseInline(source).map((part) => part.text).join('').trim();

const splitSections = (source: string) => {
  const sections = collectMacro(source, 'section', 1);
  return new Map(
    sections.map((section, index) => [
      decodeLatex(section.args[0]),
      source.slice(section.end, sections[index + 1]?.start ?? source.length),
    ]),
  );
};

const stripComments = (source: string) => source.replace(/(^|[^\\])%.*$/gm, '$1');

const contactKind = (href: string): ResumeContact['kind'] => {
  if (href.startsWith('mailto:')) return 'email';
  if (/linkedin\.com/i.test(href)) return 'linkedin';
  if (/github\.com/i.test(href)) return 'github';
  return 'link';
};

const contactIcon: Record<ResumeContact['kind'], string> = {
  location: 'location_on',
  phone: 'phone',
  email: 'mail',
  linkedin: 'open_in_new',
  github: 'open_in_new',
  link: 'open_in_new',
};

const parseContact = (source: string) => {
  const heading = stripComments(source.slice(0, source.indexOf('\\section{')));
  const name = decodeLatex(/\{\\Huge \\scshape ([^}]+)\}/.exec(heading)?.[1] ?? '');
  const location = decodeLatex(/\\faMapMarker\*?~([^$\\]+)/.exec(heading)?.[1] ?? '');
  const phone = decodeLatex(/\\faPhone~([^$]+)/.exec(heading)?.[1] ?? '');
  const links = collectMacro(heading, 'href', 2);
  const contact: ResumeContact[] = [];
  if (location) contact.push({ kind: 'location', label: location, icon: contactIcon.location });
  if (phone) contact.push({ kind: 'phone', label: phone, icon: contactIcon.phone });
  links.forEach(({ args }) => {
    const href = decodeLatex(args[0]);
    const kind = contactKind(href);
    contact.push({ kind, label: plainText(args[1]), href, icon: contactIcon[kind] });
  });
  const email = contact.find((item) => item.kind === 'email')?.href?.replace(/^mailto:/, '') ?? '';
  return { name, location, email, contact };
};

// Website-only summary, kept in resume.tex as LaTeX comments so it never
// prints in the PDF:
//   % web:headline Full-Stack Software Engineer
//   % web:summary  First hero paragraph (inline LaTeX allowed)
//   % web:summary  Second hero paragraph
const parseWebSummary = (source: string): ResumeSummary | null => {
  const lines = [...source.matchAll(/^[ \t]*%[ \t]*web:(headline|summary)[ \t]+(.+)$/gm)];
  if (!lines.length) return null;
  return {
    headline: decodeLatex(lines.find(([, key]) => key === 'headline')?.[2] ?? ''),
    paragraphs: lines
      .filter(([, key]) => key === 'summary')
      .map(([, , value]) => parseInline(value.trim()))
      .map((segments) => {
        if (segments.length) {
          segments[0].text = segments[0].text.trimStart();
          segments[segments.length - 1].text = segments[segments.length - 1].text.trimEnd();
        }
        return segments.filter((segment) => segment.text);
      })
      .filter((segments) => segments.length > 0),
  };
};

// Optional printed Summary section: `\small{ \textbf{Headline}\\ paragraph \n\n paragraph }`.
const parseSummarySection = (source: string): ResumeSummary => {
  let body = stripComments(source).trim();
  const wrapper = /^\\small\s*\{/.exec(body);
  if (wrapper) body = readGroup(body, wrapper[0].length - 1).value.trim();
  let headline = '';
  if (body.startsWith('\\textbf')) {
    const match = readMacroAt(body, 0, 'textbf', 1);
    headline = decodeLatex(match.args[0]);
    body = body.slice(match.end).replace(/^\s*\\\\(\[[^\]]*\])?/, '');
  }
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => parseInline(paragraph.replace(/\\\\/g, ' ')))
    .map((segments) => {
      if (segments.length) {
        segments[0].text = segments[0].text.trimStart();
        segments[segments.length - 1].text = segments[segments.length - 1].text.trimEnd();
      }
      return segments.filter((segment) => segment.text);
    })
    .filter((segments) => segments.length > 0);
  return { headline, paragraphs };
};

const parseCompetencies = (source = '') =>
  collectMacro(source, 'resumeItem', 1).map(({ args }) => {
    const [labelSegment, ...remaining] = parseInline(args[0]);
    const label = labelSegment.text;
    if (remaining[0]?.text.startsWith(': ')) remaining[0].text = remaining[0].text.slice(2);
    return { label, value: remaining, icon: iconByCompetency[label] ?? 'psychology' };
  });

const parseExperience = (source = '') => {
  const headings = collectMacro(source, 'resumeSubheading', 4);
  return headings.map(({ args, end }, index) => {
    const [role, date, company, location] = args.map(decodeLatex);
    const [startDate = '', endDate = ''] = args[1].split('--').map(decodeLatex);
    const body = source.slice(end, headings[index + 1]?.start ?? source.length);
    return {
      role,
      company,
      location,
      startDate,
      endDate,
      current: /Present$/.test(date) || undefined,
      bullets: collectMacro(body, 'resumeItem', 1).map((item) => parseInline(item.args[0])),
    };
  });
};

const parseEducation = (source = '') =>
  collectMacro(source, 'resumeSubheading', 4).map(({ args }) => ({
    credential: decodeLatex(args[0]),
    school: decodeLatex(args[2]),
    location: decodeLatex(args[3]),
  }));

const requireSection = (sections: Map<string, string>, name: string) => {
  const section = sections.get(name);
  if (!section) {
    throw new Error(`resume.tex is missing the required \\section{${name}}`);
  }
  return section;
};

export function parseResumeTex(source: string): ParsedResume {
  const sections = splitSections(source);
  const { name, location, email, contact } = parseContact(source);
  const summarySection = sections.get('Summary');
  const summary =
    parseWebSummary(source) ?? (summarySection ? parseSummarySection(summarySection) : null);
  if (!name) throw new Error('resume.tex: could not find the name in the heading');
  if (!summary?.headline || !summary.paragraphs.length) {
    throw new Error(
      'resume.tex needs a website summary: a "% web:headline ..." comment line plus at least one "% web:summary ..." line',
    );
  }
  return {
    name,
    location,
    email,
    contact,
    summary,
    competencies: parseCompetencies(sections.get('Core Competencies')),
    experience: parseExperience(requireSection(sections, 'Professional Experience')),
    education: parseEducation(sections.get('Education')),
    interests: collectMacro(sections.get('Interests & Affiliations') ?? '', 'resumeItem', 1).map(
      ({ args }) => plainText(args[0]),
    ),
  };
}
