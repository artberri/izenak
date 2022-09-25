module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
	},
	transformIgnorePatterns: [
		"<rootDir>/node_modules/.pnpm/(?!(preact|@testing-library\\+preact|preact-transitioning|uuid)@)",
	],
	moduleNameMapper: {
		"\\.css$": "identity-obj-proxy",
	},
	moduleDirectories: ["node_modules", "src/__test-utils__"],
	coveragePathIgnorePatterns: ["__test-utils__"],
}
