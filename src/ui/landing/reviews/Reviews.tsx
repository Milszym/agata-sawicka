/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { ReviewTile } from '../../components/ReviewTile';
import { Image } from '../../Images';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';

export const REVIEWS_ID = 'reviews';

const GOOGLE_URL = 'https://maps.app.goo.gl/pnrCpbJJaBfekdLr8';
const BOOKSY_URL = 'https://booksy.com/pl-pl/214831_agata-sawicka-makeup-artist_makijaz_21029_gdynia?do=invite&utm_medium=c2c_referral#ba_s=dl_1:~:text=Opinie-,Opinie,-%2C%20przy%20kt%C3%B3rych%20widoczny'

const ReviewsContainerStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.background.default};
    padding: 4vh 0;
`);

const ReviewsTitleStyle = withMyTheme((theme) => css`
    text-align: center;
    margin-bottom: 1vh;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.h1.fontFamily};
    font-size: 2vw;
    font-weight: 600;
    margin-top: 0;
    
    ${mobileCss(`
        font-size: 7vw;
    `)}
`);

const ReviewsDescriptionStyle = withMyTheme((theme) => css`
    text-align: center;
    max-width: 50vw;
    margin-bottom: 5vh;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.body1.fontFamily};
    font-size: 1.5vw;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    ${mobileCss(`
        font-size: 4vw;
        max-width: 90vw;
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
    
    ${mobileCss(`
        flex-direction: column;
        gap: 2vh;
    `)}
`);

export const Reviews = () => {
    const { t } = useTranslation();

    return (
        <div css={ReviewsContainerStyle} id={REVIEWS_ID}>
            <h2 css={ReviewsTitleStyle}>
                {t('reviews.title')}
            </h2>
            <p css={ReviewsDescriptionStyle}>
                {t('reviews.description')}
            </p>

            <div css={TilesContainerStyle}>
                <ReviewTile
                    logoSrc={Image.GOOGLE_LOGO}
                    logoAlt="Google Reviews"
                    title={t('reviews.google.title')}
                    description={t('reviews.google.description')}
                    buttonText={t('reviews.google.button')}
                    url={GOOGLE_URL}
                />

                <ReviewTile
                    logoSrc={Image.BOOKSY_LOGO}
                    logoAlt="Booksy Reviews"
                    title={t('reviews.booksy.title')}
                    description={t('reviews.booksy.description')}
                    buttonText={t('reviews.booksy.button')}
                    url={BOOKSY_URL}
                />
            </div>
        </div>
    );
};
