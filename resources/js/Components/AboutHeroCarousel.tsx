"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "@/Components/Image";

interface CardItem {
  image: string;
  hasQuote: boolean;
  quote?: string;
  author?: string;
}

interface RealResultItem {
  id: number;
  category: string;
  title: string;
  detail: string;
  image: string;
  is_video: boolean | number;
  order: number;
}

interface AboutHeroCarouselProps {
  eyebrow?: string;
  title?: string;
  realResults?: RealResultItem[];
}

export const AboutHeroCarousel: React.FC<AboutHeroCarouselProps> = ({ eyebrow, title, realResults = [] }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [translateX1, setTranslateX1] = useState(0);
  const [translateX2, setTranslateX2] = useState(0);

  const defaultRow1Cards: CardItem[] = [
    {
      image: "/images/Tuyen-Duong-1.png",
      hasQuote: false,
    },
    {
      image: "/images/625168557_122264581190080096_2304724374689571712_n-1.jpg",
      hasQuote: true,
      quote: "Điều dưỡng trân quý nhất tại KT Beauty là sự nhất quán trong chuyên môn và chăm sóc - từ thăm khám đến theo dõi sau liệu trình.",
      author: "Model TUYÊN DƯƠNG",
    },
    {
      image: "/images/627381223_122264581196080096_2191168211357172673_n-1.jpg",
      hasQuote: true,
      quote: "Vẻ đẹp bền vững bắt đầu từ sự thấu hiểu và phục hồi chuẩn y khoa từ bên trong. Cảm ơn KT Beauty đã đồng hành cùng Dương trên hành trình nâng tầm nhan sắc.",
      author: "Model TUYÊN DƯƠNG",
    },
    {
      image: "/images/626542132_122264581148080096_3645052413921176353_n-1.jpg",
      hasQuote: true,
      quote: "Đến với KT Beauty là một quyết định đúng đắn. Đội ngũ bác sĩ và kỹ thuật viên tận tâm, chu đáo giúp tôi hoàn toàn an tâm trong suốt liệu trình.",
      author: "Model MỸ NHÂN",
    },
    {
      image: "/images/626790861_122264581112080096_1324913742041224331_n-1.jpg",
      hasQuote: true,
      quote: "Không gian làm đẹp sang trọng, đẳng cấp cùng công nghệ tiên tiến khiến tôi cảm thấy thư giãn và hài lòng với kết quả đạt được.",
      author: "Cô MỸ DUYÊN",
    }
  ];

  const defaultRow2Cards: CardItem[] = [
    {
      image: "/images/Untitled-1.png",
      hasQuote: false,
    },
    {
      image: "/images/625385339_122264581316080096_6494403903634308287_n-1.jpg",
      hasQuote: true,
      quote: "Các bác sĩ tại KT Beauty luôn tư vấn rất kỹ lưỡng và đưa ra phác đồ chuyên biệt phù hợp nhất với da của tôi, hiệu quả thấy rõ sau từng buổi.",
      author: "Khách hàng KT BEAUTY",
    },
    {
      image: "/images/Untitled-2.png",
      hasQuote: false,
    },
    {
      image: "/images/Workshop-1.png",
      hasQuote: false,
    },
    {
      image: "/images/558695653_122247947804080096_8755343274150816539_n-1.jpg",
      hasQuote: false,
    }
  ];

  let row1Cards = defaultRow1Cards;
  let row2Cards = defaultRow2Cards;

  if (realResults && realResults.length > 0) {
    const dynamicCards: CardItem[] = realResults.map((r) => ({
      image: r.image || "/images/default-result.jpg",
      hasQuote: !!r.detail,
      quote: r.detail,
      author: r.title,
    }));

    let r1 = dynamicCards.filter((_, idx) => idx % 2 === 0);
    let r2 = dynamicCards.filter((_, idx) => idx % 2 !== 0);

    // Duplicate list items if count is small to avoid styling gaps on large displays
    if (r1.length > 0) {
      if (r1.length < 5) {
        const times = Math.ceil(5 / r1.length);
        r1 = Array(times).fill(r1).flat();
      }
      row1Cards = r1;
    }

    if (r2.length > 0) {
      if (r2.length < 5) {
        const times = Math.ceil(5 / r2.length);
        r2 = Array(times).fill(r2).flat();
      }
      row2Cards = r2;
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Chỉ chạy hiệu ứng khi section xuất hiện trong màn hình
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollRange = windowHeight + rect.height;
        const scrolledPast = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolledPast / scrollRange));

        // Biên độ dịch chuyển tối đa (khoảng 180px để thấy rõ sự khác biệt ngược chiều)
        const maxTranslate = 180;

        // Hàng 1 dịch qua PHẢI
        setTranslateX1((progress - 0.5) * maxTranslate);

        // Hàng 2 dịch qua TRÁI
        setTranslateX2((0.5 - progress) * maxTranslate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#faf8f5] text-gray-800 py-14 md:py-18 font-sans overflow-hidden border-b border-gray-150/40"
    >
      {/* Title block */}
      <div className="max-w-7xl mx-auto px-4 md:px-[10%] mb-10">
        <div className="text-center md:text-left space-y-2">
          <span className="text-gold uppercase tracking-widest text-[10px] md:text-xs font-semibold block">
            {eyebrow || "KT BEAUTY MEDICAL CENTRE"}
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-dark-bg tracking-wide">
            {title || "Kiến tạo - Vẻ đẹp độc bản"}
          </h2>
        </div>
      </div>

      {/* Two Parallax Rows Container */}
      <div className="flex flex-col gap-7 md:gap-9 relative w-full overflow-hidden">
        
        {/* ROW 1: Moves to the Right on scroll */}
        <div className="w-full overflow-hidden flex justify-center">
          <div
            className="flex gap-7 md:gap-14 transition-transform duration-300 ease-out will-change-transform shrink-0"
            style={{ transform: `translateX(${translateX1}px)` }}
          >
            {row1Cards.map((card, index) => (
              <div
                key={`row1-${index}`}
                className="min-w-[210px] w-[210px] md:min-w-[290px] md:w-[290px] aspect-[3/4] relative rounded-[24px] overflow-hidden border border-gold/15 shadow-xl group transition-all duration-300 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/5 shrink-0"
              >
                {/* Card Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={`Model Row 1 - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-2 md:inset-2.5 border border-white/20 pointer-events-none rounded-[18px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves to the Left on scroll */}
        <div className="w-full overflow-hidden flex justify-center">
          <div
            className="flex gap-7 md:gap-14 transition-transform duration-300 ease-out will-change-transform shrink-0"
            style={{ transform: `translateX(${-60 + translateX2}px)` }}
          >
            {row2Cards.map((card, index) => (
              <div
                key={`row2-${index}`}
                className="min-w-[210px] w-[210px] md:min-w-[290px] md:w-[290px] aspect-[3/4] relative rounded-[24px] overflow-hidden border border-gold/15 shadow-xl group transition-all duration-300 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/5 shrink-0"
              >
                {/* Card Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={`Model Row 2 - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-2 md:inset-2.5 border border-white/20 pointer-events-none rounded-[18px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
