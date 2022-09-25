import { render, RenderOptions, screen, waitFor } from "@testing-library/preact"
import userEvent from "@testing-library/user-event"
import "reflect-metadata"
import { App } from "../App"
import { getDependencyInjectionContainer } from "../dependency-injection"
import { MockNameGetter } from "../infrastructure/mock-name-getter"
import { DependencyInjectionProvider } from "../providers/DependencyInjectionProvider"
import { WithChildren } from "../types/WithChildren"

const nameGetterMock = new MockNameGetter()

const { click } = userEvent

beforeEach(() => {
	//jest.useFakeTimers()
})

afterEach(() => {
	nameGetterMock.reset()
	//jest.useRealTimers()
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

export * from "@testing-library/preact"
export { customRender as render, screen, click, waitFor }
