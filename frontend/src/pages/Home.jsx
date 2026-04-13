import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Users, Building, GraduationCap, ChevronRight, Cpu, Activity, Laptop } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../backend/convex/_generated/api';
import ParallaxSection, { Magnetic, HorizontalMarquee, ScrollReveal, VariableSpeedImage, SkewScroll, FloatingShape } from '../components/ParallaxSection';

function AnimatedStat({ value, suffix, label, colorClass = "text-redAccent", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 0.5,
        ease: "easeOut",
        onUpdate(v) {
          setCount(Math.round(v));
        }
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}

const resolveUrl = (val) => val;

export default function Home() {
  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 800], [0, 200]);
  const yHeroSubtext = useTransform(scrollY, [0, 800], [0, 100]);
  const yHeroBg = useTransform(scrollY, [0, 800], [0, 150]);

  const images = [
    "/assets/hero/bg 1.jpg",
    "/assets/hero/bg 2.jpg",
    "/assets/hero/bg 3.jpg",
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const isFirstMount = useRef(true);

  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      isFirstMount.current = false;
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  // CMS Queries
  const configs = useQuery(api.siteConfig.getConfigs) || [];
  const partners = useQuery(api.partners.getAllPartners) || [];

  const getVal = (key, fallback) => configs.find(c => c.key === key)?.value || fallback;

  // Icon Mapper for Partners
  const IconMap = { Cpu, Activity, Building, Laptop, Users, Trophy };

  return (
    <div className="w-full bg-white overflow-hidden text-gray-900">

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-4">
        <div className="absolute inset-0 z-0 overflow-hidden bg-white">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIdx}
              style={{ y: yHeroBg }}
              initial={isFirstMount.current ? { opacity: 0.6, scale: 1.1 } : { opacity: 0, scale: 1.1 }}
              animate={{
                opacity: 0.6,
                scale: [1.1, 1.05],
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={images[currentIdx]}
                alt="Background"
                className="w-full h-full object-cover grayscale"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/80" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-[0.02] pointer-events-none select-none">
          <HorizontalMarquee speed={3} direction={1} className="text-[10vw] font-black uppercase leading-none text-redAccent">
            AI & DS • AI & DS • AI & DS •
          </HorizontalMarquee>
          <HorizontalMarquee speed={2} direction={-1} className="text-[10vw] font-black uppercase leading-none text-gray-900">
            Pioneering • Future • Pioneering •
          </HorizontalMarquee>
        </div>

        <motion.div style={{ y: yHeroText }} className="relative z-10 w-full max-w-5xl mx-auto">
          <SkewScroll>
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[1] uppercase tracking-tighter mb-4"
            >
              {getVal('hero_title_pre', "Welcome to")} <br />
              <span className="text-red-900">{getVal('hero_title_main', "Artificial Intelligence and Data Science")}</span>
            </motion.h1>
          </SkewScroll>

          <div className="flex flex-col md:flex-row items-end justify-between mt-6 gap-8">
            <motion.p
              style={{ y: yHeroSubtext }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-base md:text-lg text-gray-900 max-w-lg font-bold leading-normal uppercase tracking-tight"
            >
              {getVal('hero_subtitle', "Building the next generation of Intelligence for the future of global industry excellence.")}
            </motion.p>
            <div className="flex gap-4">
              <Magnetic distance={0.2}>
                <div className="w-20 h-20 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 p-4 text-center text-[9px] font-bold uppercase tracking-widest hover:border-redAccent hover:text-redAccent transition-colors">
                  Scroll To Explore
                </div>
              </Magnetic>
            </div>
          </div>
        </motion.div>

        <FloatingShape size={100} speed={0.8} top="20%" left="10%" color="bg-redAccent/[0.015]" />
        <FloatingShape size={80} speed={1.2} top="60%" left="80%" color="bg-gray-50/50" />
      </section>

      {/* Admissions / Legacy Section - Refactored for Split Screen */}
      <section className="relative min-h-[60vh] flex flex-col md:flex-row bg-redAccent overflow-hidden border-t-[8px] border-yellow-400">

        {/* Left Side: Fill Image */}
        <div className="w-full md:w-1/2 h-[400px] md:h-auto relative overflow-hidden">
          <ScrollReveal className="w-full h-full">
            <VariableSpeedImage
              src={resolveUrl(getVal('home_admissions_image', '/rit.jpg'))}
              alt="Admissions"
              className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
              speed={0.05}
            />
            {/* Overlay Gradient to blend with red */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-redAccent/20" />
          </ScrollReveal>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center relative z-10">
          <ScrollReveal direction="right">
            <SkewScroll>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.85] uppercase tracking-tighter mb-8">
                {getVal('home_admissions_title', "Join our Legacy")}
              </h2>
            </SkewScroll>

            <p className="text-lg text-white/80 font-bold mb-10 max-w-sm leading-tight uppercase tracking-tight">
              {getVal('home_admissions_text', "Empowering the next generation of AI pioneers through rigorous academic excellence and industry-aligned research.")}
            </p>

            <div className="flex flex-wrap gap-6 text-center md:text-left justify-center md:justify-start">
              <Magnetic distance={0.3}>
                <button className="px-10 py-5 border-2 border-white text-white rounded-full font-black text-sm uppercase tracking-tighter hover:bg-white hover:text-redAccent transition-all shadow-xl shadow-black/10">
                  Call:7010649554
                </button>
              </Magnetic>
              <Magnetic distance={0.3}>
                <a href="https://www.ritrjpm.ac.in/onlineapplication/" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white text-redAccent rounded-full font-black text-sm uppercase tracking-tighter hover:bg-yellow-400 transition-all shadow-xl">
                  Apply Now
                </a>
              </Magnetic>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-6 justify-center md:justify-start">
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                <GraduationCap className="text-yellow-400" size={32} />
              </div>
              <div>
                <h4 className="text-white font-black uppercase text-sm tracking-widest">Scholarships</h4>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-tight">Merit-based financial aid available.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {[
              { label: 'Enrolled Students', value: parseInt(getVal('students_enrolled', '500')), suffix: '+', desc: "A vibrant community." },
              { label: 'Global Research', value: parseInt(getVal('research_publications', '25')), suffix: '+', desc: "Pioneering publications." },
              { label: 'Innovation Labs', value: 5, suffix: '', desc: "State-of-the-art labs." },
              { label: 'Placement Rate', value: parseInt(getVal('placement_rate', '98')), suffix: '%', desc: "Excellence in outcomes." },
            ].map((stat, i) => (
              <ParallaxSection key={i} distance={50}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-6xl font-black text-redAccent leading-none tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-700">
                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-base font-black text-gray-900 uppercase mb-2 tracking-tight">{stat.label}</h3>
                  <p className="text-xs text-gray-400 font-medium leading-tight uppercase tracking-widest">{stat.desc}</p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Partners Cards */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <SkewScroll>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1] uppercase tracking-tighter">
                Innovation <br />
                <span className="text-redAccent">Partners</span>
              </h2>
            </SkewScroll>
            <p className="text-base text-gray-400 font-bold max-w-md leading-tight text-center md:text-left uppercase tracking-tight">
              Strategic collaborations with global industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.length > 0 ? partners.map((partner, i) => {
              const Icon = IconMap[partner.icon] || Cpu;
              return (
                <ScrollReveal key={i}>
                  <div className="bg-white rounded-[1.5rem] overflow-hidden group border border-transparent hover:border-redAccent hover:shadow-2xl transition-all duration-700 h-full flex flex-col shadow-sm">
                    <div className="p-6 flex-grow text-center md:text-left">
                      <div className="w-10 h-10 bg-redAccent rounded-lg flex items-center justify-center mb-4 shadow-sm transform -rotate-3 group-hover:rotate-0 transition-transform mx-auto md:mx-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter group-hover:text-redAccent transition-colors">{partner.name}</h3>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {partner.tags.map((tag, j) => (
                          <span key={j} className="bg-redAccent/10 text-redAccent border border-redAccent/20 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {partner.image && (
                      <div className="h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border-t border-gray-50">
                        <VariableSpeedImage src={resolveUrl(partner.image)} className="w-full h-full object-cover" speed={0.02} />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            }) : (
              <div className="col-span-3 py-20 border border-dashed border-gray-200 rounded-[3rem] text-center text-gray-300 font-black uppercase tracking-widest">
                No partners found in database.
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
