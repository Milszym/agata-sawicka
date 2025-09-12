/** @jsxImportSource @emotion/react */
import { Offers } from "./landing/offers/Offers"
import { Title } from "./landing/title/Title"
import { AboutMe } from "./landing/aboutMe/AboutMe"
import { Reviews } from "./landing/reviews/Reviews"
import { Portfolio } from "./landing/portfolio/Portfolio"
import { Contact } from "./landing/contact/Contact"
import { Footer } from "./landing/footer/Footer"

export const AppContent = () => {
    return <>
        {/* <LanguageSwitcher /> */}
        <Title />
        <AboutMe />
        <Offers />
        <Reviews />
        <Portfolio />
        <Contact />
        <Footer />
    </>
}