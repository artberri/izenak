import { useFavorites } from "../../../../providers/FavoritesProvider"
import { Name } from "../../../../types/Name"
import { CloseIcon } from "../../../Icons/CloseIcon/CloseIcon"
import { BackwardIcon, ForwardIcon, HeartIcon } from "../../../Icons/Icons"
import "./NameCard.css"

export interface NameCardProps {
	onClose: () => void
	name: Name
	onLeft?: () => void
	onRight?: () => void
}

export function NameCard({ onClose, name, onLeft, onRight }: NameCardProps) {
	const cardClasses = `namecard namecard--${name.gender.toLowerCase()}`

	const { isFavorite, toggleFavorite } = useFavorites()

	return (
		<article class={cardClasses}>
			<button class="namecard__close" onClick={onClose}>
				<CloseIcon title="Itxi" />
			</button>
			<h1 class="namecard__title">{name.value}</h1>
			<div class="namecard__controls">
				<button
					disabled={!onLeft}
					class="namecard__navigation namecard__navigation--left"
					onClick={onLeft}
				>
					<BackwardIcon title="Aurreko izena ikusi" />
				</button>
				<button
					class="namecard__favourite"
					onClick={() => toggleFavorite(name)}
					title={isFavorite(name) ? "Ez zait gustatzen" : "Gustatzen zait"}
				>
					<HeartIcon
						class={`namecard__heart ${
							isFavorite(name) ? " namecard__heart--active" : ""
						}`}
						title={isFavorite(name) ? "Gustokoa" : "Ez da gustokoa"}
					/>
				</button>
				<button
					disabled={!onRight}
					class="namecard__navigation namecard__navigation--right"
					onClick={onRight}
				>
					<ForwardIcon title="Hurrengo izena ikusi" />
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
		</article>
	)
}
