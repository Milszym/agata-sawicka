/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { Image } from '../../Images';
import { withMyTheme, SMALL_ROUNDED_CORNER } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { useNavigate } from 'react-router-dom';
import { MyButton } from '../../components/button/MyButton';
import { ArrowBack } from '@mui/icons-material';

export const ABOUT_ME_PAGE_ID = 'about-me-page';

const AboutMeContainerStyle = withMyTheme((theme) => css`
    min-height: 100vh;
    background-color: ${theme.palette.background.default};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5vw;
    padding: 0 10vw;
    
    ${mobileCss(`
        flex-direction: column;
        padding: 100px 20px 40px;
        gap: 30px;
    `)}
`);

const ContentContainerStyle = css`
    flex: 1;
    
    ${mobileCss(`
        max-width: 100vw;
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
    position: relative;
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
    z-index: 2;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
`;

const ButtonStyle = withMyTheme((theme) => css`
    position: fixed;
    top: 5vh;
    left: 5vw;
    background-color: ${theme.palette.primary.dark};
    
    ${mobileCss(`
        align-self: center;
    `)}
`);

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

export const AboutMePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div css={AboutMeContainerStyle} id={ABOUT_ME_PAGE_ID}>
             <MyButton 
                    text="Powrót"
                    onClick={() => navigate(-1)}
                    variant="contained"
                    startIcon={<ArrowBack />}
                    additionalCss={ButtonStyle}
            />
            <div css={ContentContainerStyle}>
                <h2 css={AboutMeTitleStyle}>
                    {t('aboutMe.title')}
                </h2>
                <p css={AboutMeDescriptionStyle}>
                    {t('aboutMe.description')}
                </p>
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
