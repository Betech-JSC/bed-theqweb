"use client";

import React, { useState, useEffect } from "react";
import Image from "@/Components/Image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: number;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_desktop: string;
  image_mobile: string | null;
  button_primary_text: string | null;
  button_primary_url: string | null;
  button_secondary_text: string | null;
  button_secondary_url: string | null;
  order: number;
  is_active: boolean | number;
}

interface HeroProps {
  banners?: Banner[];
}

export const Hero: React.FC<HeroProps> = ({ banners = [] }) => {
  const defaultBanners: Banner[] = [
    {
      id: 0,
      eyebrow: "KT Beauty Medical Centre",
      title: "Kiến tạo",
      subtitle: "Vẻ đẹp độc bản",
      description: "KT Beauty Medical Centre mang đến dịch vụ thẩm mỹ chuẩn y khoa hàng đầu Việt Nam, giúp bạn tự tin sở hữu vẻ đẹp độc bản, chuẩn tự nhiên.",
      image_desktop: "/images/Ban-banner-web-3-1.png",
      image_mobile: "/images/size-4x5-phone-1-1.png",
      button_primary_text: "Đăng Ký Tư Vấn",
      button_primary_url: "#consult",
      button_secondary_text: "Tìm Hiểu Dịch Vụ",
      button_secondary_url: "#services",
      order: 0,
      is_active: true,
    }
  ];

  const slides = banners.length > 0 ? banners : defaultBanners;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const prevSlide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slide = slides[current];

  return (
    <section className="relative w-full h-[90vh] md:h-screen min-h-[650px] md:min-h-[800px] flex items-center bg-black overflow-hidden font-sans">
      {/* Slides Background Images with Smooth Sliding */}
      <div
        className="absolute inset-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <div key={s.id || idx} className="w-full h-full shrink-0 relative">
            {/* Desktop Background Banner */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
              <Image
                src={s.image_desktop}
                alt={s.title || "KT Beauty Banner Desktop"}
                fill
                className={`object-cover ${idx === current ? "animate-slow-zoom-out" : ""}`}
                priority={idx === 0}
              />
            </div>

            {/* Mobile Background Banner */}
            <div className="block md:hidden absolute inset-0 w-full h-full">
              <Image
                src={s.image_mobile || s.image_desktop}
                alt={s.title || "KT Beauty Banner Mobile"}
                fill
                className={`object-cover ${idx === current ? "animate-slow-zoom-out" : ""}`}
                priority={idx === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dark & Gold Gradient Overlay - Enhanced contrast for typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/95 z-10" />

      {/* Centered Content Container - Shifted down via pt-40 md:pt-56 */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 w-full text-white text-center pt-40 md:pt-56 pb-36">
        {slide.eyebrow && (
          <span
            className="text-gold uppercase tracking-[0.25em] text-xs md:text-sm font-semibold mb-6 block animate-fade-in"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            {slide.eyebrow}
          </span>
        )}

        {/* Heading */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif leading-[1.15] mb-6 text-white animate-fade-in tracking-wide"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.95)" }}
        >
          {slide.title}
          {slide.subtitle && (
            <span
              className="block text-gold font-light mt-3 text-3xl md:text-5xl lg:text-6xl font-serif"
              style={{ textShadow: "0 4px 15px rgba(0,0,0,0.9)" }}
            >
              {slide.subtitle}
            </span>
          )}
        </h1>

        {/* Subheading */}
        {slide.description && (
          <p
            className="text-sm md:text-lg text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in bg-black/15 backdrop-blur-[1px] px-6 py-3 rounded-xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
          >
            {slide.description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {slide.button_primary_text && (
            <a
              href={slide.button_primary_url || "#consult"}
              className="bg-gold hover:bg-gold-dark text-white font-bold text-center px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-gold/25 hover:-translate-y-0.5 shimmer-container text-sm uppercase tracking-wider min-w-[200px]"
            >
              {slide.button_primary_text}
            </a>
          )}
          {slide.button_secondary_text && (
            <a
              href={slide.button_secondary_url || "#services"}
              className="bg-white/10 hover:bg-white backdrop-blur-md border border-white/20 hover:text-black hover:border-white text-white font-bold text-center px-10 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm uppercase tracking-wider min-w-[200px]"
            >
              {slide.button_secondary_text}
            </a>
          )}
        </div>
      </div>

      {/* Manual Sliding Arrow Buttons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 text-white hover:bg-gold hover:text-white transition-all hover:scale-110 focus:outline-none backdrop-blur-sm shadow-lg border border-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 text-white hover:bg-gold hover:text-white transition-all hover:scale-110 focus:outline-none backdrop-blur-sm shadow-lg border border-white/10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Bottom Text Tabs Navigation (Horizontal Progress Bars) */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 to-transparent pt-10 pb-8 px-4">
          <div className="max-w-5xl mx-auto flex justify-center items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar">
            {slides.map((s, idx) => (
              <button
                key={s.id || idx}
                onClick={() => setCurrent(idx)}
                className="flex flex-col items-center min-w-[120px] md:min-w-[180px] focus:outline-none group cursor-pointer text-center"
              >
                <span className={`text-xs md:text-sm font-semibold tracking-wider transition-colors duration-300 mb-2 block whitespace-nowrap uppercase ${idx === current ? "text-gold" : "text-white/60 hover:text-white"
                  }`}>
                  {s.title || `Slide ${idx + 1}`}
                </span>

                {/* Horizontal Highlight Line */}
                <div className="w-full h-[2px] bg-white/15 relative rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-gold transition-all duration-500 ease-out ${idx === current ? "w-full" : "w-0 group-hover:w-1/4"
                      }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
