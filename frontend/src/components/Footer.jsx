import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer 
      className="relative text-white py-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/footer_bg_faces.png')" }}
    >
      {/* Dark red translucent overlay for perfect text readability */}
      <div className="absolute inset-0 bg-red-950/85 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Logo and Name */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="bg-white rounded-full shadow-lg flex items-center justify-center w-20 h-20 shrink-0 overflow-hidden">
            <img 
              src="/rit-logo.png" 
              alt="RIT Logo" 
              className="w-14 h-14 object-contain" 
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase">
              Ramco Institute of Technology
            </h2>
            <p className="text-sm md:text-base font-light text-red-200 italic tracking-wider mt-1">
              Artificial Intelligence & Data Science
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-8 mb-10">
          <a href="https://www.linkedin.com/school/ramco-institute-of-technology/" target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.instagram.com/ramco_rajapalayam/" target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.facebook.com/RITRajapalayam/" target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.youtube.com/channel/UCsqlK0-FBItsGzjI9qYiP-g" target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors" aria-label="YouTube">
            <FaYoutube size={26} />
          </a>
        </div>

        {/* Address and Contact */}
        <div className="text-center mb-8 space-y-2 text-[15px] font-light text-red-100">
          <p>North Venganallur Village, Rajapalayam - 626 117</p>
          <p>
            Tamil Nadu, India <span className="mx-2 text-red-400">|</span> 
            +91 4563 233 400 <span className="mx-2 text-red-400">|</span> 
            info@ritrjpm.ac.in
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm font-light text-red-300/80">
          © {new Date().getFullYear()} Ramco Institute of Technology
        </div>
        
      </div>
    </footer>
  );
}
