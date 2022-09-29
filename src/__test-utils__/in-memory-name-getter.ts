import { JsonName, NameGetter } from "../infrastructure/name-getter"

export class InMemoryNameGetter implements NameGetter {
	private names: JsonName[] = []

	public setAll(names: JsonName[]): void {
		this.names = names
	}

	public reset(): void {
		this.names = []
	}

	public getAll(): Promise<JsonName[]> {
		return Promise.resolve(this.names)
	}
}
