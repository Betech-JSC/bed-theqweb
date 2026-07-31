import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";

interface CardItem {
  index: number;
  title: string;
  desc: string;
  image: string;
}

export const WhyChooseUs: React.FC = () => {
  const { props } = usePage() as any;
  const settings = props.settings || {};

  const cards: CardItem[] = [
    {
      index: 1,
      title: settings.why_choose_us_1_title || "Tiêu chuẩn Úc Châu",
      desc: settings.why_choose_us_1_desc || "Các quy trình chăm sóc sắc đẹp tại KT Beauty Medical Centre tuân thủ theo tiêu chuẩn thẩm mỹ nghiêm ngặt của Úc Châu, đảm bảo an toàn và hiệu quả cho khách hàng",
      image: settings.why_choose_us_1_image || "/images/why-choose-us/banner-web-5-1.png",
    },
    {
      index: 2,
      title: settings.why_choose_us_2_title || "Tư vấn cá nhân hóa",
      desc: settings.why_choose_us_2_desc || "Mỗi khách hàng đều có nét đẹp riêng biệt. KT Beauty Medical Centre luôn lắng nghe và đưa ra những lời khuyên tốt nhất để tôn lên vẻ đẹp tự nhiên của từng người, đảm bảo mỗi kết quả đều được cá nhân hóa hoàn toàn",
      image: settings.why_choose_us_2_image || "/images/why-choose-us/banner-web-2-1.png",
    },
    {
      index: 3,
      title: settings.why_choose_us_3_title || "Chuyên môn cao",
      desc: settings.why_choose_us_3_desc || "Quy tụ đội ngũ bác sĩ có chuyên môn cao, được đào tạo bài bản và chuyên sâu trong lĩnh vực thẩm mỹ, am hiểu sâu rộng, kinh nghiệm dày dặn và không ngừng cập nhật những phương pháp tiên tiến nhất",
      image: settings.why_choose_us_3_image || "/images/why-choose-us/banner-web-4-1.png",
    },
    {
      index: 4,
      title: settings.why_choose_us_4_title || "Công nghệ tiên tiến",
      desc: settings.why_choose_us_4_desc || "Ứng dụng công nghệ và kỹ thuật hiện đại, KT Beauty Medical Centre cung cấp nhiều phương án thẩm mỹ từ phẫu thuật đến không phẫu thuật với kết quả tự nhiên, giảm tối đa biến chứng, phù hợp nhu cầu và tình trạng cá nhân",
      image: settings.why_choose_us_4_image || "/images/why-choose-us/banner-web-3-1.png",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState<number[]>(new Array(cards.length).fill(0));
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const newProgress = cardRefs.current.map((card) => {
        if (!card) return 0;
        const rect = card.getBoundingClientRect();
        
        // Sticking point is set around top-32 (128px)
        const stickyTop = 128;
        const diff = stickyTop - rect.top;
        if (diff <= 0) return 0;
        
        const height = rect.height || 500;
        return Math.min(1, diff / height);
      });
      
      setScrollProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const getCardStyle = (index: number) => {
    if (!isDesktop) return {};
    if (index === cards.length - 1) return {};

    const nextProgress = scrollProgress[index + 1] || 0;
    
    // Smooth 3D Stacking depth transitions
    const scale = 1 - nextProgress * 0.04;
    const translateY = -nextProgress * 20;
    const opacity = 1 - nextProgress * 0.3;
    
    return {
      transform: `scale(${scale}) translateY(${translateY}px)`,
      opacity: opacity,
      transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
    };
  };

  return (
    <section 
      ref={containerRef}
      className="bg-[#fcfbf9] py-20 md:py-28 px-4 md:px-[10%] font-sans text-gray-800 border-t border-gray-150"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start relative">
        
        {/* Left Column - Sticky Content */}
        <div className="col-span-1 md:col-span-5 md:sticky md:top-32 flex flex-col justify-center md:h-[calc(100vh-240px)] gap-8 mb-12 md:mb-0">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 leading-tight mb-6">
              Tại sao khách hàng tin chọn
            </h2>
            <div className="w-16 h-[3px] bg-gold mb-6 rounded-full" />
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Mỗi hành trình đều bắt đầu từ một hoài bão, và hoài bão của chúng tôi chính là đánh thức vẻ đẹp tự nhiên trong mỗi khách hàng, để từ đó tạo nên một cuộc sống tràn đầy sự tự tin và niềm vui. KT Beauty Medical Centre không chỉ là nơi thực hiện các liệu trình thẩm mỹ, mà còn là một hành trình khám phá bản thân, nơi mà mỗi khách hàng bước vào với kỳ vọng và bước ra với một phiên bản hoàn thiện hơn của chính mình.
            </p>
          </div>
          <div>
            <a
              href="#footer"
              className="inline-flex items-center gap-3 bg-neutral-950 text-white px-8 py-4 rounded-[12px] font-medium tracking-wide transition-all duration-300 hover:bg-gold hover:text-neutral-950 hover:shadow-lg group"
            >
              Thay đổi diện mạo ngay
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" 
                viewBox="0 0 30.1 18.2" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M1 9.1h28M21.1 1.1l8 8-8 8" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column - Scrolling Cards */}
        <div className="col-span-1 md:col-span-7 space-y-8 md:space-y-[15vh] md:pb-[15vh]">
          {cards.map((card, idx) => (
            <div
              key={card.index}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={getCardStyle(idx)}
              className="relative md:sticky md:top-32 bg-white rounded-[24px] p-6 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.035)] border border-gray-100 flex flex-col gap-6 origin-top"
            >
              {/* Circular overlap number badge */}
              <div className="absolute -left-4 md:-left-5 top-6 md:top-10 w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center font-serif font-bold text-gray-800 shadow-md text-base z-10">
                {card.index}
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-[16px] aspect-[16/10] shadow-inner bg-gray-50 mt-2">
                <div className="w-full h-full overflow-hidden rounded-[12px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

