"use client";
import { useRef, useEffect, useState } from "react";

export function useTilt(maxTiltDeg = 15, scale = 1.06) {
  const ref = useRef<HTMLElement | null>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = py * -maxTiltDeg;
      const ry = px * maxTiltDeg;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
      el.style.transformStyle = "preserve-3d";
      el.style.willChange = "transform";
    };
    const onEnter = () => setIsHover(true);
    const onLeave = () => {
      setIsHover(false);
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    };
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTiltDeg, scale]);

  return { ref, isHover } as const;
}
