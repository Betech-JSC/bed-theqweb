"use client";

import React from "react";
import Image from "@/Components/Image";
import { Shield, Sparkles, Heart } from "lucide-react";
import { usePage } from "@inertiajs/react";

export const Introduction: React.FC = () => {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};
  const doctorsCount = (props.doctors_count as number) || 0;
  const crmSubmissionsCount = (props.crm_submissions_count as number) || 0;

  // Custom Settings (with fallback defaults)
  const title = settings.intro_title || "THEQ NAIL CENTRE";
  const subtitle = settings.intro_subtitle || "Về Chúng Tôi";
  const desc1 = settings.intro_desc_1 || "Tọa lạc tại vị trí đắc địa ở Thành phố Hồ Chí Minh, Theq Nail Centre tự hào là một trong những trung tâm thẩm mỹ hàng đầu cung cấp trọn gói các dịch vụ chăm sóc sắc đẹp từ Da liễu thẩm mỹ, Thẩm mỹ nội khoa, Phẫu thuật tạo hình thẩm mỹ cho đến Phun xăm nghệ thuật.";
  const desc2 = settings.intro_desc_2 || "Với triết lý làm đẹp chuẩn tự nhiên, tôn vinh nét riêng của từng cá nhân, đội ngũ Bác sĩ, chuyên gia đầu ngành tại Theq cam kết đồng hành cùng quý khách hàng trên hành trình khám phá và hoàn thiện phiên bản sắc đẹp hoàn hảo nhất của chính mình.";

  // Dynamic Badges calculation
  const showDoctorsMode = settings.intro_stats_doctors_mode || "auto";
  let doctorsDisplay = "";
  if (showDoctorsMode === "auto") {
    doctorsDisplay = `${doctorsCount}+`;
  } else {
    const manualDoctors = settings.intro_stats_doctors_manual !== undefined && settings.intro_stats_doctors_manual !== "" 
      ? settings.intro_stats_doctors_manual 
      : "5";
    doctorsDisplay = `${manualDoctors}+`;
  }

  const showCustomersMode = settings.intro_stats_customers_mode || "crm_auto";
  let customersDisplay = "";
  if (showCustomersMode === "crm_auto") {
    const parsedBase = parseInt(settings.intro_stats_customers_base ?? "");
    const base = isNaN(parsedBase) ? 10000 : parsedBase;
    const total = base + crmSubmissionsCount;
    customersDisplay = `${total.toLocaleString("vi-VN")}+`;
  } else {
    const manualCustomers = settings.intro_stats_customers_manual !== undefined && settings.intro_stats_customers_manual !== ""
      ? settings.intro_stats_customers_manual
      : "10k+";
    customersDisplay = `${manualCustomers}+`;
  }

  const pillars = [
    {
      icon: <Shield className="w-8 h-8 text-gold" />,
      title: "Tiêu Chuẩn Y Khoa",
      desc: "Toàn bộ quy trình thăm khám và thực hiện dịch vụ được kiểm soát nghiêm ngặt theo tiêu chuẩn Y khoa của Bộ Y Tế.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      title: "Công Nghệ Hiện Đại",
      desc: "Chuyển giao và sở hữu các công nghệ làm đẹp tiên tiến nhất thế giới từ Mỹ, Hàn Quốc và Úc Châu.",
    },
    {
      icon: <Heart className="w-8 h-8 text-gold" />,
      title: "Chăm Sóc Cá Nhân Hóa",
      desc: "Mỗi khách hàng được bác sĩ chuyên khoa thăm khám trực tiếp, phân tích cấu trúc da/mặt và thiết kế phác đồ điều trị riêng biệt.",
    },
  ];

  return (
    <section id="introduction" className="bg-white py-16 md:py-20 px-4 md:px-[10%] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 items-center mb-12">
        {/* Left Column: Image with decoration (5/12 width) */}
        <div className="col-span-12 lg:col-span-5 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-lg mx-auto p-3">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200/20">
            <Image
              src={settings.intro_image || ""}
              alt="Theq Nail Centre Interior"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Border accent inside */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none rounded-xl" />
          </div>
          {/* Offset gold frame decoration */}
          <div className="absolute -inset-1.5 border border-gold/35 rounded-3xl pointer-events-none -z-10 translate-x-4 translate-y-4" />
        </div>

        {/* Right Column: Text content (7/12 width) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col text-left">
          {/* Decor label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold">
              {subtitle}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-gray-800 leading-tight mb-6">
            {title}
          </h2>

          <div className="w-16 h-[2px] bg-gold mb-6" />

          {/* Body Description */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 font-light">
            {desc1}
          </p>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 font-light">
            {desc2}
          </p>

          {/* Badge Grid */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200/60">
            <div>
              <h4 className="text-3xl font-serif font-bold text-gold mb-1">
                {doctorsDisplay}
              </h4>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Bác Sĩ CKI & Thạc Sĩ
              </p>
            </div>
            <div>
              <h4 className="text-3xl font-serif font-bold text-gold mb-1">
                {customersDisplay}
              </h4>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Khách Hàng Hài Lòng
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Core Philosophy / 3 Pillars */}
      <div className="max-w-7xl mx-auto border-t border-gray-200/60 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-light-bg border border-gold/15 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left group cursor-pointer"
            >
              <div className="mb-5 p-3 bg-gold/10 rounded-xl text-gold transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                {p.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2.5 font-serif tracking-wide transition-colors duration-300 group-hover:text-gold">
                {p.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
