import userEvent from "@testing-library/user-event"
import { render, screen } from "test-utils"

describe("About info page", () => {
	test("can be navigated from home page and displays congratulations message", async () => {
		// Arrange
		render()

		// Act
		await userEvent.click(screen.getByText("Honi buruz"))

		// Assert
		expect(
			screen.getByText(
				"Webgune honetara haurdun zaude(te)lako heldu izatekotan... Zorionak! :D"
			)
		).toBeInTheDocument()
	})
})
