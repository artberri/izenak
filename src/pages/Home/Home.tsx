import "./Home.css"

export function Home() {
	return (
		<nav class="home" role="navigation" aria-label="Menu nagusia">
			<a
				class="home__link home__link--girl flex flex--center font--slabo"
				href="/neskak"
			>
				Nesken izenak
			</a>
			<a
				class="home__link home__link--boy flex flex--center font--slabo"
				href="/mutilak"
			>
				Mutilen izenak
			</a>
			<a
				class="home__link home__link--all flex flex--center font--slabo"
				href="/guztiak"
			>
				Izen guztiak
			</a>
		</nav>
	)
}
