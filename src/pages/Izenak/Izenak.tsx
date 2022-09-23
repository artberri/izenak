import { useEffect, useState } from "preact/hooks"
import { PageTitle } from "../../components/PageTitle/PageTitle"
import { useService } from "../../providers/DependencyInjectionProvider"
import { NameFinder } from "../../services/name-finder"
import { Filter } from "../../types/Filter"
import { Gender } from "../../types/Gender"
import { Name } from "../../types/Name"
import "./Izenak.css"

const namesPerPage = 100

const title = (gender?: Gender) => {
	switch (gender) {
		case Gender.Male:
			return "Mutilen izenak"
		case Gender.Female:
			return "Nesken izenak"
		default:
			return "Izen guztiak"
	}
}

export interface IzenakProps {
	gender?: Gender
}

export function Izenak({ gender }: IzenakProps) {
	const [names] = useState<Name[]>([])
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
			// eslint-disable-next-line no-console
			.then((foundNames) => console.log(foundNames))
	}, [filter, nameFinder, names])

	return (
		<main role="main" class="izenak">
			<PageTitle>{title(gender)}</PageTitle>
			<div className="izenak__container">
				{names.length === 0 && (
					<>
						<p>Bilaketak ez du emaitzarik. </p>
						<p>Aldatu iragazkiak izenak ikusteko.</p>
					</>
				)}
			</div>
		</main>
	)
}
