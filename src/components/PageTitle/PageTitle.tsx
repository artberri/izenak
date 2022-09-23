import { WithChildren } from "../../types/WithChildren"
import { BackIcon } from "../BackIcon/BackIcon"
import { Link } from "../Link/Link"
import "./PageTitle.css"

export function PageTitle({ children }: WithChildren) {
	return (
		<div class="pagetitle">
			<div class="pagetitle__link">
				<Link back>
					<BackIcon /> Atzera
				</Link>
			</div>
			<h2 class="pagetitle__title">{children}</h2>
		</div>
	)
}
