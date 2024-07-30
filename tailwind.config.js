/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-col": "#0a141b",
        "color1": "#ff7477",
        "color2": "#ceb5b7",
        "color3": "#b5d6d6",
        "color4": "#9cf6f6"
      }
    },
  },
  plugins: [],
};
