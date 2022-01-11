module.exports = {
  mode: "jit",
  purge: ["./pages/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange1: "#F38C2B",
        orange2: "#F3732B",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
