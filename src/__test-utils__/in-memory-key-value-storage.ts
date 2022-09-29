import { KeyValueStorage } from "../infrastructure/key-value-storage"

export class InMemoryKeyValueStorage implements KeyValueStorage {
	private storage = new Map<string, string>()

	public getItem(key: string): Promise<string | undefined> {
		return Promise.resolve(this.storage.get(key))
	}

	public setItem(key: string, value: string): Promise<void> {
		this.storage.set(key, value)

		return Promise.resolve()
	}

	public reset(): void {
		this.storage = new Map<string, string>()
	}
}
