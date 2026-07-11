import React from "react";
import Image from "next/image";

export const MidCTA: React.FC = () => {
  return (
    <section className="relative w-full py-24 px-4 md:px-[10%] font-sans bg-black overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full opacity-60 z-1">
        <Image
          src="/images/558695653_122247947804080096_8755343274150816539_n-1.jpg"
          alt="KT Beauty Call to Action"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Dark Gold Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full text-left text-white grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2">
          {/* Eyebrow */}
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-3 block">
            Bắt đầu thay đổi ngay hôm nay
          </span>
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Sở Hữu Vẻ Đẹp Hoàn Mỹ <br />
            <span className="text-gold">Được Cá Nhân Hóa Riêng Cho Bạn</span>
          </h2>
        </div>
        <div className="flex lg:justify-end">
          <a
            href="#consult"
            className="bg-gold hover:bg-gold-dark text-white font-bold text-lg px-10 py-4 rounded transition-colors duration-300 shadow-xl"
          >
            Liên Hệ Tư Vấn Ngay
          </a>
        </div>
      </div>
    </section>
  );
};
