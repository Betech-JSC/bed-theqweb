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
    <section className="bg-white py-12 md:py-16 px-4 md:px-[10%] font-sans relative z-30 -mt-8 md:-mt-12 max-w-7xl mx-auto rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8">
      {pillars.map((p, idx) => (
        <div
          key={p.title}
          className={`flex flex-col items-center text-center p-4 ${
            idx < 2 ? "md:border-r border-gray-100" : ""
          }`}
        >
          <div className="bg-gold/10 p-4 rounded-full mb-4 flex items-center justify-center">
            {p.icon}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-dark-bg mb-2 font-serif">
            {p.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            {p.desc}
          </p>
        </div>
      ))}
    </section>
  );
};
