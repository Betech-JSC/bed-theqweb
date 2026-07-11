import React from "react";
import Image from "next/image";

export const Introduction: React.FC = () => {
  return (
    <section className="bg-light-bg py-20 px-4 md:px-[10%] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Image with decoration */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-lg mx-auto rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/images/574583363_122251875866080096_1777622189448333941_n-1.jpg"
            alt="KT Beauty Medical Centre Interior"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          {/* Border accent */}
          <div className="absolute inset-4 border-2 border-gold/40 pointer-events-none rounded" />
        </div>

        {/* Right Column: Text content */}
        <div className="flex flex-col text-left">
          {/* Decor label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold">
              Về Chúng Tôi
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg leading-tight mb-6">
            KT BEAUTY MEDICAL CENTRE
          </h2>

          <div className="w-16 h-[2px] bg-gold mb-6" />

          {/* Body Description */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 font-light">
            Tọa lạc tại vị trí đắc địa ở Thành phố Hồ Chí Minh, KT Beauty Medical Centre tự hào là một trong những trung tâm thẩm mỹ hàng đầu cung cấp trọn gói các dịch vụ chăm sóc sắc đẹp từ Da liễu thẩm mỹ, Thẩm mỹ nội khoa, Phẫu thuật tạo hình thẩm mỹ cho đến Phun xăm nghệ thuật.
          </p>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 font-light">
            Với triết lý làm đẹp chuẩn tự nhiên, tôn vinh nét riêng của từng cá nhân, đội ngũ Bác sĩ, chuyên gia đầu ngành tại KT Beauty cam kết đồng hành cùng quý khách hàng trên hành trình khám phá và hoàn thiện phiên bản sắc đẹp hoàn hảo nhất của chính mình.
          </p>

          {/* Badge Grid */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            <div>
              <h4 className="text-3xl font-serif font-bold text-gold mb-1">
                5+
              </h4>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Bác Sĩ CKI & Thạc Sĩ
              </p>
            </div>
            <div>
              <h4 className="text-3xl font-serif font-bold text-gold mb-1">
                10k+
              </h4>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Khách Hàng Hài Lòng
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
