"use client";
import { useEffect, useRef } from "react";

export const Particles = ({ count = 40, className = "" }: { count?: number; className?: string }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      ctx.scale(DPR, DPR);
    }
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      o: 0.2 + Math.random() * 0.6,
    }));

    function render() {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0ea5e980"; // sky-500 softened
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(render);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    render();
    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [count]);

  return <canvas ref={ref} className={`absolute inset-0 -z-10 ${className}`} aria-hidden />;
};
