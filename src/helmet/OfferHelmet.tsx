import { Helmet } from 'react-helmet';

interface OfferHelmetProps {
    offerName: string;
    offerDescription: string;
    offerImage: string;
}

export const OfferHelmet = ({ offerName, offerDescription, offerImage }: OfferHelmetProps) => {
    const baseTitle = "Agata Sawicka - Makijażystka Gdynia";
    const fullTitle = `${offerName} | ${baseTitle}`;
    
    return <>
        {/* @ts-ignore */}
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={offerDescription} />
            <meta name="keywords" content={`${offerName.toLowerCase()}, makijażystka Gdynia, wizażystka Trójmiasto, makijaż Gdynia, makijaż ślubny, makijaż okolicznościowy, Gdynia, Sopot, Gdańsk`} />
            
            {/* OpenGraph tags */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={offerDescription} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:image" content={offerImage} />
            <meta property="og:site_name" content="Agata Sawicka Makeup Studio" />
            
            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={offerDescription} />
            <meta name="twitter:image" content={offerImage} />
            
            {/* Additional SEO tags */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={window.location.href} />
            <meta name="author" content="Agata Sawicka" />
            <meta name="geo.region" content="PL-PM" />
            <meta name="geo.placename" content="Gdynia" />
        </Helmet>
    </>
}