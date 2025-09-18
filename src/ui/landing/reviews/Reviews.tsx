/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { ReviewTile } from '../../components/ReviewTile';
import { Image } from '../../Images';
import { DESKTOP_TITLE_FONT_SIZE, MOBILE_CONTENT_PADDING, MOBILE_TITLE_FONT_SIZE, withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';

export const REVIEWS_ID = 'reviews';

export const GOOGLE_URL = 'https://maps.app.goo.gl/pnrCpbJJaBfekdLr8';
export const BOOKSY_URL = 'https://booksy.com/pl-pl/214831_agata-sawicka-makeup-artist_makijaz_21029_gdynia?do=invite&utm_medium=c2c_referral#ba_s=dl_1:~:text=Opinie-,Opinie,-%2C%20przy%20kt%C3%B3rych%20widoczny'

const ReviewsContainerStyle = withMyTheme((theme) => css`
    padding: 4vh 0;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${theme.palette.primary.main};
        opacity: 0.9;
        z-index: 1;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(${Image.STUDIO_SMALLER});
        background-attachment: fixed;
        background-size: cover;
        z-index: 0;
    }
    
    ${mobileCss(`
        &::after {
            background-image: url(${Image.STUDIO_REVIEWS_MOBILE});
            background-size: none;
        }
        ${MOBILE_CONTENT_PADDING}
    `)}
`);

const ReviewsTitleStyle = withMyTheme((theme) => css`
    text-align: center;
    margin-bottom: 1vh;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.h1.fontFamily};
    font-size: ${DESKTOP_TITLE_FONT_SIZE};
    font-weight: 600;
    margin-top: 0;
    position: relative;
    z-index: 2;
    
    ${mobileCss(`
        font-size: ${MOBILE_TITLE_FONT_SIZE};
    `)}
`);

const ReviewsDescriptionStyle = withMyTheme((theme) => css`
    text-align: center;
    max-width: 50vw;
    margin-bottom: 4vh;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.body1.fontFamily};
    font-size: 1.5vw;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    position: relative;
    z-index: 2;
    ${mobileCss(`
        font-size: 4vw;
        max-width: 90vw;
        margin-bottom: 2vh;
    `)}
`);

const TilesContainerStyle = withMyTheme(() => css`
    display: flex;
    justify-items: center;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 5vw;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    
    ${mobileCss(`
        flex-direction: column;
        gap: 2vh;
        margin-right: 0;
    `)}
`);

export const Reviews = () => {
    const { t } = useTranslation();

    return (
        <>
            <div css={ReviewsContainerStyle} id={REVIEWS_ID}>
                {/* <h2 css={ReviewsTitleStyle}>
                    {t('reviews.title')}
                </h2>
                <p css={ReviewsDescriptionStyle}>
                    {t('reviews.description')}
                </p> */}

                <div css={TilesContainerStyle}>
                    <ReviewTile
                        logoSrc={Image.GOOGLE_LOGO}
                        imagePadding={'2vh'}
                        logoAlt="Opinie Google Maps"
                        title={t('reviews.google.title')}
                        description={t('reviews.google.description')}
                        buttonText={t('reviews.google.button')}
                        url={GOOGLE_URL}
                    />

                    <ReviewTile
                        logoSrc={Image.BOOKSY_LOGO}
                        logoAlt="Opinie Booksy"
                        title={t('reviews.booksy.title')}
                        description={t('reviews.booksy.description')}
                        buttonText={t('reviews.booksy.button')}
                        url={BOOKSY_URL}
                    />
                </div>
            </div>
        </>
    );
};
