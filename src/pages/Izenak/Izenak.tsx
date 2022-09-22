import { PageTitle } from "../../components/PageTitle/PageTitle"
import "./Izenak.css"

type IzenakPageFilter = "male" | "female" | "favourites" | "all"

const title = (pageFilter: IzenakPageFilter) => {
	switch (pageFilter) {
		case "male":
			return "Mutilen izenak"
		case "female":
			return "Nesken izenak"
		case "favourites":
			return "Gogokoak"
		default:
			return "Izen guztiak"
	}
}

export interface IzenakProps {
	pageFilter: IzenakPageFilter
}

export function Izenak({ pageFilter }: IzenakProps) {
	return (
		<main role="main" class="izenak">
			<PageTitle>{title(pageFilter)}</PageTitle>
		</main>
	)
}
