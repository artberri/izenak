import "reflect-metadata"

import "@fontsource/montserrat"
import "@fontsource/raleway"
import "@fontsource/slabo-27px"
import { render } from "preact"
import "reset-css"
import { App } from "./App"
import { DependencyInjectionContext } from "./contexts/DependencyInjectionContext"
import { appBuilder } from "./dependency-injection"
import "./index.css"

const app = document.getElementById("app")
if (!app) {
	throw new Error("HTML element with id `app` is needed")
}

render(
	<DependencyInjectionContext.Provider value={appBuilder.build()}>
		<App />
	</DependencyInjectionContext.Provider>,
	app
)
