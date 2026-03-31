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


import { ReactLenis } from 'lenis/react';

function App() {
  return (
    <ReactLenis root>
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
