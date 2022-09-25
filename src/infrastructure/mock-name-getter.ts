import { JsonName, NameGetter } from "./name-getter"

export class MockNameGetter implements NameGetter {
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
