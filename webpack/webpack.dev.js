const paths = require("./paths");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		devMiddleware: {
			publicPath: paths.publicPath,
		},
		historyApiFallback: true,
		port: 3000
	},
	output: {
		filename: "[name].bundle.[fullhash].js",
	},
};
