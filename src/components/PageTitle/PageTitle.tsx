import { WithChildren } from "../../types/WithChildren"
import { Icon } from "../Icon/Icon"
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
					<Icon>
						<path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
					</Icon>{" "}
					Atzera
				</a>
			</div>
			<h2 class="pagetitle__title">{children}</h2>
		</div>
	)
}
