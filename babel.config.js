/** @type {import('react-native-worklets/plugin').PluginOptions} */
const workletsPluginOptions = {
	// Your custom options.
};

module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"@tamagui/babel-plugin",
				{
					components: ["tamagui"],
					config: "./tamagui.config.ts",
					logTimings: true,
					disableExtraction: process.env.NODE_ENV === "development",
				},
			],
			["react-native-worklets/plugin", workletsPluginOptions],
		],
	};
};
