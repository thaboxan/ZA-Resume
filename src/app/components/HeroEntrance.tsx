"use client";
import { useEffect, useRef, useState } from "react";

export const HeroEntrance = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          // Hero section progress (0 to 1.5 screens)
          const heroProgress = Math.min(scrollY / (windowHeight * 1.5), 1);
          setScrollProgress(heroProgress);
          
          // Text section progress (1.5 to 3.5 screens)
          const textStart = windowHeight * 1.5;
          const textEnd = windowHeight * 3.5;
          const textScroll = Math.max(0, Math.min((scrollY - textStart) / (textEnd - textStart), 1));
          setTextProgress(textScroll);
          
          // Auto scroll to main content after text animation
          if (scrollY > windowHeight * 3.5) {
            const mainContent = document.querySelector('main');
            if (mainContent) {
              window.removeEventListener('scroll', handleScroll);
              mainContent.scrollIntoView({ behavior: 'smooth' });
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const text = "Build your professional resume with ease.";
  const words = text.split(' ');

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: "url('https://assets.codepen.io/204808/hobbiton.jpg')",
            filter: `blur(${3 - scrollProgress * 3}px) brightness(${1.5 - scrollProgress * 0.5})`,
            transform: `scale(${1 + scrollProgress * 0.1})`,
          }}
        />
        
        {/* Title */}
        <h1
          className="absolute left-1/2 top-1/2 z-[100] m-0 -translate-x-1/2 -translate-y-1/2 p-0 font-bold text-black will-change-transform"
          style={{
            fontSize: "clamp(3.125rem, 17.321vw + -1.357rem, 12.5rem)",
            lineHeight: "clamp(4.688rem, 21.363vw + -0.84rem, 16.25rem)",
            transform: `translate(-50%, -50%) scale(${0.5 + scrollProgress * 0.5})`,
            opacity: scrollProgress,
            filter: `blur(${10 - scrollProgress * 10}px)`,
          }}
        >
          CareerCraft
        </h1>
        
        {/* Cover Image */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-[2] h-screen w-screen overflow-hidden"
          style={{
            perspective: "500px",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(circle, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 90%)",
              opacity: 1 - scrollProgress,
            }}
          />
          <img
            className="pointer-events-none h-full w-full object-cover will-change-transform"
            src="https://assets.codepen.io/204808/hobbit-hole.png"
            alt="Hero entrance"
            style={{
              transform: `scale(${1 + scrollProgress}) translateZ(${scrollProgress * 350}px)`,
            }}
          />
        </div>
      </section>

      {/* Spacer for scroll */}
      <div className="h-[150vh]" />

      {/* Text Reveal Section */}
      <section
        ref={textSectionRef}
        className="sticky top-0 flex min-h-screen items-center justify-center bg-black text-white"
      >
        <div className="w-3/5 text-center text-4xl lg:text-7xl">
          {words.map((word, index) => {
            const wordProgress = Math.max(0, Math.min((textProgress * words.length) - index, 1));
            return (
              <span
                key={index}
                className="inline-block transition-all duration-300"
                style={{
                  opacity: 0.2 + wordProgress * 0.8,
                  transform: `scale(${0.95 + wordProgress * 0.05})`,
                  marginRight: index < words.length - 1 ? '0.25em' : '0',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </section>

      {/* Spacer for text scroll */}
      <div className="h-[200vh]" />


    </div>
  );
};
