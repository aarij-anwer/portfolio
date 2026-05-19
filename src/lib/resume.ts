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

export async function getResumeFromTex(): Promise<ParsedResume> {
  return parsedResume;
}

export async function hasResumePdf(): Promise<boolean> {
  return resumePdfAvailable;
}
