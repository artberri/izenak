import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { namesTable, type InsertName } from "../db/schema";
import namesJson from "../scraper/names.json";

interface RawName {
	name: string;
	translations: string;
	gender: "gizonezkoa" | "epizenoa" | "emakumezkoa";
	hipocoristic: "bai" | "ez";
	meaning: string;
}

interface NameTranslation {
	language: string;
	translation: string;
}

const LANGUAGE_CODES: Record<string, string> = {
	gaztelania: "es",
	frantsesa: "fr",
	ingelesa: "en",
	grekoa: "el",
	latina: "la",
	italiera: "it",
	portugesa: "pt",
	alemana: "de",
	errusiera: "ru",
	japoniera: "ja",
	txinera: "zh",
	arabiera: "ar",
	hebreera: "he",
};

function parseTranslations(translationsStr: string): NameTranslation[] {
	if (!translationsStr.trim()) {
		return [];
	}

	const translations: NameTranslation[] = [];
	const parts = translationsStr.split(", ");

	for (const part of parts) {
		const match = part.match(/^(.+?)\s*\((\w+)\)$/);
		if (match) {
			const [, translation, basqueLanguage] = match;
			if (basqueLanguage && translation) {
				const languageCode = LANGUAGE_CODES[basqueLanguage];
				if (languageCode) {
					translations.push({
						translation: translation.trim(),
						language: languageCode,
					});
				} else {
					console.error(`Unknown language code: ${basqueLanguage}`);
				}
			} else {
				console.error(`Invalid translation: ${part}`);
			}
		}
	}

	return translations;
}

function transformName(raw: RawName): InsertName {
	return {
		name: raw.name,
		gender: raw.gender,
		meaning: raw.meaning || null,
		translations: parseTranslations(raw.translations),
		hipocoristic: raw.hipocoristic === "bai",
	};
}

async function seed() {
	const dbUrl = process.env.EXPO_PUBLIC_TURSO_DB_URL;
	const authToken = process.env.TURSO_DB_WRITE_AUTH_TOKEN;

	if (!dbUrl || !authToken) {
		console.error(
			"Error: EXPO_PUBLIC_TURSO_DB_URL and TURSO_DB_WRITE_AUTH_TOKEN must be set",
		);
		process.exit(1);
	}

	const client = createClient({ url: dbUrl, authToken });
	const db = drizzle(client);

	const rawNames = namesJson as RawName[];
	console.log(`Processing ${rawNames.length} names...`);

	let successCount = 0;
	let errorCount = 0;

	for (const raw of rawNames) {
		try {
			const name = transformName(raw);
			await db
				.insert(namesTable)
				.values(name)
				.onConflictDoUpdate({
					target: namesTable.name,
					set: {
						gender: name.gender,
						meaning: name.meaning,
						translations: name.translations,
						hipocoristic: name.hipocoristic,
					},
				});
			successCount++;
		} catch (error) {
			errorCount++;
			console.error(`Error inserting "${raw.name}":`, error);
		}
	}

	console.log(`\nSeed completed:`);
	console.log(`  Total: ${rawNames.length}`);
	console.log(`  Success: ${successCount}`);
	console.log(`  Errors: ${errorCount}`);

	client.close();
}

void seed();
