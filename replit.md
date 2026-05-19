# Portfolio

Static portfolio site for Muhammad Anwer.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio locally
- `pnpm --filter @workspace/portfolio run build` — build the portfolio
- `pnpm --filter @workspace/portfolio run serve` — preview the production build
- `pnpm run typecheck` — full typecheck across workspace packages

## Stack

- pnpm workspaces, TypeScript, React, Vite, Tailwind CSS
- Portfolio source: `artifacts/portfolio`
- Resume source of truth: `artifacts/portfolio/public/resume.tex`
- Resume parser: `artifacts/portfolio/src/lib/parse-resume-tex.ts`

## Notes

- `/resume` parses `public/resume.tex` at build time via Vite `?raw`.
- `public/Muhammad_Anwer_Resume.pdf` is still hand-uploaded and served as a static asset.
