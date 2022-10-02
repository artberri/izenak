/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CSSTransition } from "preact-transitioning"
import { createPortal } from "preact/compat"
import { useEffect } from "preact/hooks"
import { useTranslation } from "../../providers/TranslationProvider"
import { WithChildren } from "../../types/WithChildren"
import { CloseIcon } from "../Icons/CloseIcon/CloseIcon"
import { ModalContainer } from "./components/ModalContainer/ModalContainer"
import "./Modal.css"

export interface NameCardsProps extends WithChildren {
	show: boolean
	onClose: () => void
}

export function Modal({ show, onClose, children }: NameCardsProps) {
	const { t } = useTranslation()

	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
		}

		document.body.addEventListener("keydown", closeOnEscapeKey)

		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey)
		}
	}, [onClose])

	const closeIfDirectClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return createPortal(
		<CSSTransition
			in={show}
			duration={300}
			classNames={{
				appear: `modal `,
				appearActive: `$modal modal--in`,
				appearDone: `modal modal--in`,
				enter: `modal modal--in`,
				enterActive: `modal modal--in`,
				enterDone: `modal `,
				exit: `modal `,
				exitActive: `modal modal--out`,
				exitDone: `modal modal--out`,
			}}
		>
			<div
				role="dialog"
				class="modal"
				data-testid="modal-background"
				onClick={closeIfDirectClick}
			>
				<div class="modal__content">
					<button class="modal__close" onClick={onClose}>
						<CloseIcon title={t("button.close")} />
					</button>
					{children}
				</div>
			</div>
		</CSSTransition>,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		document.getElementById(ModalContainer.Id)!
	)
}

Modal.Container = ModalContainer
