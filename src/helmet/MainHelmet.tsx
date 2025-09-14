import { Helmet } from 'react-helmet';

export const MainHelmet = () => {
    const websiteUrl = "https://www.agatasawickamakeup.pl";
    const mainImage = `${websiteUrl}/images/herobanner_mobile.jpg`;

    // Structured data for local business
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "name": "Agata Sawicka Makeup Studio",
        "image": mainImage,
        "description": "Profesjonalna makijażystka w Gdyni. Makijaż ślubny, okolicznościowy, oraz lekcje makijażu. Dojazd do klientki.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rdestowa 138a",
            "addressLocality": "Gdynia",
            "postalCode": "81-577",
            "addressCountry": "PL"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "54.4815",
            "longitude": "18.5006"
        },
        "url": websiteUrl,
        "telephone": "+48502403212",
        "priceRange": "$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            "opens": "09:00",
            "closes": "19:00"
        },
        "sameAs": [
            "https://www.instagram.com/agatasawickamakeup/",
            "https://booksy.com/pl-pl/214831_agata-sawicka-makeup-artist_makijaz_3_gdynia"
        ]
    };

    return <>
        {/* @ts-ignore */}
        <Helmet>
            {/* Basic Meta Tags */}
            <html lang="pl" />
            <title>Agata Sawicka - Profesjonalna Makijażystka Gdynia | Makijaż Ślubny i Okolicznościowy</title>
            <meta name="description" content="Profesjonalna makijażystka w Gdyni. Makijaż ślubny, okolicznościowy, oraz lekcje makijażu. Dojazd do klientki w Gdyni, Sopocie, Gdańsku i całej Polsce. Wieloletnie doświadczenie i indywidualne podejście." />
            <meta name="keywords" content="makijażystka Gdynia, wizażystka Trójmiasto, makijaż ślubny Gdynia, makijaż wieczorowy, kurs makijażu, lekcje makijażu, makijaż na wesele, makijaż z dojazdem, Gdynia, Sopot, Gdańsk, makijaż okolicznościowy, profesjonalny makijaż" />
            
            {/* OpenGraph Tags */}
            <meta property="og:title" content="Agata Sawicka - Profesjonalna Makijażystka w Gdyni" />
            <meta property="og:description" content="Profesjonalne makijaże i kursy w Trójmieście. Doświadczona makijażystka z dojazdem do klienta. Makijaż ślubny, okolicznościowy i lekcje makijażu." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={websiteUrl} />
            <meta property="og:image" content={mainImage} />
            <meta property="og:site_name" content="Agata Sawicka Makeup Studio" />
            <meta property="og:locale" content="pl_PL" />
            
            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Agata Sawicka - Profesjonalna Makijażystka w Gdyni" />
            <meta name="twitter:description" content="Profesjonalne makijaże i kursy w Trójmieście. Doświadczona makijażystka z dojazdem do klienta." />
            <meta name="twitter:image" content={mainImage} />
            
            {/* Additional SEO Tags */}
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
            <link rel="canonical" href={websiteUrl} />
            <meta name="author" content="Agata Sawicka" />
            <meta name="geo.region" content="PL-PM" />
            <meta name="geo.placename" content="Gdynia" />
            <meta name="geo.position" content="54.4645864;18.4578493" />
            <meta name="ICBM" content="54.4815, 18.5006" />

            {/* Mobile Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#E2D7D0" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>
        </Helmet>
    </>
}