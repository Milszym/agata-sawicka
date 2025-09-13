/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from "../../theme/theme";
import { css } from "@emotion/react";
import { mobileCss, isMobile } from "../../theme/isMobile";
import { MyButton } from '../../components/button/MyButton';
import { Image } from '../../Images';
import { OffersContent } from './OffersContent';

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
    padding: 3vh 7vw 6vh 7vw;
    color: ${theme.palette.text.primary};
    ${mobileCss(`
        padding: 3rem 1rem;
    `)}
`)

const OffersTitleStyle = withMyTheme((theme) => css`
    font-size: 2.5vw;
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    text-align: center;
    ${mobileCss(`
        font-size: 7vw;
        margin-bottom: 2rem;
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
    text-align: center;
    height: 200px;
    font-size: 1.2rem;
    color: ${theme.palette.error.main};
    font-family: ${theme.typography.body1.fontFamily};
`)

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

    const [offers, setOffers] = useState<OfferDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                            console.error('No offers available.');
                            setGeneralError()
                        }
                        setOffers(data);
                    } else {
                        setGeneralError()
                        console.error('The format is incorrect.');
                        setOffers([]);
                    }
                } else {
                    setOffers([]);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.error(err.message);
                    setGeneralError()
                } else {
                    console.error('An unknown error occurred.');
                    setGeneralError()
                }
                setOffers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const setGeneralError = () => {
        setError("Nie udało się załadować ofert 😔. Spójrz na oferty na Booksy lub skontaktuj się ze mną.")
    }

    if (loading) {
        return (
            <section css={OffersContainerStyle}>
                <div css={LoadingStyle}>Ładowanie ofert...</div>
            </section>
        );
    }

    const handleBookingClick = () => {
        window.open('https://booksy.com/pl-pl/dl/show-business/214831', '_blank');
    };

    return (
        <section css={OffersContainerStyle} id={OFFERS_ID}>
            <h2 css={OffersTitleStyle}>{t('offers.title')}</h2>
            
            {error ? <section css={OffersContainerStyle}>
                <div css={ErrorStyle}>{error}</div>
            </section> : <OffersContent offers={offers} />}
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