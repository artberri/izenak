import userEvent from "@testing-library/user-event"
import { render, screen, waitFor } from "test-utils"

describe("See about info", () => {
	test("should display congratulations message", async () => {
		render()
		await userEvent.click(screen.getByText("Honi buruz"))
		await waitFor(() =>
			screen.getByText(
				"Webgune honetara haurdun zaude(te)lako heldu izatekotan... Zorionak! :D"
			)
		)
	})
})
