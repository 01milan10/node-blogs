module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: "#1f4287",
        secondary: "#071e3d",
        textColor: "#21e6c1",
      },
      fontFamily: {
        nunito: ["Nunito"],
      },
      backgroundImage: (theme) => ({
        "bg-1": "url('/img/slider-bg-1.jpg')",
      }),
    },
  },
  variants: {},
  plugins: [],
};
