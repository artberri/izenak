import { ContainerBuilder } from "diod"
import { ScrapedJsonNameFinder } from "./infrastructure/scraped-json-name-finder"
import { NameFinder } from "./services/name-finder"

export const appContainerBuilder = new ContainerBuilder()

appContainerBuilder
	.register(NameFinder)
	.use(ScrapedJsonNameFinder)
	.asSingleton()
