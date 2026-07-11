import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsultLocations } from "@/components/ConsultLocations";
import { FAQ } from "@/components/FAQ";
import { ChevronRight, Calendar, User } from "lucide-react";

export const metadata = {
  title: "Tin Tức & Hoạt Động | KT Beauty Medical Centre",
  description: "Cập nhật những thông tin chuyên môn, xu hướng thẩm mỹ thế giới và kiến thức chăm sóc sắc đẹp từ đội ngũ KT Beauty Medical Centre.",
};

export default function TinTucPage() {
  const articles = [
    {
      title: "Điều gì tạo nên một trải nghiệm trẻ hóa thực sự khác biệt?",
      desc: "Tìm hiểu các tiêu chí quan trọng để đánh giá một dịch vụ trẻ hóa toàn diện chuẩn y khoa hiện đại.",
      img: "/images/740467726_122234365430447416_4726582498491420090_n.jpg",
      date: "08/07/2026",
      author: "Bác Sĩ CKI Ngọc Nữ",
    },
    {
      title: "Thẩm mỹ vùng mắt: Khi nào cần can thiệp? Giải pháp phù hợp",
      desc: "Phân tích khoa học về lão hóa vùng mắt, sụp mí mắt và các công nghệ can thiệp mí hiện đại nhất.",
      img: "/images/725593428_122164685762677110_2827496772101167778_n.jpg",
      date: "05/07/2026",
      author: "Hội Đồng Bác Sĩ KT",
    },
    {
      title: "KT Beauty chào đón công nghệ trẻ hóa thế hệ mới trong tháng 07/2026",
      desc: "Chuyển giao độc quyền công nghệ nâng cơ trẻ hóa Ultherapy Prime thế hệ mới đem lại hiệu quả vượt trội.",
      img: "/images/web.png",
      date: "01/07/2026",
      author: "Ban Biên Tập KT",
    },
    {
      title: "KT Beauty đồng hành thiện nguyện “Yêu thương cho em”, trao tặng 300 triệu",
      desc: "Hoạt động thiện nguyện ý nghĩa hỗ trợ các bệnh nhân có hoàn cảnh khó khăn điều trị tại bệnh viện.",
      img: "/images/DNG_3069.png",
      date: "28/06/2026",
      author: "Đoàn Thiện Nguyện KT",
    },
    {
      title: "Private VIP Workshop “The Science of Youth” – Luxury Wellness",
      desc: "Không gian workshop kết nối khoa học làm đẹp độc bản và trải nghiệm chăm sóc sức khỏe thượng lưu.",
      img: "/images/Workshop-1.png",
      date: "22/06/2026",
      author: "Ban Tổ Chức KT",
    },
    {
      title: "CEO Khánh Tôn tham dự Ultherapy Prime APAC 2026 tại Malaysia",
      desc: "Cập nhật xu hướng trẻ hóa nâng cơ thế hệ mới cùng các chuyên gia đầu ngành khu vực Châu Á - Thái Bình Dương.",
      img: "/images/ultherapy-APAC.jpg",
      date: "15/06/2026",
      author: "CEO Khánh Tôn",
    },
    {
      title: "Đại diện KT Beauty tham dự Hội thảo Enhancing Safety & Precision",
      desc: "Nâng cao độ an toàn và độ chính xác trong tạo hình thẩm mỹ nội khoa cùng các chuyên gia quốc tế.",
      img: "/images/1-size-web-1.png",
      date: "08/06/2026",
      author: "Hội Đồng Bác Sĩ KT",
    },
    {
      title: "MasterClass: Nâng cao chuyên môn cùng các bác sĩ đầu ngành",
      desc: "Chương trình đào tạo chuyên sâu nội bộ định kỳ nhằm cập nhật các kỹ thuật tiên tiến nhất thế giới.",
      img: "/images/Masterclass-1.jpg",
      date: "02/06/2026",
      author: "Hội Đồng Chuyên Môn KT",
    },
    {
      title: "3 lý do cần bác sĩ chuyên khoa thực hiện thẩm mỹ nội khoa",
      desc: "Tại sao tay nghề bác sĩ và kiến thức giải phẫu học quyết định sự thành bại của các ca tiêm Filler/Botox.",
      img: "/images/Untitled-2.png",
      date: "25/05/2026",
      author: "Bác Sĩ CKI Hoàng Nga",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow font-sans bg-white">
        {/* Banner/Hero */}
        <section className="relative w-full h-[50vh] min-h-[350px] flex items-center bg-black overflow-hidden pt-20">
          <div className="absolute inset-0 w-full h-full opacity-50 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="Tin tức thẩm mỹ banner"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent z-10" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 text-xs uppercase tracking-widest text-gold mb-3 font-semibold">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-white">Tin tức</span>
              </div>
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                Tin Tức
              </h1>
              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl font-light">
                Cập nhật những thông tin chuyên môn, xu hướng thẩm mỹ thế giới và kiến thức chăm sóc sắc đẹp chính thống từ hội đồng chuyên gia KT Beauty.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Cập Nhật Mới Nhất
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Tin Tức & Hoạt Động
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((art) => (
                <article
                  key={art.title}
                  className="bg-white border border-beige-bg rounded-lg overflow-hidden shadow-md flex flex-col text-left hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full bg-gray-100">
                    <Image
                      src={art.img}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-light">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} />
                        <span>{art.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={13} />
                        <span>{art.author}</span>
                      </div>
                    </div>

                    {/* Heading */}
                    <h3 className="font-serif font-bold text-base md:text-lg text-dark-bg mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {art.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                      {art.desc}
                    </p>

                    {/* Read more CTA */}
                    <span className="text-gold font-bold text-xs uppercase tracking-wider mt-auto group-hover:underline cursor-pointer">
                      Đọc Tiếp
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FAQ />

        {/* Locations and Signups */}
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}
