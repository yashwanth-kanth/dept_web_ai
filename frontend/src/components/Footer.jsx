import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useQuery } from 'convex/react';
import { api } from '../../../backend/convex/_generated/api';

const resolveUrl = (val) => val;

export default function Footer() {
  const configs = useQuery(api.siteConfig.getConfigs) || [];
  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;

  return (
    <footer 
      className="relative text-white py-16 bg-cover bg-center bg-no-repeat transition-all duration-1000"
      style={{ backgroundImage: `url('${resolveUrl(getVal('footer_bg_image', '/footer_bg_faces.png'))}')` }}
    >
      {/* Dark red translucent overlay for perfect text readability */}
      <div className="absolute inset-0 bg-red-950/85 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Logo and Name */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="bg-white rounded-full shadow-lg flex items-center justify-center w-20 h-20 shrink-0 overflow-hidden border-2 border-white/20">
            <img 
              src={resolveUrl(getVal('footer_logo', '/rit-logo.png'))} 
              alt="Logo" 
              className="w-14 h-14 object-contain" 
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase">
              {getVal('footer_title', 'Ramco Institute of Technology')}
            </h2>
            <p className="text-sm md:text-base font-light text-red-200 italic tracking-wider mt-1">
              {getVal('footer_subtitle', 'Artificial Intelligence & Data Science')}
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-8 mb-10">
          <a href={getVal('footer_linkedin_url', 'https://www.linkedin.com/school/ramco-institute-of-technology/')} target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href={getVal('footer_instagram_url', 'https://www.instagram.com/ramco_rajapalayam/')} target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href={getVal('footer_facebook_url', 'https://www.facebook.com/RITRajapalayam/')} target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href={getVal('footer_youtube_url', 'https://www.youtube.com/channel/UCsqlK0-FBItsGzjI9qYiP-g')} target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors" aria-label="YouTube">
            <FaYoutube size={26} />
          </a>
        </div>

        {/* Address and Contact */}
        <div className="text-center mb-8 space-y-2 text-[15px] font-light text-red-100 uppercase tracking-widest">
          <p>{getVal('footer_address', 'North Venganallur Village, Rajapalayam - 626 117')}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4">
            <span>{getVal('footer_location_extra', 'Tamil Nadu, India')}</span>
            <span className="hidden md:inline text-red-400">|</span> 
            <span>{getVal('contact_phone', '+91 4563 233 400')}</span>
            <span className="hidden md:inline text-red-400">|</span> 
            <span>{getVal('contact_email', 'info@ritrjpm.ac.in')}</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-[10px] font-black text-red-400/60 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} {getVal('footer_copyright_text', 'Ramco Institute of Technology')}
        </div>
        
      </div>
    </footer>
  );
}
