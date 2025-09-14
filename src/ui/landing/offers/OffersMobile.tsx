/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { withMyTheme } from "../../theme/theme";
import { MyButton } from '../../components/button/MyButton';
import { OfferDto } from './Offers';
import { mobileCss } from '../../theme/isMobile';

const MobileContainerStyle = withMyTheme(() => css`
    position: relative;
    width: 100vw;
`);

const MobileScrollerStyle = withMyTheme(() => css`
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 20px;
    padding: 16px 7.5vw;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
`);

const OfferTileStyle = withMyTheme((theme) => css`
    width: 85vw;
    flex-shrink: 0;
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    background: ${theme.palette.background.paper};
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
`);

const OfferImageStyle = withMyTheme(() => css`
    width: 100%;
    height: 37vh;
    object-fit: cover;
`);

const OfferContentStyle = withMyTheme(() => css`
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`);

const OfferTitleStyle = withMyTheme((theme) => css`
    font-size: 1.3rem;
    font-weight: 700;
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.h1.fontFamily};
    margin-bottom: 1rem;
    align-self: center;
`);

const ButtonStyle = withMyTheme(() => css`
    align-self: center;
    width: 70%;
`);

const PageIndicatorContainerStyle = withMyTheme(() => css`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
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

interface OffersMobileProps {
    offers: OfferDto[];
}

export const OffersMobile: React.FC<OffersMobileProps> = ({ offers }) => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollerRef.current) {
            const scrollLeft = scrollerRef.current.scrollLeft;
            const itemWidth = scrollerRef.current.scrollWidth / offers.length;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setActiveIndex(newIndex);
        }
    };

    const scrollToIndex = (index: number) => {
        if (scrollerRef.current) {
            const itemWidth = scrollerRef.current.scrollWidth / offers.length;
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
        <div css={MobileContainerStyle}>
            <div css={MobileScrollerStyle} ref={scrollerRef}>
                {offers.map((offer, index) => (
                    <div
                        key={offer.id}
                        css={OfferTileStyle}
                    >
                        <img
                            css={OfferImageStyle}
                            src={offer.acf.obraz_oferty.url}
                            alt={offer.acf.obraz_oferty.alt}
                        />
                        <div css={OfferContentStyle}>
                            <h3 css={OfferTitleStyle}>{offer.acf.nazwa_oferty}</h3>
                            <MyButton
                                text="CZYTAJ WIĘCEJ"
                                onClick={() => navigate(`/oferta/${offer.id}`)}
                                variant="contained"
                                additionalCss={ButtonStyle}
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            <div css={PageIndicatorContainerStyle}>
                {offers.map((_, index) => (
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
