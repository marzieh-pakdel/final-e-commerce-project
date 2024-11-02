/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ///// common colors for light and dark mode /////

        "primary-main": "#DB2777",
        "primary-dark": "#831747",
        "primary-lighter": "#F8D4E4",
        "secondary-main": "#078DEE",
        "error-main": "#B71D18",
        "error-lighter": "#FFE9D5",
        "success-main": "#22C55E",
        "success-lighter": "#D3FCD2",
        "info-main": "#00B8D9",
        "info-lighter": "#CAFDF5",
        "grey-0": "#FFFFFF",
        "grey-300": "#DFE3E8",
        "grey-600": "#637381",

        //////////// light mode colors ////////////

        "text-primary": "#000000",
        "text-secondary": "#58616C",
        "text-button": "#FFFFFF",
        "base-text-field": "#FFFFFF",
        "base-text-field-stroke": "#CED2D7",
        "icon-primary": "#000000",
        "icon-secondary": "#58616C",
        "base-menu": "#FFFFFF",
        "base-side": "#E6E8EB",
        "base-card": "#E6E8EB",
        "base-backgrond": "#EEEFF1",

        //////////// dark mode colors ////////////

        "dark-base-text-field": "#141516",
        "dark-base-text-field-stroke": "#3F4043",
        "dark-base-text-field-disable": "#3F4043",
        "dark-base-menu": "#000000",
        "dark-base-side": "#151515",
        "dark-menu-active-item": "#DB277714",
        "dark-text-primary": "#FFFFFF",
        "dark-text-secondary": "#9CA3AF",
        "dark-text-disabled": "#454F5B",
        "dark-icon-primary": "#FFFFFF",
        "dark-icon-secondary": "#DFE3E8",
        "dark-icon-color-primary": "#DB2777",
        "dark-base-card": "#1F2937",
        "dark-base-background": "#0F0F10",
      },

      fontSize: {
        base: "10px", // root font size
      },

      fontFamily: {
        "Iran-Yekan": "IRAN-Yekan",
        Segoe: "Segoe.UI",
      },

      fontWeight: {
        thin: "100",
        "extra-light": "200",
        light: "300",
        normal: "400",
        medium: "500",
        "semi-bold": "600",
        bold: "700",
        "extra-bold": "800",
        black: "900",
        "extra-black": "950",
      },
    },
  },
  plugins: [
  
    require('tailwind-scrollbar')({ nocompatible: true }),

    function ({ addBase }) {
      addBase({
        html: { fontSize: "10px" },
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        ".line-clamp-2": {
          "text-overflow": "ellipsis",
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
        },

        ".line-clamp-4": {
          "text-overflow": "ellipsis",
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-line-clamp": "4",
          "-webkit-box-orient": "vertical",
        },
      });
    },
  ],
};
