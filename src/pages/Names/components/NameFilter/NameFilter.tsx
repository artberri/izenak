import { SearchIcon } from "../../../../components/Icons/Icons"
import { Filter } from "../../../../types/Filter"
import { FilterCheckbox } from "./components/FilterCheckbox/FilterCheckbox"
import { FilterInput } from "./components/FilterInput/FilterInput"
import { FilterSlider } from "./components/FilterSlider/FilterSlider"
import "./NameFilter.css"

export interface NameFilterProps {
	filter: Filter
	setFilter: (c: (previousValue: Filter) => Filter) => void
	reset: () => void
}

export function NameFilter({ filter, setFilter, reset }: NameFilterProps) {
	const onSerchTermChanged = (searchTerm: string) => {
		setFilter((previousValue) => ({
			...previousValue,
			searchTerm,
		}))
	}

	const onStartsWithChanged = (startsWith: string) => {
		setFilter((previousValue) => ({
			...previousValue,
			startsWith,
		}))
	}

	const onEndsWithChanged = (endsWith: string) => {
		setFilter((previousValue) => ({
			...previousValue,
			endsWith,
		}))
	}

	const onCharsRangeChanged = (minValue: number, maxValue: number) => {
		setFilter((previousValue) => ({
			...previousValue,
			maxChars: maxValue,
			minChars: minValue,
		}))
	}

	const onOnlyBasqueChanged = () => {
		setFilter((previousValue) => ({
			...filter,
			onlyBasque: !previousValue.onlyBasque,
		}))
	}

	const onSortChanged = () => {
		setFilter((previousValue) => ({
			...filter,
			sort: !previousValue.sort,
		}))
	}

	return (
		<section role="search" class="namefilter">
			<div class="namefilter__container">
				<div class="namefilter__field">
					<FilterInput
						name="search"
						label="Bilaketa-terminoa"
						icon={<SearchIcon />}
						value={filter.searchTerm}
						onChange={onSerchTermChanged}
					/>
				</div>
				<div class="namefilter__field">
					<FilterInput
						name="start-words"
						label="Hasten da"
						value={filter.startsWith}
						onChange={onStartsWithChanged}
					/>
					<FilterInput
						name="end-words"
						label="Amaitzen da"
						value={filter.endsWith}
						onChange={onEndsWithChanged}
					/>
				</div>
				<div class="namefilter__field">
					<FilterSlider
						min={2}
						max={23}
						start={filter.minChars}
						end={filter.maxChars}
						label="Letra kopurua"
						name="char-length"
						onChange={onCharsRangeChanged}
					/>
				</div>
				<div class="namefilter__field">
					<FilterCheckbox
						label="Euskal jatorrizko izenak soilik"
						name="onlybasque"
						checked={filter.onlyBasque}
						onChange={onOnlyBasqueChanged}
					/>
				</div>
				<div class="namefilter__field">
					<FilterCheckbox
						label="Izenak alfabetikoki ordenatu"
						name="alphabeticalorder"
						checked={filter.sort}
						onChange={onSortChanged}
					/>
				</div>
				<div class="namefilter__field">
					<button class="namefilter__reset" onClick={reset}>
						Kendu iragazkiak
					</button>
				</div>
			</div>
		</section>
	)
}
