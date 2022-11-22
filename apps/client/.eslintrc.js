module.exports = {
  root: true,
  extends: ["custom", "next"],
  plugins: ["eslint-plugin-react"],
  settings: {
    next: {
      rootDir: "src/",
    },
  },
};
