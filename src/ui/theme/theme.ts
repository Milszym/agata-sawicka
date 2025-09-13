import { SerializedStyles } from "@emotion/react"
import { createTheme, Theme } from "@mui/material"

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#D6B98A',
            light: '#C4AC8E',
            dark: '#A07049',
            contrastText: '#fff',
        },
        secondary: {
            main: '#C8BBA9',
            light: '#D6B98A',
            dark: '#8DC3C9',
            contrastText: '#fff',
        },
        background: {
            default: '#F5EEE4',
            paper: '#fff',
        },
        text: {
            primary: '#000',
            secondary: '#fff',
        },
    },
    typography: {
        fontFamily: "'Playful Display'",
        h1: {
            fontFamily: "'Playful Display'",
        },
        body1: {
            fontFamily: "'Ysabeau'",
        },
    }
})

export const withMyTheme = <T extends (arg: any, additionalArg?: any) => any>(
    styleCreator: (theme: Theme, additionalArg?: any) => ReturnType<T>
) => {
    return (theme: any, additionalArg?: any) => styleCreator(theme as Theme, additionalArg) as SerializedStyles;
};

export const SMALL_ROUNDED_CORNER = '32px'