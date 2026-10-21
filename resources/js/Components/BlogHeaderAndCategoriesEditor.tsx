import React, { useState } from "react";
import { Trash, Image as ImageIcon } from "lucide-react";

export const DEFAULT_BLOG_CATEGORIES = ["Chuyên môn", "Sự kiện", "Hoạt động"];

// Giải mã danh sách danh mục chủ đề bài viết từ JSON trong settings
export function parseBlogCategories(raw?: string): string[] {
  if (raw === undefined) return DEFAULT_BLOG_CATEGORIES;
  if (raw === "") return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((c) => typeof c === "string" && c.trim() !== "") : DEFAULT_BLOG_CATEGORIES;
  } catch {
    return DEFAULT_BLOG_CATEGORIES;
  }
}

interface Props {
  settings: Record<string, any>;
  onUpdate: (patch: Record<string, string>) => void;
  onSelectBannerImage: (cb: (path: string) => void) => void;
}

export const BlogHeaderAndCategoriesEditor: React.FC<Props> = ({ settings, onUpdate, onSelectBannerImage }) => {
  const [newCat, setNewCat] = useState("");
  const categories = parseBlogCategories(settings.blog_categories);
  const saveCats = (next: string[]) => onUpdate({ blog_categories: JSON.stringify(next) });

  return (
    <div className="border-t border-gray-100 pt-6 space-y-6">
      <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-5 space-y-4">
        <h4 className="text-xs uppercase font-bold text-gray-700 tracking-wider border-b border-gray-200/70 pb-2">Banner & Tiêu đề Trang Chủ Blog</h4>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Nhãn phụ (Breadcrumb)</label>
          <input type="text" value={settings.blog_hero_breadcrumb ?? "Tin tức & Sự kiện"} onChange={(e) => onUpdate({ blog_hero_breadcrumb: e.target.value })} className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm bg-white focus:outline-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Tiêu đề chính trên Banner</label>
              <input type="text" value={settings.blog_hero_title ?? "Góc Chuyên Gia & Tin Tức"} onChange={(e) => onUpdate({ blog_hero_title: e.target.value })} className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm bg-white focus:outline-none font-semibold" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Mô tả dưới tiêu đề</label>
              <textarea rows={3} value={settings.blog_hero_desc ?? "Nơi hội tụ các phân tích chuyên sâu về y học thẩm mỹ, cập nhật công nghệ nâng cơ trẻ hóa thế hệ mới và các hoạt động cộng đồng nổi bật của Theq."} onChange={(e) => onUpdate({ blog_hero_desc: e.target.value })} className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm bg-white focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Ảnh nền Banner (để trống sẽ dùng nền tối mặc định)</label>
            <div onClick={() => onSelectBannerImage((path) => onUpdate({ blog_hero_image: path }))} className="border border-dashed border-gray-300 rounded-xl p-3 bg-white flex flex-col items-center justify-center h-[132px] relative overflow-hidden group cursor-pointer hover:border-gold transition-colors">
              {settings.blog_hero_image ? (
                <>
                  <img src={settings.blog_hero_image} alt="Banner Blog" className="absolute inset-0 w-full h-full object-cover" />
                  <button type="button" onClick={(e) => { e.stopPropagation(); onUpdate({ blog_hero_image: "" }); }} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow z-10" title="Xóa ảnh banner"><Trash size={12} /></button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-gray-400"><ImageIcon size={20} /><span className="text-[11px]">Chọn ảnh Banner từ thư viện</span></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/70 pb-2">
          <div>
            <h4 className="text-xs uppercase font-bold text-gray-700 tracking-wider">Danh mục chủ đề bài viết</h4>
            <p className="text-[11px] text-gray-400">Hiển thị đồng bộ trên Menu đầu trang, Tab lọc bài viết và Ô chọn chuyên mục khi viết bài.</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="text" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Tên chủ đề mới..." className="border border-gray-200 focus:border-gold px-3 py-1.5 rounded text-xs bg-white focus:outline-none" />
            <button type="button" onClick={() => { if (newCat.trim()) { saveCats([...categories, newCat.trim()]); setNewCat(""); } }} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded text-xs font-semibold">+ Thêm chủ đề</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
              <input type="text" value={cat} onChange={(e) => saveCats(categories.map((c, i) => i === idx ? e.target.value : c))} className="flex-1 border border-gray-150 focus:border-gold px-2.5 py-1 rounded text-xs font-semibold text-gray-700 focus:outline-none" />
              <button type="button" onClick={() => saveCats(categories.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 p-1" title="Xóa chủ đề"><Trash size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
