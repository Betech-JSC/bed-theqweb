import React from "react";
import Image from "@/Components/Image";
import { Link } from "@inertiajs/react";
import { ArrowIcon } from "./icons";

interface ServiceItem {
  id: number;
  name: string;
  category: string;
  price?: string | null;
  description?: string | null;
  image?: string | null;
  slug?: string | null;
  is_highlight?: boolean | number;
}

interface HighlightServicesProps {
  services: ServiceItem[];
}

export const HighlightServices: React.FC<HighlightServicesProps> = ({ services = [] }) => {
  // Filter for featured services
  let highlighted = services.filter((s) => s.is_highlight);

  // Fallback to the first 3 services if no highlights are selected
  if (highlighted.length === 0) {
    highlighted = services.slice(0, 3);
  }

  // Format to visual layout structure
  const items = highlighted.map((s, index) => {
    const num = String(index + 1).padStart(2, "0");
    const getLink = (slug: string | null | undefined) => {
      if (!slug) return "#consult";
      if (slug === "phau-thuat-tham-my" || slug === "cay-toc-y-khoa") {
        return `/${slug}`;
      }
      return `/dich-vu/${slug}`;
    };

    return {
      num,
      title: s.name,
      desc: s.description || "",
      bg: s.image || "/images/default-service.jpg",
      href: getLink(s.slug),
    };
  });

  // Calculate optimal even N multiplier so that total width is large enough to prevent gaps on all monitors
  const getMultiplier = (count: number) => {
    if (count === 0) return 2;
    const minN = Math.ceil(18 / count); // Target total width approx 6500px+
    const evenN = minN % 2 === 0 ? minN : minN + 1;
    return Math.max(2, evenN);
  };

  const displayItems = Array(getMultiplier(items.length)).fill(items).flat();  return (
    <section id="services" className="bg-white py-20 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-[10%]">
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
      </div>

      {/* Marquee Viewport Container */}
      <div className="w-full overflow-hidden marquee-pause-hover relative py-4 bg-gradient-to-b from-white via-gray-50/30 to-white">
        {/* Left/Right soft faded masks for extreme premium look */}
        <div className="absolute top-0 left-0 h-full w-16 md:w-36 bg-gradient-to-r from-white to-transparent z-30 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-16 md:w-36 bg-gradient-to-l from-white to-transparent z-30 pointer-events-none" />

        {/* Marquee Glide container */}
        <div className="flex animate-marquee-loop w-max">
          {displayItems.map((s, idx) => (
            <div
              key={`${s.title}-${idx}`}
              className="w-[280px] md:w-[360px] flex-shrink-0 px-3 md:px-4"
            >
              <Link
                href={s.href}
                className="group relative flex flex-col justify-end h-[420px] md:h-[480px] rounded-2xl overflow-hidden p-6 md:p-8 cursor-pointer border border-white/10 hover:border-gold/50 shadow-lg hover:shadow-[0_0_30px_rgba(176,154,122,0.25)] transition-all duration-500 ease-out shimmer-container block w-full"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                  <Image
                    src={s.bg}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Glassmorphic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />

                {/* Dynamic border decoration */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 rounded-2xl transition-colors duration-500 z-20 pointer-events-none" />

                {/* Content Panel */}
                <div className="relative z-20 text-left transform transition-transform duration-500 group-hover:-translate-y-1">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 tracking-wide drop-shadow-lg group-hover:text-gold transition-colors duration-300">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-300 mb-6 font-light leading-relaxed opacity-95 h-16 transition-all duration-500 overflow-hidden line-clamp-3">
                    {s.desc}
                  </p>

                  {/* Learn More link */}
                  <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-bold">
                    <span>Tìm hiểu ngay</span>
                    <ArrowIcon size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-[10%]">
        {/* View All Services CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/dich-vu"
            className="inline-flex items-center gap-2.5 border border-gold hover:bg-gold text-gold hover:text-white font-bold uppercase tracking-widest px-8 py-3.5 rounded-full text-xs md:text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Xem thêm dịch vụ</span>
            <ArrowIcon size={16} className="transform hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};
