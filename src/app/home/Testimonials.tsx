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
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 lg:pb-24">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl lg:text-4xl">
        <span className="inline-flex items-center gap-2">
          <span>People</span>
          <Image src={heartSrc} alt="love" className="inline-block w-6 sm:w-7" />
          <span>CareerCraft</span>
        </span>
      </h2>
      
      <div className="relative mx-auto max-w-4xl">
        <div 
          className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative min-h-[380px] sm:min-h-[340px] lg:min-h-[280px]">
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
                <figure className="mx-auto flex flex-col gap-4 p-6 sm:gap-6 sm:p-8 lg:flex-row lg:p-10">
                  <div className="flex justify-center lg:block">
                    <Image
                      className="h-16 w-16 select-none rounded-full object-cover shadow-md sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                      src={src}
                      alt="profile"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <blockquote className="relative">
                      <svg className="absolute -left-2 -top-2 h-6 w-6 text-gray-300 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                      </svg>
                      <p className="relative text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                        {quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3 border-t border-gray-200 pt-4 sm:mt-6">
                      <div className="flex-1">
                        <div className="text-base font-bold text-gray-900 sm:text-lg">
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
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gray-100 p-2 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 sm:left-4 sm:p-3 lg:left-6"
            aria-label="Previous testimonial"
          >
            <svg className="h-4 w-4 text-gray-900 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gray-100 p-2 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 sm:right-4 sm:p-3 lg:right-6"
            aria-label="Next testimonial"
          >
            <svg className="h-4 w-4 text-gray-900 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex justify-center gap-2 sm:mt-8 sm:gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 sm:h-3 ${
                idx === currentIndex ? 'w-10 bg-gray-900 sm:w-12' : 'w-2.5 bg-gray-300 hover:bg-gray-400 sm:w-3'
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
