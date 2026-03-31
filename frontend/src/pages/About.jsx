import { motion } from 'framer-motion';
import ParallaxSection, { ParallaxImage } from '../components/ParallaxSection';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <ParallaxSection distance={-40} className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tight">About the Department</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          The Department of Artificial Intelligence and Data Science at Ramco Institute of Technology, Rajapalayam is committed to excellence in teaching, research, and innovation.
        </p>
      </ParallaxSection>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <ParallaxSection distance={60} rotate={2} className="relative z-10">
          <ParallaxImage
            src="/rit.jpg"
            alt="Rajapalayam Campus"
            className="aspect-video rounded-2xl border border-gray-200 shadow-2xl"
          />
        </ParallaxSection>
        <ParallaxSection distance={-60} xDistance={-20} className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 uppercase">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            To be a center of excellence in Artificial Intelligence and Data Science, producing socially responsible professionals who can solve complex global challenges using state-of-the-art technologies.
          </p>
          <h2 className="text-3xl font-black text-gray-900 pt-4 uppercase">Our Mission</h2>
          <ul className="list-disc leading-relaxed text-gray-600 pl-5 space-y-3 font-medium">
            <li>Provide rigorous academic programs aligned with industry standards.</li>
            <li>Foster a culture of innovation, research, and entrepreneurship.</li>
            <li>Collaborate with tech leaders to impart forward-looking skills.</li>
          </ul>
        </ParallaxSection>
      </div>
    </div>
  );
}
