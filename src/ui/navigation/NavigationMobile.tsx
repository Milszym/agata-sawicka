/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useState } from 'react';
import { withMyTheme } from "../theme/theme";
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ABOUT_ME_ID } from "../landing/aboutMe/AboutMe";
import { OFFERS_ID } from "../landing/offers/Offers";
import { PORTFOLIO_ID } from "../landing/portfolio/Portfolio";
import { REVIEWS_ID } from "../landing/reviews/Reviews";
import { CONTACT_ID } from "../landing/contact/Contact";
import { SocialMediaIcons } from '../landing/footer/SocialMediaIcons';

const MenuButtonStyle = withMyTheme((theme) => css`
    position: fixed;
    top: 20px;
    right: 5vw;
    z-index: 1000;
    color: ${theme.palette.common.white};
    
    /* Style the ripple effect using theme colors */
    .MuiTouchRipple-child {
        background-color: ${theme.palette.primary.main};
    }
`);

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const slideIn = keyframes`
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
`;

const OverlayStyle = withMyTheme((theme) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} 0.3s ease-out;
`);

const MenuContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    gap: 2vh;
    text-align: center;
    animation: ${slideIn} 0.3s ease-out;
`);

const MenuItemStyle = withMyTheme((theme) => css`
    color: ${theme.palette.common.white};
    text-decoration: none;
    font-family: ${theme.typography.body1.fontFamily};
    font-size: 24px;
    font-weight: 400;
    cursor: pointer;
    transition: opacity 0.3s;
    padding: 10px;

    &:hover {
        opacity: 0.8;
    }
`);

const SocialMediaIconsStyle = withMyTheme(() => css`
    margin-top: 3vh;
`);

export const NavigationMobile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <IconButton 
                css={MenuButtonStyle}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                disableRipple={false}
                centerRipple={true}
                touchRippleRef={undefined}
            >
                {isMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </IconButton>

            {isMenuOpen && (
                <div css={OverlayStyle}>
                    <nav css={MenuContainerStyle}>
                        <span css={MenuItemStyle} onClick={() => scrollToSection(ABOUT_ME_ID)}>
                            Poznajmy się
                        </span>
                        <span css={MenuItemStyle} onClick={() => scrollToSection(OFFERS_ID)}>
                            Oferta
                        </span>
                        <span css={MenuItemStyle} onClick={() => scrollToSection(REVIEWS_ID)}>
                            Opinie
                        </span>
                        <span css={MenuItemStyle} onClick={() => scrollToSection(PORTFOLIO_ID)}>
                            Portfolio
                        </span>
                        <span css={MenuItemStyle} onClick={() => scrollToSection(CONTACT_ID)}>
                            Kontakt
                        </span>
                        <div css={SocialMediaIconsStyle}>
                            <SocialMediaIcons negative={true}/>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};
