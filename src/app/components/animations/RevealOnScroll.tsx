"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export const RevealOnScroll = ({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
