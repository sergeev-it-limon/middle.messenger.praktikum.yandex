const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const paths = require("./paths");

const isProduction = process.env.NODE_ENV === "production";
console.log(`production ${isProduction}`);

module.exports = {
	entry: paths.entry,
	output: {
		path: paths.outputPath,
		publicPath: isProduction ? paths.publicPath : "/", // Для корректной работы dev-сервера
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts)|(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/i,
				use: [
					// Оставил тут, чтобы не писать сложные правила мерджа
					isProduction ? MiniCssExtractPlugin.loader : "style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: "[name]__[local]___[hash]",
							},
						},
					},
					"postcss-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: paths.htmlTemplate,
			favicon: paths.faviconPath,
			publicPath: isProduction ? paths.publicPath : "/", // Для корректной работы dev-сервера
		}),

		// Запускается только в режиме прода по умолчанию, оставил тут,
		// чтобы не разбрасывать конфигурацию MiniCssExtractPlugin по разным файлам
		new MiniCssExtractPlugin(),

		new ESLintPlugin({
			extensions: ["ts"],
		}),
	],
	resolve: {
		extensions: [".ts", ".js"],
	},
};
