import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest } from "test-utils"
import { NameBuilder } from "../__test-utils__/name-builder"

const arrange = (count: number) => {
	const names = Array.from({ length: count }, () =>
		NameBuilder.aNeutralName().build()
	).map((name, index) =>
		NameBuilder.aNeutralName().withName(`${name.name}-${index}`).build()
	)
	setNamesForTest(names)
	render()
}

describe("Names are paginated", () => {
	it("shows a maximum of 100 names per page and you can ask for more", async () => {
		arrange(230)

		await userEvent.click(screen.getByText("link.allNames"))
		expect(screen.queryAllByTestId("nametag")).toHaveLength(100)

		await userEvent.click(screen.getByText("button.seeMore"))
		expect(screen.queryAllByTestId("nametag")).toHaveLength(200)

		await userEvent.click(screen.getByText("button.seeMore"))
		expect(screen.queryAllByTestId("nametag")).toHaveLength(230)
		expect(screen.queryByText("button.seeMore")).not.toBeInTheDocument()
	})
})
