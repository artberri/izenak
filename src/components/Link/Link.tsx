import { Route, useNavigation } from "../../providers/NavigationProvider"
import { WithChildren } from "../../types/WithChildren"
import "./Link.css"

export interface LinkProps extends WithChildren {
	route: Route
	class?: string
}

export function Link({ children, class: className = "", route }: LinkProps) {
	const { navigate } = useNavigation()

	return (
		<button class={`link ${className}`} onClick={() => navigate(route)}>
			{children}
		</button>
	)
}
