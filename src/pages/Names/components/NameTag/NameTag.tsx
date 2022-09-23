import { always, cond, equals, T } from "ramda"
import { Gender } from "../../../../types/Gender"
import { Name } from "../../../../types/Name"
import "./NameTag.css"

export interface NameTagProps {
	name: Name
}

export function NameTag({ name }: NameTagProps) {
	const genderClass = cond([
		[equals(Gender.Male), always("nametag--male")],
		[equals(Gender.Female), always("nametag--female")],
		[T, always("nametag--neutral")],
	])

	return (
		<button
			class={`nametag ${genderClass(name.gender)}`}
			onClick={() => undefined}
		>
			{name.value}
		</button>
	)
}
