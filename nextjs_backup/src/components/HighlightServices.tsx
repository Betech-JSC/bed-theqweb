"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./icons";

export const HighlightServices: React.FC = () => {
  const services = [
    {
      num: "01",
      title: "Phẫu thuật thẩm mỹ",
      desc: "Nâng mũi cấu trúc, Cắt mí Double Eyeluxe, Tạo hình môi trái tim chuẩn tỷ lệ vàng.",
      bg: "/images/Phau-Thuat-Tham-My2x-1.png",
      href: "/phau-thuat-tham-my",
    },
    {
      num: "02",
      title: "Da liễu thẩm mỹ",
      desc: "Điều trị mụn, sẹo rỗ công nghệ cao, nâng cơ trẻ hóa Ultherapy và cấy tinh chất Meso.",
      bg: "/images/da-lieu-tham-my2x-1.png",
      href: "#da-lieu",
    },
    {
      num: "03",
      title: "Phun xăm thẩm mỹ",
      desc: "Điêu khắc chân mày vi chạm, phun môi collagen phủ bóng, phun mí mở tròng tự nhiên.",
      bg: "/images/phun-xam-tham-my2x-1.png",
      href: "#phun-xam",
    },
  ];

  return (
    <section id="services" className="bg-white py-20 px-4 md:px-[10%] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
            Dịch Vụ Nổi Bật
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
            Đánh Thức Vẻ Đẹp Tiềm Ẩn
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4 mb-6" />
          <p className="text-sm md:text-base text-gray-500 font-light">
            Trải nghiệm dịch vụ đẳng cấp 5 sao với các phương pháp làm đẹp toàn diện từ nội khoa đến ngoại khoa.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative flex flex-col justify-end h-[420px] md:h-[480px] rounded-lg overflow-hidden p-6 md:p-8 shadow-lg cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full z-1">
                <Image
                  src={s.bg}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/95" />

              {/* Content Panel */}
              <div className="relative z-20 text-left transform group-hover:-translate-y-2 transition-transform duration-300">
                {/* Number */}
                <span className="text-gold/60 text-3xl font-bold font-serif mb-2 block">
                  {s.num}
                </span>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-300 mb-6 font-light leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
                  {s.desc}
                </p>

                {/* Learn More link */}
                <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-bold">
                  <span>Tìm hiểu ngay</span>
                  <ArrowIcon size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
