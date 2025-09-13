/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Image } from '../../Images';
import { withMyTheme, SMALL_ROUNDED_CORNER } from '../../theme/theme';

const DesktopGridStyle = withMyTheme(() => css`
    display: grid;
    padding: 0 5vw;
    margin: 5vh 5vw;
    grid-template-columns: repeat(3, 1fr);
    gap: 5vw;
`);

const DesktopImageStyle = withMyTheme(() => css`
    width: 100%;
    height: 60vh;
    object-fit: cover;
    border-radius: ${SMALL_ROUNDED_CORNER};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 32px 56px rgba(0, 0, 0, 0.5);
    }
`);

const portfolioImages = [
    { src: Image.PORTFOLIO_1, alt: 'Portfolio 1' },
    { src: Image.PORTFOLIO_2, alt: 'Portfolio 2' },
    { src: Image.PORTFOLIO_3, alt: 'Portfolio 3' }
];

export const PortfolioDesktop = () => {
    return (
        <div css={DesktopGridStyle}>
            {portfolioImages.map((image, index) => (
                <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    css={DesktopImageStyle}
                />
            ))}
        </div>
    );
};
