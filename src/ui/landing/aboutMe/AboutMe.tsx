/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { Image } from '../../Images';
import { withMyTheme, SMALL_ROUNDED_CORNER } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';

const AboutMeContainerStyle = withMyTheme((theme) => css`
    padding: 60px 20px;
    background-color: ${theme.palette.background.default};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5vw;
    max-width: 1200px;
    margin: 0 auto;
    
    ${mobileCss(`
        flex-direction: column;
        padding: 40px 20px;
        gap: 30px;
    `)}
`);

const ContentContainerStyle = css`
    flex: 1;
    max-width: 600px;
    
    ${mobileCss(`
        max-width: 100%;
        text-align: center;
    `)}
`;

const AboutMeTitleStyle = withMyTheme((theme) => css`
    font-size: 2.5rem;
    font-weight: 600;
    color: ${theme.palette.text.primary};
    margin-bottom: 30px;
    font-family: ${theme.typography.h1.fontFamily};
    
    ${mobileCss(`
        font-size: 2rem;
        margin-bottom: 20px;
    `)}
`);

const AboutMeDescriptionStyle = withMyTheme((theme) => css`
    color: ${theme.palette.text.primary};
    font-size: 1.1rem;
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
    
    ${mobileCss(`
        max-width: 300px;
        width: 100%;
    `)}
`;

const AboutMeImageStyle = css`
    width: 100%;
    height: auto;
    border-radius: ${SMALL_ROUNDED_CORNER};
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
`;

export const AboutMe = () => {
    const { t } = useTranslation();

    return (
        <div css={AboutMeContainerStyle}>
            <div css={ContentContainerStyle}>
                <h2 css={AboutMeTitleStyle}>
                    {t('aboutMe.title')}
                </h2>
                <p css={AboutMeDescriptionStyle}>
                    {t('aboutMe.description')}
                </p>
            </div>
            
            <div css={ImageContainerStyle}>
                <img 
                    src={Image.ABOUT_ME} 
                    alt="About Me" 
                    css={AboutMeImageStyle}
                />
            </div>
        </div>
    );
};
