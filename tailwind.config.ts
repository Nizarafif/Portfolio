import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f2f9f9',
          100: '#dcf0f0',
          200: '#bee0e0',
          300: '#92caca',
          400: '#45a9a9', // Primary Color
          500: '#45a9a9', // Map 500 to primary color as well
          600: '#348686',
          700: '#2c6e6e',
          800: '#275858',
          900: '#244b4b',
          950: '#112b2b',
        }
      }
    },
  },
  plugins: [],
};
export default config;
