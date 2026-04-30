import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import ParallaxSection, { SkewScroll, ScrollReveal, MouseParallax, FloatingShape } from '../components/ParallaxSection';

export default function Gallery() {
  const { data: allEvents, isLoading: loading } = useQuery({ queryKey: ['events'], queryFn: () => apiFetch.get('/api/events') });
  const { data: configs = [] } = useQuery({ queryKey: ['config'], queryFn: () => apiFetch.get('/api/config') });

  const dbImages = allEvents ? allEvents.filter(event => event.image) : [];
  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;

  return (
    <div className="relative bg-white min-h-screen overflow-x-hidden">
      <FloatingShape size={300} speed={0.4} top="15%" left="-5%" color="bg-redAccent/[0.02]" blur="blur-3xl" />
      <FloatingShape size={150} speed={0.8} top="60%" left="90%" color="bg-gray-100/40" blur="blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-64 relative z-10">
        <div className="mb-20">
          <SkewScroll>
            <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black text-black uppercase tracking-tighter leading-none">
              The <br /><span className="text-redAccent">Gallery</span>
            </motion.h1>
          </SkewScroll>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-8 text-xl text-gray-500 font-bold max-w-2xl leading-tight uppercase tracking-tight">
            {getVal('gallery_page_description', "Capturing the moments that define our journey in Artificial Intelligence and Data Science.")}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-redAccent"></div>
          </div>
        ) : dbImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {dbImages.map((event, index) => (
              <ScrollReveal key={event.id || index} delay={index * 0.05} className="break-inside-avoid">
                <MouseParallax factor={5}>
                  <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter leading-none mb-2">{event.title}</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </MouseParallax>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <span className="text-6xl mb-6 block opacity-20">📸</span>
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No department memories found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
