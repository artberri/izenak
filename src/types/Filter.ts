import { Gender } from "./Gender"

export interface Filter {
	sort: boolean
	gender?: Gender
	searchTerm: string
	minChars: number
	maxChars: number
	onlyBasque: boolean
	startsWith: string
	endsWith: string
}
