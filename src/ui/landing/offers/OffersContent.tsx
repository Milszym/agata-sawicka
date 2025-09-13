/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { withMyTheme } from "../../theme/theme";
import { css } from "@emotion/react";
import { mobileCss, isMobile } from "../../theme/isMobile";
import { MyButton } from '../../components/button/MyButton';
import { OffersMobile } from './OffersMobile';
import { OfferDto } from './Offers';

const ButtonStyle = withMyTheme(() => css`
    align-self: center;
    width: 75%;
`);

const OffersGridStyle = withMyTheme(() => css`
    display: grid;
    gap: 2rem;
    width: 100%;
    justify-content: center;
    
    /* For 4 items, display 2x2 grid */
    &.grid-4-items {
        grid-template-columns: repeat(2, minmax(auto, 25vw));
    }
    
    /* For other numbers, display 3 columns */
    &:not(.grid-4-items) {
        grid-template-columns: repeat(3, minmax(auto, 25vw));
        
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

const OfferTileStyle = withMyTheme((theme, isSelected: boolean = false) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.palette.background.paper};
    border-radius: 12px;
    box-shadow: ${isSelected ? '0 8px 24px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
    overflow: hidden;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    cursor: pointer;
    transform: ${isSelected ? 'translateY(-4px)' : 'none'};
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
`)

const OfferImageStyle = withMyTheme(() => css`
    width: 100%;
    height: 25vh;
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
    font-size: 1.5vw;
    font-weight: 700;
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.h1.fontFamily};
    margin-bottom: 1rem;
    align-self: center;
    margin-top 0;
    text-align: center;
    padding-top:0;
    ${mobileCss(`
        font-size: 1.3rem;
    `)}
`)

export const OffersContent = ({ offers }: { offers: OfferDto[] }) => {
    const navigate = useNavigate();

    const handleOfferClick = (offerId: number) => {
        navigate(`/oferta/${offerId}`);
    };

    return <>{isMobile() ? (
        <OffersMobile offers={offers} />
    ) : (
        <div css={OffersGridStyle} className={`
            ${offers.length === 4 ? 'grid-4-items' : ''}
            ${offers.length % 3 === 2 ? 'has-last-two' : ''}
        `}>
            {offers.map(offer => (
                <div
                    key={offer.id}
                    css={theme => OfferTileStyle(theme, offers.length > 1 && offers.indexOf(offer) === 1)}
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
    )}</>
}