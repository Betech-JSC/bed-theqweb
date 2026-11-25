import React from "react";
import { Trash } from "lucide-react";

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface FooterColumnItem {
  title: string;
  description?: string;
  links: FooterLinkItem[];
}

export const DEFAULT_FOOTER_COLUMNS: FooterColumnItem[] = [
  {
    title: "Chuyên Mục Đào Tạo Spa",
    description: "",
    links: [
      { label: "Đào tạo Chăm sóc da", url: "/?category=Đào%20tạo%20Chăm%20sóc%20da" },
      { label: "Đào tạo Massage Trị liệu", url: "/?category=Đào%20tạo%20Massage%20Trị%20liệu" },
      { label: "Đào tạo Phun xăm thẩm mỹ", url: "/?category=Đào%20tạo%20Phun%20xăm%20thẩm%20mỹ" },
      { label: "Kinh nghiệm & Quản lý Spa", url: "/?category=Kinh%20nghiệm%20%26%20Quản%20lý%20Spa" },
    ],
  },
  {
    title: "Sơ Đồ Trang Web",
    description: "",
    links: [
      { label: "Cẩm nang nghề Spa", url: "/tin-tuc" },
      { label: "Sơ đồ trang web (XML Sitemap)", url: "/sitemap.xml" },
    ],
  },
  {
    title: "Cam Kết Đào Tạo",
    description: "Chương trình đào tạo thực hành 80% trên mẫu thật, cấp chứng chỉ hành nghề Sở LĐTBXH và cam kết 100% việc làm sau tốt nghiệp.",
    links: [],
  },
];
// Chuyển chuỗi JSON trong settings thành mảng cột Footer an toàn
export function parseFooterColumns(raw?: string): FooterColumnItem[] {
  if (raw === undefined) return DEFAULT_FOOTER_COLUMNS;
  if (raw === "") return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_FOOTER_COLUMNS;
  } catch {
    return DEFAULT_FOOTER_COLUMNS;
  }
}

interface Props {
  settings: Record<string, any>;
  onUpdate: (patch: Record<string, string>) => void;
}

export const FooterSettingsEditor: React.FC<Props> = ({ settings, onUpdate }) => {
  const showBrand = settings.footer_show_brand !== "0";
  const columns = parseFooterColumns(settings.footer_columns);

  const saveColumns = (next: FooterColumnItem[]) => {
    onUpdate({ footer_columns: JSON.stringify(next) });
  };

  return (
    <div className="border-t border-gray-100 pt-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-xs uppercase font-bold text-gray-700 tracking-wider">Quản lý nội dung & các cột Footer</h4>
          <p className="text-xs text-gray-400 mt-0.5">Chỉnh sửa tiêu đề, mô tả, đường dẫn URL hoặc xóa bất kỳ cột nào ở chân trang.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onUpdate({ footer_show_brand: showBrand ? "0" : "1" })} className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${showBrand ? "bg-gray-100 text-gray-700 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200" : "bg-gold/10 text-gold border-gold/30 hover:bg-gold/20"}`}>
            {showBrand ? "Xóa / Ẩn cột Thương hiệu" : "+ Khôi phục cột Thương hiệu"}
          </button>
          <button type="button" onClick={() => saveColumns([...columns, { title: "Cột mới", description: "", links: [{ label: "Liên kết mới", url: "/" }] }])} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded text-xs font-semibold transition-colors">
            + Thêm cột Footer
          </button>
        </div>
      </div>
      {showBrand && (
        <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
            <span className="text-xs font-bold text-gold uppercase">Cột 1: Thương hiệu & Liên hệ</span>
            <button type="button" onClick={() => onUpdate({ footer_show_brand: "0" })} className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"><Trash size={13} /> Xóa cột này</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Tên thương hiệu (hiển thị khi không dùng ảnh logo)</label>
              <input type="text" value={settings.footer_brand_name ?? "Theq"} onChange={(e) => onUpdate({ footer_brand_name: e.target.value })} className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm bg-white focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Đường dẫn Instagram</label>
              <input type="text" value={settings.instagram_url ?? "https://instagram.com"} onChange={(e) => onUpdate({ instagram_url: e.target.value })} className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm bg-white focus:outline-none" placeholder="Để trống nếu muốn ẩn icon Instagram" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Đoạn giới thiệu ngắn dưới logo</label>
            <textarea rows={2} value={settings.footer_brand_desc ?? "Theq Nail Centre mang đến các liệu trình làm đẹp chuẩn y khoa, giúp bạn sở hữu vẻ đẹp độc bản, chuẩn tỷ lệ vàng và an toàn tuyệt đối."} onChange={(e) => onUpdate({ footer_brand_desc: e.target.value })} className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm bg-white focus:outline-none" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-gray-700 uppercase">Cột {showBrand ? colIdx + 2 : colIdx + 1}</span>
                <button type="button" onClick={() => saveColumns(columns.filter((_, i) => i !== colIdx))} className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"><Trash size={13} /> Xóa cột</button>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Tiêu đề cột</label>
                <input type="text" value={col.title} onChange={(e) => saveColumns(columns.map((c, i) => i === colIdx ? { ...c, title: e.target.value } : c))} className="w-full border border-gray-200 focus:border-gold px-3 py-1.5 rounded text-xs focus:outline-none font-semibold" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Mô tả văn bản (tùy chọn)</label>
                <textarea rows={2} value={col.description || ""} onChange={(e) => saveColumns(columns.map((c, i) => i === colIdx ? { ...c, description: e.target.value } : c))} className="w-full border border-gray-200 focus:border-gold px-3 py-1.5 rounded text-xs focus:outline-none" placeholder="Nhập đoạn văn (nếu có)..." />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-gray-500">Danh sách liên kết (URL)</label>
                  <button type="button" onClick={() => saveColumns(columns.map((c, i) => i === colIdx ? { ...c, links: [...(c.links || []), { label: "Tiêu đề link", url: "/" }] } : c))} className="text-[11px] text-gold font-bold hover:underline">+ Thêm link</button>
                </div>
                {(col.links || []).map((lnk, lnkIdx) => (
                  <div key={lnkIdx} className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded border border-gray-150">
                    <input type="text" value={lnk.label} onChange={(e) => saveColumns(columns.map((c, i) => i === colIdx ? { ...c, links: c.links.map((l, j) => j === lnkIdx ? { ...l, label: e.target.value } : l) } : c))} className="w-1/2 border border-gray-200 px-2 py-1 rounded text-[11px] bg-white focus:outline-none" placeholder="Tên hiển thị" />
                    <input type="text" value={lnk.url} onChange={(e) => saveColumns(columns.map((c, i) => i === colIdx ? { ...c, links: c.links.map((l, j) => j === lnkIdx ? { ...l, url: e.target.value } : l) } : c))} className="w-1/2 border border-gray-200 px-2 py-1 rounded text-[11px] bg-white focus:outline-none" placeholder="URL (/tin-tuc...)" />
                    <button type="button" onClick={() => saveColumns(columns.map((c, i) => i === colIdx ? { ...c, links: c.links.filter((_, j) => j !== lnkIdx) } : c))} className="text-red-400 hover:text-red-600 p-1" title="Xóa link"><Trash size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
