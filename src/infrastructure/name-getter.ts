type JsonNameGender = "epizenoa" | "gizonezkoa" | "emakumezkoa"

export interface JsonName {
	name: string
	translations: string
	gender: JsonNameGender
	meaning: string
}

export abstract class NameGetter {
	public abstract getAll(): Promise<JsonName[]>
}
