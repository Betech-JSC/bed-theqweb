"use client";

import React from "react";
import Image from "next/image";

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] min-h-[500px] flex items-center bg-black overflow-hidden font-sans">
      {/* Desktop Background Banner */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <Image
          src="/images/Ban-banner-web-3-1.png"
          alt="KT Beauty Banner Desktop"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Mobile Background Banner */}
      <div className="block md:hidden absolute inset-0 w-full h-full">
        <Image
          src="/images/size-4x5-phone-1-1.png"
          alt="KT Beauty Banner Mobile"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark & Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-3 block animate-fade-in">
            KT Beauty Medical Centre
          </span>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-4 text-white drop-shadow-md">
            Kiến tạo <br />
            <span className="text-gold font-medium">Vẻ đẹp độc bản</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm md:text-lg text-gray-200 mb-8 max-w-lg leading-relaxed font-light">
            KT Beauty Medical Centre mang đến dịch vụ thẩm mỹ chuẩn y khoa hàng đầu Việt Nam, giúp bạn tự tin sở hữu vẻ đẹp độc bản, chuẩn tự nhiên.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <a
              href="#consult"
              className="bg-gold hover:bg-gold-dark text-white font-bold text-center px-8 py-3.5 rounded transition-colors duration-300 shadow-lg"
            >
              Đăng Ký Tư Vấn
            </a>
            <a
              href="#services"
              className="bg-transparent border border-white hover:bg-white/10 text-white font-bold text-center px-8 py-3.5 rounded transition-colors duration-300"
            >
              Tìm Hiểu Dịch Vụ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
