import React from "react";
import Image from "@/Components/Image";
import { Link, usePage } from "@inertiajs/react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./icons";
import { parseFooterColumns } from "./FooterSettingsEditor";

export const Footer: React.FC = () => {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};
  const showBrand = settings.footer_show_brand !== "0";
  const brandName = settings.footer_brand_name ?? "Theq";
  const brandDesc = settings.footer_brand_desc ?? "Theq Nail Centre mang đến các liệu trình làm đẹp chuẩn y khoa, giúp bạn sở hữu vẻ đẹp độc bản, chuẩn tỷ lệ vàng và an toàn tuyệt đối.";
  const hotline = settings.site_hotline ?? "1900 5006";
  const email = settings.site_email ?? "contact@theq.vn";
  const address = settings.site_address ?? "386-388 Đường 3/2, Phường 12, Quận 10, TP. Hồ Chí Minh";
  const facebookUrl = settings.facebook_url ?? "https://facebook.com";
  const instagramUrl = settings.instagram_url ?? "https://instagram.com";
  const youtubeUrl = settings.youtube_url ?? "https://youtube.com";
  const columns = parseFooterColumns(settings.footer_columns);
  const totalCols = (showBrand ? 1 : 0) + columns.length;
  if (totalCols === 0) return null;
  const gridCols = totalCols === 1 ? "lg:grid-cols-1" : totalCols === 2 ? "lg:grid-cols-2" : totalCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <footer className="bg-dark-bg text-gray-300 py-16 px-4 md:px-[10%] font-sans text-left border-t border-white/5">
      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-12`}>
        {showBrand && (
          <div className="flex flex-col items-start">
            <div className="relative h-10 w-44 mb-6 flex items-center">
              {settings.site_logo_light ? (
                <Image src={settings.site_logo_light} alt={brandName} fill className="object-contain" />
              ) : (
                <span className="font-serif font-bold text-lg text-gold uppercase tracking-wider">{brandName}</span>
              )}
            </div>
            {brandDesc && <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed mb-4">{brandDesc}</p>}
            <div className="text-xs text-gray-400 space-y-2 mb-6 font-light">
              {hotline && <p><span className="font-semibold text-gold">Hotline:</span> {hotline}</p>}
              {email && <p><span className="font-semibold text-gold">Email:</span> {email}</p>}
              {address && <p><span className="font-semibold text-gold">Địa chỉ:</span> {address}</p>}
            </div>
            <div className="flex items-center gap-3">
              {facebookUrl && <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-gold text-white p-2.5 rounded-full transition-colors" aria-label="Facebook"><FacebookIcon size={18} /></a>}
              {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-gold text-white p-2.5 rounded-full transition-colors" aria-label="Instagram"><InstagramIcon size={18} /></a>}
              {youtubeUrl && <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-gold text-white p-2.5 rounded-full transition-colors" aria-label="YouTube"><YoutubeIcon size={18} /></a>}
            </div>
          </div>
        )}

        {columns.map((col, idx) => (
          <div key={idx} className="flex flex-col items-start">
            {col.title && (
              <h4 className="font-serif font-bold text-white text-base md:text-lg mb-6 tracking-wide border-b border-white/10 pb-2 w-full">
                {col.title}
              </h4>
            )}
            {col.description && (
              <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed mb-4">{col.description}</p>
            )}
            {col.links && col.links.length > 0 && (
              <ul className="space-y-3 text-xs md:text-sm font-light text-gray-400">
                {col.links.map((lnk, lIdx) => (
                  <li key={lIdx}>
                    {lnk.url.startsWith("http") || lnk.url.endsWith(".xml") ? (
                      <a href={lnk.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">{lnk.label}</a>
                    ) : (
                      <Link href={lnk.url || "/"} className="hover:text-gold transition-colors">{lnk.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};
