import { JsonName, NameGetter } from "./name-getter"

export class FetchNameGetter implements NameGetter {
	public async getAll(): Promise<JsonName[]> {
		const response = await fetch("/izenak.json")
		if (!response.ok) {
			// eslint-disable-next-line no-console
			console.error(response.status)
			throw new Error(`Could not fetch name JSON. Error: ${response.status}`)
		}

		return (await response.json()) as JsonName[]
	}
}
