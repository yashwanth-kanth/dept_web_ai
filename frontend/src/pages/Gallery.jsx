import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from "convex/react";
import { api } from "../../../backend/convex/_generated/api.js";

export default function Gallery() {
  const allEvents = useQuery(api.events.getAllEvents);
  const loading = allEvents === undefined;
  const images = allEvents ? allEvents.filter(event => event.image) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Gallery</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Life at the Department of Artificial Intelligence & Data Science.
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-20 text-blueAccent">Loading gallery...</div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-video bg-[#0d2d4c] cursor-pointer"
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-lg font-bold text-white truncate">{event.title}</h3>
                <p className="text-sm text-blueAccent">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 border border-dashed border-gray-700 rounded-2xl">
          No event photos yet. Check back soon!
        </div>
      )}
    </div>
  );
}
