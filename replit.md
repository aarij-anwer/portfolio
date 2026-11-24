# Portfolio

Static portfolio site for Muhammad Anwer.

## Run & Operate

- `pnpm run dev` — run the portfolio locally
- `pnpm run build` — typecheck and build the portfolio
- `pnpm run serve` — preview the production build
- `pnpm run typecheck` — typecheck the portfolio

## Stack

- TypeScript, React, Vite, Tailwind CSS
- Portfolio source: `src`
- Static assets: `public`
- Resume source of truth: `public/resume.tex`
- Resume parser: `src/lib/parse-resume-tex.ts`

## Notes

- `public/resume.tex` is parsed at build time (Vite `?raw`) and drives: the home hero
  (from `\section{Summary}`: bold first line = headline, blank-line separated paragraphs),
  `/resume`, site name/title/description, Person/ProfilePage JSON-LD, and the AI-engine
  files `llms.txt`, `llms-full.txt`, `resume.md`. `Summary` and `Professional Experience`
  sections are required; the build fails if they are missing.
- Every route is pre-rendered to static HTML by `scripts/prerender.mjs` (plus `404.html`).
  Netlify has no SPA catch-all, so unknown URLs return a real 404.
- `robots.txt` and `sitemap.xml` are generated in `vite.config.ts` (AI crawlers allowed,
  `<lastmod>` from git history).
- `public/Muhammad_Anwer_Resume.pdf` is still hand-uploaded and served as a static asset.
