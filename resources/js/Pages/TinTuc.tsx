import React from "react";
import Image from "@/Components/Image";
import { Link, Head, usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { parseBlogCategories } from "@/Components/BlogHeaderAndCategoriesEditor";
import { ChevronRight, Calendar, User, ArrowRight, Search, Eye } from "lucide-react";

interface DbArticle {
  title: string;
  slug?: string | null;
  description?: string;
  image?: string;
  image_alt?: string | null;
  published_date?: string;
  author?: any;
  legacy_author?: string | null;
  category?: string;
  views?: number;
}

export default function TinTucPage({
  initialArticles,
  initialCategory = "Tất cả",
  initialSearch = "",
}: {
  initialArticles?: DbArticle[];
  initialCategory?: string;
  initialSearch?: string;
}) {
  const articles = (initialArticles && initialArticles.length > 0)
    ? initialArticles.map(a => {
        let displayAuthor = "Ban Biên Tập";
        if (a.author && typeof a.author === "object") {
          displayAuthor = a.author.name || "Ban Biên Tập";
        } else if (typeof a.author === "string" && a.author.trim() !== "") {
          displayAuthor = a.author;
        } else if (a.legacy_author) {
          displayAuthor = a.legacy_author;
        }
        return {
          title: a.title,
          desc: a.description || "",
          img: a.image || "/images/default-blog.svg",
          imgAlt: a.image_alt || a.title,
          date: a.published_date || "",
          author: displayAuthor,
          slug: a.slug || "",
          category: a.category || "Chuyên môn",
          views: a.views || 0,
        };
      })
    : [];

  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory || "Tất cả");
  const [searchTerm, setSearchTerm] = React.useState(initialSearch || "");

  React.useEffect(() => {
    setSelectedCategory(initialCategory || "Tất cả");
  }, [initialCategory]);

  const categories = React.useMemo(() => {
    return ["Tất cả", ...parseBlogCategories(settings.blog_categories)];
  }, [settings.blog_categories]);

  const filteredArticles = articles.filter((a) => {
    const matchCat = selectedCategory === "Tất cả" || a.category === selectedCategory;
    const q = searchTerm.trim().toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q) || a.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featuredPost = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const regularArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  return (
    <>
      <Head>
        <title>{selectedCategory === "Tất cả" ? "Chuyên Trang Bài Viết & Kiến Thức Chuyên Sâu | Theq Blog" : `${selectedCategory} - Bài Viết Chuyên Sâu | Theq Blog`}</title>
        <meta name="description" content="Chuyên trang Blog chia sẻ các bài viết phân tích chuyên môn, kiến thức y khoa, sự kiện và góc nhìn chuyên gia từ đội ngũ Theq." />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Chuyên Trang Bài Viết & Kiến Thức Chuyên Sâu | Theq Blog" />
        <meta property="og:description" content="Chuyên trang Blog chia sẻ các bài viết phân tích chuyên môn, kiến thức y khoa, sự kiện và góc nhìn chuyên gia từ đội ngũ Theq." />
      </Head>
      <Header />
      
      <main className="flex-grow font-sans bg-gray-55/40">
        {/* Banner/Hero Banner */}
        <section className="relative w-full flex items-start bg-gradient-to-br from-[#141311] via-[#1f1c18] to-[#2c251d] overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
          {settings.blog_hero_image && (
            <img src={settings.blog_hero_image} alt={settings.blog_hero_title || "Banner Blog"} className="absolute inset-0 w-full h-full object-cover opacity-35 z-0" />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,154,122,0.18),transparent_60%)] z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
            <div className="max-w-5xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold mb-4 font-semibold">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-white">{settings.blog_hero_breadcrumb ?? "Tin tức & Sự kiện"}</span>
              </div>
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-wide">
                {settings.blog_hero_title ?? "Góc Chuyên Gia & Tin Tức"}
              </h1>
              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light max-w-3xl">
                {settings.blog_hero_desc ?? "Nơi hội tụ các phân tích chuyên sâu về y học thẩm mỹ, cập nhật công nghệ nâng cơ trẻ hóa thế hệ mới và các hoạt động cộng đồng nổi bật của Theq."}
              </p>
            </div>
          </div>
        </section>

        {/* Categories Tab and Filtered Content Grid */}
        <section className="py-16 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            
            {/* Category Navigation Tabs & Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 border-b border-gray-200/60 pb-4 select-none">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 text-xs md:text-sm font-serif font-bold uppercase tracking-wider transition-all duration-300 pb-4 -mb-[17px] ${
                      selectedCategory === cat
                        ? "text-gold font-bold"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && (
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gold rounded-full transition-all duration-300" />
                    )}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm bài viết, chủ đề, tác giả..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:border-gold rounded-full text-xs text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm transition-colors"
                />
              </div>
            </div>

            {/* Featured Post (Hero Layout) */}
            {featuredPost && (
              <div className="mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center bg-white rounded-[32px] p-6 md:p-8 border border-gold/15 shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
                  {/* Left Column: Image wrapper */}
                  <Link 
                    href={`/tin-tuc/${featuredPost.slug}`} 
                    className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 block group"
                  >
                    <Image
                      src={featuredPost.img}
                      alt={featuredPost.imgAlt || featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-gold text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {featuredPost.category}
                    </div>
                  </Link>

                  {/* Right Column: Information */}
                  <div className="lg:col-span-5 flex flex-col justify-center py-4">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-light">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gold" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={13} className="text-gold" />
                        <span>{featuredPost.author}</span>
                      </div>
                    </div>

                    <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-4 leading-tight hover:text-gold transition-colors">
                      <Link href={`/tin-tuc/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h2>

                    <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed mb-6">
                      {featuredPost.desc}
                    </p>

                    <Link 
                      href={`/tin-tuc/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-bold text-xs uppercase tracking-widest transition-colors w-fit"
                    >
                      Đọc bài viết đầy đủ <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-heading for regular posts */}
            {regularArticles.length > 0 && (
              <div className="flex items-center gap-4 mb-10 text-left">
                <span className="font-serif font-bold text-lg md:text-xl text-gray-800">Các Tin Tức Khác</span>
                <div className="flex-grow h-[1px] bg-gray-200" />
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {regularArticles.map((art) => (
                <article
                  key={art.title}
                  className="bg-white border border-gold/10 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col text-left group"
                >
                  {/* Image */}
                  <Link 
                    href={`/tin-tuc/${art.slug}`} 
                    className="relative aspect-[16/10] w-full bg-gray-100 block overflow-hidden"
                  >
                    <Image
                      src={art.img}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 text-gray-700 text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
                      {art.category}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-4 font-light">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} className="text-gold/80" />
                        <span>{art.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={13} className="text-gold/80" />
                        <span>{art.author}</span>
                      </div>
                    </div>

                    {/* Heading */}
                    <h3 className="font-serif font-bold text-lg md:text-xl text-gray-800 mb-3 group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                      <Link href={`/tin-tuc/${art.slug}`}>{art.title}</Link>
                    </h3>

                    {/* Desc */}
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                      {art.desc}
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

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-300">
                <p className="text-sm font-light">Không tìm thấy bài viết nào phù hợp với bộ lọc hiện tại.</p>
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
