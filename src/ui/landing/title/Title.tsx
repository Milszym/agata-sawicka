/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from "react-i18next"
import { Fullscreen } from "../../components/Fullscreen"
import { MyButton } from "../../components/button/MyButton"
import { MyHeader } from "../../components/text/MyHeader"
import { Image } from "../../Images"
import { withMyTheme } from "../../theme/theme"
import { mobileCss } from '../../theme/isMobile';

const LogoStyle = withMyTheme(() => css`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 15vw;
    height: auto;
    z-index: 10;

    ${mobileCss(`
        width: 50vw;
        top: 15px;
        left: 15px;
    `)}
`);

const TitleContentStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`);

export const Title = () => {
    const { t } = useTranslation()

    return <Fullscreen additionalCss={() => css`position: relative;`}>
        <img 
            src={Image.LOGO} 
            alt="Agata Sawicka Logo" 
            css={LogoStyle}
        />
        <div css={TitleContentStyle}>
            <MyHeader text={t('title.title')} />
        </div>
    </Fullscreen>
}