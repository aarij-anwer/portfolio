// Post-build step: render every static route to HTML using the server bundle
// and write a file per route into dist/. Run after the client build (which
// produces dist/index.html with hashed asset tags) and the server build (which
// produces dist-server/entry-server.js).
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, join } from "node:path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = join(projectRoot, "dist");
const serverEntry = join(projectRoot, "dist-server", "entry-server.js");

const { render, renderTextFiles, staticRoutes } = await import(
  pathToFileURL(serverEntry).href,
);

const template = readFileSync(join(distDir, "index.html"), "utf-8");

if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error(
    "dist/index.html is missing the <!--app-html--> / <!--app-head--> placeholders",
  );
}

// Map a route path to the file written under dist/. A route becomes
// <route>.html (not <route>/index.html): Netlify serves /resume from
// resume.html with a 200, whereas a directory index forces a 301 to /resume/,
// which would contradict the canonical URLs and sitemap (no trailing slash).
function outputFile(route) {
  if (route === "/") return join(distDir, "index.html");
  return join(distDir, `${route.replace(/^\//, "")}.html`);
}

function renderPage(route) {
  const { html, head } = render(route);
  return template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
}

for (const route of staticRoutes) {
  const file = outputFile(route);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, renderPage(route));
  console.log(`prerendered ${route} -> ${file.replace(projectRoot + "/", "")}`);
}

// Netlify serves dist/404.html with a real 404 status for unknown paths.
writeFileSync(join(distDir, "404.html"), renderPage("/404"));
console.log("prerendered 404 -> dist/404.html");

// llms.txt, llms-full.txt and resume.md for AI engines (from resume.tex).
for (const [name, content] of Object.entries(renderTextFiles())) {
  writeFileSync(join(distDir, name), content);
  console.log(`wrote dist/${name}`);
}

console.log(`\nPre-rendered ${staticRoutes.length} routes.`);
