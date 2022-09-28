import { useCallback, useEffect, useMemo, useState } from "preact/hooks"
import { always, cond, equals, T } from "ramda"
import { Loader } from "../../components/Loader/Loader"
import { NameCard } from "../../components/NameCard/NameCard"
import { PageTitle } from "../../components/PageTitle/PageTitle"
import { useService } from "../../providers/DependencyInjectionProvider"
import { NameFinder } from "../../services/name-finder"
import { Filter } from "../../types/Filter"
import { Gender } from "../../types/Gender"
import { Name } from "../../types/Name"
import { NameFilter } from "./components/NameFilter/NameFilter"
import { NameLoader } from "./components/NameLoader/NameLoader"
import { NameTag } from "./components/NameTag/NameTag"
import "./Names.css"

const namesPerPage = 100
const minimizeFilterPixelScroll = 100

const title = cond([
	[equals<Gender | undefined>(Gender.Male), always("Mutilen izenak")],
	[equals<Gender | undefined>(Gender.Female), always("Nesken izenak")],
	[T, always("Izen guztiak")],
])

export interface IzenakProps {
	gender?: Gender
}

export function Names({ gender }: IzenakProps) {
	const defaultFilter = {
		endsWith: "",
		maxChars: 0,
		minChars: 0,
		onlyBasque: false,
		searchTerm: "",
		sort: false,
		startsWith: "",
		gender,
	}

	const [loading, setLoading] = useState(true)
	const [minimizeFilter, setMinimizeFilter] = useState(false)
	const [fixFilter, setFixFilter] = useState(false)
	const [names, setNames] = useState<Name[]>([])
	const [filter, setFilter] = useState<Filter>(() => defaultFilter)
	const [from, setFrom] = useState(0)
	const [loadingMore, setLoadingMore] = useState(false)
	const [showMoreButton, setShowMoreButton] = useState(false)
	const [selectedNameIndex, setSelectedNameIndex] = useState(-1)

	const selectedName = useMemo(
		() => (selectedNameIndex >= 0 ? names[selectedNameIndex] : undefined),
		[names, selectedNameIndex]
	)

	const nameFinder = useService(NameFinder)
	useEffect(() => {
		setFrom(0)
		setMinimizeFilter(false)
		void nameFinder
			.find(filter, 0, namesPerPage)
			.then((foundNames) => {
				setNames(foundNames)
				setFrom((prev) => prev + namesPerPage)
				setShowMoreButton(foundNames.length === namesPerPage)
			})
			.finally(() => setLoading(false))
	}, [filter, nameFinder])

	const reset = () => setFilter(defaultFilter)
	const showMore = () => {
		setLoadingMore(true)
		void nameFinder
			.find(filter, from, namesPerPage)
			.then((foundNames) => {
				setNames((prev) => [...prev, ...foundNames])
				setFrom((prev) => prev + namesPerPage)
				setShowMoreButton(foundNames.length === namesPerPage)
			})
			.finally(() => setLoadingMore(false))
	}

	const onScroll = (e: Event) => {
		const fix =
			(e.target as HTMLDivElement).scrollTop > minimizeFilterPixelScroll
		setFixFilter(fix)
		setMinimizeFilter(fix)
	}

	const closeNameCard = useCallback(() => setSelectedNameIndex(-1), [])
	const previousNameCard = useCallback(
		() => setSelectedNameIndex(selectedNameIndex - 1),
		[selectedNameIndex]
	)
	const nextNameCard = useCallback(
		() => setSelectedNameIndex(selectedNameIndex + 1),
		[selectedNameIndex]
	)

	return (
		<main role="main" class="names">
			<PageTitle>{title(gender)}</PageTitle>
			{selectedName && (
				<NameCard
					name={selectedName}
					close={closeNameCard}
					onLeft={selectedNameIndex > 0 ? previousNameCard : undefined}
					onRight={
						selectedNameIndex >= 0 && selectedNameIndex < names.length - 1
							? nextNameCard
							: undefined
					}
				/>
			)}
			<div className="names__container" onScroll={onScroll}>
				{!loading && (
					<NameFilter
						minimized={minimizeFilter}
						fixed={fixFilter}
						maximize={() => setMinimizeFilter(false)}
						filter={filter}
						setFilter={setFilter}
						reset={reset}
					/>
				)}
				{!loading && (
					<div class="names__cloud">
						{names.length === 0 && (
							<>
								<p>Bilaketak ez du emaitzarik. </p>
								<p>Aldatu iragazkiak izenak ikusteko.</p>
							</>
						)}
						{names.map((name, index) => (
							<NameTag
								key={name.id}
								name={name}
								onClick={() => setSelectedNameIndex(index)}
							/>
						))}
					</div>
				)}
				{loading && <NameLoader />}
				{showMoreButton &&
					(loadingMore ? (
						<Loader />
					) : (
						<button className="names__showmore" onClick={showMore}>
							Gehiago ikusi
						</button>
					))}
			</div>
		</main>
	)
}
