import React from "react";
import { Award, UserCheck, Star, Zap } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      icon: <Award className="w-10 h-10 text-gold" />,
      title: "Tiêu chuẩn Úc Châu",
      desc: "Trang thiết bị hiện đại, hệ thống phòng phẫu thuật vô trùng khép kín chuyển giao công nghệ chuẩn quốc tế.",
    },
    {
      icon: <UserCheck className="w-10 h-10 text-gold" />,
      title: "Tư vấn cá nhân hóa",
      desc: "Phác đồ điều trị được thiết kế riêng biệt dựa trên cấu trúc sinh học mặt và nhu cầu thực tế của từng khách hàng.",
    },
    {
      icon: <Star className="w-10 h-10 text-gold" />,
      title: "Chuyên môn cao",
      desc: "Đội ngũ Giáo sư, Thạc sĩ, Bác sĩ CKI chuyên khoa tạo hình thẩm mỹ trực thuộc các hiệp hội thẩm mỹ danh tiếng.",
    },
    {
      icon: <Zap className="w-10 h-10 text-gold" />,
      title: "Công nghệ tiên tiến",
      desc: "Sở hữu và chuyển giao độc quyền các dòng máy công nghệ trẻ hóa da, điều trị sắc tố tốt nhất hiện nay.",
    },
  ];

  return (
    <section className="bg-dark-bg py-28 px-4 md:px-[10%] font-sans text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
            Lựa Chọn Hàng Đầu
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-white">
            Tại Sao Khách Hàng Tin Chọn
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4 mb-6" />
          <p className="text-sm md:text-base text-gray-300 font-light">
            Chúng tôi tự hào là thương hiệu thẩm mỹ chuẩn y khoa hàng đầu, đồng hành kiến tạo nên hàng chục nghìn vẻ đẹp độc bản tự nhiên.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-12 gap-8">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="col-span-12 md:col-span-6 lg:col-span-3 bg-white/[0.03] backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/5 flex flex-col items-start text-left hover:-translate-y-1.5 transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.05]"
            >
              <div className="mb-6 bg-gold/15 p-3.5 rounded-full flex items-center justify-center text-gold shadow-inner">
                {h.icon}
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-3 hover:text-gold transition-colors duration-300">
                {h.title}
              </h3>
              <p className="text-sm text-gray-350 leading-relaxed font-light">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
