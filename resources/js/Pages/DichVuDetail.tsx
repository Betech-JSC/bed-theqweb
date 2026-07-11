import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ChevronRight, DollarSign, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "@/Components/Image";

interface ServiceItem {
  id: number;
  name: string;
  category: string;
  price?: string | null;
  description?: string | null;
  image?: string | null;
  banner_image?: string | null;
  slug?: string | null;
  pillars?: Array<{ title: string; desc: string; img: string }> | null;
  reviews?: string[] | null;
  before_after?: Array<{ title: string; before: string; after: string; desc: string }> | null;
}

interface DichVuDetailProps {
  service: ServiceItem;
}

export default function DichVuDetail({ service }: DichVuDetailProps) {
  const { data, setData, post, processing, reset, wasSuccessful } = useForm({
    name: "",
    phone: "",
    email: "",
    branch: "",
    service: service.name, // Pre-fill with current service!
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    post("/consult", {
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  };

  return (
    <>
      <Head title={`${service.name} | KT Beauty`} />
      <Header />

      {/* Banner/Hero */}
      <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
        <div className="absolute inset-0 w-full h-full opacity-40 z-1">
          <Image
            src={service.banner_image || service.image || "/images/Ban-banner-web-3-1.png"}
            alt={service.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
          <div className="max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold mb-3 font-semibold">
              <Link href="/" className="hover:underline text-gold">Trang chủ</Link>
              <ChevronRight size={12} className="text-gray-400" />
              <Link href="/dich-vu" className="hover:underline text-gold">Dịch vụ</Link>
              <ChevronRight size={12} className="text-gray-400" />
              <span className="text-white truncate max-w-[200px] md:max-w-sm">{service.name}</span>
            </div>

            {/* Category Tag */}
            <span className="inline-block bg-gold/20 text-gold text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-4 border border-gold/30 backdrop-blur-sm">
              {service.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              {service.name}
            </h1>

            {/* Price Details */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-gold text-sm font-bold mt-2">
              <DollarSign size={16} />
              <span>Giá dịch vụ: {service.price || "Liên hệ nhận báo giá"}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow font-sans bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-[10%]">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Service Details (7/12 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-gold/15 shadow-sm text-left">
              {/* Service Description content */}
              <h3 className="text-lg font-serif font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Sparkles size={16} className="text-gold" /> Chi tiết về liệu trình điều trị
              </h3>
              
              <div className="text-sm md:text-base text-gray-650 font-light leading-relaxed space-y-6 rich-text-content">
                {service.description ? (
                  <div dangerouslySetInnerHTML={{ __html: service.description }} />
                ) : (
                  <p>Chi tiết dịch vụ đang được cập nhật. Vui lòng gửi liên hệ đăng ký tư vấn để nhận được các thông tin chi tiết và chính xác nhất từ hội đồng bác sĩ chuyên khoa của chúng tôi.</p>
                )}
              </div>

              {/* Commitment highlights */}
              <div className="mt-10 p-6 bg-gold/5 rounded-2xl border border-gold/10">
                <h4 className="font-bold text-gray-800 text-sm mb-3">KT Beauty Medical Centre Cam Kết:</h4>
                <ul className="space-y-2 text-xs md:text-sm text-gray-500 font-light">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                    <span>100% quy trình được thực hiện chuẩn y khoa, vô khuẩn tuyệt đối.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                    <span>Đội ngũ bác sĩ CKI giàu kinh nghiệm trực tiếp thăm khám và tư vấn.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                    <span>Sử dụng máy móc công nghệ cao đạt tiêu chuẩn FDA quốc tế.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Dynamic Form Registration Card (5/12 cols) */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-3xl p-8 shadow-xl text-gray-800 border border-gold/20 relative overflow-hidden text-left">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

                <h3 className="text-xl font-serif font-bold text-gray-800 text-center mb-1.5">
                  Đăng Ký Tư Vấn Ngay
                </h3>
                <p className="text-xs text-gray-400 font-light text-center mb-6 max-w-xs mx-auto">
                  Vui lòng để lại thông tin của bạn. Trợ lý bác sĩ sẽ liên hệ hỗ trợ trong vòng 15 phút.
                </p>

                {wasSuccessful ? (
                  <div className="py-12 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">Đăng Ký Thành Công!</h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[240px] mx-auto">
                      Cảm ơn bạn đã lựa chọn dịch vụ của KT Beauty. Chúng tôi sẽ gọi lại sớm nhất.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Họ và tên *</label>
                      <input
                        type="text"
                        placeholder="Nhập họ tên của bạn"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Số điện thoại *</label>
                      <input
                        type="tel"
                        placeholder="Nhập số điện thoại của bạn"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Email (Không bắt buộc)</label>
                      <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                      />
                    </div>

                    {/* Branch select */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Cơ sở tư vấn *</label>
                      <div className="relative">
                        <select
                          value={data.branch}
                          onChange={(e) => setData("branch", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-700 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Chọn chi nhánh gần bạn *</option>
                          <option value="KT Beauty - Sài Gòn">KT Beauty - Sài Gòn</option>
                          <option value="Văn phòng hợp tác Úc Châu">Văn phòng hợp tác Úc Châu</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Pre-selected Service display */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Dịch vụ quan tâm</label>
                      <input
                        type="text"
                        disabled
                        value={data.service}
                        className="w-full bg-gray-100 border border-gray-200 px-4 py-3 rounded-xl text-gray-500 text-sm cursor-not-allowed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-gold/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                      >
                        {processing ? "Đang gửi đăng ký..." : "Gửi Đăng Ký Tư Vấn"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Pillars / Process Detail Section */}
          {service.pillars && service.pillars.length > 0 && (
            <section className="py-16 border-t border-gray-200 mt-16 text-left">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                  Quy Trình Chuẩn Y Khoa
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-dark-bg">
                  Các Bước Liệu Trình Điều Trị
                </h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
              </div>

              <div className="space-y-16">
                {service.pillars.map((p, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center text-left ${
                      idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image */}
                    {p.img && (
                      <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-beige-bg bg-white">
                        <Image
                          src={p.img}
                          alt={p.title}
                          fill
                          className="object-cover hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                    )}
                    {/* Content */}
                    <div className="w-full lg:w-1/2 space-y-3">
                      <span className="text-gold font-bold font-serif text-2xl block">
                        0{idx + 1}.
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-dark-bg">
                        {p.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews Testimonial Section */}
          {service.reviews && service.reviews.length > 0 && (
            <section className="py-16 border-t border-gray-200 mt-16 text-left">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                  Phản Hồi Thực Tế
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-dark-bg">
                  Khách Hàng Nói Gì Sau Khi Trải Nghiệm?
                </h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md border border-beige-bg bg-white hover:scale-102 transition-transform duration-300"
                  >
                    <Image
                      src={r}
                      alt={`Đánh giá từ khách hàng ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Before/After Section */}
          {service.before_after && service.before_after.length > 0 && (
            <section className="py-16 border-t border-gray-200 mt-16 text-left">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                  Kết Quả Thực Tế
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-dark-bg">
                  Hình Ảnh Trước & Sau Điều Trị
                </h2>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.before_after.map((res, i) => (
                  <div
                    key={i}
                    className="bg-white border border-beige-bg rounded-2xl overflow-hidden shadow-md flex flex-col text-left hover:-translate-y-1 transition-all duration-300"
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

                    {/* Content */}
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
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
