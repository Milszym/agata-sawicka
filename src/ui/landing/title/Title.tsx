/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { Fullscreen } from "../../components/Fullscreen"
import { MyButton } from "../../components/button/MyButton"
import { Image } from "../../Images"
import { withMyTheme } from "../../theme/theme"
import { isMobile, mobileCss } from '../../theme/isMobile';
import { Navigation } from '../../navigation/Navigation';

const BackgroundStyle = withMyTheme(() => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`);

const getLogoStyle = (scrollProgress: number) => withMyTheme(() => {
    // Initial and final sizes for desktop and mobile
    const desktopMaxSize = 45;
    const desktopMinSize = 15;
    const mobileMaxSize = 60;
    const mobileMinSize = 30;

    // Calculate current size based on scroll progress
    const desktopSize = desktopMaxSize - (scrollProgress * (desktopMaxSize - desktopMinSize));
    const mobileSize = mobileMaxSize - (scrollProgress * (mobileMaxSize - mobileMinSize));

    return css`
        position: fixed;
        top: 20px;
        left: 20px;
        width: ${Math.max(desktopMinSize, desktopSize)}vw;
        height: auto;
        z-index: 10;
        transition: opacity 0.3s ease-out;
        opacity: ${scrollProgress === 1 ? 0 : 1};

        ${mobileCss(`
            width: ${Math.max(mobileMinSize, mobileSize)}vw;
            top: 15px;
            left: 15px;
        `)}

        &:nth-of-type(3) {
            opacity: ${scrollProgress < 0.8 ? 1 : 0};
        }

        &:nth-of-type(2) {
            z-index: 11;
            opacity: ${scrollProgress > 0.8 && scrollProgress < 1.2 ? 1 : 0};
        }
    `;
});

const TitleContentStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    color: ${theme.palette.common.white};
    margin-top: 15vh;
    margin-left: auto;
    margin-right: 5vw;
    width: 45vw;

    ${mobileCss(`
        margin-top: 0;
        margin-bottom: 5vh;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: flex-end;
        text-align: center;
        align-items: center;
        width: 90vw;
    `)}
`);

const TitleStyle = withMyTheme((theme) => css`
    font-size: 3vw;
    font-weight: 300;
    margin: 0;
    font-family: ${theme.typography.h1.fontFamily};
    opacity: 0.9;

    ${mobileCss(`
        margin-top: 7vh;
        font-size: 7.5vw;
    `)}
`);

const DescriptionStyle = withMyTheme((theme) => css`
    font-size: 1.9vw;
    line-height: 1.6;
    margin: 30px 0;
    font-family: ${theme.typography.body1.fontFamily};
    max-width: 600px;

    ${mobileCss(`
        font-size: 6vw;
    `)}
`);

const NavigationStyle = (show: boolean) => withMyTheme(() => css`
    opacity: ${show ? 1 : 0};
    transition: opacity 0.3s ease-out;
`);

const ButtonStyle = withMyTheme((theme) => css`
    &.MuiButton-contained {
        background-color: ${theme.palette.primary.main};
        &:hover {
            background-color: ${theme.palette.primary.dark};
        }
    }
    ${mobileCss(`
        width: 50vw;
    `)}
`);

export const Title = () => {
    const [scrollProgress, setScrollProgress] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            // Get viewport height and scroll position
            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            // Calculate scroll progress (0 to 1)
            // Full effect achieved when scrolling 1 viewport height
            const progress = Math.min(scrollPosition / viewportHeight, 1.5);
            setScrollProgress(progress);
        };
        handleScroll()
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return <Fullscreen additionalCss={() => css`position: relative;`}>
        <img
            src={isMobile() ? Image.HEROBANNER_MOBILE : Image.HEROBANNER}
            alt="Herobanner"
            css={BackgroundStyle}
        />
        <img
            src={Image.LOGO_BLACK}
            alt="Agata Sawicka Logo"
            css={getLogoStyle(scrollProgress)}
        />
        <img
            src={Image.LOGO_WHITE}
            alt="Agata Sawicka Logo"
            css={getLogoStyle(scrollProgress)}
        />
        <div css={NavigationStyle(scrollProgress < 0.9)}>
            <Navigation />
        </div>
        <div css={TitleContentStyle}>
            <h1 css={TitleStyle}>Makijaż, który podkreśli Twoje
                naturalne piękno!</h1>
            <p css={DescriptionStyle}>
                Zapraszam do mojego studia makijażu w Gdyni, gdzie wyczaruję dla Ciebie look na każdą okazję – od codziennego po wyjątkowe wydarzenia.
            </p>
            <MyButton
                text="NAPISZ DO MNIE"
                onClick={() => scrollToSection('contact')}
                variant="contained"
                additionalCss={ButtonStyle}
            />
        </div>
    </Fullscreen>
}