import "./App.css"
import { Header } from "./components/Header/Header"
import { Modal } from "./components/Modal/Modal"
import { NameCards } from "./components/NameCards/NameCards"
import { Page } from "./components/Page/Page"
import { About } from "./pages/About/About"
import { Home } from "./pages/Home/Home"
import { Names } from "./pages/Names/Names"
import { FavoritesProvider } from "./providers/FavoritesProvider"
import { NavigationProvider, Route } from "./providers/NavigationProvider"
import { Gender } from "./types/Gender"

export function App() {
	return (
		<NavigationProvider>
			<FavoritesProvider>
				<NameCards.Container />
				<Modal.Container />
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
			</FavoritesProvider>
		</NavigationProvider>
	)
}
