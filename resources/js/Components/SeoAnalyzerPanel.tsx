import React, { useState, useMemo } from "react";
import { CheckCircle, AlertCircle, Search, Globe, Share2, Sparkles } from "lucide-react";

export interface SeoCheckInput {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  imageAlt?: string;
  authorId?: string | number | null;
  legacyAuthor?: string;
  focusKeyword?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface SeoCriterion {
  id: string;
  label: string;
  detail: string;
  status: "good" | "warn" | "bad";
  points: number;
  maxPoints: number;
}

const stripHtml = (html: string) =>
  html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const normalizeVi = (str: string) =>
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").trim();
export function evaluateArticleSeo(input: SeoCheckInput) {
  const plainText = stripHtml(input.content || "");
  const words = plainText ? plainText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 220));

  const kw = (input.focusKeyword || "").trim().toLowerCase();
  const kwSlug = normalizeVi(kw).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const effectiveTitle = (input.metaTitle || input.title || "").trim();
  const effectiveDesc = (input.metaDescription || input.description || "").trim();
  const slug = (input.slug || "").trim().toLowerCase();

  let kwOccurrences = 0;
  if (kw.length >= 2 && plainText) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = plainText.toLowerCase().match(new RegExp(escaped, "g"));
    kwOccurrences = matches ? matches.length : 0;
  }
  const kwWords = kw ? kw.split(/\s+/).length : 1;
  const density = wordCount > 0 && kw ? Number((((kwOccurrences * kwWords) / wordCount) * 100).toFixed(2)) : 0;

  const first150Words = words.slice(0, 150).join(" ").toLowerCase();
  const headingsMatch = (input.content || "").match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi) || [];
  const headingsText = headingsMatch.map((h) => stripHtml(h).toLowerCase()).join(" ");
  const hasKwInHeading = kw ? headingsText.includes(kw) : headingsMatch.length > 0;

  const criteria: SeoCriterion[] = [
    {
      id: "title_len",
      label: "Độ dài Tiêu đề SEO (Meta Title)",
      detail: `${effectiveTitle.length} ký tự (Tối ưu: 45–65 ký tự)`,
      status: effectiveTitle.length >= 45 && effectiveTitle.length <= 65 ? "good" : effectiveTitle.length >= 25 ? "warn" : "bad",
      points: effectiveTitle.length >= 45 && effectiveTitle.length <= 65 ? 10 : effectiveTitle.length >= 25 ? 6 : 0,
      maxPoints: 10,
    },
    {
      id: "desc_len",
      label: "Độ dài Mô tả SEO (Meta Description)",
      detail: `${effectiveDesc.length} ký tự (Tối ưu: 120–160 ký tự)`,
      status: effectiveDesc.length >= 120 && effectiveDesc.length <= 160 ? "good" : effectiveDesc.length >= 70 ? "warn" : "bad",
      points: effectiveDesc.length >= 120 && effectiveDesc.length <= 160 ? 10 : effectiveDesc.length >= 70 ? 6 : 0,
      maxPoints: 10,
    },
    {
      id: "kw_title",
      label: "Từ khóa chính trong Tiêu đề",
      detail: kw ? (effectiveTitle.toLowerCase().includes(kw) ? "Đã xuất hiện trong tiêu đề" : "Chưa có từ khóa chính trong tiêu đề") : "Hãy nhập Từ khóa chính (Focus Keyword)",
      status: kw && effectiveTitle.toLowerCase().includes(kw) ? "good" : "bad",
      points: kw && effectiveTitle.toLowerCase().includes(kw) ? 10 : 0,
      maxPoints: 10,
    },
    {
      id: "kw_slug",
      label: "Đường dẫn tĩnh (URL Slug) chuẩn SEO",
      detail: slug ? (kwSlug && slug.includes(kwSlug) ? `Slug chứa từ khóa (${slug})` : `Slug hiện tại: /tin-tuc/${slug}`) : "Chưa có slug",
      status: slug && (!kwSlug || slug.includes(kwSlug)) && slug.length <= 85 ? "good" : slug ? "warn" : "bad",
      points: slug && (!kwSlug || slug.includes(kwSlug)) ? 8 : slug ? 5 : 0,
      maxPoints: 8,
    },
    {
      id: "kw_intro",
      label: "Từ khóa trong đoạn mở đầu & Meta Description",
      detail: kw ? (first150Words.includes(kw) || effectiveDesc.toLowerCase().includes(kw) ? "Đã có từ khóa ở phần mở đầu / mô tả" : "Nên đưa từ khóa vào 150 từ đầu tiên") : "Chưa nhập từ khóa chính",
      status: kw && (first150Words.includes(kw) && effectiveDesc.toLowerCase().includes(kw)) ? "good" : kw && (first150Words.includes(kw) || effectiveDesc.toLowerCase().includes(kw)) ? "warn" : "bad",
      points: kw && (first150Words.includes(kw) || effectiveDesc.toLowerCase().includes(kw)) ? 8 : 0,
      maxPoints: 8,
    },
    {
      id: "headings",
      label: "Cấu trúc thẻ Heading (H2 / H3) & Mục lục tự động",
      detail: `${headingsMatch.length} thẻ H2/H3 trong bài${kw ? (hasKwInHeading ? " (Có chứa từ khóa)" : " (Chưa chứa từ khóa)") : ""}`,
      status: headingsMatch.length >= 2 && hasKwInHeading ? "good" : headingsMatch.length >= 1 ? "warn" : "bad",
      points: headingsMatch.length >= 2 ? 10 : headingsMatch.length === 1 ? 5 : 0,
      maxPoints: 10,
    },
    {
      id: "word_count",
      label: "Độ dài nội dung bài viết (Word Count)",
      detail: `${wordCount} từ (~${readingTimeMin} phút đọc) — Khuyến nghị ≥ 600 từ`,
      status: wordCount >= 700 ? "good" : wordCount >= 300 ? "warn" : "bad",
      points: wordCount >= 700 ? 12 : wordCount >= 300 ? 7 : wordCount >= 100 ? 3 : 0,
      maxPoints: 12,
    },
    {
      id: "kw_density",
      label: "Mật độ từ khóa (Keyword Density)",
      detail: kw ? `${density}% (${kwOccurrences} lần xuất hiện — Tối ưu: 0.5%–2.5%)` : "Nhập từ khóa để đo mật độ",
      status: kw && density >= 0.4 && density <= 2.8 ? "good" : kw && kwOccurrences > 0 ? "warn" : "bad",
      points: kw && density >= 0.4 && density <= 2.8 ? 8 : kw && kwOccurrences > 0 ? 4 : 0,
      maxPoints: 8,
    },
    {
      id: "thumbnail_seo",
      label: "Ảnh Thumbnail & Văn bản thay thế (Alt Text)",
      detail: input.image ? (input.imageAlt ? `Đã có ảnh & Alt: "${input.imageAlt}"` : "Đã có ảnh đại diện nhưng thiếu Alt Text") : "Chưa tải lên ảnh Thumbnail",
      status: input.image && input.imageAlt ? "good" : input.image ? "warn" : "bad",
      points: input.image && input.imageAlt ? 8 : input.image ? 5 : 0,
      maxPoints: 8,
    },
    {
      id: "content_images",
      label: "Hình ảnh minh họa trong bài & thuộc tính Alt",
      detail: (() => {
        const imgs = (input.content || "").match(/<img[^>]*>/gi) || [];
        if (imgs.length === 0) return "Chưa có ảnh minh họa trong nội dung bài";
        const withAlt = imgs.filter((tag) => /alt=["'][^"']+["']/i.test(tag)).length;
        return `${withAlt}/${imgs.length} ảnh trong bài có thuộc tính Alt`;
      })(),
      status: /<img[^>]*alt=["'][^"']+["']/i.test(input.content || "") ? "good" : /<img/i.test(input.content || "") ? "warn" : "bad",
      points: /<img[^>]*alt=["'][^"']+["']/i.test(input.content || "") ? 6 : /<img/i.test(input.content || "") ? 3 : 0,
      maxPoints: 6,
    },
    {
      id: "links",
      label: "Liên kết nội bộ (Internal Link) & Tham khảo",
      detail: (() => {
        const hrefs = (input.content || "").match(/href=["']([^"']+)["']/gi) || [];
        return hrefs.length > 0 ? `Đã chèn ${hrefs.length} liên kết trong bài` : "Nên chèn ít nhất 1 Internal Link dẫn tới bài viết liên quan";
      })(),
      status: /href=["']/i.test(input.content || "") ? "good" : "warn",
      points: /href=["']/i.test(input.content || "") ? 5 : 1,
      maxPoints: 5,
    },
    {
      id: "eeat_author",
      label: "Tín hiệu Chuyên gia (Tác giả E-E-A-T)",
      detail: input.authorId ? "Đã liên kết Hồ sơ Tác giả chuyên môn" : input.legacyAuthor ? `Tác giả hiển thị: ${input.legacyAuthor} (Nên gắn hồ sơ E-E-A-T)` : "Chưa chọn tác giả",
      status: input.authorId ? "good" : input.legacyAuthor ? "warn" : "bad",
      points: input.authorId ? 5 : input.legacyAuthor ? 3 : 0,
      maxPoints: 5,
    },
  ];

  const score = criteria.reduce((sum, c) => sum + c.points, 0);
  return { score, wordCount, readingTimeMin, density, kwOccurrences, criteria };
}
interface SeoAnalyzerPanelProps extends SeoCheckInput {
  onChangeFocusKeyword: (kw: string) => void;
}

export const SeoAnalyzerPanel: React.FC<SeoAnalyzerPanelProps> = (props) => {
  const [previewTab, setPreviewTab] = useState<"google" | "social">("google");
  const evalResult = useMemo(() => evaluateArticleSeo(props), [props]);

  const scoreColor =
    evalResult.score >= 80
      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
      : evalResult.score >= 55
      ? "text-amber-600 bg-amber-50 border-amber-200"
      : "text-red-600 bg-red-50 border-red-200";

  const barColor =
    evalResult.score >= 80 ? "bg-emerald-500" : evalResult.score >= 55 ? "bg-amber-500" : "bg-red-500";

  const serpTitle = (props.metaTitle || props.title || "Tiêu đề bài viết sẽ hiển thị tại đây").slice(0, 68);
  const serpDesc = (props.metaDescription || props.description || "Mô tả Meta Description của bài viết sẽ hiển thị trên kết quả tìm kiếm Google...").slice(0, 165);
  const serpUrl = `https://theq.vn › tin-tuc › ${props.slug || "duong-dan-bai-viet"}`;

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
            Trợ Lý Chấm Điểm SEO On-Page & Google SERP
          </h4>
          <p className="text-[11px] text-gray-400 font-light mt-0.5">
            {evalResult.wordCount} từ • ~{evalResult.readingTimeMin} phút đọc • Mật độ từ khóa: {evalResult.density}%
          </p>
        </div>
        <div className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 ${scoreColor}`}>
          <span>Điểm SEO: {evalResult.score}/100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-100">
        <div className={`h-full transition-all duration-300 ${barColor}`} style={{ width: `${Math.min(100, evalResult.score)}%` }} />
      </div>
      <div className="p-5 space-y-5">
        {/* Focus Keyword Input */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase font-bold text-gray-500 tracking-wider flex items-center gap-1.5">
            <Search size={13} className="text-gold" /> Từ khóa trọng tâm (Focus Keyword) *
          </label>
          <input
            type="text"
            value={props.focusKeyword || ""}
            onChange={(e) => props.onChangeFocusKeyword(e.target.value)}
            placeholder="Ví dụ: trẻ hóa da ultherapy, chăm sóc da sau laser..."
            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-800 bg-gray-50/40 font-medium"
          />
        </div>

        {/* Google SERP & Social OG Preview */}
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Xem trước hiển thị (Live Preview)</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setPreviewTab("google")}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 ${previewTab === "google" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}
              >
                <Globe size={12} /> Google SERP
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab("social")}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 ${previewTab === "social" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}
              >
                <Share2 size={12} /> Facebook / Zalo OG
              </button>
            </div>
          </div>

          {previewTab === "google" ? (
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-2xs space-y-1 text-left">
              <div className="text-xs text-gray-600 truncate">{serpUrl}</div>
              <div className="text-base md:text-lg font-medium text-[#1a0dab] hover:underline leading-snug line-clamp-1">{serpTitle}</div>
              <div className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">{serpDesc}</div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-w-md text-left">
              {props.image && <img src={props.image} alt={props.imageAlt || serpTitle} className="w-full h-40 object-cover bg-gray-100" />}
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <div className="text-[10px] uppercase text-gray-400">THEQ.VN</div>
                <div className="text-sm font-bold text-gray-800 line-clamp-1 mt-0.5">{serpTitle}</div>
                <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">{serpDesc}</div>
              </div>
            </div>
          )}
        </div>

        {/* 12-Point SEO Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {evalResult.criteria.map((item) => (
            <div key={item.id} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-100 bg-gray-50/30">
              {item.status === "good" ? (
                <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={15} className={`${item.status === "warn" ? "text-amber-500" : "text-red-500"} flex-shrink-0 mt-0.5`} />
              )}
              <div className="text-left min-w-0 flex-1">
                <div className="text-xs font-semibold text-gray-800 flex items-center justify-between gap-1">
                  <span className="truncate">{item.label}</span>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">+{item.points}/{item.maxPoints}</span>
                </div>
                <div className="text-[11px] text-gray-500 font-light truncate">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
