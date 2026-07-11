"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "./icons";

interface ResultItem {
  id: string;
  category: string;
  title: string;
  detail: string;
  image: string;
  isVideo?: boolean;
}

export const RealResults: React.FC = () => {
  const tabs = [
    { id: "eyeluxe", name: "KT Eyeluxe" },
    { id: "sylfirm", name: "Sylfirm X" },
    { id: "meso", name: "Cocktail Infusion" },
    { id: "pro-lift", name: "KT Pro-Lift" },
    { id: "hya", name: "Hya Reshape" },
  ];

  const [activeTab, setActiveTab] = useState("eyeluxe");

  const results: ResultItem[] = [
    {
      id: "eye1",
      category: "eyeluxe",
      title: "KT Eyeluxe - Cắt mí Double Eyeluxe",
      detail: "Khắc phục tình trạng sụp mí, mỡ thừa mắt cho đôi mắt hai mí tự nhiên rạng ngời.",
      image: "/images/EyeLuxe.jpg",
    },
    {
      id: "eye2",
      category: "eyeluxe",
      title: "KT Eyeluxe - Xóa thâm quầng bọng mắt",
      detail: "Tạo hình nếp mí đều đẹp, loại bỏ hoàn toàn bọng mắt thâm quầng mệt mỏi.",
      image: "/images/EyeLuxe-3.png",
      isVideo: true,
    },
    {
      id: "eye3",
      category: "eyeluxe",
      title: "KT Eyeluxe - Kiến tạo mí mắt sắc nét",
      detail: "Kết quả sau 30 phút thực hiện cắt mí kết hợp lấy mỡ mí mắt trên.",
      image: "/images/Eyeluxe-_7.png",
    },
    {
      id: "syl1",
      category: "sylfirm",
      title: "Sylfirm X - Điều trị sẹo rỗ chuyên sâu",
      detail: "Công nghệ kim vi sóng giúp lấp đầy sẹo rỗ, tái cấu trúc biểu bì da căng bóng mịn màng.",
      image: "/images/Celeb_Sylfirm.png",
    },
    {
      id: "meso1",
      category: "meso",
      title: "Cocktail Infusion - Cấy Meso căng bóng",
      detail: "Khắc phục làn da xỉn màu, cấp ẩm sâu tức thì giúp làn da mướt mịn như sương.",
      image: "/images/Celeb_Meso.png",
    },
    {
      id: "lift1",
      category: "pro-lift",
      title: "KT Pro-Lift - Nâng cơ trẻ hóa Profhilo",
      detail: "Nâng cơ xóa nhăn, phục hồi độ đàn hồi săn chắc và thon gọn đường viền hàm.",
      image: "/images/Celeb_Pro-Lift.png",
    },
    {
      id: "lift2",
      category: "pro-lift",
      title: "KT Pro-Lift - Trẻ hóa vùng má & rãnh cười",
      detail: "Làm đầy rãnh cười sâu và nâng đỡ các vùng cơ chảy xệ hiệu quả.",
      image: "/images/Pro-Lift.png",
      isVideo: true,
    },
    {
      id: "hya1",
      category: "hya",
      title: "Hya Reshape - Tiêm filler tạo hình",
      detail: "Tạo hình cằm V-line, nâng cao sống mũi tự nhiên không phẫu thuật.",
      image: "/images/Hya-4.png",
    },
  ];

  const filteredResults = results.filter((item) => item.category === activeTab);

  return (
    <section className="bg-light-bg py-20 px-4 md:px-[10%] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
            Kết Quả Thực Tế
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
            Kiến Tạo - Vẻ Đẹp Độc Bản
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4 mb-6" />
          <p className="text-sm md:text-base text-gray-500 font-light">
            Minh chứng rõ nét nhất cho chất lượng dịch vụ tại KT Beauty. Hàng nghìn khách hàng đã thay đổi diện mạo thành công.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gold border-gold text-white shadow-md"
                  : "bg-white border-gold/30 hover:border-gold text-dark-bg hover:bg-gold/5"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Results Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden border border-beige-bg shadow-sm flex flex-col group hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image Container with Before/After tags */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />

                {/* Video Play Overlay */}
                {item.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
                    <div className="bg-white/95 text-gold p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                      <PlayIcon size={32} />
                    </div>
                  </div>
                )}

                {/* Left/Right Overlays */}
                <div className="absolute top-4 left-4 bg-black/60 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm z-20">
                  Trước
                </div>
                <div className="absolute top-4 right-4 bg-gold/90 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm z-20">
                  Sau
                </div>
              </div>

              {/* Description Details */}
              <div className="p-6 text-left flex flex-col flex-grow">
                <h3 className="text-lg font-serif font-bold text-dark-bg mb-2 group-hover:text-gold transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
