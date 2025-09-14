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
            primary: '#392C22',
            secondary: '#fff',
        },
    },
    typography: {
        fontFamily: "'Playfair Display'",
        h1: {
            fontFamily: "'Playfair Display'",
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

export const MOBILE_TITLE_FONT_SIZE = '8vw'
export const DESKTOP_TITLE_FONT_SIZE = '2.5vw'

export const MOBILE_CONTENT_PADDING = 'padding: 4vh 5vw 6vh 5vw;'
export const DESKTOP_CONTENT_PADDING = 'padding: 8vh 5vw;'