/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { Instagram, Facebook, Google } from '@mui/icons-material';
import { Image } from '../../Images';
import { openUrl } from '../../../util/openLink';

export const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/pnrCpbJJaBfekdLr8'
export const INSTAGRAM_LINK = 'https://www.instagram.com/agatasawickamakeup'

const SocialMediaIconsStyle = withMyTheme(() => css`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    
    ${mobileCss(`
        justify-content: center;
    `)}
`);

const SocialIconStyle = (negative: boolean, brownIcons?: boolean) => withMyTheme((theme) => css`
    width: 40px;
    height: 40px;
    background-color: ${negative ? theme.palette.primary.main : theme.palette.primary.contrastText};
    border-radius: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
    text-decoration: none;
    color: ${negative ? theme.palette.primary.contrastText : brownIcons ? theme.palette.primary.dark : theme.palette.primary.main};
    
    & svg {
        font-size: 20px;
    }
    
    &:hover {
        transform: scale(1.1);
        opacity: 0.8;
    }
`);

const BooksyIconStyle = withMyTheme(() => css`
    width: 24px;
    height: auto;
    border-radius: 0%;
`);

export const SocialMediaIcons = ({ negative = false, booksyIcon, brownIcons }: { negative?: boolean, booksyIcon?: string, brownIcons?: boolean }) => {
    const handleSocialClick = (url: string) => {
        openUrl(url)
    };

    const iconStyle = SocialIconStyle(negative, brownIcons);
    
    const booksyIconSrc = booksyIcon ? booksyIcon : negative ? Image.BOOKSY_SHORT_LOGO_WHITE : Image.BOOKSY_SHORT_LOGO
    return (
        <div css={SocialMediaIconsStyle}>
        <a
            css={iconStyle}
            onClick={() => handleSocialClick(INSTAGRAM_LINK)}
            title="Instagram"
        >
            <Instagram />
        </a>
        <a
            css={iconStyle}
            onClick={() => handleSocialClick('https://booksy.com/pl-pl/214831_agata-sawicka-makeup-artist_makijaz_21029_gdynia')}
            title="Booksy"
        >
            <img src={booksyIconSrc} alt="Booksy" css={[iconStyle, BooksyIconStyle]} />
        </a>
        <a
            css={iconStyle}
            onClick={() => handleSocialClick(GOOGLE_MAPS_LINK)}
            title="Google"
        >
            <Google />
        </a>
        <a
            css={iconStyle}
            onClick={() => handleSocialClick('https://www.facebook.com/agata.sawicka.makeup')}
            title="Facebook"
        >
            <Facebook />
        </a>
    </div>
    );
};