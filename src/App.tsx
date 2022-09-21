import Router from "preact-router"
import "./App.css"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { About } from "./pages/About/About"
import { Home } from "./pages/Home/Home"

export function App() {
	return (
		<>
			<Header />
			<div class="app__container">
				<Router>
					<Home path="/" />
					<About path="/honiburuz" />
				</Router>
			</div>
			<Footer />
		</>
	)
}
