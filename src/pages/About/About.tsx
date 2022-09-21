import { PageTitle } from "../../components/PageTitle/PageTitle"
import "./About.css"

export function About() {
	return (
		<main role="main" class="about">
			<div class="flex flex--v">
				<PageTitle>Honi buruz</PageTitle>
			</div>
			<div class="about__content">
				<p>
					<strong>Izenak.eus</strong> webgunea/aplikazioa{" "}
					<a href="https://www.albertovarela.net">Alberto Varela</a>k garatu du
					eta bertan euskal pertsona-izenak aukeratzeko iragazkiak eskaintzen
					dira.
				</p>
				<p>
					Agertzen diren izen, itzulpen eta esanahi guztiak{" "}
					<a href="https://www.euskaltzaindia.eus/">Euskaltzaindia</a>ren
					webgunetik hartu dira &apos;web scraping&apos; deituriko teknika
					erabiliz.
				</p>
				<p>
					Webgune honen kodigoa software librea da eta{" "}
					<a href="https://www.euskadi.eus/contenidos/informacion/software_lizentziak_2018/eu_def/adjuntos/gnu-gpl-v3.eu.html">
						GNU Lizentzia Publiko Orokorra (GNU GPL 3)
					</a>{" "}
					lizentziarekin kaleratu da. Kodigoa,{" "}
					<a href="https://github.com/artberri/izenak">Github</a>en aurki
					daiteke.
				</p>
				<p>
					Webgune honetara haurdun zaude(te)lako heldu izatekotan... Zorionak!
					:D
				</p>
			</div>
		</main>
	)
}
