import userEvent from "@testing-library/user-event"
import { render, screen, setNamesForTest } from "test-utils"
import { JsonName } from "../infrastructure/name-getter"
import { NameBuilder } from "../__test-utils__/name-builder"

const unique =
	(base: number) =>
	(name: JsonName, index: number): JsonName => ({
		...name,
		name: `${name.name}-${index + base}`,
	})

describe("Query names by gender", () => {
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

	it("is possible to see all names together", async () => {
		render()

		await userEvent.click(screen.getByText("link.allNames"))

		expect(screen.getByText("title.allNames")).toBeInTheDocument()
		for (const name of [...maleNames, ...neutralNames, ...femaleNames]) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
	})

	it("is possible to see only female names", async () => {
		render()

		await userEvent.click(screen.getByText("link.femaleNames"))

		expect(screen.getByText("title.femaleNames")).toBeInTheDocument()
		for (const name of [...femaleNames, ...neutralNames]) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of maleNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})

	it("is possible to see only male names", async () => {
		render()

		await userEvent.click(screen.getByText("link.maleNames"))

		expect(screen.getByText("title.maleNames")).toBeInTheDocument()
		for (const name of [...maleNames, ...neutralNames]) {
			expect(screen.getByText(name.name)).toBeInTheDocument()
		}
		for (const name of femaleNames) {
			expect(screen.queryByText(name.name)).not.toBeInTheDocument()
		}
	})
})
