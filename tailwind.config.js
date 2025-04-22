/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "border-t-4",
    "border-black",
    "bg-black",
    "h-2",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
