import type { ParsedResume, ResumeIssue } from '@/lib/types';
import { formatResumeIssue, parseResumeTexLenient } from '@/lib/parse-resume-tex';

export type ResumeLoadReport = {
  issues: ResumeIssue[];
  /** Fields taken from the last-known-good snapshot instead of resume.tex. */
  fallbackFields: (keyof ParsedResume)[];
  usedFallback: boolean;
};

type ResolveOptions = {
  /** Throw on any error instead of falling back (CI). */
  strict?: boolean;
  /** Site routes that a `web:win` link starting with "/" must match. */
  routes?: readonly string[];
};

// Fixed order, so the resolved object (and the snapshot JSON) is stable.
const resumeFields = [
  'name',
  'location',
  'email',
  'contact',
  'summary',
  'wins',
  'competencies',
  'experience',
  'education',
  'interests',
] as const satisfies readonly (keyof ParsedResume)[];

/**
 * Build the resume from resume.tex, filling any part that is missing or fails
 * to parse from the committed last-known-good snapshot.
 */
export function resolveResume(
  source: string | null,
  snapshot: ParsedResume | null,
  { strict = false, routes }: ResolveOptions = {},
): { resume: ParsedResume; report: ResumeLoadReport } {
  const { resume: parsed, issues } =
    source === null
      ? {
          resume: {} as Partial<ParsedResume>,
          issues: [
            {
              fields: [...resumeFields],
              severity: 'error',
              message: 'public/resume.tex not found',
            } satisfies ResumeIssue,
          ],
        }
      : parseResumeTexLenient(source);

  const fail = (problems: ResumeIssue[], why: string) => {
    throw new Error(`${why}:\n${problems.map((issue) => `  - ${formatResumeIssue(issue)}`).join('\n')}`);
  };

  const errors = issues.filter((issue) => issue.severity === 'error');
  if (strict && errors.length) fail(errors, 'resume.tex could not be parsed (strict mode)');

  const fallbackFields: (keyof ParsedResume)[] = [];
  const resume = {} as Record<keyof ParsedResume, unknown>;
  for (const field of resumeFields) {
    if (parsed[field] !== undefined) {
      resume[field] = parsed[field];
    } else if (snapshot?.[field] !== undefined) {
      resume[field] = snapshot[field];
      fallbackFields.push(field);
    } else {
      fail(errors, `resume.tex could not be parsed and src/data/resume.snapshot.json has no "${field}" to fall back to`);
    }
  }
  const result = resume as ParsedResume;

  // A Recent Wins card must not link to a page that doesn't exist. A #fragment
  // or ?query on a site path is fine; the path itself must be a route.
  if (routes) {
    const badLinks: ResumeIssue[] = [];
    result.wins = result.wins.map((win) => {
      if (!win.href?.startsWith('/') || routes.includes(win.href.replace(/[?#].*$/, ''))) return win;
      badLinks.push({
        fields: ['wins'],
        severity: 'error',
        message: `"web:win" card "${win.title}" links to ${win.href}, which is not a site route${strict ? '' : ' (link dropped)'}`,
      });
      const { href: _dropped, ...rest } = win;
      return rest;
    });
    if (strict && badLinks.length) fail(badLinks, 'resume.tex has broken links (strict mode)');
    issues.push(...badLinks);
  }

  return {
    resume: result,
    report: { issues, fallbackFields, usedFallback: fallbackFields.length > 0 },
  };
}
