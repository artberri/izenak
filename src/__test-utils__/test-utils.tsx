// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="enzyme-adapter-preact-pure"/>

import { render, RenderOptions, screen } from "@testing-library/preact"
import userEvent from "@testing-library/user-event"
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-preact-pure"
import { ComponentChild } from "preact"
import "reflect-metadata"
import { App } from "../App"
import { getDependencyInjectionContainer } from "../dependency-injection"
import { JsonFavoriteRepository } from "../infrastructure/json-favorite-repository"
import { JsonName } from "../infrastructure/name-getter"
import { DependencyInjectionProvider } from "../providers/DependencyInjectionProvider"
import { TranslationProvider } from "../providers/TranslationProvider"
import { Name } from "../types/Name"
import { WithChildren } from "../types/WithChildren"
import { InMemoryKeyValueStorage } from "./in-memory-key-value-storage"
import { InMemoryNameGetter } from "./in-memory-name-getter"

configure({ adapter: new Adapter() })

const nameGetterMock = new InMemoryNameGetter()
const keyValueStorageMock = new InMemoryKeyValueStorage()

const { click } = userEvent

afterEach(() => {
	nameGetterMock.reset()
	keyValueStorageMock.reset()
})

const AllTheProviders = ({ children }: WithChildren) => {
	return (
		<TranslationProvider translations={{}}>
			<DependencyInjectionProvider
				container={getDependencyInjectionContainer({
					nameGetterMock,
					keyValueStorageMock,
				})}
			>
				{children}
			</DependencyInjectionProvider>
		</TranslationProvider>
	)
}

const customRender = (
	ui: ComponentChild = <App />,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options })

const setNamesForTest = (names: JsonName[]) => nameGetterMock.setAll(names)
const setFavoritesForTest = (names: Name[]) =>
	keyValueStorageMock.setItem(JsonFavoriteRepository.key, JSON.stringify(names))

export * from "@testing-library/preact"
export {
	customRender as render,
	screen,
	click,
	setNamesForTest,
	setFavoritesForTest,
}
