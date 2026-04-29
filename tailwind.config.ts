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
          50: "#1a1410",
          100: "#3d3028",
          200: "#604b3a",
          300: "#735a42",
          400: "#8a6e4e",
          500: "#9d825e",
          600: "#b19a78",
          700: "#c9b89e",
          800: "#e0d5c5",
          900: "#f0ebe3",
          950: "#faf8f5",
        },
        flame: {
          50: "#451506",
          100: "#7f3010",
          200: "#9e370f",
          300: "#c74508",
          400: "#f05e07",
          500: "#ff7a11",
          600: "#ff9a38",
          700: "#ffc071",
          800: "#ffdba8",
          900: "#ffefd4",
          950: "#fff8ed",
        },
        bunker: {
          50: "#2a3038",
          100: "#3c444c",
          200: "#444f58",
          300: "#4f5d69",
          400: "#5c6e7b",
          500: "#778996",
          600: "#a4b1ba",
          700: "#c9d2d7",
          800: "#e3e7ea",
          900: "#EDE8DC",
          950: "#F5F0E4",
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
