import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest, waitFor } from "test-utils"
import { NameBuilder } from "../__test-utils__/name-builder"

const arrange = async () => {
	const names = [
		NameBuilder.aMaleName()
			.withName("Gaizka")
			.withMeaning("Un nombre")
			.withTranslations("Salvador")
			.build(),
		NameBuilder.aNeutralName()
			.withName("Hodei")
			.withMeaning("Nube")
			.withTranslations("")
			.build(),
		NameBuilder.aFemaleName()
			.withName("Nekane")
			.withMeaning("")
			.withTranslations("Dolores")
			.build(),
	]
	setNamesForTest(names)
	render()
	await userEvent.click(await screen.findByText("link.allNames"))
	await userEvent.click(
		await screen.findByLabelText("label.sortAlphabetically"),
	)
	for (const name of names) {
		await screen.findByText(name.name)
	}
}

describe("Name cards", () => {
	test("can navigate backward if previous card exist", async () => {
		// Arrange
		await arrange()

		// Act & assert
		await userEvent.click(await screen.findByText("Hodei"))
		await waitFor(() =>
			expect(screen.getByText("content.noTranslations")).toBeInTheDocument(),
		)
		await waitFor(() => expect(screen.getByText("Nube")).toBeInTheDocument())

		// Act & assert
		await userEvent.click(await screen.findByText("button.previousName"))
		await waitFor(() =>
			expect(screen.getByText("Un nombre")).toBeInTheDocument(),
		)
		await waitFor(() =>
			expect(screen.getByText("Salvador")).toBeInTheDocument(),
		)
	})

	test("can navigate forward if next card exist", async () => {
		// Arrange
		await arrange()

		// Act & assert
		await userEvent.click(await screen.findByText("Hodei"))
		await waitFor(() =>
			expect(screen.getByText("content.noTranslations")).toBeInTheDocument(),
		)
		await waitFor(() => expect(screen.getByText("Nube")).toBeInTheDocument())

		// Act & assert
		await userEvent.click(await screen.findByText("button.nextName"))
		await waitFor(() => expect(screen.getByText("Dolores")).toBeInTheDocument())
		await waitFor(() =>
			expect(screen.getByText("content.noMeaning")).toBeInTheDocument(),
		)
	})

	test("can close card", async () => {
		// Arrange
		await arrange()

		// Act & assert
		await userEvent.click(await screen.findByText("Hodei"))
		await waitFor(() => expect(screen.getByText("Nube")).toBeInTheDocument())

		// Act & assert
		await userEvent.click(await screen.findByText("button.close"))
		await waitFor(() =>
			expect(screen.queryByText("Nube")).not.toBeInTheDocument(),
		)
	})
})
