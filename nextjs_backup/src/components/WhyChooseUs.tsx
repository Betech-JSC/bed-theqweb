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
    <section className="bg-light-bg py-20 px-4 md:px-[10%] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
            Lựa Chọn Hàng Đầu
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
            Tại Sao Khách Hàng Tin Chọn
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4 mb-6" />
          <p className="text-sm md:text-base text-gray-500 font-light">
            Chúng tôi tự hào là thương hiệu thẩm mỹ chuẩn y khoa hàng đầu, đồng hành kiến tạo nên hàng chục nghìn vẻ đẹp độc bản tự nhiên.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="bg-white p-8 rounded-lg shadow-md border border-beige-bg flex flex-col items-start text-left hover:-translate-y-1.5 transition-transform duration-300"
            >
              <div className="mb-6 bg-gold/10 p-3 rounded-lg flex items-center justify-center">
                {h.icon}
              </div>
              <h3 className="text-lg font-serif font-bold text-dark-bg mb-3">
                {h.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
