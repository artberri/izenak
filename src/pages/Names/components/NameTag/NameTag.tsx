import { always, cond, equals, T } from "ramda"
import { useFavorites } from "../../../../providers/FavoritesProvider"
import { Gender } from "../../../../types/Gender"
import { Name } from "../../../../types/Name"
import "./NameTag.css"

export interface NameTagProps {
	name: Name
	onClick: () => void
}

export function NameTag({ name, onClick }: NameTagProps) {
	const { isFavorite } = useFavorites()
	const genderClass = cond([
		[equals(Gender.Male), always("nametag--male")],
		[equals(Gender.Female), always("nametag--female")],
		[T, always("nametag--neutral")],
	])

	return (
		<button
			data-testid="nametag"
			class={`nametag ${genderClass(name.gender)} ${
				isFavorite(name) ? "nametag--favorite" : ""
			}`}
			onClick={onClick}
		>
			{name.value}
		</button>
	)
}
