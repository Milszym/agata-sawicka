/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { withMyTheme } from "../../theme/theme";
import { css } from "@emotion/react";
import { mobileCss, isMobile } from "../../theme/isMobile";
import { MyButton } from '../../components/button/MyButton';
import { Image } from '../../Images';
import { OffersMobile } from './OffersMobile';

export const OFFERS_ID = 'offers';

interface OfferImage {
    url: string;
    alt: string;
}

interface AcfFields {
    nazwa_oferty: string;
    opis_oferty: string;
    obraz_oferty: OfferImage;
}

export interface OfferDto {
    id: number;
    acf: AcfFields;
}

const url = 'http://localhost/wordpress-test/wp-json/wp/v2/makeupoffers'

const OffersContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 2rem;
    color: ${theme.palette.text.primary};
    ${mobileCss(`
        padding: 3rem 1rem;
    `)}
`)

const OffersTitleStyle = withMyTheme((theme) => css`
    font-size: 2vw;
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    text-align: center;
    ${mobileCss(`
        font-size: 7vw;
        margin-bottom: 2rem;
    `)}
`)

const OffersGridStyle = withMyTheme(() => css`
    display: grid;
    gap: 2rem;
    max-width: 1200px;
    width: 100%;
    
    /* For 4 items, display 2x2 grid */
    &.grid-4-items {
        grid-template-columns: repeat(2, 1fr);
    }
    
    /* For other numbers, display 3 columns */
    &:not(.grid-4-items) {
        grid-template-columns: repeat(3, 1fr);
        
        /* For last row with 2 items, center them */
        &.has-last-two > *:last-child:nth-child(3n-1) {
            grid-column: 2;
        }
    }

    ${mobileCss(`
        grid-template-columns: 1fr !important;
        gap: 1.5rem;
        
        /* Reset any special grid positioning on mobile */
        & > *:last-child:nth-child(3n-1) {
            grid-column: auto;
        }
    `)}
`)

const OfferTileStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.palette.background.paper};
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
`)

const OfferImageStyle = withMyTheme(() => css`
    width: 100%;
    height: 35vh;
    object-fit: cover;
    ${mobileCss(`
        height: 50vh;
    `)}
`)

const OfferContentStyle = withMyTheme(() => css`
    padding: 0 1.5rem 1.5rem 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`)

const OfferTitleStyle = withMyTheme((theme) => css`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.h1.fontFamily};
    margin-bottom: 1rem;
    align-self: center;
    margin-top 0;
    padding-top:0;
    ${mobileCss(`
        font-size: 1.3rem;
    `)}
`)

const LoadingStyle = withMyTheme((theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 1.2rem;
    color: ${theme.palette.text.secondary};
    font-family: ${theme.typography.body1.fontFamily};
`)

const ErrorStyle = withMyTheme((theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 1.2rem;
    color: ${theme.palette.error.main};
    font-family: ${theme.typography.body1.fontFamily};
`)

const NoOffersStyle = withMyTheme((theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 1.2rem;
    color: ${theme.palette.text.secondary};
    font-family: ${theme.typography.body1.fontFamily};
`)

const ButtonStyle = withMyTheme((theme) => css`
    align-self: center;
    width: 50%;
`);

const BookingButtonStyle = withMyTheme((theme) => css`
    margin-top: 7vh;
    background-color: #00A3AD !important; // Booksy brand color
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

export const Offers = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const [offers, setOffers] = useState<OfferDto[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get<OfferDto[]>(url);
                const data = response.data;
                console.log(JSON.stringify(data))

                if (Array.isArray(data) && data.length > 0) {
                    console.log(data[0].acf)
                    const isValid = data.every(item => item.id !== undefined &&
                        item.acf?.nazwa_oferty !== undefined &&
                        item.acf?.opis_oferty !== undefined &&
                        item.acf?.obraz_oferty?.url !== undefined
                    );

                    if (isValid) {
                        setOffers(data);
                    } else {
                        setError('Data format is incorrect.');
                        setOffers([]);
                    }
                } else {
                    setOffers([]);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
                setOffers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const handleOfferClick = (offerId: number) => {
        navigate(`/oferta/${offerId}`);
    };

    if (loading) {
        return (
            <section css={OffersContainerStyle}>
                <div css={LoadingStyle}>Loading offers...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section css={OffersContainerStyle}>
                <div css={ErrorStyle}>Error: {error}</div>
            </section>
        );
    }

    if (!offers || offers.length === 0) {
        return (
            <section css={OffersContainerStyle}>
                <div css={NoOffersStyle}>No offers available at the moment.</div>
            </section>
        );
    }

    const handleBookingClick = () => {
        window.open('https://booksy.com/pl-pl/dl/show-business/214831', '_blank');
    };

    return (
        <section css={OffersContainerStyle} id={OFFERS_ID}>
            <h2 css={OffersTitleStyle}>{t('offers.title')}</h2>
            {isMobile() ? (
                <OffersMobile offers={offers} />
            ) : (
                <div css={OffersGridStyle} className={`
                    ${offers.length === 4 ? 'grid-4-items' : ''}
                    ${offers.length % 3 === 2 ? 'has-last-two' : ''}
                `}>
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