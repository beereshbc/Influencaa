/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brasika: ["Brasika", "sans-serif"],
        Playfair: ["Playfair Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
