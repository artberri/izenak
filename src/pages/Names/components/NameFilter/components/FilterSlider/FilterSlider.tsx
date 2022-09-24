import { MDCSlider } from "@material/slider"
import "@material/slider/dist/mdc.slider.css"
import { useEffect, useRef, useState } from "preact/hooks"
import "./FilterSlider.css"

export interface FilterSliderProps {
	name: string
	label: string
	min: number
	max: number
	onChange: (minValue: number, maxValue: number) => void
}

export function FilterSlider({
	name,
	label,
	min,
	max,
	onChange,
}: FilterSliderProps) {
	const [loading, setLoading] = useState(true)
	const ref = useRef<HTMLDivElement>(null)
	const startInputRef = useRef<HTMLInputElement>(null)
	const endInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		let slider: MDCSlider
		let callback: () => void
		setTimeout(() => {
			setLoading(false)
			if (!ref.current || !startInputRef.current || !endInputRef.current) {
				return
			}

			startInputRef.current.setAttribute("value", min.toString())
			endInputRef.current.setAttribute("value", max.toString())
			slider = new MDCSlider(ref.current)
			callback = () => onChange(slider.getValueStart(), slider.getValue())

			slider.listen("MDCSlider:change", callback)
			slider.listen("MDCSlider:input", callback)
		}, 510)

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!slider) {
				return
			}

			slider.unlisten("MDCSlider:change", callback)
			slider.unlisten("MDCSlider:input", callback)
			slider.destroy()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div class="filterslider" key={name}>
			<div id={`filterslider-${name}`} class="filterslider__label">
				{label}
			</div>
			<div
				ref={ref}
				class={`filterslider__slider ${
					loading ? "filterslider__slider--loading" : ""
				} mdc-slider mdc-slider--range mdc-slider--discrete`}
			>
				<input
					ref={startInputRef}
					class="mdc-slider__input"
					type="range"
					min={min}
					max={max}
					step="1"
					name={`filterslider-start-${name}`}
					aria-label={`Gutxienezko ${label}`}
				/>
				<input
					ref={endInputRef}
					class="mdc-slider__input"
					type="range"
					min={min}
					max={max}
					step="1"
					name={`filterslider-end-${name}`}
					aria-label={`Gehienezko ${label}`}
				/>
				<div class="mdc-slider__track">
					<div class="mdc-slider__track--inactive"></div>
					<div class="mdc-slider__track--active">
						<div class="mdc-slider__track--active_fill"></div>
					</div>
				</div>
				<div class="mdc-slider__thumb">
					<div class="mdc-slider__value-indicator-container" aria-hidden="true">
						<div class="mdc-slider__value-indicator">
							<span class="mdc-slider__value-indicator-text"></span>
						</div>
					</div>
					<div class="mdc-slider__thumb-knob"></div>
				</div>
				<div class="mdc-slider__thumb">
					<div class="mdc-slider__value-indicator-container" aria-hidden="true">
						<div class="mdc-slider__value-indicator">
							<span class="mdc-slider__value-indicator-text"></span>
						</div>
					</div>
					<div class="mdc-slider__thumb-knob"></div>
				</div>
			</div>
		</div>
	)
}
