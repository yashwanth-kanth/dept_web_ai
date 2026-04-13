import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api.js";
import ParallaxSection, { 
  SkewScroll, 
  ScrollReveal, 
  MouseParallax, 
  VariableSpeedImage,
  FloatingShape
} from '../components/ParallaxSection';

export default function Gallery() {
  const allEvents = useQuery(api.events.getAllEvents);
  const configs = useQuery(api.siteConfig.getConfigs) || [];
  const loading = allEvents === undefined;
  const images = allEvents ? allEvents.filter(event => event.image) : [];

  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;

  const resolveUrl = (val) => {
    if (!val) return null;
    if (val.startsWith('http')) return val;
    return `${import.meta.env.VITE_CONVEX_SITE_URL}/api/storage/${val}`;
  };

  return (
    <div className="relative bg-white min-h-screen">
      
      {/* Decorative Elements */}
      <FloatingShape size={300} speed={0.4} top="15%" left="-5%" color="bg-redAccent/[0.02]" blur="blur-3xl" />
      <FloatingShape size={150} speed={0.8} top="60%" left="90%" color="bg-gray-100/40" blur="blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="mb-20">
          <SkewScroll>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black text-black uppercase tracking-tighter leading-none"
            >
              The <br />
              <span className="text-redAccent">Gallery</span>
            </motion.h1>
          </SkewScroll>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xl text-gray-500 font-bold max-w-2xl leading-tight uppercase tracking-tight"
          >
            {getVal('gallery_page_description', "Capturing the moments that define our journey in Artificial Intelligence and Data Science.")}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-redAccent"></div>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((event, index) => (
              <ScrollReveal key={event.id || index} delay={index * 0.05}>
                <MouseParallax factor={15} className="h-full">
                  <div className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-gray-50 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <VariableSpeedImage 
                        src={resolveUrl(event.image)} 
                        alt={event.title} 
                        speed={0.03}
                        className="w-full h-full object-cover transition duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-10 p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                       <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-2">{event.title}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-redAccent uppercase tracking-widest">
                              {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                       </div>
                    </div>
                  </div>
                </MouseParallax>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Our visual highlights are being curated.</p>
          </div>
        )}
      </div>
    </div>
  );
}
