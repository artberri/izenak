/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest, waitFor } from "test-utils"
import { JsonName } from "../infrastructure/name-getter"
import { NameBuilder } from "../__test-utils__/name-builder"

const arrange = async (names: JsonName[]) => {
	setNamesForTest(names)
	render()
	await userEvent.click(screen.getByText("Izen guztiak"))
	await waitFor(() => screen.getByText("Izen guztiak"))
	for (const name of names) {
		expect(screen.getByText(name.name)).toBeInTheDocument()
	}
}

describe("Name filters", () => {
	test("can filter names by containing letters", async () => {
		// Arrange
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

		// Act
		await userEvent.type(screen.getByLabelText("Bilaketa-terminoa"), "it")

		// Assert
		for (const name of toMatchNames) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	test("can filter names by starting letters", async () => {
		// Arrange
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

		// Act
		await userEvent.type(screen.getByLabelText("Hasten da"), "alb")

		// Assert
		for (const name of toMatchNames) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	test("can filter names by ending letters", async () => {
		// Arrange
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

		// Act
		await userEvent.type(screen.getByLabelText("Amaitzen da"), "ets")

		// Assert
		for (const name of toMatchNames) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	test("can filter by names without translations", async () => {
		// Arrange
		const toMatchNames = [
			NameBuilder.aRandomName().withTranslations("").build(),
			NameBuilder.aRandomName().withTranslations("").build(),
			NameBuilder.aRandomName().withTranslations("").build(),
			NameBuilder.aRandomName().withTranslations("").build(),
		]
		const otherNames = [
			NameBuilder.aRandomName().withTranslations("t1").build(),
			NameBuilder.aRandomName().withTranslations("t2").build(),
			NameBuilder.aRandomName().withTranslations("t3").build(),
		]
		await arrange([...toMatchNames, ...otherNames])

		// Act
		await userEvent.click(
			screen.getByLabelText("Euskal jatorrizko izenak soilik")
		)

		// Assert
		for (const name of toMatchNames) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of otherNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	test("can order names alphabetically", async () => {
		// Arrange
		const names = [
			NameBuilder.aRandomName().withName("Amets").build(),
			NameBuilder.aRandomName().withName("Jare").build(),
			NameBuilder.aRandomName().withName("Leize").build(),
			NameBuilder.aRandomName().withName("Aiert").build(),
			NameBuilder.aRandomName().withName("Enara").build(),
			NameBuilder.aRandomName().withName("Julen").build(),
		]
		await arrange(names)

		// Act
		await userEvent.click(screen.getByLabelText("Izenak alfabetikoki ordenatu"))

		// Assert
		const nameTags = screen.queryAllByTestId("nametag")
		expect(nameTags).toHaveLength(names.length)
		expect(nameTags[0]?.innerHTML).toBe("Aiert")
		expect(nameTags[1]?.innerHTML).toBe("Amets")
		expect(nameTags[2]?.innerHTML).toBe("Enara")
		expect(nameTags[3]?.innerHTML).toBe("Jare")
		expect(nameTags[4]?.innerHTML).toBe("Julen")
		expect(nameTags[5]?.innerHTML).toBe("Leize")
	})
})
