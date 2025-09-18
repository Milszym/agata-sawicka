/** @jsxImportSource @emotion/react */
import { Offers } from "./landing/offers/Offers"
import { OffersAlternative } from "./landing/offers/OffersAlternative"
import { Title } from "./landing/title/Title"
import { AboutMe } from "./landing/aboutMe/AboutMe"
import { Reviews } from "./landing/reviews/Reviews"
import { Portfolio } from "./landing/portfolio/Portfolio"
import { Voucher } from "./landing/voucher/Voucher"
import { Contact } from "./landing/contact/Contact"
import { Footer } from "./landing/footer/Footer"
import { Studio } from "./landing/studio/Studio"

export const AppContent = () => {
    return <>
        {/* <LanguageSwitcher /> */}
        <Title />
        <AboutMe />
        {/* <Offers /> */}
        <OffersAlternative />
        {/* <Studio /> */}
        <Portfolio />
        <Voucher />
        <Reviews />
        <Contact />
        <Footer />
    </>
}