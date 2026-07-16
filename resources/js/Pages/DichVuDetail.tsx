import React from "react";
import { Link, Head, useForm, usePage } from "@inertiajs/react";
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
  db_reviews?: any[] | null;
}

interface DichVuDetailProps {
  service: ServiceItem;
}

export default function DichVuDetail({ service }: DichVuDetailProps) {
  const { props } = usePage();
  const doctors = (props.doctors as Array<{ id: number; name: string; role: string }>) || [];

  const dbReviews = service.db_reviews || [];
  const reviewsCount = dbReviews.length;
  const averageRating = reviewsCount > 0 
    ? (dbReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewsCount).toFixed(1)
    : "5.0";

  const starCounts = [0, 0, 0, 0, 0];
  dbReviews.forEach((r: any) => {
    const starIndex = Math.min(Math.max(1, r.rating), 5) - 1;
    starCounts[starIndex]++;
  });
  const getPercentage = (count: number) => {
    return reviewsCount > 0 ? Math.round((count / reviewsCount) * 100) : 0;
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarBg = (name: string) => {
    const colors = [
      "bg-red-50 text-red-500 border-red-100",
      "bg-blue-50 text-blue-500 border-blue-100",
      "bg-green-50 text-green-500 border-green-100",
      "bg-yellow-50 text-yellow-500 border-yellow-100",
      "bg-purple-50 text-purple-500 border-purple-100",
      "bg-pink-50 text-pink-500 border-pink-100",
      "bg-indigo-50 text-indigo-500 border-indigo-100"
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const { data, setData, post, processing, reset, wasSuccessful } = useForm({
    name: "",
    phone: "",
    email: "",
    branch: "",
    service: service.name, // Pre-fill with current service!
    booking_date: "",
    booking_time: "",
  });

  const reviewForm = useForm({
    service_id: service.id,
    name: "",
    rating: 5,
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    post("/consult", {
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.data.name || !reviewForm.data.comment) return;
    reviewForm.post("/api/reviews", {
      onSuccess: () => {
        reviewForm.reset("name", "comment", "rating");
      },
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

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full text-white text-left">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Service Details (7/12 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-gold/15 shadow-sm text-left">
              {/* Service Description content */}
              <h3 className="text-lg font-serif font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Sparkles size={16} className="text-gold" /> Chi tiết về liệu trình điều trị
              </h3>
              
              <div className="text-sm md:text-base text-gray-655 font-light leading-relaxed space-y-6 rich-text-content">
                {service.description ? (
                  <div dangerouslySetInnerHTML={{ __html: service.description }} />
                ) : (
                  <p>Chi tiết dịch vụ đang được cập nhật. Vui lòng gửi liên hệ đặt lịch khám để nhận được các thông tin chi tiết và chính xác nhất từ hội đồng bác sĩ chuyên khoa của chúng tôi.</p>
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
                  Đặt Lịch Khám & Hẹn Ngay
                </h3>
                <p className="text-xs text-gray-400 font-light text-center mb-6 max-w-xs mx-auto">
                  Vui lòng để lại thông tin. Chúng tôi sẽ liên hệ để xác nhận lịch hẹn của bạn trong thời gian sớm nhất.
                </p>

                {wasSuccessful ? (
                  <div className="py-12 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="font-bold text-gray-800 text-base mb-1.5">Đặt Lịch Thành Công!</h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[240px] mx-auto">
                      Cảm ơn bạn đã lựa chọn dịch vụ của KT Beauty. Yêu cầu đặt lịch hẹn của bạn đã được ghi nhận thành công.
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
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Cơ sở thăm khám *</label>
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

                    {/* Booking Date */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Ngày hẹn khám mong muốn *</label>
                      <input
                        type="date"
                        value={data.booking_date}
                        onChange={(e) => setData("booking_date", e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    {/* Booking Time */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">Khung giờ hẹn mong muốn *</label>
                      <div className="relative">
                        <select
                          value={data.booking_time}
                          onChange={(e) => setData("booking_time", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-700 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Chọn khung giờ khám *</option>
                          {["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}                        </select>
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
                        className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-gold/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
                      >
                        Đặt Lịch Khám Ngay
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
          <section className="py-16 border-t border-gray-200 mt-16 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Reviews List (7/12 cols) */}
              <div className="lg:col-span-7 space-y-8">
                <div className="mb-8">
                  <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                    Phản Hồi Từ Khách Hàng
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-dark-bg">
                    Đánh Giá Trải Nghiệm Thực Tế
                  </h2>
                  <div className="w-12 h-[2px] bg-gold mt-4" />
                </div>

                {/* Statistics Overview Card */}
                {dbReviews.length > 0 && (
                  <div className="bg-gradient-to-br from-gold/5 via-gold/[0.02] to-transparent p-6 md:p-8 rounded-[28px] border border-gold/15 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left mb-8">
                    {/* Big Score */}
                    <div className="md:col-span-4 text-center md:border-r border-gold/10 md:pr-6 space-y-2">
                      <div className="text-4xl md:text-5xl font-serif font-black text-gray-800 leading-none">
                        {averageRating}
                      </div>
                      <div className="flex justify-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-4.5 h-4.5 fill-current ${i < Math.round(Number(averageRating)) ? 'text-amber-400' : 'text-gray-200'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        {reviewsCount} đánh giá
                      </p>
                    </div>

                    {/* Progress bars (8/12 cols) */}
                    <div className="md:col-span-8 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = starCounts[star - 1];
                        const pct = getPercentage(count);
                        return (
                          <div key={star} className="flex items-center gap-3 text-[11px]">
                            <span className="font-bold text-gray-500 w-3 text-right">{star}</span>
                            <svg className="w-3 h-3 text-amber-400 fill-current shrink-0" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-gray-400 font-light w-8 text-right">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Display DB Reviews */}
                {dbReviews.length > 0 ? (
                  <div className="space-y-6">
                    {dbReviews.map((rev: any) => {
                      const colorClass = getAvatarBg(rev.name);
                      return (
                        <div key={rev.id} className="bg-white p-6 rounded-[24px] border border-gray-150 shadow-xs hover:shadow-md transition-shadow duration-300 text-left flex gap-4 items-start">
                          {/* Avatar Initials */}
                          <div className={`w-11 h-11 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${colorClass}`}>
                            {getInitials(rev.name)}
                          </div>
                          
                          <div className="flex-grow space-y-2">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-gray-800 text-sm">{rev.name}</span>
                                  <span className="inline-flex items-center gap-0.5 text-[8px] bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded-full border border-green-100 select-none">
                                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Đã kiểm chứng
                                  </span>
                                </div>
                                <span className="text-[10px] text-gray-400 font-light block mt-0.5">
                                  {new Date(rev.created_at).toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                              {/* Stars */}
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, starIdx) => (
                                  <svg key={starIdx} className={`w-3.5 h-3.5 fill-current ${starIdx < rev.rating ? 'text-amber-400' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed">
                              {rev.comment}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs font-light">
                    Chưa có đánh giá nào cho dịch vụ này. Hãy là người đầu tiên gửi phản hồi!
                  </div>
                )}

                {/* Display legacy/static reviews if available */}
                {service.reviews && service.reviews.length > 0 && (
                  <div className="mt-12 pt-10 border-t border-gray-150">
                    <h4 className="font-serif font-bold text-gray-700 text-sm mb-2 uppercase tracking-wider">
                      Hình ảnh khách hàng chia sẻ
                    </h4>
                    <p className="text-[11px] text-gray-400 font-light mb-6">
                      Hình ảnh chụp màn hình nhận xét/feedback thực tế do khách hàng gửi tặng sau khi trải nghiệm liệu trình.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {service.reviews.map((r, i) => (
                        <div
                          key={i}
                          className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-xs border border-gold/15 bg-white group cursor-pointer"
                        >
                          <Image src={r} alt={`Phản hồi khách hàng ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <span className="text-[9px] text-white font-bold bg-black/55 px-2.5 py-1.5 rounded-full border border-white/10 uppercase tracking-widest backdrop-blur-xs select-none">
                              Xem hình ảnh
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Leave Review Form (5/12 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-white p-8 rounded-[32px] border border-gold/15 shadow-sm text-left">
                  <h3 className="text-lg font-serif font-bold text-gray-800 mb-2">
                    Gửi Đánh Giá Của Bạn
                  </h3>
                  <p className="text-xs text-gray-400 font-light mb-6">
                    Ý kiến của bạn giúp chúng tôi cải thiện chất lượng dịch vụ tốt hơn.
                  </p>

                  {reviewForm.wasSuccessful ? (
                    <div className="py-8 text-center text-green-600 font-medium text-xs bg-green-50 border border-green-100 rounded-2xl animate-fade-in">
                      ✓ Đánh giá của bạn đã được gửi thành công và đang được kiểm duyệt!
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-5">
                      {/* Name */}
                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 block">Tên của bạn *</label>
                        <input
                          type="text"
                          placeholder="Nhập tên hiển thị"
                          value={reviewForm.data.name}
                          onChange={(e) => reviewForm.setData("name", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-2.5 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all text-xs font-medium"
                          required
                        />
                      </div>

                      {/* Rating (Stars Selector with modern SVG) */}
                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 block">Đánh giá sao *</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => reviewForm.setData("rating", star)}
                              className="cursor-pointer transition-transform duration-200 hover:scale-115 focus:outline-none"
                            >
                              <svg
                                className={`w-7 h-7 transition-colors ${
                                  star <= reviewForm.data.rating
                                    ? "text-amber-400 fill-current"
                                    : "text-gray-200 hover:text-amber-300 fill-current"
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Comment */}
                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 block">Bình luận phản hồi *</label>
                        <textarea
                          rows={4}
                          placeholder="Chia sẻ trải nghiệm thực tế của bạn về dịch vụ này..."
                          value={reviewForm.data.comment}
                          onChange={(e) => reviewForm.setData("comment", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-2.5 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all text-xs resize-none leading-relaxed font-light"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={reviewForm.processing}
                        className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-3 rounded-xl transition-all duration-300 text-xs shadow-xs cursor-pointer tracking-wider uppercase disabled:opacity-50"
                      >
                        {reviewForm.processing ? "Đang gửi..." : "Gửi Đánh Giá Ngay"}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </section>

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
