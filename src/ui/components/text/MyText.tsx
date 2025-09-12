/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { Theme, useTheme } from "@mui/material";
import { withMyTheme } from "../../theme/theme";
import { JSX } from "react";

const TextStyle = withMyTheme((theme: Theme, additionalCss: any) => css`
    color: ${theme.palette.text.primary};
    font-size: 20px;
    fontWeight: 400;
    font-family: ${theme.typography.body1.fontFamily};
    ${additionalCss ? additionalCss(theme) : ''}
`)

interface Props {
    text: string | JSX.Element,
    additionalCss?: any
}

export const MyText = ({ text, additionalCss }: Props) => {
    return <span css={(theme) => TextStyle(theme, additionalCss)}>
        {text}
    </span>
}