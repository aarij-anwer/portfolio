declare module 'virtual:resume-source' {
  import type { ParsedResume } from '@/lib/types';
  /** Contents of public/resume.tex, or null if the file is missing. */
  export const source: string | null;
  /**
   * src/data/resume.snapshot.json (last-known-good parse), or null if it is
   * missing/unreadable or not needed (resume.tex parses without errors).
   */
  export const snapshot: ParsedResume | null;
}
