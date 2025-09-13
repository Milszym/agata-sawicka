/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { withMyTheme, SMALL_ROUNDED_CORNER } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { Image } from '../../Images';

export const VOUCHER_ID = 'voucher';

const VoucherContainerStyle = withMyTheme((theme) => css`
    padding: 7vh 5vw 12vh 5vw;
    background-color: ${theme.palette.background.default};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    ${mobileCss(`
        padding: 8vh 5vw;
    `)}
`);

const VoucherTitleStyle = withMyTheme((theme) => css`
    font-size: 2.5rem;
    font-weight: 600;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.h1.fontFamily};
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;

    ${mobileCss(`
        font-size: 2rem;
        margin-bottom: 3vh;
    `)}
`);

const VoucherDescriptionStyle = withMyTheme((theme) => css`
    color: ${theme.palette.text.primary};
    font-size: 1.6vw;
    line-height: 1.8;
    text-align: center;
    white-space: pre-line;
    font-family: ${theme.typography.body1.fontFamily};
    max-width: 60vw;
    
    ${mobileCss(`
        font-size: 1rem;
        line-height: 1.6;
        max-width: 90vw;
        margin-bottom: 4vh;
    `)}
`);

const ImagesContainerStyle = css`
    display: flex;
    justify-content: center;
    gap: 3vw;
    width: 90vw;
    
    ${mobileCss(`
        width: 50vw;
    `)}
`;

const VoucherImageStyle = withMyTheme((theme) => css`
    width: 25vw;
    height: auto;
    border-radius: ${SMALL_ROUNDED_CORNER};
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
    
    ${mobileCss(`
        width: 50vw;
        border: 3px solid ${theme.palette.primary.light};
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        
        &:first-of-type {
            transform: rotate(-5deg);
            z-index: 1;
        }
        
        &:last-of-type {
            transform: rotate(5deg);
            margin-left: -20vw;
            z-index: 2;
        }
        
        &:hover {
            transform: translateY(-4px) rotate(-5deg);
            
            &:last-of-type {
                transform: translateY(-4px) rotate(5deg);
            }
        }
    `)}
`);

export const Voucher = () => {
    const { t } = useTranslation();

    return (
        <div css={VoucherContainerStyle} id={VOUCHER_ID}>
            <h2 css={VoucherTitleStyle}>
                {t('voucher.title')}
            </h2>
            <p css={VoucherDescriptionStyle}>
                {t('voucher.description')}
            </p>
            <div css={ImagesContainerStyle}>
                <img 
                    src={Image.VOUCHER_1} 
                    alt="Voucher 1" 
                    css={VoucherImageStyle}
                />
                <img 
                    src={Image.VOUCHER_2} 
                    alt="Voucher 2" 
                    css={VoucherImageStyle}
                />
            </div>
        </div>
    );
};
