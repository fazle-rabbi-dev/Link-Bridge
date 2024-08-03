/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "satoshi-medium": ["Satoshi-Medium", "sans"],
        inter: ["Inter", "sans-serif"],
        exo: ["Exo", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        lora: ["Lora", "serif"],
        opensans: ["Open Sans", "sans-serif"],
        patrickhand: ["Patrick Hand", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"]
      },
      colors: {
        ghostwhite: "#f8f8f8",
        offwhite: "#D0DFFF",
        purple: {
          50: "#e1c7fc",
          60: "#b492fb",
          70: "#a841ff",
          80: "#9314ff"
        },
        gray: {
          50: "#dedede",
          60: "#afafaf",
          70: "#8a8a8a",
          80: "#626262"
        },
        dark: {
          primary: "#1B1E25",
          secondary: "#23272F"
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('@tailwindcss/aspect-ratio'),
  ]
};

