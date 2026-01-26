import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
	const tursoDbUrl = process.env.EXPO_PUBLIC_TURSO_DB_URL;
	const tursoDbAuthToken = process.env.EXPO_PUBLIC_TURSO_DB_READ_AUTH_TOKEN;
	if (!tursoDbUrl || !tursoDbAuthToken) {
		throw new Error("TURSO_DB_URL and TURSO_DB_AUTH_TOKEN must be set");
	}

	return (
		<SQLiteProvider
			databaseName="izenak"
			options={{
				libSQLOptions: {
					url: tursoDbUrl,
					authToken: tursoDbAuthToken,
				},
			}}
			onInit={async (db: SQLiteDatabase) => {
				try {
					await db.syncLibSQL();
					console.log("Database synced");
				} catch (error) {
					console.error(error);
				}
			}}
		>
			<Stack />
		</SQLiteProvider>
	);
}
