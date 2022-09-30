import { useState } from "preact/hooks"
import { HeartIcon } from "../../../../components/Icons/Icons"
import { Modal } from "../../../../components/Modal/Modal"
import { NameCards } from "../../../../components/NameCards/NameCards"
import { useFavorites } from "../../../../providers/FavoritesProvider"
import { Name } from "../../../../types/Name"
import "./Favorites.css"

export function Favorites() {
	const { favorites } = useFavorites()
	const [shownFavorites, setShownFavorites] = useState<Name[]>([])
	const [showEmpty, setShowEmpty] = useState(false)

	const [openedNameCard, setOpenedNameCard] = useState<Name | undefined>(
		undefined
	)

	const openFavorites = () => {
		if (!favorites[0]) {
			setShowEmpty(true)

			return
		}

		setShownFavorites(favorites)
		setOpenedNameCard(favorites[0])
	}

	const closeEmptyModal = () => setShowEmpty(false)

	return (
		<div class="favorites">
			<button class="favorites__button" onClick={openFavorites}>
				<HeartIcon class="favorites__icon" title="Gogokoak" />
			</button>
			<NameCards
				openedName={openedNameCard}
				setOpenedName={setOpenedNameCard}
				names={shownFavorites}
			/>
			<Modal show={showEmpty} onClose={closeEmptyModal}>
				<p class="favorites__modal">
					Oraindik ez duzu gogoko duzun izenik aukeratu. Erabili iragazkiak
					gustuko duzunak bilatzeko, eta behin gogokoak bezala markatuta, hemen
					agertuko dira.
				</p>
			</Modal>
		</div>
	)
}
