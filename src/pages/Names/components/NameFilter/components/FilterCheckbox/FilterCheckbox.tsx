import "./FilterCheckbox.css"

export interface FilterCheckboxProps {
	name: string
	label: string
	checked: boolean
	onChange: () => void
}

export function FilterCheckbox({
	name,
	label,
	checked,
	onChange,
}: FilterCheckboxProps) {
	return (
		<div class="filtercheckbox" key={name}>
			<label class="filtercheckbox__label">
				<input
					id={`filtercheckbox-${name}`}
					name={name}
					type="checkbox"
					class="filtercheckbox__checkbox"
					checked={checked}
					onChange={onChange}
				/>
				<span class="filtercheckbox__checkmark"></span> {label}
			</label>
		</div>
	)
}
