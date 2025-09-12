/** @jsxImportSource @emotion/react */
import { withMyTheme } from "../../theme/theme"
import { css, Theme, Box } from "@mui/material"
import { Fullscreen } from "../../components/Fullscreen"
import { MyHeader } from "../../components/text/MyHeader"
import { MyText } from "../../components/text/MyText"
import { Trans, useTranslation } from "react-i18next"
import PersonIcon from '@mui/icons-material/Person';
import { mobileCss } from "../../theme/isMobile"
import { Image } from '../../Images';

export const DOMAIN_INSTRUCTIONS_ID = 'domainInstructions'

const OffersContainerStyle = withMyTheme((theme: Theme) => css`
    display: flex;
    flex-direction: column;
    gap: 2vh;
    align-items: center;
`)

const OffersStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5vw;
`)

const CommonOfferBoxStyle = `
    display: flex;
    width: 40vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: center;
    gap: 5vh;
    ${mobileCss(`
        flex-basis: 100%;
        gap: 1.8vh;
    `)}
`

const SecondOfferBoxStyle = withMyTheme((theme: Theme) => css`
    ${CommonOfferBoxStyle}
    ${mobileCss(`
        margin-top: 3.5vh;
    `)}
`)

const OfferBoxStyle = withMyTheme((theme: Theme) => css`
    ${CommonOfferBoxStyle}
`)

const OfferBoxDescriptionStyle = withMyTheme((theme: Theme) => css`
    font-size: 1.5rem;
    text-align: center;
    ${mobileCss(`
        font-size: 5vw;
    `)}
`)

const IconContainerStyle = withMyTheme((theme: Theme) => css`
    display: flex;
    flex-direction: column;
    gap: 2vh;
    width: clamp(12rem, 15vw, 18rem);
    aspect-ratio: 1;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    ${mobileCss(`
        width: 32vw;
    `)}
`)

const PrimaryIconStyle = withMyTheme((theme: Theme) => css`
    font-size: 6em;
    width: 80%;
    color: ${theme.palette.primary.main};
`)

const SecondaryIconStyle = withMyTheme((theme: Theme) => css`
    font-size: 6em;
    color: ${theme.palette.secondary.main};
    ${mobileCss(`
        font-size: 4em;
    `)}
`)

const PrimaryTitleStyle = withMyTheme((theme: Theme) => css`
    font-size: 2.5em;
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.h1.fontFamily};
    text-align: center;
    ${mobileCss(`
        font-size: 8vw;
    `)}
`)

const SecondaryTitleStyle = withMyTheme((theme: Theme) => css`
    font-size: 2.5em;
    color: ${theme.palette.secondary.main};
    font-family: ${theme.typography.h1.fontFamily};
    text-align: center;
    ${mobileCss(`
        font-size: 5vw;
    `)}
`)

export const DomainInstructions = () => {
    const { t } = useTranslation()

    return <Fullscreen id={DOMAIN_INSTRUCTIONS_ID}>
        <div css={OffersContainerStyle}>
            <MyHeader text={t('domainInstructions.title')} />
            <div css={OffersStyle}>
                <div css={OfferBoxStyle}>
                    <div css={IconContainerStyle}>
                        <PersonIcon css={SecondaryIconStyle} />
                    </div>
                    <MyText text={t('domainInstructions.customDomain.title')} additionalCss={PrimaryTitleStyle} />
                    <MyText text={<Trans i18nKey="domainInstructions.customDomain.description"/>} additionalCss={OfferBoxDescriptionStyle} />
                </div>
                <div css={SecondOfferBoxStyle}>
                    <div css={IconContainerStyle}>
                        <img src={Image.LOGO} alt="Domain Icon" css={PrimaryIconStyle} />
                    </div>
                    <MyText text={t('domainInstructions.subdomain.title')} additionalCss={SecondaryTitleStyle} />
                    <MyText text={<Trans i18nKey="domainInstructions.subdomain.description"/>} additionalCss={OfferBoxDescriptionStyle} />
                </div>
            </div>
        </div>
    </Fullscreen>
}