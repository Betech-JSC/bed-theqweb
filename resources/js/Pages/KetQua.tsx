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
  title: string;
  desc: string;
  image?: string;
  images?: string[];
  video?: string | null;
  is_video?: boolean | number;
  type: string;
}

interface KetQuaProps {
  faqs?: FAQItem[];
  realResults?: RealResultItem[];
}

export default function KetQuaPage({ faqs = [], realResults = [] }: KetQuaProps) {
  const defaultCases: CaseItem[] = [
    {
      title: "Cấy Tóc Y Khoa Tự Thân",
      desc: "Phục hồi mật độ nang tóc khỏe mạnh, hạ trán hói chữ M giúp gương mặt trẻ trung tự nhiên.",
      images: [
        "/images/Review-cay-toc-DHI-5-1.png",
        "/images/Review-cay-toc-DHI-2-1.png",
        "/images/Review-cay-toc-DHI-3-1.png",
      ],
      type: "grid",
    },
    {
      title: "Nâng Mũi Cấu Trúc | KT Youth Line",
      desc: "Kiến tạo dáng mũi cao thanh tú tự nhiên, khắc phục tình trạng mũi tẹt, cánh mũi rộng bè.",
      image: "/images/mui-1.png",
      type: "single",
    },
    {
      title: "Nâng Cơ Trẻ Hóa | KT Pro Lift",
      desc: "Căng da nâng cơ đa tầng, đẩy lùi lão hóa, làm mờ rãnh cười sâu không qua phẫu thuật.",
      image: "/images/Pro-Lift.png",
      type: "single",
    },
    {
      title: "Tạo Hình Tỷ Lệ Vàng | KT Hya Reshape",
      desc: "Sử dụng tinh chất làm đầy sinh học cao cấp giúp cân chỉnh đường nét cằm, má hóp hài hòa.",
      image: "/images/Hya-2.png",
      type: "single",
    },
    {
      title: "Cắt Mí Thẩm Mỹ | KT Eyeluxe",
      desc: "Loại bỏ hoàn toàn da chùng mỡ thừa mí mắt trên/dưới, kiến tạo nếp mí đôi sâu rõ nét.",
      image: "/images/564628375_122249424116080096_6875006224343365252_n-1.jpg",
      type: "single",
    },
  ];

  const cases: CaseItem[] = realResults.length > 0 ? realResults.map((res) => ({
    title: res.title,
    desc: res.detail,
    image: res.image,
    video: res.video,
    is_video: res.is_video,
    type: "single"
  })) : defaultCases;

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
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Khách Hàng Thực Tế
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Hơn 10.000 Khách Hàng Tin Chọn
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>

            {/* Cases Show */}
            <div className="space-y-24">
              {cases.map((c, idx) => (
                <div key={c.title} className="border-b border-beige-bg pb-16 last:border-0 last:pb-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
                    {/* Left Info Column */}
                    <div className="lg:col-span-4">
                      <span className="text-gold font-bold font-serif text-xl mb-1 block">
                        Case 0{idx + 1}.
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-dark-bg mb-4">
                        {c.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed mb-6">
                        {c.desc}
                      </p>
                      <a
                        href="#consult"
                        className="inline-block bg-gold hover:bg-gold-dark text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded transition-colors duration-200"
                      >
                        Đặt Lịch Tư Vấn Tương Tự
                      </a>
                    </div>

                    {/* Right Images Column */}
                    <div className="lg:col-span-8">
                      {c.type === "grid" && c.images ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {c.images.map((img, i) => (
                            <div
                              key={i}
                              className="relative aspect-square w-full rounded-lg overflow-hidden shadow-md border border-beige-bg hover:scale-102 transition-transform duration-300"
                            >
                              <Image
                                src={img}
                                alt={`${c.title} review ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        c.image && (
                          <div className="relative aspect-[16/10] sm:aspect-[2/1] w-full rounded-lg overflow-hidden shadow-md border border-beige-bg hover:scale-101 transition-transform duration-500">
                            <Image
                              src={c.image}
                              alt={c.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
