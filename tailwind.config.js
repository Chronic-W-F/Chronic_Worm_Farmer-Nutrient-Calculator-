/** @type {import('tailwindcss').Config} / module.exports = { content: [ "./pages/**/.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}" ], theme: { extend: {}, }, plugins: [], }

/* Custom Styles / .selected-phase { background-color: #22c55e; / Tailwind green-500 / color: white; border-color: #15803d; / Tailwind green-700 */ }

.unselected-phase { background-color: white; color: #1f2937; /* Tailwind gray-800 / border-color: #d1d5db; / Tailwind gray-300 */ }

.unselected-phase:hover { background-color: #f3f4f6; /* Tailwind gray-100 */ }

.divider { width: 100%; height: 8px; background-color: black; margin-bottom: 1rem; }

