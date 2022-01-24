const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, "../src/index.ts"),
	outputPath: path.resolve(__dirname, "../dist"),
	htmlTemplate: path.resolve(__dirname, "../static/index.html"),
	publicPath: "/dist/",
	faviconPath: path.resolve(__dirname, "../static/favicon.ico"),
};
