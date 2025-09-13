/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { Instagram, Facebook, Google } from '@mui/icons-material';
import { Image } from '../../Images';

export const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/pnrCpbJJaBfekdLr8'

const SocialMediaIconsStyle = withMyTheme(() => css`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    
    ${mobileCss(`
        justify-content: center;
    `)}
`);

const SocialIconStyle = (negative: boolean) => withMyTheme((theme) => css`
    width: 40px;
    height: 40px;
    background-color: ${negative ? theme.palette.primary.main : theme.palette.primary.contrastText};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
    text-decoration: none;
    color: ${negative ? theme.palette.primary.contrastText : theme.palette.primary.main};
    
    & svg {
        font-size: 20px;
    }
    
    &:hover {
        transform: scale(1.1);
        opacity: 0.8;
    }
`);

const BooksyIconStyle = withMyTheme((theme) => css`
    width: 24px;
    height: auto;
    border-radius: 0%;
`);

export const SocialMediaIcons = ({ negative = false }: { negative?: boolean }) => {
    const handleSocialClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    return (
        <div css={SocialMediaIconsStyle}>
        <a
            css={SocialIconStyle(negative)}
            onClick={() => handleSocialClick('https://www.instagram.com/agatasawickamakeup/')}
            title="Instagram"
        >
            <Instagram />
        </a>
        <a
            css={SocialIconStyle(negative)}
            onClick={() => handleSocialClick('https://booksy.com/pl-pl/214831_agata-sawicka-makeup-artist_makijaz_21029_gdynia')}
            title="Booksy"
        >
            <img src={negative ? Image.BOOKSY_SHORT_LOGO_WHITE : Image.BOOKSY_SHORT_LOGO} alt="Booksy" css={[SocialIconStyle(negative), BooksyIconStyle]} />
        </a>
        <a
            css={SocialIconStyle(negative)}
            onClick={() => handleSocialClick(GOOGLE_MAPS_LINK)}
            title="Google"
        >
            <Google />
        </a>
        <a
            css={SocialIconStyle(negative)}
            onClick={() => handleSocialClick('https://www.facebook.com/agata.sawicka.makeup')}
            title="Facebook"
        >
            <Facebook />
        </a>
    </div>
    );
};