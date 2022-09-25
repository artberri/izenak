import { rand, randFirstName, randNumber, randSkill } from "@ngneat/falso"
import { JsonName, JsonNameGender } from "../infrastructure/name-getter"

export class NameBuilder {
	private name: string = randFirstName()
	private meaning: string = randSkill()
	private translations: string = this.randomTranslations()

	private constructor(private gender: JsonNameGender) {}

	public build(): JsonName {
		return {
			name: this.name,
			gender: this.gender,
			meaning: this.meaning,
			translations: this.translations,
		}
	}

	public withName(name: string) {
		this.name = name

		return this
	}

	public withMeaning(meaning: string) {
		this.meaning = meaning

		return this
	}

	public withTranslations(translations: string) {
		this.translations = translations

		return this
	}

	public static aRandomName() {
		return new NameBuilder(rand(["epizenoa", "emakumezkoa", "gizonezkoa"]))
	}

	public static aNeutralName() {
		return new NameBuilder("epizenoa")
	}

	public static aFemaleName() {
		return new NameBuilder("emakumezkoa")
	}

	public static aMaleName() {
		return new NameBuilder("gizonezkoa")
	}

	private randomTranslations() {
		const length = randNumber({ min: 0, max: 2 })

		return Array.from({ length }, () => randFirstName()).join(", ")
	}
}
