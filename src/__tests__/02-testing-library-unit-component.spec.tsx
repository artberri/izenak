import userEvent from "@testing-library/user-event"
import { render, screen } from "test-utils"

import { FilterInput } from "../pages/Names/components/NameFilter/components/FilterInput/FilterInput"

describe("FilterInput", () => {
	it("can have a default value that can be modified", async () => {
		const onChange = jest.fn<undefined, [string]>()
		render(
			<FilterInput
				name="test"
				label="My Input"
				value="default"
				onChange={onChange}
			/>
		)

		await userEvent.type(screen.getByLabelText("My Input"), "new value")

		expect(onChange.mock.calls.pop()?.[0]).toBe("defaultnew value")
		expect(screen.getByLabelText("My Input")).toHaveValue("defaultnew value")
	})

	it("can have a default value that can be cleared", async () => {
		const onChange = jest.fn<undefined, [string]>()
		render(
			<FilterInput
				name="test"
				label="My Input"
				value="default"
				onChange={onChange}
			/>
		)

		await userEvent.clear(screen.getByLabelText("My Input"))
		await userEvent.type(screen.getByLabelText("My Input"), "new value")

		expect(onChange.mock.calls.pop()?.[0]).toBe("new value")
		expect(screen.getByLabelText("My Input")).toHaveValue("new value")
	})
})
