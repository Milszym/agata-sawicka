/** @jsxImportSource @emotion/react */
import { css, TextField, Theme } from "@mui/material"
import { withMyTheme } from "../../theme/theme"

const InputStyle = withMyTheme((theme: Theme, additionalCss: any) => css`
    & .MuiInputLabel-root {
        font-family: ${theme.typography.body1.fontFamily};
        color: ${theme.palette.text.primary};
        font-size: 1.5rem;
    }
    ${additionalCss ? additionalCss(theme) : ''};
`)

interface Props {
    value: string
    label?: string
    placeholder?: string
    onChange: (value: string) => void
    multiline?: boolean
    additionalCss?: any
}

export const MyInput = ({ value, label, onChange, multiline, placeholder, additionalCss }: Props) => {
    return <TextField
        value={value}
        variant="outlined"
        label={label}
        placeholder={placeholder}
        multiline={multiline} 
        onChange={event => onChange(event.target.value)}
        css={(theme) => InputStyle(theme, additionalCss)}
    />
}