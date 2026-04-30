import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import SocialSidebar from './components/SocialSidebar';
import ParallaxSection from './components/ParallaxSection';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from './lib/api';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SchoolProgramRegForm from './pages/SchoolProgramRegForm';

import { ReactLenis } from 'lenis/react';

function App() {
  const { data: configs = [] } = useQuery({
    queryKey: ['config'],
    queryFn: () => apiFetch.get('/api/config'),
  });

  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;

  const customCss = getVal('global_custom_css', '');
  const siteTitle = getVal('global_site_title', 'AI & DS Department | RIT');
  const faviconUrl = getVal('global_favicon_url', '/rit-logo.png');

  const primaryColor = getVal('theme_primary_color', '#991B1B');
  const accentColor = getVal('theme_accent_color', '#DC2626');
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
    if (link) link.href = faviconUrl;
  }, [siteTitle, faviconUrl]);

  return (
    <ReactLenis root>
      <style id="dynamic-theme">
        {themeVariables}
        {customCss}
      </style>

      <Router>
        <div className="flex flex-col min-h-screen relative bg-white">
            <Navbar />
            <main className="flex-grow md:pt-16 relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/school-program-reg" element={<SchoolProgramRegForm />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
            <SocialSidebar />
          </div>
        </Router>
    </ReactLenis>
  );
}

export default App;
