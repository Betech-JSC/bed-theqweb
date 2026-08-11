import React from "react";
import Image from "@/Components/Image";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ConsultLocations } from "@/Components/ConsultLocations";
import { ChevronRight, Phone, Mail, Clock, MapPin } from "lucide-react";



export default function LienHePage() {
  const contacts = [
    {
      icon: <Phone className="w-6 h-6 text-gold" />,
      title: "Hotline Đặt Lịch",
      val: "1900 5006",
      href: "tel:19005006",
    },
    {
      icon: <Mail className="w-6 h-6 text-gold" />,
      title: "Email Hỗ Trợ",
      val: "support@theq.com.vn",
      href: "mailto:support@theq.com.vn",
    },
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      title: "Giờ Làm Việc",
      val: "8:30 - 20:00 (Hàng ngày kể cả lễ)",
      href: null,
    },
  ];

  const locations = [
    {
      city: "Thành phố Hồ Chí Minh",
      name: "Theq Medical Centre",
      address: "25-27-29 Đường số 4, KDC Trung Sơn, Bình Hưng, Bình Chánh, TP.HCM",
      phone: "1900 5006",
    },
    {
      city: "Thành phố Hà Nội",
      name: "Theq - Văn Phòng Hợp Tác",
      address: "Văn phòng tư vấn và hỗ trợ khách hàng, Hoàn Kiếm, Hà Nội",
      phone: "1900 5006",
    },
  ];

  return (
    <><Head title="Liên Hệ | Theq" />
      <Header />
      <main className="flex-grow font-sans bg-white">
        {/* Banner/Hero */}
        <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
          <div className="absolute inset-0 w-full h-full opacity-50 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="Liên hệ thẩm mỹ banner"
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
                <span className="text-white">Liên hệ</span>
              </div>
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-wide">
                Liên Hệ
              </h1>
              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-205 leading-relaxed font-light max-w-3xl">
                Hãy liên hệ ngay với chúng tôi để được tư vấn cá nhân hóa, đặt lịch thăm khám hoặc tìm hiểu thêm về các dịch vụ thẩm mỹ y khoa hiện đại.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-20 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {contacts.map((c, i) => (
                <div
                  key={i}
                  className="bg-white border border-beige-bg rounded-lg p-8 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300"
                >
                  <div className="mb-4 bg-gold/10 p-3 rounded-full flex items-center justify-center w-14 h-14">
                    {c.icon}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-dark-bg mb-2">
                    {c.title}
                  </h3>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-gold font-semibold hover:underline text-sm md:text-base"
                    >
                      {c.val}
                    </a>
                  ) : (
                    <span className="text-gray-500 font-light text-sm md:text-base">
                      {c.val}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Clinic locations list */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left border-t border-beige-bg pt-20">
              <div className="lg:col-span-5">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                  Bản Đồ Chỉ Đường
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark-bg mb-6">
                  Địa Điểm Phòng Khám
                </h2>
                <div className="w-10 h-[2.5px] bg-gold mb-6" />
                <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed mb-8">
                  Hệ thống Theq Medical Centre chào đón quý khách hàng tại các cơ sở hiện đại nhất. Vui lòng đặt lịch hẹn trước để nhận sự đón tiếp chu đáo nhất từ đội ngũ bác sĩ chuyên khoa.
                </p>

                <div className="space-y-6">
                  {locations.map((loc, i) => (
                    <div key={i} className="border-l-2 border-gold pl-4 py-1">
                      <span className="text-xs text-gray-400 font-semibold uppercase block mb-1">
                        {loc.city}
                      </span>
                      <h4 className="font-serif font-bold text-base text-dark-bg mb-2">
                        {loc.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed mb-1 flex items-center gap-1.5">
                        <MapPin size={13} className="text-gold flex-shrink-0" />
                        <span>{loc.address}</span>
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 font-light flex items-center gap-1.5">
                        <Phone size={13} className="text-gold flex-shrink-0" />
                        <span>Hotline: {loc.phone}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative image card */}
              <div className="lg:col-span-7 relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl border border-beige-bg">
                <Image
                  src="/images/574583363_122251875866080096_1777622189448333941_n-1.jpg"
                  alt="Theq Medical Centre Clinic Lobby"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Embedded registration consult form */}
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}
