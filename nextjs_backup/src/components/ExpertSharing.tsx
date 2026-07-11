import React from "react";
import Image from "next/image";

export const ExpertSharing: React.FC = () => {
  const articles = [
    {
      title: "Giải mã quy trình tiêm tinh chất Meso trẻ hóa chuẩn y khoa",
      date: "12/06/2026",
      img: "/images/625385339_122264581316080096_6494403903634308287_n-1.jpg",
      snippet: "Liệu pháp cấy tinh chất Meso đang tạo nên cơn sốt. Cùng Bác sĩ Ngọc Nữ phân tích quy trình cấy meso an toàn, hiệu quả tối ưu.",
    },
    {
      title: "Chăm sóc da sau điều trị Laser công nghệ cao đúng cách",
      date: "08/06/2026",
      img: "/images/626542132_122264581148080096_3645052413921176353_n-1.jpg",
      snippet: "Sau khi bắn Laser trị nám/tàn nhang, làn da nhạy cảm cần được chăm dưỡng đặc biệt. Xem ngay các bước phục hồi từ chuyên gia.",
    },
    {
      title: "Phẫu thuật nâng mũi cấu trúc: Những điều cần biết trước khi làm",
      date: "28/05/2026",
      img: "/images/627381223_122264581196080096_2191168211357172673_n-1.jpg",
      snippet: "Nâng mũi cấu trúc mang lại dáng mũi thanh tú tự nhiên. Tham khảo phân tích từ Thạc sĩ Bác sĩ Hồ Việt Trinh về chất liệu sụn.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-[10%] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
            Kiến Thức Làm Đẹp
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
            Chia Sẻ Từ Bác Sĩ Chuyên Gia
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4 mb-6" />
          <p className="text-sm md:text-base text-gray-500 font-light">
            Cung cấp những kiến thức chuyên sâu và chuẩn xác nhất về y khoa thẩm mỹ giúp quý khách thông thái lựa chọn liệu trình phù hợp.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.title}
              className="bg-light-bg rounded-lg overflow-hidden border border-beige-bg flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow duration-300 text-left"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={art.img}
                  alt={art.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Area */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs text-gray-400 font-semibold mb-2 block">
                  Ngày đăng: {art.date}
                </span>
                <h3 className="text-lg font-serif font-bold text-dark-bg leading-snug mb-3 hover:text-gold transition-colors duration-200 line-clamp-2">
                  <a href="#">{art.title}</a>
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                  {art.snippet}
                </p>
                <div className="mt-auto">
                  <a
                    href="#"
                    className="text-gold hover:text-gold-dark font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    Đọc tiếp
                    <span className="text-base">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
