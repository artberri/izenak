import { Container, ContainerBuilder } from "diod"
import { createContext } from "preact"
import { useContext } from "preact/hooks"
import { WithChildren } from "../types/WithChildren"

const builder = new ContainerBuilder()

export const DependencyInjectionContext = createContext<Container>(
	builder.build()
)

export interface DependencyInjectionProviderProps extends WithChildren {
	container: Container
}

export function DependencyInjectionProvider({
	children,
	container,
}: DependencyInjectionProviderProps) {
	return (
		<DependencyInjectionContext.Provider value={container}>
			{children}
		</DependencyInjectionContext.Provider>
	)
}

export interface Class<T> extends Function {
	prototype: T
}

export const useService = <T,>(service: Class<T>): T => {
	const container = useContext(DependencyInjectionContext)

	return container.get(service)
}
