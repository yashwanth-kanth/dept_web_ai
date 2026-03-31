import React, { useState } from 'react';
import { MessageSquareText, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[350px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center p-1 border border-gray-200">
                  <img src="/rit-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-semibold text-gray-800 text-base">New conversation</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition p-1"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 bg-white">
              <h4 className="text-[15px] font-semibold text-gray-800 mb-5 leading-snug">
                Please give us your information to support you better
              </h4>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Your Name <span className="text-gray-400">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Type your name" 
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-redAccent focus:ring-1 focus:ring-redAccent placeholder:text-gray-400 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Email address <span className="text-gray-400">*</span></label>
                  <input 
                    type="email" 
                    placeholder="Type email address" 
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-redAccent focus:ring-1 focus:ring-redAccent placeholder:text-gray-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Phone number <span className="text-gray-400">*</span></label>
                  <div className="flex gap-2">
                    <div className="relative border border-gray-200 rounded-lg flex items-center bg-white">
                      <select className="appearance-none bg-transparent pl-3 pr-8 py-2.5 text-sm focus:outline-none text-gray-800 cursor-pointer w-full h-full pb-2">
                        <option value="+91">+91</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 text-gray-500 pointer-events-none" />
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Type phone number" 
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-redAccent focus:ring-1 focus:ring-redAccent placeholder:text-gray-400 transition"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-redAccent hover:bg-red-800 text-white font-bold py-3 rounded-lg text-[15px] transition mt-2 mb-2"
                >
                  Let's chat!
                </button>
              </form>
            </div>


          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-50 group ${
          isOpen ? "bg-redAccent hover:bg-red-800 text-white" : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X size={28} className="transition-transform group-hover:rotate-90" />
        ) : (
          <MessageSquareText size={28} />
        )}
      </button>
    </>
  );
}
