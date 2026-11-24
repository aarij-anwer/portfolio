import type {
  ResumeContact,
  ResumeTextSegment,
  ResumeCompetency,
  ResumeExperience,
  ResumeEducation,
  ParsedResume,
} from '@/lib/types';
import { parseResumeTex } from '@/lib/parse-resume-tex';
import resumeTexSource from '../../public/resume.tex?raw';

declare const __RESUME_PDF_AVAILABLE__: boolean;

export type {
  ResumeContact,
  ResumeTextSegment,
  ResumeCompetency,
  ResumeExperience,
  ResumeEducation,
  ParsedResume,
};

export const parsedResume: ParsedResume = parseResumeTex(resumeTexSource);
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
