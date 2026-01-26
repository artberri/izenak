import { defineConfig } from "drizzle-kit";

// export default defineConfig({
// 	dialect: "sqlite",
// 	driver: "expo",
// 	schema: "./db/schema.ts",
// 	out: "./drizzle",
// });

const tursoDbUrl = process.env.EXPO_PUBLIC_TURSO_DB_URL;
const tursoDbAuthToken = process.env.TURSO_DB_WRITE_AUTH_TOKEN;

if (!tursoDbUrl || !tursoDbAuthToken) {
	throw new Error("TURSO_DB_URL and TURSO_DB_AUTH_TOKEN must be set");
}

export default defineConfig({
	schema: "./db/schema.ts",
	out: "./drizzle",
	dialect: "turso",
	dbCredentials: {
		url: tursoDbUrl,
		authToken: tursoDbAuthToken,
	},
});
