import { WithChildren } from "../../types/WithChildren"
import "./Icon.css"

export function Icon({ children }: WithChildren) {
	return (
		<svg class="icon" viewBox="0 0 32 32">
			{children}
		</svg>
	)
}
