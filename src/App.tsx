import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lightTheme } from './ui/theme/theme';
import { ThemeProvider } from '@emotion/react';
import { AppContent } from './ui/AppContent';
import { OfferDetails } from './ui/landing/offers/OfferDetails';

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

  return (
    <ThemeProvider theme={lightTheme}>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
