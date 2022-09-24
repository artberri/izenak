import { SearchIcon } from "../../../../components/SearchIcon/SearchIcon"
import { Filter } from "../../../../types/Filter"
import { FilterInput } from "./components/FilterInput/FilterInput"
import "./NameFilter.css"

export interface NameFilterProps {
	filter: Filter
	setFilter: (f: Filter) => void
}

export function NameFilter({ filter, setFilter }: NameFilterProps) {
	const onSerchTermChanged = (searchTerm: string) => {
		setFilter({
			...filter,
			searchTerm,
		})
	}

	const onStartsWithChanged = (startsWith: string) => {
		setFilter({
			...filter,
			startsWith,
		})
	}

	const onEndsWithChanged = (endsWith: string) => {
		setFilter({
			...filter,
			endsWith,
		})
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
			</div>
		</section>
	)
}
