export const TABLET_MIN_WIDTH = 701;
export const TABLET_MAX_WIDTH = 1024;

export const isTablet = () => {
    return window.innerWidth >= TABLET_MIN_WIDTH && window.innerWidth <= TABLET_MAX_WIDTH;
}

export const tabletCss = (css: any) => `
    @media(min-width: ${TABLET_MIN_WIDTH}px) and (max-width: ${TABLET_MAX_WIDTH}px) {
        ${css}
    }
`