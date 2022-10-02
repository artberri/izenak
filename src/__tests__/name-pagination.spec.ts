import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest } from "test-utils"
import { NameBuilder } from "../__test-utils__/name-builder"

const arrange = async (count: number) => {
	const names = Array.from({ length: count }, () =>
		NameBuilder.aNeutralName().build()
	).map((name, index) =>
		NameBuilder.aNeutralName().withName(`${name.name}-${index}`).build()
	)
	setNamesForTest(names)
	render()
	await userEvent.click(screen.getByText("link.allNames"))
}

describe("Name pagination", () => {
	test("show a maximum of 100 name and paginate them", async () => {
		// Arrange
		await arrange(230)

		// Act & Assert
		expect(screen.queryAllByTestId("nametag")).toHaveLength(100)

		// Act & Assert
		await userEvent.click(screen.getByText("button.seeMore"))
		expect(screen.queryAllByTestId("nametag")).toHaveLength(200)

		// Act & Assert
		await userEvent.click(screen.getByText("button.seeMore"))
		expect(screen.queryAllByTestId("nametag")).toHaveLength(230)
		expect(screen.queryByText("button.seeMore")).not.toBeInTheDocument()
	})
})
