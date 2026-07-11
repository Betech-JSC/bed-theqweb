import React from "react";
import Image from "@/Components/Image";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { MidCTA } from "@/Components/MidCTA";
import { DoctorsCarousel } from "@/Components/DoctorsCarousel";
import { ConsultLocations } from "@/Components/ConsultLocations";
import { ArrowIcon } from "@/Components/icons";
import { Eye, Sparkles, Smile, ChevronRight } from "lucide-react";

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

interface PhauThuatThamMyProps {
  doctors?: Doctor[];
  services?: ServiceItem[];
}

export default function PhauThuatThamMyPage({ doctors = [], services = [] }: PhauThuatThamMyProps) {
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
    <><Head title="Phẫu Thuật Thẩm Mỹ | KT Beauty" />
      <Header />
      <main className="flex-grow font-sans">
        {/* Subpage Banner/Hero */}
        <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
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
          <div className="absolute inset-0 bg-gradient-to-t from-gray-55/40 via-dark-bg/60 to-transparent z-10" />

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
            <div className="max-w-5xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold mb-4 font-semibold">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-white">Phẫu thuật thẩm mỹ</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-wide">
                Phẫu Thuật Thẩm Mỹ
              </h1>

              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light max-w-3xl">
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

            {/* Dynamic Services List from Database */}
            {services.length > 0 && (
              <div className="mt-20 pt-20 border-t border-gray-100">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
                    Danh Sách Chi Tiết
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold font-serif text-dark-bg">
                    Dịch Vụ Phẫu Thuật Tại Phòng Khám
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
