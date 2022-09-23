import { Route, useNavigation } from "../../providers/NavigationProvider"
import { WithChildren } from "../../types/WithChildren"
import "./Link.css"

export interface LinkProps extends WithChildren {
	route: Route
	class?: string
	back?: undefined
}

export interface BackLinkProps extends WithChildren {
	route?: undefined
	back: true
	class?: string
}

export function Link({
	children,
	class: className = "",
	route,
	back,
}: LinkProps | BackLinkProps) {
	const { navigate, back: goBack } = useNavigation()

	return (
		<button
			class={`link ${className}`}
			onClick={() => (back ? goBack() : navigate(route))}
		>
			{children}
		</button>
	)
}
