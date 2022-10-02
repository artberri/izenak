import { Link } from "../../components/Link/Link"
import { Route } from "../../providers/NavigationProvider"
import { useTranslation } from "../../providers/TranslationProvider"
import { Favorites } from "./components/Favorites/Favorites"
import "./Home.css"

export function Home() {
	const { t } = useTranslation()

	return (
		<>
			<nav class="home" role="navigation" aria-label="Menu nagusia">
				<Link
					class="home__link home__link--girl flex flex--center font--slabo"
					route={Route.FemaleNames}
				>
					{t("link.femaleNames")}
				</Link>
				<Link
					class="home__link home__link--boy flex flex--center font--slabo"
					route={Route.MaleNames}
				>
					{t("link.maleNames")}
				</Link>
				<Link
					class="home__link home__link--all flex flex--center font--slabo"
					route={Route.AllNames}
				>
					{t("link.allNames")}
				</Link>
			</nav>
			<Favorites />
		</>
	)
}
