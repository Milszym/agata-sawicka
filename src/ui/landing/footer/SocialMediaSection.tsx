/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { Instagram, Facebook, Google, CalendarMonth } from '@mui/icons-material';

const SocialMediaSectionStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    ${mobileCss(`
        align-items: center;
    `)}
`);

const SocialMediaTitleStyle = withMyTheme((theme) => css`
    color: ${theme.palette.primary.contrastText};
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
    font-family: ${theme.typography.h1.fontFamily};
`);

const SocialMediaIconsStyle = withMyTheme(() => css`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    
    ${mobileCss(`
        justify-content: center;
    `)}
`);

const SocialIconStyle = withMyTheme((theme) => css`
    width: 40px;
    height: 40px;
    background-color: ${theme.palette.primary.contrastText};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
    text-decoration: none;
    color: ${theme.palette.primary.main};
    
    & svg {
        font-size: 20px;
    }
    
    &:hover {
        transform: scale(1.1);
        opacity: 0.8;
    }
`);

export const SocialMediaSection = () => {
    const { t } = useTranslation();

    const handleSocialClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div css={SocialMediaSectionStyle}>
            <h3 css={SocialMediaTitleStyle}>
                {t('footer.followUs')}
            </h3>
            <div css={SocialMediaIconsStyle}>
                <a
                    css={SocialIconStyle}
                    onClick={() => handleSocialClick('https://www.instagram.com/agatasawickamakeup/')}
                    title="Instagram"
                >
                    <Instagram />
                </a>
                <a
                    css={SocialIconStyle}
                    onClick={() => handleSocialClick('https://booksy.com/pl-pl/214831_agata-sawicka-makeup-artist_makijaz_21029_gdynia')}
                    title="Booksy"
                >
                    <CalendarMonth />
                </a>
                <a
                    css={SocialIconStyle}
                    onClick={() => handleSocialClick('https://maps.app.goo.gl/pnrCpbJJaBfekdLr8')}
                    title="Google"
                >
                    <Google />
                </a>
                <a
                    css={SocialIconStyle}
                    onClick={() => handleSocialClick('https://www.facebook.com/agata.sawicka.makeup')}
                    title="Facebook"
                >
                    <Facebook />
                </a>
            </div>
        </div>
    );
};
