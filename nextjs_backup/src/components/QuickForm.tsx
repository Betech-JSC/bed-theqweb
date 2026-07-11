"use client";

import React, { useState } from "react";

export const QuickForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setPhone("");
      setService("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="bg-dark-bg text-white py-12 px-4 md:px-[10%] font-sans relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Callouts */}
        <div className="text-left max-w-md">
          <h3 className="text-xl md:text-2xl font-bold font-serif mb-2">
            Đăng ký tư vấn miễn phí
          </h3>
          <p className="text-sm text-gray-300 font-light leading-relaxed">
            Nhận cuộc gọi tư vấn trực tiếp từ bác sĩ chuyên khoa đầu ngành trong vòng 15 phút.
          </p>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-auto flex-grow max-w-3xl grid grid-cols-1 sm:grid-cols-4 gap-4 items-center"
        >
          <div className="sm:col-span-1">
            <input
              type="text"
              placeholder="Họ và tên *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 focus:border-gold px-4 py-3 rounded text-white placeholder-gray-400 focus:outline-none transition-colors text-sm"
              required
            />
          </div>
          <div className="sm:col-span-1">
            <input
              type="tel"
              placeholder="Số điện thoại *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/10 border border-white/20 focus:border-gold px-4 py-3 rounded text-white placeholder-gray-400 focus:outline-none transition-colors text-sm"
              required
            />
          </div>
          <div className="sm:col-span-1">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-white/10 border border-white/20 focus:border-gold px-4 py-3 rounded text-white focus:outline-none transition-colors text-sm"
            >
              <option value="" className="bg-dark-bg text-gray-400">Chọn dịch vụ</option>
              <option value="phau-thuat" className="bg-dark-bg text-white">Phẫu thuật thẩm mỹ</option>
              <option value="da-lieu" className="bg-dark-bg text-white">Da liễu thẩm mỹ</option>
              <option value="phun-xam" className="bg-dark-bg text-white">Phun xăm nghệ thuật</option>
              <option value="khac" className="bg-dark-bg text-white">Dịch vụ khác</option>
            </select>
          </div>
          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-3 rounded transition-colors duration-200 text-sm shadow-md"
            >
              {submitted ? "Đã Gửi Thành Công!" : "Gửi Đăng Ký"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
