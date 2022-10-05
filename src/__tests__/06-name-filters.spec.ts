import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest } from "test-utils"
import { JsonName } from "../infrastructure/name-getter"
import { NameBuilder } from "../__test-utils__/name-builder"

const arrange = async (names: JsonName[]) => {
	setNamesForTest(names)
	render()
	await userEvent.click(screen.getByText("link.allNames"))
	for (const name of names) {
		expect(screen.getByText(name.name)).toBeInTheDocument()
	}
}

describe("Names can be filtered", () => {
	it("filters names by containing letters", async () => {
		const toMatchNames = [
			NameBuilder.aRandomName().withName("Albertito").build(),
			NameBuilder.aRandomName().withName("Robertíto").build(),
			NameBuilder.aRandomName().withName("Joselíto").build(),
			NameBuilder.aRandomName().withName("Famelit").build(),
			NameBuilder.aRandomName().withName("Italo").build(),
		]
		const otherNames = [
			NameBuilder.aRandomName().withName("Amets").build(),
			NameBuilder.aRandomName().withName("Jare").build(),
			NameBuilder.aRandomName().withName("Leize").build(),
			NameBuilder.aRandomName().withName("Aiert").build(),
			NameBuilder.aRandomName().withName("Enara").build(),
		]
		await arrange([...toMatchNames, ...otherNames])

		await userEvent.type(screen.getByLabelText("label.searchTerm"), "it")

		for (const name of toMatchNames) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	it("filters names by starting letters", async () => {
		const toMatchNames = [
			NameBuilder.aRandomName().withName("Albertito").build(),
			NameBuilder.aRandomName().withName("albino").build(),
			NameBuilder.aRandomName().withName("Albbbbrta").build(),
			NameBuilder.aRandomName().withName("Álbert").build(),
			NameBuilder.aRandomName().withName("ÄLbin").build(),
		]
		const otherNames = [
			NameBuilder.aRandomName().withName("Amalbets").build(),
			NameBuilder.aRandomName().withName("Amets").build(),
			NameBuilder.aRandomName().withName("Jare").build(),
			NameBuilder.aRandomName().withName("Leize").build(),
			NameBuilder.aRandomName().withName("Aiert").build(),
			NameBuilder.aRandomName().withName("Enara").build(),
			NameBuilder.aRandomName().withName("Enaralb").build(),
		]
		await arrange([...toMatchNames, ...otherNames])

		await userEvent.type(screen.getByLabelText("label.startsWith"), "alb")

		for (const name of toMatchNames) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	it("filters names by ending letters", async () => {
		const toMatchNames = [
			NameBuilder.aRandomName().withName("Amets").build(),
			NameBuilder.aRandomName().withName("Latets").build(),
			NameBuilder.aRandomName().withName("Opéts").build(),
		]
		const otherNames = [
			NameBuilder.aRandomName().withName("Etsaia").build(),
			NameBuilder.aRandomName().withName("etsaia").build(),
			NameBuilder.aRandomName().withName("Ametsa").build(),
			NameBuilder.aRandomName().withName("Enara").build(),
			NameBuilder.aRandomName().withName("Enaralb").build(),
		]
		await arrange([...toMatchNames, ...otherNames])

		await userEvent.type(screen.getByLabelText("label.endsWith"), "ets")

		for (const name of toMatchNames) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	it("filters by names without translations", async () => {
		const toMatchNames = [
			NameBuilder.aRandomName().withName("a1").withTranslations("").build(),
			NameBuilder.aRandomName().withName("a2").withTranslations("").build(),
			NameBuilder.aRandomName().withName("a3").withTranslations("").build(),
			NameBuilder.aRandomName().withName("a4").withTranslations("").build(),
		]
		const otherNames = [
			NameBuilder.aRandomName().withName("b1").withTranslations("t1").build(),
			NameBuilder.aRandomName().withName("b2").withTranslations("t2").build(),
			NameBuilder.aRandomName().withName("b3").withTranslations("t3").build(),
		]
		await arrange([...toMatchNames, ...otherNames])

		await userEvent.click(screen.getByLabelText("label.onlyBasque"))

		for (const name of toMatchNames) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	it("filters names alphabetically", async () => {
		const names = [
			NameBuilder.aRandomName().withName("Amets").build(),
			NameBuilder.aRandomName().withName("Jare").build(),
			NameBuilder.aRandomName().withName("Leize").build(),
			NameBuilder.aRandomName().withName("Aiert").build(),
			NameBuilder.aRandomName().withName("Enara").build(),
			NameBuilder.aRandomName().withName("Julen").build(),
		]
		await arrange(names)

		await userEvent.click(screen.getByLabelText("label.sortAlphabetically"))

		const nameTags = screen.queryAllByTestId("nametag")
		expect(nameTags).toHaveLength(names.length)
		expect(nameTags[0]?.innerHTML).toBe("Aiert")
		expect(nameTags[1]?.innerHTML).toBe("Amets")
		expect(nameTags[2]?.innerHTML).toBe("Enara")
		expect(nameTags[3]?.innerHTML).toBe("Jare")
		expect(nameTags[4]?.innerHTML).toBe("Julen")
		expect(nameTags[5]?.innerHTML).toBe("Leize")
	})

	it("resets filters if the button to remove filters is pressed", async () => {
		const toMatchNames = [
			NameBuilder.aRandomName()
				.withName("atriisss")
				.withTranslations("")
				.build(),
			NameBuilder.aRandomName().withName("alis").withTranslations("").build(),
		]
		const otherNames = [
			NameBuilder.aRandomName().withName("ails").withTranslations("t1").build(),
			NameBuilder.aRandomName()
				.withName("atrisss")
				.withTranslations("t2")
				.build(),
			NameBuilder.aRandomName().withName("otro").build(),
		]
		await arrange([...toMatchNames, ...otherNames])
		await userEvent.type(screen.getByLabelText("label.searchTerm"), "i")
		await userEvent.type(screen.getByLabelText("label.startsWith"), "a")
		await userEvent.type(screen.getByLabelText("label.endsWith"), "s")
		await userEvent.click(screen.getByLabelText("label.onlyBasque"))
		await userEvent.click(screen.getByLabelText("label.sortAlphabetically"))
		const nameTags = screen.queryAllByTestId("nametag")
		expect(nameTags).toHaveLength(toMatchNames.length)
		expect(nameTags[0]?.innerHTML).toBe("alis")
		expect(nameTags[1]?.innerHTML).toBe("atriisss")
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}

		await userEvent.click(screen.getByText("button.removeFilters"))

		for (const name of [...toMatchNames, ...otherNames]) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
	})
})
