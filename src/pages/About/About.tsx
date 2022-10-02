import { PageTitle } from "../../components/PageTitle/PageTitle"
import aboutContent from "../../content/about.html?raw"
import { useTranslation } from "../../providers/TranslationProvider"
import "./About.css"

export function About() {
	const { t } = useTranslation()

	return (
		<main role="main" class="about">
			<PageTitle>{t("title.aboutUs")}</PageTitle>
			<div
				class="about__content"
				dangerouslySetInnerHTML={{
					__html: aboutContent,
				}}
			></div>
		</main>
	)
}
