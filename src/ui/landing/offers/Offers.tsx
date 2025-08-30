/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { withMyTheme } from "../../theme/theme";
import { css } from "@emotion/react";
import { mobileCss } from "../../theme/isMobile";

interface OfferImage {
    url: string;
    alt: string;
}

interface AcfFields {
    nazwa_oferty: string;
    opis_oferty: string;
    obraz_oferty: OfferImage;
}

interface OfferDto {
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
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    margin-bottom: 3rem;
    text-align: center;
    ${mobileCss(`
        font-size: clamp(2rem, 8vw, 3rem);
        margin-bottom: 2rem;
    `)}
`)

const OffersGridStyle = withMyTheme(() => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    width: 100%;
    ${mobileCss(`
        grid-template-columns: 1fr;
        gap: 1.5rem;
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
    height: 200px;
    object-fit: cover;
    ${mobileCss(`
        height: 180px;
    `)}
`)

const OfferContentStyle = withMyTheme(() => css`
    padding: 1.5rem;
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
    ${mobileCss(`
        font-size: 1.3rem;
    `)}
`)

const OfferDescriptionStyle = withMyTheme((theme) => css`
    font-size: 1rem;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.body1.fontFamily};
    line-height: 1.6;
    flex: 1;
    ${mobileCss(`
        font-size: 0.95rem;
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
        navigate(`/offer/${offerId}`);
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

    return (
        <section css={OffersContainerStyle}>
            <h2 css={OffersTitleStyle}>{t('offers.title')}</h2>
            <div css={OffersGridStyle}>
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
                            <p css={OfferDescriptionStyle}>{offer.acf.opis_oferty}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};