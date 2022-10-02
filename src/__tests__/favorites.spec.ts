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
		await userEvent.click(screen.getByText("button.favorites"))
		// Assert
		expect(screen.getByText("content.noFavorites")).toBeInTheDocument()

		// Act
		await userEvent.click(screen.getByText("button.close"))
		// Assert
		expect(screen.queryByText("content.noFavorites")).not.toBeInTheDocument()
	})

	test("no-favorites message is shown if trying to show favorites but empty, it can be closed with ESC key", async () => {
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
		await userEvent.click(screen.getByText("button.favorites"))
		// Assert
		expect(screen.getByText("content.noFavorites")).toBeInTheDocument()

		// Act
		await userEvent.keyboard("{Escape}")
		// Assert
		expect(screen.queryByText("content.noFavorites")).not.toBeInTheDocument()
	})

	test("no-favorites message is shown if trying to show favorites but empty, it can be closed clicking outside modal", async () => {
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
		await userEvent.click(screen.getByText("button.favorites"))
		// Assert
		expect(screen.getByText("content.noFavorites")).toBeInTheDocument()

		// Act
		await userEvent.click(screen.getByTestId("modal-background"))
		// Assert
		expect(screen.queryByText("content.noFavorites")).not.toBeInTheDocument()
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
		await userEvent.click(screen.getByText("link.allNames"))

		// Open mane card Leize and favorite it
		await userEvent.click(screen.getByText("Leize"))
		await userEvent.click(screen.getByTitle("button.like"))
		await userEvent.click(screen.getByText("button.close"))

		// Open mane card Aiert and favorite it
		await userEvent.click(screen.getByText("Aiert"))
		await userEvent.click(screen.getByTitle("button.like"))
		await userEvent.click(screen.getByText("button.close"))

		// Go home and open favorites section
		await userEvent.click(screen.getByText("link.back"))
		await userEvent.click(screen.getByText("button.favorites"))

		// Assert there are in the favorites section
		expect(screen.getByText("Aiert")).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "button.previousName" })
		).toBeDisabled()
		await userEvent.click(
			screen.getByRole("button", { name: "button.nextName" })
		)
		expect(screen.getByText("Leize")).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "button.previousName" })
		).toBeEnabled()
		expect(
			screen.getByRole("button", { name: "button.nextName" })
		).toBeDisabled()
	})

	test("can remove favorites", async () => {
		// Arrange
		const names = [
			NameBuilder.aRandomName().withName("Amets").build(),
			NameBuilder.aRandomName().withName("Jare").build(),
			NameBuilder.aRandomName().withName("Leize").build(),
			NameBuilder.aRandomName().withName("Aiert").build(),
			NameBuilder.aRandomName().withName("Enara").build(),
		]
		arrange(names)
		await userEvent.click(screen.getByText("link.allNames"))

		// Open mane card Leize and favorite it
		await userEvent.click(screen.getByText("Leize"))
		await userEvent.click(screen.getByTitle("button.like"))
		await userEvent.click(screen.getByText("button.close"))

		// Open mane card Aiert and favorite it
		await userEvent.click(screen.getByText("Aiert"))
		await userEvent.click(screen.getByTitle("button.like"))
		await userEvent.click(screen.getByText("button.close"))

		// Open mane card Leize and favorite it
		await userEvent.click(screen.getByText("Leize"))
		await userEvent.click(screen.getByTitle("button.unlike"))
		await userEvent.click(screen.getByText("button.close"))

		// Go home and open favorites section
		await userEvent.click(screen.getByText("link.back"))
		await userEvent.click(screen.getByText("button.favorites"))

		// Assert there are in the favorites section
		expect(screen.getByText("Aiert")).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "button.previousName" })
		).toBeDisabled()
		expect(
			screen.getByRole("button", { name: "button.nextName" })
		).toBeDisabled()
	})
})
