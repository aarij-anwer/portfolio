import { renderToString } from "react-dom/server";
import App from "./App";
import {
  SeoCollectorContext,
  defaultSeo,
  renderSeoTags,
  type SeoData,
} from "@/lib/seo";
import { parsedResume, resumeLoadReport } from "@/lib/resume";
import { formatResumeIssue } from "@/lib/parse-resume-tex";
import { projects, siteMeta } from "@/data/site";
import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  resumeToMarkdown,
} from "@/lib/resume-markdown";

export { staticRoutes } from "@/lib/staticRoutes";

// For the prerender step: report resume.tex problems and refresh the snapshot.
export { parsedResume, resumeLoadReport, formatResumeIssue };

// Render a single route to static HTML plus its <head> tags. Called once per
// route by the prerender step.
export function render(url: string): { html: string; head: string } {
  let collected: SeoData | null = null;
  const collect = (data: SeoData) => {
    collected = data;
  };

  const html = renderToString(
    <SeoCollectorContext.Provider value={collect}>
      <App ssrPath={url} />
    </SeoCollectorContext.Provider>,
  );

  return { html, head: renderSeoTags(collected ?? defaultSeo()) };
}

// Plain-text files for AI engines, generated from public/resume.tex.
export function renderTextFiles(): Record<string, string> {
  const siteUrl = (import.meta.env.VITE_SITE_URL ?? siteMeta.url).replace(/\/$/, "");
  return {
    "llms.txt": buildLlmsTxt(parsedResume, projects, siteUrl),
    "llms-full.txt": buildLlmsFullTxt(parsedResume, projects, siteUrl),
    "resume.md": resumeToMarkdown(parsedResume, siteUrl),
  };
}
