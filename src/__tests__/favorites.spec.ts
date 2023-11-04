import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest, waitFor } from "test-utils"
import { NameBuilder } from "../__test-utils__/name-builder"
import { JsonName } from "../infrastructure/name-getter"

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
		await waitFor(() =>
			expect(screen.getByText("content.noFavorites")).toBeInTheDocument(),
		)

		// Act
		await userEvent.click(screen.getByText("button.close"))
		// Assert
		await waitFor(() =>
			expect(screen.queryByText("content.noFavorites")).not.toBeInTheDocument(),
		)
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
		await userEvent.click(await screen.findByText("button.favorites"))
		// Assert
		await waitFor(() =>
			expect(screen.getByText("content.noFavorites")).toBeInTheDocument(),
		)

		// Act
		await userEvent.keyboard("{Escape}")
		// Assert
		await waitFor(() =>
			expect(screen.queryByText("content.noFavorites")).not.toBeInTheDocument(),
		)
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
		await userEvent.click(await screen.findByText("button.favorites"))
		// Assert
		await waitFor(() =>
			expect(screen.getByText("content.noFavorites")).toBeInTheDocument(),
		)

		// Act
		await userEvent.click(screen.getByTestId("modal-background"))
		// Assert
		await waitFor(() =>
			expect(screen.queryByText("content.noFavorites")).not.toBeInTheDocument(),
		)
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
		await userEvent.click(await screen.findByText("link.allNames"))

		// Open mane card Leize and favorite it
		await userEvent.click(await screen.findByText("Leize"))
		await userEvent.click(await screen.findByTitle("button.like"))
		await userEvent.click(await screen.findByText("button.close"))

		// Open mane card Aiert and favorite it
		await userEvent.click(await screen.findByText("Aiert"))
		await userEvent.click(await screen.findByTitle("button.like"))
		await userEvent.click(await screen.findByText("button.close"))

		// Go home and open favorites section
		await userEvent.click(await screen.findByText("link.back"))
		await userEvent.click(await screen.findByText("button.favorites"))

		// Assert there are in the favorites section
		await waitFor(() => expect(screen.getByText("Aiert")).toBeInTheDocument())
		await waitFor(() =>
			expect(
				screen.getByRole("button", { name: "button.previousName" }),
			).toBeDisabled(),
		)
		await userEvent.click(
			screen.getByRole("button", { name: "button.nextName" }),
		)
		await waitFor(() => expect(screen.getByText("Leize")).toBeInTheDocument())
		await waitFor(() =>
			expect(
				screen.getByRole("button", { name: "button.previousName" }),
			).toBeEnabled(),
		)
		await waitFor(() =>
			expect(
				screen.getByRole("button", { name: "button.nextName" }),
			).toBeDisabled(),
		)
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
		await userEvent.click(await screen.findByText("link.allNames"))

		// Open mane card Leize and favorite it
		await userEvent.click(await screen.findByText("Leize"))
		await userEvent.click(await screen.findByTitle("button.like"))
		await userEvent.click(await screen.findByText("button.close"))

		// Open mane card Aiert and favorite it
		await userEvent.click(await screen.findByText("Aiert"))
		await userEvent.click(await screen.findByTitle("button.like"))
		await userEvent.click(await screen.findByText("button.close"))

		// Open mane card Leize and favorite it
		await userEvent.click(await screen.findByText("Leize"))
		await userEvent.click(await screen.findByTitle("button.unlike"))
		await userEvent.click(await screen.findByText("button.close"))

		// Go home and open favorites section
		await userEvent.click(await screen.findByText("link.back"))
		await userEvent.click(await screen.findByText("button.favorites"))

		// Assert there are in the favorites section
		await waitFor(() => expect(screen.getByText("Aiert")).toBeInTheDocument())
		await waitFor(() =>
			expect(
				screen.getByRole("button", { name: "button.previousName" }),
			).toBeDisabled(),
		)
		await waitFor(() =>
			expect(
				screen.getByRole("button", { name: "button.nextName" }),
			).toBeDisabled(),
		)
	})
})
