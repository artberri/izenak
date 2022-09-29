import { useState } from "preact/hooks"
import { ascend, prop, sort } from "ramda"
import { HeartIcon } from "../../../../components/Icons/Icons"
import { NameCards } from "../../../../components/NameCards/NameCards"
import { useService } from "../../../../providers/DependencyInjectionProvider"
import { FavoriteRepository } from "../../../../services/favorite-repository"
import { Name } from "../../../../types/Name"
import "./Favorites.css"

const sortByName = sort(ascend<Name>(prop("value")))

export function Favorites() {
	const favoriteRepository = useService(FavoriteRepository)
	const [favorites, setFavorites] = useState<Name[]>([])

	const [openedNameCard, setOpenedNameCard] = useState<Name | undefined>(
		undefined
	)

	const openFavorites = () => {
		void favoriteRepository
			.getAll()
			.then((all) => sortByName(all))
			.then((all) => {
				setFavorites(all)
				setOpenedNameCard(all[0])
			})
	}

	return (
		<div class="favorites">
			<button class="favorites__button" onClick={openFavorites}>
				<HeartIcon class="favorites__icon" />
			</button>
			{favorites.length > 0 && (
				<NameCards
					show={!!openedNameCard}
					openedName={openedNameCard}
					setOpenedName={setOpenedNameCard}
					names={favorites}
				/>
			)}
		</div>
	)
}
