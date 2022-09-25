import userEvent from "@testing-library/user-event"
import { uniq } from "ramda"
import { render, screen, setNamesForTest, waitFor } from "test-utils"
import { JsonName } from "../infrastructure/name-getter"
import { NameBuilder } from "../__test-utils__/name-builder"

describe("Home links", () => {
	let maleNames: JsonName[]
	let femaleNames: JsonName[]
	let neutralNames: JsonName[]

	beforeEach(() => {
		maleNames = uniq(
			Array.from({ length: 3 }, () => NameBuilder.aMaleName().build())
		)
		femaleNames = uniq(
			Array.from({ length: 3 }, () => NameBuilder.aFemaleName().build())
		)
		neutralNames = uniq(
			Array.from({ length: 3 }, () => NameBuilder.aNeutralName().build())
		)

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
