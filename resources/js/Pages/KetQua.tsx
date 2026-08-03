import React from "react";
import Image from "@/Components/Image";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ConsultLocations } from "@/Components/ConsultLocations";
import { FAQ } from "@/Components/FAQ";
import { ChevronRight } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
}

interface RealResultItem {
  id: number;
  category: string;
  title: string;
  detail: string;
  image: string;
  video?: string | null;
  is_video: boolean | number;
  order: number;
}

interface CaseItem {
  image: string;
  category: string;
}

interface KetQuaProps {
  faqs?: FAQItem[];
  realResults?: RealResultItem[];
}

export default function KetQuaPage({ faqs = [], realResults = [] }: KetQuaProps) {
  const [visibleCount, setVisibleCount] = React.useState(6);

  const defaultCases: CaseItem[] = [
    {
      image: "/images/Review-cay-toc-DHI-5-1.png",
      category: "Cấy tóc",
    },
    {
      image: "/images/Review-cay-toc-DHI-2-1.png",
      category: "Cấy tóc",
    },
    {
      image: "/images/Review-cay-toc-DHI-3-1.png",
      category: "Cấy tóc",
    },
    {
      image: "/images/mui-1.png",
      category: "KT YOUTH LINE",
    },
    {
      image: "/images/Pro-Lift.png",
      category: "KT PRO LIFT",
    },
    {
      image: "/images/Hya-2.png",
      category: "KT HYA RESHAPE",
    },
    {
      image: "/images/564628375_122249424116080096_6875006224343365252_n-1.jpg",
      category: "Cắt mí",
    },
  ];

  const cases: CaseItem[] = realResults.length > 0 
    ? realResults.map((res) => ({
        image: res.image || "/images/default-result.jpg",
        category: res.category || "Thẩm mỹ",
      })) 
    : defaultCases;

  const visibleCases = cases.slice(0, visibleCount);

  return (
    <><Head title="Kết Quả Thẩm Mỹ | KT Beauty" />
      <Header />
      <main className="flex-grow font-sans bg-white">
        {/* Banner/Hero */}
        <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
          <div className="absolute inset-0 w-full h-full opacity-50 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="Kết quả thẩm mỹ banner"
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
                <span className="text-white">Trước và sau</span>
              </div>
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-wide">
                Trước Và Sau
              </h1>
              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-205 leading-relaxed font-light max-w-3xl">
                Kết quả tại KT Beauty không chỉ là sự thay đổi bên ngoài, mà là sự nâng tầm thần thái và chất lượng cuộc sống. Mỗi hành trình được thực hiện với sự tận tâm và cam kết.
              </p>
            </div>
          </div>
        </section>

        {/* Results Showroom */}
        <section className="py-20 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                Tại KT Beauty Medical Centre, mỗi kết quả là sự kết hợp giữa chuyên môn, sự tinh chỉnh đúng mức và cam kết dài hạn, nhằm mang lại vẻ đẹp tự nhiên và bền vững.
              </div>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Hơn 10.000 khách hàng đã lựa chọn KT Beauty
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>

            {/* Cases Show Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCases.map((c, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-[22px] overflow-hidden border border-gray-150/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                >
                  {/* Aspect-square image container */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={`Khách hàng thực tế - ${c.category}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                  </div>
                  {/* Bottom Info bar */}
                  <div className="p-4 flex items-center justify-between text-xs font-semibold border-t border-gray-50 bg-white select-none">
                    <span className="text-[#AC9F91] uppercase tracking-wider font-semibold">Dịch vụ:</span>
                    <span className="text-[#303030] font-light">{c.category}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < cases.length && (
              <div className="flex justify-center mt-14">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-[12px] shadow-sm hover:shadow-md cursor-pointer bg-white"
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FAQs */}
        <FAQ faqs={faqs} />

        {/* Locations and Signups */}
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}
