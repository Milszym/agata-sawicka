/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { GOOGLE_MAPS_LINK } from './SocialMediaIcons';
import { Image } from '../../Images';

const ContactSectionWrapperStyle = withMyTheme(() => css`
    display: flex;
    align-items: center;
    gap: 3vw;
    
    ${mobileCss(`
        flex-direction: column;
        gap: 4vh;
        align-items: center;
    `)}
`);

const ContactSectionStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    ${mobileCss(`
        align-items: center;
        text-align: center;
    `)}
`);

const MapImageContainerStyle = css`
    flex-shrink: 0;
`;

const MapImageStyle = withMyTheme((theme) => css`
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    border: 2px solid ${theme.palette.primary.contrastText};
    display: block;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
    
    ${mobileCss(`
        width: 25vw;
        height: 25vw;
    `)}
`);

const ContactTitleStyle = withMyTheme((theme) => css`
    color: ${theme.palette.primary.contrastText};
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 10px;
    font-family: ${theme.typography.h1.fontFamily};
`);

const ContactItemStyle = withMyTheme((theme) => css`
    color: ${theme.palette.primary.contrastText};
    font-size: 1rem;
    line-height: 1.5;
    font-family: 'Lato';
    text-decoration: none;
    
    &:hover {
        opacity: 0.8;
    }
`);

const ContactLinkStyle = withMyTheme((theme) => css`
    color: ${theme.palette.primary.contrastText};
    font-size: 1rem;
    line-height: 1.5;
    font-family: ${theme.typography.body1.fontFamily};
    text-decoration: none;
    cursor: pointer;
    
    &:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
`);

export const ContactSection = () => {
    const { t } = useTranslation();

    const handlePhoneClick = () => {
        window.location.href = `tel:${t('footer.phone')}`;
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${t('footer.email')}`;
    };

    return (
        <div css={ContactSectionWrapperStyle}>
            <div css={ContactSectionStyle}>
                <h3 css={ContactTitleStyle}>
                    {t('footer.contact')}
                </h3>
                <a css={ContactLinkStyle} onClick={handlePhoneClick}>
                    {t('footer.phone')}
                </a>
                <a css={ContactLinkStyle} onClick={handleEmailClick}>
                    {t('footer.email')}
                </a>
                <a css={ContactItemStyle} href={GOOGLE_MAPS_LINK}>
                    {t('footer.address')}
                </a>
            </div>
            <div css={MapImageContainerStyle}>
                <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer">
                    <img 
                        src={Image.GOOGLE_MAPS_LINK}
                        alt="Location on Google Maps"
                        css={MapImageStyle}
                    />
                </a>
            </div>
        </div>
    );
};
