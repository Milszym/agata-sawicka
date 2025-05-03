/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { withMyTheme } from "../../theme/theme";
import { JSX } from "react";
import { mobileCss } from "../../theme/isMobile";

const HeaderStyle = withMyTheme((theme: Theme, additionalCss?: any) => css`
    color: ${theme.palette.primary.main};
    font-size: 52px;
    fontWeight: 700;
    text-align: center;
    max-width: 90%;
    font-family: ${theme.typography.h1.fontFamily};
    ${mobileCss(css`
        font-size: 5rem;
    `)}
    ${additionalCss ? additionalCss(theme) : ''}
`)

interface MyButtonProps {
    text: string | JSX.Element,
    additionalCss?: any
}

export const MyHeader = ({ text, additionalCss }: MyButtonProps) => {
    return <span css={(theme) => HeaderStyle(theme, additionalCss)}>
        {text}
    </span>
}