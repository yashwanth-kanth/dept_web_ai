import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import ParallaxSection, { 
  SkewScroll, 
  ScrollReveal, 
  Magnetic, 
  FloatingShape,
  MouseParallax 
} from '../components/ParallaxSection';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => {
    console.log("Contact Data Submitted:", data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      
      {/* Decorative Blobs */}
      <FloatingShape size={400} speed={0.3} top="-10%" left="70%" color="bg-redAccent/[0.02]" blur="blur-3xl" />
      <FloatingShape size={300} speed={0.5} top="60%" left="-10%" color="bg-gray-100/50" blur="blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Header and Info */}
          <div>
            <SkewScroll>
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-7xl md:text-8xl font-black text-black uppercase tracking-tighter leading-none"
              >
                Get In <br />
                <span className="text-redAccent">Touch</span>
              </motion.h1>
            </SkewScroll>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-xl text-gray-500 font-bold max-w-lg leading-tight uppercase tracking-tight"
            >
              We're here to help you navigate the future of Intelligence. Reach out to our department for any queries.
            </motion.p>

            <div className="mt-16 space-y-12">
              <ScrollReveal delay={0.4}>
                <div className="group flex items-start gap-6">
                  <div className="w-12 h-12 bg-redAccent/10 rounded-2xl flex items-center justify-center text-redAccent shrink-0 group-hover:bg-redAccent group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Location</h3>
                    <p className="text-lg font-bold text-gray-900 leading-tight">North Venganallur, Rajapalayam, <br />Tamil Nadu 626117</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="group flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-redAccent group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Phone</h3>
                    <p className="text-lg font-bold text-gray-900 leading-tight">+91 90036 55855</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="group flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-redAccent group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Email</h3>
                    <p className="text-lg font-bold text-gray-900 leading-tight">aids@ritrjpm.ac.in</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <MouseParallax factor={10}>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 relative z-10 overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000">
                  <Send size={150} className="text-redAccent" />
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Success!</h3>
                    <p className="text-gray-500 font-bold uppercase tracking-tight">Your message has been logged into our records.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Name</label>
                        <input
                          {...register("name")}
                          className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-100 focus:border-redAccent'} rounded-2xl py-4 px-6 text-gray-900 focus:outline-none transition-all placeholder:text-gray-300 font-bold`}
                          placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest ml-2">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email</label>
                        <input
                          {...register("email")}
                          className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100 focus:border-redAccent'} rounded-2xl py-4 px-6 text-gray-900 focus:outline-none transition-all placeholder:text-gray-300 font-bold`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest ml-2">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Subject</label>
                      <input
                        {...register("subject")}
                        className={`w-full bg-gray-50 border ${errors.subject ? 'border-red-500' : 'border-gray-100 focus:border-redAccent'} rounded-2xl py-4 px-6 text-gray-900 focus:outline-none transition-all placeholder:text-gray-300 font-bold`}
                        placeholder="What's this about?"
                      />
                      {errors.subject && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest ml-2">{errors.subject.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Message</label>
                      <textarea
                        {...register("message")}
                        rows="5"
                        className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-100 focus:border-redAccent'} rounded-2xl py-4 px-6 text-gray-900 focus:outline-none transition-all placeholder:text-gray-300 font-bold resize-none`}
                        placeholder="Type your message here..."
                      ></textarea>
                      {errors.message && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest ml-2">{errors.message.message}</p>}
                    </div>

                    <div className="pt-4">
                      <Magnetic distance={0.3}>
                        <button
                          type="submit"
                          className="w-full bg-black text-white hover:bg-redAccent font-black py-4 rounded-2xl transition-all shadow-xl shadow-black/10 uppercase tracking-widest text-xs flex items-center justify-center gap-3 overflow-hidden group/btn"
                        >
                          <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          Initialize Connection
                        </button>
                      </Magnetic>
                    </div>
                  </form>
                )}
              </div>
            </MouseParallax>
          </div>
        </div>
      </div>
    </div>
  );
}
