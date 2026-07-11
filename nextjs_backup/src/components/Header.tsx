"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "./icons";
import { Menu, X, ChevronDown } from "lucide-react";

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Giới thiệu", href: "/#introduction" },
    {
      name: "Dịch vụ",
      href: "#",
      subLinks: [
        { name: "Phẫu thuật thẩm mỹ", href: "/phau-thuat-tham-my" },
        { name: "Cấy tóc y khoa", href: "/cay-toc-y-khoa" },
      ],
    },
    { name: "Kết quả", href: "/ket-qua" },
    { name: "Tin Tức", href: "/tin-tuc" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <header className="w-full z-[999] absolute top-0 left-0">
      {/* Top Announcement Bar */}
      <div className="w-full bg-dark-bg text-gold flex justify-between items-center px-4 md:px-[10%] py-2 text-xs md:text-sm font-sans tracking-wide">
        <span>Đội ngũ chuyên gia bác sĩ hàng đầu tại KT Beauty</span>
        <div className="flex items-center gap-1.5 font-semibold">
          <span>Đặt lịch tư vấn ngay:</span>
          <a href="tel:19005006" className="hover:underline flex items-center gap-1">
            <PhoneIcon size={14} className="inline-block" />
            1900 5006
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 bg-white shadow-md py-3 md:py-4 px-4 md:px-[10%] text-dark-bg"
            : "absolute top-10 left-0 bg-transparent py-4 md:py-6 px-4 md:px-[10%] text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative block h-10 w-44 md:w-56">
            <Image
              src={
                isSticky
                  ? "/images/LOGO-KT-NGANG-DEN-BAN-MOI-NHAT-07-2-1.png"
                  : "/images/LOGO-KT-NGANG-WHITE-BAN-MOI-NHAT-05-1-2048x541-1.png"
              }
              alt="KT Beauty Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-sans font-semibold text-xs xl:text-sm tracking-wide">
            {navLinks.map((link) => {
              if (link.subLinks) {
                return (
                  <div key={link.name} className="relative group py-2">
                    <button
                      className={`flex items-center gap-1 transition-colors duration-200 hover:text-pink focus:outline-none ${
                        isSticky ? "text-dark-bg" : "text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={14} />
                    </button>
                    {/* Dropdown Box */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-beige-bg rounded-md shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gold/10 hover:text-gold transition-colors duration-200 text-left font-sans font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-pink ${
                    isSticky ? "text-dark-bg" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Hotline CTA */}
          <div className="hidden lg:block">
            <a
              href="tel:19005006"
              className={`flex items-center gap-2 font-sans font-bold text-sm px-6 py-2 rounded-[10px] border transition-all duration-300 ${
                isSticky
                  ? "border-dark-bg text-dark-bg hover:bg-dark-bg hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-dark-bg"
              }`}
            >
              <PhoneIcon size={14} />
              <span>Gọi ngay</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={28} className={isSticky ? "text-dark-bg" : "text-white"} />
            ) : (
              <Menu size={28} className={isSticky ? "text-dark-bg" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed inset-0 top-[104px] bg-dark-bg/95 z-[998] transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 py-8 px-6 font-sans text-lg font-medium text-white tracking-wide">
          {navLinks.map((link) => {
            if (link.subLinks) {
              return (
                <div key={link.name} className="flex flex-col items-center">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="flex items-center gap-1 hover:text-gold transition-colors duration-200 text-lg font-medium text-white focus:outline-none"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform duration-200 ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isMobileServicesOpen && (
                    <div className="flex flex-col items-center gap-4 mt-3 pl-4 border-l border-white/10">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileServicesOpen(false);
                          }}
                          className="text-base text-gray-300 hover:text-gold transition-colors duration-200"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold transition-colors duration-200"
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="tel:19005006"
            className="mt-4 border border-white hover:bg-white hover:text-dark-bg text-white w-full text-center py-3 rounded-[10px] font-bold transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <PhoneIcon size={16} />
            <span>Gọi ngay</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
