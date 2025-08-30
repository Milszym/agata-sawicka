/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { SocialMediaSection } from './SocialMediaSection';
import { ContactSection } from './ContactSection';

const FooterContainerStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.primary.main};
    padding: 3vh 10vw;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    
    ${mobileCss(`
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 30px;
        padding: 30px 20px;
    `)}
`);



export const Footer = () => {
    return (
        <footer css={FooterContainerStyle}>
            <SocialMediaSection />
            <ContactSection />
        </footer>
    );
};
