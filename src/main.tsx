import "reflect-metadata"

import "@fontsource/montserrat"
import "@fontsource/raleway"
import "@fontsource/slabo-27px"
import { render } from "preact"
import "reset-css"
import { App } from "./App"
import eu from "./assets/translations/eu.json"
import { getDependencyInjectionContainer } from "./dependency-injection"
import "./index.css"
import { DependencyInjectionProvider } from "./providers/DependencyInjectionProvider"
import { TranslationProvider } from "./providers/TranslationProvider"

const app = document.getElementById("app")
if (!app) {
	throw new Error("HTML element with id `app` is needed")
}

render(
	<TranslationProvider translations={{ eu }}>
		<DependencyInjectionProvider container={getDependencyInjectionContainer()}>
			<App />
		</DependencyInjectionProvider>
	</TranslationProvider>,
	app,
)
