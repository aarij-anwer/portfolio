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

const { render, staticRoutes } = await import(pathToFileURL(serverEntry).href);

const template = readFileSync(join(distDir, "index.html"), "utf-8");

if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error(
    "dist/index.html is missing the <!--app-html--> / <!--app-head--> placeholders",
  );
}

// Map a route path to the file written under dist/ (pretty URLs: a route
// becomes <route>/index.html, served by Netlify at the clean path).
function outputFile(route) {
  if (route === "/") return join(distDir, "index.html");
  return join(distDir, route.replace(/^\//, ""), "index.html");
}

for (const route of staticRoutes) {
  const { html, head } = render(route);
  const page = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);

  const file = outputFile(route);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  console.log(`prerendered ${route} -> ${file.replace(projectRoot + "/", "")}`);
}

console.log(`\nPre-rendered ${staticRoutes.length} routes.`);
