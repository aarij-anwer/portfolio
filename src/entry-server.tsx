import { renderToString } from "react-dom/server";
import App from "./App";
import {
  SeoCollectorContext,
  defaultSeo,
  renderSeoTags,
  type SeoData,
} from "@/lib/seo";

export { staticRoutes } from "@/lib/staticRoutes";

// Render a single route to static HTML plus its <head> tags. Called once per
// route by the prerender step.
export function render(url: string): { html: string; head: string } {
  let collected: SeoData | null = null;
  const collect = (data: SeoData) => {
    collected = data;
  };

  const html = renderToString(
    <SeoCollectorContext.Provider value={collect}>
      <App ssrPath={url} />
    </SeoCollectorContext.Provider>,
  );

  return { html, head: renderSeoTags(collected ?? defaultSeo()) };
}
