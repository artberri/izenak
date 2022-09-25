module.exports = {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
	},
	transformIgnorePatterns: [
		"<rootDir>/node_modules/.pnpm/(?!(preact|@testing-library\\+preact|preact-transitioning)@)",
	],
	moduleNameMapper: {
		"\\.css$": "identity-obj-proxy",
	},
	moduleDirectories: ["node_modules", "src/__test-utils__"],
	coveragePathIgnorePatterns: ["__test-utils__"],
}
