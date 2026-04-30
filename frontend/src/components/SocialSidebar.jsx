import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { Magnetic } from './ParallaxSection';

export default function SocialSidebar() {
  const project = {
    name: 'Code 2Day',
    url: 'https://code2day.ramcoad.com',
    color: 'from-red-800 to-red-950', 
    icon: <Code2 size={22} />
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100]">
      <Magnetic distance={0.4}>
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center group relative cursor-pointer"
          initial={{ x: 0 }}
        >
          {/* Main Container */}
          <div className={`flex items-center bg-gradient-to-r ${project.color} backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(153,27,27,0.3)] rounded-r-2xl overflow-hidden py-1 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(153,27,27,0.6)] group-hover:border-white/40`}>
            
            {/* Icon Container - ALWAYS VISIBLE */}
            <div className="w-12 h-12 flex items-center justify-center shrink-0 relative z-20">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              >
                {project.icon}
              </motion.div>
              {/* Pulsing background ring */}
              <div className="absolute inset-2 bg-white/20 rounded-full animate-ping opacity-30" />
            </div>

            {/* Expanding Text Area */}
            <motion.div 
              className="flex flex-col overflow-hidden max-w-0 group-hover:max-w-[240px] group-hover:pr-6 transition-all duration-500 ease-in-out"
            >
              <span className="whitespace-nowrap font-black uppercase tracking-[0.2em] text-[13px] text-white pl-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {project.name}
              </span>
              <span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.4em] text-red-300 pl-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                Explore Project
              </span>
            </motion.div>

            {/* Decorative shining line effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
          </div>

          {/* Indicator light on the edge */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-red-400 rounded-r-full shadow-[0_0_10px_rgba(248,113,113,1)] group-hover:opacity-0 transition-opacity" />
        </motion.a>
      </Magnetic>
    </div>
  );
}
