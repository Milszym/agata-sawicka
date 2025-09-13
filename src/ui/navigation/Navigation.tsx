/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { withMyTheme } from "../theme/theme";
import { ABOUT_ME_ID } from "../landing/aboutMe/AboutMe";
import { OFFERS_ID } from "../landing/offers/Offers";
import { PORTFOLIO_ID } from "../landing/portfolio/Portfolio";
import { REVIEWS_ID } from "../landing/reviews/Reviews";
import { CONTACT_ID } from "../landing/contact/Contact";
import { NavigationMobile } from "./NavigationMobile";
import { SocialMediaIcons } from "../landing/footer/SocialMediaIcons";

const NavStyle = withMyTheme(() => css`
    position: fixed;
    top: 50px;
    right: 50px;
    display: flex;
    gap: 30px;
    align-items: center;
    z-index: 10;
`);

const NavLinksStyle = withMyTheme(() => css`
    display: flex;
    align-items: center;
    gap: 30px;
`);

const NavLinkStyle = withMyTheme((theme) => css`
    color: ${theme.palette.common.white};
    text-decoration: none;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    padding: 5px 0;
    position: relative;
    transition: all 0.3s ease;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        background-color: ${theme.palette.common.white};
        transition: width 0.3s ease;
    }

    &::before {
        left: 0;
        top: 0;
    }

    &::after {
        right: 0;
        bottom: 0;
    }

    &:hover {
        transform: translateY(-2px);
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);

        &::before,
        &::after {
            width: 100%;
        }
    }

    &:active {
        transform: translateY(1px);
    }
`);

export const Navigation = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (isMobile) {
        return <NavigationMobile />;
    }

    return (
        <nav css={NavStyle}>
            <div css={NavLinksStyle}>
                <span css={NavLinkStyle} onClick={() => scrollToSection(ABOUT_ME_ID)}>Poznajmy się</span>
                <span css={NavLinkStyle} onClick={() => scrollToSection(OFFERS_ID)}>Oferta</span>
                <span css={NavLinkStyle} onClick={() => scrollToSection(PORTFOLIO_ID)}>Portfolio</span>
                <span css={NavLinkStyle} onClick={() => scrollToSection(REVIEWS_ID)}>Opinie</span>
                <span css={NavLinkStyle} onClick={() => scrollToSection(CONTACT_ID)}>Kontakt</span>
            </div>
            <SocialMediaIcons />
        </nav>
    );
}