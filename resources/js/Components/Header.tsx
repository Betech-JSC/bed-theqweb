"use client";

import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Image from "@/Components/Image";
import { PhoneIcon } from "./icons";
import { Menu, X, ChevronDown } from "lucide-react";

interface HeaderProps {
  forceWhiteBg?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ forceWhiteBg = false }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const { url, props } = usePage();
  const menuCategories = (props.menu_categories as any[]) || [];
  const settings = (props.settings as Record<string, string>) || {};
  const hotline = settings.site_hotline || "19005006";

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
    { name: "Giới thiệu", href: "/gioi-thieu" },
    {
      name: "Dịch vụ",
      href: "/dich-vu",
      subLinks: menuCategories.map((cat) => ({
        name: cat.name,
        href: `/${cat.slug}`,
      })),
    },
    { name: "Kết quả", href: "/ket-qua" },
    { name: "Tin Tức", href: "/tin-tuc" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  const isActive = (href: string) => {
    return url === href || url.startsWith(href);
  };

  const isWhiteHeader = forceWhiteBg || isSticky || isHovered;

  return (
    <header className="w-full z-[999] absolute top-0 left-0">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#b09a7a] text-white flex justify-center items-center py-2 px-4 text-sm md:text-base font-sans tracking-wide">
        <div className="flex items-center gap-3 font-semibold">
          <span className="text-white tracking-wide text-xs md:text-sm">Đặt lịch khám ngay</span>
          <a
            href={`tel:${hotline}`}
            className="inline-flex items-center gap-1.5 bg-[#4d443c] text-white px-3 py-1 md:py-1.5 rounded-[8px] border border-white text-xs md:text-sm font-bold hover:bg-[#3d362f] transition-colors shadow-sm"
          >
            <PhoneIcon size={12} className="inline-block" />
            {hotline}
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 bg-white/95 backdrop-blur-md shadow-md py-3.5 md:py-4 px-4 md:px-[10%] text-dark-bg"
            : `relative py-6 md:py-8 px-4 md:px-[10%] ${
                (forceWhiteBg || isHovered)
                  ? "bg-white border-b border-gray-100 text-dark-bg shadow-sm"
                  : "bg-transparent text-white"
              }`
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative block h-16 w-56 md:w-72 flex items-center">
            {((isWhiteHeader ? settings.site_logo_dark : settings.site_logo_light)) ? (
              <Image
                src={isWhiteHeader ? settings.site_logo_dark : settings.site_logo_light}
                alt="Theq Logo"
                fill
                className="object-contain object-left"
                priority
              />
            ) : (
              <span className="font-serif font-bold text-lg md:text-xl text-gold uppercase tracking-wider">
                Theq
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 font-sans font-semibold text-sm xl:text-base tracking-wide h-full">
            {navLinks.map((link) => {
              if (link.subLinks) {
                const isServicesActive = url === "/dich-vu" || menuCategories.some((cat) => url.startsWith(`/${cat.slug}`));
                return (
                  <div key={link.name} className="group static flex items-center">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 relative py-1 transition-colors duration-200 focus:outline-none ${
                        isServicesActive
                          ? "text-gold"
                          : isWhiteHeader
                          ? "text-dark-bg hover:text-gold"
                          : "text-white hover:text-gold"
                      } after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] ${
                        isWhiteHeader ? "after:bg-dark-bg" : "after:bg-white"
                      } after:transition-transform after:duration-300 after:origin-center ${
                        isServicesActive ? "after:scale-x-100" : "after:scale-x-0 group-hover:after:scale-x-100"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-0 w-full bg-[#fcfcfc] border-t border-gray-150 shadow-xl py-12 px-6 md:px-[10%] grid grid-cols-1 md:grid-cols-4 gap-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-left before:absolute before:bottom-full before:left-0 before:w-full before:h-10 before:content-['']">
                      {menuCategories.slice(0, 3).map((category: any) => (
                        <div key={category.id}>
                          <Link href={`/${category.slug}`} className="font-serif font-bold text-gray-800 text-base hover:text-gold block mb-4 border-b border-gray-100 pb-2">
                            {category.name}
                          </Link>
                          <ul className="space-y-3 text-xs md:text-sm text-gray-500 font-light">
                            {category.services && category.services.map((sub: any) => (
                              <li key={sub.id}>
                                <Link href={`/dich-vu/${sub.slug}`} className="hover:text-gold flex items-center gap-1.5 transition-colors">
                                  <span className="text-gold/60">—</span> {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Col 4: Cam kết y khoa */}
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200/50">
                        <h4 className="font-serif font-bold text-gray-800 text-sm mb-2">Theq Cam Kết</h4>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                          Chất lượng điều trị được cam kết bằng văn bản. Sử dụng 100% công nghệ đạt chuẩn FDA Hoa Kỳ và các dòng tinh chất chính hãng cao cấp.
                        </p>
                        <div className="mt-4 text-gold font-bold text-xs">
                          Hotline: {hotline}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    active
                      ? "text-gold"
                      : isWhiteHeader
                      ? "text-dark-bg hover:text-gold"
                      : "text-white hover:text-gold"
                  } after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] ${
                    isWhiteHeader ? "after:bg-dark-bg" : "after:bg-white"
                  } after:transition-transform after:duration-300 after:origin-center ${
                    active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
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
              href={`tel:${hotline}`}
              className={`flex items-center gap-2 font-sans font-bold text-sm xl:text-base px-7 py-3 rounded-[10px] border transition-all duration-300 ${
                isWhiteHeader
                  ? "border-dark-bg text-dark-bg hover:bg-dark-bg hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-dark-bg"
              }`}
            >
              <PhoneIcon size={16} />
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
              <X size={28} className={isWhiteHeader ? "text-dark-bg" : "text-white"} />
            ) : (
              <Menu size={28} className={isWhiteHeader ? "text-dark-bg" : "text-white"} />
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
                      <Link
                        href="/dich-vu"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileServicesOpen(false);
                        }}
                        className="text-base text-gray-300 hover:text-gold transition-colors duration-200 font-semibold"
                      >
                        Tất cả dịch vụ
                      </Link>
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
            href={`tel:${hotline}`}
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
