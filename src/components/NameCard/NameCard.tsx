import { createPortal } from "preact/compat"
import { useEffect } from "preact/hooks"
import { Name } from "../../types/Name"
import { CloseIcon } from "../Icons/CloseIcon/CloseIcon"
import { BackwardIcon, ForwardIcon, HeartIcon } from "../Icons/Icons"
import { NameCardContainer } from "./components/NameCardContainer/NameCardContainer"
import "./NameCard.css"

export interface NameCardProps {
	close: () => void
	name: Name
	onLeft?: () => void
	onRight?: () => void
}

export function NameCard({ close, name, onLeft, onRight }: NameCardProps) {
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
				<div class="namecard__controls">
					<button
						disabled={!onLeft}
						class="namecard__navigation namecard__navigation--left"
						onClick={onLeft}
					>
						<BackwardIcon />
					</button>
					<button class="namecard__favourite">
						<HeartIcon class="namecard__heart" />
					</button>
					<button
						disabled={!onRight}
						class="namecard__navigation namecard__navigation--right"
						onClick={onRight}
					>
						<ForwardIcon />
					</button>
				</div>
				<div class="namecard__info">
					<div>
						<h2 class="namecard__subtitle">Beste hizkuntzetan</h2>
						<p class="namecard__content">
							{name.translations ??
								"Izen honek ez dauka itzulpenik Euskaltzaindiaren corpusean"}
						</p>
					</div>
					<div>
						<h2 class="namecard__subtitle">Esanahia</h2>
						<p class="namecard__content">
							{name.meaning ??
								"Izen honek ez dauka definiziorik Euskaltzaindiaren corpusean"}
						</p>
					</div>
				</div>
			</div>
		</article>,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		document.getElementById(NameCardContainer.Id)!
	)
}

NameCard.Container = NameCardContainer
