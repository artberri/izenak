import userEvent from "@testing-library/user-event"
import { render, screen } from "test-utils"

describe("About info page", () => {
	test("can be navigated from home page and displays congratulations message", async () => {
		// Arrange
		render()

		// Act
		await userEvent.click(screen.getByText("link.aboutUs"))

		// Assert
		expect(screen.getByText("title.aboutUs")).toBeInTheDocument()
	})
})
