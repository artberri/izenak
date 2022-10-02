import { Route } from "../../providers/NavigationProvider"
import { useTranslation } from "../../providers/TranslationProvider"
import { WithChildren } from "../../types/WithChildren"
import { BackIcon } from "../Icons/Icons"
import { Link } from "../Link/Link"
import "./PageTitle.css"

export function PageTitle({ children }: WithChildren) {
	const { t } = useTranslation()

	return (
		<div class="pagetitle">
			<div class="pagetitle__link">
				<Link route={Route.Home}>
					<BackIcon /> {t("link.back")}
				</Link>
			</div>
			<h2 class="pagetitle__title">{children}</h2>
		</div>
	)
}
