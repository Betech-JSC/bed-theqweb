import React from "react";
import Image from "@/Components/Image";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ConsultLocations } from "@/Components/ConsultLocations";
import { FAQ } from "@/Components/FAQ";
import { ChevronRight, Calendar, User, ArrowRight } from "lucide-react";

interface DbArticle {
  title: string;
  slug?: string | null;
  description?: string;
  image?: string;
  published_date?: string;
  author?: any;
  legacy_author?: string | null;
  category?: string;
}

export default function TinTucPage({ initialArticles }: { initialArticles?: DbArticle[] }) {
  const staticArticles = [
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

  const articles = (initialArticles && initialArticles.length > 0)
    ? initialArticles.map(a => {
        let displayAuthor = "KT Beauty";
        if (a.author && typeof a.author === "object") {
          displayAuthor = a.author.name || "KT Beauty";
        } else if (typeof a.author === "string" && a.author.trim() !== "") {
          displayAuthor = a.author;
        } else if (a.legacy_author) {
          displayAuthor = a.legacy_author;
        }
        return {
          title: a.title,
          desc: a.description || "",
          img: a.image || "/images/default-blog.jpg",
          date: a.published_date || "",
          author: displayAuthor,
          slug: a.slug || "",
          category: a.category || "Chuyên môn",
        };
      })
    : staticArticles.map((s, idx) => ({
        title: s.title,
        desc: s.desc,
        img: s.img,
        date: s.date,
        author: s.author,
        slug: s.title.includes("mắt") 
          ? "tham-my-vung-mat-khi-nao-can-can-thiep-giai-phap-phu-hop"
          : (s.title.includes("trải nghiệm trẻ hóa") 
             ? "dieu-gi-tao-nen-mot-trai-nghiem-tre-hoa-thuc-su-khac-biet" 
             : "kt-beauty-chao-don-cong-nghe-tre-hoa-the-he-moi-trong-thang-072026"),
        category: s.title.includes("thiện nguyện") || s.title.includes("MasterClass") ? "Hoạt động" : (s.title.includes("Workshop") || s.title.includes("Ultherapy") || s.title.includes("Hội thảo") ? "Sự kiện" : "Chuyên môn")
      }));

  const [selectedCategory, setSelectedCategory] = React.useState("Tất cả");

  const filteredArticles = selectedCategory === "Tất cả"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const featuredPost = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const regularArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  return (
    <>
      <Head title="Tin Tức & Hoạt Động | KT Beauty" />
      <Header />
      
      <main className="flex-grow font-sans bg-gray-55/40">
        {/* Banner/Hero Banner */}
        <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
          <div className="absolute inset-0 w-full h-full opacity-40 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="Tin tức thẩm mỹ banner"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-55/40 via-dark-bg/60 to-transparent z-10" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
            <div className="max-w-5xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold mb-4 font-semibold">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-white">Tin tức & Sự kiện</span>
              </div>
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-wide">
                Góc Chuyên Gia & Tin Tức
              </h1>
              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light max-w-3xl">
                Nơi hội tụ các phân tích chuyên sâu về y học thẩm mỹ, cập nhật công nghệ nâng cơ trẻ hóa thế hệ mới và các hoạt động cộng đồng nổi bật của KT Beauty.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Tab and Filtered Content Grid */}
        <section className="py-16 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            
            {/* Category Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-16 border-b border-gray-200/60 pb-3 select-none">
              {["Tất cả", "Chuyên môn", "Sự kiện", "Hoạt động"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 text-xs md:text-sm font-serif font-bold uppercase tracking-wider transition-all duration-300 pb-4 -mb-[13px] ${
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
                      alt={featuredPost.title}
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
                <p className="text-sm font-light">Hiện chưa có bài viết nào thuộc chuyên mục này.</p>
              </div>
            )}

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
