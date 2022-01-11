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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
