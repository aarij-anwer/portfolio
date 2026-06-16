import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
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
    <changefreq>${route === "/" ? "monthly" : "yearly"}</changefreq>
    <priority>${route === "/" ? "1.0" : route === "/projects" ? "0.9" : "0.7"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
      const robots = `User-agent: *
Allow: /

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
