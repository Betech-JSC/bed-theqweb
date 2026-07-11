import React from "react";
import { Shield, Sparkles, Heart } from "lucide-react";

export const ThreePillars: React.FC = () => {
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
    <section className="relative z-30 max-w-6xl mx-auto px-4 mt-8 md:mt-12 font-sans">
      <div className="bg-white border border-gold/20 rounded-2xl shadow-[0_15px_40px_rgba(210,191,167,0.12)] p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {pillars.map((p, idx) => (
          <div
            key={p.title}
            className={`flex flex-col items-center text-center p-4 group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(210,191,167,0.15)] rounded-xl ${
              idx < 2 ? "md:border-r border-gray-100" : ""
            }`}
          >
            <div className="mb-5 text-gold transition-transform duration-300 group-hover:scale-110">
              {p.icon}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 font-serif tracking-wide transition-colors duration-300 group-hover:text-gold">
              {p.title}
            </h3>

            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[270px] font-light">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
