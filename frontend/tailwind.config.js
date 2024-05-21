/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "newsea-primary": "#248BF8",
        "newsea-secondary": "#004B80",
      }
    },
    fontFamily: {
      NotoSerif: ["Noto Serif, serif"],
    },
    container: {
      padding: "1rem",
      // center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px",
    }
  },
  plugins: [],
}

