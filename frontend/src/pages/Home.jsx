import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Users, Building, Phone, GraduationCap, Monitor, Cloud, Database, Cpu, Activity, Laptop, ChevronRight } from 'lucide-react';
import ParallaxSection, { ParallaxImage, MouseParallax, Magnetic, HorizontalMarquee, ScrollReveal, VariableSpeedImage, SkewScroll, FloatingShape } from '../components/ParallaxSection';

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

export default function Home() {
  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 800], [0, 200]);
  const yHeroSubtext = useTransform(scrollY, [0, 800], [0, 100]);
  const yHeroBg = useTransform(scrollY, [0, 800], [0, 150]); // Adjusted parallax for BG
  const yAdmissionsBg = useTransform(scrollY, [200, 1200], [0, 250]);
  const yPlacementShape1 = useTransform(scrollY, [1000, 3000], [0, 300]);
  const yPartnerBg = useTransform(scrollY, [2000, 4000], [0, -300]);

  const images = [
    "/assets/hero/bg 1.jpg",
    "/assets/hero/bg 2.jpg",
    "/assets/hero/bg 3.jpg",
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Pre-load all images to ensure an "immediate" feel
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

  return (
    <div className="w-full bg-white overflow-hidden text-gray-900">

      {/* Hero Section - Redesigned Andy Hardy Style */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-4">

        {/* Background Image Loop */}
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
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={images[currentIdx]}
                alt="Background Story"
                className="w-full h-full object-cover grayscale"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/80" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Layered Background Marquee */}
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
              Welcome to <br />
              <span className="text-red-900">Artificial Intelligence and Data Science</span>
            </motion.h1>
          </SkewScroll>

          <div className="flex flex-col md:flex-row items-end justify-between mt-6 gap-8">
            <motion.p
              style={{ y: yHeroSubtext }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-base md:text-lg text-gray-900 max-w-lg font-bold leading-normal"
            >
              Building the next generation of Intelligence for the future of global industry excellence.
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

        {/* Floating Decorative Blobs for Andy Hardy Feel */}
        <FloatingShape size={100} speed={0.8} top="20%" left="10%" color="bg-redAccent/[0.015]" />
        <FloatingShape size={80} speed={1.2} top="60%" left="80%" color="bg-gray-50/50" />
      </section>

      {/* NEW: Department Overview Section (text heavy, clean) */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <SkewScroll>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-none uppercase tracking-tighter mb-6">
                    The <span className="text-redAccent underline decoration-redAccent/20">Future</span> Is <br />
                    Already Here.
                  </h2>
                </SkewScroll>
              </div>
              <div className="text-base text-gray-500 font-medium leading-relaxed">
                <p className="mb-6">
                  At the forefront of the technological revolution, the Department of Artificial Intelligence and Data Science at RIT empowers students with cutting-edge analytical skills and ethical AI frameworks.
                </p>
                <div className="flex gap-4">
                  <Magnetic distance={0.2}>
                    <Link to="/about" className="text-redAccent font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                      Learn Our Story <ChevronRight size={14} />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        <FloatingShape size={150} speed={0.5} top="30%" left="50%" color="bg-redAccent/[0.005]" blur="blur-3xl" />
      </section>

      {/* Redesigned Admissions Section */}
      <section className="relative min-h-[50vh] flex items-center bg-redAccent overflow-hidden border-t-[8px] border-yellow-400">
        <VariableSpeedImage
          src="https://images.unsplash.com/photo-1523050853041-83ef097eef0d?auto=format&fit=crop&q=80&w=1200&h=800"
          className="absolute inset-0 w-full h-full opacity-10 grayscale"
          speed={0.1}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center gap-16">
          <ScrollReveal className="flex-1 hidden md:block">
            <div className="relative group">
              <div className="absolute -inset-4 bg-yellow-400/20 rounded-[2rem] blur-2xl group-hover:bg-yellow-400/30 transition-all duration-700" />
              <img
                src="/rit.jpg"
                alt="RIT Campus"
                className="relative w-[800px] h-[400px] object-cover rounded-[2rem] shadow-2xl border-4 border-white/20 hover:scale-[1.02] transition-transform duration-700 hover:rotate-1"
              />
            </div>
          </ScrollReveal>

          <div className="flex-1 text-center md:text-left">
            <SkewScroll>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8">
                Join our <br />
                <span className="text-yellow-400">Legacy</span>
              </h2>
            </SkewScroll>

            <div className="flex flex-wrap gap-4">
              <Magnetic distance={0.3}>
                <button className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-redAccent font-black text-base transition-all shadow-lg uppercase tracking-tighter">
                  Call: 9003655855
                </button>
              </Magnetic>
              <Magnetic distance={0.3}>
                <a
                  href="https://www.ritrjpm.ac.in/onlineapplication/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-redAccent rounded-full hover:bg-yellow-400 hover:text-redAccent font-black text-base transition-all shadow-lg uppercase tracking-tighter"
                >
                  Apply Now
                </a>
              </Magnetic>
            </div>
          </div>

          <ScrollReveal className="flex-1 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-[1.5rem] shadow-xl">
            <div className="flex items-center gap-3 text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tighter">
              <GraduationCap className="text-yellow-400" size={32} />
              17+ Scholarships
            </div>
            <p className="text-base text-white/90 font-bold leading-tight">
              Merit-based scholarships, work-while-learn programs, and financial aid for deserving students.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Redesigned Quick Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {[
              { label: 'Enrolled Students', value: 500, suffix: '+', speed: 0.15, desc: "A vibrant community of future tech leaders." },
              { label: 'Global Research', value: 25, suffix: '+', speed: -0.1, desc: "Pioneering publications and AI patent filings." },
              { label: 'Innovation Labs', value: 5, suffix: '', speed: 0.2, desc: "State-of-the-art facilities for AI exploration." },
              { label: 'Placement Rate', value: 98, suffix: '%', speed: -0.05, desc: "Consistent excellence in career outcomes." },
            ].map((stat, i) => (
              <ParallaxSection key={i} distance={stat.speed * 120}>
                <div className="group border-gray-100 flex flex-col items-center text-center hover:border-redAccent transition-all duration-700">
                  <div className="text-5xl md:text-6xl font-black text-redAccent leading-none tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-700">
                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-base font-black text-gray-900 uppercase mb-2 tracking-tight">{stat.label}</h3>
                  <p className="text-xs text-gray-400 font-medium leading-tight">{stat.desc}</p>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned Placement Excellence Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <SkewScroll>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1] uppercase tracking-tighter mb-12 text-center">
              Placement <br />
              <span className="text-redAccent">Excellence</span>
            </h2>
          </SkewScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { icon: Trophy, value: 8, suffix: " LPA", title: "Average Package", speed: 30, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&h=400" },
              { icon: Users, value: 86, suffix: "%", title: "Placement Rate", speed: -30, img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=600&h=400" },
              { icon: Building, value: 360, suffix: "+", title: "Company Partners", speed: 40, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=400" }
            ].map((stat, i) => (
              <ParallaxSection key={i} distance={stat.speed}>
                <div className="bg-white rounded-[1.5rem] p-6 shadow-lg flex flex-col items-center text-center group h-full">
                  <div className="w-full h-40 overflow-hidden rounded-[1rem] mb-6">
                    <VariableSpeedImage src={stat.img} className="w-full h-full" speed={0.05} />
                  </div>
                  <div className="w-12 h-12 bg-redAccent rounded-full flex justify-center items-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-4xl font-black text-redAccent tracking-tighter mb-1">
                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{stat.title}</h3>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned Corporate Partners Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <SkewScroll>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1] uppercase tracking-tighter">
                Innovation <br />
                <span className="text-redAccent">Partners</span>
              </h2>
            </SkewScroll>
            <p className="text-base text-gray-400 font-bold max-w-md leading-tight">
              Strategic collaborations with global industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, name: "DIGISPOT", tags: ["SOFTWARE", "PLACEMENTS"], img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=600&h=400" },
              { icon: Activity, name: "ICANIO", tags: ["MENTORSHIP", "CAREERS"], img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=400" },
              { icon: Building, name: "RAMCO CEMENTS", tags: ["CORE INDUSTRY", "ANALYTICS"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400" },
            ].map((partner, i) => (
              <ScrollReveal key={i}>
                <div className="bg-gray-50 rounded-[1.5rem] overflow-hidden group border border-transparent hover:border-redAccent hover:bg-white transition-all duration-700 h-full flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="w-10 h-10 bg-redAccent rounded-lg flex items-center justify-center mb-4 shadow-sm transform -rotate-3 group-hover:rotate-0 transition-transform">
                      <partner.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter group-hover:text-redAccent transition-colors">{partner.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {partner.tags.map((tag, j) => (
                        <span key={j} className="bg-redAccent/10 text-redAccent border border-redAccent/20 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <VariableSpeedImage src={partner.img} className="w-full h-full" speed={0.02} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
