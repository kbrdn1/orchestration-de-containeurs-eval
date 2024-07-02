import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,vue}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        slideFromTop: {
          '0%': {
            transform: 'translateY(-50%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        focus: {
          '0%': {
            outlineOffset: '0px',
          },
          '100%': {
            outlineOffset: '2px',
          },
        },
      },
      tokens: {
        shadows: {
          "lg-reverse": {
            value: "0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        },
        colors: {
          accent: {
            value: "#1065cb",
          },
          accentLight: {
            value: "#3aabe0",
          },
          lightGray: {
            value: "#f8f9fc",
          },
          primary: {
            value: "#2c2f31",
          },
          primaryHover: {
            value: "",
          },
          primaryBtn: {
            value: "#303637",
          },
          primaryBtnHover: {
            value: "#000",
          },
          primaryBtnText: {
            value: "#fff",
          },
          primaryBtnTextHover: {
            value: "#fff",
          },
          secondary: {
            value: "#5e6266",
          },
          secondaryHover: {
            value: "",
          },
          secondaryBtn: {
            value: "#eaeff2",
          },
          secondaryBtnHover: {
            value: "#d4dae0",
          },
          secondaryBtnText: {
            value: "#2c2f31",
          },
          secondaryBtnTextHover: {
            value: "#000",
          },
          danger: {
            value: "#ff4d4f",
          },
          dangerHover: {
            value: "#ff787b",
          },
          warning: {
            value: "#faad14",
          },
          warningHover: {
            value: "#f0c413",
          },
          success: {
            value: "#52c41a",
          },
          successHover: {
            value: "#73d13d",
          },
          info: {
            value: "#1890ff",
          },
          infoHover: {
            value: "#40a9ff",
          },
        },
        fontSizes: {
          btn: {
            value: ".82rem",
          },
        },
        fontWeights: {
          btn: {
            value: "600",
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
