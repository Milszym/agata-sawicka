/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Image } from '../../Images';
import { withMyTheme } from '../../theme/theme';
import { isMobile, mobileCss } from '../../theme/isMobile';
import { ContactForm } from './ContactForm';

const ContactContainerStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.background.default};
    display: flex;
    align-items: center;
    padding: 10vh 10vw;
    justify-content: center;
    gap: 5vw;
    
    ${mobileCss(`
        flex-direction: column;
        padding: 7vh 7vw;
        gap: 30px;
        background-image: url(${Image.CONTACT_FORM_PHOTO});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    `)}
`);



const ImageContainerStyle = css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContactImageStyle = css`
    width: auto;
    height: 80vh;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    
    ${mobileCss(`
        border-radius: 0;
        box-shadow: none;
    `)}
`;

export const Contact = () => {
    return (
        <div css={ContactContainerStyle}>
            <ContactForm />
            
            {!isMobile() && <div css={ImageContainerStyle}>
                <img 
                    src={Image.CONTACT_FORM_PHOTO} 
                    alt="Contact" 
                    css={ContactImageStyle}
                />
            </div>}
        </div>
    );
};
