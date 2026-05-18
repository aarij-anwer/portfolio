import type {
  ResumeContact,
  ResumeTextSegment,
  ResumeCompetency,
  ResumeExperience,
  ResumeEducation,
  ParsedResume,
} from '@/lib/types';
import { defaultResume } from '@/lib/default-resume';

export type {
  ResumeContact,
  ResumeTextSegment,
  ResumeCompetency,
  ResumeExperience,
  ResumeEducation,
  ParsedResume,
};

// @ts-ignore - simplified for client-side migration; LaTeX parsing removed
export async function getResumeFromTex(): Promise<ParsedResume> {
  return defaultResume;
}

// @ts-ignore - PDF is always shipped in /public for the migrated app
export async function hasResumePdf(): Promise<boolean> {
  return true;
}
