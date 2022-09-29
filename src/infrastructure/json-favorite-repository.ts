import { FavoriteRepository } from "../services/favorite-repository"
import { Name } from "../types/Name"
import { KeyValueStorage } from "./key-value-storage"

const key = "izenak-favorites"

export class JsonFavoriteRepository implements FavoriteRepository {
	private favorites: Name[] = []
	private initialized = false

	public constructor(private readonly storage: KeyValueStorage) {}

	public async add(name: Name): Promise<void> {
		const favorites = await this.getAll()
		const newValue = [...favorites, name]
		await this.storage.setItem(key, JSON.stringify(newValue))
		this.favorites = newValue
	}

	public async remove(name: Name): Promise<void> {
		const favorites = await this.getAll()
		const newValue = favorites.filter((favorite) => favorite.id !== name.id)
		await this.storage.setItem(key, JSON.stringify(newValue))
		this.favorites = newValue
	}

	public async is(name: Name): Promise<boolean> {
		const favorites = await this.getAll()

		return favorites.some((favorite) => favorite.id === name.id)
	}

	public async getAll(): Promise<Name[]> {
		if (!this.initialized) {
			const value = (await this.storage.getItem(key)) ?? "[]"
			this.favorites = JSON.parse(value) as Name[]
			this.initialized = true
		}

		return this.favorites
	}
}
