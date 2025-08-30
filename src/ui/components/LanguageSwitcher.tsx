/** @jsxImportSource @emotion/react */
import { useTranslation } from "react-i18next"
import { withMyTheme } from "../theme/theme"
import { css } from "@emotion/react"
import { MyButton } from "./button/MyButton"
import { DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES, Language } from "../../constants/languages"

const LanguageSwitcherStyle = withMyTheme(() => css`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    gap: 10px;
`)

const LanguageButtonStyle = withMyTheme(() => css`
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    min-width: 60px;
`)

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: Language) => {
        i18n.changeLanguage(lng)
    }

    const getCurrentLanguage = (): Language => {
        return (i18n.language as Language) || DEFAULT_LANGUAGE
    }

    return (
        <div css={LanguageSwitcherStyle}>
            <MyButton
                text="EN"
                variant={getCurrentLanguage() === 'en' ? "contained" : "outlined"}
                colorVariant="primary"
                onClick={() => changeLanguage('en')}
                additionalCss={LanguageButtonStyle}
            />
            <MyButton
                text="PL"
                variant={getCurrentLanguage() === 'pl' ? "contained" : "outlined"}
                colorVariant="primary"
                onClick={() => changeLanguage('pl')}
                additionalCss={LanguageButtonStyle}
            />
        </div>
    )
} 