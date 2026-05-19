import type { ParsedResume, ResumeTextSegment } from '@/lib/types';

const iconByCompetency: Record<string, string> = {
  'Engineering Leadership': 'psychology',
  Languages: 'code',
  'Frameworks & Libraries': 'layers',
  'Architecture & Systems': 'architecture',
  'Reliability & Operations': 'monitoring',
  'Cloud & DevOps': 'cloud',
  'AI in Practice (Daily)': 'generative_ai',
  'Stakeholder & Delivery': 'psychology',
};

type MacroMatch = { args: string[]; end: number; start: number };
type Style = Pick<ResumeTextSegment, 'bold' | 'italic'>;

const decodeInline = (value: string) =>
  value
    .replace(/\\textasciitilde\{\}/g, '%%TILDE%%')
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\~/g, '%%TILDE%%')
    .replace(/\$\\mid\$/g, '|')
    .replace(/\\;/g, '')
    .replace(/\\,/g, '')
    .replace(/~+/g, ' ')
    .replace(/%%TILDE%%/g, '~')
    .replace(/→/g, '->')
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
    const next = source.slice(cursor).search(/\\(?:textbf|textit|href|fa[A-Za-z]+)/);
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

const parseContact = (source: string) => {
  const heading = source.slice(0, source.indexOf('\\section{'));
  const name = decodeLatex(/\{\\Huge \\scshape ([^}]+)\}/.exec(heading)?.[1] ?? '');
  const phone = decodeLatex(/\\faPhone~([^$]+)/.exec(heading)?.[1] ?? '');
  const links = collectMacro(heading, 'href', 2);
  return {
    name,
    contact: [
      { label: phone, icon: 'phone' },
      ...links.map(({ args }) => ({
        label: plainText(args[1]),
        href: decodeLatex(args[0]),
        icon: args[0].startsWith('mailto:') ? 'mail' : 'open_in_new',
      })),
    ],
  };
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
    const body = source.slice(end, headings[index + 1]?.start ?? source.length);
    return {
      role,
      companyLine: `${company} | ${location} | ${date}`,
      current: /Present$/.test(date) || undefined,
      bullets: collectMacro(body, 'resumeItem', 1).map((item) => parseInline(item.args[0])),
    };
  });
};

const parseEducation = (source = '') =>
  collectMacro(source, 'resumeSubheading', 4).map(({ args }) => ({
    school: decodeLatex(args[0]),
    credential: decodeLatex(args[2]),
    details: decodeLatex(args[3]),
  }));

export function parseResumeTex(source: string): ParsedResume {
  const sections = splitSections(source);
  const { name, contact } = parseContact(source);
  return {
    name,
    contact,
    competencies: parseCompetencies(sections.get('Core Competencies')),
    experience: parseExperience(sections.get('Professional Experience')),
    education: parseEducation(sections.get('Education')),
    interests: collectMacro(sections.get('Interests & Affiliations') ?? '', 'resumeItem', 1).map(
      ({ args }) => plainText(args[0]),
    ),
  };
}
