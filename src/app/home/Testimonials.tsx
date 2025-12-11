"use client";
import heartSrc from "public/assets/heart.svg";
import testimonialSpiegelSrc from "public/assets/testimonial-spiegel.jpg";
import testimonialSantiSrc from "public/assets/testimonial-santi.jpg";
import testimonialVivianSrc from "public/assets/testimonial-vivian.jpg";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    src: testimonialSpiegelSrc,
    quote:
      "Students often make silly mistakes on their resume by using inconsistent bullet points or font sizes. CareerCraft's auto format feature is a great help to ensure consistent format.",
    name: "Ms. Spiegel",
    title: "Educator",
  },
  {
    src: testimonialSantiSrc,
    quote:
      "I used CareerCraft during my last job search and was invited to interview at top tech companies such as Takealot, Capitec, and Discovery thanks to its slick yet professional resume design.",
    name: "Santi",
    title: "Software Engineer",
  },
  {
    src: testimonialVivianSrc,
    quote:
      "Creating a professional resume on CareerCraft is so smooth and easy! It saves me so much time and headache to not deal with google doc template.",
    name: "Vivian",
    title: "College Student",
  },
];

const ROTATION_INTERVAL_MS = 5000; // 5s

export const Testimonials = ({ children }: { children?: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      }, ROTATION_INTERVAL_MS);
      return () => clearInterval(intervalId);
    }
  }, [isHovered]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="mx-auto -mt-2 px-4 pb-24 lg:px-8">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
        <span className="inline-flex items-center gap-2">
          <span>People</span>
          <Image src={heartSrc} alt="love" className="inline-block w-7" />
          <span>CareerCraft</span>
        </span>
      </h2>
      
      <div className="relative mx-auto max-w-4xl">
        <div 
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative min-h-[320px] lg:min-h-[280px]">
            {TESTIMONIALS.map(({ src, quote, name, title }, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  idx === currentIndex 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : idx < currentIndex 
                    ? 'opacity-0 -translate-x-full scale-95' 
                    : 'opacity-0 translate-x-full scale-95'
                }`}
              >
                <figure className="mx-auto flex flex-col gap-6 p-8 lg:flex-row lg:p-10">
                  <div className="flex justify-center lg:block">
                    <Image
                      className="h-20 w-20 select-none rounded-full object-cover shadow-md lg:h-24 lg:w-24"
                      src={src}
                      alt="profile"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <blockquote className="relative">
                      <svg className="absolute -left-2 -top-2 h-8 w-8 text-gray-300" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                      </svg>
                      <p className="relative text-base leading-relaxed text-gray-700 lg:text-lg">
                        {quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-4">
                      <div className="flex-1">
                        <div className="text-lg font-bold text-gray-900">
                          {name}
                        </div>
                        <div className="text-sm text-gray-600">{title}</div>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gray-100 p-3 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 lg:left-6"
            aria-label="Previous testimonial"
          >
            <svg className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gray-100 p-3 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 lg:right-6"
            aria-label="Next testimonial"
          >
            <svg className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-3 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'w-12 bg-gray-900' : 'w-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      {children}
    </section>
  );
};
