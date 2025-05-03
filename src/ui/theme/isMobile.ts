export const MOBILE_WIDTH = 700;

export const isMobile = () => {
    return window.innerWidth <= MOBILE_WIDTH;
}

export const mobileCss = (css: any) => `
    @media(max-width: ${MOBILE_WIDTH}px) {
        ${css}
    }
`