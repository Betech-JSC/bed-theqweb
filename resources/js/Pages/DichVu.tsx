import React, { useState, useEffect } from "react";
import Image from "@/Components/Image";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { MidCTA } from "@/Components/MidCTA";
import { ConsultLocations } from "@/Components/ConsultLocations";
import { ArrowIcon } from "@/Components/icons";
import { ChevronRight, Scissors, Sparkles, Heart } from "lucide-react";

interface ServiceItem {
  id: number;
  name: string;
  category: string;
  price: string | null;
  description: string | null;
  image: string | null;
  slug: string | null;
  is_highlight?: boolean | number;
}

interface DichVuProps {
  services: ServiceItem[];
}

export default function DichVu({ services = [] }: DichVuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  const categories = [
    "Tất cả",
    "Phẫu thuật thẩm mỹ",
    "Cấy tóc y khoa",
    "Da liễu & Trẻ hóa"
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat && categories.includes(cat)) {
        setSelectedCategory(cat);
      }
    }
  }, []);

  const filteredServices = selectedCategory === "Tất cả"
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Phẫu thuật thẩm mỹ":
        return <Scissors className="w-10 h-10 text-gold" />;
      case "Cấy tóc y khoa":
        return <Heart className="w-10 h-10 text-gold" />;
      default:
        return <Sparkles className="w-10 h-10 text-gold" />;
    }
  };

  const getServiceLink = (slug: string | null) => {
    if (!slug) return "#consult";
    if (slug === "phau-thuat-tham-my" || slug === "cay-toc-y-khoa") {
      return `/${slug}`;
    }
    return `/dich-vu/${slug}`;
  };

  return (
    <>
      <Head title="Danh Mục Dịch Vụ | KT Beauty Medical Centre" />
      <Header />
      <main className="flex-grow font-sans bg-[#faf8f5]">
        {/* Banner/Hero */}
        <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
          <div className="absolute inset-0 w-full h-full opacity-50 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="KT Beauty Services Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-55/40 via-dark-bg/60 to-transparent z-10" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
            <div className="max-w-5xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold mb-4 font-semibold">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-white">Dịch vụ</span>
              </div>
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-wide">
                Danh Mục Dịch Vụ
              </h1>
              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light max-w-3xl">
                Kiến tạo sắc đẹp tự nhiên, chuẩn y khoa với đội ngũ bác sĩ chuyên khoa và hệ thống trang thiết bị chuyển giao chính hãng hàng đầu thế giới.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Tab Navigation */}
        <section className="py-12 bg-white border-b border-gray-100 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gold text-white shadow-md shadow-gold/25 scale-105"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            {filteredServices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <Sparkles className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-serif font-bold text-gray-700 mb-2">Chưa có dịch vụ nào trong danh mục</h3>
                <p className="text-gray-400 text-sm font-light">Vui lòng quay lại sau hoặc liên hệ hotline để nhận tư vấn.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white border border-gray-100/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col text-left group"
                  >
                    {/* Service Image wrapper */}
                    <Link href={`/dich-vu/${s.slug}`} className="aspect-[16/10] bg-gray-55 relative overflow-hidden block">
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gold/30">
                          {getCategoryIcon(s.category)}
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-gray-800/90 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm z-10">
                        {s.category}
                      </span>
                    </Link>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-1">
                        <Link href={`/dich-vu/${s.slug}`}>{s.name}</Link>
                      </h3>
                      
                      <span className="text-gold text-xs uppercase tracking-wider font-semibold mb-4 block">
                        Đơn giá: {s.price || "Liên hệ"}
                      </span>

                      <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                        {s.description || "Liên hệ với KT Beauty Medical Centre để được chuyên khoa tư vấn phác đồ và báo giá cụ thể."}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                        <Link
                          href={getServiceLink(s.slug)}
                          className="flex items-center gap-2 text-gold hover:text-gold-dark font-bold text-xs uppercase tracking-wider group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Xem chi tiết</span>
                          <ArrowIcon size={16} />
                        </Link>
                        
                        <a
                          href={`#consult`}
                          className="px-4 py-2 border border-gold/40 hover:bg-gold hover:text-white text-gold text-xs uppercase font-bold rounded-lg transition-all duration-300 shadow-sm"
                        >
                          Đăng ký tư vấn
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA section */}
        <MidCTA />

        {/* Locations section */}
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}
