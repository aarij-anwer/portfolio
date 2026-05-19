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

- `/resume` parses `public/resume.tex` at build time via Vite `?raw`.
- `public/Muhammad_Anwer_Resume.pdf` is still hand-uploaded and served as a static asset.
