/** @jsxImportSource @emotion/react */
import { css, TextField, Theme } from "@mui/material"
import { withMyTheme } from "../../theme/theme"

const InputStyle = withMyTheme((theme: Theme, additionalCss: any) => css`
    & .MuiInputLabel-root {
        font-family: ${theme.typography.body1.fontFamily};
        color: ${theme.palette.text.primary};
    }
    & .MuiInputLabel-root.Mui-focused {
        color: ${theme.palette.primary.contrastText};
    }
    ${additionalCss ? additionalCss(theme) : ''};
`)

interface Props {
    value: string
    label?: string
    placeholder?: string
    onChange: (value: string) => void
    onBlur?: () => void
    type?: string
    autocomplete?: string
    multiline?: boolean
    required?: boolean
    error?: boolean
    helperText?: string | false
    additionalCss?: any
}

export const MyInput = ({ 
    value, 
    label, 
    onChange, 
    onBlur,
    multiline, 
    placeholder, 
    additionalCss, 
    type, 
    autocomplete,
    required,
    error,
    helperText
}: Props) => {
    return <TextField
        value={value}
        variant="outlined"
        label={label}
        type={type}
        autoComplete={autocomplete}
        placeholder={placeholder}
        multiline={multiline} 
        onChange={event => onChange(event.target.value)}
        onBlur={onBlur}
        required={required}
        error={error}
        helperText={helperText}
        css={(theme) => InputStyle(theme, additionalCss)}
    />
}