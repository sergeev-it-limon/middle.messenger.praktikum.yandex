module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nested"),
    require("postcss-modules")({
      generateScopedName: "[name]__[local]--[hash:base64:5]",
      globalModulePaths: [/\.\/static\/common\/.*\.css$/],
    }),
  ],
};
