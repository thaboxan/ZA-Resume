"use client";
import { motion } from "framer-motion";
import { useTilt } from "lib/hooks/useTilt";

export type Icon3DProps = {
  children: React.ReactNode;
  className?: string;
  hoverTilt?: number;
  hoverScale?: number;
};

export const Icon3D = ({ children, className = "", hoverTilt = 20, hoverScale = 1.1 }: Icon3DProps) => {
  const { ref } = useTilt(hoverTilt, hoverScale);
  return (
    <motion.div
      ref={ref as any}
  className={`relative inline-flex items-center justify-center rounded-2xl bg-white/10 p-4 shadow-xl backdrop-blur-md ring-1 ring-white/20 dark:bg-white/5 dark:ring-white/10 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* inner shine */}
  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/25 to-transparent dark:from-white/10" style={{ transform: "translateZ(20px)" }} />
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};
