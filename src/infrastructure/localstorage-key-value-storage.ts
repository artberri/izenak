import { KeyValueStorage } from "./key-value-storage"

export class LocalStorageKeyValueStorage implements KeyValueStorage {
	public getItem(key: string): Promise<string | undefined> {
		return Promise.resolve(localStorage.getItem(key) ?? undefined)
	}

	public setItem(key: string, value: string): Promise<void> {
		localStorage.setItem(key, value)

		return Promise.resolve()
	}
}
