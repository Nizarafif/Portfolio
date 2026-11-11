import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        "surface-hover": "#161616",
        foreground: "#F5F5F5",
        muted: "#999999",
        accent: {
          DEFAULT: "#3B82F6",
          hover: "#60A5FA",
        },
      },
    },
  },
  plugins: [],
};

export default config;
