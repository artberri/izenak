import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

interface NameTranslation {
	language: string;
	translation: string;
}

export const namesTable = sqliteTable("names", {
	name: text("name").primaryKey(),
	gender: text("gender", {
		enum: ["gizonezkoa", "epizenoa", "emakumezkoa"],
	}).notNull(),
	meaning: text("meaning"),
	translations: text("data", { mode: "json" })
		.$type<NameTranslation[]>()
		.notNull(),
	hipocoristic: integer("hipocoristic", { mode: "boolean" }).notNull(),
});

export type InsertName = Required<typeof namesTable.$inferInsert>;
