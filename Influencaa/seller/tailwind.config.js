/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Playfair: ["Brasika", "sans-serif"],
        brasik: ["Playfair Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
