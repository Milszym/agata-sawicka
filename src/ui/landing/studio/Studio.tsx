/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { withMyTheme, DESKTOP_CONTENT_PADDING, DESKTOP_TITLE_FONT_SIZE, MOBILE_CONTENT_PADDING, MOBILE_TITLE_FONT_SIZE, SMALL_ROUNDED_CORNER } from "../../theme/theme";
import { mobileCss, isMobile } from "../../theme/isMobile";
import { Image } from '../../Images';
import { useInView } from 'react-intersection-observer';
import { alpha } from '@mui/material';

export const STUDIO_ID = 'studio';

const StudioContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-height: 90vh;
    ${DESKTOP_CONTENT_PADDING}
    color: ${theme.palette.text.primary};
    background-color: ${alpha(theme.palette.primary.main, 0.05)};
    
    ${mobileCss(`
        flex-direction: column;
        ${MOBILE_CONTENT_PADDING}
        gap: 5vh;
    `)}
`);

const ImageContainerStyle = withMyTheme((theme, isVisible: boolean = false) => css`
    width: 45%;
    height: auto;
    position: relative;
    max-height: 75vh;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateX(${isVisible ? '0' : '-50px'});
    opacity: ${isVisible ? 1 : 0};
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
    
    ${mobileCss(`
        width: 100%;
        order: 2;
    `)}
`);

const StudioImageStyle = css`
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
`;

const ContentContainerStyle = withMyTheme((theme, isVisible: boolean = false) => css`
    width: 45%;
    display: flex;
    flex-direction: column;
    transform: translateX(${isVisible ? '0' : '50px'});
    opacity: ${isVisible ? 1 : 0};
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
    
    ${mobileCss(`
        width: 100%;
        order: 1;
        align-items: center;
        text-align: center;
    `)}
`);

const TitleStyle = withMyTheme((theme) => css`
    font-size: ${DESKTOP_TITLE_FONT_SIZE};
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    margin-bottom: 3vh;
    margin-top: 0;
    
    ${mobileCss(`
        font-size: ${MOBILE_TITLE_FONT_SIZE};
        margin-bottom: 2vh;
    `)}
`);

const AddressStyle = withMyTheme((theme) => css`
    font-size: 1.2rem;
    line-height: 1.6;
    font-family: ${theme.typography.body1.fontFamily};
    margin-bottom: 1vh;
    
    ${mobileCss(`
        font-size: 1rem;
    `)}
`);

const LinkStyle = withMyTheme((theme) => css`
    color: ${theme.palette.primary.dark};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease-in-out;
    
    &:hover {
        color: ${theme.palette.primary.main};
        text-decoration: underline;
    }
`);

const OfferVideoStyle = css`
    position: absolute;
    left: -40px;
    bottom: 40px;
    width: 20vw;
    height: auto;
    max-height: 40vh;
    border-radius: ${SMALL_ROUNDED_CORNER};
    object-fit: cover;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    z-index: 3;
    
    ${mobileCss(`
        width: 90vw;
        height: auto;
        max-height: none;
        bottom: 10px;
        left: 10px;
        position: relative;
        bottom: unset;
        left: unset;
        margin-top: 20px;
        margin-bottom: 20px;
    `)}
`;

export const Studio = () => {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        threshold: 0.15,
        triggerOnce: true,
        delay: 200
    });

    return (
        <section css={StudioContainerStyle} id={STUDIO_ID} ref={ref}>
            <div css={(theme) => ImageContainerStyle(theme, inView)}>
                <img 
                    src={Image.STUDIO}
                    alt="Makeup Studio"
                    css={StudioImageStyle}
                />
                <video
                    src={Image.STUDIO_VIDEO}
                    css={OfferVideoStyle}
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                />
            </div>
            <div css={(theme) => ContentContainerStyle(theme, inView)}>
                <h2 css={TitleStyle}>Studio</h2>
                <p css={AddressStyle}>{t('footer.address')}</p>
                <a 
                    href="https://maps.google.com/?q=Rdestowa+138a,+81-577+Gdynia,+Polska" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    css={LinkStyle}
                >
                    {t('reviews.google.button')}
                </a>
            </div>
        </section>
    );
};