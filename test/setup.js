require("@babel/register")({
	extensions: [".js", ".ts"],
	presets: ["@babel/preset-env", "@babel/preset-typescript"],
	plugins: [
		"babel-plugin-transform-pug-js",
		[
			"babel-plugin-transform-import-ignore",
			{
				patterns: [".css"],
			},
		],
	],
});
