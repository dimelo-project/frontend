module.exports = {
  mode: "jit",
  purge: ["./pages/*.vue", "./layouts/*.vue", "./components/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange1: "#F38C2B",
        orange2: "#F3732B",
        yellow1: "#FFE066",
        red1: "#E34B54",
        green1: "#49BC93",
        gray1: "#868E96",
      },
      spacing: {
        30: "120px",
      },
      borderRadius: {
        base: "4px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
