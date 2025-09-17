import { isMobile } from "../ui/theme/isMobile";

export const openUrl = (url: string) =>{
    if(isMobile()) {
        window.open(url);
    } else {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}