import React from "react";
import Image from "@/Components/Image";
import { Link } from "@inertiajs/react";

interface ArticleItem {
  id?: number;
  title: string;
  slug?: string | null;
  description: string | null;
  content?: string | null;
  image: string | null;
  author?: string | null;
  published_date: string | null;
  category?: string;
}

interface ExpertSharingProps {
  articles?: ArticleItem[];
}

export const ExpertSharing: React.FC<ExpertSharingProps> = ({ articles = [] }) => {
  if (articles.length === 0) return null;

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
                  src={art.image || "/images/web.png"}
                  alt={art.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Area */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs text-gray-400 font-semibold mb-2 block">
                  Ngày đăng: {art.published_date}
                </span>
                <h3 className="text-lg font-serif font-bold text-dark-bg leading-snug mb-3 hover:text-gold transition-colors duration-200 line-clamp-2">
                  <Link href="/tin-tuc">{art.title}</Link>
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                  {art.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href="/tin-tuc"
                    className="text-gold hover:text-gold-dark font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    Đọc tiếp
                    <span className="text-base">&rarr;</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/tin-tuc"
            className="inline-block bg-white hover:bg-gold border border-gold text-gold hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-300 text-sm shadow-sm hover:shadow-gold/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Xem Thêm Bài Viết Khác
          </Link>
        </div>
      </div>
    </section>
  );
};
