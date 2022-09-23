import {
	allPass,
	always,
	cond,
	equals,
	filter as filterArray,
	map,
	pipe,
	slice,
	sort,
	T,
} from "ramda"
import { NameFinder } from "../services/name-finder"
import { Filter } from "../types/Filter"
import { Gender } from "../types/Gender"
import { Name } from "../types/Name"

type JsonNameGender = "epizenoa" | "gizonezkoa" | "emakumezkoa"

interface JsonName {
	name: string
	translations: string
	gender: JsonNameGender
	meaning: string
}

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
const normalize = (text: string) =>
	text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export const shuffle = <T>(arr: T[]) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j] as T, arr[i] as T]
	}

	return arr
}

export const sortByName = sort<Name>((a, b) => {
	if (a.value > b.value) {
		return 1
	}
	if (a.value < b.value) {
		return -1
	}

	return 0
})

const mapGender = cond([
	[equals<JsonNameGender>("emakumezkoa"), always(Gender.Female)],
	[equals("gizonezkoa"), always(Gender.Male)],
	[T, always(Gender.Neutral)],
])

const mapNames = map(
	(name: JsonName): Name => ({
		id: `${name.name}---${name.gender}`,
		value: name.name,
		meaning: name.meaning || undefined,
		translations: name.translations || undefined,
		gender: mapGender(name.gender),
	})
)

const fetchNames = async () => {
	const response = await fetch("/izenak.json")
	if (!response.ok) {
		// eslint-disable-next-line no-console
		console.error(response.status)
		throw new Error(`Could not fetch name JSON. Error: ${response.status}`)
	}

	const names = (await response.json()) as JsonName[]

	return mapNames(names)
}

const filterByGender = (gender?: Gender) => (name: Name) =>
	!gender || name.gender === gender || name.gender === Gender.Neutral
const filterBySearchTerm = (searchTerm?: string) => (name: Name) =>
	!searchTerm || name.value.includes(searchTerm)
const filterByMaxChars = (maxChars: number) => (name: Name) =>
	maxChars < 1 || name.value.length < maxChars
const filterByMinChars = (minChars: number) => (name: Name) =>
	minChars < 1 || name.value.length > minChars
const filterByOnlyBasque = (onlyBasque: boolean) => (name: Name) =>
	!onlyBasque || !name.translations
const filterByStartsWith = (startsWith: string) => (name: Name) =>
	!startsWith || name.value.startsWith(startsWith)
const filterByEndsWith = (endsWith: string) => (name: Name) =>
	!endsWith || name.value.endsWith(endsWith)
const normalizeFilter = (filter: Filter): Filter => ({
	...filter,
	searchTerm: normalize(filter.searchTerm),
	startsWith: normalize(filter.startsWith),
	endsWith: normalize(filter.endsWith),
})
const normalizeName = (name: Name): Name => ({
	...name,
	value: normalize(name.value),
})
const filterName = (filter: Filter) => {
	const normalizedFilter = normalizeFilter(filter)

	return pipe(
		normalizeName,
		allPass([
			filterByGender(normalizedFilter.gender),
			filterBySearchTerm(normalizedFilter.searchTerm),
			filterByMaxChars(normalizedFilter.maxChars),
			filterByMinChars(normalizedFilter.minChars),
			filterByOnlyBasque(normalizedFilter.onlyBasque),
			filterByStartsWith(normalizedFilter.startsWith),
			filterByEndsWith(normalizedFilter.endsWith),
		])
	)
}

export class ScrapedJsonNameFinder implements NameFinder {
	private names: Name[] = []
	private sortedNames: Name[] = []

	public async find(
		filter: Filter,
		from: number,
		limit: number
	): Promise<Name[]> {
		const paginateNames = slice(from, from + limit)
		const filterNames = filterArray(filterName(filter))
		const names = await this.getAllNames(filter.sort)

		return paginateNames(filterNames(names))
	}

	private async getAllNames(sorted: boolean) {
		if (this.names.length === 0) {
			this.names = shuffle(await fetchNames())
			this.sortedNames = sortByName(this.names)
		}

		return sorted ? this.sortedNames : this.names
	}
}
