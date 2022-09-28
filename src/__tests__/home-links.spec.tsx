import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest, waitFor } from "test-utils"
import { JsonName } from "../infrastructure/name-getter"
import { NameBuilder } from "../__test-utils__/name-builder"

const unique =
	(base: number) =>
	(name: JsonName, index: number): JsonName => ({
		...name,
		name: `${name.name}-${index + base}`,
	})

describe("Home links", () => {
	let maleNames: JsonName[]
	let femaleNames: JsonName[]
	let neutralNames: JsonName[]

	beforeEach(() => {
		maleNames = Array.from({ length: 3 }, () =>
			NameBuilder.aMaleName().build()
		).map(unique(0))
		femaleNames = Array.from({ length: 3 }, () =>
			NameBuilder.aFemaleName().build()
		).map(unique(3))
		neutralNames = Array.from({ length: 3 }, () =>
			NameBuilder.aNeutralName().build()
		).map(unique(6))

		setNamesForTest([...maleNames, ...femaleNames, ...neutralNames])
	})

	test("exists a link to go to a page with the female names", async () => {
		// Arange
		render()

		// Act
		await userEvent.click(screen.getByText("Nesken izenak"))
		await waitFor(() => screen.getByText("Nesken izenak"))

		// Assert
		expect(screen.getByText("Nesken izenak")).toBeInTheDocument()
		for (const name of [...femaleNames, ...neutralNames]) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of maleNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	test("exists a link to go to a page with the male names", async () => {
		// Arange
		render()

		// Act
		await userEvent.click(screen.getByText("Mutilen izenak"))
		await waitFor(() => screen.getByText("Mutilen izenak"))

		// Assert
		expect(screen.getByText("Mutilen izenak")).toBeInTheDocument()
		for (const name of [...maleNames, ...neutralNames]) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of femaleNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	test("exists a link to go to a page with all the names", async () => {
		// Arange
		render()

		// Act
		await userEvent.click(screen.getByText("Izen guztiak"))
		await waitFor(() => screen.getByText("Izen guztiak"))

		// Assert
		expect(screen.getByText("Izen guztiak")).toBeInTheDocument()
		for (const name of [...maleNames, ...neutralNames, ...femaleNames]) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
	})
})
