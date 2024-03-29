import { MDCSlider } from "@material/slider"
import "@material/slider/dist/mdc.slider.css"
import { useEffect, useRef, useState } from "preact/hooks"
import { useTranslation } from "../../../../../../providers/TranslationProvider"
import "./FilterSlider.css"

export interface FilterSliderProps {
	name: string
	label: string
	min: number
	max: number
	start: number
	end: number
	onChange: (minValue: number, maxValue: number) => void
}

export function FilterSlider({
	name,
	label,
	min,
	max,
	start: startValue,
	end: endValue,
	onChange,
}: FilterSliderProps) {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(true)
	const [slider, setSlider] = useState<MDCSlider | null>(null)
	const ref = useRef<HTMLDivElement>(null)
	const startInputRef = useRef<HTMLInputElement>(null)
	const endInputRef = useRef<HTMLInputElement>(null)

	const start = startValue === 0 ? min : startValue
	const end = endValue === 0 ? max : endValue

	useEffect(() => {
		if (!startInputRef.current || !endInputRef.current) {
			return
		}

		startInputRef.current.setAttribute("value", start.toString())
		endInputRef.current.setAttribute("value", end.toString())
		slider?.setValueStart(start)
		slider?.setValue(end)
	}, [start, end, slider])

	useEffect(() => {
		let callback: (() => void) | undefined
		setTimeout(() => {
			setLoading(false)
			if (!ref.current) {
				return
			}

			const s = new MDCSlider(ref.current)
			callback = () => onChange(s.getValueStart(), s.getValue())

			s.listen("MDCSlider:change", callback)
			s.listen("MDCSlider:input", callback)
			setSlider(s)
		}, 510)

		return () => {
			if (!slider || !callback) {
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
					value={start}
					step="1"
					name={`filterslider-start-${name}`}
					aria-label={t("label.rangeMin", { label })}
				/>
				<input
					ref={endInputRef}
					class="mdc-slider__input"
					type="range"
					min={min}
					max={max}
					value={end}
					step="1"
					name={`filterslider-end-${name}`}
					aria-label={t("label.rangeMax", { label })}
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
