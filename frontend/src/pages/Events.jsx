import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Calendar, MapPin, Sparkles, Zap, Award, Users, X } from 'lucide-react';
import ParallaxSection, {
  VariableSpeedImage, MouseParallax, HorizontalMarquee, SkewScroll, ScrollReveal, FloatingShape, Magnetic
} from '../components/ParallaxSection';

export default function Events() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: allEvents = [] } = useQuery({ queryKey: ['events'], queryFn: () => apiFetch.get('/api/events') });
  const { data: events = [], isLoading: loading } = useQuery({
    queryKey: ['events', activeTab],
    queryFn: () => apiFetch.get(`/api/events?status=${activeTab}`),
  });

  const featuredEvents = allEvents.filter(e => e.isFeatured);

  return (
    <div className="relative bg-white min-h-screen">
      <FloatingShape size={300} speed={0.4} top="10%" left="-5%" color="bg-redAccent/[0.03]" blur="blur-3xl" />
      <FloatingShape size={200} speed={0.6} top="40%" left="85%" color="bg-gray-100/50" blur="blur-2xl" />

      <section className="relative pt-32 pb-20 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SkewScroll>
            <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-9xl font-black text-black leading-none uppercase tracking-tighter">
              Events <br /><span className="text-redAccent">& Workshops</span>
            </motion.h1>
          </SkewScroll>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-8 text-xl text-gray-400 font-bold max-w-2xl leading-tight uppercase tracking-tight">
            Empowering innovation through industry-aligned learning, competitive hackathons, and global technical showcases.
          </motion.p>
        </div>
        <div className="absolute top-1/2 left-0 w-full opacity-[0.02] pointer-events-none select-none">
          <HorizontalMarquee speed={2} direction={1} className="text-[20vw] font-black uppercase leading-none">INNOVATION • FUTURE • CREATIVITY •</HorizontalMarquee>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">College <br /><span className="text-redAccent">Highlights</span></h2>
            </ScrollReveal>
            <p className="text-gray-500 font-bold max-w-sm leading-tight uppercase text-xs tracking-widest">A curated look at the marquee events organized by our department.</p>
          </div>
          <div className="space-y-32">
            {featuredEvents.map((event, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
                <div className="flex-1 w-full">
                  <ParallaxSection distance={50} className="relative group">
                    <div className="absolute -inset-4 bg-gray-200/50 rounded-[2.5rem] scale-95 group-hover:scale-100 transition-transform duration-700" />
                    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2rem] shadow-2xl">
                      <VariableSpeedImage src={event.image} alt={event.title} className="w-full h-full" speed={0.05} contain={event.title.toLowerCase().includes('nexgen')} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </ParallaxSection>
                </div>
                <div className="flex-1 space-y-6">
                  <ScrollReveal>
                    <span className={`text-[10px] font-black tracking-[0.2em] px-3 py-1 bg-white border border-gray-100 rounded-full shadow-sm ${event.color || 'text-redAccent'}`}>{event.tag || 'EVENT'}</span>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mt-4">{event.title}</h3>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed mt-4">{event.description}</p>
                    <div className="pt-6">
                      {event.gallery && event.gallery.length > 0 ? (
                        <Magnetic distance={0.2}>
                          <button onClick={() => setSelectedEvent(event)} className="text-xs font-black uppercase tracking-widest text-redAccent flex items-center gap-2 group">
                            View Gallery <div className="w-8 h-[2px] bg-redAccent group-hover:w-12 transition-all" />
                          </button>
                        </Magnetic>
                      ) : (
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Gallery coming soon</span>
                      )}
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-12">
                Browse All <span className="text-redAccent">Events</span>
              </h2>
            </ScrollReveal>
            <div className="inline-flex bg-gray-100 p-1.5 rounded-full border border-gray-200">
              {['upcoming', 'past'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'bg-redAccent text-white shadow-lg' : 'text-gray-400 hover:text-gray-900'}`}>
                  {tab === 'upcoming' ? 'Upcoming' : 'Archived'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-redAccent"></div>
            </div>
          ) : events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence>
                {events.map((event, index) => (
                  <ScrollReveal key={event.id || index}>
                    <MouseParallax factor={10} className="h-full">
                      <div className="bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col h-full group hover:border-redAccent/20 hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-56 overflow-hidden">
                          {event.image ? (
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                          ) : (
                            <div className="w-full h-full bg-redAccent/10 flex items-center justify-center text-redAccent/20"><Sparkles size={48} /></div>
                          )}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
                            <span className="text-[10px] font-black text-redAccent flex items-center gap-1 uppercase tracking-widest">
                              <Calendar size={12} /> {new Date(event.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="p-8 flex-grow flex flex-col">
                          <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tighter group-hover:text-redAccent transition-colors">{event.title}</h3>
                          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-tight mb-4">
                            <MapPin size={14} className="text-redAccent" />{event.venue}
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{event.description}</p>
                          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-1.5">
                              <Users size={14} className="text-gray-300" />
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{event.rsvps_count || 0} RSVPs</span>
                            </div>
                            <Magnetic distance={0.5}>
                              <button className="bg-white border border-gray-200 p-2 rounded-full hover:bg-redAccent hover:border-redAccent hover:text-white transition-colors"><Zap size={16} /></button>
                            </Magnetic>
                          </div>
                        </div>
                      </div>
                    </MouseParallax>
                  </ScrollReveal>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <span className="text-5xl mb-6 block opacity-20">🔍</span>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No {activeTab} events found in records.</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedEvent(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
              <div className="p-10 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <span className="text-[10px] font-black text-redAccent uppercase tracking-[0.3em] mb-2 block">{selectedEvent.tag || 'Special Event'} Showcase</span>
                  <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">{selectedEvent.title}</h2>
                  <p className="text-gray-400 font-bold max-w-xl leading-snug uppercase text-sm tracking-tight">{selectedEvent.description}</p>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="p-4 rounded-full bg-gray-100 text-gray-900 hover:bg-redAccent hover:text-white transition-all shadow-sm hover:rotate-90 duration-500"><X size={24} /></button>
              </div>
              <div className="flex-grow overflow-y-auto p-10 bg-gray-50/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] flex-grow bg-gray-100" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Gallery • {selectedEvent.gallery?.length || 0} Images</span>
                  <div className="h-[1px] flex-grow bg-gray-100" />
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {selectedEvent.gallery?.map((img, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="break-inside-avoid">
                      <div className="group relative rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-700">
                        <img src={img} alt={`${selectedEvent.title} ${i + 1}`} className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-105" loading="lazy" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="p-10 border-t border-gray-100 bg-white flex flex-col items-center gap-4">
                <button onClick={() => setSelectedEvent(null)} className="px-16 py-5 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-redAccent transition-all shadow-2xl flex items-center gap-3 group">
                  Close Gallery <X size={14} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
