module.exports = {
  mode: "jit",
  purge: ["./pages/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      sub: ".875rem",
      base: "1rem",
      mid: "1.25rem",
      heading3: "1.75rem",
      heading2: "2.375rem",
      heading1: "2.8125rem",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
