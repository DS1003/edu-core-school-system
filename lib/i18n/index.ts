import { useAppStore } from '@/store/app-store'
import { fr } from './fr'
import { pt } from './pt'

export const dictionaries = { fr, pt }

export type Language = 'fr' | 'pt'
export type TranslationDict = typeof fr

export function useTranslation() {
  const language = useAppStore((state) => state.language) || 'fr'
  const setLanguage = useAppStore((state) => state.setLanguage)

  const dict = dictionaries[language] || fr

  /**
   * Translates a dot-notated key (e.g. 'landing.hero.title')
   */
  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split('.')
    let result: any = dict
    
    for (const k of keys) {
      if (result && k in result) {
        result = result[k]
      } else {
        return defaultValue !== undefined ? defaultValue : key
      }
    }
    
    return typeof result === 'string' ? result : (defaultValue !== undefined ? defaultValue : key)
  }

  return { t, language, setLanguage }
}
