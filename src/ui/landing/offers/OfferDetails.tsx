/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from "../../theme/theme";
import { css } from "@emotion/react";
import { mobileCss } from "../../theme/isMobile";
import { MyButton } from "../../components/button/MyButton";
import { ArrowBack } from "@mui/icons-material";
import { Config } from '../../Config';

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

const url = `${Config.apiUrl}/wp-json/wp/v2/makeupoffers`

const OfferDetailsContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('/images/peach_background_30.png');
    min-height: 100vh;
    padding: 2rem;
    color: ${theme.palette.text.primary};
    ${mobileCss(`
        padding: 1rem;
    `)}
`)

const OfferCardStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.palette.background.paper};
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    max-width: 800px;
    width: 100%;
    ${mobileCss(`
        max-width: 100%;
    `)}
`)

const OfferImageStyle = withMyTheme(() => css`
    width: 100%;
    height: 400px;
    object-fit: cover;
    ${mobileCss(`
        height: 250px;
    `)}
`)

const OfferContentStyle = withMyTheme(() => css`
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    ${mobileCss(`
        padding: 2rem 1.5rem;
        gap: 1.5rem;
    `)}
`)

const OfferTitleStyle = withMyTheme((theme) => css`
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.h1.fontFamily};
    text-align: center;
    margin: 0;
    ${mobileCss(`
        font-size: clamp(1.5rem, 6vw, 2.5rem);
    `)}
`)

const OfferDescriptionStyle = withMyTheme((theme) => css`
    font-size: 1.2rem;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.body1.fontFamily};
    line-height: 1.8;
    text-align: center;
    margin: 0;
    ${mobileCss(`
        font-size: 1.1rem;
        line-height: 1.6;
    `)}
`)

const BackButtonStyle = withMyTheme(() => css`
    margin-bottom: 2rem;
    align-self: flex-start;
    ${mobileCss(`
        margin-bottom: 1.5rem;
    `)}
`)

const LoadingStyle = withMyTheme((theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    font-size: 1.5rem;
    color: ${theme.palette.text.secondary};
    font-family: ${theme.typography.body1.fontFamily};
`)

const ErrorStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    font-size: 1.5rem;
    color: ${theme.palette.error.main};
    font-family: ${theme.typography.body1.fontFamily};
    gap: 2rem;
`)

const NotFoundStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    font-size: 1.5rem;
    color: ${theme.palette.text.secondary};
    font-family: ${theme.typography.body1.fontFamily};
    gap: 2rem;
`)

export const OfferDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [offer, setOffer] = useState<OfferDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffer = async () => {
            if (!id) {
                setError('No offer ID provided');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get<OfferDto>(`${url}/${id}`);
                const data = response.data;

                if (data && data.id && data.acf) {
                    setOffer(data);
                } else {
                    setError('Offer not found');
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        setError('Offer not found');
                    } else {
                        setError(err.message);
                    }
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOffer();
    }, [id]);

    const handleBackClick = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <section css={OfferDetailsContainerStyle}>
                <div css={LoadingStyle}>Loading offer details...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section css={OfferDetailsContainerStyle}>
                <div css={ErrorStyle}>
                    <div>Error: {error}</div>
                    <MyButton
                        text="Go Back"
                        variant="contained"
                        colorVariant="primary"
                        startIcon={<ArrowBack />}
                        onClick={handleBackClick}
                    />
                </div>
            </section>
        );
    }

    if (!offer) {
        return (
            <section css={OfferDetailsContainerStyle}>
                <div css={NotFoundStyle}>
                    <div>Offer not found</div>
                    <MyButton
                        text="Go Back"
                        variant="contained"
                        colorVariant="primary"
                        startIcon={<ArrowBack />}
                        onClick={handleBackClick}
                    />
                </div>
            </section>
        );
    }

    return (
        <section css={OfferDetailsContainerStyle}>
            <MyButton
                text="Back to Offers"
                variant="outlined"
                colorVariant="primary"
                startIcon={<ArrowBack />}
                onClick={handleBackClick}
                additionalCss={BackButtonStyle}
            />
            <div css={OfferCardStyle}>
                <img 
                    css={OfferImageStyle}
                    src={offer.acf.obraz_oferty.url} 
                    alt={offer.acf.obraz_oferty.alt} 
                />
                <div css={OfferContentStyle}>
                    <h1 css={OfferTitleStyle}>{offer.acf.nazwa_oferty}</h1>
                    <p css={OfferDescriptionStyle}>{offer.acf.opis_oferty}</p>
                </div>
            </div>
        </section>
    );
}; 