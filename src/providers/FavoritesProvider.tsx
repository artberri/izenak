import { createContext } from "preact"
import { useCallback, useContext, useEffect, useState } from "preact/hooks"
import { ascend, prop, sort } from "ramda"
import { FavoriteRepository } from "../services/favorite-repository"
import { Name } from "../types/Name"
import { WithChildren } from "../types/WithChildren"
import { useService } from "./DependencyInjectionProvider"

const sortByName = sort(ascend<Name>(prop("value")))

const FavoritesContext = createContext<{
	favorites: Name[]
	isFavorite: (name: Name) => boolean
	toggleFavorite: (name: Name) => void
}>({
	favorites: [],
	isFavorite: () => false,
	toggleFavorite: () => undefined,
})

export function FavoritesProvider({ children }: WithChildren) {
	const favoriteRepository = useService(FavoriteRepository)
	const [favorites, setFavorites] = useState<Name[]>([])

	useEffect(() => {
		void favoriteRepository
			.getAll()
			.then((all) => sortByName(all))
			.then((all) => {
				setFavorites(all)
			})
	}, [favoriteRepository])

	const isFavorite = useCallback(
		(name: Name) => favorites.some((favorite) => favorite.id === name.id),
		[favorites],
	)

	const addFavorite = useCallback(
		(name: Name) => {
			setFavorites((prev) => sortByName([...prev, name]))
			void favoriteRepository.add(name)
		},
		[favoriteRepository],
	)

	const removeFavorite = useCallback(
		(name: Name) => {
			setFavorites((prev) =>
				sortByName(prev.filter((favorite) => favorite.id !== name.id)),
			)
			void favoriteRepository.remove(name)
		},
		[favoriteRepository],
	)

	const toggleFavorite = useCallback(
		(name: Name) => {
			if (isFavorite(name)) {
				removeFavorite(name)

				return
			}

			addFavorite(name)
		},
		[isFavorite, removeFavorite, addFavorite],
	)

	return (
		<FavoritesContext.Provider
			value={{ favorites, isFavorite, toggleFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export const useFavorites = () => useContext(FavoritesContext)
