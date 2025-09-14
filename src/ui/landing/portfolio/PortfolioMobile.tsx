/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { Image } from '../../Images';
import { withMyTheme, SMALL_ROUNDED_CORNER } from '../../theme/theme';
import { useInView } from 'react-intersection-observer';

const MobileContainerStyle = withMyTheme(() => css`
    position: relative;
`);

const MobileScrollerStyle = withMyTheme(() => css`
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 20px;
    padding: 0 calc(50vw - 37.5vw);
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
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

const MobileImageStyle = (theme: any, isVisible = false, index = 0) => css`
    width: 75vw;
    height: 55vh;
    object-fit: cover;
    border-radius: ${SMALL_ROUNDED_CORNER};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    scroll-snap-align: center;
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    transition-delay: ${0.2 + (index * 0.15)}s;
    will-change: opacity, transform;
`;

const PageIndicatorContainerStyle = withMyTheme((theme, isVisible = false) => css`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: translateY(${isVisible ? 0 : '20px'});
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    transition-delay: 0.5s;
    will-change: opacity, transform;
`);

const PageIndicatorStyle = withMyTheme((theme, active: boolean) => css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${active ? theme.palette.primary.main : theme.palette.divider};
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.2);
    }
`);

const portfolioImages = [
    { src: Image.PORTFOLIO_1, alt: 'Portfolio 1' },
    { src: Image.PORTFOLIO_2, alt: 'Portfolio 2' },
    { src: Image.PORTFOLIO_3, alt: 'Portfolio 3' }
];

export const PortfolioMobile = () => {
    // Using react-intersection-observer hook for animations
    const { ref: containerRef, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollerRef.current) {
            const scrollLeft = scrollerRef.current.scrollLeft;
            const itemWidth = scrollerRef.current.scrollWidth / portfolioImages.length;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setActiveIndex(newIndex);
        }
    };

    const scrollToIndex = (index: number) => {
        if (scrollerRef.current) {
            const itemWidth = scrollerRef.current.scrollWidth / portfolioImages.length;
            scrollerRef.current.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (scroller) {
            scroller.addEventListener('scroll', handleScroll);
            return () => scroller.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div css={MobileContainerStyle} ref={containerRef}>
            <div css={MobileScrollerStyle} ref={scrollerRef}>
                {portfolioImages.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        css={(theme) => MobileImageStyle(theme, inView, index)}
                    />
                ))}
            </div>
            
            {/* Page Indicators */}
            <div css={(theme) => PageIndicatorContainerStyle(theme, inView)}>
                {portfolioImages.map((_, index) => (
                    <div
                        key={index}
                        css={(theme) => PageIndicatorStyle(theme, index === activeIndex)}
                        onClick={() => scrollToIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};
