import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest } from "test-utils"
import { JsonName } from "../infrastructure/name-getter"
import { NameBuilder } from "../__test-utils__/name-builder"

const arrange = (names: JsonName[]) => {
	setNamesForTest(names)
	render()
}

describe("Name favorites", () => {
	test("no-favorites message is shown if trying to show favorites but empty, it can be closed", async () => {
		// Arrange
		const names = [
			NameBuilder.aRandomName().withName("Amets").build(),
			NameBuilder.aRandomName().withName("Jare").build(),
			NameBuilder.aRandomName().withName("Leize").build(),
			NameBuilder.aRandomName().withName("Aiert").build(),
			NameBuilder.aRandomName().withName("Enara").build(),
		]
		arrange(names)

		// Act
		await userEvent.click(screen.getByText("Gogokoak"))
		// Assert
		expect(
			screen.getByText(
				"Oraindik ez duzu gogoko duzun izenik aukeratu. Erabili iragazkiak gustuko duzunak bilatzeko, eta behin gogokoak bezala markatuta, hemen agertuko dira."
			)
		).toBeInTheDocument()

		// Act
		await userEvent.click(screen.getByText("Itxi"))
		// Assert
		expect(
			screen.queryByText(
				"Oraindik ez duzu gogoko duzun izenik aukeratu. Erabili iragazkiak gustuko duzunak bilatzeko, eta behin gogokoak bezala markatuta, hemen agertuko dira."
			)
		).not.toBeInTheDocument()
	})

	test("can add favorites and they will be shown alphabetically in the proper section", async () => {
		// Arrange
		const names = [
			NameBuilder.aRandomName().withName("Amets").build(),
			NameBuilder.aRandomName().withName("Jare").build(),
			NameBuilder.aRandomName().withName("Leize").build(),
			NameBuilder.aRandomName().withName("Aiert").build(),
			NameBuilder.aRandomName().withName("Enara").build(),
		]
		arrange(names)
		await userEvent.click(screen.getByText("Izen guztiak"))

		// Open mane card Leize and favorite it
		await userEvent.click(screen.getByText("Leize"))
		await userEvent.click(screen.getByTitle("Gustatzen zait"))
		await userEvent.click(screen.getByText("Itxi"))

		// Open mane card Aiert and favorite it
		await userEvent.click(screen.getByText("Aiert"))
		await userEvent.click(screen.getByTitle("Gustatzen zait"))
		await userEvent.click(screen.getByText("Itxi"))

		// Go home and open favorites section
		await userEvent.click(screen.getByText("Atzera"))
		await userEvent.click(screen.getByText("Gogokoak"))

		// Assert there are in the favorites section
		expect(screen.getByText("Aiert")).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "Aurreko izena ikusi" })
		).toBeDisabled()
		await userEvent.click(
			screen.getByRole("button", { name: "Hurrengo izena ikusi" })
		)
		expect(screen.getByText("Leize")).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "Aurreko izena ikusi" })
		).toBeEnabled()
		expect(
			screen.getByRole("button", { name: "Hurrengo izena ikusi" })
		).toBeDisabled()
	})
})
