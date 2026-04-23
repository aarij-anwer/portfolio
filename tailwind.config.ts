import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111415",
        surface: "#111415",
        "surface-bright": "#37393b",
        "surface-container": "#1e2021",
        "surface-container-low": "#1a1c1d",
        "surface-container-high": "#282a2c",
        "surface-container-highest": "#333537",
        "surface-variant": "#333537",
        outline: "#8b90a0",
        "outline-variant": "#414755",
        primary: "#adc6ff",
        "primary-container": "#4b8eff",
        "primary-fixed": "#d8e2ff",
        "primary-fixed-dim": "#adc6ff",
        "inverse-primary": "#005bc1",
        secondary: "#c9c6c5",
        tertiary: "#c8c6c5",
        "on-background": "#e2e2e4",
        "on-surface": "#e2e2e4",
        "on-surface-variant": "#c1c6d7",
        "on-primary": "#002e69",
        "on-primary-container": "#00285c",
        "inverse-surface": "#e2e2e4",
        "inverse-on-surface": "#2f3132",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139, 144, 160, 0.12), 0 16px 48px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "page-radial":
          "radial-gradient(circle at top right, rgba(75, 142, 255, 0.12), transparent 25%), radial-gradient(circle at top left, rgba(255, 255, 255, 0.03), transparent 18%)",
      },
    },
  },
  plugins: [],
};

export default config;
