import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
}

/**
 * ScrollReveal: Reveals children with a subtle fade-in and slide-up effect
 * as they enter the viewport during scrolling, using Framer Motion (motion/react).
 * Respects user's prefers-reduced-motion system preference.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  yOffset = 24,
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier spring-like curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
