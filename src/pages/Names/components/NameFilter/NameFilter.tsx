import { FilterIcon, SearchIcon } from "../../../../components/Icons/Icons"
import { useTranslation } from "../../../../providers/TranslationProvider"
import { Filter } from "../../../../types/Filter"
import { FilterCheckbox } from "./components/FilterCheckbox/FilterCheckbox"
import { FilterInput } from "./components/FilterInput/FilterInput"
import { FilterSlider } from "./components/FilterSlider/FilterSlider"
import "./NameFilter.css"

export interface NameFilterProps {
	filter: Filter
	setFilter: (c: (previousValue: Filter) => Filter) => void
	reset: () => void
	minimized: boolean
	fixed: boolean
	maximize: () => void
}

export function NameFilter({
	filter,
	setFilter,
	reset,
	minimized,
	fixed,
	maximize,
}: NameFilterProps) {
	const { t } = useTranslation()

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

	let classes = "namefilter"
	if (fixed) {
		classes += " namefilter--fixed"
	}
	if (minimized) {
		classes += " namefilter--minimized"
	}

	return (
		<section role="search" class={classes}>
			<div class="namefilter__container">
				{minimized && (
					<button class="namefilter__toggle" onClick={maximize}>
						<FilterIcon title={t("button.openFilters")} />
					</button>
				)}
				{!minimized && (
					<>
						<div class="namefilter__field">
							<FilterInput
								name="search"
								label={t("label.searchTerm")}
								icon={<SearchIcon />}
								value={filter.searchTerm}
								onChange={onSerchTermChanged}
							/>
						</div>
						<div class="namefilter__field">
							<FilterInput
								name="start-words"
								label={t("label.startsWith")}
								value={filter.startsWith}
								onChange={onStartsWithChanged}
							/>
							<FilterInput
								name="end-words"
								label={t("label.endsWith")}
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
								label={t("label.numberOfLetters")}
								name="char-length"
								onChange={onCharsRangeChanged}
							/>
						</div>
						<div class="namefilter__field">
							<FilterCheckbox
								label={t("label.onlyBasque")}
								name="onlybasque"
								checked={filter.onlyBasque}
								onChange={onOnlyBasqueChanged}
							/>
						</div>
						<div class="namefilter__field">
							<FilterCheckbox
								label={t("label.sortAlphabetically")}
								name="alphabeticalorder"
								checked={filter.sort}
								onChange={onSortChanged}
							/>
						</div>
						<div class="namefilter__field">
							<button class="namefilter__reset" onClick={reset}>
								{t("button.removeFilters")}
							</button>
						</div>
					</>
				)}
			</div>
		</section>
	)
}
