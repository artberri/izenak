import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest } from "test-utils"
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
	await userEvent.click(screen.getByText("link.allNames"))
	await userEvent.click(screen.getByLabelText("label.sortAlphabetically"))
	for (const name of names) {
		expect(screen.getByText(name.name)).toBeInTheDocument()
	}
}

describe("Name cards", () => {
	it("can navigate backward if previous card exist", async () => {
		await arrange()

		await userEvent.click(screen.getByText("Hodei"))
		expect(screen.getByText("content.noTranslations")).toBeInTheDocument()
		expect(screen.getByText("Nube")).toBeInTheDocument()

		await userEvent.click(screen.getByText("button.previousName"))
		expect(screen.getByText("Un nombre")).toBeInTheDocument()
		expect(screen.getByText("Salvador")).toBeInTheDocument()
	})

	it("can navigate forward if next card exist", async () => {
		await arrange()

		await userEvent.click(screen.getByText("Hodei"))
		expect(screen.getByText("content.noTranslations")).toBeInTheDocument()
		expect(screen.getByText("Nube")).toBeInTheDocument()

		await userEvent.click(screen.getByText("button.nextName"))
		expect(screen.getByText("Dolores")).toBeInTheDocument()
		expect(screen.getByText("content.noMeaning")).toBeInTheDocument()
	})

	it("can close card", async () => {
		await arrange()

		await userEvent.click(screen.getByText("Hodei"))
		expect(screen.getByText("Nube")).toBeInTheDocument()

		await userEvent.click(screen.getByText("button.close"))
		expect(screen.queryByText("Nube")).not.toBeInTheDocument()
	})
})