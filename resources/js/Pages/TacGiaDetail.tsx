import React from "react";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import Image from "@/Components/Image";
import { ChevronRight, Calendar, ArrowLeft, BookOpen } from "lucide-react";

interface AuthorItem {
  id: number;
  name: string;
  slug: string;
  avatar: string | null;
  role: string | null;
  bio: string | null;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  meta_robots: string | null;
  canonical_link: string | null;
  meta_image: string | null;
}

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  published_date: string | null;
  category: string;
}

interface TacGiaDetailProps {
  author: AuthorItem;
  articles: ArticleItem[];
}

export default function TacGiaDetail({ author, articles = [] }: TacGiaDetailProps) {
  return (
    <>
      <Head>
        <title>{author.meta_title || `${author.name} - Tác giả | KT Beauty`}</title>
        <meta name="description" content={author.meta_description || author.bio || `Thông tin và các bài viết của tác giả ${author.name} tại KT Beauty.`} />
        {author.meta_keywords && <meta name="keywords" content={author.meta_keywords} />}
        {author.meta_robots && <meta name="robots" content={author.meta_robots} />}
        {author.canonical_link && <link rel="canonical" href={author.canonical_link} />}
        {author.meta_image && <meta property="og:image" content={author.meta_image} />}
      </Head>

      <Header forceWhiteBg={true} />

      <main className="flex-grow font-sans bg-gray-55/30 pt-44 md:pt-52 pb-24 text-left">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-400 mb-12 font-medium">
            <Link href="/" className="hover:text-gold transition-colors">Trang chủ</Link>
            <ChevronRight size={10} />
            <Link href="/tin-tuc" className="hover:text-gold transition-colors">Tin tức</Link>
            <ChevronRight size={10} />
            <span className="text-gray-500">{author.name}</span>
          </div>

          {/* Author Header Card */}
          <div className="bg-white rounded-[40px] border border-gold/15 shadow-sm p-8 md:p-16 lg:p-20 mb-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              
              {/* Left Column: Profile Picture */}
              <div className="w-full lg:w-1/3 flex justify-center lg:justify-start flex-shrink-0">
                <div className="relative aspect-square w-64 md:w-80 rounded-[32px] overflow-hidden border-2 border-gold/25 shadow-lg bg-gray-50">
                  <Image
                    src={author.avatar || "/images/default-avatar.png"}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Bio Details */}
              <div className="w-full lg:w-2/3 flex flex-col justify-center">
                {author.role && (
                  <span className="text-gold text-xs md:text-sm font-bold uppercase tracking-widest mb-3">
                    {author.role}
                  </span>
                )}
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-850 mb-6 leading-tight">
                  {author.name}
                </h1>

                {author.bio && (
                  <p className="text-base md:text-lg font-sans text-gray-650 leading-relaxed mb-8 border-l-4 border-gold pl-5 italic bg-gold/5 py-3 pr-4 rounded-r-2xl">
                    "{author.bio}"
                  </p>
                )}

                {author.description ? (
                  <div 
                    className="text-sm md:text-base text-gray-600 font-light leading-relaxed space-y-4 rich-text-content"
                    dangerouslySetInnerHTML={{ __html: author.description }}
                  />
                ) : (
                  <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                    Bác sĩ chuyên gia đồng hành cùng KT Beauty Medical Centre cung cấp thông tin y khoa chính thống, uy tín và chuẩn mực về chăm sóc sắc đẹp thẩm mỹ.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Articles list */}
          <div className="mb-8 flex items-center gap-4">
            <span className="font-serif font-bold text-xl md:text-2xl text-gray-805 flex items-center gap-2">
              <BookOpen size={20} className="text-gold" />
              Bài viết của tác giả ({articles.length})
            </span>
            <div className="flex-grow h-[1px] bg-gray-200" />
          </div>

          {articles.length === 0 ? (
            <div className="py-16 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-300">
              <p className="text-sm font-light">Tác giả này chưa đăng bài viết nào.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {articles.map((art) => (
                <article
                  key={art.id}
                  className="bg-white border border-gold/10 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                >
                  {/* Image */}
                  <Link 
                    href={`/tin-tuc/${art.slug}`} 
                    className="relative aspect-[16/10] w-full bg-gray-100 block overflow-hidden"
                  >
                    <Image
                      src={art.image || "/images/default-blog.jpg"}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 text-gray-700 text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
                      {art.category}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-4 font-light">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} className="text-gold/80" />
                        <span>{art.published_date}</span>
                      </div>
                    </div>

                    {/* Heading */}
                    <h3 className="font-serif font-bold text-lg md:text-xl text-gray-800 mb-3 group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                      <Link href={`/tin-tuc/${art.slug}`}>{art.title}</Link>
                    </h3>

                    {/* Desc */}
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                      {art.description}
                    </p>

                    {/* Read more CTA */}
                    <Link 
                      href={`/tin-tuc/${art.slug}`} 
                      className="inline-flex items-center gap-1 text-gold font-bold text-xs uppercase tracking-widest mt-auto group-hover:text-gold-dark transition-colors cursor-pointer"
                    >
                      Xem chi tiết <ChevronRight size={14} className="mt-[1px]" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="mt-16 pt-8 border-t border-gray-200/60">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-bold text-xs uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} /> Quay lại danh sách tin tức
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
