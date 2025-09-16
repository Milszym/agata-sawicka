/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import { Image } from '../../Images';
import { DESKTOP_CONTENT_PADDING, MOBILE_CONTENT_PADDING, withMyTheme } from '../../theme/theme';
import { isMobile, mobileCss } from '../../theme/isMobile';
import { ContactForm } from './ContactForm';
import { Instagram } from '@mui/icons-material';
import { MyButton } from '../../components/button/MyButton';
import { INSTAGRAM_LINK } from '../footer/SocialMediaIcons';

export const CONTACT_ID = 'contact';

const ContactContainerStyle = withMyTheme(() => css`
    display: flex;
    align-items: stretch;
    background-image: url(${Image.CONTACT_FORM_BACKGROUND});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    ${DESKTOP_CONTENT_PADDING}
    padding-left: 0;
    
    ${mobileCss(`
        max-width: 100%;
        overflow-x: hidden; /* Prevent horizontal scrolling */
        box-sizing: border-box;
        background-image: url(${Image.STUDIO});
        flex-direction: column;
        align-items: center;
        ${MOBILE_CONTENT_PADDING}
        padding-right: 0;
        padding-left: 0;
        margin: 0;
    `)}
`);

const InstagramContactStyle = withMyTheme((theme, isVisible = false) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    box-sizing: border-box;
    max-width: 100%;
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: translateX(${isVisible ? 0 : '50px'});
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    will-change: opacity, transform;
    
    ${mobileCss(`
        padding: 0;
        margin: 4vh 0 0 0;
        max-width: 85vw;
        width: 100%;
    `)}
`);

const InstagramCardStyle = withMyTheme(() => css`
    background-color: white;
    border-radius: 12px;
    padding: 40px;
    display: flex;
    opacity: 0.9;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    max-width: 400px;
    box-sizing: border-box;
    width: 100%;
    
    ${mobileCss(`
        margin: 0;
        padding: 20px;
        box-shadow: none;
        max-width: 85vw;
    `)}
`);

const InstagramTextStyle = withMyTheme((theme) => css`
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.dark};
    text-align: center;
    font-size: 1.25vw;
    margin-bottom: 1.5rem;
    max-width: 100%;
    
    ${mobileCss(`
        font-size: 5vw;
        margin-bottom: 1rem;
    `)}
`);

const InstagramButtonStyle = withMyTheme(() => css`
    font-size: 1vw !important;
    max-width: 100%;

    ${mobileCss(`
        font-size: 3.2vw !important;
        white-space: nowrap;
    `)}
`);

export const Contact = () => {
    // Using react-intersection-observer hook for animations
    const { ref: sectionRef, inView } = useInView({
        threshold: 0.15,
        triggerOnce: true, // Only trigger once
        delay: 200 // Small delay to ensure smooth animation
    });
    const handleInstagramClick = () => {
        window.open(INSTAGRAM_LINK, '_blank', 'noopener,noreferrer');
    };

    return (
        <div css={ContactContainerStyle} id={CONTACT_ID} ref={sectionRef}>
            <ContactForm isVisible={inView} />
            <div css={(theme) => InstagramContactStyle(theme, inView)}>
                <div css={InstagramCardStyle}>
                    <div css={InstagramTextStyle}>
                        Zachęcam do kontaktu bezpośrednio przez Instagram
                    </div>
                    <MyButton
                        text="Instagram"
                        onClick={handleInstagramClick}
                        variant="contained"
                        additionalCss={InstagramButtonStyle}
                        startIcon={<Instagram sx={{ fontSize: '1.5rem' }} />}
                    />
                </div>
            </div>
        </div>
    );
};
