import { Container, ContainerBuilder } from "diod"
import { createContext } from "preact"

const builder = new ContainerBuilder()

export const DependencyInjectionContext = createContext<Container>(
	builder.build()
)
