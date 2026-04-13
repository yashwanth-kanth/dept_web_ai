import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from '../auth-client';
import { Magnetic } from './ParallaxSection';
import { useQuery } from 'convex/react';
import { api } from '../../../backend/convex/_generated/api';

const resolveUrl = (val) => val;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const configs = useQuery(api.siteConfig.getConfigs) || [];

  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const defaultNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const rawLinks = getVal('navbar_links', '');
  let navLinks = defaultNavLinks;
  if (rawLinks) {
    try {
      navLinks = JSON.parse(rawLinks);
    } catch (e) {
      console.error("Invalid navbar_links JSON", e);
    }
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Magnetic distance={0.2}>
              <Link to="/" className="block">
                <img 
                  src={resolveUrl(getVal('header_logo', '/rit-logo.png'))} 
                  alt="Logo" 
                  className="h-[46px] w-auto object-contain drop-shadow-sm" 
                />
              </Link>
            </Magnetic>
            <div className="hidden sm:flex flex-col border-l-2 border-gray-300 pl-3">
              <span className="text-[17px] font-black text-gray-900 leading-tight uppercase tracking-tight">
                {getVal('header_title_main', 'Ramco Institute of Technology')}
              </span>
              <span className="text-[13px] font-black text-gray-700">
                {getVal('header_title_sub', 'An Autonomus Institution, Rajapalayam')}
              </span>
            </div>
            <div className="flex sm:hidden flex-col border-l-2 border-gray-300 pl-2">
              <span className="text-base font-black text-gray-900 leading-tight">RIT</span>
              <span className="text-xs font-bold text-redAccent leading-tight">AI & DS</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <Magnetic key={link.name} distance={0.2}>
                  <Link
                    to={link.path}
                    className="text-gray-700 hover:text-redAccent px-3 py-2 rounded-md text-sm font-bold transition-colors block"
                  >
                    {link.name}
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isPending ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full"></div>
            ) : session ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-[10px] font-black text-redAccent uppercase tracking-widest leading-none mb-1">Administrator</span>
                  <span className="text-sm font-bold text-gray-900 leading-none">{session.user.name.split(' ')[0]}</span>
                </div>
                <Link 
                  to="/admin/dashboard" 
                  className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter hover:bg-redAccent transition-colors shadow-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => await signOut()}
                  className="p-2 text-gray-400 hover:text-redAccent transition-colors"
                  title="Sign Out"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="bg-redAccent/10 text-redAccent border border-redAccent hover:bg-redAccent hover:text-white px-5 py-2 rounded-full text-sm font-bold transition"
              >
                Admin Login
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-redAccent inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-200 shadow-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-redAccent block px-3 py-2 rounded-md text-base font-bold"
              >
                {link.name}
              </Link>
            ))}
            {!isPending && session ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-800 hover:text-redAccent block px-3 py-2 rounded-md text-base font-bold"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={async () => { await signOut(); setIsOpen(false); }}
                  className="text-gray-800 hover:text-redAccent block w-full text-left px-3 py-2 rounded-md text-base font-bold border-t border-gray-100 mt-2 pt-2"
                >
                  Sign Out ({session.user.name})
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-redAccent block px-3 py-2 rounded-md text-base font-bold border-t border-gray-100 mt-2"
              >
                Admin Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-redAccent origin-left z-[60]"
        style={{ scaleX }}
      />
    </nav>
  );
}
