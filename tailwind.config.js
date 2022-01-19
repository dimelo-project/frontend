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
        gray2: "#E0E1E5",
        gray3: "#F1F3F5",
      },
      spacing: {
        15: "3.75rem",
        30: "120px",
      },
      margin: {
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
        "5px": "5px",
        "6px": "6px",
        18: "4.5rem",
      },
      borderWidth: {
        default: "1px",
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
