/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { GOOGLE_MAPS_LINK } from './SocialMediaIcons';

const ContactSectionStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    ${mobileCss(`
        align-items: center;
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
    );
};
