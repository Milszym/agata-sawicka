/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Image } from '../../Images';
import { withMyTheme } from '../../theme/theme';
import { isMobile, mobileCss } from '../../theme/isMobile';
import { ContactForm } from './ContactForm';

export const CONTACT_ID = 'contact';

const ContactContainerStyle = withMyTheme(() => css`
    display: flex;
    align-items: stretch;
    background-image: url(${Image.CONTACT_FORM_BACKGROUND});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    ${mobileCss(`
        background-image: url(${Image.CONTACT_FORM_PHOTO});
        flex-direction: column;
        align-items: center;
        padding: 7vh 7vw;
    `)}
`);

const MapContainerStyle = withMyTheme(() => css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    
    ${mobileCss(`
        padding: 0;
        width: 100%;
    `)}
`);

const MapImageStyle = withMyTheme((theme) => css`
    width: 25vw;
    height: 25vw;
    object-fit: cover;
    border-radius: 500px;
    border: 2px solid ${theme.palette.primary.main};
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    max-width: 33vw;
    max-height: 50vh;
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    }

    ${mobileCss(`
        border-radius: 12px;
        max-width: none;
        width: 80vw;
        height: 15vh;
    `)}
`);

export const Contact = () => {
    const handleMapClick = () => {
        window.open('https://maps.google.com/maps?q=Rdestowa+138a,+81-577+Gdynia,+Polska', '_blank');
    };

    return (
        <div css={ContactContainerStyle} id={CONTACT_ID}>
            <ContactForm />
            <div css={MapContainerStyle}>
                <img
                    src={Image.GOOGLE_MAPS_LINK}
                    alt="Location on Google Maps"
                    css={MapImageStyle}
                    onClick={handleMapClick}
                />
            </div>
        </div>
    );
};
