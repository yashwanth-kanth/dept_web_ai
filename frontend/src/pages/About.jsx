import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../../backend/convex/_generated/api';
import ParallaxSection, { ScrollReveal, VariableSpeedImage, SkewScroll } from '../components/ParallaxSection';

const resolveUrl = (val) => val;

export default function About() {
  const configs = useQuery(api.siteConfig.getConfigs) || [];
  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Campus Image Section */}
        <ScrollReveal className="mb-24">
          <div className="relative rounded-[3rem] overflow-hidden group shadow-2xl border border-gray-100">
            <VariableSpeedImage 
              src={resolveUrl(getVal('about_campus_image', '/rit.jpg'))} 
              className="w-full h-[500px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" 
              speed={0.05} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
              <SkewScroll>
                <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter self-end leading-none">Our Campus</h1>
              </SkewScroll>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-20 items-start mb-32">
          <ScrollReveal direction="left">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
              Modern <br />
              <span className="text-redAccent text-5xl md:text-6xl">Intelligence</span>
            </h2>
            <p className="text-lg font-bold text-gray-500 uppercase tracking-tight leading-tight whitespace-pre-wrap">
              {getVal('about_story_text', "Founded with a vision to spearhead the data revolution, the Department of Artificial Intelligence and Data Science at Ramco Institute of Technology provides an immersive ecosystem for future engineers.")}
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            <ScrollReveal direction="right" delay={0.2}>
               <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all">
                  <h3 className="text-xs font-black text-redAccent uppercase tracking-widest mb-4">Our Vision</h3>
                  <p className="text-xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                    {getVal('vision_statement', "To emerge as a center of excellence in AI and DS by imparting tech-prowess and ethical values.")}
                  </p>
               </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
               <div className="p-10 bg-redAccent rounded-[2.5rem] border border-red-900 shadow-2xl shadow-redAccent/20">
                  <h3 className="text-xs font-black text-white/60 uppercase tracking-widest mb-4">Our Mission</h3>
                  <p className="text-xl font-black text-white leading-tight uppercase tracking-tighter">
                    {getVal('mission_statement', "To provide quality education, foster research, and produce globally competent professionals.")}
                  </p>
               </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </div>
  );
}
