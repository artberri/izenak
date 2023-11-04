import { createContext } from "preact"
import { useCallback, useContext } from "preact/hooks"
import { WithChildren } from "../types/WithChildren"

const defaultLanguage = "eu"

type Translations = Record<string, Record<string, string>>

const TranslationContext = createContext<{
	translations: Translations
}>({
	translations: {},
})

interface TranslationProviderProps extends WithChildren {
	translations: Translations
}

export function TranslationProvider({
	children,
	translations,
}: TranslationProviderProps) {
	return (
		<TranslationContext.Provider value={{ translations }}>
			{children}
		</TranslationContext.Provider>
	)
}

export const useTranslation = () => {
	const { translations } = useContext(TranslationContext)

	const t = useCallback(
		(key: string, placeholders: Record<string, string> = {}) => {
			let translation = translations[defaultLanguage]?.[key] ?? key

			for (const placeholderTuple of Object.entries(placeholders)) {
				translation = translation.replaceAll(
					`{{${placeholderTuple[0]}}}`,
					placeholderTuple[1],
				)
			}

			return translation
		},
		[translations],
	)

	return {
		t,
	}
}
