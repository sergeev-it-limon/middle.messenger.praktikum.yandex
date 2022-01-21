const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	mode: "production",
	output: {
		filename: "[name].bundle.[fullhash].js",
	},
	optimization: {
		minimizer: ["...", new CssMinimizerPlugin()],
	},
	devtool: "source-map",
};
