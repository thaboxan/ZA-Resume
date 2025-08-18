"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = ({ className = "" }: { className?: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed left-0 top-0 z-40 h-1 origin-left bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-500 ${className}`}
    />
  );
};
