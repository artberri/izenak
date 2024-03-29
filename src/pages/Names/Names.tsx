import { useEffect, useState } from "preact/hooks"
import { always, cond, equals, T } from "ramda"
import { Loader } from "../../components/Loader/Loader"
import { NameCards } from "../../components/NameCards/NameCards"
import { PageTitle } from "../../components/PageTitle/PageTitle"
import { useService } from "../../providers/DependencyInjectionProvider"
import { useTranslation } from "../../providers/TranslationProvider"
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
	[equals<Gender | undefined>(Gender.Male), always("title.maleNames")],
	[equals<Gender | undefined>(Gender.Female), always("title.femaleNames")],
	[T, always("title.allNames")],
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

	const { t } = useTranslation()
	const [loading, setLoading] = useState(true)
	const [minimizeFilter, setMinimizeFilter] = useState(false)
	const [fixFilter, setFixFilter] = useState(false)
	const [names, setNames] = useState<Name[]>([])
	const [filter, setFilter] = useState<Filter>(() => defaultFilter)
	const [from, setFrom] = useState(0)
	const [loadingMore, setLoadingMore] = useState(false)
	const [showMoreButton, setShowMoreButton] = useState(false)
	const [openedNameCard, setOpenedNameCard] = useState<Name | undefined>(
		undefined,
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

	return (
		<main role="main" class="names">
			<PageTitle>{t(title(gender))}</PageTitle>
			<NameCards
				openedName={openedNameCard}
				setOpenedName={setOpenedNameCard}
				names={names}
			/>
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
								<p>{t("content.noResults")}</p>
								<p>{t("content.refineSearch")}</p>
							</>
						)}
						{names.map((name) => (
							<NameTag
								key={name.id}
								name={name}
								onClick={() => setOpenedNameCard(name)}
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
							{t("button.seeMore")}
						</button>
					))}
			</div>
		</main>
	)
}
