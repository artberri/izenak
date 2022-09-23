import { CSSTransition } from "preact-transitioning"
import { Route, useNavigation } from "../../providers/NavigationProvider"
import { WithChildren } from "../../types/WithChildren"
import "./Page.css"

export interface PageProps extends WithChildren {
	route: Route
	slide?: boolean
}

export function Page({ children, route, slide }: PageProps) {
	const { isRoute } = useNavigation()
	const slideClass = slide ? "page--slide" : ""

	return (
		<CSSTransition
			in={isRoute(route)}
			duration={2000}
			classNames={{
				appear: `page ${slideClass}`,
				appearActive: `page ${slideClass}`,
				appearDone: `page ${slideClass}`,
				enter: `page ${slideClass} page--in`,
				enterActive: `page ${slideClass} page--in`,
				enterDone: `page ${slideClass}`,
				exit: `page ${slideClass}`,
				exitActive: `page ${slideClass} page--out`,
				exitDone: `page ${slideClass} page--out`,
			}}
			key={route}
		>
			<div>{children}</div>
		</CSSTransition>
	)
}
