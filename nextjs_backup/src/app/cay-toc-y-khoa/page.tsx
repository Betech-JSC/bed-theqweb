import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsultLocations } from "@/components/ConsultLocations";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Cấy Tóc Y Khoa Tự Nhiên | KT Beauty Medical Centre",
  description: "KT Beauty Medical Centre cung cấp dịch vụ cấy tóc y khoa tự thân với định hướng mật độ tự nhiên, thiết kế đường tóc cá nhân hóa.",
};

export default function CayTocYKhoaPage() {
  const pillars = [
    {
      title: "Thiết kế đường tóc cá nhân hóa",
      desc: "Đường tóc được thiết kế riêng biệt dựa trên tỷ lệ trán, khuôn mặt, độ tuổi và hướng mọc tự nhiên giúp tạo cảm giác cân đối lâu dài.",
      img: "/images/Hinh-web-3-1.png",
    },
    {
      title: "Phân tích nang tóc chuyên sâu",
      desc: "Đánh giá chất lượng nang tóc và mật độ vùng hiến tóc nhằm tối ưu hóa tỷ lệ sinh trưởng và mật độ phân bổ sau cấy.",
      img: "/images/Hinh-web-1-1.png",
    },
    {
      title: "Quy trình xử lý nang tóc chuẩn xác",
      desc: "Nang tóc sau tách được bảo quản trong dung dịch nuôi dưỡng chuyên biệt dưới kính hiển vi điện tử độ phóng đại cao.",
      img: "/images/Hinh-web-6-1.png",
    },
    {
      title: "Theo dõi phục hồi sau cấy",
      desc: "Khách hàng được hướng dẫn chăm sóc chuyên biệt từng ngày và theo dõi sát sao tiến độ mọc tóc định kỳ 1-3-6-9-12 tháng.",
      img: "/images/Hinh-web-8-1.png",
    },
    {
      title: "Đồng hành dài hạn",
      desc: "Không gian phòng khám vô trùng riêng tư, chuyên nghiệp. KT Beauty cam kết đồng hành từ tư vấn tới hậu phẫu trọn đời.",
      img: "/images/Hinh-web-9-1.png",
    },
  ];

  const reviews = [
    "/images/Review-cay-toc-DHI-3-1.png",
    "/images/Review-cay-toc-DHI-5-1.png",
    "/images/Review-cay-toc-DHI-2-1.png",
  ];

  const results = [
    {
      id: "case1",
      title: "Khách hàng L.H.N",
      before: "/images/before-LHN-1-1.png",
      after: "/images/after-LHN-1-1.png",
      desc: "Cấy tóc vùng trán hói chữ M, khôi phục đường tóc dày dặn nam tính sau 6 tháng.",
    },
    {
      id: "case2",
      title: "Khách hàng N.T.T",
      before: "/images/before-NTT-1-1.png",
      after: "/images/after-NTT-1-1.png",
      desc: "Cải thiện mật độ tóc đỉnh đầu thưa rụng nhiều, nang tóc mọc dày ổn định.",
    },
    {
      id: "case3",
      title: "Khách hàng Nữ - Cấy hạ đường chân tóc",
      before: "/images/before-custumor-1-1.png",
      after: "/images/after-custumor-1-1.png",
      desc: "Hạ đường chân tóc trán sân bay tạo tỷ lệ mặt thanh thoát mềm mại nữ tính.",
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
              alt="Cấy tóc y khoa banner"
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
                <span className="text-white">Cấy tóc y khoa</span>
              </div>
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                Cấy Tóc Y Khoa
              </h1>
              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl font-light">
                KT Beauty Medical Centre ứng dụng mô hình cấy tóc y khoa hiện đại với định hướng tập trung vào độ tự nhiên, mật độ hài hòa và tính thẩm mỹ lâu dài.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 px-4 md:px-[10%] bg-light-bg">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div>
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Công Nghệ Tự Thân
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark-bg mb-6">
                Cấy Tóc Tự Thân Hướng Đến Sự Tự Nhiên Lâu Dài
              </h2>
              <div className="w-10 h-[2.5px] bg-gold mb-6" />
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light mb-6">
                Cấy tóc tự thân là phương pháp sử dụng chính nang tóc khỏe mạnh sau gáy của khách hàng để phục hồi các vùng tóc thưa, hói hoặc hạ đường chân tóc thiếu cân đối. Tại KT Beauty, mỗi nang tóc sau cấy được định hướng hài hòa và mọc theo hướng tự nhiên nhất.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
                Quy trình cấy tóc được thực hiện trong môi trường chuẩn y khoa với định hướng hạn chế xâm lấn tối thiểu, chú trọng độ chính xác cao trong quá trình tách lọc và cấy nang tóc.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl border border-beige-bg">
              <Image
                src="/images/BA-HOC-NHAN-1.png"
                alt="Hair Transplant Process Room"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Process Detail */}
        <section className="py-20 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Sự Khác Biệt
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Điều Tạo Nên Dịch Vụ Cấy Tóc Tại KT Beauty
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>

            <div className="space-y-16">
              {pillars.map((p, idx) => (
                <div
                  key={p.title}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center text-left ${
                    idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-lg overflow-hidden shadow-lg border border-beige-bg">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <span className="text-gold font-bold font-serif text-2xl mb-2 block">
                      0{idx + 1}.
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-dark-bg mb-4">
                      {p.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Feedback */}
        <section className="py-20 px-4 md:px-[10%] bg-light-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Đánh Giá Thực Tế
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Khách Hàng Nói Gì Sau Hành Trình Cấy Tóc?
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="relative aspect-square w-full rounded-lg overflow-hidden shadow-md border border-beige-bg bg-white hover:scale-102 transition-transform duration-300"
                >
                  <Image
                    src={r}
                    alt={`Review khách hàng cấy tóc ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After comparisons */}
        <section className="py-20 px-4 md:px-[10%]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Kết Quả Thực Tế
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Hình Ảnh Trước & Sau Thực Tế
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {results.map((res) => (
                <div
                  key={res.id}
                  className="bg-white border border-beige-bg rounded-lg overflow-hidden shadow-md flex flex-col text-left hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Split images side by side */}
                  <div className="grid grid-cols-2 relative bg-gray-100 aspect-square">
                    <div className="relative w-full h-full border-r border-white">
                      <Image
                        src={res.before}
                        alt="Trước"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/60 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded">
                        Trước
                      </div>
                    </div>
                    <div className="relative w-full h-full">
                      <Image
                        src={res.after}
                        alt="Sau"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-gold/90 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded">
                        Sau
                      </div>
                    </div>
                  </div>

                  {/* Desc content */}
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-base text-dark-bg mb-2">
                      {res.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                      {res.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consult form and branches */}
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}
