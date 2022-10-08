import userEvent from "@testing-library/user-event"
import { render, screen } from "test-utils"

describe("About information is accessible", () => {
	it("can be reached from a link in the homepage and it has a back button", async () => {
		render()

		await userEvent.click(screen.getByText("link.aboutUs"))
		expect(screen.getByText("title.aboutUs")).toBeInTheDocument()

		await userEvent.click(screen.getByText("link.back"))
		expect(screen.queryByText("title.aboutUs")).not.toBeInTheDocument()
	})
})
