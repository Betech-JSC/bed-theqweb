import React from "react";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ChevronRight, Calendar, User, ArrowLeft, Link as LinkIcon, List } from "lucide-react";
import Image from "@/Components/Image";

interface AuthorItem {
  id: number;
  name: string;
  slug: string;
  avatar: string | null;
  role: string | null;
  bio: string | null;
}

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image: string | null;
  author: AuthorItem | null;
  legacy_author: string | null;
  published_date: string | null;
  category: string;
  schema: string | null;
}

interface TinTucDetailProps {
  article: ArticleItem;
  relatedArticles: ArticleItem[];
  toc?: Array<{ id: string; text: string; level: number }>;
}

export default function TinTucDetail({ article, relatedArticles = [], toc = [] }: TinTucDetailProps) {
  const [isTocExpanded, setIsTocExpanded] = React.useState(true);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Track scroll progress for reading indicator
  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert("Đã sao chép liên kết bài viết thành công!"))
      .catch(() => alert("Sao chép liên kết thất bại."));
  };

  const domain = typeof window !== "undefined" ? window.location.origin : "https://theq.vn";
  const defaultNewsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.description || "",
    "image": [
      article.image ? (article.image.startsWith("http") ? article.image : `${domain}${article.image}`) : `${domain}/images/default-blog.jpg`
    ],
    "datePublished": article.published_date || new Date().toISOString(),
    "author": [{
      "@type": "Person",
      "name": article.author?.name || article.legacy_author || "Theq",
      "url": article.author ? `${domain}/tac-gia/${article.author.slug}` : undefined
    }]
  };

  return (
    <>
      <Head title={`${article.title} | Theq`}>
        {article.schema ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: article.schema }} />
        ) : (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultNewsSchema) }} />
        )}
      </Head>
      <Header forceWhiteBg={true} />

      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[4px] bg-gold z-55 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <main className="flex-grow font-sans bg-gray-55/30 pt-44 md:pt-52 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-400 mb-8 font-medium">
            <Link href="/" className="hover:text-gold transition-colors">Trang chủ</Link>
            <ChevronRight size={10} />
            <Link href="/tin-tuc" className="hover:text-gold transition-colors">Tin tức</Link>
            <ChevronRight size={10} />
            <span className="text-gray-500 truncate max-w-[200px] md:max-w-sm">{article.title}</span>
          </div>

          {/* Main Content Layout - Extremely Spacious */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Side: Article Body (8/12 cols) with maximum inner padding */}
            <article className="lg:col-span-8 bg-white rounded-[40px] p-8 md:p-16 lg:p-20 border border-gold/15 shadow-sm text-left">
              {/* Category Badge */}
              <span className="inline-block bg-gold/10 text-gold text-[11px] uppercase font-bold tracking-widest px-4 py-2 rounded-full mb-6">
                {article.category}
              </span>

              {/* Title - Large Format */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-850 mb-8 leading-tight">
                {article.title}
              </h1>

              {/* Meta information & Social Share */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400 mb-10 border-b border-gray-100 pb-6">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-gold" />
                    <span>Ngày đăng: {article.published_date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={16} className="text-gold" />
                    <span>
                      Tác giả:{" "}
                      {article.author ? (
                        <Link href={`/tac-gia/${article.author.slug}`} className="text-gold hover:underline font-semibold">
                          {article.author.name}
                        </Link>
                      ) : (
                        article.legacy_author || "Theq"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Chia sẻ:</span>
                  <button
                    onClick={handleShareFacebook}
                    className="p-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                    title="Chia sẻ Facebook"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="p-1.5 bg-gray-100 text-gray-650 rounded-full hover:bg-gray-200 transition-colors"
                    title="Sao chép liên kết"
                  >
                    <LinkIcon size={14} />
                  </button>
                </div>
              </div>

              {/* Cover Image - Large Scale */}
              {article.image && (
                <div className="relative aspect-[16/9] w-full rounded-[32px] overflow-hidden mb-12 shadow-md">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Description / Introduction (Bold & larger text for magazine feel) */}
              {article.description && (
                <p className="text-lg md:text-2xl font-serif text-gray-650 leading-relaxed mb-12 border-l-4 border-gold pl-6 italic">
                  {article.description}
                </p>
              )}

              {/* Table of Contents (TOC) */}
              {toc && toc.length > 0 && (
                <div className="mb-12 border border-gold/15 bg-gold/5 rounded-[32px] p-8 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setIsTocExpanded(!isTocExpanded)}
                    className="w-full flex items-center justify-between text-gold font-bold font-serif text-xl focus:outline-none"
                  >
                    <span className="flex items-center gap-2.5">
                      <List size={22} /> Mục lục bài viết
                    </span>
                    <span className="text-xs text-gray-500 font-medium transition-transform duration-300">
                      {isTocExpanded ? "Thu gọn ▲" : "Mở rộng ▼"}
                    </span>
                  </button>
                  {isTocExpanded && (
                    <nav className="mt-4 border-t border-gold/10 pt-4">
                      <ul className="space-y-4 text-base md:text-lg">
                        {toc.map((item, index) => (
                          <li
                            key={item.id}
                            style={{ paddingLeft: item.level === 3 ? "2rem" : "0" }}
                            className="flex items-start gap-3 group"
                          >
                            <span className="text-gold font-bold select-none">{index + 1}.</span>
                            <a
                              href={`#${item.id}`}
                              className="text-gray-650 hover:text-gold transition-colors font-light leading-relaxed group-hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({
                                  behavior: "smooth"
                                });
                              }}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>
              )}

              {/* Main Content (HTML rendered from server-parsed content with large font sizes) */}
              <div 
                className="text-lg md:text-[20px] text-gray-700 font-light leading-[1.8] space-y-8 rich-text-content"
                dangerouslySetInnerHTML={{ __html: article.content || "" }}
              />

              {/* Author Bio Box */}
              {(article.author || article.legacy_author) && (
                <div className="mt-16 p-6 md:p-8 bg-gradient-to-br from-gold/5 to-gold/15 rounded-3xl border border-gold/20 flex flex-col md:flex-row gap-6 items-center md:items-start text-left">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-gold/30 shadow-sm flex-shrink-0 bg-gray-50">
                    <Image
                      src={article.author?.avatar || "/images/default-avatar.png"}
                      alt={article.author?.name || article.legacy_author || "Theq"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <span className="text-gold text-[10px] uppercase font-bold tracking-wider block">Tác giả bài viết</span>
                    {article.author ? (
                      <Link
                        href={`/tac-gia/${article.author.slug}`}
                        className="font-serif font-bold text-gray-800 text-lg md:text-xl hover:text-gold transition-colors block"
                      >
                        {article.author.name}
                      </Link>
                    ) : (
                      <span className="font-serif font-bold text-gray-800 text-lg md:text-xl block">
                        {article.legacy_author}
                      </span>
                    )}
                    {article.author?.role && (
                      <span className="text-gray-500 text-xs font-semibold block">{article.author.role}</span>
                    )}
                    <p className="text-xs md:text-sm text-gray-650 font-light leading-relaxed">
                      {article.author?.bio || "Đội ngũ biên tập viên và hội đồng y khoa Theq chịu trách nhiệm kiểm duyệt nội dung, mang lại các thông tin làm đẹp chuẩn y khoa, an toàn và hiệu quả."}
                    </p>
                  </div>
                </div>
              )}

              {/* Back Button */}
              <div className="mt-16 pt-8 border-t border-gray-100">
                <Link
                  href="/tin-tuc"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  <ArrowLeft size={14} /> Quay lại danh sách tin tức
                </Link>
              </div>
            </article>

            {/* Right Side: Sidebar (4/12 cols) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Related Articles Card - Upgraded layout with larger cards */}
              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-[32px] p-8 border border-gold/15 shadow-sm text-left">
                  <h3 className="font-serif font-bold text-gray-805 text-xl mb-8 pb-3 border-b border-gray-100">
                    Bài viết liên quan
                  </h3>
                  
                  <div className="space-y-8">
                    {relatedArticles.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/tin-tuc/${rel.slug}`}
                        className="flex gap-5 group cursor-pointer block"
                      >
                        {/* Much larger related article image (w-40 h-28) */}
                        <div className="relative w-40 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                          <Image
                            src={rel.image || "/images/default-blog.jpg"}
                            alt={rel.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex flex-col justify-center text-left">
                          <h4 className="font-serif font-bold text-base text-gray-800 line-clamp-3 leading-snug group-hover:text-gold transition-colors mb-2">
                            {rel.title}
                          </h4>
                          <span className="text-xs text-gray-400 font-light">
                            {rel.published_date}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Booking Card */}
              <div className="bg-gradient-to-br from-dark-bg to-gray-850 text-white rounded-[32px] p-8 border border-gold/20 shadow-xl text-center relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
                <h3 className="font-serif font-bold text-xl mb-3 text-white">
                  Đặt Lịch Hẹn Khám
                </h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                  Liên hệ ngay với hội đồng bác sĩ chuyên gia tại Theq để đặt lịch hẹn khám trực tiếp.
                </p>
                <Link
                  href="/dat-lich"
                  className="inline-block w-full bg-gold hover:bg-gold-dark text-white font-bold py-3 rounded-xl transition-all duration-300 text-xs uppercase tracking-widest shadow-md text-center"
                >
                  Đặt lịch hẹn ngay
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
