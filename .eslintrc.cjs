module.exports = {
	env: {
		jest: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@typescript-eslint/strict",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
	},
	plugins: ["@typescript-eslint", "jsx-a11y", "jest-dom", "testing-library"],
	root: true,
	ignorePatterns: [
		"/*.cjs",
		"vue/",
		"dist/",
		"src/*.d.ts",
		"vite.config.ts",
		"coverage/",
	],
	rules: {
		"react/no-unknown-property": [0],
		"@typescript-eslint/no-unused-vars": [2, { argsIgnorePattern: "^_" }],
		"@typescript-eslint/no-shadow": [2],
		"require-await": [2],
		"no-return-await": [2],
		"consistent-return": [2],
		"no-console": [2],
		"brace-style": [2],
		"newline-before-return": [2],
	},
	overrides: [
		{
			files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
			extends: ["plugin:jest-dom/recommended", "plugin:testing-library/react"],
			rules: {
				"testing-library/prefer-find-by": [0],
			},
		},
	],
	settings: {
		react: {
			version: "18",
		},
	},
}
