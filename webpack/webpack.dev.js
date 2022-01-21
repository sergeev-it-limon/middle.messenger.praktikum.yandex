const paths = require("./paths");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		devMiddleware: {
			publicPath: paths.publicPath,
		},
		historyApiFallback: true,
	},
	output: {
		filename: "[name].bundle.[fullhash].js",
	},
};
