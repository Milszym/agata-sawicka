export const DEFAULT_LANGUAGE = 'pl'
export const AVAILABLE_LANGUAGES = ['en', 'pl'] as const
export type Language = typeof AVAILABLE_LANGUAGES[number] 