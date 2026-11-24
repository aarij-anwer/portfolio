import { describe, expect, it } from 'vitest';
import { parseResumeTex, parseResumeTexLenient } from '@/lib/parse-resume-tex';
import { resolveResume } from '@/lib/resume-fallback';

const valid = String.raw`\begin{center}
  {\Huge \scshape Ada Lovelace} \\
  \faMapMarker*~London \quad \href{mailto:ada@example.com}{ada@example.com}
\end{center}
% web:headline Software Engineer
% web:summary I build \textbf{reliable} systems.
% web:win 3x | Faster builds | Cut CI time by two thirds. | /projects
\section{Core Competencies}
\resumeItem{\textbf{Languages}: TypeScript, Go}
\section{Professional Experience}
\resumeSubheading{Staff Engineer}{2020 -- Present}{Analytical Co.}{London}
  \resumeItem{Led the \textbf{engine} rewrite.}
\section{Education}
\resumeSubheading{BSc Mathematics}{2010}{University}{London}
\section{Interests & Affiliations}
\resumeItem{Chess}
`;

const snapshot = parseResumeTex(valid.replace('Ada Lovelace', 'Snapshot Name').replace('Staff Engineer', 'Snapshot Role'));
const routes = ['/', '/projects', '/resume'];

describe('resume.tex fallback', () => {
  it('parses a valid resume with no issues', () => {
    const { resume, report } = resolveResume(valid, snapshot, { routes });
    expect(report.issues).toEqual([]);
    expect(report.usedFallback).toBe(false);
    expect(resume.name).toBe('Ada Lovelace');
    expect(resume.experience[0].role).toBe('Staff Engineer');
  });

  it('falls back to the snapshot for the whole resume when the file is missing', () => {
    const { resume, report } = resolveResume(null, snapshot);
    expect(resume).toEqual(snapshot);
    expect(report.issues[0].message).toMatch(/not found/);
  });

  it('falls back only for the section with an unclosed brace, and reports its line', () => {
    const broken = valid.replace('\\resumeItem{Led the \\textbf{engine} rewrite.}', '\\resumeItem{Led the \\textbf{engine rewrite.}');
    const { resume, report } = resolveResume(broken, snapshot);
    expect(report.fallbackFields).toEqual(['experience']);
    expect(resume.experience[0].role).toBe('Snapshot Role');
    expect(resume.name).toBe('Ada Lovelace');
    expect(report.issues[0].line).toBe(12);
  });

  it('falls back only for wins when a web:win line is malformed', () => {
    const broken = valid.replace('3x | Faster builds |', '3x Faster builds');
    const { resume, report } = resolveResume(broken, snapshot);
    expect(report.fallbackFields).toEqual(['wins']);
    expect(resume.wins).toEqual(snapshot.wins);
    expect(report.issues[0].line).toBe(7);
  });

  it('treats a removed optional section as empty, not as a fallback', () => {
    const noEducation = valid.replace(/\\section\{Education\}\n.*\n/, '');
    const { resume, report } = resolveResume(noEducation, snapshot);
    expect(resume.education).toEqual([]);
    expect(report.usedFallback).toBe(false);
    expect(report.issues).toEqual([expect.objectContaining({ severity: 'warning', fields: ['education'] })]);
  });

  it('falls back when the required experience section is missing', () => {
    const renamed = valid.replace('\\section{Professional Experience}', '\\section{Work}');
    expect(parseResumeTexLenient(renamed).resume.experience).toBeUndefined();
    const { resume, report: resolved } = resolveResume(renamed, snapshot);
    expect(resolved.fallbackFields).toEqual(['experience']);
    expect(resume.experience).toEqual(snapshot.experience);
  });

  it('drops a Recent Wins link to a missing route (non-strict) and throws in strict mode', () => {
    const badLink = valid.replace('| /projects', '| /nope');
    const { resume, report } = resolveResume(badLink, snapshot, { routes });
    expect(resume.wins[0].href).toBeUndefined();
    expect(report.issues[0].message).toMatch(/not a site route/);
    expect(() => resolveResume(badLink, snapshot, { routes, strict: true })).toThrow(/not a site route/);
  });

  it('throws in strict mode instead of falling back', () => {
    expect(() => resolveResume(null, snapshot, { strict: true })).toThrow(/strict mode[\s\S]*not found/);
  });

  it('throws when there is nothing to fall back to', () => {
    expect(() => resolveResume(null, null)).toThrow(/no "name" to fall back to/);
  });

  it('keeps parseResumeTex strict', () => {
    expect(() => parseResumeTex(valid.replace('{\\Huge \\scshape Ada Lovelace}', ''))).toThrow(/name/);
  });
});
