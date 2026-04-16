import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from '../auth-client';
import { Magnetic } from './ParallaxSection';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const { data: configs = [] } = useQuery({
    queryKey: ['config'],
    queryFn: () => apiFetch.get('/api/config'),
  });

  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
    try { navLinks = JSON.parse(rawLinks); } catch {}
  }

  return (
    <>
      {/* Desktop navbar — visible on md+ */}
      <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-3">
              <Magnetic distance={0.2}>
                <Link to="/" className="block">
                  <img src={getVal('header_logo', '/rit-logo.png')} alt="Logo" className="h-[46px] w-auto object-contain drop-shadow-sm" />
                </Link>
              </Magnetic>
              <div className="flex flex-col border-l-2 border-gray-300 pl-3">
                <span className="text-[17px] font-black text-gray-900 leading-tight uppercase tracking-tight">
                  {getVal('header_title_main', 'Ramco Institute of Technology')}
                </span>
                <span className="text-[13px] font-black text-gray-700">
                  {getVal('header_title_sub', 'An Autonomus Institution, Rajapalayam')}
                </span>
              </div>
            </div>
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <Magnetic key={link.name} distance={0.2}>
                  <Link to={link.path} className="text-gray-700 hover:text-redAccent px-3 py-2 rounded-md text-sm font-bold transition-colors block">
                    {link.name}
                  </Link>
                </Magnetic>
              ))}
            </div>
            <div className="flex items-center">
              {isPending ? (
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              ) : session ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-redAccent uppercase tracking-widest leading-none mb-1">Administrator</span>
                    <span className="text-sm font-bold text-gray-900 leading-none">{session.user.name.split(' ')[0]}</span>
                  </div>
                  <Link to="/admin/dashboard" className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter hover:bg-redAccent transition-colors shadow-sm">
                    Dashboard
                  </Link>
                  <button onClick={async () => await signOut()} className="p-2 text-gray-400 hover:text-redAccent transition-colors" title="Sign Out">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/admin" className="bg-redAccent/10 text-redAccent border border-redAccent hover:bg-redAccent hover:text-white px-5 py-2 rounded-full text-sm font-bold transition">
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-redAccent origin-left z-[60]" style={{ scaleX }} />
      </nav>

      {/* Mobile: floating hamburger button — always visible */}
      <div className="md:hidden fixed top-4 right-4 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-redAccent p-3 rounded-xl focus:outline-none"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile: full-screen overlay nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 z-50 bg-white flex flex-col"
        >
          {/* Overlay header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <img src={getVal('header_logo', '/rit-logo.png')} alt="Logo" className="h-10 w-auto object-contain" />
              <div className="flex flex-col border-l-2 border-gray-300 pl-3">
                <span className="text-sm font-black text-gray-900 leading-tight uppercase tracking-tight">RIT</span>
                <span className="text-xs font-bold text-redAccent leading-tight">AI & DS</span>
              </div>
            </Link>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-redAccent">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-2">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-2xl font-black text-gray-900 uppercase tracking-tight py-3 border-b border-gray-50 hover:text-redAccent transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth section at bottom */}
          <div className="px-6 py-6 border-t border-gray-100">
            {!isPending && session ? (
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged in as {session.user.name}</p>
                <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-center hover:bg-redAccent transition-colors">
                  Dashboard
                </Link>
                <button onClick={async () => { await signOut(); setIsOpen(false); }} className="block w-full text-center text-redAccent font-black text-sm uppercase tracking-widest py-2">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="block bg-redAccent text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-center">
                Admin Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
