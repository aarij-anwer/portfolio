import type {
  ResumeContact,
  ResumeTextSegment,
  ResumeCompetency,
  ResumeExperience,
  ResumeEducation,
  ParsedResume,
} from '@/lib/types';
import { resolveResume, type ResumeLoadReport } from '@/lib/resume-fallback';
import { staticRoutes } from '@/lib/staticRoutes';
// resume.tex text (null if the file is missing) and the last-known-good
// snapshot (null if none, or if resume.tex has no errors so it isn't needed),
// provided by the resume-source plugin in vite.config.ts.
import { source as resumeTexSource, snapshot as resumeSnapshot } from 'virtual:resume-source';

declare const __RESUME_PDF_AVAILABLE__: boolean;
declare const __RESUME_STRICT__: boolean;

export type {
  ResumeContact,
  ResumeTextSegment,
  ResumeCompetency,
  ResumeExperience,
  ResumeEducation,
  ParsedResume,
  ResumeLoadReport,
};

const resolved = resolveResume(resumeTexSource, resumeSnapshot, {
  strict: __RESUME_STRICT__,
  routes: staticRoutes,
});

export const parsedResume: ParsedResume = resolved.resume;
/** What went wrong reading resume.tex, and which parts came from the snapshot. */
export const resumeLoadReport: ResumeLoadReport = resolved.report;

if (import.meta.env.DEV && resumeLoadReport.issues.length) {
  console.warn('[resume]', resumeLoadReport);
}
export const resumePdfAvailable = __RESUME_PDF_AVAILABLE__;

export function segmentsToText(segments: ResumeTextSegment[]): string {
  return segments.map((segment) => segment.text).join('').trim();
}

/** Plain-text summary paragraphs from the resume.tex Summary section. */
export const summaryParagraphs: string[] = parsedResume.summary.paragraphs.map(segmentsToText);

/** Trim text to roughly `max` characters on a word boundary (for meta descriptions). */
export function truncateText(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:]+$/, '')}…`;
}

export function contactHref(kind: ResumeContact['kind']): string | undefined {
  return parsedResume.contact.find((item) => item.kind === kind)?.href;
}
