/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { DESKTOP_CONTENT_PADDING, DESKTOP_TITLE_FONT_SIZE, MOBILE_CONTENT_PADDING, MOBILE_TITLE_FONT_SIZE, withMyTheme } from '../../theme/theme';
import { isMobile, mobileCss } from '../../theme/isMobile';
import { PortfolioDesktop } from './PortfolioDesktop';
import { PortfolioMobile } from './PortfolioMobile';
import { MyButton } from '../../components/button/MyButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import { INSTAGRAM_LINK } from '../footer/SocialMediaIcons';
import { openUrl } from '../../../util/openLink';

export const PORTFOLIO_ID = 'portfolio';

const PortfolioContainerStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.background.default};
    ${DESKTOP_CONTENT_PADDING}
    ${mobileCss(`
        ${MOBILE_CONTENT_PADDING}
        padding-left: 0;
        padding-right: 0;
    `)}
`);

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PortfolioTitleStyle = withMyTheme((theme, isVisible = false) => css`
    text-align: center;
    margin-bottom: 50px;
    color: ${theme.palette.text.primary};
    font-size: ${DESKTOP_TITLE_FONT_SIZE};
    font-weight: 600;
    font-family: ${theme.typography.h1.fontFamily};
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: translateY(${isVisible ? 0 : '30px'});
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    will-change: opacity, transform;

    ${mobileCss(`
        font-size: ${MOBILE_TITLE_FONT_SIZE};
    `)}
`);

const InstagramButtonStyle = withMyTheme((theme, isVisible = false) => css`
    margin-top: 2vh;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.2vw;

    ${mobileCss(`
        font-size: 1rem;
        margin-top: 4vh;
    `)}
`);

const ButtonContainerStyle = withMyTheme((theme, isVisible = false) => css`
    display: flex;
    justify-content: center;
    width: 100%;
    opacity: ${isVisible ? 1 : 0};
    transform: translateY(${isVisible ? 0 : '20px'});
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    transition-delay: 0.4s;
    will-change: opacity, transform;
`);

export const Portfolio = () => {
    // Using react-intersection-observer hook for animations
    const { ref: sectionRef, inView } = useInView({
        threshold: 0.15,
        triggerOnce: true, // Only trigger once
        delay: 200 // Small delay to ensure smooth animation
    });
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
        openUrl(INSTAGRAM_LINK)
    };

    return (
        <div css={PortfolioContainerStyle} id={PORTFOLIO_ID} ref={sectionRef}>
            <div css={(theme) => PortfolioTitleStyle(theme, inView)}>
                {t('portfolio.title')}
            </div>

            {isMobileView ? <PortfolioMobile /> : <PortfolioDesktop />}

            <div css={(theme) => ButtonContainerStyle(theme, inView)}>
                <MyButton
                    text={t('portfolio.see_more_on_instagram')}
                    onClick={handleInstagramClick}
                    variant="contained"
                    additionalCss={(theme) => InstagramButtonStyle(theme, inView)}
                    startIcon={<InstagramIcon />}
                />
            </div>
        </div>
    );
};