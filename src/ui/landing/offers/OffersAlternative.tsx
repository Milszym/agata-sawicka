/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from "../../theme/theme";
import { css } from "@emotion/react";
import { mobileCss, isMobile } from "../../theme/isMobile";
import { MyButton } from '../../components/button/MyButton';
import { Image } from '../../Images';
import { OfferDto } from './Offers';
import { useNavigate } from 'react-router-dom';

export const OFFERS_ALTERNATIVE_ID = 'offers-alternative';

const url = 'http://localhost/wordpress-test/wp-json/wp/v2/makeupoffers';

const ContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3vh 0 6vh 0;
    color: ${theme.palette.text.primary};
    background-color: ${theme.palette.background.paper};
    
    ${mobileCss(`
        padding: 3rem 1rem;
    `)}
`);

const TitleStyle = withMyTheme((theme) => css`
    font-size: 2.5vw;
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    text-align: center;
    margin-bottom: 5vh;
    
    ${mobileCss(`
        font-size: 7vw;
        margin-bottom: 2rem;
    `)}
`);

const ScrollerContainerStyle = css`
    width: 100vw;
    position: relative;
    overflow: hidden;
`;

const ScrollerStyle = css`
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 2vw;
    padding: 2vh calc(50vw - 12.5vw);
    margin-bottom: 3vh;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    ${mobileCss(`
        padding: 2vh 7vw;
        gap: 4vw;
    `)}
`;

const OfferTileStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    cursor: pointer;
    flex-shrink: 0;
    width: 25vw;
    scroll-snap-align: center;
    scroll-snap-stop: always;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
    
    ${mobileCss(`
        width: 80vw;
    `)}
`);

const OfferImageStyle = css`
    width: 100%;
    height: 25vh;
    object-fit: cover;
    
    ${mobileCss(`
        height: 50vh;
    `)}
`;

const OfferContentStyle = css`
    padding: 0 1.5rem 1.5rem 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const OfferTitleStyle = withMyTheme((theme) => css`
    font-size: 1.5vw;
    font-weight: 700;
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.h1.fontFamily};
    margin-bottom: 1rem;
    align-self: center;
    margin-top: 2vh;
    text-align: center;
    padding-top: 0;
    
    ${mobileCss(`
        font-size: 1.3rem;
    `)}
`);

const ButtonStyle = withMyTheme(() =>css`
    align-self: center;
    width: 75%;
`);

const PageIndicatorContainerStyle = css`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
`;

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

const BookingButtonStyle = withMyTheme((theme) => css`
    margin-top: 7vh;
    background-color: ${theme.palette.primary.main} !important;
    padding: 12px 24px;
    display: flex;
    font-size: 1.2vw;
    align-items: center;
    gap: 12px;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        background-color: #00A3AD !important;
        transform: translateY(-2px);
        box-shadow: 0 12px 12px rgba(0, 179, 136, 0.2);
    }

    ${mobileCss(`
        width: 90%;
        font-size: 4vw;
        margin: 2rem auto;
    `)}
`);

const BookingIconStyle = css`
    width: auto;
    height: 26px;
    padding: 10px 0;
    margin: 0;
    object-fit: contain;
    filter: brightness(0) invert(1);
    ${mobileCss(`
        height: 2vh;
    `)}
`;

export const OffersAlternative = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [offers, setOffers] = useState<OfferDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get<OfferDto[]>(url);
                const data = response.data;

                if (Array.isArray(data) && data.length > 0) {
                    const isValid = data.every(item => item.id !== undefined &&
                        item.acf?.nazwa_oferty !== undefined &&
                        item.acf?.opis_oferty !== undefined &&
                        item.acf?.obraz_oferty?.url !== undefined
                    );

                    if (isValid) {
                        if(data.length > 0) {
                            setOffers(data);
                        } else {
                            setGeneralError();
                        }
                    } else {
                        setGeneralError();
                        setOffers([]);
                    }
                } else {
                    setOffers([]);
                }
            } catch (err) {
                setGeneralError();
                setOffers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const setGeneralError = () => {
        setError("Nie udało się załadować ofert 😔. Spójrz na oferty na Booksy lub skontaktuj się ze mną.");
    };

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
    }, [offers.length]);

    // Effect to scroll to second item initially
    useEffect(() => {
        if (offers.length > 1 && !isMobile()) {
            setTimeout(() => {
                scrollToIndex(0.5);
            }, 100); // Small delay to ensure DOM is ready
        }
    }, [offers.length]);

    const handleOfferClick = (offerId: number) => {
        navigate(`/oferta/${offerId}`);
    };

    const handleBookingClick = () => {
        window.open('https://booksy.com/pl-pl/dl/show-business/214831', '_blank');
    };

    if (loading) {
        return (
            <section css={ContainerStyle}>
                <div>Ładowanie ofert...</div>
            </section>
        );
    }

    return (
        <section css={ContainerStyle} id={OFFERS_ALTERNATIVE_ID}>
            <h2 css={TitleStyle}>{t('offers.title')}</h2>
            {error ? (
                <div>{error}</div>
            ) : (
                <div css={ScrollerContainerStyle}>
                    <div css={ScrollerStyle} ref={scrollerRef}>
                        {offers.map(offer => (
                            <div
                                key={offer.id}
                                css={OfferTileStyle}
                                onClick={() => handleOfferClick(offer.id)}
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
            )}
            
            <MyButton
                text="Zobacz oferty na"
                onClick={handleBookingClick}
                variant="contained"
                additionalCss={BookingButtonStyle}
                endIcon={
                    <img
                        src={Image.BOOKSY_LOGO}
                        alt="Booksy Logo"
                        css={BookingIconStyle}
                    />
                }
            />
        </section>
    );
};
