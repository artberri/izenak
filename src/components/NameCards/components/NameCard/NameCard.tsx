import { useFavorites } from "../../../../providers/FavoritesProvider"
import { useTranslation } from "../../../../providers/TranslationProvider"
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
	const { t } = useTranslation()
	const cardClasses = `namecard namecard--${name.gender.toLowerCase()}`

	const { isFavorite, toggleFavorite } = useFavorites()

	return (
		<article class={cardClasses}>
			<button class="namecard__close" onClick={onClose}>
				<CloseIcon title={t("button.close")} />
			</button>
			<h1 class="namecard__title">{name.value}</h1>
			<div class="namecard__controls">
				<button
					disabled={!onLeft}
					class="namecard__navigation namecard__navigation--left"
					onClick={onLeft}
				>
					<BackwardIcon title={t("button.previousName")} />
				</button>
				<button
					class="namecard__favourite"
					onClick={() => toggleFavorite(name)}
					title={
						isFavorite(name)
							? t("content.youLikeName", { name: name.value })
							: t("content.youDontLikeName", { name: name.value })
					}
				>
					<HeartIcon
						class={`namecard__heart ${
							isFavorite(name) ? " namecard__heart--active" : ""
						}`}
						title={isFavorite(name) ? t("button.unlike") : t("button.like")}
					/>
				</button>
				<button
					disabled={!onRight}
					class="namecard__navigation namecard__navigation--right"
					onClick={onRight}
				>
					<ForwardIcon title={t("button.nextName")} />
				</button>
			</div>
			<div class="namecard__info">
				<div>
					<h2 class="namecard__subtitle">{t("content.translations")}</h2>
					<p class="namecard__content">
						{name.translations ?? t("content.noTranslations")}
					</p>
				</div>
				<div>
					<h2 class="namecard__subtitle">{t("content.meaning")}</h2>
					<p class="namecard__content">
						{name.meaning ?? t("content.noMeaning")}
					</p>
				</div>
			</div>
		</article>
	)
}
