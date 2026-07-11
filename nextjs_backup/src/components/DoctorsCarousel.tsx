"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const DoctorsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const doctors = [
    {
      name: "Bs. CKI Ngọc Nữ",
      role: "Bác Sĩ CKI Da Liễu Thẩm Mỹ",
      image: "/images/Anh-dai-dien-Bac-si-Nu-1.png",
      bio: "Hơn 10 năm kinh nghiệm điều trị da liễu, trực tiếp tư vấn phác đồ và thực hiện cấy tinh chất Meso, trẻ hóa nâng cơ.",
    },
    {
      name: "Bs. CKI Nguyễn Thị Hảo",
      role: "Bác Sĩ CKI Thẩm Mỹ Nội Khoa",
      image: "/images/Anh-dai-dien-Bac-Si-Hao-1.png",
      bio: "Chuyên môn cao về kỹ thuật tiêm Filler/Botox tạo hình khuôn mặt, trẻ hóa xóa nhăn và trẻ hóa sinh học chuyên sâu.",
    },
    {
      name: "Bs. CKI Hồ Việt Trinh",
      role: "Bác Sĩ CKI Phẫu Thuật Thẩm Mỹ",
      image: "/images/559443567_122144185118677110_5751359661921085413_n-2-1.jpg",
      bio: "Chuyên gia cắt mí Double Eyeluxe, nâng mũi cấu trúc và tạo hình vi phẫu thẩm mỹ chuẩn tỷ lệ vàng.",
    },
    {
      name: "Ths. Bs. Nguyễn Vũ Huân",
      role: "Thạc Sĩ - Bác Sĩ Thẩm Mỹ Công Nghệ Cao",
      image: "/images/Ban-sao-BS-Huan-web-1-1-1-scaled-1.jpg",
      bio: "Trưởng khoa công nghệ cao, chuyên sâu điều trị nám, sẹo rỗ, tàn nhang bằng Laser thế hệ mới.",
    },
    {
      name: "Ths. Bs. CKI Hoàng Nga",
      role: "Thạc Sĩ - Bác Sĩ CKI Phun Xăm Thẩm Mỹ",
      image: "/images/Anh-dai-dien-BS-Nga-Aurora-1.png",
      bio: "Hơn 8 năm giảng dạy và thực hiện kỹ nghệ phun thêu điêu khắc lông mày vi chạm đỉnh cao.",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? doctors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === doctors.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-20 px-4 md:px-[10%] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
            Đội Ngũ Bác Sĩ
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
            Đội Ngũ Chuyên Gia Làm Đẹp
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4 mb-6" />
          <p className="text-sm md:text-base text-gray-500 font-light">
            Các chuyên gia đầu ngành có nhiều năm kinh nghiệm, học tập và tu nghiệp tại nước ngoài. Trực tiếp thực hiện 100% ca thăm khám & điều trị.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="relative overflow-hidden px-1">
          {/* Card Wrapper View */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {/* For mobile view: 1 slide shows. For desktop we can render static grid or handle index carefully, but simple responsive layout makes it dynamic: */}
              {doctors.map((doc) => (
                <div
                  key={doc.name}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-light-bg rounded-lg p-6 md:p-12 border border-beige-bg"
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded overflow-hidden shadow-lg max-w-sm mx-auto">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info Panel */}
                  <div className="text-left flex flex-col justify-center">
                    <h3 className="text-2xl font-serif font-bold text-dark-bg mb-2">
                      {doc.name}
                    </h3>
                    <span className="text-gold uppercase tracking-wider text-xs md:text-sm font-semibold mb-4 block">
                      {doc.role}
                    </span>
                    <div className="w-10 h-[1.5px] bg-gold mb-6" />
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light mb-8">
                      {doc.bio}
                    </p>
                    <a
                      href="#consult"
                      className="bg-gold hover:bg-gold-dark text-white font-bold text-center py-3 rounded max-w-xs transition-colors duration-200"
                    >
                      Đặt Lịch Khám Trực Tiếp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-gold hover:text-white p-2 rounded-full shadow-md text-dark-bg z-30 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-gold hover:text-white p-2 rounded-full shadow-md text-dark-bg z-30 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {doctors.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "bg-gold w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
