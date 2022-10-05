/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="enzyme-adapter-preact-pure"/>

import { configure, mount } from "enzyme"
import Adapter from "enzyme-adapter-preact-pure"

import { FilterInput } from "../pages/Names/components/NameFilter/components/FilterInput/FilterInput"

configure({ adapter: new Adapter() })

// Show https://es.vuejs.org/v2/guide/unit-testing.html as bad example
// no one recommends it anymore

describe("FilterInput", () => {
	it("has a label", () => {
		const onChange = jest.fn()
		const wrapper = mount(
			<FilterInput
				name="test"
				label="My Input"
				value="default"
				onChange={onChange}
			/>
		)

		expect(wrapper.find("label").text()).toBe("My Input")
	})

	it("can be set a default value", () => {
		const onChange = jest.fn()
		const wrapper = mount(
			<FilterInput
				name="test"
				label="My Input"
				value="default"
				onChange={onChange}
			/>
		)

		expect(wrapper.find("input").get(0).props.value).toBe("default")
	})

	it("triggers onChange function onInput event", () => {
		const onChange = jest.fn()
		const wrapper = mount(
			<FilterInput
				name="test"
				label="My Input"
				value="default"
				onChange={onChange}
			/>
		)

		wrapper.find("input").getDOMNode<HTMLInputElement>().value = "new value"
		wrapper.find("input").simulate("input")
		// EN react puro
		// wrapper.find("input").simulate("change", { target: { value: "new value" } })

		expect(onChange).toBeCalledWith("new value")
	})

	it("triggers onChange function onKeyUp event", () => {
		const onChange = jest.fn()
		const wrapper = mount(
			<FilterInput
				name="test"
				label="My Input"
				value="default"
				onChange={onChange}
			/>
		)

		wrapper.find("input").getDOMNode<HTMLInputElement>().value = "new value"
		wrapper.find("input").simulate("keyup")

		expect(onChange).toBeCalledWith("new value")
	})
})
