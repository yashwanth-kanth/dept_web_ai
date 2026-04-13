import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ParallaxSection from './components/ParallaxSection';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';


import { useQuery } from 'convex/react';
import { api } from '../../backend/convex/_generated/api';
import { ReactLenis } from 'lenis/react';

function App() {
  const configs = useQuery(api.siteConfig.getConfigs) || [];
  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;
  
  const customCss = getVal('global_custom_css', '');
  const siteTitle = getVal('global_site_title', 'AI & DS Department | RIT');
  const faviconUrl = getVal('global_favicon_url', '/rit-logo.png');

  // Dynamic Theme Colors
  const primaryColor = getVal('theme_primary_color', '#991B1B'); // Default maroon-900
  const accentColor = getVal('theme_accent_color', '#DC2626');  // Default red-600
  const navbarBg = getVal('header_bg_color', 'rgba(255, 255, 255, 0.9)');
  const footerBg = getVal('footer_bg_color', 'transparent');

  const themeVariables = `
    :root {
      --primary-color: ${primaryColor};
      --accent-color: ${accentColor};
      --navbar-bg: ${navbarBg};
      --footer-bg: ${footerBg};
    }
  `;

  React.useEffect(() => {
    document.title = siteTitle;
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = faviconUrl;
    }
  }, [siteTitle, faviconUrl]);

  return (
    <ReactLenis root>
      {/* Global Style Injection */}
      <style id="dynamic-theme">
        {themeVariables}
        {customCss}
      </style>
      
      <Router>
        <div className="flex flex-col min-h-screen relative bg-white">
            <Navbar />
            <main className="flex-grow pt-16 relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </Router>
    </ReactLenis>
  );
}

export default App;
