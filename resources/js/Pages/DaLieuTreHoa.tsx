import React from "react";
import Image from "@/Components/Image";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { MidCTA } from "@/Components/MidCTA";
import { DoctorsCarousel } from "@/Components/DoctorsCarousel";
import { ConsultLocations } from "@/Components/ConsultLocations";
import { ArrowIcon } from "@/Components/icons";
import { Sparkles, Heart, Sun, ChevronRight } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
}

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

interface DaLieuTreHoaProps {
  doctors?: Doctor[];
  services?: ServiceItem[];
}

export default function DaLieuTreHoaPage({ doctors = [], services = [] }: DaLieuTreHoaProps) {
  const catalog = [
    {
      icon: <Sparkles className="w-10 h-10 text-gold" />,
      title: "Trẻ Hóa Công Nghệ Cao",
      desc: "Nâng cơ trẻ hóa Ultherapy không xâm lấn, đi sóng siêu âm hội tụ SMAS 4.5mm giúp săn chắc cơ mặt, giảm nếp nhăn và thon gọn viền hàm tự nhiên.",
      features: ["Nâng cơ trẻ hóa Ultherapy", "Săn chắc da công nghệ cao", "Tái sinh collagen tầng sâu"],
    },
    {
      icon: <Heart className="w-10 h-10 text-gold" />,
      title: "Da Liễu Thẩm Mỹ",
      desc: "Liệu trình cấy Meso căng bóng, tiêm Filler/Botox tạo hình gương mặt tỷ lệ vàng, cấp HA phục hồi làn da thiếu sức sống và làm mịn cấu trúc da.",
      features: ["Cấy Meso căng bóng", "Tiêm Filler/Botox tạo hình", "Cấp ẩm và phục hồi da chuyên sâu"],
    },
    {
      icon: <Sun className="w-10 h-10 text-gold" />,
      title: "Điều Trị Sắc Tố & Da",
      desc: "Trị nám Laser công nghệ cao xung siêu ngắn loại bỏ tận gốc melanin, điêu khắc lông mày Aurora mang lại nét thanh tú tự nhiên cho gương mặt.",
      features: ["Điều trị nám Laser công nghệ cao", "Điêu khắc lông mày Aurora", "Tái tạo sắc tố sáng hồng"],
    },
  ];

  return (
    <>
      <Head title="Da Liễu & Trẻ Hóa | KT Beauty" />
      <Header />
      <main className="flex-grow font-sans bg-[#faf8f5]">
        {/* Subpage Banner/Hero */}
        <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
          {/* Background Image overlay */}
          <div className="absolute inset-0 w-full h-full opacity-50 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="KT Beauty Dermatology Banner"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-55/40 via-dark-bg/60 to-transparent z-10" />

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
            <div className="max-w-5xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold mb-4 font-semibold">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-white">Da liễu & Trẻ hóa</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-wide">
                Da Liễu & Trẻ Hóa
              </h1>

              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light max-w-3xl">
                Khôi phục nét xuân, nâng niu làn da của bạn bằng công nghệ hiện đại và phác đồ chuyên khoa cá nhân hóa tại KT Beauty Medical Centre.
              </p>
            </div>
          </div>
        </section>

        {/* Catalog List section */}
        <section className="bg-white py-20 px-4 md:px-[10%] border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
                Giải Pháp Thẩm Mỹ Da
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Danh Mục Da Liễu & Trẻ Hóa
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4 mb-6" />
              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                Khám phá các giải pháp da liễu thẩm mỹ và trẻ hóa công nghệ cao được chuyển giao chính hãng, giúp duy trì làn da khỏe đẹp bền vững từ sâu bên trong.
              </p>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {catalog.map((c) => (
                <div
                  key={c.title}
                  className="bg-white border border-beige-bg rounded-lg p-8 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col text-left group"
                >
                  {/* Icon */}
                  <div className="mb-6 bg-gold/10 p-3 rounded-lg flex items-center justify-center w-16 h-16">
                    {c.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-dark-bg mb-4 group-hover:text-gold transition-colors duration-200">
                    {c.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                    {c.desc}
                  </p>

                  {/* Subfeatures */}
                  <ul className="space-y-2 mb-8 border-t border-gray-100 pt-4 flex-grow text-xs md:text-sm text-gray-600 font-light">
                    {c.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Booking CTA */}
                  <a
                    href="#consult"
                    className="flex items-center gap-2 text-gold hover:text-gold-dark font-bold text-xs uppercase tracking-wider mt-auto"
                  >
                    <span>Liên Hệ Tư Vấn</span>
                    <ArrowIcon size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </a>
                </div>
              ))}
            </div>

            {/* Dynamic Services List from Database */}
            {services.length > 0 && (
              <div className="mt-20 pt-20 border-t border-gray-100">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
                    Danh Sách Chi Tiết
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold font-serif text-dark-bg">
                    Dịch Vụ Thực Tế Tại Phòng Khám
                  </h3>
                  <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((s) => (
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
                            <Sparkles className="w-10 h-10 text-gold" />
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
                            href={`/dich-vu/${s.slug}`}
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
              </div>
            )}
          </div>
        </section>

        {/* Reused Call-to-action */}
        <MidCTA />

        {/* Reused Doctors list */}
        <DoctorsCarousel doctors={doctors} />

        {/* Reused Consult signup form and branch locations */}
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}
