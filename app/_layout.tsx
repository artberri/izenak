import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
	fade: true,
});

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (isReady) {
			SplashScreen.hide();
		}
	}, [isReady]);

	const tursoDbUrl = process.env.EXPO_PUBLIC_TURSO_DB_URL;
	const tursoDbAuthToken = process.env.EXPO_PUBLIC_TURSO_DB_READ_AUTH_TOKEN;
	if (!tursoDbUrl || !tursoDbAuthToken) {
		throw new Error("TURSO_DB_URL and TURSO_DB_AUTH_TOKEN must be set");
	}

	return (
		<TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
						} finally {
							setIsReady(true);
						}
					}}
				>
					{isReady ? (
						<Stack>
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						</Stack>
					) : null}
				</SQLiteProvider>
			</ThemeProvider>
		</TamaguiProvider>
	);
}
