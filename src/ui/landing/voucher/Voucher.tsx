/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { withMyTheme, SMALL_ROUNDED_CORNER, MOBILE_TITLE_FONT_SIZE, DESKTOP_TITLE_FONT_SIZE, MOBILE_CONTENT_PADDING, DESKTOP_CONTENT_PADDING } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { Image } from '../../Images';

export const VOUCHER_ID = 'voucher';

const VoucherContainerStyle = withMyTheme((theme) => css`
    ${DESKTOP_CONTENT_PADDING}
    background-color: ${theme.palette.background.default};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    ${mobileCss(`
        ${MOBILE_CONTENT_PADDING}
    `)}
`);

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const VoucherTitleStyle = withMyTheme((theme, isVisible = false) => css`
    font-size: ${DESKTOP_TITLE_FONT_SIZE};
    font-weight: 600;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.h1.fontFamily};
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: translateY(${isVisible ? 0 : '30px'});
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    will-change: opacity, transform;

    ${mobileCss(`
        font-size: ${MOBILE_TITLE_FONT_SIZE};
    `)}
`);

const VoucherDescriptionStyle = withMyTheme((theme, isVisible = false) => css`
    color: ${theme.palette.text.primary};
    font-size: 1.6vw;
    line-height: 1.8;
    text-align: center;
    white-space: pre-line;
    font-family: ${theme.typography.body1.fontFamily};
    max-width: 60vw;
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: translateY(${isVisible ? 0 : '20px'});
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    transition-delay: 0.2s;
    will-change: opacity, transform;
    
    ${mobileCss(`
        font-size: 1rem;
        line-height: 1.6;
        max-width: 90vw;
        margin-bottom: 4vh;
    `)}
`);

const ImagesContainerStyle = withMyTheme((theme, isVisible = false) => css`
    display: flex;
    justify-content: center;
    gap: 3vw;
    margin-top: 2vh;
    width: 90vw;
    opacity: ${isVisible ? 1 : 0};
    transition: opacity 0.8s ease-out;
    transition-delay: 0.3s;
    
    ${mobileCss(`
        width: 50vw;
    `)}
`);

const FirstImageStyle = withMyTheme((theme, isVisible = false) => css`
    width: 25vw;
    height: auto;
    border-radius: ${SMALL_ROUNDED_CORNER};
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.8s ease-out;
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: ${isVisible ? 'translateY(-4px)' : 'translateX(-50px)'};
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, box-shadow 0.3s ease;
    transition-delay: 0.4s;
    will-change: opacity, transform;
    
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
        
        &:hover {
            transform: translateY(-4px) rotate(-5deg);
        }
    `)}
`);

const SecondImageStyle = withMyTheme((theme, isVisible = false) => css`
    width: 25vw;
    height: auto;
    border-radius: ${SMALL_ROUNDED_CORNER};
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.8s ease-out;
    
    /* Animation styles */
    opacity: ${isVisible ? 1 : 0};
    transform: ${isVisible ? 'translateY(-4px)' : 'translateX(50px)'};
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, box-shadow 0.3s ease;
    transition-delay: 0.6s;
    will-change: opacity, transform;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
    
    ${mobileCss(`
        width: 50vw;
        border: 3px solid ${theme.palette.primary.light};
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        
        transform: rotate(5deg);
        margin-left: -20vw;
        z-index: 2;
        
        &:hover {
            transform: translateY(-4px) rotate(5deg);
        }
    `)}
`);

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
    // Using react-intersection-observer hook for animations
    const { ref: sectionRef, inView } = useInView({
        threshold: 0.15,
        triggerOnce: true, // Only trigger once
        delay: 200 // Small delay to ensure smooth animation
    });
    const { t } = useTranslation();

    return (
        <div css={VoucherContainerStyle} id={VOUCHER_ID} ref={sectionRef}>
            <h2 css={(theme) => VoucherTitleStyle(theme, inView)}>
                {t('voucher.title')}
            </h2>
            <p css={(theme) => VoucherDescriptionStyle(theme, inView)}>
                {t('voucher.description')}
            </p>
            <div css={(theme) => ImagesContainerStyle(theme, inView)}>
                <img 
                    src={Image.VOUCHER_1} 
                    alt="Voucher 1" 
                    css={(theme) => FirstImageStyle(theme, inView)}
                />
                <img 
                    src={Image.VOUCHER_2} 
                    alt="Voucher 2" 
                    css={(theme) => SecondImageStyle(theme, inView)}
                />
            </div>
        </div>
    );
};
