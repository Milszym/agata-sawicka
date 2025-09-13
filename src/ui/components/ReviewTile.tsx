/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MyButton } from './button/MyButton';
import { withMyTheme } from '../theme/theme';
import { mobileCss } from '../theme/isMobile';

const TileStyle = withMyTheme((theme) => css`
    background: ${theme.palette.background.paper};
    border: 1px solid ${theme.palette.divider};
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    ${mobileCss(`
        width: 65vw;
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
    font-weight: 600;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.h1.fontFamily};
    font-size: 1.5vw;
    ${mobileCss(`
        font-size: 7vw;
    `)}
`);

const TileDescriptionStyle = withMyTheme((theme) => css`
    color: ${theme.palette.text.primary};
    margin-bottom: 25px;
    font-family: ${theme.typography.body1.fontFamily};
    font-size: 1.1vw;
    ${mobileCss(`
        font-size: 4vw;
    `)}
`);

interface ReviewTileProps {
    logoSrc: string;
    logoAlt: string;
    title: string;
    description: string;
    buttonText: string;
    url: string;
}

export const ReviewTile = ({
    logoSrc,
    logoAlt,
    title,
    description,
    buttonText,
    url
}: ReviewTileProps) => {
    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div css={TileStyle}>
            <img
                src={logoSrc}
                alt={logoAlt}
                css={LogoStyle}
            />
            <div css={TileTitleStyle}>
                {title}
            </div>
            <p css={TileDescriptionStyle}>
                {description}
            </p>
            <MyButton
                text={buttonText}
                variant="contained"
                onClick={handleClick}
            />
        </div>
    );
};
