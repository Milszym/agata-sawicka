/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from '../../theme/theme';
import { isMobile } from '../../theme/isMobile';
import { PortfolioDesktop } from './PortfolioDesktop';
import { PortfolioMobile } from './PortfolioMobile';

const PortfolioContainerStyle = withMyTheme((theme) => css`
    width: 100vw;
    margin-top: 5em;
    background-color: ${theme.palette.background.default};
    margin-bottom: 5em;
`);

const PortfolioTitleStyle = withMyTheme((theme) => css`
    text-align: center;
    margin-bottom: 50px;
    color: ${theme.palette.text.primary};
    font-size: 2.5rem;
    font-weight: 600;
    font-family: ${theme.typography.h1.fontFamily};
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

    return (
        <div css={PortfolioContainerStyle}>
            <div css={PortfolioTitleStyle}>
                {t('portfolio.title')}
            </div>
            
            {isMobileView ? <PortfolioMobile /> : <PortfolioDesktop />}
        </div>
    );
};