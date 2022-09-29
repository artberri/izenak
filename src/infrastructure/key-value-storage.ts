export abstract class KeyValueStorage {
	public abstract getItem(key: string): Promise<string | undefined>
	public abstract setItem(key: string, value: string): Promise<void>
}
