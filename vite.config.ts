import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { staticRoutes } from "./src/lib/staticRoutes";

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 5173;

if (rawPort && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";
const siteUrl = (process.env.VITE_SITE_URL ?? "https://muhammadanwer.com")
  .replace(/\/$/, "");
const resumePdfPath = path.resolve(
  import.meta.dirname,
  "public",
  "Muhammad_Anwer_Resume.pdf",
);
const seoRoutes = staticRoutes;
const resumeTexPath = path.resolve(import.meta.dirname, "public", "resume.tex");
const resumeSnapshotPath = path.resolve(
  import.meta.dirname,
  "src",
  "data",
  "resume.snapshot.json",
);

// `virtual:resume-source` exports resume.tex as text and the last-known-good
// snapshot (src/data/resume.snapshot.json), each null when the file is missing,
// so a missing or broken resume can fall back instead of failing the import.
function resumeSourcePlugin() {
  const id = "virtual:resume-source";
  const resolvedId = `\0${id}`;
  const readIfExists = (file: string) =>
    fs.existsSync(file) ? fs.readFileSync(file, "utf-8") : null;
  return {
    name: "portfolio-resume-source",
    resolveId(source: string) {
      return source === id ? resolvedId : undefined;
    },
    load(this: { addWatchFile(file: string): void; warn(message: string): void }, loadId: string) {
      if (loadId !== resolvedId) return undefined;
      this.addWatchFile(resumeTexPath);
      this.addWatchFile(resumeSnapshotPath);
      const source = readIfExists(resumeTexPath);
      let snapshot: unknown = null;
      const snapshotText = readIfExists(resumeSnapshotPath);
      if (snapshotText) {
        try {
          snapshot = JSON.parse(snapshotText);
        } catch (error) {
          this.warn(`ignoring unreadable ${resumeSnapshotPath}: ${String(error)}`);
        }
      }
      return `export const source = ${JSON.stringify(source)};\nexport const snapshot = ${JSON.stringify(snapshot)};\n`;
    },
  };
}

// AI / answer-engine crawlers we explicitly welcome (in addition to "*").
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

// Last-modified date (YYYY-MM-DD) for a path, from git history; falls back to
// today when git is unavailable (e.g. shallow CI clones without history).
function lastModified(...files: string[]) {
  try {
    const date = execSync(`git log -1 --format=%cs -- ${files.join(" ")}`, {
      cwd: import.meta.dirname,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (date) return date;
  } catch {
    // ignore
  }
  return new Date().toISOString().slice(0, 10);
}

function routeLastModified(route: string) {
  if (route === "/" || route === "/resume") {
    return lastModified("public/resume.tex", "src/data/site.ts", "src/pages");
  }
  return lastModified("src/data/site.ts", "src/pages", "src/components");
}

function routeUrl(route: string) {
  const normalizedBase = basePath === "/" ? "" : basePath.replace(/\/$/, "");
  const normalizedRoute = route === "/" ? "" : route;

  return `${siteUrl}${normalizedBase}${normalizedRoute}`;
}

function seoFilesPlugin() {
  return {
    name: "portfolio-seo-files",
    transformIndexHtml(html: string) {
      return html.replaceAll("%SEO_SITE_URL%", siteUrl);
    },
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, "dist");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seoRoutes
  .map(
    (route) => `  <url>
    <loc>${routeUrl(route)}</loc>
    <lastmod>${routeLastModified(route)}</lastmod>
    <changefreq>${route === "/" ? "monthly" : "yearly"}</changefreq>
    <priority>${route === "/" ? "1.0" : route === "/projects" ? "0.9" : "0.7"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
      const robots = `${["*", ...aiCrawlers]
        .map((agent) => `User-agent: ${agent}\nAllow: /`)
        .join("\n\n")}

Sitemap: ${routeUrl("/sitemap.xml")}
`;

      fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
      fs.writeFileSync(path.join(distDir, "robots.txt"), robots);
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  base: basePath,
  define: {
    __RESUME_PDF_AVAILABLE__: JSON.stringify(fs.existsSync(resumePdfPath)),
    // RESUME_STRICT=1 (CI) fails the build on a broken resume.tex instead of
    // falling back to the snapshot.
    __RESUME_STRICT__: JSON.stringify(process.env.RESUME_STRICT === "1"),
  },
  plugins: [
    react(),
    resumeSourcePlugin(),
    seoFilesPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // The SSR bundle only needs code; public/ is already copied into dist/.
    copyPublicDir: !isSsrBuild,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
}));
