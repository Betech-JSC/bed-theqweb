"use client";

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Image from "@/Components/Image";
import { PlayIcon } from "./icons";

interface ResultItem {
  id: number;
  category: string;
  title: string;
  detail: string;
  image: string;
  is_video?: boolean | number;
  isVideo?: boolean;
  video?: string | null;
}

interface RealResultsProps {
  results: ResultItem[];
}

export const RealResults: React.FC<RealResultsProps> = ({ results = [] }) => {
  const tabs = [
    { id: "eyeluxe", name: "Theq Eyeluxe" },
    { id: "sylfirm", name: "Sylfirm X" },
    { id: "meso", name: "Cocktail Infusion" },
    { id: "pro-lift", name: "Theq Pro-Lift" },
    { id: "hya", name: "Hya Reshape" },
  ];

  const [activeTab, setActiveTab] = useState("eyeluxe");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const filteredResults = results.filter((item) => item.category === activeTab);

  const getServiceLink = (category: string) => {
    switch (category.toLowerCase()) {
      case "eyeluxe":
        return "/dich-vu/cat-mi-double-eyeluxe";
      case "sylfirm":
        return "/dich-vu/dieu-tri-nam-laser-cong-nghe-cao";
      case "meso":
        return "/dich-vu/cay-tinh-chat-meso-cang-bong";
      case "pro-lift":
        return "/dich-vu/nang-co-tre-hoa-ultherapy";
      case "hya":
        return "/dich-vu/tiem-fillerbotox-tao-hinh";
      default:
        return "/dich-vu";
    }
  };

  return (
    <section className="bg-light-bg py-16 md:py-20 px-4 md:px-[10%] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
            Kết Quả Thực Tế
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
            Kiến Tạo - Vẻ Đẹp Độc Bản
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-3 mb-4" />
          <p className="text-sm md:text-base text-gray-500 font-light">
            Minh chứng rõ nét nhất cho chất lượng dịch vụ tại Theq. Hàng nghìn khách hàng đã thay đổi diện mạo thành công.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
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
        <div className="grid grid-cols-12 gap-8 min-h-[400px]">
          {filteredResults.map((item) => {
            const isVideoCard = !!(item.is_video && item.video);
            
            const cardContent = (
              <>
                {/* Image Container with Before/After tags */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100 p-1 bg-white">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Video Play Overlay */}
                  {(item.is_video || item.isVideo) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors z-10 rounded-xl m-1">
                      <div className="bg-white/95 text-gold p-3.5 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <PlayIcon size={32} />
                      </div>
                    </div>
                  )}

                  {/* Left/Right Overlays */}
                  <div className="absolute top-5 left-5 bg-black/60 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md z-20">
                    Trước
                  </div>
                  <div className="absolute top-5 right-5 bg-gold/90 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md z-20">
                    Sau
                  </div>
                </div>

                {/* Description Details */}
                <div className="p-6 text-left flex flex-col flex-grow">
                  <h3 className="text-lg font-serif font-bold text-dark-bg mb-2 group-hover:text-gold transition-colors duration-250">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </>
            );

            if (isVideoCard) {
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveVideo(item.video || null)}
                  className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl overflow-hidden border border-beige-bg/40 shadow-sm flex flex-col group hover:-translate-y-1.5 hover:shadow-md hover:border-gold/30 transition-all duration-300 cursor-pointer text-left"
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={getServiceLink(item.category)}
                className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl overflow-hidden border border-beige-bg/40 shadow-sm flex flex-col group hover:-translate-y-1.5 hover:shadow-md hover:border-gold/30 transition-all duration-300 cursor-pointer text-left"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/ket-qua"
            className="inline-block bg-white hover:bg-gold border border-gold text-gold hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-300 text-sm shadow-sm hover:shadow-gold/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Xem Thêm Kết Quả Khác
          </Link>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative bg-black rounded-2xl overflow-hidden max-w-4xl w-full aspect-video shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors z-30"
              onClick={() => setActiveVideo(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video 
              src={activeVideo} 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};
