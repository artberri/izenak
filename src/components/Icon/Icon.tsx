import { WithChildren } from "../../types/WithChildren"
import "./Icon.css"

export interface IconProps extends WithChildren {
	title?: string
}

export function Icon({ children, title }: IconProps) {
	return (
		<svg class="icon" viewBox="0 0 32 32">
			{title && <title>{title}</title>}
			{children}
		</svg>
	)
}
