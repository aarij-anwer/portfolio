// Single source of truth for the routes that get pre-rendered to static HTML
// at build time. Imported by vite.config.ts (sitemap generation) and by the
// prerender step (via entry-server).
export const staticRoutes = [
  "/",
  "/projects",
  "/projects/launchgood",
  "/projects/esg-financed-emissions",
  "/projects/get-better-together",
  "/projects/smart-portfolio-allocator",
  "/resume",
];
