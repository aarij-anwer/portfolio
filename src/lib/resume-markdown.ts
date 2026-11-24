// Machine-readable renderings of the site for AI engines and crawlers
// (llms.txt, llms-full.txt, resume.md). Everything here is derived from the
// parsed public/resume.tex plus the curated project list, and written to dist/
// by scripts/prerender.mjs.
import type { ParsedResume, ProjectSummary, ResumeTextSegment } from '@/lib/types';

const md = (segments: ResumeTextSegment[]) =>
  segments
    .map(({ text, bold, italic }) => {
      if (!text.trim()) return text;
      const lead = text.match(/^\s*/)![0];
      const trail = text.match(/\s*$/)![0];
      const core = text.trim();
      if (bold && italic) return `${lead}***${core}***${trail}`;
      if (bold) return `${lead}**${core}**${trail}`;
      if (italic) return `${lead}*${core}*${trail}`;
      return text;
    })
    .join('')
    .trim();

const contactLine = (resume: ParsedResume) =>
  resume.contact
    .filter((item) => item.kind !== 'phone')
    .map((item) => {
      if (!item.href) return item.label;
      if (item.kind === 'email') return `[${item.label}](${item.href})`;
      const label = item.kind === 'linkedin' ? 'LinkedIn' : item.kind === 'github' ? 'GitHub' : item.label;
      return `[${label}](${item.href})`;
    })
    .join(' · ');

export function resumeToMarkdown(resume: ParsedResume, siteUrl: string): string {
  const lines: string[] = [
    `# ${resume.name}`,
    '',
    `**${resume.summary.headline}** · ${contactLine(resume)}`,
    '',
    `Website: ${siteUrl} · PDF: ${siteUrl}/Muhammad_Anwer_Resume.pdf`,
    '',
    '## Summary',
    '',
    ...resume.summary.paragraphs.flatMap((paragraph) => [md(paragraph), '']),
    '## Core Competencies',
    '',
    ...resume.competencies.map((item) => `- **${item.label}:** ${md(item.value)}`),
    '',
    '## Professional Experience',
    '',
  ];

  resume.experience.forEach((job) => {
    lines.push(
      `### ${job.role} — ${job.company}`,
      '',
      `${job.location} · ${job.startDate} – ${job.endDate}`,
      '',
      ...job.bullets.map((bullet) => `- ${md(bullet)}`),
      '',
    );
  });

  lines.push(
    '## Education',
    '',
    ...resume.education.map((item) => `- **${item.credential}**, ${item.school} (${item.location})`),
    '',
  );

  if (resume.interests.length) {
    lines.push('## Interests & Affiliations', '', ...resume.interests.map((item) => `- ${item}`), '');
  }

  return `${lines.join('\n').trim()}\n`;
}

// llms.txt (https://llmstxt.org): a short, link-rich index for LLMs.
export function buildLlmsTxt(resume: ParsedResume, projects: ProjectSummary[], siteUrl: string): string {
  const summary = resume.summary.paragraphs.map(md);
  return `# ${resume.name}

> ${resume.summary.headline} based in ${resume.location}.

${summary.join('\n\n')}

Current roles: ${resume.experience
    .filter((job) => job.endDate === 'Present')
    .map((job) => `${job.role} at ${job.company}`)
    .join('; ')}.
Contact: ${contactLine(resume)}

## Resume

- [Resume (HTML)](${siteUrl}/resume): Full resume — competencies, experience, education
- [Resume (Markdown)](${siteUrl}/resume.md): The same resume as plain Markdown
- [Resume (PDF)](${siteUrl}/Muhammad_Anwer_Resume.pdf): Printable PDF version

## Projects

${projects
  .map((project) => `- [${project.title}](${siteUrl}${project.href ?? `/projects/${project.slug}`}): ${project.summary}`)
  .join('\n')}

## Optional

- [Full text for LLMs](${siteUrl}/llms-full.txt): Resume and project summaries in one file
- [Home](${siteUrl}/): Portfolio home page
`;
}

export function buildLlmsFullTxt(resume: ParsedResume, projects: ProjectSummary[], siteUrl: string): string {
  return `${resumeToMarkdown(resume, siteUrl)}
## Projects

${projects
  .map(
    (project) =>
      `### ${project.title}\n\n${siteUrl}${project.href ?? `/projects/${project.slug}`}\n\n${project.summary}\n\nTech: ${project.tags.join(', ')}\n`,
  )
  .join('\n')}`;
}
