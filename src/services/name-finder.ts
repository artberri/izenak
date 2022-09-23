import { Filter } from "../types/Filter"
import { Name } from "../types/Name"

export abstract class NameFinder {
	public abstract find(
		filter: Filter,
		from: number,
		limit: number
	): Promise<Name[]>
}
