/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { withMyTheme } from "../theme/theme";
import { mobileCss } from "../theme/isMobile";

const NavStyle = withMyTheme(() => css`
    position: absolute;
    top: 50px;
    right: 50px;
    display: flex;
    gap: 30px;
    z-index: 10;

    ${mobileCss(`
        display: none;
    `)}
`);

const NavLinkStyle = withMyTheme((theme) => css`
    color: ${theme.palette.common.white};
    text-decoration: none;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.8;
    }
`);

export const Navigation = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <nav css={NavStyle}>
            <span css={NavLinkStyle} onClick={() => scrollToSection('about')}>Poznajmy się</span>
            <span css={NavLinkStyle} onClick={() => scrollToSection('offer')}>Oferta</span>
            <span css={NavLinkStyle} onClick={() => scrollToSection('portfolio')}>Portfolio</span>
            <span css={NavLinkStyle} onClick={() => scrollToSection('reviews')}>Opinie</span>
            <span css={NavLinkStyle} onClick={() => scrollToSection('contact')}>Kontakt</span>
        </nav>
    )
}