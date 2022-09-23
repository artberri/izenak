import type { ComponentChildren } from "preact"
import Router from "preact-router"
import { useState } from "preact/hooks"
import "./App.css"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { Page } from "./components/Page/Page"
import { About } from "./pages/About/About"
import { Home } from "./pages/Home/Home"
import { Izenak } from "./pages/Izenak/Izenak"
import { Gender } from "./types/Gender"

export function App() {
	const [previousEl, setPreviousEl] = useState<ComponentChildren | null>(null)
	const [outEl, setOutEl] = useState<JSX.Element | null>(null)

	return (
		<>
			<Header />
			<div class="app__container">
				<Router
					onChange={(e) => {
						if (previousEl) {
							setOutEl(
								<div
									class="page page--out"
									key={e.previous}
									onAnimationEnd={() => setOutEl(null)}
								>
									{previousEl}
								</div>
							)
						}
						setPreviousEl(e.current.props.children)
					}}
				>
					<Page path="/">
						<Home />
					</Page>
					<Page path="/neskak">
						<Izenak gender={Gender.Female} />
					</Page>
					<Page path="/mutilak">
						<Izenak gender={Gender.Male} />
					</Page>
					<Page path="/guztiak">
						<Izenak />
					</Page>
					<Page path="/honiburuz">
						<About />
					</Page>
				</Router>
				{outEl}
			</div>
			<Footer />
		</>
	)
}
