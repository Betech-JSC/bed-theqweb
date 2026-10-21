import React, { useState } from "react";
import axios from "axios";

export function slugifyPath(str: string, separator = "-"): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\t/g, "")
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    .replace(/\s+/g, separator)
    .replace(/[^A-Za-z0-9_-]/g, "")
    .replace(/-+/g, separator);
}

interface AiWriterProps {
  onApply: (result: { title: string; description: string; content: string; slug: string; keywords: string }) => void;
}

export const AiWriterAssistant: React.FC<AiWriterProps> = ({ onApply }) => {
  const [aiShowPanel, setAiShowPanel] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState("chuyên nghiệp");
  const [aiKeywords, setAiKeywords] = useState("");
  const [aiLanguage, setAiLanguage] = useState<"vi" | "en">("vi");
  const [aiOutline, setAiOutline] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ title: string; description: string; content: string } | null>(null);

  const generateAI = async () => {
    if (!aiTopic.trim()) return;
    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await axios.post("/admin/articles/generate-ai", {
        topic: aiTopic,
        tone: aiTone,
        keywords: aiKeywords,
        outline: aiOutline,
        language: aiLanguage,
      });
      if (res.data && res.data.success) {
        setAiResult(res.data.data);
      } else {
        alert("Lỗi tạo bài viết: " + (res.data?.message || "Không có phản hồi"));
      }
    } catch (err: any) {
      alert("Có lỗi xảy ra: " + (err.response?.data?.message || err.message));
    } finally {
      setAiLoading(false);
    }
  };

  const applyAIResult = () => {
    if (!aiResult) return;
    onApply({
      title: aiResult.title,
      description: aiResult.description,
      content: aiResult.content,
      slug: slugifyPath(aiResult.title),
      keywords: aiKeywords,
    });
  };

  return (
    <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div
        className="bg-gray-50 text-gray-800 flex items-center justify-between py-3 px-4 cursor-pointer select-none hover:bg-gray-100/70 transition-colors"
        onClick={() => setAiShowPanel(!aiShowPanel)}
      >
        <span className="font-bold flex items-center text-xs uppercase tracking-wider text-gray-700">
          Trợ lý viết bài AI (Gemini AI Writer)
        </span>
        <span className="text-xs text-gray-500 font-semibold flex items-center">
          {aiShowPanel ? "Thu gọn" : "Mở rộng trợ lý viết bài"}
        </span>
      </div>
      {aiShowPanel && (
        <div className="bg-gray-50/30 border-t border-gray-200 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="text-xs text-gray-500 font-semibold mb-1">
                Chủ đề / Ý tưởng bài viết <span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                placeholder="Ví dụ: Hướng dẫn tối ưu SEO On-Page toàn diện năm 2026"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold mb-1">Giọng điệu bài viết</div>
              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
              >
                <option value="chuyên nghiệp">Chuyên nghiệp</option>
                <option value="thân thiện">Thân thiện, gần gũi</option>
                <option value="bán hàng (sales-focused)">Bán hàng & Kêu gọi hành động</option>
                <option value="tin tức">Tin tức thời sự</option>
                <option value="hào hứng">Hào hứng, cuốn hút</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 font-semibold mb-1">Từ khóa SEO (Phân cách bằng dấu phẩy)</div>
              <input
                type="text"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                placeholder="Ví dụ: viết bài chuẩn seo, tối ưu onpage, cấu trúc heading"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold mb-1">Ngôn ngữ áp dụng</div>
              <div className="flex items-center space-x-4 h-9">
                <label className="flex items-center text-sm cursor-pointer select-none text-gray-700">
                  <input type="radio" checked={aiLanguage === "vi"} onChange={() => setAiLanguage("vi")} className="mr-1.5" />
                  Tiếng Việt
                </label>
                <label className="flex items-center text-sm cursor-pointer select-none text-gray-700">
                  <input type="radio" checked={aiLanguage === "en"} onChange={() => setAiLanguage("en")} className="mr-1.5" />
                  English
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 font-semibold mb-1">Dàn ý bài viết / Yêu cầu cụ thể (Không bắt buộc)</div>
            <textarea
              value={aiOutline}
              onChange={(e) => setAiOutline(e.target.value)}
              rows={3}
              placeholder="Ví dụ: Phần 1 tổng quan chủ đề, Phần 2 các tiêu chí kỹ thuật quan trọng, Phần 3 kinh nghiệm triển khai thực tế."
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              disabled={aiLoading || !aiTopic.trim()}
              onClick={generateAI}
              className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-bold flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {aiLoading && <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />}
              <span>{aiLoading ? "Đang viết bài..." : "Viết bài bằng AI"}</span>
            </button>
          </div>

          {aiResult && (
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mt-4 shadow-sm">
              <div className="bg-gray-50 px-4 py-2.5 flex items-center justify-between border-b border-gray-200">
                <span className="text-xs font-bold text-gray-800 flex items-center">
                  Xem thử bài viết tạo bởi AI
                </span>
                <button
                  type="button"
                  onClick={applyAIResult}
                  className="px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-lg flex items-center transition-colors cursor-pointer shadow-sm"
                >
                  Áp dụng vào bài viết ({aiLanguage === "vi" ? "Tiếng Việt" : "English"})
                </button>
              </div>
              <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Tiêu đề bài viết</div>
                  <div className="text-sm font-bold text-gray-900 border-b pb-2">{aiResult.title}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Mô tả bài viết (Meta Description)</div>
                  <div className="text-xs text-gray-600 italic border-b pb-2">{aiResult.description}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Nội dung bài viết (HTML Preview)</div>
                  <div className="prose prose-sm max-w-none text-sm text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: aiResult.content }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const AltTextSeoTagsInput: React.FC<{
  value: string;
  onChange: (newVal: string) => void;
}> = ({ value, onChange }) => {
  const [newAltTag, setNewAltTag] = useState("");
  const tags = value ? value.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const addAltTag = () => {
    const tag = newAltTag.trim().replace(/,/g, "");
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag].join(", "));
    }
    setNewAltTag("");
  };

  const removeAltTag = (index: number) => {
    const next = [...tags];
    next.splice(index, 1);
    onChange(next.join(", "));
  };

  return (
    <div className="mt-3">
      <label className="block mb-1.5 font-semibold tracking-wide text-gray-700 text-xs uppercase">
        Alt text hình ảnh đại diện (SEO Tags)
      </label>
      <div className="w-full bg-white border border-gray-300 rounded-lg p-2.5 focus-within:ring-1 focus-within:ring-gold focus-within:border-gold min-h-[76px] flex flex-wrap gap-2 items-start content-start">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-[#E5F1FF] text-[#0562D2] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#CDE3FF] select-none"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeAltTag(index)}
              className="ml-1.5 inline-flex items-center justify-center text-[#0562D2]/60 hover:text-red-500 hover:bg-[#CDE3FF] rounded-full w-4 h-4 cursor-pointer text-xs font-bold"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={newAltTag}
          onChange={(e) => setNewAltTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addAltTag();
            }
          }}
          onBlur={addAltTag}
          placeholder="Thêm tag Alt Text (ấn Enter hoặc dấu phẩy)..."
          className="flex-grow min-w-[160px] bg-transparent border-0 p-1 text-xs focus:ring-0 focus:outline-none placeholder-gray-400"
        />
      </div>
      <small className="text-gray-400 text-[11px] block mt-1 leading-normal">
        Nhập từ khóa mô tả ảnh và ấn <strong>Enter</strong> hoặc <strong>dấu phẩy (,)</strong> để tạo các thẻ Alt Text tối ưu SEO.
      </small>
    </div>
  );
};

export const RelatedAndRedirectUrlsPanel: React.FC<{
  relatedUrls: string;
  redirectUrls: string;
  currentSlug: string;
  allArticles: Array<{ id: number; title: string; slug: string }>;
  onChangeRelated: (val: string) => void;
  onChangeRedirect: (val: string) => void;
}> = ({ relatedUrls, redirectUrls, currentSlug, allArticles, onChangeRelated, onChangeRedirect }) => {
  const [newRedirectTag, setNewRedirectTag] = useState("");
  const redirectTags = redirectUrls ? redirectUrls.split("\n").map((s) => s.trim()).filter(Boolean) : [];

  const addRedirectTag = () => {
    const val = newRedirectTag.trim();
    if (!val) return;
    let path = val.split("?")[0].split("#")[0];
    try {
      if (path.startsWith("http://") || path.startsWith("https://")) {
        path = new URL(path).pathname;
      }
    } catch {}
    const parts = path.split("/").map((p) => slugifyPath(p)).filter(Boolean);
    const resultPath = parts.join("/");
    const cleanCurrent = slugifyPath(currentSlug);
    const forbidden = [cleanCurrent, `tin-tuc/${cleanCurrent}`, `bai-viet/${cleanCurrent}`].filter(Boolean);
    if (forbidden.includes(resultPath)) {
      setNewRedirectTag("");
      return;
    }
    if (resultPath && !redirectTags.includes(resultPath)) {
      onChangeRedirect([...redirectTags, resultPath].join("\n"));
    }
    setNewRedirectTag("");
  };

  const removeRedirectTag = (idx: number) => {
    const next = [...redirectTags];
    next.splice(idx, 1);
    onChangeRedirect(next.join("\n"));
  };

  return (
    <div className="space-y-6 border-t border-gray-100 pt-6 mt-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label className="text-xs text-gray-600 font-bold uppercase tracking-wider">
            Đường dẫn bài viết liên quan (Mỗi dòng 1 đường dẫn / slug)
          </label>
          <select
            className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-gray-700"
            defaultValue=""
            onChange={(e) => {
              const slug = e.target.value;
              if (!slug) return;
              const entry = `/tin-tuc/${slug}`;
              const lines = relatedUrls ? relatedUrls.split("\n").map((s) => s.trim()).filter(Boolean) : [];
              if (!lines.includes(entry)) {
                onChangeRelated([...lines, entry].join("\n"));
              }
              e.target.value = "";
            }}
          >
            <option value="">+ Chọn nhanh bài viết có sẵn để thêm...</option>
            {allArticles.filter((a) => a.slug && a.slug !== currentSlug).map((a) => (
              <option key={a.id} value={a.slug}>{a.title} (/tin-tuc/{a.slug})</option>
            ))}
          </select>
        </div>
        <textarea
          value={relatedUrls}
          onChange={(e) => onChangeRelated(e.target.value)}
          rows={5}
          className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-gold focus:outline-none font-mono"
          placeholder={"/tin-tuc/bai-viet-lien-quan-1\n/tin-tuc/bai-viet-lien-quan-2"}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-600 font-bold uppercase tracking-wider mb-2">
          Cấu hình 301 Redirect (Nhập URL cũ cần chuyển hướng về bài viết này và bấm Enter)
        </label>
        <div className="w-full bg-white border border-gray-300 rounded-xl p-3.5 focus-within:ring-1 focus-within:ring-gold min-h-[110px] flex flex-wrap gap-2.5 items-start content-start">
          {redirectTags.map((tag, index) => (
            <span key={index} className="inline-flex items-center bg-blue-50 text-blue-900 text-xs font-mono px-3 py-1.5 rounded-md border border-blue-200 shadow-sm">
              <span>/{tag}</span>
              <button type="button" onClick={() => removeRedirectTag(index)} className="ml-2 text-blue-400 hover:text-red-500 font-bold cursor-pointer">&times;</button>
            </span>
          ))}
          <input
            type="text"
            value={newRedirectTag}
            onChange={(e) => setNewRedirectTag(e.target.value.replace(/\s+/g, "-"))}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
                const input = e.currentTarget;
                const start = input.selectionStart ?? newRedirectTag.length;
                const end = input.selectionEnd ?? newRedirectTag.length;
                const nextVal = newRedirectTag.substring(0, start) + "-" + newRedirectTag.substring(end);
                setNewRedirectTag(nextVal);
                requestAnimationFrame(() => {
                  input.setSelectionRange(start + 1, start + 1);
                });
              } else if (e.key === "Enter") {
                e.preventDefault();
                addRedirectTag();
              }
            }}
            onBlur={addRedirectTag}
            placeholder="Ví dụ: tin-tuc/bai-viet-cu-2025 (Gõ và bấm Enter để thêm)"
            className="flex-grow min-w-[240px] bg-transparent border-0 p-1 text-sm focus:ring-0 focus:outline-none placeholder-gray-400 font-mono"
          />
        </div>
      </div>
    </div>
  );
};
