/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { Image } from '../../Images';
import { withMyTheme, SMALL_ROUNDED_CORNER } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { MyButton } from '../../components/button/MyButton';
import { useNavigate } from 'react-router-dom';

export const ABOUT_ME_ID = 'about-me';

const AboutMeContainerStyle = withMyTheme((theme) => css`
    padding: 15vh 5vw;
    background-color: ${theme.palette.background.default};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5vw;
    margin: 0 auto;
    
    ${mobileCss(`
        flex-direction: column;
        padding: 40px 20px;
        gap: 30px;
    `)}
`);

const ContentContainerStyle = css`
    flex: 1;
    max-width: 45vw;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    
    ${mobileCss(`
        max-width: 100%;
        text-align: center;
        gap: 20px;
    `)}
`;

const ButtonStyle = withMyTheme((theme) => css`
    align-self: flex-start;
    &.MuiButton-contained {
        background-color: ${theme.palette.primary.dark};
    }
    
    ${mobileCss(`
        align-self: center;
    `)}
`);

const AboutMeTitleStyle = withMyTheme((theme) => css`
    font-size: 2.5rem;
    font-weight: 600;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.h1.fontFamily};
    margin: 0;

    ${mobileCss(`
        margin-top: 5vh;
        font-size: 2rem;
    `)}
`);

const AboutMeDescriptionStyle = withMyTheme((theme) => css`
    color: ${theme.palette.text.primary};
    font-size: 1.8vw;
    line-height: 1.8;
    white-space: pre-line;
    font-family: ${theme.typography.body1.fontFamily};
    
    ${mobileCss(`
        font-size: 1rem;
        line-height: 1.6;
    `)}
`);

const ImageContainerStyle = css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    position: relative;
    
    ${mobileCss(`
        max-width: 300px;
        width: 100%;
    `)}
`;

const ImageBackgroundStyle = withMyTheme((theme) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${theme.palette.primary.main};
    border-radius: ${SMALL_ROUNDED_CORNER};
    top: 8px;
    left: 8px;
    z-index: 1;
`);

const AboutMeImageStyle = css`
    position: relative;
    width: 100%;
    height: auto;
    border-radius: ${SMALL_ROUNDED_CORNER};
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    z-index: 2;
    background-color: white;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
`;

export const AboutMe = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <div css={AboutMeContainerStyle} id={ABOUT_ME_ID}>
            <div css={ContentContainerStyle}>
                <h2 css={AboutMeTitleStyle}>
                    {t('aboutMe.title')}
                </h2>
                <p css={AboutMeDescriptionStyle}>
                    {t('aboutMe.shortDescription')}
                </p>
                <MyButton 
                    text="CZYTAJ WIĘCEJ"
                    onClick={() => navigate(`/poznajmy-sie`)}
                    variant="contained"
                    additionalCss={ButtonStyle}
                />
            </div>
            
            <div css={ImageContainerStyle}>
                <div css={ImageBackgroundStyle} />
                <img 
                    src={Image.ABOUT_ME} 
                    alt="About Me" 
                    css={AboutMeImageStyle}
                />
            </div>
        </div>
    );
};
