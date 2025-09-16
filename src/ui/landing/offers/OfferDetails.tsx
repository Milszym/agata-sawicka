/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { withMyTheme, SMALL_ROUNDED_CORNER } from "../../theme/theme";
import { css } from "@emotion/react";
import { mobileCss } from "../../theme/isMobile";
import { MyButton } from "../../components/button/MyButton";
import { ArrowBack } from "@mui/icons-material";
import { Config } from '../../Config';
import { OfferHelmet } from '../../../helmet/OfferHelmet';
import initialOffers from './initial_offers.json';

interface OfferImage {
    url: string;
    alt: string;
}

interface OfferVideo {
    url: string;
    alt: string;
}

interface AcfFields {
    nazwa_oferty: string;
    opis_oferty: string;
    obraz_oferty: OfferImage;
    optional_video?: OfferVideo;
}

interface OfferDto {
    id: number;
    acf: AcfFields;
}

const url = `${Config.apiUrl}/wp-json/wp/v2/makeupoffers`

const OfferDetailsContainerStyle = withMyTheme((theme) => css`
    min-height: 100vh;
    height: 100vh;
    background-color: ${theme.palette.background.default};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5vw;
    padding: 0 7vw;
    overflow: hidden;
    
    ${mobileCss(`
        flex-direction: column;
        padding: 100px 20px 40px;
        gap: 30px;
        height: auto;
        overflow: visible;
    `)}
`)

const ContentContainerStyle = css`
    flex: 5;
    display: flex;
    flex-direction: column;
    margin-top: 5vh;
    height: 85vh;
    
    ${mobileCss(`
        margin-top: 2vh;
        max-width: 100vw;
        text-align: center;
        height: auto;
    `)}
`;

const OfferTitleStyle = withMyTheme((theme) => css`
    font-size: 2.5rem;
    font-weight: 600;
    color: ${theme.palette.text.primary};
    margin-bottom: 30px;
    font-family: ${theme.typography.h1.fontFamily};
    
    ${mobileCss(`
        font-size: 2rem;
        margin-bottom: 20px;
    `)}
`)

const DescriptionContainerStyle = withMyTheme((theme) => css`
    flex: 1;
    overflow-y: auto;
    padding-right: 16px;
    font-family: ${theme.typography.body1.fontFamily};
    
    ${mobileCss(`
        overflow-y: visible;
        padding-right: 0;
        max-height: none;
    `)}
`);

const OfferDescriptionStyle = withMyTheme((theme) => css`
    color: ${theme.palette.text.primary};
    font-size: 1.1rem;
    line-height: 1.8;
    white-space: pre-line;
    font-family: ${theme.typography.body1.fontFamily};
    
    & p, & ul, & ol {
        margin-bottom: 1rem;
    }
    
    & ul, & ol {
        padding-left: 1.5rem;
    }
    
    & a {
        color: ${theme.palette.primary.main};
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
    
    ${mobileCss(`
        font-size: 1rem;
        line-height: 1.6;
    `)}
`)

const ImageContainerStyle = css`
    position: relative;
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 40vw;
    max-height 70vh;
    
    ${mobileCss(`
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
        max-width: 90vw
    `)}
`;

const OfferImageStyle = css`
    width: 100%;
    height: auto;
    max-height: 80vh;
    border-radius: ${SMALL_ROUNDED_CORNER};
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    z-index: 2;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
`;

const BackButtonStyle = withMyTheme((theme) => css`
    position: fixed;
    top: 5vh;
    left: 5vw;
    background-color: ${theme.palette.primary.dark};
    
    ${mobileCss(`
        align-self: center;
    `)}
`);

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

const OfferVideoStyle = css`
    position: absolute;
    bottom: -40px;
    left: -40px;
    width: 40%;
    height: auto;
    max-height: 40vh;
    border-radius: ${SMALL_ROUNDED_CORNER};
    object-fit: cover;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    z-index: 3;
    
    ${mobileCss(`
        width: 90vw;
        height: auto;
        max-height: none;
        bottom: 10px;
        left: 10px;
        position: relative;
        bottom: unset;
        left: unset;
        margin-top: 20px;
        margin-bottom: 20px;
    `)}
`;

export const OfferDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [offer, setOffer] = useState<OfferDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const setGeneralError = () => {
        setError("Nie udało się załadować oferty 😔. Spójrz na oferty na Booksy lub skontaktuj się ze mną.")
    }

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
        
        const fetchOffer = async () => {
            if (!id) {
                setGeneralError()
                console.error(`No offer ID provided`)
                setLoading(false);
                return;
            }

            // Try to find the offer in the initialOffers first
            const findFallbackOffer = () => {
                let a = initialOffers;
                const fallbackOffer = initialOffers.find(offer => offer.slug === id || offer.id == parseInt(id, 10));
                if (fallbackOffer) {
                    console.log(`Found offer with ID ${id} in fallback data.`);
                    setOffer(fallbackOffer as OfferDto);
                    return true;
                }
                return false;
            };

            try {
                const response = await axios.get<OfferDto>(`${url}/${id}`);
                const data = response.data;

                if (data && data.id && data.acf) {
                    setOffer(data);
                } else {
                    console.error('Invalid data format from API. Trying fallback data.');
                    if (!findFallbackOffer()) {
                        setGeneralError();
                    }
                }
            } catch (err) {
                console.error(`API error: ${err instanceof Error ? err.message : 'Unknown error'}. Trying fallback data.`);
                
                // Try to get the offer from initialOffers
                if (!findFallbackOffer()) {
                    setGeneralError();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOffer();
    }, [id]);

    const handleBackClick = () => {
        // Check if we can go back in history, otherwise go to home page
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div css={OfferDetailsContainerStyle}>
                <div css={LoadingStyle}>Loading offer details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div css={OfferDetailsContainerStyle}>
                <div css={ErrorStyle}>
                    <div>{error}</div>
                    <MyButton
                        text="Powrót"
                        variant="contained"
                        colorVariant="primary"
                        startIcon={<ArrowBack />}
                        onClick={handleBackClick}
                    />
                </div>
            </div>
        );
    }

    if (!offer) {
        return (
            <div css={OfferDetailsContainerStyle}>
                <div css={NotFoundStyle}>
                    <div>Nie udało się załadować informacji o ofercie</div>
                    <MyButton
                        text="Powrót"
                        variant="contained"
                        colorVariant="primary"
                        startIcon={<ArrowBack />}
                        onClick={handleBackClick}
                    />
                </div>
            </div>
        );
    }

    const getImageUrl = (url: string) => {
        if(url.startsWith('http')) {
            return url;
        } else {
            return `../${url}`;
        }
    }

    return (
        <>
            <OfferHelmet 
                offerName={offer.acf.nazwa_oferty}
                offerDescription={offer.acf.opis_oferty}
                offerImage={offer.acf.obraz_oferty.url}
            />
            <div css={OfferDetailsContainerStyle}>
                <MyButton
                    text="Powrót"
                    variant="contained"
                    colorVariant="primary"
                    startIcon={<ArrowBack />}
                    onClick={handleBackClick}
                    additionalCss={BackButtonStyle}
                />
                <div css={ContentContainerStyle}>
                    <h2 css={OfferTitleStyle}>
                        {offer.acf.nazwa_oferty}
                    </h2>
                    <div css={DescriptionContainerStyle}>
                        <div 
                            css={OfferDescriptionStyle} 
                            dangerouslySetInnerHTML={{ __html: offer.acf.opis_oferty }}
                        />
                    </div>
                </div>
                
                <div css={ImageContainerStyle}>
                    <img 
                        src={getImageUrl(offer.acf.obraz_oferty.url)} 
                        alt={offer.acf.obraz_oferty.alt} 
                        css={OfferImageStyle}
                    />
                    {offer.acf.optional_video && (
                        <video 
                            src={getImageUrl(offer.acf.optional_video.url)} 
                            css={OfferVideoStyle}
                            preload="auto"
                            autoPlay
                            muted
                            playsInline
                            controls={false}
                        />
                    )}
                </div>
            </div>
        </>
    );
}; 