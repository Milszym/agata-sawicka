/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Image } from '../../Images';
import { withMyTheme, SMALL_ROUNDED_CORNER } from '../../theme/theme';
import { useInView } from 'react-intersection-observer';

const DesktopGridStyle = withMyTheme(() => css`
    display: grid;
    padding: 0 5vw;
    margin: 5vh 5vw;
    grid-template-columns: repeat(3, 1fr);
    gap: 5vw;
`);

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DesktopImageStyle = (theme: any, isVisible = false, index = 0) => css`
    width: 100%;
    height: 60vh;
    object-fit: cover;
    border-radius: ${SMALL_ROUNDED_CORNER};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.8s ease-out;
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: ${isVisible ? 'scale(1)' : 'translateY(30px)'};
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, box-shadow 0.3s ease;
    transition-delay: ${0.2 + (index * 0.15)}s;
    will-change: opacity, transform;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 32px 56px rgba(0, 0, 0, 0.5);
    }
`;

const portfolioImages = [
    { src: Image.PORTFOLIO_1, alt: 'Portfolio 1' },
    { src: Image.PORTFOLIO_2, alt: 'Portfolio 2' },
    { src: Image.PORTFOLIO_3, alt: 'Portfolio 3' }
];

export const PortfolioDesktop = () => {
    // Using react-intersection-observer hook for animations
    const { ref: containerRef, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });
    return (
        <div css={DesktopGridStyle} ref={containerRef}>
            {portfolioImages.map((image, index) => (
                <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    css={(theme) => DesktopImageStyle(theme, inView, index)}
                />
            ))}
        </div>
    );
};
