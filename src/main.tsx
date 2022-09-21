import "@fontsource/montserrat"
import "@fontsource/raleway"
import "@fontsource/slabo-27px"
import { render } from "preact"
import "reset-css"
import { App } from "./App"
import "./index.css"
render(<App />, document.getElementById("app") as HTMLElement)
