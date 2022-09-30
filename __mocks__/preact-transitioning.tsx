import { WithChildren } from "../src/types/WithChildren"

interface CSSTransitionProps extends WithChildren {
	in: boolean
}

export function CSSTransition({ children, in: show }: CSSTransitionProps) {
	return show ? <div class="CSSTransitionMock">{children}</div> : null
}
