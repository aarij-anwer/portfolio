import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseResumeTex } from './parse-resume-tex';
import type { ResumeTextSegment } from './types';

const realSource = readFileSync(new URL('../../public/resume.tex', import.meta.url), 'utf8');

const text = (segments: ResumeTextSegment[]) => segments.map((segment) => segment.text).join('');

/** Smallest resume the parser accepts, with one experience bullet to poke at. */
const minimalResume = (bullet: string, extra = '') => String.raw`
\begin{center}
  {\Huge \scshape Test Person} \\
  \href{mailto:test@example.com}{test@example.com}
\end{center}
% web:headline Engineer
% web:summary A summary.
${extra}
\section{Professional Experience}
  \resumeSubheading{Engineer}{Jan 2020 -- Present}{Acme}{Remote}
    \resumeItemListStart
      \resumeItem{${bullet}}
    \resumeItemListEnd
`;

const firstBullet = (bullet: string) =>
  text(parseResumeTex(minimalResume(bullet)).experience[0].bullets[0]);

describe('parseResumeTex on the real resume.tex', () => {
  const resume = parseResumeTex(realSource);

  it('finds the fields the site depends on', () => {
    expect(resume.name).not.toBe('');
    expect(resume.email).toMatch(/^[^@\s]+@[^@\s]+$/);
    expect(resume.contact.some((item) => item.kind === 'email')).toBe(true);
    expect(resume.summary.headline).not.toBe('');
    expect(resume.summary.paragraphs.length).toBeGreaterThan(0);
    expect(resume.competencies.length).toBeGreaterThan(0);
    expect(resume.education.length).toBeGreaterThan(0);
  });

  it('has Recent Wins, which CI and llms.txt require', () => {
    expect(resume.wins.length).toBeGreaterThan(0);
    for (const win of resume.wins) {
      expect(win.stat && win.title && win.description).toBeTruthy();
    }
  });

  it('parses every job with dates and bullets', () => {
    expect(resume.experience.length).toBeGreaterThan(0);
    for (const job of resume.experience) {
      expect(job.role).not.toBe('');
      expect(job.company).not.toBe('');
      expect(job.startDate).not.toBe('');
      expect(job.bullets.length).toBeGreaterThan(0);
    }
  });

  it('leaks no raw LaTeX into any parsed string', () => {
    const leaks: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === 'string') {
        if (/[\\${}]/.test(value)) leaks.push(`${path}: ${value}`);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => walk(item, `${path}[${index}]`));
      } else if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key, item]) => walk(item, `${path}.${key}`));
      }
    };
    walk(resume, 'resume');
    expect(leaks).toEqual([]);
  });
});

describe('inline decoding', () => {
  it.each([
    ['0$\\to$1', '0→1'],
    ['0$\\rightarrow$1', '0→1'],
    ['R\\&D', 'R&D'],
    ['40\\% faster', '40% faster'],
    ['a $\\mid$ b', 'a | b'],
    ['a~b', 'a b'],
    ['\\textasciitilde{}10 users', '~10 users'],
    ['\\~10 users', '~10 users'],
    ['2019 -- 2021', '2019 - 2021'],
    ['a  \n  b', 'a b'],
  ])('%s -> %s', (input, expected) => {
    expect(firstBullet(input)).toBe(expected);
  });

  it('keeps bold and italic styling', () => {
    const [bullet] = parseResumeTex(minimalResume('\\textbf{Bold}: plain \\textit{slanted}')).experience[0].bullets;
    expect(bullet).toEqual([
      { text: 'Bold', bold: true },
      { text: ': plain ' },
      { text: 'slanted', italic: true },
    ]);
  });
});

describe('unsupported LaTeX', () => {
  it.each([
    ['unknown math symbol', '$\\leftarrow$', '$\\leftarrow$'],
    ['unknown command', 'See \\textsc{Acme}', '\\textsc'],
    ['unsupported escape', 'C\\# developer', '\\#'],
    ['stray dollar sign', 'costs $5', '$5'],
    ['leftover group braces', 'a {b} c', '{'],
  ])('fails on %s', (_name, bullet, token) => {
    expect(() => parseResumeTex(minimalResume(bullet))).toThrow(token);
  });

  it('reports the line it first appears on', () => {
    const source = minimalResume('plain text') + '\n';
    const bad = source.replace('plain text', 'before $\\leftarrow$ after');
    const line = bad.slice(0, bad.indexOf('$\\leftarrow$')).split('\n').length;
    expect(() => parseResumeTex(bad)).toThrow(`line ${line}`);
  });

  it('fails in web:win lines too', () => {
    const extra = '% web:win 5\\% | Title | Uses \\unknown{x}';
    expect(() => parseResumeTex(minimalResume('ok', extra))).toThrow('\\unknown');
  });
});

describe('structure errors', () => {
  it('requires the Professional Experience section', () => {
    const source = minimalResume('ok').replace('Professional Experience', 'Work');
    expect(() => parseResumeTex(source)).toThrow('Professional Experience');
  });

  it('requires a web headline and summary', () => {
    const source = minimalResume('ok').replace(/^% web:.*$/gm, '');
    expect(() => parseResumeTex(source)).toThrow('website summary');
  });

  it('rejects malformed web:win lines', () => {
    expect(() => parseResumeTex(minimalResume('ok', '% web:win only | two'))).toThrow('web:win');
    expect(() => parseResumeTex(minimalResume('ok', '% web:win 1 | t | d | not-a-link'))).toThrow('link');
  });

  it('parses a valid web:win line', () => {
    const { wins } = parseResumeTex(minimalResume('ok', '% web:win 40\\% | Faster | Cut load time | /projects'));
    expect(wins).toEqual([{ stat: '40%', title: 'Faster', description: 'Cut load time', href: '/projects' }]);
  });
});
