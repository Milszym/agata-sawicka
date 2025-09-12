/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useTranslation } from "react-i18next"
import { Fullscreen } from "../../components/Fullscreen"
import { MyButton } from "../../components/button/MyButton"
import { MyHeader } from "../../components/text/MyHeader"
import { MyText } from "../../components/text/MyText"
import { Image } from "../../Images"
import { withMyTheme } from "../../theme/theme"
import { mobileCss } from '../../theme/isMobile';
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

const LogoStyle = withMyTheme(() => css`
    position: fixed;
    top: 20px;
    left: 20px;
    width: 30vw;
    height: auto;
    z-index: 10;
    transition: all 0.3s ease-out;

    ${mobileCss(`
        width: 50vw;
        top: 15px;
        left: 15px;
    `)}
`);

const LogoScrolledStyle = withMyTheme(() => css`
    width: 15vw;

    ${mobileCss(`
        width: 30vw;
    `)}
`);

const TitleContentStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 20px;
    max-width: 600px;
    color: ${theme.palette.common.white};
    margin-top: 15vh;
    margin-left: auto;
    margin-right: 5vw;
    width: 45%;

    ${mobileCss(`
        margin: 25vh auto 0;
        padding: 0 20px;
        text-align: center;
        align-items: center;
        width: auto;
    `)}
`);

const MainTitleStyle = withMyTheme(() => css`
    font-size: 64px;
    font-weight: 300;
    letter-spacing: 8px;
    margin: 0;

    ${mobileCss(`
        font-size: 36px;
        letter-spacing: 4px;
    `)}
`);

const SubtitleStyle = withMyTheme(() => css`
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 4px;
    margin: 0;
    opacity: 0.9;

    ${mobileCss(`
        font-size: 18px;
        letter-spacing: 2px;
    `)}
`);

const DescriptionStyle = withMyTheme(() => css`
    font-size: 20px;
    line-height: 1.6;
    margin: 30px 0;
    max-width: 600px;

    ${mobileCss(`
        font-size: 16px;
    `)}
`);

export const Title = () => {
    const { t } = useTranslation()
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 100);
        };

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
            src={Image.HEROBANNER} 
            alt="HeroBanner Background" 
            css={BackgroundStyle}
        />
        <img 
            src={Image.LOGO_WHITE} 
            alt="Agata Sawicka Logo" 
            css={[LogoStyle, isScrolled && LogoScrolledStyle]}
        />
        <Navigation />
        <div css={TitleContentStyle}>
            <h2 css={SubtitleStyle}>Makijaż, który podkreśli Twoje 
            naturalne piękno!</h2>
            <p css={DescriptionStyle}>
            Zapraszam do mojego studia makijażu w Gdyni, gdzie wyczaruję dla Ciebie look na każdą okazję – od codziennego po wyjątkowe wydarzenia.
            </p>
            <MyButton 
                text="NAPISZ DO MNIE"
                onClick={() => scrollToSection('contact')}
                variant="contained"
            />
        </div>
    </Fullscreen>
}