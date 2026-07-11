"use client";

import React, { useState } from "react";
import { PhoneIcon } from "./icons";
import { MapPin, Clock, PhoneCall } from "lucide-react";

export const ConsultLocations: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setPhone("");
      setService("");
      setNote("");
      setSubmitted(false);
    }, 4000);
  };

  const branches = [
    {
      name: "KT Beauty Medical Centre - Sài Gòn",
      address: "386-388 Đường 3/2, Phường 12, Quận 10, TP. Hồ Chí Minh",
      hotline: "1900 5006",
      hours: "09:00 - 20:00 (Hằng ngày)",
    },
    {
      name: "Văn phòng hợp tác Úc Châu",
      address: "Suite 402, Level 4, 350 Collins Street, Melbourne, VIC 3000, Australia",
      hotline: "+61 405 888 999",
      hours: "09:00 - 17:30 (Thứ 2 - Thứ 6)",
    },
  ];

  return (
    <section id="consult" className="bg-light-bg py-20 px-4 md:px-[10%] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form (7/12 width) */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-lg shadow-lg border border-beige-bg text-left">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
            Đăng Ký Trực Tuyến
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark-bg mb-6">
            Tư Vấn Cùng Chuyên Gia Bác Sĩ
          </h2>
          <div className="w-10 h-[2px] bg-gold mb-8" />

          {submitted ? (
            <div className="bg-gold/10 border border-gold/30 text-dark-bg p-6 rounded-lg text-center">
              <h3 className="text-lg font-bold font-serif mb-2">Đăng ký thành công!</h3>
              <p className="text-sm font-light">
                Cảm ơn bạn đã lựa chọn KT Beauty. Đội ngũ tư vấn sẽ liên hệ lại với bạn qua số điện thoại sớm nhất có thể.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2 block">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ tên của bạn"
                    className="w-full border border-beige-bg focus:border-gold px-4 py-3 rounded text-sm placeholder-gray-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2 block">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="w-full border border-beige-bg focus:border-gold px-4 py-3 rounded text-sm placeholder-gray-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2 block">
                  Dịch vụ cần tư vấn
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-beige-bg focus:border-gold px-4 py-3 rounded text-sm text-gray-600 focus:outline-none transition-colors"
                >
                  <option value="">Chọn dịch vụ làm đẹp</option>
                  <option value="phau-thuat">Phẫu thuật thẩm mỹ</option>
                  <option value="cay-toc">Cấy tóc y khoa</option>
                  <option value="da-lieu">Da liễu thẩm mỹ</option>
                  <option value="noi-khoa">Thẩm mỹ nội khoa (Filler/Botox)</option>
                  <option value="cong-nghe-cao">Công nghệ cao nâng cơ trẻ hóa</option>
                  <option value="phun-xam">Phun xăm nghệ thuật</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2 block">
                  Ghi chú hoặc lời nhắn
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Mô tả mong muốn hoặc vấn đề của bạn"
                  rows={4}
                  className="w-full border border-beige-bg focus:border-gold px-4 py-3 rounded text-sm placeholder-gray-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-dark-bg hover:bg-gold text-white hover:text-white font-bold py-4 rounded transition-all duration-300 shadow-md text-sm uppercase tracking-wider"
              >
                Đăng Ký Tư Vấn Ngay
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Locations (5/12 width) */}
        <div className="lg:col-span-5 flex flex-col text-left">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
            Hệ Thống Chi Nhánh
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark-bg mb-6">
            Hệ Thống KT Beauty
          </h2>
          <div className="w-10 h-[2px] bg-gold mb-8" />

          {/* Branch Cards */}
          <div className="space-y-6">
            {branches.map((b) => (
              <div
                key={b.name}
                className="bg-white p-6 rounded-lg shadow-md border border-beige-bg"
              >
                <h3 className="font-serif font-bold text-base md:text-lg text-dark-bg mb-4 border-b border-gray-100 pb-2">
                  {b.name}
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 font-light">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <PhoneCall className="w-5 h-5 text-gold flex-shrink-0" />
                    <a href={`tel:${b.hotline.replace(/\s+/g, "")}`} className="hover:underline font-semibold">
                      {b.hotline}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                    <span>{b.hours}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
