/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { Instagram, Facebook, Google } from '@mui/icons-material';
import { Image } from '../../Images';
import { SocialMediaIcons } from './SocialMediaIcons';

const SocialMediaSectionStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    ${mobileCss(`
        align-items: center;
    `)}
`);

const SocialMediaTitleStyle = withMyTheme((theme) => css`
    color: ${theme.palette.primary.contrastText};
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
    font-family: ${theme.typography.h1.fontFamily};
`);

export const SocialMediaSection = () => {
    const { t } = useTranslation();

    return (
        <div css={SocialMediaSectionStyle}>
            <h3 css={SocialMediaTitleStyle}>
                {t('footer.followUs')}
            </h3>
            <SocialMediaIcons />
        </div>
    );
};
