import { WithChildren } from "../../types/WithChildren"
import "./Page.css"

export interface PageProps extends WithChildren {
	path: string
	default?: boolean
}

export function Page({ children, path }: PageProps) {
	return (
		<div class="page page--in" key={path}>
			{children}
		</div>
	)
}
