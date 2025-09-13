import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lightTheme } from './ui/theme/theme';
import { ThemeProvider } from '@emotion/react';
import { AppContent } from './ui/AppContent';
import { OfferDetails } from './ui/landing/offers/OfferDetails';
import { AboutMePage } from './ui/landing/aboutMe/AboutMePage';

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set basename based on environment
  const basename = process.env.NODE_ENV === 'production' ? '/wordpress-test' : '';

  return <>

    <Helmet>
      <title>Agata Sawicka - Makijażystka Gdynia i Trójmiasto</title>
      <meta name="description" content="Profesjonalna makijażystka w Gdyni. Makijaż ślubny, okolicznościowy, oraz lekcje makijażu. Dojazd do klientki w Gdyni, Sopocie, Gdańsku i całej Polsce." />
      <meta name="keywords" content="makijażystka Gdynia, wizażystka Trójmiasto, makijaż ślubny Gdynia, makijaż wieczorowy, kurs makijażu, lekcje makijażu, makijaż na wesele, makijaż z dojazdem, Gdynia, Sopot, Gdańsk" />
      <meta property="og:title" content="Agata Sawicka - makijażystka w Gdyni" />
      <meta property="og:description" content="Profesjonalne makijaże i kursy w Trójmieście. Doświadczona makijażystka z dojazdem do klienta." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.agatasawickamakeup.pl" />
      <meta property="og:image" content="https://placehold.co/1200x630/E2D7D0/2E2A27?text=Agata+Sawicka+Makeup+Studio" />
    </Helmet>

    <ThemeProvider theme={lightTheme}>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/oferta/:id" element={<OfferDetails />} />
          <Route path="/poznajmy-sie" element={<AboutMePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </>;
};

export default App;
