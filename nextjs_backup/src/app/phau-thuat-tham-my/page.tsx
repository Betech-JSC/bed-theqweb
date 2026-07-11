import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MidCTA } from "@/components/MidCTA";
import { DoctorsCarousel } from "@/components/DoctorsCarousel";
import { ConsultLocations } from "@/components/ConsultLocations";
import { ArrowIcon } from "@/components/icons";
import { Eye, Sparkles, Smile, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Phẫu Thuật Thẩm Mỹ Chuẩn Y Khoa | KT Beauty",
  description: "KT Beauty Medical Centre mang đến giải pháp phẫu thuật thẩm mỹ tạo hình chuẩn y khoa, được cá nhân hóa theo từng cấu trúc gương mặt và cơ thể.",
};

export default function PhauThuatThamMyPage() {
  const catalog = [
    {
      icon: <Eye className="w-10 h-10 text-gold" />,
      title: "Phẫu Thuật Tạo Hình Mắt",
      desc: "Cắt mí Double Eyeluxe, lấy mỡ mí mắt trên/dưới, định hình nếp mí sắc nét tự nhiên, xóa bỏ hoàn toàn tình trạng da chùng sụp mí.",
      features: ["Cắt mí Double Eyeluxe", "Lấy mỡ bọng mắt dưới", "Tạo hình khóe mắt trong/ngoài"],
    },
    {
      icon: <Sparkles className="w-10 h-10 text-gold" />,
      title: "Phẫu Thuật Tạo Hình Mũi",
      desc: "Nâng mũi cấu trúc sụn tai/sụn sườn sinh học cao cấp, thu gọn đầu mũi và cánh mũi giúp kiến tạo dáng mũi thanh tú hài hòa chuẩn tỷ lệ vàng.",
      features: ["Nâng mũi cấu trúc bán sụn", "Thu gọn cánh mũi vi phẫu", "Chỉnh xương mũi gồ, khoằm"],
    },
    {
      icon: <Smile className="w-10 h-10 text-gold" />,
      title: "Thẩm Mỹ Vùng Mặt",
      desc: "Tạo dáng môi trái tim vi phẫu quyến rũ, phẫu thuật độn cằm V-line tự nhiên, hạ xương gò má đem lại đường nét thanh thoát quyến rũ.",
      features: ["Tạo dáng môi trái tim", "Độn cằm V-Line tự nhiên", "Căng da mặt bán phần"],
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow font-sans">
        {/* Subpage Banner/Hero */}
        <section className="relative w-full h-[50vh] min-h-[350px] flex items-center bg-black overflow-hidden pt-20">
          {/* Background Image overlay */}
          <div className="absolute inset-0 w-full h-full opacity-50 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="KT Beauty Banner Subpage"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent z-10" />

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 text-xs uppercase tracking-widest text-gold mb-3 font-semibold">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-white">Phẫu thuật thẩm mỹ</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                Phẫu Thuật Thẩm Mỹ
              </h1>

              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl font-light">
                KT Beauty Medical Centre mang đến giải pháp phẫu thuật thẩm mỹ chuẩn y khoa, được cá nhân hóa theo từng cấu trúc gương mặt và cơ thể.
              </p>
            </div>
          </div>
        </section>

        {/* Catalog List section */}
        <section className="bg-white py-20 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
                Giải Pháp Tạo Hình
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Danh Mục Phẫu Thuật Thẩm Mỹ
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4 mb-6" />
              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                Khám phá các giải pháp phẫu thuật thẩm mỹ được thiết kế riêng theo từng cấu trúc khuôn mặt và cơ thể, đảm bảo hài hòa tự nhiên và an toàn chuẩn y khoa.
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
          </div>
        </section>

        {/* Reused Call-to-action */}
        <MidCTA />

        {/* Reused Doctors list */}
        <DoctorsCarousel />

        {/* Reused Consult signup form and branch locations */}
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}
