import React from "react";
import Image from "@/Components/Image";
import { Link, usePage } from "@inertiajs/react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./icons";

export const Footer: React.FC = () => {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};
  const hotline = settings.site_hotline || "1900 5006";
  const email = settings.site_email || "contact@theq.vn";
  const address = settings.site_address || "386-388 Đường 3/2, Phường 12, Quận 10, TP. Hồ Chí Minh";
  const facebookUrl = settings.facebook_url || "https://facebook.com";
  const youtubeUrl = settings.youtube_url || "https://youtube.com";

  return (
    <footer className="bg-dark-bg text-gray-300 py-16 px-4 md:px-[10%] font-sans text-left border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col items-start">
          <div className="relative h-10 w-44 mb-6 flex items-center">
            {settings.site_logo_light ? (
              <Image
                src={settings.site_logo_light}
                alt="Theq Logo"
                fill
                className="object-contain"
              />
            ) : (
              <span className="font-serif font-bold text-lg text-gold uppercase tracking-wider">
                Theq
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed mb-4">
            Theq Nail Centre mang đến các liệu trình làm đẹp chuẩn y khoa, giúp bạn sở hữu vẻ đẹp độc bản, chuẩn tỷ lệ vàng và an toàn tuyệt đối.
          </p>
          <div className="text-xs text-gray-400 space-y-2 mb-6 font-light">
            <p><span className="font-semibold text-gold">Hotline:</span> {hotline}</p>
            <p><span className="font-semibold text-gold">Email:</span> {email}</p>
            <p><span className="font-semibold text-gold">Địa chỉ:</span> {address}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-gold text-white hover:text-white p-2.5 rounded-full transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-gold text-white hover:text-white p-2.5 rounded-full transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-gold text-white hover:text-white p-2.5 rounded-full transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-white text-base md:text-lg mb-6 tracking-wide border-b border-white/10 pb-2">
            Dịch Vụ Phẫu Thuật
          </h4>
          <ul className="space-y-3 text-xs md:text-sm font-light text-gray-400">
            <li><Link href="/dich-vu/nang-mui-cau-truc-gold-line" className="hover:text-gold transition-colors">Nâng mũi cấu trúc</Link></li>
            <li><Link href="/dich-vu/cat-mi-double-eyeluxe" className="hover:text-gold transition-colors">Cắt mí Double Eyeluxe</Link></li>
            <li><Link href="/dich-vu/tiem-fillerbotox-tao-hinh" className="hover:text-gold transition-colors">Tạo hình môi trái tim</Link></li>
            <li><Link href="/phau-thuat-tham-my" className="hover:text-gold transition-colors">Hạ gò má, độn cằm</Link></li>
          </ul>
        </div>

        {/* Column 3: Skin & Anti-Aging */}
        <div>
          <h4 className="font-serif font-bold text-white text-base md:text-lg mb-6 tracking-wide border-b border-white/10 pb-2">
            Da Liễu & Trẻ Hóa
          </h4>
          <ul className="space-y-3 text-xs md:text-sm font-light text-gray-400">
            <li><Link href="/dich-vu/cay-tinh-chat-meso-cang-bong" className="hover:text-gold transition-colors">Cấy tinh chất Meso căng bóng</Link></li>
            <li><Link href="/dich-vu/nang-co-tre-hoa-ultherapy" className="hover:text-gold transition-colors">Nâng cơ trẻ hóa Ultherapy</Link></li>
            <li><Link href="/dich-vu/dieu-tri-nam-laser-cong-nghe-cao" className="hover:text-gold transition-colors">Điều trị sẹo rỗ Sylfirm X</Link></li>
            <li><Link href="/da-lieu-tre-hoa" className="hover:text-gold transition-colors">Điêu khắc lông mày vi chạm</Link></li>
          </ul>
        </div>

        {/* Column 4: Certification and Badges */}
        <div className="flex flex-col items-start">
          <h4 className="font-serif font-bold text-white text-base md:text-lg mb-6 tracking-wide border-b border-white/10 pb-2">
            Chứng Nhận & Cam Kết
          </h4>
          <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed mb-6">
            Theq cam kết chất lượng điều trị bằng văn bản và sử dụng 100% sản phẩm và máy móc nhập khẩu chính hãng đạt chuẩn FDA.
          </p>

          {/* Badges Stack */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative h-10 w-24">
              <Image
                src="/images/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
                alt="Đã thông báo bộ công thương"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="relative h-8 w-24">
              <Image
                src="/images/_dmca_premi_badge_5.png"
                alt="DMCA Protection status badge"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500 font-light flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} Theq Nail Centre. All rights reserved.</span>
        <div className="flex flex-wrap gap-4 justify-center sm:justify-end text-xs text-gray-500 font-light mt-2 sm:mt-0">
          <Link href="/dieu-khoan-su-dung" className="hover:text-gold transition-colors">Điều khoản sử dụng</Link>
          <span className="text-white/10 hidden sm:inline">|</span>
          <Link href="/chinh-sach-bao-mat" className="hover:text-gold transition-colors">Chính sách bảo mật</Link>
          <span className="text-white/10 hidden sm:inline">|</span>
          <Link href="/chinh-sach-thanh-toan" className="hover:text-gold transition-colors">Chính sách thanh toán</Link>
          <span className="text-white/10 hidden sm:inline">|</span>
          <Link href="/chinh-sach-hoan-tien" className="hover:text-gold transition-colors">Chính sách hoàn tiền</Link>
          <span className="text-white/10 hidden sm:inline">|</span>
          <Link href="/tuyen-bo-mien-tru-trach-nhiem" className="hover:text-gold transition-colors">Miễn trừ trách nhiệm</Link>
        </div>
      </div>
    </footer>
  );
};
