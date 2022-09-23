import { useEffect, useState } from "preact/hooks"
import { always, cond, equals, T } from "ramda"
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

const title = cond([
	[equals<Gender | undefined>(Gender.Male), always("Mutilen izenak")],
	[equals<Gender | undefined>(Gender.Female), always("Nesken izenak")],
	[T, always("Izen guztiak")],
])

export interface IzenakProps {
	gender?: Gender
}

export function Names({ gender }: IzenakProps) {
	const [loading, setLoading] = useState(true)
	const [names, setNames] = useState<Name[]>([])
	const [filter] = useState<Filter>({
		endsWith: "",
		maxChars: 0,
		minChars: 0,
		onlyBasque: false,
		searchTerm: "",
		sort: false,
		startsWith: "",
		gender,
	})

	const nameFinder = useService(NameFinder)
	useEffect(() => {
		void nameFinder
			.find(filter, 0, namesPerPage)
			.then((foundNames) => setNames(foundNames))
			.finally(() => setLoading(false))
	}, [filter, nameFinder, names])

	return (
		<main role="main" class="names">
			<PageTitle>{title(gender)}</PageTitle>
			<div className="names__container">
				{loading && <NameLoader />}
				{!loading && <NameFilter />}
				{!loading && (
					<div class="names__cloud">
						{names.length === 0 && (
							<>
								<p>Bilaketak ez du emaitzarik. </p>
								<p>Aldatu iragazkiak izenak ikusteko.</p>
							</>
						)}
						{names.map((name) => (
							<NameTag key={name.id} name={name} />
						))}
					</div>
				)}
			</div>
		</main>
	)
}
