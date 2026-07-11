"use client";

import React, { useState, useEffect } from "react";
import Image from "@/Components/Image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
}

interface DoctorsCarouselProps {
  doctors?: Doctor[];
}

export const DoctorsCarousel: React.FC<DoctorsCarouselProps> = ({ doctors = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultDoctors = [
    {
      id: 1,
      name: "Bs. CKI Ngọc Nữ",
      role: "Bác Sĩ CKI Da Liễu Thẩm Mỹ",
      image: "/images/Anh-dai-dien-Bac-si-Nu-1.png",
      bio: "Hơn 10 năm kinh nghiệm điều trị da liễu, trực tiếp tư vấn phác đồ và thực hiện cấy tinh chất Meso, trẻ hóa nâng cơ.",
      order: 0,
    },
    {
      id: 2,
      name: "Bs. CKI Nguyễn Thị Hảo",
      role: "Bác Sĩ CKI Thẩm Mỹ Nội Khoa",
      image: "/images/Anh-dai-dien-Bac-Si-Hao-1.png",
      bio: "Chuyên môn cao về kỹ thuật tiêm Filler/Botox tạo hình khuôn mặt, trẻ hóa xóa nhăn và trẻ hóa sinh học chuyên sâu.",
      order: 1,
    },
    {
      id: 3,
      name: "Bs. CKI Hồ Việt Trinh",
      role: "Bác Sĩ CKI Phẫu Thuật Thẩm Mỹ",
      image: "/images/559443567_122144185118677110_5751359661921085413_n-2-1.jpg",
      bio: "Chuyên gia cắt mí Double Eyeluxe, nâng mũi cấu trúc và tạo hình vi phẫu thẩm mỹ chuẩn tỷ lệ vàng.",
      order: 2,
    },
    {
      id: 4,
      name: "Ths. Bs. Nguyễn Vũ Huân",
      role: "Thạc Sĩ - Bác Sĩ Thẩm Mỹ Công Nghệ Cao",
      image: "/images/Ban-sao-BS-Huan-web-1-1-1-scaled-1.jpg",
      bio: "Trưởng khoa công nghệ cao, chuyên sâu điều trị nám, sẹo rỗ, tàn nhang bằng Laser thế hệ mới.",
      order: 3,
    },
    {
      id: 5,
      name: "Ths. Bs. CKI Hoàng Nga",
      role: "Thạc Sĩ - Bác Sĩ CKI Phun Xăm Thẩm Mỹ",
      image: "/images/Anh-dai-dien-BS-Nga-Aurora-1.png",
      bio: "Hơn 8 năm giảng dạy và thực hiện kỹ nghệ phun thêu điêu khắc lông mày vi chạm đỉnh cao.",
      order: 4,
    },
  ];

  const list = doctors.length > 0 ? doctors : defaultDoctors;
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // 6 seconds is a comfortable, slow speed
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, list.length]);

  return (
    <section className="bg-white py-16 px-4 md:px-[10%] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
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
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden max-w-5xl mx-auto px-6 md:px-12"
        >
          {/* Card Wrapper View */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {list.map((doc) => (
                <div
                  key={doc.name}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#faf8f5] rounded-2xl p-6 md:p-10 border border-gold/10"
                >
                  {/* Photo (5/12 cols) */}
                  <div className="col-span-12 md:col-span-5 relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-md max-w-[320px] mx-auto">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info Panel (7/12 cols) */}
                  <div className="col-span-12 md:col-span-7 text-left flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-2">
                      {doc.name}
                    </h3>
                    <span className="text-gold uppercase tracking-wider text-xs md:text-sm font-semibold mb-4 block">
                      {doc.role}
                    </span>
                    <div className="w-10 h-[1.5px] bg-gold mb-6" />
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed font-light mb-6">
                      {doc.bio}
                    </p>
                    <a
                      href="#consult"
                      className="bg-gold hover:bg-gold-dark text-white font-bold text-center py-3 px-8 rounded-lg text-xs md:text-sm max-w-xs transition-colors duration-200 shadow-sm"
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
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-gold hover:text-white p-2 rounded-full shadow-md text-dark-bg z-30 transition-all border border-gray-150"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-gold hover:text-white p-2 rounded-full shadow-md text-dark-bg z-30 transition-all border border-gray-150"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {list.map((_, idx) => (
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
