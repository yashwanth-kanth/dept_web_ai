import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from 'framer-motion';

/**
 * Enhanced Parallax Section with multi-axis support.
 */
export default function ParallaxSection({ 
  distance = 100, 
  xDistance = 0,
  rotate = 0,
  scale = [1, 1],
  opacity = [1, 1],
  children, 
  className = "" 
}) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const x = useTransform(scrollYProgress, [0, 1], [-xDistance, xDistance]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  const s = useTransform(scrollYProgress, [0, 1], scale);
  const o = useTransform(scrollYProgress, [0, 1], opacity);

  return (
    <motion.div ref={ref} style={{ y, x, rotate: r, scale: s, opacity: o }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Mouse-tilt parallax for interactive components.
 */
export function MouseParallax({ children, className = "", factor = 15 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [factor, -factor]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-factor, factor]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax Background Image
 */
export function ParallaxImage({ src, alt, distance = "10%", className = "" }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}`, distance]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale: 1.2 }} 
        className="absolute inset-0 w-full h-full object-cover" 
      />
    </div>
  );
}

/**
 * Magnetic effect for buttons and icons.
 */
export function Magnetic({ children, distance = 0.5 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - (rect.left + width / 2);
    const mouseY = e.clientY - (rect.top + height / 2);
    x.set(mouseX * distance);
    y.set(mouseY * distance);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Horizontal Marquee that responds to vertical scroll.
 */
export function HorizontalMarquee({ children, direction = 1, speed = 1, className = "" }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [direction * 500 * speed, -direction * 500 * speed]);

  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x }} className="inline-block">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Scroll Reveal animation for sections.
 */
export function ScrollReveal({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image with variable parallax speed.
 */
export function VariableSpeedImage({ src, alt, speed = 0.2, className = "" }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-100 * speed}%`, `${100 * speed}%`]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale: 1.5 }} 
        className="absolute inset-0 w-full h-full object-cover" 
      />
    </div>
  );
}

/**
 * Text or element that skews slightly based on scroll.
 */
export function SkewScroll({ children, className = "" }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skew = useTransform(scrollVelocity, [-1000, 1000], [-5, 5]);
  const skewSpring = useSpring(skew, { stiffness: 400, damping: 90 });

  return (
    <motion.div style={{ skewX: skewSpring }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Decorative floating shapes for background depth.
 */
export function FloatingShape({ size = 100, color = "bg-redAccent/10", speed = 0.5, top = "0%", left = "0%", blur = "blur-xl" }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-200 * speed}px`, `${200 * speed}px`]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, top, left }}
      className={`absolute ${size >= 200 ? 'w-64 h-64' : 'w-32 h-32'} ${color} rounded-full ${blur} pointer-events-none z-0`}
    />
  );
}
