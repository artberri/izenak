import { useContext } from "preact/hooks"
import { DependencyInjectionContext } from "../contexts/DependencyInjectionContext"

export interface Class<T> extends Function {
	prototype: T
}

export const useService = <T>(service: Class<T>): T => {
	const container = useContext(DependencyInjectionContext)

	return container.get(service)
}
