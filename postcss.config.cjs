module.exports = (ctx) => ({
	plugins: {
		"postcss-preset-env": {
			features: {
				"nesting-rules": true,
			},
		},
		cssnano: ctx.env === "production" ? {} : false,
	},
})
