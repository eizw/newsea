/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "newsea-primary": "#248BF8",
        "newsea-primary": "#004B80",
      }
    },
    fontFamily: {
      NotoSerif: ["Noto Serif, serif"],
    },
    container: {
      width: "70vw",
      padding: "1rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}

