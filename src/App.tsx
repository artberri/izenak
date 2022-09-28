import "./App.css"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { NameCards } from "./components/NameCards/NameCards"
import { Page } from "./components/Page/Page"
import { About } from "./pages/About/About"
import { Home } from "./pages/Home/Home"
import { Names } from "./pages/Names/Names"
import { NavigationProvider, Route } from "./providers/NavigationProvider"
import { Gender } from "./types/Gender"

export function App() {
	return (
		<NavigationProvider>
			<Header />
			<div class="app__container">
				<Page slide route={Route.Home}>
					<Home />
				</Page>
				<Page route={Route.FemaleNames}>
					<Names gender={Gender.Female} />
				</Page>
				<Page route={Route.MaleNames}>
					<Names gender={Gender.Male} />
				</Page>
				<Page route={Route.AllNames}>
					<Names />
				</Page>
				<Page route={Route.About}>
					<About />
				</Page>
			</div>
			<Footer />
			<NameCards.Container />
		</NavigationProvider>
	)
}
