/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MyButton } from './button/MyButton';
import { withMyTheme } from '../theme/theme';
import { mobileCss } from '../theme/isMobile';
import { openUrl } from '../../util/openLink';

const TileStyle = withMyTheme((theme) => css`
    background: ${theme.palette.background.paper};
    border: 1px solid ${theme.palette.divider};
    border-radius: 12px;
    font-family: ${theme.typography.h1.fontFamily};
    padding: 30px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.9;
    justify-content: center;
    height: 100%;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    ${mobileCss(`
        padding: 22px;
        width: 50vw;
    `)}
`);

const LogoStyle = css`
    width: 5vw;    
    height: 5vw;  
    object-fit: contain;
    ${mobileCss(`
        width: 20vw;
        height: 20vw; 
    `)}
`;

const TileTitleStyle = withMyTheme((theme) => css`
    font-weight: 400;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.h1.fontFamily};
    font-size: 1.5vw;
    margin: 0 0 2vh 0;
    
    ${mobileCss(`
        font-size: 4.5vw;
        margin: 0 0 1.5vh 0;
    `)}
`);

interface ReviewTileProps {
    logoSrc: string;
    logoAlt: string;
    title: string;
    imagePadding?: string;
    description: string;
    buttonText: string;
    url: string;
}

export const ReviewTile = ({
    logoSrc,
    logoAlt,
    title,
    buttonText,
    url
}: ReviewTileProps) => {
    const handleClick = () => {
        openUrl(url)
    };

    return (
        <div css={TileStyle}>
            <img
                src={logoSrc}
                alt={logoAlt}
                css={LogoStyle}
            />
            <p css={TileTitleStyle}>{title}</p>
            <MyButton
                text={buttonText}
                variant="outlined"
                onClick={handleClick}
            />
        </div>
    );
};
