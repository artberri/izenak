import { Name } from "../types/Name"

export abstract class FavoriteRepository {
	public abstract add(name: Name): Promise<void>
	public abstract remove(name: Name): Promise<void>
	public abstract getAll(): Promise<Name[]>
}
