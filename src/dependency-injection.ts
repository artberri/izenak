import { ContainerBuilder } from "diod"
import { FetchNameGetter } from "./infrastructure/fetch-name-getter"
import { NameGetter } from "./infrastructure/name-getter"
import { ScrapedJsonNameFinder } from "./infrastructure/scraped-json-name-finder"
import { NameFinder } from "./services/name-finder"

interface Mocks {
	nameGetterMock?: NameGetter
}

export const getDependencyInjectionContainer = ({
	nameGetterMock,
}: Mocks = {}) => {
	const appContainerBuilder = new ContainerBuilder()

	if (nameGetterMock) {
		appContainerBuilder.register(NameGetter).useInstance(nameGetterMock)
	} else {
		appContainerBuilder.register(NameGetter).use(FetchNameGetter)
	}

	appContainerBuilder
		.register(NameFinder)
		.use(ScrapedJsonNameFinder)
		.asSingleton()
		.withDependencies([NameGetter])

	return appContainerBuilder.build()
}
