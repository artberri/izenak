import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest, waitFor } from "test-utils"
import { NameBuilder } from "../__test-utils__/name-builder"
import { JsonName } from "../infrastructure/name-getter"

const arrange = async (names: JsonName[]) => {
	setNamesForTest(names)
	render()
	await userEvent.click(screen.getByText("link.allNames"))
	for (const name of names) {
		await screen.findByText(name.name)
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
		await userEvent.type(await screen.findByLabelText("label.searchTerm"), "it")

		// Assert
		for (const name of toMatchNames) {
			await waitFor(() =>
				expect(screen.getByText(name.name)).toBeInTheDocument(),
			)
		}
		for (const name of otherNames) {
			await waitFor(() =>
				expect(screen.queryByText(name.name)).not.toBeInTheDocument(),
			)
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
		await userEvent.type(
			await screen.findByLabelText("label.startsWith"),
			"alb",
		)

		// Assert
		for (const name of toMatchNames) {
			await waitFor(() =>
				expect(screen.getByText(name.name)).toBeInTheDocument(),
			)
		}
		for (const name of otherNames) {
			await waitFor(() =>
				expect(screen.queryByText(name.name)).not.toBeInTheDocument(),
			)
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
		await userEvent.type(await screen.findByLabelText("label.endsWith"), "ets")

		// Assert
		for (const name of toMatchNames) {
			await waitFor(() =>
				expect(screen.getByText(name.name)).toBeInTheDocument(),
			)
		}
		for (const name of otherNames) {
			await waitFor(() =>
				expect(screen.queryByText(name.name)).not.toBeInTheDocument(),
			)
		}
	})

	test("can filter by names without translations", async () => {
		// Arrange
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

		// Act
		await userEvent.click(await screen.findByLabelText("label.onlyBasque"))

		// Assert
		for (const name of toMatchNames) {
			await waitFor(() =>
				expect(screen.getByText(name.name)).toBeInTheDocument(),
			)
		}
		for (const name of otherNames) {
			await waitFor(() =>
				expect(screen.queryByText(name.name)).not.toBeInTheDocument(),
			)
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
		await userEvent.click(
			await screen.findByLabelText("label.sortAlphabetically"),
		)

		// Assert
		await waitFor(() => {
			const nameTags = screen.queryAllByTestId("nametag")
			expect(nameTags.map((tag) => tag.innerHTML)).toEqual([
				"Aiert",
				"Amets",
				"Enara",
				"Jare",
				"Julen",
				"Leize",
			])
		})
	})

	test("can reset filters", async () => {
		// Arrange
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
		await userEvent.type(await screen.findByLabelText("label.searchTerm"), "i")
		await userEvent.type(await screen.findByLabelText("label.startsWith"), "a")
		await userEvent.type(await screen.findByLabelText("label.endsWith"), "s")
		await userEvent.click(await screen.findByLabelText("label.onlyBasque"))
		await userEvent.click(
			await screen.findByLabelText("label.sortAlphabetically"),
		)
		await waitFor(() =>
			expect(screen.queryAllByTestId("nametag")).toHaveLength(
				toMatchNames.length,
			),
		)
		await waitFor(() =>
			expect(screen.queryAllByTestId("nametag")[0]?.innerHTML).toBe("alis"),
		)
		await waitFor(() =>
			expect(screen.queryAllByTestId("nametag")[1]?.innerHTML).toBe("atriisss"),
		)
		for (const name of otherNames) {
			await waitFor(() =>
				expect(screen.queryByText(name.name)).not.toBeInTheDocument(),
			)
		}

		// Act
		await userEvent.click(screen.getByText("button.removeFilters"))

		// Assert
		for (const name of [...toMatchNames, ...otherNames]) {
			// eslint-disable-next-line testing-library/prefer-find-by
			await waitFor(() =>
				expect(screen.getByText(name.name)).toBeInTheDocument(),
			)
		}
	})
})
