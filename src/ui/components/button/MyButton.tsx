/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Button, Theme, ButtonProps as MuiButtonProps } from "@mui/material";
import { withMyTheme } from "../../theme/theme";

const ButtonPrimaryStyle = withMyTheme((theme: Theme, additionalCss?: any) => css`
    font-size: 16px;
    padding: 10px 20px;
    font-weight: 500;
    
    &.MuiButton-outlined {
        border-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.main};
        &:hover {
            background-color: rgba(196, 85, 38, 0.04);
            border-color: ${theme.palette.primary.light};
        }
    }
    
    &.MuiButton-contained {
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
        &:hover {
            background-color: ${theme.palette.primary.light};
        }
    }
    
    ${additionalCss ? additionalCss(theme) : ''}
`)

const ButtonSecondaryStyle = withMyTheme((theme: Theme, additionalCss?: any) => css`
    font-size: 16px;
    padding: 10px 20px;
    font-weight: 500;
    
    &.MuiButton-outlined {
        border-color: ${theme.palette.secondary.main};
        color: ${theme.palette.secondary.main};
        &:hover {
            border-color: ${theme.palette.secondary.light};
        }
    }
    
    &.MuiButton-contained {
        background-color: ${theme.palette.secondary.main};
        color: ${theme.palette.secondary.contrastText};
        &:hover {
            background-color: ${theme.palette.secondary.light};
        }
    }
    
    ${additionalCss ? additionalCss(theme) : ''}
`)

// Extend the MUI ButtonProps to create our own props interface
interface MyButtonProps extends Omit<MuiButtonProps, 'css' | 'startIcon'> {
    colorVariant?: "primary" | "secondary";
    variant?: "outlined" | "text" | "contained";
    text: string;
    onClick?: () => void;
    additionalCss?: any;
    startIcon?: React.ReactNode;
    type?: "button" | "submit" | "reset"; // Explicitly define type for clarity
}

export const MyButton = ({
    text,
    colorVariant = 'primary',
    variant = 'outlined',
    onClick,
    additionalCss,
    startIcon,
    type = "button", // Default type is "button"
    ...props // Spread operator to capture all other props
}: MyButtonProps) => {
    const style = colorVariant === 'secondary' ? ButtonSecondaryStyle : ButtonPrimaryStyle;

    return (
        <Button
            css={(theme) => style(theme, additionalCss)}
            onClick={onClick}
            color={colorVariant}
            variant={variant}
            startIcon={startIcon}
            type={type}
            {...props}
        >
            {text}
        </Button>
    );
}