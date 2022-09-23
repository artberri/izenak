import { WithChildren } from "../../types/WithChildren"
import { BackIcon } from "../BackIcon/BackIcon"
import "./PageTitle.css"

export function PageTitle({ children }: WithChildren) {
	const onClick: JSX.MouseEventHandler<HTMLAnchorElement> = (e) => {
		if (history.length > 1) {
			e.preventDefault()
			history.go(-1)
		}
	}

	return (
		<div class="pagetitle">
			<div class="pagetitle__link">
				<a href="/" onClick={onClick}>
					<BackIcon /> Atzera
				</a>
			</div>
			<h2 class="pagetitle__title">{children}</h2>
		</div>
	)
}
