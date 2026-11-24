# muhammadanwer.com

Portfolio site for Muhammad Anwer: React + TypeScript + Vite + Tailwind CSS, pre-rendered to static HTML at build time and deployed on Netlify.

## Commands

- `pnpm run dev` — local dev server
- `pnpm run build` — typecheck, client build, SSR build, then pre-render every route into `dist/`
- `pnpm run serve` — preview the production build
- `pnpm run typecheck` — TypeScript only
- `scripts/optimize-images.sh` — convert new PNG/JPG screenshots in `public/projects` and `public/gallery` to resized WebP (needs ImageMagick)

## How it works

- **`public/resume.tex` is the source of truth.** It's parsed at build time by `src/lib/parse-resume-tex.ts` and drives:
  - the home page hero (the `% web:headline` / `% web:summary` comment lines, which don't print in the PDF) and Core Competencies
  - the home page Recent Wins cards, one comment line each: `% web:win stat | title | description | /link` (link optional; inline LaTeX like `\%` works). The build fails on a malformed line or a link to a page that doesn't exist.
  - `/resume`
  - site name, title and meta description
  - Person / ProfilePage JSON-LD
  - the AI-engine files `llms.txt`, `llms-full.txt` and `resume.md`

  The web summary lines and the `Professional Experience` section are required; the build fails without them.
- **Curated content** (project pages, photo) lives in `src/data/site.ts`.
- **Pre-rendering:** `scripts/prerender.mjs` renders each route in `src/lib/staticRoutes.ts` to `<route>.html` (plus `404.html`) using the SSR bundle from `src/entry-server.tsx`; the client hydrates it. Netlify serves `/resume` from `resume.html` with a 200, and unknown URLs get a real 404.
- **`robots.txt` and `sitemap.xml`** are generated in `vite.config.ts` (AI crawlers allowed, `<lastmod>` from git history).
- **The project gallery** carousel (Swiper + lightbox) is a separate chunk loaded after hydration; the pre-rendered page shows plain images.
- `public/Muhammad_Anwer_Resume.pdf` is uploaded by hand.

## Adding a page

Add the route to `src/App.tsx` and its path to `src/lib/staticRoutes.ts`, and give the page a `<Seo>` element.

## CI

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`: install, build, check generated files (including Recent Wins), no raw LaTeX in output, main JS ≤ 350 KB, every `<img>` has dimensions, and no unoptimized screenshots.
