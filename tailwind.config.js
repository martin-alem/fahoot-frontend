/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Short Stack", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#d6a3bd",
          200: "#cf93b2",
          300: "#c984a7",
          400: "#c2749c",
          500: "#bb6591",
          600: "#a85b83",
          700: "#965174",
          800: "#834766",
          900: "#703d57",
        },
        secondary: {
          100: "#7f8080",
          200: "#6a6b6b",
          300: "#555555",
          400: "#3f4040",
          500: "#2a2b2b",
          600: "#262727",
          700: "#222222",
          800: "#1d1e1e",
          900: "#191a1a",
        },
        neutral: {
          100: "#f5f7f7",
          200: "#f4f6f6",
          300: "#f2f5f5",
          400: "#f1f3f3",
          500: "#eff2f2",
          600: "#d7dada",
          700: "#bfc2c2",
          800: "#a7a9a9",
          900: "#8f9191",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
