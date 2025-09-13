/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from '../../theme/theme';
import { isMobile, mobileCss } from '../../theme/isMobile';
import { PortfolioDesktop } from './PortfolioDesktop';
import { PortfolioMobile } from './PortfolioMobile';
import { MyButton } from '../../components/button/MyButton';
import InstagramIcon from '@mui/icons-material/Instagram';

export const PORTFOLIO_ID = 'portfolio';

const PortfolioContainerStyle = withMyTheme((theme) => css`
    width: 100vw;
    padding: 12vh 0;
    background-color: ${theme.palette.background.paper};
`);

const PortfolioTitleStyle = withMyTheme((theme) => css`
    text-align: center;
    margin-bottom: 50px;
    color: ${theme.palette.primary.main};
    font-size: 2.5rem;
    font-weight: 600;
    font-family: ${theme.typography.h1.fontFamily};
`);

const InstagramButtonStyle = withMyTheme((theme) => css`
    margin-top: 2vh;
    background-color: ${theme.palette.primary.main} !important;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.2vw;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    ${mobileCss(`
        font-size: 1rem;
        margin-top: 4vh;
    `)}
`);

const ButtonContainerStyle = withMyTheme(() => css`
    display: flex;
    justify-content: center;
    width: 100%;
`);

export const Portfolio = () => {
    const { t } = useTranslation();
    const [isMobileView, setIsMobileView] = useState(isMobile());

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(isMobile());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/agatasawickamakeup/', '_blank');
    };

    return (
        <div css={PortfolioContainerStyle} id={PORTFOLIO_ID}>
            <div css={PortfolioTitleStyle}>
                {t('portfolio.title')}
            </div>
            
            {isMobileView ? <PortfolioMobile /> : <PortfolioDesktop />}
            
            <div css={ButtonContainerStyle}>
                <MyButton
                    text={t('portfolio.see_more_on_instagram')}
                    onClick={handleInstagramClick}
                    variant="contained"
                    additionalCss={InstagramButtonStyle}
                    startIcon={<InstagramIcon />}
                />
            </div>
        </div>
    );
};