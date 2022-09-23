import "reflect-metadata"

import "@fontsource/montserrat"
import "@fontsource/raleway"
import "@fontsource/slabo-27px"
import { render } from "preact"
import "reset-css"
import { App } from "./App"
import { appContainerBuilder } from "./dependency-injection"
import "./index.css"
import { DependencyInjectionProvider } from "./providers/DependencyInjectionProvider"

const app = document.getElementById("app")
if (!app) {
	throw new Error("HTML element with id `app` is needed")
}

render(
	<DependencyInjectionProvider container={appContainerBuilder.build()}>
		<App />
	</DependencyInjectionProvider>,
	app
)
