import { WithChildren } from "../../../types/WithChildren"
import "./Icon.css"

export interface IconProps {
	title?: string
	class?: string
}

export function Icon({
	children,
	title,
	class: className = "",
}: IconProps & WithChildren) {
	return (
		<svg class={`icon ${className}`} viewBox="0 0 32 32">
			{title && <title>{title}</title>}
			{children}
		</svg>
	)
}
