import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// In production the markup is pre-rendered (see scripts/prerender.mjs), so we
// hydrate the existing DOM. In dev there is no prerender, so #root only holds
// the placeholder comment — create a fresh root instead to avoid a mismatch.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
