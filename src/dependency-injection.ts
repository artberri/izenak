import { ContainerBuilder } from "diod"
import { FetchNameGetter } from "./infrastructure/fetch-name-getter"
import { JsonFavoriteRepository } from "./infrastructure/json-favorite-repository"
import { KeyValueStorage } from "./infrastructure/key-value-storage"
import { LocalStorageKeyValueStorage } from "./infrastructure/localstorage-key-value-storage"
import { NameGetter } from "./infrastructure/name-getter"
import { ScrapedJsonNameFinder } from "./infrastructure/scraped-json-name-finder"
import { FavoriteRepository } from "./services/favorite-repository"
import { NameFinder } from "./services/name-finder"

interface Mocks {
	nameGetterMock?: NameGetter
	keyValueStorageMock?: KeyValueStorage
}

export const getDependencyInjectionContainer = ({
	nameGetterMock,
	keyValueStorageMock,
}: Mocks = {}) => {
	const appContainerBuilder = new ContainerBuilder()

	if (nameGetterMock) {
		appContainerBuilder.register(NameGetter).useInstance(nameGetterMock)
	} else {
		appContainerBuilder.register(NameGetter).use(FetchNameGetter)
	}

	if (keyValueStorageMock) {
		appContainerBuilder
			.register(KeyValueStorage)
			.useInstance(keyValueStorageMock)
	} else {
		appContainerBuilder
			.register(KeyValueStorage)
			.use(LocalStorageKeyValueStorage)
	}

	appContainerBuilder
		.register(NameFinder)
		.use(ScrapedJsonNameFinder)
		.asSingleton()
		.withDependencies([NameGetter])

	appContainerBuilder
		.register(FavoriteRepository)
		.use(JsonFavoriteRepository)
		.asSingleton()
		.withDependencies([KeyValueStorage])

	return appContainerBuilder.build()
}
