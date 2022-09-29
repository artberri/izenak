/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CSSTransition } from "preact-transitioning"
import { createPortal } from "preact/compat"
import { useCallback, useEffect, useState } from "preact/hooks"
import { Name } from "../../types/Name"
import { NameCard } from "./components/NameCard/NameCard"
import { NameCardsContainer } from "./components/NameCardsContainer/NameCardsContainer"
import "./NameCards.css"

export interface NameCardsProps {
	openedName?: Name
	setOpenedName: (name?: Name) => void
	names: Name[]
	show: boolean
}

export function NameCards({
	show,
	names,
	openedName,
	setOpenedName,
}: NameCardsProps) {
	const [forward, setForward] = useState(true)
	const onClose = useCallback(() => setOpenedName(undefined), [setOpenedName])

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

	const baseClass = `namecards__card ${
		forward ? "namecards__card--forward" : "namecards__card--backward"
	}`

	return createPortal(
		<CSSTransition
			in={show}
			duration={300}
			classNames={{
				appear: `namecards `,
				appearActive: `$namecards namecards--in`,
				appearDone: `namecards namecards--in`,
				enter: `namecards namecards--in`,
				enterActive: `namecards namecards--in`,
				enterDone: `namecards `,
				exit: `namecards `,
				exitActive: `namecards namecards--out`,
				exitDone: `namecards namecards--out`,
			}}
		>
			<div class="namecards" onClick={closeIfDirectClick}>
				{names.map((name, index) => {
					const onLeft =
						index > 0
							? () => {
									setForward(false)
									setOpenedName(names[index - 1])
							  }
							: undefined
					const onRight =
						index + 1 < names.length
							? () => {
									setForward(true)
									setOpenedName(names[index + 1])
							  }
							: undefined

					return (
						<CSSTransition
							key={name.id}
							in={name.id === openedName?.id}
							duration={500}
							classNames={{
								appear: `${baseClass} `,
								appearActive: `${baseClass} namecards__card--new`,
								appearDone: `${baseClass} namecards__card--new`,
								enter: `${baseClass} namecards__card--in`,
								enterActive: `${baseClass} namecards__card--in`,
								enterDone: `${baseClass} `,
								exit: `${baseClass} `,
								exitActive: `${baseClass} namecards__card--out`,
								exitDone: `${baseClass} namecards__card--out`,
							}}
						>
							<div onClick={closeIfDirectClick}>
								<NameCard
									name={name}
									onClose={onClose}
									onLeft={onLeft}
									onRight={onRight}
								/>
							</div>
						</CSSTransition>
					)
				})}
			</div>
		</CSSTransition>,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		document.getElementById(NameCardsContainer.Id)!
	)
}

NameCards.Container = NameCardsContainer
