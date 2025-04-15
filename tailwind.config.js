/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(green|yellow|orange|red|blue)-\d{3}/,
    },
    {
      pattern: /text-(white|black)/,
    },
    {
      pattern: /ring-(green|blue)-\d{3}/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
