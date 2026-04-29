import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ash: {
          50: "#faf8f5",
          100: "#f0ebe3",
          200: "#e0d5c5",
          300: "#c9b89e",
          400: "#b19a78",
          500: "#9d825e",
          600: "#8a6e4e",
          700: "#735a42",
          800: "#604b3a",
          900: "#3d3028",
          950: "#1a1410",
        },
        flame: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba8",
          300: "#ffc071",
          400: "#ff9a38",
          500: "#ff7a11",
          600: "#f05e07",
          700: "#c74508",
          800: "#9e370f",
          900: "#7f3010",
          950: "#451506",
        },
        bunker: {
          50: "#f4f6f7",
          100: "#e3e7ea",
          200: "#c9d2d7",
          300: "#a4b1ba",
          400: "#778996",
          500: "#5c6e7b",
          600: "#4f5d69",
          700: "#444f58",
          800: "#3c444c",
          900: "#2a3038",
          950: "#0f1318",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
