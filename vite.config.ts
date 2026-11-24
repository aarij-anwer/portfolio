import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
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

export default defineConfig({
  base: basePath,
  define: {
    __RESUME_PDF_AVAILABLE__: JSON.stringify(fs.existsSync(resumePdfPath)),
  },
  plugins: [
    react(),
    seoFilesPlugin(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: import.meta.dirname,
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
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
});
