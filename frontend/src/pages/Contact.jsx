import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

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
    // Simulated API call, since Django Contact backend was not explicitly modeled
    console.log("Contact Data Submitted:", data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-xl text-gray-400">
          Have questions? Get in touch with the AI & DS Department.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0d2d4c] rounded-2xl p-8 md:p-12 border border-blueAccent/30 shadow-[0_0_30px_rgba(0,212,255,0.1)]"
      >
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-gray-400">We will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  {...register("name")}
                  className={`w-full bg-navy border ${errors.name ? 'border-red-500' : 'border-gray-700 focus:border-blueAccent'} rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-blueAccent transition`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  {...register("email")}
                  className={`w-full bg-navy border ${errors.email ? 'border-red-500' : 'border-gray-700 focus:border-blueAccent'} rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-blueAccent transition`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input
                {...register("subject")}
                className={`w-full bg-navy border ${errors.subject ? 'border-red-500' : 'border-gray-700 focus:border-blueAccent'} rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-blueAccent transition`}
                placeholder="How can we help?"
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                {...register("message")}
                rows="5"
                className={`w-full bg-navy border ${errors.message ? 'border-red-500' : 'border-gray-700 focus:border-blueAccent'} rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-blueAccent transition`}
                placeholder="Your message here..."
              ></textarea>
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blueAccent hover:bg-white text-navy font-bold py-4 rounded-xl transition shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] mt-4"
            >
              Send Message
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
