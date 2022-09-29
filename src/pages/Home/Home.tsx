import { Link } from "../../components/Link/Link"
import { Route } from "../../providers/NavigationProvider"
import { Favorites } from "./components/Favorites/Favorites"
import "./Home.css"

export function Home() {
	return (
		<>
			<nav class="home" role="navigation" aria-label="Menu nagusia">
				<Link
					class="home__link home__link--girl flex flex--center font--slabo"
					route={Route.FemaleNames}
				>
					Nesken izenak
				</Link>
				<Link
					class="home__link home__link--boy flex flex--center font--slabo"
					route={Route.MaleNames}
				>
					Mutilen izenak
				</Link>
				<Link
					class="home__link home__link--all flex flex--center font--slabo"
					route={Route.AllNames}
				>
					Izen guztiak
				</Link>
			</nav>
			<Favorites />
		</>
	)
}
