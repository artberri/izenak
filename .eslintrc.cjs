module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "jsx-a11y"],
	root: true,
	ignorePatterns: [".eslintrc.cjs", "vue/", "dist/", "src/*.d.ts"],
	rules: {
		"react/no-unknown-property": [0],
	},
	settings: {
		react: {
			version: "18",
		},
	},
}
