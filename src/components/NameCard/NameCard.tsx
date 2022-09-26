import { createPortal } from "preact/compat"
import { useEffect } from "preact/hooks"
import { Name } from "../../types/Name"
import { CloseIcon } from "../Icons/CloseIcon/CloseIcon"
import { NameCardContainer } from "./components/NameCardContainer/NameCardContainer"
import "./NameCard.css"

export interface NameCardProps {
	close: () => void
	name: Name
}

export function NameCard({ close, name }: NameCardProps) {
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				close()
			}
		}

		document.body.addEventListener("keydown", closeOnEscapeKey)

		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey)
		}
	}, [close])

	const closeIfDirectClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			close()
		}
	}

	const cardClasses = `namecard namecard--${name.gender.toLowerCase()}`

	return createPortal(
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
		<article class={cardClasses} onClick={closeIfDirectClick}>
			<div class="namecard__card">
				<button class="namecard__close" onClick={close}>
					<CloseIcon />
				</button>
				<h1 class="namecard__title">{name.value}</h1>
			</div>
		</article>,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		document.getElementById(NameCardContainer.Id)!
	)
}

NameCard.Container = NameCardContainer
