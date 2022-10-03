import { Route } from "../../providers/NavigationProvider"
import { useTranslation } from "../../providers/TranslationProvider"
import { InfoIcon } from "../Icons/Icons"
import { Link } from "../Link/Link"
import "./Header.css"

export function Header() {
	const { t } = useTranslation()

	return (
		<header role="banner" class="header nav">
			<h1 class="header__title">
				<img
					class="header__logo"
					src="/icon-24.png"
					height="24"
					width="24"
					alt=""
				/>
				<Link route={Route.Home}>
					<span class="header__titletext">
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
					</span>
				</Link>
			</h1>
			<Link route={Route.About}>
				<InfoIcon title={t("link.aboutUs")} class="header__info" />
			</Link>
		</header>
	)
}
