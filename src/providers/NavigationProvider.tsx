import { createContext } from "preact"
import { useCallback, useContext, useEffect, useState } from "preact/hooks"
import { WithChildren } from "../types/WithChildren"

export const enum Route {
	Home = "home",
	MaleNames = "male",
	FemaleNames = "female",
	AllNames = "all",
	About = "about",
}

export interface Navigation {
	isRoute: (r: Route) => boolean
	navigate: (r: Route) => void
}

const NavigationContext = createContext<Navigation>({
	isRoute: () => false,
	navigate: () => undefined,
})

export function NavigationProvider({ children }: WithChildren) {
	const [route, setRoute] = useState(Route.Home)

	useEffect(() => {
		function handlePopstateEvent(event: PopStateEvent) {
			const r = (event.state as { route: Route } | null)?.route ?? Route.Home
			setRoute(r)
		}

		window.addEventListener("popstate", handlePopstateEvent)

		return () => {
			window.removeEventListener("popstate", handlePopstateEvent)
		}
	}, [])

	const isRoute = useCallback((r: Route) => route === r, [route])

	const navigate = useCallback((r: Route) => {
		window.history.pushState({ route: r }, "")
		setRoute(r)
	}, [])

	return (
		<NavigationContext.Provider value={{ navigate, isRoute }}>
			{children}
		</NavigationContext.Provider>
	)
}

export const useNavigation = () => useContext(NavigationContext)
