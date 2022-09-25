import { render, RenderOptions, screen, waitFor } from "@testing-library/preact"
import userEvent from "@testing-library/user-event"
import "reflect-metadata"
import { App } from "../App"
import { getDependencyInjectionContainer } from "../dependency-injection"
import { MockNameGetter } from "../infrastructure/mock-name-getter"
import { JsonName } from "../infrastructure/name-getter"
import { DependencyInjectionProvider } from "../providers/DependencyInjectionProvider"
import { WithChildren } from "../types/WithChildren"

const nameGetterMock = new MockNameGetter()

const { click } = userEvent

afterEach(() => {
	nameGetterMock.reset()
})

const AllTheProviders = ({ children }: WithChildren) => {
	return (
		<DependencyInjectionProvider
			container={getDependencyInjectionContainer({
				nameGetterMock,
			})}
		>
			{children}
		</DependencyInjectionProvider>
	)
}

const customRender = (options?: Omit<RenderOptions, "wrapper">) =>
	render(<App />, { wrapper: AllTheProviders, ...options })

const setNamesForTest = (names: JsonName[]) => nameGetterMock.setAll(names)

export * from "@testing-library/preact"
export { customRender as render, screen, click, waitFor, setNamesForTest }
