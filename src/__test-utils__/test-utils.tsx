import { render, RenderOptions, screen, waitFor } from "@testing-library/preact"
import userEvent from "@testing-library/user-event"
import "reflect-metadata"
import { App } from "../App"
import { getDependencyInjectionContainer } from "../dependency-injection"
import { JsonFavoriteRepository } from "../infrastructure/json-favorite-repository"
import { JsonName } from "../infrastructure/name-getter"
import { DependencyInjectionProvider } from "../providers/DependencyInjectionProvider"
import { Name } from "../types/Name"
import { WithChildren } from "../types/WithChildren"
import { InMemoryKeyValueStorage } from "./in-memory-key-value-storage"
import { InMemoryNameGetter } from "./in-memory-name-getter"

const nameGetterMock = new InMemoryNameGetter()
const keyValueStorageMock = new InMemoryKeyValueStorage()

const { click } = userEvent

afterEach(() => {
	nameGetterMock.reset()
	keyValueStorageMock.reset()
})

const AllTheProviders = ({ children }: WithChildren) => {
	return (
		<DependencyInjectionProvider
			container={getDependencyInjectionContainer({
				nameGetterMock,
				keyValueStorageMock,
			})}
		>
			{children}
		</DependencyInjectionProvider>
	)
}

const customRender = (options?: Omit<RenderOptions, "wrapper">) =>
	render(<App />, { wrapper: AllTheProviders, ...options })

const setNamesForTest = (names: JsonName[]) => nameGetterMock.setAll(names)
const setFavoritesForTest = (names: Name[]) =>
	keyValueStorageMock.setItem(JsonFavoriteRepository.key, JSON.stringify(names))

export * from "@testing-library/preact"
export {
	customRender as render,
	screen,
	click,
	waitFor,
	setNamesForTest,
	setFavoritesForTest,
}
