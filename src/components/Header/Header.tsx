import { Route } from "../../providers/NavigationProvider"
import { InfoIcon } from "../Icons/Icons"
import { Link } from "../Link/Link"
import "./Header.css"

export function Header() {
	return (
		<header role="banner" class="header nav">
			<h1 class="header__title">
				<img
					src="/img/icons/favicon-16x16.png"
					alt=""
					style="padding-right: 5px"
				/>
				<Link route={Route.Home}>
					<span class="header__letter header__letter--girl">i</span>
					<span class="header__letter header__letter--boy">z</span>
					<span class="header__letter header__letter--all">e</span>
					<span class="header__letter">n</span>
					<span class="header__letter">a</span>
					<span class="header__letter">k</span>
					<span>.</span>
					<span class="header__letter header__letter--small">e</span>
					<span class="header__letter header__letter--small">u</span>
					<span class="header__letter header__letter--small">s</span>
				</Link>
			</h1>
			<Link route={Route.About}>
				<InfoIcon title="Honi buruz" class="header__info" />
			</Link>
		</header>
	)
}
