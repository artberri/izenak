import { ContainerBuilder } from "diod"
import { ScrapedJsonNameFinder } from "./infrastructure/scraped-json-name-finder"
import { NameFinder } from "./services/name-finder"

export const appBuilder = new ContainerBuilder()

appBuilder.register(NameFinder).use(ScrapedJsonNameFinder).asSingleton()
