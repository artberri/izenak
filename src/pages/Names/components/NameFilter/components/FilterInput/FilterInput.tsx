import { VNode } from "preact"
import { IconProps } from "../../../../../../components/Icons/Icon/Icon"
import "./FilterInput.css"

export interface FilterInputProps {
	name: string
	label: string
	value: string
	icon?: VNode<IconProps>
	onChange: (value: string) => void
}

export function FilterInput({
	name,
	label,
	icon,
	value,
	onChange,
}: FilterInputProps) {
	return (
		<div class="filterinput" key={name}>
			<label class="filterinput__label" for={`filterinput-${name}`}>
				{label}
			</label>
			<div class="filterinput__container">
				{icon && <div class="filterinput__icon">{icon}</div>}
				<input
					id={`filterinput-${name}`}
					name={name}
					value={value}
					class={`filterinput__input ${
						icon ? "filterinput__input--withicon" : ""
					}`}
					type="text"
					autocomplete="off"
					onInput={(e) => onChange((e.target as HTMLInputElement).value)}
					onKeyUp={(e) => onChange((e.target as HTMLInputElement).value)}
				/>
			</div>
		</div>
	)
}
