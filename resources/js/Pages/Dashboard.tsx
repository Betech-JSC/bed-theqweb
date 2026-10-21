import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, usePage, Link } from "@inertiajs/react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { SeoAnalyzerPanel, evaluateArticleSeo } from "@/Components/SeoAnalyzerPanel";
import { AiWriterAssistant, AltTextSeoTagsInput, RelatedAndRedirectUrlsPanel } from "@/Components/ArticleAiAndSeoTools";
import { FooterSettingsEditor } from "@/Components/FooterSettingsEditor";
import { BlogHeaderAndCategoriesEditor, parseBlogCategories } from "@/Components/BlogHeaderAndCategoriesEditor";
import {
  Plus,
  Trash,
  MessageSquare,
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  BookOpen,
  Sparkles,
  Phone,
  Calendar,
  X,
  FileText,
  MapPin,
  Sliders,
  Settings,
  Image as ImageIcon,
  LayoutDashboard,
  Users,
  HelpCircle,
  Info,
  LogOut,
  Undo,
  Redo,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Code,
  Play,
} from "lucide-react";

interface Submission {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  branch: string | null;
  note: string | null;
  status: string;
  created_at: string;
  booking_date?: string | null;
  booking_time?: string | null;
  doctor_id?: number | null;
  doctor?: { name: string; role: string } | null;
}

interface Author {
  id: number;
  name: string;
  slug: string;
  avatar?: string | null;
  role?: string | null;
  bio?: string | null;
  description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  meta_robots?: string | null;
  canonical_link?: string | null;
  meta_image?: string | null;
}

interface DoctorShift {
  id: number;
  doctor_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  branch: string | null;
  doctor?: Doctor;
}

interface ServiceReview {
  id: number;
  service_id: number;
  name: string;
  rating: number;
  comment: string | null;
  is_approved: boolean | number;
  created_at: string;
  service?: Service;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image: string | null;
  image_alt?: string | null;
  author: any | null;
  author_id?: number | null;
  legacy_author?: string | null;
  published_date: string | null;
  category: string;
  is_highlight?: boolean | number;
  status?: string | null;
  focus_keyword?: string | null;
  related_urls?: string | null;
  redirect_urls?: string | null;
  views?: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_robots?: string;
  canonical_link?: string;
  meta_image?: string;
  schema?: string | null;
}

interface Service {
  id: number;
  name: string;
  category: string;
  service_category_id?: number | string;
  price: string | null;
  description: string | null;
  image: string | null;
  banner_image?: string;
  is_highlight?: boolean | number;
  order?: number;
  created_at?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_robots?: string;
  canonical_link?: string;
  meta_image?: string;
  slug?: string;
  pillars?: Array<{ title: string; desc: string; img: string }> | null;
  reviews?: string[] | null;
  before_after?: Array<{ title: string; before: string; after: string; desc: string }> | null;
  schema?: string | null;
}

interface Banner {
  id: number;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_desktop: string;
  image_mobile: string | null;
  button_primary_text: string | null;
  button_primary_url: string | null;
  button_secondary_text: string | null;
  button_secondary_url: string | null;
  order: number;
  is_active: boolean | number;
}

interface Doctor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
  full_bio?: string | null;
  email?: string | null;
  is_active?: boolean | number;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
  order: number;
}

interface RealResult {
  id: number;
  category: string;
  title: string;
  detail: string;
  image: string;
  is_video: boolean | number;
  order: number;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_robots?: string;
  canonical_link?: string;
  meta_image?: string;
  video?: string | null;
  created_at?: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
  created_at?: string;
}

interface DashboardProps {
  submissions: Submission[];
  articles: Article[];
  services: Service[];
  serviceCategories: ServiceCategory[];
  banners: Banner[];
  doctors: Doctor[];
  faqs: Faq[];
  realResults: RealResult[];
  authors: Author[];
  doctor_shifts: DoctorShift[];
  service_reviews: ServiceReview[];
  analytics?: {
    daily_trends?: { date: string; count: number }[];
  };
}

// ─── RichTextEditor ────────────────────────────────────────────────────────────
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  onOpenMediaLibrary?: (onSelect: (url: string) => void) => void;
}

function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập nội dung...",
  minHeight = "300px",
  onOpenMediaLibrary,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  const savedRange = useRef<Range | null>(null);

  useEffect(() => {
    const el = editorRef.current;
    if (!el || showHtmlCode) return;
    if (document.activeElement !== el && el.innerHTML !== (value || "")) {
      el.innerHTML = value || "";
    }
  }, [value, showHtmlCode]);

  const handleInput = useCallback(() => {
    onChange(editorRef.current?.innerHTML ?? "");
  }, [onChange]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (savedRange.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  };

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val ?? undefined);
    handleInput();
  };

  const handleInsertLink = () => {
    saveSelection();
    setLinkUrl("https://");
    setShowLinkModal(true);
  };

  const confirmLink = () => {
    restoreSelection();
    if (linkUrl && linkUrl !== "https://") {
      document.execCommand("createLink", false, linkUrl);
      const isInternal = linkUrl.startsWith("/") || linkUrl.includes(window.location.hostname);
      editorRef.current?.querySelectorAll(`a[href="${linkUrl}"]`).forEach((a) => {
        if (!isInternal) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        }
      });
      handleInput();
    }
    setShowLinkModal(false);
  };

  const insertImage = (url: string) => {
    const el = editorRef.current;
    if (!el) return;

    const customAlt = window.prompt("Nhập văn bản thay thế (Alt Text chuẩn SEO) cho hình ảnh:", "") ?? "";
    const captionText = window.prompt("Nhập chú thích ảnh (Figcaption hiển thị dưới ảnh - để trống nếu không cần):", "") ?? "";
    el.focus();

    const sel = window.getSelection();
    if (savedRange.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }

    const img = document.createElement("img");
    img.src = url;
    img.alt = customAlt.trim() || captionText.trim() || "Hình ảnh bài viết";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.borderRadius = "8px";
    img.style.margin = "8px auto";
    img.style.display = "block";

    let nodeToInsert: HTMLElement = img;
    if (captionText.trim()) {
      const fig = document.createElement("figure");
      fig.style.margin = "16px auto";
      fig.style.textAlign = "center";
      const cap = document.createElement("figcaption");
      cap.textContent = captionText.trim();
      cap.style.fontStyle = "italic";
      cap.style.fontSize = "13px";
      cap.style.color = "#4b5563";
      cap.style.marginTop = "6px";
      fig.appendChild(img);
      fig.appendChild(cap);
      nodeToInsert = fig;
    }

    let inserted = false;
    if (sel && sel.rangeCount > 0) {
      try {
        const range = sel.getRangeAt(0);
        if (el.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(nodeToInsert);
          const newRange = document.createRange();
          newRange.setStartAfter(nodeToInsert);
          newRange.setEndAfter(nodeToInsert);
          sel.removeAllRanges();
          sel.addRange(newRange);
          savedRange.current = newRange.cloneRange();
          inserted = true;
        }
      } catch {}
    }

    if (!inserted) {
      el.appendChild(nodeToInsert);
    }

    handleInput();
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        e.preventDefault();
        saveSelection();
        const file = items[i].getAsFile();
        if (!file) return;
        const fd = new FormData();
        fd.append("image", file);
        setIsUploadingImage(true);
        try {
          const res = await axios.post("/admin/upload-image", fd);
          if (res.data?.url) insertImage(res.data.url);
        } catch {
          alert("Không thể tải ảnh dán từ Clipboard.");
        } finally {
          setIsUploadingImage(false);
        }
        return;
      }
    }
  };

  const handleInsertImage = () => {
    saveSelection();
    if (onOpenMediaLibrary) {
      onOpenMediaLibrary((url) => {
        insertImage(url);
      });
    } else {
      setImageUrl("https://");
      setShowImageModal(true);
    }
  };

  const confirmImageUrl = () => {
    if (imageUrl && imageUrl !== "https://") {
      insertImage(imageUrl);
    }
    setShowImageModal(false);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsUploadingImage(true);
    try {
      const response = await axios.post("/admin/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      const uploadedUrl = response.data.url;
      if (uploadedUrl) {
        insertImage(uploadedUrl);
        setShowImageModal(false);
      }
    } catch (err) {
      console.error("Lỗi khi tải ảnh lên:", err);
      alert("Tải ảnh lên thất bại. Vui lòng thử lại!");
    } finally {
      setIsUploadingImage(false);
      if (imageFileInputRef.current) {
        imageFileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden focus-within:border-gold transition-colors bg-white shadow-sm flex flex-col ${isFullscreen ? "fixed inset-4 z-[9999] shadow-2xl" : ""}`}>
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={imageFileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2.5 border-b border-gray-150 bg-gray-50/50 select-none">
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("bold"); }}
          className="p-1.5 w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors" title="In đậm (Ctrl+B)">B</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("italic"); }}
          className="p-1.5 w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 italic font-serif text-sm transition-colors" title="In nghiêng (Ctrl+I)">I</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("underline"); }}
          className="p-1.5 w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 underline text-sm transition-colors" title="Gạch chân (Ctrl+U)">U</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("strikeThrough"); }}
          className="p-1.5 w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500 line-through text-sm transition-colors" title="Gạch ngang">S</button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button type="button" onMouseDown={(e) => { e.preventDefault(); handleInsertLink(); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Thêm liên kết">
          <LinkIcon size={14} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("unlink"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-400 transition-colors text-[10px] font-bold" title="Bỏ liên kết">∅</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); handleInsertImage(); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Chèn/Tải ảnh lên">
          <ImageIcon size={14} />
        </button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "h2"); }}
          className="p-1.5 px-2 rounded hover:bg-gray-200 text-gray-600 font-bold text-[11px] transition-colors" title="Tiêu đề H2">H2</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "h3"); }}
          className="p-1.5 px-2 rounded hover:bg-gray-200 text-gray-600 font-bold text-[11px] transition-colors" title="Tiêu đề H3">H3</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "h4"); }}
          className="p-1.5 px-2 rounded hover:bg-gray-200 text-gray-600 font-bold text-[11px] transition-colors" title="Tiêu đề H4">H4</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "blockquote"); }}
          className="p-1.5 px-2 rounded hover:bg-gray-200 text-gray-600 font-serif font-bold text-[11px] transition-colors" title="Khối trích dẫn (Blockquote)">“Quote”</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "p"); }}
          className="p-1.5 px-2 rounded hover:bg-gray-200 text-gray-500 text-[11px] transition-colors" title="Đoạn văn">P</button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("insertUnorderedList"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Danh sách gạch đầu dòng">
          <List size={14} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("insertOrderedList"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Danh sách số thứ tự">
          <ListOrdered size={14} />
        </button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyLeft"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Căn trái">
          <AlignLeft size={14} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyCenter"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Căn giữa">
          <AlignCenter size={14} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyRight"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Căn phải">
          <AlignRight size={14} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("justifyFull"); }}
          className="p-1.5 px-2 rounded hover:bg-gray-200 text-gray-500 text-[10px] font-bold transition-colors" title="Căn đều 2 bên">≡</button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button type="button" onMouseDown={(e) => {
            e.preventDefault();
            exec("insertHTML", '<table style="width:100%;border-collapse:collapse;margin:16px 0;" border="1"><thead><tr><th style="padding:8px;border:1px solid #e5e7eb;background:#f9fafb;">Tiêu đề 1</th><th style="padding:8px;border:1px solid #e5e7eb;background:#f9fafb;">Tiêu đề 2</th></tr></thead><tbody><tr><td style="padding:8px;border:1px solid #e5e7eb;">Nội dung 1</td><td style="padding:8px;border:1px solid #e5e7eb;">Nội dung 2</td></tr></tbody></table><p></p>');
          }}
          className="p-1.5 px-2 rounded hover:bg-gray-200 text-gray-600 text-[11px] font-bold transition-colors" title="Chèn bảng (Table)">⊞ Bảng</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("removeFormat"); }}
          className="p-1.5 px-2 rounded hover:bg-gray-200 text-gray-500 text-[11px] font-bold transition-colors" title="Xóa định dạng">Tx</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("undo"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Hoàn tác">
          <Undo size={14} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("redo"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Làm lại">
          <Redo size={14} />
        </button>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-600 text-[11px] font-bold rounded border border-gray-200 cursor-pointer"
            title="Toàn màn hình"
          >
            {isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
          </button>
          <button
            type="button"
            onClick={() => setShowHtmlCode(!showHtmlCode)}
            className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-bold rounded flex items-center transition-colors border border-gray-200 cursor-pointer"
          >
            <span>{showHtmlCode ? "Xem dạng soạn thảo" : "</> Xem code HTML"}</span>
          </button>
        </div>
      </div>

      {/* Editable Content Area or HTML Source Editor */}
      {showHtmlCode ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={18}
          className="w-full bg-[#1e1e1e] text-green-400 font-mono text-sm p-4 focus:outline-none"
          placeholder="<!-- Nhập mã HTML tại đây -->"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          onPaste={handlePaste}
          className="w-full p-4 text-sm focus:outline-none leading-relaxed text-gray-700 bg-white prose prose-sm max-w-none"
          style={{ minHeight: isFullscreen ? "calc(100vh - 120px)" : minHeight, maxHeight: isFullscreen ? "calc(100vh - 120px)" : "520px", overflowY: "auto" }}
          data-placeholder={placeholder}
        />
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLinkModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Thêm liên kết</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && confirmLink()}
              autoFocus
              className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 mb-4"
              placeholder="https://example.com"
            />
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">Hủy</button>
              <button type="button" onClick={confirmLink}
                className="px-5 py-2 text-sm font-bold bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors">Chèn</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal (Upload + URL option) */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowImageModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Chèn / Tải hình ảnh</h3>
            
            {/* Upload image button */}
            <div className="mb-5">
              <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Tải ảnh từ máy tính</label>
              <button
                type="button"
                disabled={isUploadingImage}
                onClick={() => imageFileInputRef.current?.click()}
                className="w-full border border-dashed border-gray-300 hover:border-gold/50 rounded-lg p-5 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer bg-gray-50/50 hover:bg-gray-50"
              >
                {isUploadingImage ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-gray-500 font-medium mt-1">Đang tải ảnh lên...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={20} className="text-gray-400" />
                    <span className="text-xs text-gray-600 font-semibold">Chọn tệp ảnh (.png, .jpg, .webp)</span>
                    <span className="text-[10px] text-gray-400">Dung lượng tối đa 5MB</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider select-none">Hoặc</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* URL input */}
            <div className="mt-4 mb-5">
              <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Đường dẫn hình ảnh (URL)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && confirmImageUrl()}
                className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowImageModal(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">Hủy</button>
              <button type="button" onClick={confirmImageUrl}
                className="px-5 py-2 text-sm font-bold bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors">Chèn</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable] h2 { font-size: 1.25rem; font-weight: 700; margin: 0.75rem 0 0.5rem; }
        [contenteditable] h3 { font-size: 1.1rem; font-weight: 600; margin: 0.5rem 0 0.25rem; }
        [contenteditable] ul { list-style: disc; padding-left: 1.5rem; }
        [contenteditable] ol { list-style: decimal; padding-left: 1.5rem; }
        [contenteditable] a { color: #b8860b; text-decoration: underline; }
        [contenteditable] p { margin: 0.25rem 0; }
        [contenteditable] img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; display: block; }
      `}</style>
    </div>
  );
}
// ────────────────────────────────────────────────────────────────────────────────
interface FolderTreeProps {
  folders: any[];
  currentFolderId: number | null;
  onSelectFolder: (id: number | null) => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({ folders, currentFolderId, onSelectFolder }) => {
  // Build nested hierarchy
  const map: { [key: number]: any } = {};
  const roots: any[] = [];
  
  folders.forEach(f => {
    map[f.id] = { ...f, children: [] };
  });
  
  folders.forEach(f => {
    if (f.parent_id && map[f.parent_id]) {
      map[f.parent_id].children.push(map[f.id]);
    } else {
      roots.push(map[f.id]);
    }
  });

  const renderNode = (node: any, depth = 0) => {
    const isSelected = currentFolderId === node.id;
    return (
      <div key={node.id} className="select-none">
        <div
          onClick={() => onSelectFolder(node.id)}
          className={`flex items-center gap-2 py-1.5 pr-3 text-xs font-semibold rounded transition-colors cursor-pointer ${
            isSelected 
              ? "bg-orange-50 text-orange-600 font-bold" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
          style={{ paddingLeft: `${depth * 14 + 12}px` }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-500 shrink-0">
            <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-1.5V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v1.5H4.5A3 3 0 0 0 1.5 13.5V18a3 3 0 0 0 3 3h15ZM6 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5H6V9Zm-3 4.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.5Z" />
          </svg>
          <span className="truncate">{node.name}</span>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="mt-0.5 space-y-0.5">
            {node.children.map((child: any) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {/* Root item */}
      <div
        onClick={() => onSelectFolder(null)}
        className={`flex items-center gap-2 py-1.5 px-3 text-xs font-semibold rounded transition-colors cursor-pointer select-none ${
          currentFolderId === null 
            ? "bg-orange-50 text-orange-600 font-bold" 
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-600 shrink-0">
          <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-1.5V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v1.5H4.5A3 3 0 0 0 1.5 13.5V18a3 3 0 0 0 3 3h15ZM6 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5H6V9Zm-3 4.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.5Z" />
        </svg>
        <span>File Manager</span>
      </div>
      
      {/* Nested nodes */}
      <div className="mt-1 space-y-0.5 border-l border-gray-100 ml-4">
        {roots.map(root => renderNode(root, 0))}
      </div>
    </div>
  );
};

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00"
];

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove Vietnamese accents
    .replace(/[đĐ]/g, "d")            // Handle letter "đ"
    .replace(/[^a-z0-9\s-]/g, "")    // Remove invalid characters
    .trim()
    .replace(/\s+/g, "-")            // Replace spaces with dash
    .replace(/-+/g, "-");            // Collapse multiple dashes
};

const getMetaTitleStatus = (len: number) => {
  if (len === 0) return { text: "Trống", color: "text-gray-400 bg-gray-50 border-gray-150" };
  if (len < 50) return { text: "Quá ngắn (< 50 KT)", color: "text-amber-600 bg-amber-50 border-amber-200" };
  if (len <= 60) return { text: "Tối ưu (50 - 60 KT)", color: "text-green-700 bg-green-50 border-green-200 font-extrabold" };
  return { text: "Quá dài (> 60 KT)", color: "text-red-650 bg-red-50 border-red-200" };
};

const getMetaDescStatus = (len: number) => {
  if (len === 0) return { text: "Trống", color: "text-gray-400 bg-gray-50 border-gray-150" };
  if (len < 150) return { text: "Quá ngắn (< 150 KT)", color: "text-amber-600 bg-amber-50 border-amber-200" };
  if (len <= 160) return { text: "Tối ưu (150 - 160 KT)", color: "text-green-700 bg-green-50 border-green-200 font-extrabold" };
  return { text: "Quá dài (> 160 KT)", color: "text-red-650 bg-red-50 border-red-200" };
};

// ────────────────────────────────────────────────────────────────────────────────

export default function Dashboard({
  submissions = [],
  articles = [],
  services = [],
  serviceCategories = [],
  banners = [],
  doctors = [],
  faqs = [],
  realResults = [],
  authors = [],
  doctor_shifts = [],
  service_reviews = [],
  analytics,
}: DashboardProps) {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};
  const user = (props.auth as any).user;

  const [activeTab, setActiveTab] = useState<
    "overview" | "submissions" | "bookings" | "articles" | "services" | "serviceCategories" | "banners" | "doctors" | "faqs" | "settings" | "realResults" | "media" | "configs" | "intro" | "policies" | "authors" | "reviews" | "shifts"
  >("articles");

  const [activePolicyTab, setActivePolicyTab] = useState("dieu-khoan");

  // Search States
  const [articleSearchTerm, setArticleSearchTerm] = useState("");
  const [articleCurrentPage, setArticleCurrentPage] = useState(1);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [doctorSearchTerm, setDoctorSearchTerm] = useState("");
  const [faqSearchTerm, setFaqSearchTerm] = useState("");
  const [realResultSearchTerm, setRealResultSearchTerm] = useState("");
  const [submissionSearchTerm, setSubmissionSearchTerm] = useState("");
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState("all");
  const [bookingSearchTerm, setBookingSearchTerm] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const [selectedCalendarDateStr, setSelectedCalendarDateStr] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [daySearchQuery, setDaySearchQuery] = useState("");

  // Modal States
  const [showCreateBookingModal, setShowCreateBookingModal] = useState(false);
  const [showEditBookingModal, setShowEditBookingModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Submission | null>(null);

  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleViewMode, setArticleViewMode] = useState<"list" | "edit" | "create">("list");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceViewMode, setServiceViewMode] = useState<"list" | "edit" | "create">("list");
  const [advancedServiceOpen, setAdvancedServiceOpen] = useState(false);

  const [serviceCategorySearchTerm, setServiceCategorySearchTerm] = useState("");
  const [editingServiceCategory, setEditingServiceCategory] = useState<ServiceCategory | null>(null);
  const [serviceCategoryViewMode, setServiceCategoryViewMode] = useState<"list" | "edit" | "create">("list");

  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [doctorViewMode, setDoctorViewMode] = useState<"list" | "edit" | "create">("list");

  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);

  const [realResultModalOpen, setRealResultModalOpen] = useState(false);
  const [editingRealResult, setEditingRealResult] = useState<RealResult | null>(null);
  const [realResultViewMode, setRealResultViewMode] = useState<"list" | "edit" | "create">("list");
  const [advancedRealResultOpen, setAdvancedRealResultOpen] = useState(false);

  // Author States
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [authorViewMode, setAuthorViewMode] = useState<"list" | "edit" | "create">("list");
  const [authorSearchTerm, setAuthorSearchTerm] = useState("");
  const [advancedAuthorOpen, setAdvancedAuthorOpen] = useState(false);

  const execFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const insertLink = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || "";
    // Use a simple inline input approach instead of prompt
    const url = window.prompt("Nhập URL liên kết:", "https://");
    if (url) {
      document.execCommand("createLink", false, url);
      // Make links open in new tab
      const links = document.querySelectorAll("a:not([target])");
      links.forEach((link) => link.setAttribute("target", "_blank"));
    }
  };

  // Forms using useForm
  const realResultForm = useForm({
    category: "eyeluxe",
    title: "",
    detail: "",
    is_video: 0 as number,
    order: 0,
    image_file: null as File | null,
    video_file: null as File | null,
    image: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_robots: "",
    canonical_link: "",
    meta_image: "",
  });

  const articleForm = useForm({
    title: "",
    description: "",
    content: "",
    legacy_author: "",
    author_id: "" as string | number,
    published_date: new Date().toLocaleDateString("vi-VN"),
    category: "Chuyên môn",
    image_file: null as File | null,
    image: "",
    image_alt: "",
    is_highlight: 0 as number,
    status: "published",
    focus_keyword: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_robots: "index, follow",
    canonical_link: "",
    meta_image: "",
    schema: "",
    related_urls: "",
    redirect_urls: "",
  });

  const serviceForm = useForm({
    name: "",
    service_category_id: "" as string | number,
    category: "",
    price: "Liên hệ",
    description: "",
    image_file: null as File | null,
    image: "",
    banner_image: "",
    is_highlight: 0 as number,
    order: 0,
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_robots: "",
    canonical_link: "",
    meta_image: "",
    pillars: [] as Array<{ title: string; desc: string; img: string }>,
    reviews: [] as string[],
    before_after: [] as Array<{ title: string; before: string; after: string; desc: string }>,
    schema: "",
  });

  const serviceCategoryForm = useForm({
    name: "",
    slug: "",
    order: 0,
  });

  const doctorForm = useForm({
    name: "",
    role: "",
    bio: "",
    full_bio: "",
    email: "",
    image_file: null as File | null,
    image: "",
    order: 0,
    is_active: 1 as number,
  });

  const faqForm = useForm({
    question: "",
    answer: "",
    order: 0,
  });

  const bannerForm = useForm({
    eyebrow: "",
    title: "",
    subtitle: "",
    description: "",
    image_desktop_file: null as File | null,
    image_mobile_file: null as File | null,
    image_desktop: "",
    image_mobile: "",
    button_primary_text: "Đăng Ký Tư Vấn",
    button_primary_url: "#consult",
    button_secondary_text: "Tìm Hiểu Dịch Vụ",
    button_secondary_url: "#services",
    order: 0,
    is_active: 1 as number, // use 1/0 for php form-data compatibility
  });

  const settingsForm = useForm({
    settings: {
      site_hotline: settings.site_hotline || "19005006",
      site_email: settings.site_email || "info@theq.vn",
      site_address: settings.site_address || "",
      site_logo_dark: settings.site_logo_dark || "",
      site_logo_light: settings.site_logo_light || "",
      site_logo_square: settings.site_logo_square || "",
      site_logo_square_light: settings.site_logo_square_light || "",
      facebook_url: settings.facebook_url || "",
      zalo_url: settings.zalo_url || "",
      youtube_url: settings.youtube_url || "",
      intro_title: settings.intro_title || "THEQ NAIL CENTRE",
      intro_subtitle: settings.intro_subtitle || "Về Chúng Tôi",
      intro_desc_1: settings.intro_desc_1 || "",
      intro_desc_2: settings.intro_desc_2 || "",
      intro_stats_doctors_mode: settings.intro_stats_doctors_mode || "auto",
      intro_stats_doctors_manual: settings.intro_stats_doctors_manual || "5",
      intro_stats_customers_mode: settings.intro_stats_customers_mode || "crm_auto",
      intro_stats_customers_base: settings.intro_stats_customers_base || "10000",
      intro_stats_customers_manual: settings.intro_stats_customers_manual || "10k+",
      system_status: settings.system_status || "active",
      maintenance_message: settings.maintenance_message || "Hệ thống đang bảo trì định kỳ. Quý khách vui lòng quay lại sau ít phút!",
      intro_image: settings.intro_image || "",
      intro_story_title: settings.intro_story_title || "Triết Lý Làm Đẹp Chuẩn Y Khoa & Vẻ Đẹp Độc Bản",
      intro_story_desc_1: settings.intro_story_desc_1 || "",
      intro_story_desc_2: settings.intro_story_desc_2 || "",
      intro_story_quote: settings.intro_story_quote || "",
      intro_story_quote_author: settings.intro_story_quote_author || "",
      intro_story_image_1: settings.intro_story_image_1 || "",
      intro_story_image_2: settings.intro_story_image_2 || "",
      intro_story_image_3: settings.intro_story_image_3 || "",
      policy_dieu_khoan_su_dung: settings.policy_dieu_khoan_su_dung || "",
      policy_chinh_sach_bao_mat: settings.policy_chinh_sach_bao_mat || "",
      policy_chinh_sach_thanh_toan: settings.policy_chinh_sach_thanh_toan || "",
      policy_chinh_sach_hoan_tien: settings.policy_chinh_sach_hoan_tien || "",
      policy_tuyen_bo_mien_tru_trach_nhiem: settings.policy_tuyen_bo_mien_tru_trach_nhiem || "",
      why_choose_us_1_title: settings.why_choose_us_1_title || "Tiêu chuẩn Úc Châu",
      why_choose_us_1_desc: settings.why_choose_us_1_desc || "",
      why_choose_us_1_image: settings.why_choose_us_1_image || "",
      why_choose_us_2_title: settings.why_choose_us_2_title || "Tư vấn cá nhân hóa",
      why_choose_us_2_desc: settings.why_choose_us_2_desc || "",
      why_choose_us_2_image: settings.why_choose_us_2_image || "",
      why_choose_us_3_title: settings.why_choose_us_3_title || "Chuyên môn cao",
      why_choose_us_3_desc: settings.why_choose_us_3_desc || "",
      why_choose_us_3_image: settings.why_choose_us_3_image || "",
      why_choose_us_4_title: settings.why_choose_us_4_title || "Công nghệ tiên tiến",
      why_choose_us_4_desc: settings.why_choose_us_4_desc || "",
      why_choose_us_4_image: settings.why_choose_us_4_image || "",
      doctors_intro_eyebrow: settings.doctors_intro_eyebrow || "ĐỘI NGŨ CHUYÊN GIA",
      doctors_intro_title: settings.doctors_intro_title || "Hội Đồng Bác Sĩ Đầu Ngành",
      doctors_carousel_eyebrow: settings.doctors_carousel_eyebrow || "ĐỘI NGŨ BÁC SĨ",
      doctors_carousel_title: settings.doctors_carousel_title || "Đội Ngũ Chuyên Gia Làm Đẹp",
      about_carousel_eyebrow: settings.about_carousel_eyebrow || "THEQ NAIL CENTRE",
      about_carousel_title: settings.about_carousel_title || "Kiến tạo - Vẻ đẹp độc bản",
      footer_show_brand: settings.footer_show_brand ?? "1",
      footer_brand_name: settings.footer_brand_name ?? "Theq",
      footer_brand_desc: settings.footer_brand_desc ?? "Theq Nail Centre mang đến các liệu trình làm đẹp chuẩn y khoa, giúp bạn sở hữu vẻ đẹp độc bản, chuẩn tỷ lệ vàng và an toàn tuyệt đối.",
      instagram_url: settings.instagram_url ?? "https://instagram.com",
      footer_columns: settings.footer_columns,
      blog_topbar_text: settings.blog_topbar_text ?? "Chuyên trang Kiến thức & Phân tích Chuyên sâu | Theq Blog",
      blog_hero_breadcrumb: settings.blog_hero_breadcrumb ?? "Tin tức & Sự kiện",
      blog_hero_title: settings.blog_hero_title ?? "Góc Chuyên Gia & Tin Tức",
      blog_hero_desc: settings.blog_hero_desc ?? "Nơi hội tụ các phân tích chuyên sâu về y học thẩm mỹ, cập nhật công nghệ nâng cơ trẻ hóa thế hệ mới và các hoạt động cộng đồng nổi bật của Theq.",
      blog_hero_image: settings.blog_hero_image ?? "",
      blog_categories: settings.blog_categories,
    },
  });

  const authorForm = useForm({
    name: "",
    slug: "",
    avatar_file: null as File | null,
    avatar: "",
    role: "",
    bio: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_robots: "",
    canonical_link: "",
    meta_image: "",
  });

  const shiftForm = useForm({
    doctor_id: "" as string | number,
    day_of_week: 1 as number,
    start_time: "08:00",
    end_time: "17:00",
    branch: "Hà Nội",
  });

  const manualBookingForm = useForm({
    name: "",
    phone: "",
    email: "",
    service: "",
    branch: "",
    booking_date: "",
    booking_time: "",
    doctor_id: "" as string | number,
    note: "",
  });

  const editBookingForm = useForm({
    id: null as number | null,
    name: "",
    phone: "",
    email: "",
    service: "",
    branch: "",
    booking_date: "",
    booking_time: "",
    doctor_id: "" as string | number,
    note: "",
    status: "",
  });

  // Media Manager States
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [mediaFolders, setMediaFolders] = useState<any[]>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [allMediaFolders, setAllMediaFolders] = useState<any[]>([]);
  const [mediaBreadcrumbs, setMediaBreadcrumbs] = useState<any[]>([]);
  const [mediaSearchQuery, setMediaSearchQuery] = useState("");
  const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [mediaUploadLoading, setMediaUploadLoading] = useState(false);
  const [isMediaDragging, setIsMediaDragging] = useState(false);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  // Global Media Selector Modal States
  const [mediaSelectorOpen, setMediaSelectorOpen] = useState(false);
  const [onMediaSelect, setOnMediaSelect] = useState<((path: string) => void) | null>(null);

  const openMediaLibraryForEditor = (onSelectCallback: (url: string) => void) => {
    setOnMediaSelect(() => (path: string) => {
      onSelectCallback(path);
    });
    setMediaSelectorOpen(true);
  };

  const fetchMedia = useCallback(async (folderId: number | null) => {
    setMediaLoading(true);
    setSelectedMediaIds([]);
    try {
      const response = await axios.get(`/admin/media`, {
        params: { folder_id: folderId }
      });
      setMediaFolders(response.data.folders);
      setMediaFiles(response.data.files);
      setMediaBreadcrumbs(response.data.breadcrumbs);
      setAllMediaFolders(response.data.all_folders || []);
      setCurrentFolderId(folderId);
    } catch (err) {
      console.error("Lỗi khi tải thư viện tệp:", err);
    } finally {
      setMediaLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "media") {
      fetchMedia(currentFolderId);
    }
  }, [activeTab]);

  useEffect(() => {
    if (mediaSelectorOpen) {
      fetchMedia(currentFolderId);
    }
  }, [mediaSelectorOpen]);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      await axios.post("/admin/media/folder", {
        name: newFolderName,
        parent_id: currentFolderId
      });
      setNewFolderName("");
      setShowCreateFolderModal(false);
      fetchMedia(currentFolderId);
    } catch (err) {
      console.error("Lỗi khi tạo thư mục:", err);
      alert("Tạo thư mục thất bại!");
    }
  };

  const handleDeleteFolder = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa thư mục này và toàn bộ nội dung bên trong?")) return;
    try {
      await axios.delete(`/admin/media/folder/${id}`);
      fetchMedia(currentFolderId);
    } catch (err) {
      console.error("Lỗi khi xóa thư mục:", err);
      alert("Xóa thư mục thất bại!");
    }
  };

  const uploadMediaFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setMediaUploadLoading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        if (currentFolderId) {
          formData.append("folder_id", String(currentFolderId));
        }
        await axios.post("/admin/media/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      fetchMedia(currentFolderId);
    } catch (err: any) {
      console.error("Lỗi khi tải tệp lên:", err);
      const errMsg = err.response?.data?.error || "Tải tệp lên thất bại!";
      alert(errMsg);
    } finally {
      setMediaUploadLoading(false);
    }
  };

  const handleUploadMediaFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      await uploadMediaFiles(files);
      if (e.target) e.target.value = "";
    }
  };

  const handleMediaDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMediaDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsMediaDragging(true);
  };

  const handleMediaDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsMediaDragging(false);
  };

  const handleMediaDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsMediaDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith("image/"));
      if (imageFiles.length > 0) {
        await uploadMediaFiles(imageFiles);
      } else {
        alert("Chỉ hỗ trợ tải lên các tệp tin hình ảnh!");
      }
    }
  };

  const handleDeleteMediaFile = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tệp này vĩnh viễn?")) return;
    try {
      await axios.delete(`/admin/media/file/${id}`);
      fetchMedia(currentFolderId);
    } catch (err) {
      console.error("Lỗi khi xóa tệp:", err);
      alert("Xóa tệp thất bại!");
    }
  };

  const handleBulkDeleteMediaFiles = async () => {
    if (selectedMediaIds.length === 0) return;
    if (!window.confirm(`Bạn có chắc chắn muốn xóa ${selectedMediaIds.length} tệp đã chọn vĩnh viễn?`)) return;
    setMediaLoading(true);
    try {
      await axios.post('/admin/media/files/bulk-delete', { ids: selectedMediaIds });
      setSelectedMediaIds([]);
      fetchMedia(currentFolderId);
    } catch (err) {
      console.error("Lỗi khi xóa hàng loạt tệp:", err);
      alert("Xóa tệp thất bại!");
    } finally {
      setMediaLoading(false);
    }
  };

  // Submission status updates
  const handleUpdateStatus = (id: number, status: string) => {
    router.patch(
      route("admin.submissions.status", id),
      { status },
      { 
        preserveScroll: true,
        preserveState: true
      }
    );
  };

  const handleDeleteSubmission = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa lượt đăng ký này?")) {
      router.delete(
        route("admin.submissions.destroy", id),
        { 
          preserveScroll: true,
          preserveState: true
        }
      );
    }
  };

  const getDoctorShiftAndConflictStatus = (
    doctorId: string | number,
    bookingDate: string,
    bookingTime: string,
    excludeSubmissionId?: number | null
  ) => {
    if (!doctorId || !bookingDate) return { hasShift: true, isConflicting: false };

    // Calculate day of week (1 = Monday, ..., 7 = Sunday)
    const dateObj = new Date(bookingDate);
    const jsDay = dateObj.getDay();
    const dbDayOfWeek = jsDay === 0 ? 7 : jsDay;

    // 1. Check Shift
    const doctorShiftsList = doctor_shifts.filter(
      (sh) => String(sh.doctor_id) === String(doctorId)
    );
    
    let hasShift = true;
    if (doctorShiftsList.length > 0) {
      hasShift = doctorShiftsList.some((sh) => sh.day_of_week === dbDayOfWeek);
    }

    // 2. Check Conflict
    const isConflicting = submissions.some(
      (sub) =>
        String(sub.doctor_id) === String(doctorId) &&
        sub.booking_date === bookingDate &&
        sub.booking_time === bookingTime &&
        sub.id !== excludeSubmissionId &&
        sub.status !== "Đã hủy"
    );

    return { hasShift, isConflicting };
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    manualBookingForm.post(route("consult.store"), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setShowCreateBookingModal(false);
        manualBookingForm.reset();
      },
    });
  };

  const handleEditBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBookingForm.data.id) return;
    editBookingForm.patch(route("admin.submissions.update", editBookingForm.data.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setShowEditBookingModal(false);
        editBookingForm.reset();
      },
    });
  };

  // Article Actions
  const handleOpenAddArticle = () => {
    setEditingArticle(null);
    articleForm.reset();
    setArticleViewMode("create");
  };

  const handleOpenEditArticle = (art: Article) => {
    setEditingArticle(art);
    articleForm.setData({
      title: art.title,
      description: art.description || "",
      content: art.content || "",
      legacy_author: art.author ? (typeof art.author === "object" ? art.author.name : art.author) : (art.legacy_author || ""),
      author_id: art.author_id || "",
      published_date: art.published_date || new Date().toLocaleDateString("vi-VN"),
      category: art.category,
      image_file: null,
      image: art.image || "",
      image_alt: art.image_alt || art.title || "",
      is_highlight: art.is_highlight ? 1 : 0,
      status: art.status || "published",
      focus_keyword: art.focus_keyword || "",
      slug: art.slug || "",
      meta_title: art.meta_title || "",
      meta_description: art.meta_description || "",
      meta_keywords: art.meta_keywords || "",
      meta_robots: art.meta_robots || "index, follow",
      canonical_link: art.canonical_link || "",
      meta_image: art.meta_image || "",
      schema: art.schema || "",
      related_urls: art.related_urls || "",
      redirect_urls: art.redirect_urls || "",
    });
    setArticleViewMode("edit");
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      articleForm.post(route("admin.articles.update", editingArticle.id), {
        forceFormData: true,
        onSuccess: () => {
          setArticleViewMode("list");
          articleForm.reset();
        },
      });
    } else {
      articleForm.post(route("admin.articles.store"), {
        forceFormData: true,
        onSuccess: () => {
          setArticleViewMode("list");
          articleForm.reset();
        },
      });
    }
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      router.delete(route("admin.articles.destroy", id), { preserveScroll: true });
    }
  };

  const handleToggleHighlightArticle = (id: number) => {
    router.patch(route("admin.articles.toggle-highlight", id), {}, { preserveScroll: true });
  };

  // Author Actions
  const handleOpenAddAuthor = () => {
    setEditingAuthor(null);
    authorForm.reset();
    setAuthorViewMode("create");
  };

  const handleOpenEditAuthor = (aut: Author) => {
    setEditingAuthor(aut);
    authorForm.setData({
      name: aut.name,
      slug: aut.slug || "",
      avatar_file: null,
      avatar: aut.avatar || "",
      role: aut.role || "",
      bio: aut.bio || "",
      description: aut.description || "",
      meta_title: aut.meta_title || "",
      meta_description: aut.meta_description || "",
      meta_keywords: aut.meta_keywords || "",
      meta_robots: aut.meta_robots || "",
      canonical_link: aut.canonical_link || "",
      meta_image: aut.meta_image || "",
    });
    setAuthorViewMode("edit");
  };

  const handleSaveAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAuthor) {
      authorForm.post(route("admin.authors.update", editingAuthor.id), {
        forceFormData: true,
        onSuccess: () => {
          setAuthorViewMode("list");
          authorForm.reset();
        },
      });
    } else {
      authorForm.post(route("admin.authors.store"), {
        forceFormData: true,
        onSuccess: () => {
          setAuthorViewMode("list");
          authorForm.reset();
        },
      });
    }
  };

  const handleDeleteAuthor = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tác giả này?")) {
      router.delete(route("admin.authors.destroy", id), { preserveScroll: true });
    }
  };

  // Review Actions
  const handleToggleReviewApproval = (id: number) => {
    router.post(route("admin.reviews.toggle-approval", id), {}, { preserveScroll: true });
  };

  const handleDeleteReview = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      router.delete(route("admin.reviews.destroy", id), { preserveScroll: true });
    }
  };

  // Doctor Shift Actions
  const handleSaveDoctorShift = (e: React.FormEvent) => {
    e.preventDefault();
    shiftForm.post(route("admin.doctor-shifts.store"), {
      onSuccess: () => {
        shiftForm.reset("start_time", "end_time");
      },
    });
  };

  const handleDeleteDoctorShift = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa ca trực này?")) {
      router.delete(route("admin.doctor-shifts.destroy", id), { preserveScroll: true });
    }
  };

  // Service Actions
  const handleOpenAddService = () => {
    setEditingService(null);
    serviceForm.reset();
    if (serviceCategories.length > 0) {
      serviceForm.setData("service_category_id", serviceCategories[0].id);
    }
    setServiceViewMode("create");
  };

  const handleOpenEditService = (srv: Service) => {
    setEditingService(srv);
    serviceForm.setData({
      name: srv.name,
      service_category_id: srv.service_category_id || "",
      category: srv.category || "",
      price: srv.price || "Liên hệ",
      description: srv.description || "",
      image_file: null,
      image: srv.image || "",
      banner_image: srv.banner_image || "",
      is_highlight: srv.is_highlight ? 1 : 0,
      order: srv.order || 0,
      slug: srv.slug || "",
      meta_title: srv.meta_title || "",
      meta_description: srv.meta_description || "",
      meta_keywords: srv.meta_keywords || "",
      meta_robots: srv.meta_robots || "",
      canonical_link: srv.canonical_link || "",
      meta_image: srv.meta_image || "",
      pillars: srv.pillars || [],
      reviews: srv.reviews || [],
      before_after: srv.before_after || [],
      schema: srv.schema || "",
    });
    setServiceViewMode("edit");
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      serviceForm.post(route("admin.services.update", editingService.id), {
        forceFormData: true,
        onSuccess: () => {
          setServiceViewMode("list");
          serviceForm.reset();
        },
      });
    } else {
      serviceForm.post(route("admin.services.store"), {
        forceFormData: true,
        onSuccess: () => {
          setServiceViewMode("list");
          serviceForm.reset();
        },
      });
    }
  };

  // Service Category Actions
  const handleOpenAddServiceCategory = () => {
    setEditingServiceCategory(null);
    serviceCategoryForm.reset();
    setServiceCategoryViewMode("create");
  };

  const handleOpenEditServiceCategory = (cat: ServiceCategory) => {
    setEditingServiceCategory(cat);
    serviceCategoryForm.setData({
      name: cat.name,
      slug: cat.slug || "",
      order: cat.order || 0,
    });
    setServiceCategoryViewMode("edit");
  };

  const handleSaveServiceCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingServiceCategory) {
      serviceCategoryForm.post(route("admin.service-categories.update", editingServiceCategory.id), {
        onSuccess: () => {
          setServiceCategoryViewMode("list");
          serviceCategoryForm.reset();
        },
      });
    } else {
      serviceCategoryForm.post(route("admin.service-categories.store"), {
        onSuccess: () => {
          setServiceCategoryViewMode("list");
          serviceCategoryForm.reset();
        },
      });
    }
  };

  const handleDeleteServiceCategory = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục dịch vụ này? Các dịch vụ con thuộc danh mục này sẽ chuyển sang không phân loại.")) {
      router.delete(route("admin.service-categories.destroy", id), { preserveScroll: true });
    }
  };

  const addPillar = () => {
    serviceForm.setData("pillars", [...(serviceForm.data.pillars || []), { title: "", desc: "", img: "/images/default-service.jpg" }]);
  };

  const updatePillar = (index: number, key: "title" | "desc" | "img", val: string) => {
    const list = [...(serviceForm.data.pillars || [])];
    list[index] = { ...list[index], [key]: val };
    serviceForm.setData("pillars", list);
  };

  const removePillar = (index: number) => {
    const list = [...(serviceForm.data.pillars || [])];
    list.splice(index, 1);
    serviceForm.setData("pillars", list);
  };

  const removeReview = (index: number) => {
    const list = [...(serviceForm.data.reviews || [])];
    list.splice(index, 1);
    serviceForm.setData("reviews", list);
  };

  const addBeforeAfter = () => {
    serviceForm.setData("before_after", [...(serviceForm.data.before_after || []), { title: "", before: "/images/default-service.jpg", after: "/images/default-service.jpg", desc: "" }]);
  };

  const updateBeforeAfter = (index: number, key: "title" | "desc" | "before" | "after", val: string) => {
    const list = [...(serviceForm.data.before_after || [])];
    list[index] = { ...list[index], [key]: val };
    serviceForm.setData("before_after", list);
  };

  const removeBeforeAfter = (index: number) => {
    const list = [...(serviceForm.data.before_after || [])];
    list.splice(index, 1);
    serviceForm.setData("before_after", list);
  };

  const handleDeleteService = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      router.delete(route("admin.services.destroy", id), { preserveScroll: true });
    }
  };

  const handleToggleHighlightService = (id: number) => {
    router.patch(route("admin.services.toggle-highlight", id), {}, { preserveScroll: true });
  };

  // Banner Actions
  const handleOpenAddBanner = () => {
    setEditingBanner(null);
    bannerForm.reset();
    setBannerModalOpen(true);
  };

  const handleOpenEditBanner = (bn: Banner) => {
    setEditingBanner(bn);
    bannerForm.setData({
      eyebrow: bn.eyebrow || "",
      title: bn.title || "",
      subtitle: bn.subtitle || "",
      description: bn.description || "",
      image_desktop_file: null,
      image_mobile_file: null,
      image_desktop: bn.image_desktop || "",
      image_mobile: bn.image_mobile || "",
      button_primary_text: bn.button_primary_text || "Đăng Ký Tư Vấn",
      button_primary_url: bn.button_primary_url || "#consult",
      button_secondary_text: bn.button_secondary_text || "Tìm Hiểu Dịch Vụ",
      button_secondary_url: bn.button_secondary_url || "#services",
      order: bn.order,
      is_active: bn.is_active ? 1 : 0,
    });
    setBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      bannerForm.post(route("admin.banners.update", editingBanner.id), {
        forceFormData: true,
        onSuccess: () => {
          setBannerModalOpen(false);
          bannerForm.reset();
        },
      });
    } else {
      bannerForm.post(route("admin.banners.store"), {
        forceFormData: true,
        onSuccess: () => {
          setBannerModalOpen(false);
          bannerForm.reset();
        },
      });
    }
  };

  const handleDeleteBanner = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa slide banner này?")) {
      router.delete(route("admin.banners.destroy", id), { preserveScroll: true });
    }
  };

  // Doctor Actions
  const handleOpenAddDoctor = () => {
    setEditingDoctor(null);
    doctorForm.reset();
    setDoctorViewMode("create");
  };

  const handleOpenEditDoctor = (doc: Doctor) => {
    setEditingDoctor(doc);
    doctorForm.setData({
      name: doc.name,
      role: doc.role,
      bio: doc.bio || "",
      full_bio: doc.full_bio || "",
      email: doc.email || "",
      image_file: null,
      image: doc.image || "",
      order: doc.order || 0,
      is_active: doc.is_active ? 1 : 0,
    });
    setDoctorViewMode("edit");
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      doctorForm.post(route("admin.doctors.update", editingDoctor.id), {
        forceFormData: true,
        onSuccess: () => {
          setDoctorViewMode("list");
          doctorForm.reset();
        },
      });
    } else {
      doctorForm.post(route("admin.doctors.store"), {
        forceFormData: true,
        onSuccess: () => {
          setDoctorViewMode("list");
          doctorForm.reset();
        },
      });
    }
  };

  const handleDeleteDoctor = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa bác sĩ này?")) {
      router.delete(route("admin.doctors.destroy", id), { preserveScroll: true });
    }
  };

  // FAQ Actions
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    faqForm.reset();
    setFaqModalOpen(true);
  };

  const handleOpenEditFaq = (fq: Faq) => {
    setEditingFaq(fq);
    faqForm.setData({
      question: fq.question,
      answer: fq.answer,
      order: fq.order,
    });
    setFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      faqForm.post(route("admin.faqs.update", editingFaq.id), {
        onSuccess: () => {
          setFaqModalOpen(false);
          faqForm.reset();
        },
      });
    } else {
      faqForm.post(route("admin.faqs.store"), {
        onSuccess: () => {
          setFaqModalOpen(false);
          faqForm.reset();
        },
      });
    }
  };

  const handleDeleteFaq = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa FAQ này?")) {
      router.delete(route("admin.faqs.destroy", id), { preserveScroll: true });
    }
  };

  // Real Result Actions
  const handleOpenAddRealResult = () => {
    setEditingRealResult(null);
    realResultForm.reset();
    setRealResultViewMode("create");
  };

  const handleOpenEditRealResult = (res: RealResult) => {
    setEditingRealResult(res);
    realResultForm.setData({
      category: res.category,
      title: res.title,
      detail: res.detail,
      is_video: res.is_video ? 1 : 0,
      order: res.order,
      image_file: null,
      image: res.image || "",
      video_file: null,
      slug: res.slug || "",
      meta_title: res.meta_title || "",
      meta_description: res.meta_description || "",
      meta_keywords: res.meta_keywords || "",
      meta_robots: res.meta_robots || "",
      canonical_link: res.canonical_link || "",
      meta_image: res.meta_image || "",
    });
    setRealResultViewMode("edit");
  };

  const handleSaveRealResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRealResult) {
      realResultForm.post(route("admin.real-results.update", editingRealResult.id), {
        forceFormData: true,
        onSuccess: () => {
          setRealResultViewMode("list");
          realResultForm.reset();
        },
      });
    } else {
      realResultForm.post(route("admin.real-results.store"), {
        forceFormData: true,
        onSuccess: () => {
          setRealResultViewMode("list");
          realResultForm.reset();
        },
      });
    }
  };

  const handleDeleteRealResult = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa kết quả này?")) {
      router.delete(route("admin.real-results.destroy", id), { preserveScroll: true });
    }
  };

  // Settings Actions
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    settingsForm.post(route("admin.settings.update"), {
      preserveScroll: true,
      onSuccess: () => {
        alert("Cập nhật cấu hình hệ thống thành công!");
      },
      onError: (errors) => {
        alert("Có lỗi xảy ra khi lưu cấu hình: " + Object.values(errors).join("\n"));
      }
    });
  };

  return (
    <AuthenticatedLayout minimal={true}>
      <Head title="CMS Admin Dashboard" />

      <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-[#171717] text-gray-300 flex flex-col flex-shrink-0 border-r border-gold/15 select-none z-45">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center gap-2.5">
            { (settings.site_logo_square_light || settings.site_logo_square) ? (
              <div className="w-8 h-8 relative rounded overflow-hidden flex items-center justify-center bg-white/5 border border-white/10">
                <img
                  src={settings.site_logo_square_light || settings.site_logo_square}
                  className="object-contain w-full h-full max-h-full max-w-full p-0.5"
                  alt="Theq Logo"
                />
              </div>
            ) : (
              <div className="p-1.5 bg-gold/10 rounded-lg border border-gold/30">
                <Sparkles className="text-gold w-6 h-6" />
              </div>
            )}
            <div className="text-left">
              <h2 className="font-serif font-bold text-white text-sm tracking-widest uppercase">THEQ BLOG</h2>
              <span className="text-[9px] text-gold tracking-widest uppercase font-semibold">SEO Content CMS</span>
            </div>
          </div>

          {/* Nav Links - Focused Pure Blog & SEO CMS */}
          <nav className="flex-grow p-4 space-y-4 overflow-y-auto">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 px-3 block select-none">Quản trị Nội dung & SEO</span>
              <button
                onClick={() => { setActiveTab("articles"); setArticleViewMode("list"); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "articles"
                    ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                    : "hover:bg-white/5 hover:text-white text-gray-400"
                }`}
              >
                <span className="flex items-center gap-3"><BookOpen size={16} /> Bài viết Chuẩn SEO</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === "articles" ? "bg-white text-gold" : "bg-gold/15 text-gold"}`}>
                  {articles.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab("authors"); setAuthorViewMode("list"); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "authors"
                    ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                    : "hover:bg-white/5 hover:text-white text-gray-400"
                }`}
              >
                <Users size={16} />
                <span>Tác giả (Hồ sơ E-E-A-T)</span>
              </button>

              <button
                onClick={() => setActiveTab("media")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "media"
                    ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                    : "hover:bg-white/5 hover:text-white text-gray-400"
                }`}
              >
                <ImageIcon size={16} />
                <span>Thư viện Ảnh & Thumbnail</span>
              </button>
            </div>

            <div className="space-y-1 pt-3 border-t border-white/5">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 px-3 block select-none">Cấu hình & Kỹ thuật SEO</span>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "settings"
                    ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                    : "hover:bg-white/5 hover:text-white text-gray-400"
                }`}
              >
                <Settings size={16} />
                <span>Cấu hình chung Blog</span>
              </button>
              <a
                href="/"
                target="_blank"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide hover:bg-white/5 hover:text-gold text-gray-400 transition-all"
              >
                <Sparkles size={16} />
                <span>Xem Trang Chủ Blog ↗</span>
              </a>
              <a
                href="/sitemap.xml"
                target="_blank"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide hover:bg-white/5 hover:text-gold text-gray-400 transition-all"
              >
                <FileText size={16} />
                <span>XML Sitemap SEO ↗</span>
              </a>
            </div>
          </nav>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-white/10 flex items-center justify-between gap-3 bg-black/20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-sm border border-gold/30 font-serif">
                {user.name ? user.name[0].toUpperCase() : "A"}
              </div>
              <div className="text-left">
                <span className="font-bold text-white text-xs block leading-tight">{user.name}</span>
                <Link
                  href={route("profile.edit")}
                  className="text-[10px] text-gray-400 hover:text-gold transition-colors block font-medium"
                >
                  Đổi mật khẩu
                </Link>
              </div>
            </div>
            
            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="text-gray-400 hover:text-red-400 p-2 hover:bg-white/5 rounded-lg transition-colors"
              title="Đăng xuất"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </aside>

        {/* Right Scroll Content Area */}
        <main className="flex-grow p-8 overflow-y-auto max-h-screen">
          {/* Active Tab Body Contents */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* OVERVIEW TAB (TỔNG QUAN HỆ THỐNG) */}
            {activeTab === "overview" && (
              <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div className="text-left">
                    <h2 className="text-2xl font-bold font-serif text-gray-800 tracking-wide">
                      Tổng Quan Hệ Thống
                    </h2>
                    <p className="text-xs text-gray-400 font-light mt-1">
                      {new Date().toLocaleDateString("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-green-100 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>Hệ thống trực tuyến (Live)</span>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-left">
                  {/* Card 1 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                        Yêu cầu tư vấn mới
                      </span>
                      <span className="text-3xl font-bold text-indigo-600 block font-serif">
                        {submissions.filter(s => s.status === "pending" || s.status === "Chờ xử lý").length}
                      </span>
                      <span className="text-[10px] text-gray-400 font-light mt-1 block">
                        Đang chờ phản hồi
                      </span>
                    </div>
                    <div className="p-4 bg-indigo-50 text-indigo-500 rounded-2xl">
                      <Phone size={24} />
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                        Lượt đăng ký hôm nay
                      </span>
                      <span className="text-3xl font-bold text-emerald-600 block font-serif">
                        {submissions.filter(s => {
                          const today = new Date().toISOString().split("T")[0];
                          return s.created_at && s.created_at.includes(today);
                        }).length}
                      </span>
                      <span className="text-[10px] text-gray-400 font-light mt-1 block">
                        Khách hàng trong ngày
                      </span>
                    </div>
                    <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl">
                      <CheckCircle size={24} />
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                        Bài viết tin tức
                      </span>
                      <span className="text-3xl font-bold text-amber-600 block font-serif">
                        {articles.length}
                      </span>
                      <span className="text-[10px] text-gray-400 font-light mt-1 block">
                        Tin tức & chuyên môn
                      </span>
                    </div>
                    <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl">
                      <BookOpen size={24} />
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                        Dịch vụ hoạt động
                      </span>
                      <span className="text-3xl font-bold text-rose-600 block font-serif">
                        {services.length}
                      </span>
                      <span className="text-[10px] text-gray-400 font-light mt-1 block">
                        Gồm cả dịch vụ nổi bật
                      </span>
                    </div>
                    <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl">
                      <Sparkles size={24} />
                    </div>
                  </div>
                </div>

                {/* Submissions Trend Chart */}
                {/* Submissions Trend Chart (Premium Glassmorphic Column Chart) */}
                {analytics?.daily_trends && (() => {
                  const trends = analytics.daily_trends || [];
                  const totalRegistrations = trends.reduce((sum, item) => sum + item.count, 0);
                  const maxVal = Math.max(...trends.map(d => d.count), 5); // Fallback to 5 to avoid extremely short charts

                  return (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-50 pb-4">
                        <div>
                          <h3 className="text-base font-bold font-serif text-gray-800 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
                            Biểu Đồ Xu Hướng Đăng Ký (7 ngày qua)
                          </h3>
                          <p className="text-xs text-gray-400 font-light mt-0.5">
                            Tổng cộng có <span className="font-bold text-gold">{totalRegistrations}</span> lượt đăng ký tư vấn mới
                          </p>
                        </div>

                        <a
                          href={route("admin.submissions.export")}
                          className="group inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold/90 hover:from-gold-dark hover:to-gold text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 mr-0.5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Xuất dữ liệu Excel (CSV)
                        </a>
                      </div>

                      {/* SVG Canvas for Glassmorphic Columns */}
                      <div className="w-full h-56 relative bg-gradient-to-b from-gray-50/10 to-gray-50/40 rounded-2xl border border-gray-100/70 p-4">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 180" preserveAspectRatio="none">
                          {/* Horizontal Grid lines */}
                          <line x1="50" y1="30" x2="650" y2="30" stroke="#f1f3f6" strokeWidth="1.2" strokeDasharray="3 3" />
                          <line x1="50" y1="85" x2="650" y2="85" stroke="#f1f3f6" strokeWidth="1.2" strokeDasharray="3 3" />
                          <line x1="50" y1="140" x2="650" y2="140" stroke="#f1f3f6" strokeWidth="1.2" strokeDasharray="3 3" />

                          {/* Y-axis Labels on Left */}
                          <text x="38" y="33" textAnchor="end" fill="#9ca3af" className="text-[9.5px] font-bold select-none">{maxVal}</text>
                          <text x="38" y="88" textAnchor="end" fill="#9ca3af" className="text-[9.5px] font-bold select-none">{Math.round(maxVal / 2)}</text>
                          <text x="38" y="143" textAnchor="end" fill="#9ca3af" className="text-[9.5px] font-bold select-none">0</text>

                          {/* Columns Map */}
                          {(() => {
                            const points = trends.map((item, i) => {
                              const x = (i / 6) * 560 + 75; // spaced across 560px, starting from x=75
                              const barHeight = (item.count / maxVal) * 110; // max height of 110px
                              const y = 140 - barHeight;
                              return { x, y, barHeight, ...item };
                            });

                            return (
                              <>
                                {points.map((p, i) => {
                                  const isHovered = hoveredBarIndex === i;
                                  return (
                                    <g key={i} className="group">
                                      {/* Background Track Column */}
                                      <rect
                                        x={p.x - 14}
                                        y="30"
                                        width="28"
                                        height="110"
                                        rx="6"
                                        fill="#eef0f3"
                                        opacity="0.55"
                                        className="transition-colors duration-200"
                                      />

                                      {/* Active Data Column Rect */}
                                      {p.barHeight > 0 && (
                                        <rect
                                          x={p.x - 14}
                                          y={p.y}
                                          width="28"
                                          height={p.barHeight}
                                          rx="6"
                                          fill="url(#barGrad)"
                                          className={`transition-all duration-300 ${
                                            isHovered ? "brightness-110 filter drop-shadow-[0_4px_8px_rgba(197,168,128,0.35)]" : ""
                                          }`}
                                        />
                                      )}

                                      {/* Static Indicator dot if registration > 0 but not hovered */}
                                      {p.count > 0 && !isHovered && (
                                        <circle
                                          cx={p.x}
                                          cy={p.y}
                                          r="3.5"
                                          fill="#ffffff"
                                          stroke="#c5a880"
                                          strokeWidth="2"
                                          className="pointer-events-none"
                                        />
                                      )}

                                      {/* Static labels showing daily numbers */}
                                      <text
                                        x={p.x}
                                        y={p.y - 8}
                                        textAnchor="middle"
                                        fill={p.count > 0 ? "#c5a880" : "#babcbf"}
                                        className={`text-[10px] font-bold select-none transition-all duration-200 ${
                                          p.count > 0 ? "opacity-100 font-extrabold" : "opacity-45"
                                        } ${isHovered ? "opacity-0 scale-75" : ""}`}
                                      >
                                        {p.count}
                                      </text>

                                      {/* X Axis Dates */}
                                      <text
                                        x={p.x}
                                        y="160"
                                        textAnchor="middle"
                                        fill="#6b7280"
                                        className={`text-[10px] font-bold tracking-tight select-none transition-colors duration-250 ${
                                          isHovered ? "fill-gold font-black scale-105" : ""
                                        }`}
                                      >
                                        {p.date}
                                      </text>

                                      {/* Hit Box / Trigger Rect */}
                                      <rect
                                        x={p.x - 20}
                                        y="20"
                                        width="40"
                                        height="150"
                                        fill="transparent"
                                        className="cursor-pointer"
                                        onMouseEnter={() => setHoveredBarIndex(i)}
                                        onMouseLeave={() => setHoveredBarIndex(null)}
                                      />
                                    </g>
                                  );
                                })}

                                {/* Hover Tooltip Popup Card */}
                                {hoveredBarIndex !== null && points[hoveredBarIndex] && (() => {
                                  const hp = points[hoveredBarIndex];
                                  const boxW = 120;
                                  const boxH = 48;
                                  const rx = hp.x;
                                  const tx = Math.max(boxW / 2 + 10, Math.min(700 - boxW / 2 - 10, rx));
                                  const ty = Math.max(8, hp.y - boxH - 12);
                                  return (
                                    <g className="pointer-events-none transition-all duration-200 ease-out">
                                      {/* Soft dark box */}
                                      <rect
                                        x={tx - boxW / 2}
                                        y={ty}
                                        width={boxW}
                                        height={boxH}
                                        rx="7"
                                        fill="#111827"
                                        opacity="0.96"
                                      />
                                      {/* Arrow */}
                                      <polygon
                                        points={`${rx - 6},${ty + boxH} ${rx + 6},${ty + boxH} ${rx},${ty + boxH + 4}`}
                                        fill="#111827"
                                        opacity="0.96"
                                      />
                                      {/* Tooltip Content */}
                                      <text
                                        x={tx}
                                        y={ty + 17}
                                        textAnchor="middle"
                                        fill="#9ca3af"
                                        className="text-[9.5px] font-semibold font-sans tracking-wide"
                                      >
                                        Ngày {hp.date}
                                      </text>
                                      <text
                                        x={tx}
                                        y={ty + 33}
                                        textAnchor="middle"
                                        fill="#ffffff"
                                        className="text-[11.5px] font-black font-sans"
                                      >
                                        {hp.count} lượt đăng ký
                                      </text>
                                    </g>
                                  );
                                })()}
                              </>
                            );
                          })()}

                          {/* Gradient Definitions */}
                          <defs>
                            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#c5a880" />
                              <stop offset="100%" stopColor="#c5a880" stopOpacity="0.1" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  );
                })()}

                {/* Lower Row: Split boxes matching target layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                  {/* Box 1: Liên hệ & Tư vấn */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                      <h4 className="font-bold text-sm text-gray-800 uppercase tracking-wide">Yêu cầu liên hệ & Tư vấn</h4>
                    </div>
                    
                    <div className="p-6 flex-grow space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-xs text-gray-500 font-light">Đăng ký mới hôm nay:</span>
                        <span className="text-sm font-bold text-gray-800">
                          {submissions.filter(s => {
                            const today = new Date().toISOString().split("T")[0];
                            return s.created_at && s.created_at.includes(today);
                          }).length}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-xs text-gray-500 font-light">Yêu cầu chưa xử lý (Chờ xử lý):</span>
                        <span className="text-sm font-bold text-rose-500">
                          {submissions.filter(s => s.status === "pending" || s.status === "Chờ xử lý").length}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-xs text-gray-500 font-light">Đã tiếp cận & liên hệ:</span>
                        <span className="text-sm font-bold text-indigo-500">
                          {submissions.filter(s => s.status === "contacted" || s.status === "Đã liên hệ").length}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2">
                        <span className="text-xs text-gray-500 font-light">Đăng ký đã hủy:</span>
                        <span className="text-sm font-bold text-gray-400">
                          {submissions.filter(s => s.status === "cancelled" || s.status === "Đã hủy").length}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-50 bg-gray-50/20 text-center">
                      <button
                        onClick={() => setActiveTab("submissions")}
                        className="text-xs font-bold text-gold hover:text-gold-dark transition-colors inline-flex items-center gap-1"
                      >
                        Xem chi tiết danh sách tư vấn →
                      </button>
                    </div>
                  </div>

                  {/* Box 2: Quản lý Nội dung */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      <h4 className="font-bold text-sm text-gray-800 uppercase tracking-wide">Quản lý cơ sở dữ liệu nội dung</h4>
                    </div>

                    <div className="p-6 flex-grow space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-xs text-gray-500 font-light">Danh mục dịch vụ y khoa:</span>
                        <span className="text-sm font-bold text-gray-800">{services.length}</span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-xs text-gray-500 font-light">Số lượng bài viết đã đăng:</span>
                        <span className="text-sm font-bold text-gray-800">{articles.length}</span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-xs text-gray-500 font-light">Kết quả thực tế (Trước/Sau):</span>
                        <span className="text-sm font-bold text-gray-800">{realResults.length}</span>
                      </div>

                      <div className="flex justify-between items-center py-2">
                        <span className="text-xs text-gray-500 font-light">Câu hỏi thường gặp FAQ:</span>
                        <span className="text-sm font-bold text-gray-800">{faqs.length}</span>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-50 bg-gray-50/20 text-center">
                      <button
                        onClick={() => setActiveTab("services")}
                        className="text-xs font-bold text-indigo-500 hover:text-indigo-655 transition-colors inline-flex items-center gap-1"
                      >
                        Quản lý danh mục dịch vụ →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUBMISSIONS TAB */}
            {activeTab === "submissions" && (() => {
              const filteredSubmissions = submissions.filter((sub) => {
                const matchSearch =
                  sub.name.toLowerCase().includes(submissionSearchTerm.toLowerCase()) ||
                  sub.phone.includes(submissionSearchTerm) ||
                  (sub.email && sub.email.toLowerCase().includes(submissionSearchTerm.toLowerCase()));
                const matchStatus =
                  submissionStatusFilter === "all" || sub.status === submissionStatusFilter;
                return matchSearch && matchStatus;
              });

              return (
                <div>
                  {/* Breadcrumb path */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                    <span className="cursor-pointer hover:text-gold transition-colors flex items-center gap-1" onClick={() => setActiveTab("overview")}>
                      <LayoutDashboard size={12} />
                      <span>Tổng quan</span>
                    </span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-600">Danh Sách Đăng Ký</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-150/60 mb-6" />

                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="text-base font-bold font-serif text-gray-800 text-left">
                      Danh Sách Đăng Ký Tư Vấn & Đặt Lịch
                    </h3>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      {/* Search bar */}
                      <div className="relative w-full sm:w-64">
                        <input
                          type="text"
                          placeholder="Tìm tên, SĐT..."
                          value={submissionSearchTerm}
                          onChange={(e) => setSubmissionSearchTerm(e.target.value)}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-2 pr-10 rounded-xl text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                        />
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>

                      {/* Status Filter */}
                      <div className="relative w-full sm:w-40">
                        <select
                          value={submissionStatusFilter}
                          onChange={(e) => setSubmissionStatusFilter(e.target.value)}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-2 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm appearance-none cursor-pointer"
                        >
                          <option value="all">Tất cả trạng thái</option>
                          <option value="Chờ liên hệ">Chờ liên hệ</option>
                          <option value="Đã liên hệ">Đã liên hệ</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[9px]">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {filteredSubmissions.length === 0 ? (
                    <p className="text-gray-400 text-center py-12 font-light">Chưa có lượt đăng ký nào phù hợp.</p>
                  ) : (
                    <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                            <th className="py-3.5 px-4">Khách Hàng</th>
                            <th className="py-3.5 px-4">Số Điện Thoại</th>
                            <th className="py-3.5 px-4">Ngày Đăng Ký</th>
                            <th className="py-3.5 px-4 text-center">Trạng Thái</th>
                            <th className="py-3.5 px-4 text-right">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                          {filteredSubmissions.map((sub) => {
                            return (
                              <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                {/* Customer Info */}
                                <td className="py-4 px-4">
                                  <div className="font-bold text-gray-800 text-sm">{sub.name}</div>
                                  {sub.email && <div className="text-[10px] text-gray-400 font-light mt-0.5">{sub.email}</div>}
                                </td>

                                {/* Phone */}
                                <td className="py-4 px-4">
                                  <a href={`tel:${sub.phone}`} className="hover:underline font-bold text-gold text-sm">
                                    {sub.phone}
                                  </a>
                                </td>

                                {/* Submission Time */}
                                <td className="py-4 px-4 text-gray-400 font-medium">
                                  {new Date(sub.created_at).toLocaleString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </td>

                                {/* Status */}
                                <td className="py-4 px-4 text-center">
                                  <select
                                    value={sub.status}
                                    onChange={(e) => handleUpdateStatus(sub.id, e.target.value)}
                                    className={`text-[10px] font-black rounded-lg px-2.5 py-1.5 focus:outline-none border cursor-pointer transition-colors ${
                                      sub.status === "Chờ liên hệ"
                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                        : sub.status === "Đã liên hệ"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-red-50 text-red-700 border-red-200"
                                    }`}
                                  >
                                    <option value="Chờ liên hệ">Chờ liên hệ</option>
                                    <option value="Đã liên hệ">Đã liên hệ</option>
                                    {sub.status === "Đã hủy" && (
                                      <option value="Đã hủy">Đã hủy</option>
                                    )}
                                  </select>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-4 text-right">
                                  <button
                                    onClick={() => handleDeleteSubmission(sub.id)}
                                    className="text-red-500 hover:text-red-750 p-1.5 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                    title="Xóa lượt đăng ký"
                                  >
                                    <Trash size={15} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (() => {
              const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
              
              const formatDateStr = (date: Date) => {
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                return `${yyyy}-${mm}-${dd}`;
              };

              const getBookingsForDate = (dateStr: string) => {
                return submissions.filter(sub => sub.booking_date === dateStr);
              };

              const prevMonth = () => {
                setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1));
              };

              const nextMonth = () => {
                setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));
              };

              // Generate calendar days
              const year = calendarViewDate.getFullYear();
              const month = calendarViewDate.getMonth();
              const firstDayOfMonth = new Date(year, month, 1);
              let startDayOfWeek = firstDayOfMonth.getDay();
              // Adjust Sunday (0) to index 6, Monday (1) to index 0, etc.
              startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
              const totalDays = new Date(year, month + 1, 0).getDate();

              const calendarDays: (Date | null)[] = [];
              for (let i = 0; i < startDayOfWeek; i++) {
                calendarDays.push(null);
              }
              for (let d = 1; d <= totalDays; d++) {
                calendarDays.push(new Date(year, month, d));
              }

              // Selected date bookings
              const dayBookings = getBookingsForDate(selectedCalendarDateStr);

              // Filtered Selected date bookings based on local day search
              const filteredDayBookings = dayBookings.filter(sub => {
                return sub.name.toLowerCase().includes(daySearchQuery.toLowerCase()) ||
                       sub.phone.includes(daySearchQuery) ||
                       (sub.service && sub.service.toLowerCase().includes(daySearchQuery.toLowerCase())) ||
                       (sub.doctor && sub.doctor.name.toLowerCase().includes(daySearchQuery.toLowerCase()));
              });

              // Status Summary Count
              const pendingCount = dayBookings.filter(s => s.status === 'Chờ liên hệ').length;
              const contactedCount = dayBookings.filter(s => s.status === 'Đã liên hệ').length;
              const cancelledCount = dayBookings.filter(s => s.status === 'Đã hủy').length;

              return (
                <div>
                  {/* Breadcrumb path */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                    <span className="cursor-pointer hover:text-gold transition-colors flex items-center gap-1" onClick={() => setActiveTab("overview")}>
                      <LayoutDashboard size={12} />
                      <span>Tổng quan</span>
                    </span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-600">Lịch Hẹn Trực Tuyến</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-150/60 mb-6" />

                  {/* Split Layout Container */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left: Calendar Month view */}
                    <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      {/* Calendar Navigation Header */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-base font-bold text-gray-800 font-serif">
                              Lịch Hẹn Trực Tuyến
                            </h3>
                            <button
                              onClick={() => {
                                manualBookingForm.reset();
                                manualBookingForm.setData({
                                  name: "",
                                  phone: "",
                                  email: "",
                                  service: "",
                                  branch: "",
                                  booking_date: selectedCalendarDateStr,
                                  booking_time: "",
                                  doctor_id: "",
                                  note: "",
                                });
                                setShowCreateBookingModal(true);
                              }}
                              className="bg-gold hover:bg-gold/90 text-white font-bold px-3 py-1.5 rounded-xl text-[10.5px] cursor-pointer transition-colors flex items-center gap-1 shadow-sm font-sans"
                            >
                              <Plus size={11} strokeWidth={3} />
                              <span>Tạo lịch hẹn</span>
                            </button>
                          </div>
                          <p className="text-[11px] text-gray-400 font-medium mt-0.5">Quản lý và điều phối lịch trình chăm sóc da & thẩm mỹ</p>
                        </div>
                        
                        <div className="flex items-center gap-3.5 bg-gray-55 px-3 py-1.5 rounded-xl border border-gray-100">
                          <button
                            onClick={prevMonth}
                            className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors cursor-pointer flex items-center justify-center"
                            title="Tháng trước"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <span className="text-xs font-bold text-gray-700 min-w-[100px] text-center select-none font-mono">
                            THÁNG {month + 1} / {year}
                          </span>
                          <button
                            onClick={nextMonth}
                            className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors cursor-pointer flex items-center justify-center"
                            title="Tháng sau"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Weekday Names Header */}
                      <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 py-2.5 bg-gray-50/50 rounded-xl mb-3 select-none">
                        {WEEKDAYS.map(day => (
                          <div key={day} className={day === 'CN' ? 'text-red-500' : ''}>
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((date, idx) => {
                          if (!date) {
                            return <div key={`empty-${idx}`} className="aspect-square bg-gray-50/10 rounded-xl" />;
                          }

                          const dateStr = formatDateStr(date);
                          const bookings = getBookingsForDate(dateStr);
                          const isSelected = selectedCalendarDateStr === dateStr;
                          const isToday = formatDateStr(new Date()) === dateStr;
                          const dayNum = date.getDate();
                          const isOverloaded = bookings.length >= 5;

                          return (
                            <button
                              key={dateStr}
                              onClick={() => {
                                setSelectedCalendarDateStr(dateStr);
                                setDaySearchQuery(""); // clear local query
                              }}
                              className={`aspect-square rounded-xl p-2 flex flex-col items-start justify-between border transition-all cursor-pointer select-none group relative ${
                                isSelected
                                  ? isOverloaded
                                    ? 'border-red-500 bg-red-50 shadow-sm'
                                    : 'border-gold bg-gold/5 shadow-sm'
                                  : isOverloaded
                                  ? 'border-red-200 bg-red-50/50 hover:bg-red-50'
                                  : isToday
                                  ? 'border-gray-900 bg-gray-50'
                                  : 'border-gray-100 hover:border-gold/30 hover:bg-gold/5/5 bg-white'
                              }`}
                              title={isOverloaded ? "Ngày quá tải lịch hẹn (>= 5 ca)" : undefined}
                            >
                              {/* Day number */}
                              <span className={`text-xs font-bold ${
                                isSelected 
                                  ? isOverloaded ? 'text-red-600 font-black' : 'text-gold' 
                                  : isOverloaded
                                  ? 'text-red-650'
                                  : isToday 
                                  ? 'text-gray-900' 
                                  : 'text-gray-700'
                              }`}>
                                {dayNum}
                              </span>

                              {/* Booking count dot/badge */}
                              {bookings.length > 0 && (
                                <span className={`absolute bottom-2 right-2 text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full text-center border ${
                                  isOverloaded
                                    ? 'bg-red-600 text-white border-red-600 animate-pulse'
                                    : isSelected
                                    ? 'bg-gold text-white border-gold'
                                    : 'bg-gold/10 text-gold border-gold/20'
                                }`}>
                                  {bookings.length}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Selected Date Bookings list */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[500px]">
                      {/* Pane Header */}
                      <div className="border-b border-gray-100 pb-4 mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider select-none">BẢNG PHÂN PHỐI LỊCH</h4>
                            <h3 className="text-sm font-bold text-gray-800 mt-1 select-none flex items-center gap-1.5 font-mono">
                              <Calendar size={14} className="text-gold" />
                              {selectedCalendarDateStr.split('-').reverse().join('/')}
                            </h3>
                          </div>
                          <span className="bg-gold text-white text-xs font-black px-2.5 py-1 rounded-lg select-none">
                            {dayBookings.length} LỊCH
                          </span>
                        </div>

                        {/* Status Summary chips */}
                        {dayBookings.length > 0 && (
                          <div className="flex gap-1.5 text-[9.5px] text-gray-500 mt-2 select-none flex-wrap">
                            <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-100 font-semibold">Chờ liên hệ: {pendingCount}</span>
                            <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100 font-semibold">Đã liên hệ: {contactedCount}</span>
                            {cancelledCount > 0 && (
                              <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100 font-semibold">Đã hủy: {cancelledCount}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Day Search input */}
                      {dayBookings.length > 0 && (
                        <div className="relative mb-3">
                          <input
                            type="text"
                            placeholder="Tìm khách hàng, bác sĩ..."
                            value={daySearchQuery}
                            onChange={(e) => setDaySearchQuery(e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-3.5 py-2 pr-9 rounded-xl text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                          />
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      )}

                      {/* Pane Content */}
                      <div className="flex-grow space-y-4 overflow-y-auto max-h-[460px] pr-1">
                        {dayBookings.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
                            <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            <p className="text-xs font-semibold text-gray-400">Không có lịch hẹn nào</p>
                            <p className="text-[10px] text-gray-350 mt-0.5">Không tìm thấy yêu cầu đặt lịch hẹn cho ngày này.</p>
                          </div>
                        ) : filteredDayBookings.length === 0 ? (
                          <p className="text-gray-400 text-center py-12 text-xs font-light">Không tìm thấy kết quả phù hợp với từ khóa.</p>
                        ) : (
                          filteredDayBookings.map((sub) => (
                            <div
                              key={sub.id}
                              className="relative pl-4 border-l-2 border-gold/30 py-1 bg-white hover:bg-gold/5/5 transition-all"
                            >
                              {/* Header Inside Card */}
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex flex-wrap gap-1.5 items-center">
                                  <span className="bg-gold/5 border border-gold/15 text-gold text-[9.5px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
                                    <Clock size={10} />
                                    {sub.booking_time}
                                  </span>
                                  {sub.service && (
                                    <span className="bg-gray-100 text-gray-650 text-[9.5px] font-bold px-2 py-0.5 rounded-md">
                                      {sub.service}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => {
                                      editBookingForm.reset();
                                      editBookingForm.setData({
                                        id: sub.id,
                                        name: sub.name,
                                        phone: sub.phone,
                                        email: sub.email || "",
                                        service: sub.service || "",
                                        branch: sub.branch || "",
                                        booking_date: sub.booking_date || "",
                                        booking_time: sub.booking_time || "",
                                        doctor_id: sub.doctor_id || "",
                                        note: sub.note || "",
                                        status: sub.status,
                                      });
                                      setShowEditBookingModal(true);
                                    }}
                                    className="text-gray-400 hover:text-gold p-1 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                                    title="Chỉnh sửa lịch hẹn"
                                  >
                                    <Edit size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubmission(sub.id)}
                                    className="text-red-500 hover:text-red-750 p-1 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                    title="Xóa lịch hẹn"
                                  >
                                    <Trash size={13} />
                                  </button>
                                </div>
                              </div>

                              {/* Customer Details */}
                              <div className="mt-1 text-xs text-gray-600 space-y-1">
                                <div className="font-bold text-gray-800 text-sm">{sub.name}</div>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap font-medium">
                                  <a href={`tel:${sub.phone}`} className="text-gold font-bold hover:underline flex items-center gap-1">
                                    <Phone size={10} />
                                    {sub.phone}
                                  </a>
                                  {sub.branch && (
                                    <span className="flex items-center gap-1">
                                      <MapPin size={10} />
                                      {sub.branch}
                                    </span>
                                  )}
                                </div>
                                
                                {sub.doctor && (
                                  <div className="mt-1.5 flex items-center gap-1 text-[10.5px] font-semibold text-gray-700 bg-gray-50/70 border border-gray-100 px-2 py-1 rounded w-fit select-none">
                                    <Users size={10} className="text-gold" />
                                    Bác sĩ: <span className="text-gold font-bold">{sub.doctor.name}</span>
                                  </div>
                                )}
                                
                                {sub.note && (
                                  <div className="mt-2 bg-gray-50/50 border border-gray-100 p-2 rounded-lg text-gray-500 text-[10.5px] leading-relaxed italic">
                                    "{sub.note}"
                                  </div>
                                )}
                              </div>

                              {/* Status Dropdown footer */}
                              <div className="mt-3 flex justify-between items-center pt-2.5 border-t border-gray-50/50">
                                <span className="text-[9px] text-gray-400 font-light font-mono">
                                  Đăng ký: {new Date(sub.created_at).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                                </span>
                                {sub.status === "Chờ liên hệ" ? (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => handleUpdateStatus(sub.id, "Đã liên hệ")}
                                      className="bg-green-600 hover:bg-green-750 text-white font-bold px-2 py-1 rounded text-[9px] cursor-pointer transition-colors"
                                    >
                                      Xác nhận
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(sub.id, "Đã hủy")}
                                      className="bg-red-50 hover:bg-red-100 text-red-655 font-bold px-2 py-1 rounded text-[9px] cursor-pointer transition-colors"
                                    >
                                      Hủy bỏ
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                      sub.status === "Đã liên hệ" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {sub.status === "Đã liên hệ" ? "Đã xác nhận" : "Đã hủy"}
                                    </span>
                                    <button
                                      onClick={() => handleUpdateStatus(sub.id, "Chờ liên hệ")}
                                      className="text-[9.5px] text-gray-400 hover:text-gold transition-colors font-medium underline cursor-pointer"
                                      title="Hoàn tác về Chờ liên hệ"
                                    >
                                      Hoàn tác
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

            {/* ARTICLES TAB */}
            {activeTab === "articles" && (
              <div>
                {/* Mode: List View */}
                {articleViewMode === "list" && (
                  <div>
                    {/* Breadcrumb path */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setActiveTab("overview")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">Bài Viết</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      {/* THÊM MỚI Button */}
                      <button
                        onClick={handleOpenAddArticle}
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[11px] tracking-wider uppercase px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
                      >
                        Thêm mới
                      </button>

                      {/* Search box matching design */}
                      <div className="relative w-72">
                        <input
                          type="text"
                          placeholder="Tìm kiếm.."
                          value={articleSearchTerm}
                          onChange={(e) => { setArticleSearchTerm(e.target.value); setArticleCurrentPage(1); }}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 pr-10 rounded text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                        />
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Listing Table matching Design */}
                    {articles.length === 0 ? (
                      <p className="text-gray-400 text-center py-12 font-light">Chưa có bài viết nào.</p>
                    ) : (() => {
                      const filtered = articles.filter(art => 
                        art.title.toLowerCase().includes(articleSearchTerm.toLowerCase()) ||
                        (art.category && art.category.toLowerCase().includes(articleSearchTerm.toLowerCase()))
                      );

                      if (filtered.length === 0) {
                        return <p className="text-gray-400 text-center py-12 font-light">Không tìm thấy bài viết phù hợp với từ khóa.</p>;
                      }

                      const itemsPerPage = 10;
                      const totalPages = Math.ceil(filtered.length / itemsPerPage);
                      const safeCurrentPage = Math.min(articleCurrentPage, totalPages || 1);
                      const currentArticles = filtered.slice(
                        (safeCurrentPage - 1) * itemsPerPage,
                        safeCurrentPage * itemsPerPage
                      );

                      return (
                        <div className="space-y-4">
                          <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                              <thead>
                                <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                                  <th className="py-4 px-4 w-12 text-center">ID</th>
                                  <th className="py-4 px-4 w-28">Hình ảnh</th>
                                  <th className="py-4 px-4">Tiêu đề</th>
                                  <th className="py-4 px-4 text-center w-28">Nổi bật</th>
                                  <th className="py-4 px-4 text-center w-28">Trạng thái</th>
                                  <th className="py-4 px-4 text-center w-20">Lượt xem</th>
                                  <th className="py-4 px-4 text-center w-28">Điểm SEO</th>
                                  <th className="py-4 px-4 text-center w-36">Ngày đăng</th>
                                  <th className="py-4 px-4 text-right w-28">Thao tác</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                                {currentArticles.map((art) => {
                                  const seoScore = evaluateArticleSeo({
                                    title: art.title || "",
                                    slug: art.slug || "",
                                    description: art.description || "",
                                    content: art.content || "",
                                    image: art.image || "",
                                    imageAlt: art.image_alt || art.title || "",
                                    authorId: art.author_id,
                                    legacyAuthor: art.legacy_author || "",
                                    focusKeyword: art.focus_keyword || "",
                                    metaTitle: art.meta_title || "",
                                    metaDescription: art.meta_description || "",
                                  }).score;
                                  return (
                                  <tr key={art.id} className="hover:bg-gray-50/50 transition-colors">
                                    {/* ID */}
                                    <td className="py-4 px-4 text-center font-bold text-gray-400 align-middle">
                                      {art.id}
                                    </td>

                                    {/* HÌNH ẢNH */}
                                    <td className="py-4 px-4 align-middle">
                                      <div className="relative w-20 h-12 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                        {art.image ? (
                                          <img src={art.image} alt={art.image_alt || art.title} className="object-cover w-full h-full" />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-300">No Img</div>
                                        )}
                                      </div>
                                    </td>

                                    {/* TIÊU ĐỀ */}
                                    <td className="py-4 px-4 align-middle font-medium text-gray-800 text-left max-w-sm">
                                      <div className="line-clamp-2 uppercase leading-snug tracking-normal">
                                        {art.title}
                                      </div>
                                      <div className="text-[10px] text-gray-400 font-light mt-1 flex flex-wrap items-center gap-2">
                                        <span className="bg-gold/10 text-gold font-bold px-1.5 py-0.5 rounded text-[8px] tracking-wider uppercase">
                                          {art.category}
                                        </span>
                                        <span>Tác giả: {art.author ? (typeof art.author === "object" ? art.author.name : art.author) : (art.legacy_author || "Theq")}</span>
                                        {art.focus_keyword && (
                                          <span className="text-blue-600 font-medium">• KW: {art.focus_keyword}</span>
                                        )}
                                      </div>
                                    </td>

                                    {/* IS FEATURED */}
                                    <td className="py-4 px-4 text-center align-middle">
                                      <button
                                        type="button"
                                        onClick={() => handleToggleHighlightArticle(art.id)}
                                        className="focus:outline-none inline-flex"
                                        title={art.is_highlight ? "Bỏ nổi bật" : "Đặt nổi bật"}
                                      >
                                        {art.is_highlight ? (
                                          <span className="w-3 h-3 rounded-full bg-[#f97316] inline-block shadow-sm transition-all hover:scale-110"></span>
                                        ) : (
                                          <span className="w-3 h-3 rounded-full bg-gray-300 inline-block shadow-sm transition-all hover:scale-110"></span>
                                        )}
                                      </button>
                                    </td>

                                    {/* TRẠNG THÁI */}
                                    <td className="py-4 px-4 text-center align-middle">
                                      {art.status === "draft" ? (
                                        <span className="bg-amber-50 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
                                          Bản nháp
                                        </span>
                                      ) : (
                                        <span className="bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold px-2 py-0.5 rounded border border-[#10b981]/10 uppercase tracking-wider">
                                          Xuất bản
                                        </span>
                                      )}
                                    </td>

                                    {/* LƯỢT XEM */}
                                    <td className="py-4 px-4 text-center align-middle font-medium text-gray-500">
                                      {(art.views || 0).toLocaleString("vi-VN")}
                                    </td>

                                    {/* ĐIỂM SEO */}
                                    <td className="py-4 px-4 text-center align-middle">
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                        seoScore >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : seoScore >= 55 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-600 border-red-200"
                                      }`}>
                                        {seoScore}/100
                                      </span>
                                    </td>

                                    {/* NGÀY ĐĂNG */}
                                    <td className="py-4 px-4 text-center align-middle text-gray-400 font-light text-[10px]">
                                      {art.published_date || "—"}
                                    </td>

                                    {/* THAO TÁC */}
                                    <td className="py-4 px-4 text-right align-middle">
                                      <div className="flex justify-end gap-1">
                                        {art.slug && (
                                          <a
                                            href={`/tin-tuc/${art.slug}`}
                                            target="_blank"
                                            className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors text-xs font-bold"
                                            title="Xem bài viết trên Blog"
                                          >
                                            ↗
                                          </a>
                                        )}
                                        <button
                                          onClick={() => handleOpenEditArticle(art)}
                                          className="text-gold hover:text-gold-dark p-2 hover:bg-gold/5 rounded-lg transition-colors"
                                          title="Chỉnh sửa"
                                        >
                                          <Edit size={14} />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteArticle(art.id)}
                                          className="text-red-500 hover:text-red-750 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                          title="Xóa"
                                        >
                                          <Trash size={14} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          {/* Pagination controls */}
                          {totalPages > 1 && (
                            <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 border border-gray-150 rounded-xl mt-4 select-none">
                              <div className="flex flex-1 justify-between sm:hidden">
                                <button
                                  type="button"
                                  onClick={() => setArticleCurrentPage((prev) => Math.max(prev - 1, 1))}
                                  disabled={safeCurrentPage === 1}
                                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                  Trước
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setArticleCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                  disabled={safeCurrentPage === totalPages}
                                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                  Sau
                                </button>
                              </div>
                              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between text-left">
                                <div>
                                  <p className="text-xs text-gray-500 font-light">
                                    Hiển thị từ <span className="font-semibold text-gray-700">{(safeCurrentPage - 1) * itemsPerPage + 1}</span> đến{" "}
                                    <span className="font-semibold text-gray-700">
                                      {Math.min(safeCurrentPage * itemsPerPage, filtered.length)}
                                    </span>{" "}
                                    trong tổng số <span className="font-semibold text-gray-700">{filtered.length}</span> bài viết
                                  </p>
                                </div>
                                <div>
                                  <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm bg-white" aria-label="Pagination">
                                    <button
                                      type="button"
                                      onClick={() => setArticleCurrentPage((prev) => Math.max(prev - 1, 1))}
                                      disabled={safeCurrentPage === 1}
                                      className="relative inline-flex items-center rounded-l-lg px-2.5 py-2 text-gray-400 ring-1 ring-inset ring-gray-150 hover:bg-gray-50 focus:z-20 disabled:opacity-40 cursor-pointer"
                                    >
                                      <span className="sr-only">Previous</span>
                                      {"←"}
                                    </button>
                                    {Array.from({ length: totalPages }).map((_, idx) => {
                                      const pageNum = idx + 1;
                                      const isActive = pageNum === safeCurrentPage;
                                      return (
                                        <button
                                          key={pageNum}
                                          type="button"
                                          onClick={() => setArticleCurrentPage(pageNum)}
                                          className={`relative inline-flex items-center px-3.5 py-2 text-xs font-bold focus:z-20 cursor-pointer transition-colors ${
                                            isActive
                                              ? "z-10 bg-gold text-white"
                                              : "text-gray-600 ring-1 ring-inset ring-gray-150 hover:bg-gray-50"
                                          }`}
                                        >
                                          {pageNum}
                                        </button>
                                      );
                                    })}
                                    <button
                                      type="button"
                                      onClick={() => setArticleCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                      disabled={safeCurrentPage === totalPages}
                                      className="relative inline-flex items-center rounded-r-lg px-2.5 py-2 text-gray-400 ring-1 ring-inset ring-gray-150 hover:bg-gray-50 focus:z-20 disabled:opacity-40 cursor-pointer"
                                    >
                                      <span className="sr-only">Next</span>
                                      {"→"}
                                    </button>
                                  </nav>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Mode: Create/Edit View (Details Editor Page) */}
                {(articleViewMode === "create" || articleViewMode === "edit") && (
                  <div>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setArticleViewMode("list")}>Trang quản trị</span>
                      <span className="text-gray-300">/</span>
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setArticleViewMode("list")}>Bài Viết</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">{articleViewMode === "create" ? "Tạo Mới Bài Viết" : "Chỉnh Sửa Bài Viết"}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Detailed Editor Form */}
                    <form onSubmit={handleSaveArticle} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left mt-6">
                      {/* Left Column - 8 cols */}
                      <div className="lg:col-span-8 space-y-6">
                        {/* Language Selector Tabs */}
                        <div className="flex border-b border-gray-150 gap-2 select-none">
                          <button type="button" className="px-5 py-2.5 text-xs font-bold text-gray-800 border-b-2 border-gold -mb-px">VN Tiếng Việt</button>
                        </div>

                        {/* Gemini AI Writer Assistant (DongNaiFord style) */}
                        <AiWriterAssistant
                          onApply={(res) => {
                            articleForm.setData((prev) => ({
                              ...prev,
                              title: res.title,
                              slug: res.slug,
                              description: res.description,
                              content: res.content,
                              focus_keyword: res.keywords ? res.keywords.split(",")[0].trim() : prev.focus_keyword,
                              meta_title: res.title,
                              meta_description: res.description,
                              meta_keywords: res.keywords || prev.meta_keywords,
                            }));
                          }}
                        />

                        {/* Title */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Tiêu đề *</label>
                            <span className="text-[10px] text-gray-400 font-light select-none">
                              {articleForm.data.title.length} Characters, {articleForm.data.title.split(/\s+/).filter(Boolean).length} Words
                            </span>
                          </div>
                          <input
                            type="text"
                            required
                            value={articleForm.data.title}
                            onChange={(e) => {
                              const newTitle = e.target.value;
                              articleForm.setData((prev) => ({
                                ...prev,
                                title: newTitle,
                                slug: !editingArticle ? slugify(newTitle) : (prev.slug || slugify(newTitle)),
                              }));
                            }}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-800 font-bold placeholder-gray-300 bg-white"
                            placeholder="Nhập tiêu đề bài viết"
                          />
                        </div>

                        {/* Editable URL Slug (DongNaiFord style) */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider block">
                            Đường dẫn bài viết (URL Slug)
                          </label>
                          <div className="flex items-center">
                            <span className="text-gray-400 text-xs bg-gray-100 border border-gray-200 rounded-l-lg px-3 py-2.5 border-r-0 select-none font-mono">
                              /tin-tuc/
                            </span>
                            <input
                              type="text"
                              value={articleForm.data.slug}
                              onChange={(e) => articleForm.setData("slug", slugify(e.target.value))}
                              className="w-full bg-white border border-gray-200 focus:border-gold rounded-r-lg px-3 py-2 text-sm font-mono focus:outline-none text-gray-700"
                              placeholder={slugify(articleForm.data.title) || "duong-dan-bai-viet"}
                            />
                          </div>
                          {articleForm.data.slug && (
                            <div className="text-[11px] text-blue-600 font-light mt-1 bg-blue-50/50 border border-blue-100/50 px-3 py-1.5 rounded-md inline-flex items-center gap-1.5">
                              <span>Xem đường dẫn:</span>
                              <a
                                href={`/tin-tuc/${articleForm.data.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="font-mono font-semibold underline hover:text-blue-800"
                              >
                                /tin-tuc/{articleForm.data.slug} ↗
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Author Link Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider text-left block">Liên kết tác giả (Hồ sơ hệ thống)</label>
                            <select
                              value={articleForm.data.author_id}
                              onChange={(e) => {
                                const selectedId = e.target.value;
                                const matched = authors.find(aut => aut.id === Number(selectedId));
                                if (matched) {
                                  articleForm.setData((prev) => ({
                                    ...prev,
                                    author_id: selectedId,
                                    legacy_author: matched.name,
                                  }));
                                } else {
                                  articleForm.setData((prev) => ({
                                    ...prev,
                                    author_id: "",
                                  }));
                                }
                              }}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                            >
                              <option value="">-- Không liên kết / Tự nhập --</option>
                              {authors.map(aut => (
                                <option key={aut.id} value={aut.id}>
                                  {aut.name} ({aut.role})
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="space-y-1.5">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider text-left block">Tác giả hiển thị *</label>
                            <input
                              type="text"
                              required
                              value={articleForm.data.legacy_author}
                              onChange={(e) => articleForm.setData("legacy_author", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                              placeholder="Ví dụ: Bác sĩ hoặc Ban biên tập Theq"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Mô tả tóm tắt *</label>
                          <textarea
                            required
                            rows={3}
                            value={articleForm.data.description}
                            onChange={(e) => articleForm.setData("description", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-600 resize-none font-light leading-relaxed bg-white"
                            placeholder="Nhập mô tả tóm tắt..."
                          />
                        </div>

                        {/* Content WYSIWYG Editor */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Nội dung chi tiết *</label>
                          <RichTextEditor
                            value={articleForm.data.content || ""}
                            onChange={(html) => articleForm.setData("content", html)}
                            placeholder="Viết nội dung bài viết chi tiết ở đây..."
                            minHeight="320px"
                            onOpenMediaLibrary={openMediaLibraryForEditor}
                          />

                          {/* Shortcode CTA Guide Helper Box (DongNaiFord style) */}
                          <div className="mt-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="font-bold text-gray-800">Hướng dẫn chèn Khung Đăng ký Nhận tin / Tư vấn (CTA):</div>
                              <div className="leading-relaxed text-gray-600">
                                Để chèn khung CTA vào bất kỳ vị trí nào trong nội dung bài viết, bạn chỉ cần gõ từ khóa{" "}
                                <code className="bg-gray-200/80 text-gray-800 px-1.5 py-0.5 rounded font-mono font-bold select-all">[cta-form]</code> (hoặc{" "}
                                <code className="bg-gray-200/80 text-gray-800 px-1.5 py-0.5 rounded font-mono font-bold select-all">[[cta-form]]</code>) trên một dòng riêng biệt. Hệ thống ngoài Blog sẽ tự động nhận diện và hiển thị khung CTA tại vị trí đó.
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const nextContent = `${articleForm.data.content || ""}\n<p>[cta-form]</p>`;
                                articleForm.setData("content", nextContent);
                              }}
                              className="shrink-0 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg text-[11px] transition-colors cursor-pointer shadow-sm"
                            >
                              + Chèn [cta-form]
                            </button>
                          </div>
                        </div>

                        {/* Real-time On-Page SEO Score & SERP Preview Panel */}
                        <SeoAnalyzerPanel
                          title={articleForm.data.title}
                          slug={articleForm.data.slug}
                          description={articleForm.data.description}
                          content={articleForm.data.content}
                          image={articleForm.data.image_file ? URL.createObjectURL(articleForm.data.image_file) : articleForm.data.image}
                          imageAlt={articleForm.data.image_alt}
                          authorId={articleForm.data.author_id}
                          legacyAuthor={articleForm.data.legacy_author}
                          focusKeyword={articleForm.data.focus_keyword}
                          metaTitle={articleForm.data.meta_title}
                          metaDescription={articleForm.data.meta_description}
                          onChangeFocusKeyword={(kw) => articleForm.setData("focus_keyword", kw)}
                        />

                        {/* Related URLs & 301 Redirects (DongNaiFord style) */}
                        <RelatedAndRedirectUrlsPanel
                          relatedUrls={articleForm.data.related_urls}
                          redirectUrls={articleForm.data.redirect_urls}
                          currentSlug={articleForm.data.slug}
                          allArticles={articles.map((a) => ({ id: a.id, title: a.title, slug: a.slug || "" }))}
                          onChangeRelated={(val) => articleForm.setData("related_urls", val)}
                          onChangeRedirect={(val) => articleForm.setData("redirect_urls", val)}
                        />

                        {/* Meta Title */}
                        <div className="space-y-1.5 pt-4">
                          <div className="flex justify-between items-center select-none">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Title</label>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors duration-200 ${getMetaTitleStatus(articleForm.data.meta_title?.length || 0).color}`}>
                              {(articleForm.data.meta_title?.length || 0)} ký tự • {getMetaTitleStatus(articleForm.data.meta_title?.length || 0).text}
                            </span>
                          </div>
                          <input
                            type="text"
                            value={articleForm.data.meta_title}
                            onChange={(e) => articleForm.setData("meta_title", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                            placeholder="Nhập thẻ tiêu đề SEO (Meta Title)..."
                          />
                        </div>

                        {/* Meta Description */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center select-none">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Description</label>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors duration-200 ${getMetaDescStatus(articleForm.data.meta_description?.length || 0).color}`}>
                              {(articleForm.data.meta_description?.length || 0)} ký tự • {getMetaDescStatus(articleForm.data.meta_description?.length || 0).text}
                            </span>
                          </div>
                          <textarea
                            rows={3}
                            value={articleForm.data.meta_description}
                            onChange={(e) => articleForm.setData("meta_description", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-600 resize-none font-light leading-relaxed bg-white"
                            placeholder="Nhập thẻ mô tả SEO (Meta Description)..."
                          />
                        </div>

                        {/* Advanced Collapsible Accordion */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                          <button
                            type="button"
                            onClick={() => setAdvancedOpen(!advancedOpen)}
                            className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50/50 hover:bg-gray-50 text-left border-b border-gray-150 transition-colors"
                          >
                            <span className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 select-none">
                              {advancedOpen ? "▼" : "▶"} Cấu hình nâng cao
                            </span>
                          </button>
                          
                          {advancedOpen && (
                            <div className="p-5 space-y-4 bg-gray-50/25 border-t border-gray-100 transition-all duration-300">
                              {/* Custom Slug */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Custom Slug</label>
                                <input
                                  type="text"
                                  value={articleForm.data.slug}
                                  onChange={(e) => articleForm.setData("slug", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Đường dẫn tĩnh tùy chỉnh (ví dụ: tin-tuc-lam-dep)..."
                                />
                              </div>

                              {/* Meta Keywords */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Keywords</label>
                                <input
                                  type="text"
                                  value={articleForm.data.meta_keywords}
                                  onChange={(e) => articleForm.setData("meta_keywords", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Từ khóa SEO ngăn cách bởi dấu phẩy (ví dụ: phẫu thuật thẩm mỹ, cấy tóc)..."
                                />
                              </div>

                              {/* Meta Robots */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Robots</label>
                                <input
                                  type="text"
                                  value={articleForm.data.meta_robots}
                                  onChange={(e) => articleForm.setData("meta_robots", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Ví dụ: index, follow..."
                                />
                              </div>

                              {/* Canonical Link */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Canonical Link</label>
                                <input
                                  type="text"
                                  value={articleForm.data.canonical_link}
                                  onChange={(e) => articleForm.setData("canonical_link", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Đường dẫn canonical (ví dụ: https://theq.vn/tin-tuc/abc)..."
                                />
                              </div>

                              {/* Meta Image */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Image</label>
                                <input
                                  type="text"
                                  value={articleForm.data.meta_image}
                                  onChange={(e) => articleForm.setData("meta_image", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="URL hình ảnh SEO (Open Graph Image)..."
                                />
                              </div>

                              {/* Schema JSON-LD */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider text-left block">Schema JSON-LD</label>
                                <textarea
                                  rows={5}
                                  value={articleForm.data.schema}
                                  onChange={(e) => articleForm.setData("schema", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-600 resize-none font-light leading-relaxed bg-white"
                                  placeholder='Ví dụ: { "@context": "https://schema.org", "@type": "NewsArticle", ... }'
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column - 4 cols */}
                      <div className="lg:col-span-4 space-y-6">
                        {/* Box 1: Status & Options */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-5">
                          {/* Trạng thái */}
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2.5 block">Trạng thái xuất bản</label>
                            <div className="space-y-2">
                              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-gray-800">
                                <input
                                  type="radio"
                                  name="status"
                                  checked={articleForm.data.status !== "draft"}
                                  onChange={() => articleForm.setData("status", "published")}
                                  className="text-gold focus:ring-gold border-gray-300 w-4 h-4"
                                />
                                <span>Xuất bản (Hiển thị công khai)</span>
                              </label>
                              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-500">
                                <input
                                  type="radio"
                                  name="status"
                                  checked={articleForm.data.status === "draft"}
                                  onChange={() => articleForm.setData("status", "draft")}
                                  className="text-gold focus:ring-gold border-gray-300 w-4 h-4"
                                />
                                <span>Lưu bản nháp (Tạm ẩn trên Blog)</span>
                              </label>
                            </div>
                          </div>

                          {/* Ngày xuất bản */}
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Ngày xuất bản</label>
                            <input
                              type="text"
                              required
                              value={articleForm.data.published_date}
                              onChange={(e) => articleForm.setData("published_date", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 font-medium bg-white"
                              placeholder="DD/MM/YYYY"
                            />
                          </div>

                          {/* Nổi bật */}
                          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                            <input
                              type="checkbox"
                              id="featured_checkbox"
                              checked={articleForm.data.is_highlight === 1}
                              onChange={(e) => articleForm.setData("is_highlight", e.target.checked ? 1 : 0)}
                              className="rounded border-gray-300 text-gold focus:ring-gold w-4 h-4"
                            />
                            <label htmlFor="featured_checkbox" className="text-xs font-semibold text-gray-700 cursor-pointer select-none">
                              Nổi bật (Hiển thị trang chủ)
                            </label>
                          </div>

                          {/* Hình ảnh */}
                          <div className="border-t border-gray-100 pt-4">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 block">Hình ảnh bài viết</label>
                            <div
                              onClick={() => {
                                setOnMediaSelect(() => (path: string) => {
                                  articleForm.setData(data => ({
                                    ...data,
                                    image: path,
                                    image_file: null
                                  }));
                                });
                                setMediaSelectorOpen(true);
                              }}
                              className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50/50 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                            >
                              {articleForm.data.image_file ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={URL.createObjectURL(articleForm.data.image_file)}
                                    className="object-cover w-full h-full"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      articleForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : articleForm.data.image ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={articleForm.data.image}
                                    className="object-cover w-full h-full"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      articleForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : editingArticle && editingArticle.image && articleForm.data.image !== "" ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={editingArticle.image}
                                    className="object-cover w-full h-full"
                                    alt="Current"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      articleForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                  <ImageIcon size={24} className="stroke-1" />
                                  <span className="text-[10px] font-medium">Click để chọn ảnh từ Thư viện tệp</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-3 space-y-2.5">
                              <label className="block">
                                <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1">Hoặc tải ảnh Thumbnail trực tiếp từ máy:</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    if (file) {
                                      articleForm.setData((prev) => ({
                                        ...prev,
                                        image_file: file,
                                        image_alt: prev.image_alt || prev.title,
                                      }));
                                    }
                                  }}
                                  className="block w-full text-[11px] text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
                                />
                              </label>
                              <AltTextSeoTagsInput
                                value={articleForm.data.image_alt}
                                onChange={(newVal) => articleForm.setData("image_alt", newVal)}
                              />
                            </div>
                          </div>

                        </div>

                        {/* Box 2: Categorization & Internal Linking */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Chuyên mục bài viết</label>
                            <select
                              value={parseBlogCategories(settingsForm.data.settings.blog_categories).includes(articleForm.data.category) ? articleForm.data.category : "custom"}
                              onChange={(e) => {
                                if (e.target.value !== "custom") articleForm.setData("category", e.target.value);
                              }}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white mb-2"
                            >
                              {parseBlogCategories(settingsForm.data.settings.blog_categories).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                              <option value="custom">-- Tự nhập chuyên mục mới --</option>
                            </select>
                            <input
                              type="text"
                              value={articleForm.data.category}
                              onChange={(e) => articleForm.setData("category", e.target.value)}
                              placeholder="Hoặc tự nhập tên chuyên mục..."
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2 rounded-lg text-xs focus:outline-none text-gray-700 bg-gray-50/50"
                            />
                          </div>

                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Chèn nhanh Internal Link (Đi link nội bộ)</label>
                            <select
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                              defaultValue=""
                              onChange={(e) => {
                                const targetArt = articles.find((a) => String(a.id) === e.target.value);
                                if (targetArt && targetArt.slug) {
                                  const linkHtml = `<p>Xem thêm: <a href="/tin-tuc/${targetArt.slug}">${targetArt.title}</a></p>`;
                                  articleForm.setData("content", (articleForm.data.content || "") + linkHtml);
                                  e.target.value = "";
                                }
                              }}
                            >
                              <option value="">+ Chọn bài viết để chèn link vào cuối bài...</option>
                              {articles.filter(a => a.id !== editingArticle?.id).map(a => (
                                <option key={a.id} value={a.id}>{a.title}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-150 mt-4">
                          <div>
                            {editingArticle && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
                                    handleDeleteArticle(editingArticle.id);
                                    setArticleViewMode("list");
                                  }
                                }}
                                className="text-red-500 hover:text-red-750 text-xs font-bold uppercase tracking-wider transition-colors bg-transparent border-0 outline-none cursor-pointer"
                              >
                                XÓA
                              </button>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setArticleViewMode("list")}
                              className="px-5 py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-bold transition-colors"
                            >
                              Hủy
                            </button>
                            <button
                              type="submit"
                              disabled={articleForm.processing}
                              className="px-8 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50"
                            >
                              {articleForm.processing ? "Đang lưu..." : "LƯU"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === "services" && (
              <div>
                {/* Mode: List View */}
                {serviceViewMode === "list" && (
                  <div>
                    {/* Breadcrumb path */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setActiveTab("overview")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">Dịch Vụ</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      {/* THÊM MỚI Button */}
                      <button
                        onClick={handleOpenAddService}
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[11px] tracking-wider uppercase px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
                      >
                        Thêm mới
                      </button>

                      {/* Search box matching design */}
                      <div className="relative w-72">
                        <input
                          type="text"
                          placeholder="Tìm kiếm.."
                          value={serviceSearchTerm}
                          onChange={(e) => setServiceSearchTerm(e.target.value)}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 pr-10 rounded text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                        />
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Listing Table matching Design */}
                    {services.length === 0 ? (
                      <p className="text-gray-400 text-center py-12 font-light">Chưa có dịch vụ nào.</p>
                    ) : (() => {
                      const filtered = services.filter(srv => 
                        srv.name.toLowerCase().includes(serviceSearchTerm.toLowerCase()) ||
                        (srv.category && srv.category.toLowerCase().includes(serviceSearchTerm.toLowerCase()))
                      );

                      if (filtered.length === 0) {
                        return <p className="text-gray-400 text-center py-12 font-light">Không tìm thấy dịch vụ phù hợp với từ khóa.</p>;
                      }

                      return (
                        <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                          <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                              <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                                <th className="py-4 px-4 w-12 text-center">ID</th>
                                <th className="py-4 px-4 w-28">Hình ảnh</th>
                                <th className="py-4 px-4">Tên dịch vụ</th>
                                <th className="py-4 px-4 w-40">Danh mục</th>
                                <th className="py-4 px-4 w-32">Đơn giá</th>
                                <th className="py-4 px-4 text-center w-36">Nổi bật (Slider)</th>
                                <th className="py-4 px-4 text-center w-28">Trạng thái</th>
                                <th className="py-4 px-4 text-center w-36">Ngày tạo</th>
                                <th className="py-4 px-4 text-right w-24">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                              {filtered.map((srv) => (
                                <tr key={srv.id} className="hover:bg-gray-50/50 transition-colors">
                                  {/* ID */}
                                  <td className="py-4 px-4 text-center font-bold text-gray-400 align-middle">
                                    {srv.id}
                                  </td>

                                  {/* HÌNH ẢNH */}
                                  <td className="py-4 px-4 align-middle">
                                    <div className="relative w-20 h-12 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                      {srv.image ? (
                                        <img src={srv.image} alt={srv.name} className="object-cover w-full h-full" />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">No Img</div>
                                      )}
                                    </div>
                                  </td>

                                  {/* TÊN DỊCH VỤ */}
                                  <td className="py-4 px-4 align-middle font-medium text-gray-800 text-left max-w-sm">
                                    <div className="line-clamp-2 uppercase leading-snug tracking-normal">
                                      {srv.name}
                                    </div>
                                  </td>

                                  {/* DANH MỤC */}
                                  <td className="py-4 px-4 align-middle text-gray-500 font-semibold uppercase text-[10px]">
                                    <span className="bg-gold/10 text-gold px-2 py-0.5 rounded">
                                      {srv.category}
                                    </span>
                                  </td>

                                  {/* ĐƠN GIÁ */}
                                  <td className="py-4 px-4 align-middle font-bold text-gold">
                                    {srv.price || "Liên hệ"}
                                  </td>

                                  {/* NỔI BẬT (SLIDER) */}
                                  <td className="py-4 px-4 text-center align-middle">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleHighlightService(srv.id)}
                                      className="focus:outline-none inline-flex"
                                      title={srv.is_highlight ? "Bỏ nổi bật" : "Đặt nổi bật"}
                                    >
                                      {srv.is_highlight ? (
                                        <span className="w-3 h-3 rounded-full bg-[#f97316] inline-block shadow-sm transition-all hover:scale-110"></span>
                                      ) : (
                                        <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-sm transition-all hover:scale-110"></span>
                                      )}
                                    </button>
                                  </td>

                                  {/* TRẠNG THÁI */}
                                  <td className="py-4 px-4 text-center align-middle">
                                    <span className="bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold px-2 py-0.5 rounded border border-[#10b981]/10 uppercase tracking-wider">
                                      Hiển thị
                                    </span>
                                  </td>

                                  {/* NGÀY TẠO */}
                                  <td className="py-4 px-4 text-center align-middle text-gray-400 font-light text-[10px]">
                                    {srv.created_at ? new Date(srv.created_at).toLocaleDateString("vi-VN") : "08/07/2026"}
                                  </td>

                                  {/* THAO TÁC */}
                                  <td className="py-4 px-4 text-right align-middle">
                                    <div className="flex justify-end gap-1">
                                      <button
                                        onClick={() => handleOpenEditService(srv)}
                                        className="text-gold hover:text-gold-dark p-2 hover:bg-gold/5 rounded-lg transition-colors"
                                        title="Chỉnh sửa"
                                      >
                                        <Edit size={14} />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteService(srv.id)}
                                        className="text-red-500 hover:text-red-750 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Xóa"
                                      >
                                        <Trash size={14} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Mode: Create/Edit View (Details Editor Page) */}
                {(serviceViewMode === "create" || serviceViewMode === "edit") && (
                  <div>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setServiceViewMode("list")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setServiceViewMode("list")}>Dịch Vụ</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">{serviceViewMode === "create" ? "Tạo Mới Dịch Vụ" : "Chỉnh Sửa Dịch Vụ"}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Detailed Editor Form */}
                    <form onSubmit={handleSaveService} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left mt-6">
                      {/* Left Column - 8 cols */}
                      <div className="lg:col-span-8 space-y-6">
                        {/* Language Selector Tabs */}
                        <div className="flex border-b border-gray-150 gap-2 select-none">
                          <button type="button" className="px-5 py-2.5 text-xs font-bold text-gray-800 border-b-2 border-gold -mb-px">VN Tiếng Việt</button>
                        </div>

                        {/* Service Name */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Tên dịch vụ *</label>
                            <span className="text-[10px] text-gray-400 font-light select-none">
                              {serviceForm.data.name.length} Characters
                            </span>
                          </div>
                          <input
                            type="text"
                            required
                            value={serviceForm.data.name}
                            onChange={(e) => serviceForm.setData("name", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-800 font-bold placeholder-gray-300 bg-white"
                            placeholder="Nhập tên dịch vụ làm đẹp"
                          />
                          {serviceForm.data.name && (
                            <div className="text-[10px] text-blue-500 font-light select-none break-all mt-1 bg-blue-50/50 border border-blue-100/50 px-3 py-1.5 rounded-md inline-block">
                              URL: https://theq.vn/dich-vu/{serviceForm.data.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Đơn giá</label>
                          <input
                            type="text"
                            value={serviceForm.data.price}
                            onChange={(e) => serviceForm.setData("price", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                            placeholder="Ví dụ: Liên hệ hoặc 5.000.000đ"
                          />
                        </div>

                        {/* Description (WYSIWYG Editor style) */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Mô tả dịch vụ chi tiết *</label>
                          <RichTextEditor
                            value={serviceForm.data.description || ""}
                            onChange={(html) => serviceForm.setData("description", html)}
                            placeholder="Nhập mô tả chi tiết của dịch vụ làm đẹp tại đây..."
                            minHeight="300px"
                            onOpenMediaLibrary={openMediaLibraryForEditor}
                          />
                        </div>

                        {/* Dynamic Layout Configuration (CayTocYKhoa style) */}
                        <div className="border border-gold/20 rounded-2xl p-6 bg-gold/5 shadow-sm space-y-6">
                          <div>
                            <h3 className="font-serif font-bold text-gray-800 text-base flex items-center gap-2">
                              ✨ Cấu trúc giao diện mở rộng
                            </h3>
                            <p className="text-[11px] text-gray-450 font-light mt-1">
                              Cấu hình các phần tử nâng cao giúp hiển thị dịch vụ sinh động với các khối đặc thù (các trụ cột, đánh giá khách hàng, so sánh trước/sau).
                            </p>
                          </div>

                          {/* Section 1: Pillars */}
                          <div className="border-t border-gray-150 pt-5 space-y-4">
                            <div className="flex justify-between items-center">
                              <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">1. Các trụ cột / Bước liệu trình ({serviceForm.data.pillars?.length || 0})</label>
                              <button
                                type="button"
                                onClick={addPillar}
                                className="text-[11px] bg-gold text-white font-bold px-3 py-1.5 rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-1"
                              >
                                <Plus size={12} /> Thêm bước
                              </button>
                            </div>
                            <div className="space-y-4">
                              {serviceForm.data.pillars?.map((p, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 relative space-y-3 shadow-sm text-left">
                                  <button
                                    type="button"
                                    onClick={() => removePillar(idx)}
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-750 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                  >
                                    <Trash size={14} />
                                  </button>
                                  <div className="text-[10px] text-gold font-bold uppercase tracking-wider">Bước {idx + 1}</div>
                                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                    <div className="md:col-span-8 space-y-3">
                                      <input
                                        type="text"
                                        value={p.title}
                                        onChange={(e) => updatePillar(idx, "title", e.target.value)}
                                        className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded-lg text-xs focus:outline-none font-bold text-gray-700 bg-white"
                                        placeholder="Tiêu đề bước (ví dụ: Thiết kế đường chân tóc)..."
                                      />
                                      <textarea
                                        rows={2}
                                        value={p.desc}
                                        onChange={(e) => updatePillar(idx, "desc", e.target.value)}
                                        className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded-lg text-xs focus:outline-none text-gray-500 bg-white resize-none"
                                        placeholder="Mô tả chi tiết bước này..."
                                      />
                                    </div>
                                    <div className="md:col-span-4 flex flex-col justify-center">
                                      <div
                                        onClick={() => {
                                          setOnMediaSelect(() => (path: string) => {
                                            updatePillar(idx, "img", path);
                                          });
                                          setMediaSelectorOpen(true);
                                        }}
                                        className="border border-dashed border-gray-200 hover:border-gold/50 bg-gray-50/50 rounded-lg p-2 flex flex-col items-center justify-center h-20 text-center cursor-pointer relative overflow-hidden transition-colors"
                                      >
                                        {p.img ? (
                                          <>
                                            <img src={p.img} className="object-cover w-full h-full absolute inset-0" alt="Bước" />
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updatePillar(idx, "img", "");
                                              }}
                                              className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-md transition-all z-20 hover:scale-105 duration-200"
                                              title="Xóa ảnh"
                                            >
                                              <Trash size={10} />
                                            </button>
                                          </>
                                        ) : (
                                          <span className="text-[10px] text-gray-400">Chọn ảnh minh họa</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Section 2: Reviews */}
                          <div className="border-t border-gray-150 pt-5 space-y-4">
                            <div className="flex justify-between items-center">
                              <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">2. Ảnh đánh giá thực tế từ mạng xã hội ({serviceForm.data.reviews?.length || 0})</label>
                              <button
                                type="button"
                                onClick={() => {
                                  setOnMediaSelect(() => (path: string) => {
                                    serviceForm.setData("reviews", [...(serviceForm.data.reviews || []), path]);
                                  });
                                  setMediaSelectorOpen(true);
                                }}
                                className="text-[11px] bg-gold text-white font-bold px-3 py-1.5 rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-1"
                              >
                                <Plus size={12} /> Thêm ảnh
                              </button>
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                              {serviceForm.data.reviews?.map((url, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 group shadow-sm">
                                  <img src={url} className="object-cover w-full h-full" alt="Review" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                      type="button"
                                      onClick={() => removeReview(idx)}
                                      className="bg-red-500 hover:bg-red-650 text-white p-1.5 rounded-full transition-colors"
                                    >
                                      <Trash size={12} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Section 3: Before/After */}
                          <div className="border-t border-gray-150 pt-5 space-y-4">
                            <div className="flex justify-between items-center">
                              <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">3. Các ca khách hàng Trước & Sau ({serviceForm.data.before_after?.length || 0})</label>
                              <button
                                type="button"
                                onClick={addBeforeAfter}
                                className="text-[11px] bg-gold text-white font-bold px-3 py-1.5 rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-1"
                              >
                                <Plus size={12} /> Thêm ca
                              </button>
                            </div>
                            <div className="space-y-4">
                              {serviceForm.data.before_after?.map((ba, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 relative space-y-3 shadow-sm text-left">
                                  <button
                                    type="button"
                                    onClick={() => removeBeforeAfter(idx)}
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-750 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                  >
                                    <Trash size={14} />
                                  </button>
                                  <div className="text-[10px] text-gold font-bold uppercase tracking-wider">Ca khách hàng {idx + 1}</div>
                                  <div className="space-y-3">
                                    <input
                                      type="text"
                                      value={ba.title}
                                      onChange={(e) => updateBeforeAfter(idx, "title", e.target.value)}
                                      className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded-lg text-xs focus:outline-none font-bold text-gray-700 bg-white"
                                      placeholder="Tên khách hàng (ví dụ: Khách hàng L.H.N)..."
                                    />
                                    <textarea
                                      rows={2}
                                      value={ba.desc}
                                      onChange={(e) => updateBeforeAfter(idx, "desc", e.target.value)}
                                      className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded-lg text-xs focus:outline-none text-gray-500 bg-white resize-none"
                                      placeholder="Mô tả ngắn về kết quả..."
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                      {/* Before image */}
                                      <div className="space-y-1">
                                        <div className="text-[9px] uppercase font-bold text-gray-400">Ảnh Trước</div>
                                        <div
                                          onClick={() => {
                                            setOnMediaSelect(() => (path: string) => {
                                              updateBeforeAfter(idx, "before", path);
                                            });
                                            setMediaSelectorOpen(true);
                                          }}
                                          className="border border-dashed border-gray-250 hover:border-gold/50 bg-gray-50/50 rounded-lg p-2 flex flex-col items-center justify-center h-24 text-center cursor-pointer relative overflow-hidden transition-colors"
                                        >
                                          {ba.before ? (
                                            <>
                                              <img src={ba.before} className="object-cover w-full h-full absolute inset-0" alt="Trước" />
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  updateBeforeAfter(idx, "before", "");
                                                }}
                                                className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-md transition-all z-20 hover:scale-105 duration-200"
                                                title="Xóa ảnh"
                                              >
                                                <Trash size={10} />
                                              </button>
                                            </>
                                          ) : (
                                            <span className="text-[9px] text-gray-400">Chọn ảnh Trước</span>
                                          )}
                                        </div>
                                      </div>
                                      {/* After image */}
                                      <div className="space-y-1">
                                        <div className="text-[9px] uppercase font-bold text-gray-400">Ảnh Sau</div>
                                        <div
                                          onClick={() => {
                                            setOnMediaSelect(() => (path: string) => {
                                              updateBeforeAfter(idx, "after", path);
                                            });
                                            setMediaSelectorOpen(true);
                                          }}
                                          className="border border-dashed border-gray-250 hover:border-gold/50 bg-gray-50/50 rounded-lg p-2 flex flex-col items-center justify-center h-24 text-center cursor-pointer relative overflow-hidden transition-colors"
                                        >
                                          {ba.after ? (
                                            <>
                                              <img src={ba.after} className="object-cover w-full h-full absolute inset-0" alt="Sau" />
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  updateBeforeAfter(idx, "after", "");
                                                }}
                                                className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-md transition-all z-20 hover:scale-105 duration-200"
                                                title="Xóa ảnh"
                                              >
                                                <Trash size={10} />
                                              </button>
                                            </>
                                          ) : (
                                            <span className="text-[9px] text-gray-400">Chọn ảnh Sau</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Meta Title */}
                        <div className="space-y-1.5 pt-4">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Title</label>
                          <input
                            type="text"
                            value={serviceForm.data.meta_title}
                            onChange={(e) => serviceForm.setData("meta_title", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                            placeholder="Nhập thẻ tiêu đề SEO (Meta Title)..."
                          />
                        </div>

                        {/* Meta Description */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Description</label>
                          <textarea
                            rows={3}
                            value={serviceForm.data.meta_description}
                            onChange={(e) => serviceForm.setData("meta_description", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-600 resize-none font-light leading-relaxed bg-white"
                            placeholder="Nhập thẻ mô tả SEO (Meta Description)..."
                          />
                        </div>

                        {/* Advanced Collapsible Accordion */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                          <button
                            type="button"
                            onClick={() => setAdvancedServiceOpen(!advancedServiceOpen)}
                            className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50/50 hover:bg-gray-50 text-left border-b border-gray-150 transition-colors"
                          >
                            <span className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 select-none">
                              {advancedServiceOpen ? "▼" : "▶"} Cấu hình nâng cao
                            </span>
                          </button>
                          
                          {advancedServiceOpen && (
                            <div className="p-5 space-y-4 bg-gray-50/25 border-t border-gray-100 transition-all duration-300">
                              {/* Custom Slug */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Custom Slug</label>
                                <input
                                  type="text"
                                  value={serviceForm.data.slug}
                                  onChange={(e) => serviceForm.setData("slug", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Đường dẫn tĩnh tùy chỉnh (ví dụ: nang-mui-cau-truc)..."
                                />
                              </div>

                              {/* Meta Keywords */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Keywords</label>
                                <input
                                  type="text"
                                  value={serviceForm.data.meta_keywords}
                                  onChange={(e) => serviceForm.setData("meta_keywords", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Từ khóa SEO (ví dụ: nâng mũi sline, sửa mũi)..."
                                />
                              </div>

                              {/* Meta Robots */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Robots</label>
                                <input
                                  type="text"
                                  value={serviceForm.data.meta_robots}
                                  onChange={(e) => serviceForm.setData("meta_robots", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Ví dụ: index, follow..."
                                />
                              </div>

                              {/* Canonical Link */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Canonical Link</label>
                                <input
                                  type="text"
                                  value={serviceForm.data.canonical_link}
                                  onChange={(e) => serviceForm.setData("canonical_link", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Đường dẫn canonical (ví dụ: https://theq.vn/dich-vu/xyz)..."
                                />
                              </div>

                              {/* Meta Image */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Image</label>
                                <input
                                  type="text"
                                  value={serviceForm.data.meta_image}
                                  onChange={(e) => serviceForm.setData("meta_image", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="URL hình ảnh SEO cho dịch vụ..."
                                />
                              </div>

                              {/* Schema JSON-LD */}
                              <div className="space-y-1.5 col-span-2">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Schema JSON-LD</label>
                                <textarea
                                  value={serviceForm.data.schema}
                                  onChange={(e) => serviceForm.setData("schema", e.target.value)}
                                  rows={4}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white font-mono"
                                  placeholder='Ví dụ: { "@context": "https://schema.org", "@type": "MedicalProcedure" }'
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column - 4 cols */}
                      <div className="lg:col-span-4 space-y-6">
                        {/* Box 1: Status & Options */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-5">
                          {/* Trạng thái */}
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2.5 block">Trạng thái</label>
                            <div className="space-y-2">
                              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-gray-800">
                                <input
                                  type="radio"
                                  name="status"
                                  checked={true}
                                  readOnly
                                  className="text-gold focus:ring-gold border-gray-300 w-4 h-4"
                                />
                                <span>Hiển thị</span>
                              </label>
                              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-400">
                                <input
                                  type="radio"
                                  name="status"
                                  checked={false}
                                  readOnly
                                  className="text-gold focus:ring-gold border-gray-300 w-4 h-4"
                                />
                                <span>Tạm ẩn</span>
                              </label>
                            </div>
                          </div>

                          {/* Nổi bật */}
                          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                            <input
                              type="checkbox"
                              id="service_highlight_checkbox"
                              checked={serviceForm.data.is_highlight === 1}
                              onChange={(e) => serviceForm.setData("is_highlight", e.target.checked ? 1 : 0)}
                              className="rounded border-gray-300 text-gold focus:ring-gold w-4 h-4"
                            />
                            <label htmlFor="service_highlight_checkbox" className="text-xs font-semibold text-gray-700 cursor-pointer select-none">
                              Hiển thị nổi bật trên Trang Chủ
                            </label>
                          </div>

                          {/* Hình ảnh */}
                          <div className="border-t border-gray-100 pt-4">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 block">Hình ảnh đại diện</label>
                            <div
                              onClick={() => {
                                setOnMediaSelect(() => (path: string) => {
                                  serviceForm.setData(data => ({
                                    ...data,
                                    image: path,
                                    image_file: null
                                  }));
                                });
                                setMediaSelectorOpen(true);
                              }}
                              className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50/50 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                            >
                              {serviceForm.data.image_file ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={URL.createObjectURL(serviceForm.data.image_file)}
                                    className="object-cover w-full h-full"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      serviceForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : serviceForm.data.image ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={serviceForm.data.image}
                                    className="object-cover w-full h-full"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      serviceForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : editingService && editingService.image && serviceForm.data.image !== "" ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={editingService.image}
                                    className="object-cover w-full h-full"
                                    alt="Current"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      serviceForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                  <ImageIcon size={24} className="stroke-1" />
                                  <span className="text-[10px] font-medium">Click để chọn ảnh từ Thư viện tệp</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Hình ảnh Banner */}
                          <div className="border-t border-gray-100 pt-4 mt-4">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 block">Hình ảnh Banner</label>
                            <div
                              onClick={() => {
                                setOnMediaSelect(() => (path: string) => {
                                  serviceForm.setData(data => ({
                                    ...data,
                                    banner_image: path
                                  }));
                                });
                                setMediaSelectorOpen(true);
                              }}
                              className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50/50 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                            >
                              {serviceForm.data.banner_image ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={serviceForm.data.banner_image}
                                    className="object-cover w-full h-full"
                                    alt="Banner Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh banner</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      serviceForm.setData(data => ({
                                        ...data,
                                        banner_image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh banner"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                  <ImageIcon size={24} className="stroke-1" />
                                  <span className="text-[10px] font-medium">Click để chọn ảnh banner từ Thư viện</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Box 2: Categorization */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Danh mục dịch vụ</label>
                            <select
                              value={serviceForm.data.service_category_id}
                              onChange={(e) => {
                                const catId = e.target.value;
                                serviceForm.setData("service_category_id", catId);
                                const catName = serviceCategories.find(c => c.id.toString() === catId.toString())?.name || "";
                                serviceForm.setData("category", catName);
                              }}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                            >
                              <option value="">-- Chọn danh mục --</option>
                              {serviceCategories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-150 mt-4">
                          <div>
                            {editingService && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
                                    handleDeleteService(editingService.id);
                                    setServiceViewMode("list");
                                  }
                                }}
                                className="text-red-500 hover:text-red-750 text-xs font-bold uppercase tracking-wider transition-colors bg-transparent border-0 outline-none cursor-pointer"
                              >
                                XÓA
                              </button>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setServiceViewMode("list")}
                              className="px-5 py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-bold transition-colors"
                            >
                              Hủy
                            </button>
                            <button
                              type="submit"
                              disabled={serviceForm.processing}
                              className="px-8 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50"
                            >
                              {serviceForm.processing ? "Đang lưu..." : "LƯU"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* SERVICE CATEGORIES TAB */}
            {activeTab === "serviceCategories" && (
              <div>
                {/* Mode: List View */}
                {serviceCategoryViewMode === "list" && (
                  <div>
                    {/* Breadcrumb path */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setActiveTab("overview")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">Danh Mục Dịch Vụ</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      {/* THÊM MỚI Button */}
                      <button
                        onClick={handleOpenAddServiceCategory}
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[11px] tracking-wider uppercase px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
                      >
                        Thêm mới
                      </button>

                      {/* Search box matching design */}
                      <div className="relative w-72">
                        <input
                          type="text"
                          placeholder="Tìm kiếm.."
                          value={serviceCategorySearchTerm}
                          onChange={(e) => setServiceCategorySearchTerm(e.target.value)}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 pr-10 rounded text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                        />
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Listing Table matching Design */}
                    {serviceCategories.length === 0 ? (
                      <p className="text-gray-400 text-center py-12 font-light">Chưa có danh mục nào.</p>
                    ) : (() => {
                      const filtered = serviceCategories.filter(cat => 
                        cat.name.toLowerCase().includes(serviceCategorySearchTerm.toLowerCase()) ||
                        cat.slug.toLowerCase().includes(serviceCategorySearchTerm.toLowerCase())
                      );

                      if (filtered.length === 0) {
                        return <p className="text-gray-400 text-center py-12 font-light">Không tìm thấy danh mục phù hợp.</p>;
                      }

                      return (
                        <div className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-150 text-gray-450 font-bold uppercase tracking-wider select-none">
                                  <th className="py-4 px-6 w-16">ID</th>
                                  <th className="py-4 px-6">Tên danh mục</th>
                                  <th className="py-4 px-6">Đường dẫn (Slug)</th>
                                  <th className="py-4 px-6 w-32 text-center">Thứ tự</th>
                                  <th className="py-4 px-6 w-28 text-center">Thao tác</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 text-gray-700 font-light">
                                {filtered.map((cat) => (
                                  <tr key={cat.id} className="hover:bg-gray-55/30 transition-colors">
                                    <td className="py-4.5 px-6 font-mono text-[10px] text-gray-400">{cat.id}</td>
                                    <td className="py-4.5 px-6 font-medium text-gray-900">{cat.name}</td>
                                    <td className="py-4.5 px-6 text-gray-500 font-mono text-[11px]">{cat.slug}</td>
                                    <td className="py-4.5 px-6 text-center text-gray-500">{cat.order}</td>
                                    <td className="py-4.5 px-6 text-center">
                                      <div className="flex justify-center items-center gap-2">
                                        <button
                                          onClick={() => handleOpenEditServiceCategory(cat)}
                                          className="p-1.5 text-gray-400 hover:text-gold hover:bg-gold/5 rounded transition-all cursor-pointer bg-transparent border-0 outline-none"
                                          title="Sửa"
                                        >
                                          <Edit size={14} />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteServiceCategory(cat.id)}
                                          className="p-1.5 text-gray-400 hover:text-red-650 hover:bg-red-50 rounded transition-all cursor-pointer bg-transparent border-0 outline-none"
                                          title="Xóa"
                                        >
                                          <Trash size={14} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Mode: Create or Edit Form */}
                {(serviceCategoryViewMode === "create" || serviceCategoryViewMode === "edit") && (
                  <div>
                    {/* Breadcrumb path */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => {
                        setServiceCategoryViewMode("list");
                        serviceCategoryForm.reset();
                      }}>Danh Mục Dịch Vụ</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">{serviceCategoryViewMode === "create" ? "Tạo Mới" : "Chỉnh Sửa"}</span>
                    </div>

                    <div className="border-t border-gray-150/60 mb-6" />

                    <form onSubmit={handleSaveServiceCategory} className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                      {/* Left Column (Main Form fields) */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-5">
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-450 tracking-wider mb-2 block">Tên danh mục *</label>
                            <input
                              type="text"
                              value={serviceCategoryForm.data.name}
                              onChange={(e) => {
                                serviceCategoryForm.setData("name", e.target.value);
                                if (serviceCategoryViewMode === "create") {
                                  // Auto-slugify
                                  const generatedSlug = e.target.value
                                    .toLowerCase()
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .replace(/đ/g, "d")
                                    .replace(/[^a-z0-9\s-]/g, "")
                                    .trim()
                                    .replace(/\s+/g, "-");
                                  serviceCategoryForm.setData({
                                    ...serviceCategoryForm.data,
                                    name: e.target.value,
                                    slug: generatedSlug,
                                  });
                                }
                              }}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                              placeholder="Nhập tên danh mục (ví dụ: Chăm sóc da chuyên sâu...)"
                              required
                            />
                            {serviceCategoryForm.errors.name && (
                              <span className="text-red-500 text-[10px] mt-1 block">{serviceCategoryForm.errors.name}</span>
                            )}
                          </div>

                          <div>
                            <label className="text-xs uppercase font-bold text-gray-450 tracking-wider mb-2 block">Đường dẫn (Slug URL)</label>
                            <input
                              type="text"
                              value={serviceCategoryForm.data.slug}
                              onChange={(e) => serviceCategoryForm.setData("slug", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white font-mono"
                              placeholder="url-danh-muc-viet-lien-khong-dau"
                            />
                            {serviceCategoryForm.errors.slug && (
                              <span className="text-red-500 text-[10px] mt-1 block">{serviceCategoryForm.errors.slug}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column (Side controls) */}
                      <div className="space-y-6">
                        <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-4">
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-450 tracking-wider mb-2 block">Thứ tự hiển thị</label>
                            <input
                              type="number"
                              value={serviceCategoryForm.data.order}
                              onChange={(e) => serviceCategoryForm.setData("order", parseInt(e.target.value) || 0)}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                              min="0"
                            />
                            {serviceCategoryForm.errors.order && (
                              <span className="text-red-500 text-[10px] mt-1 block">{serviceCategoryForm.errors.order}</span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-150 mt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setServiceCategoryViewMode("list");
                              serviceCategoryForm.reset();
                            }}
                            className="px-5 py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-bold transition-colors"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            disabled={serviceCategoryForm.processing}
                            className="px-8 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50"
                          >
                            {serviceCategoryForm.processing ? "Đang lưu..." : "LƯU"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* BANNERS TAB */}
            {activeTab === "banners" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold font-serif text-gray-800">Quản Lý Banner Slides</h3>
                  <button
                    onClick={handleOpenAddBanner}
                    className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded text-sm flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Plus size={16} /> Thêm slide
                  </button>
                </div>

                {banners.length === 0 ? (
                  <p className="text-gray-400 text-center py-12 font-light">Chưa có slide banner nào.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400 tracking-wider">
                          <th className="py-4 px-4">Ảnh Desktop / Mobile</th>
                          <th className="py-4 px-4">Thông tin Banner (Tiêu đề, Mô tả)</th>
                          <th className="py-4 px-4">Nút bấm (CTA)</th>
                          <th className="py-4 px-4 text-center">Thứ tự</th>
                          <th className="py-4 px-4 text-center">Trạng thái</th>
                          <th className="py-4 px-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
                        {banners.map((bn) => (
                          <tr key={bn.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex flex-col gap-1.5">
                                <div className="relative w-28 h-16 bg-gray-100 border border-gray-200 rounded overflow-hidden">
                                  <img src={bn.image_desktop} alt="Desktop" className="object-cover w-full h-full" />
                                  <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] px-1 rounded">PC</span>
                                </div>
                                {bn.image_mobile ? (
                                  <div className="relative w-16 h-20 bg-gray-100 border border-gray-200 rounded overflow-hidden">
                                    <img src={bn.image_mobile} alt="Mobile" className="object-cover w-full h-full" />
                                    <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] px-1 rounded">Mobile</span>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-gray-400 italic">Chưa cấu hình ảnh Mobile</span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4 max-w-sm">
                              <div className="flex flex-col gap-1 text-left">
                                {bn.eyebrow && <span className="text-[10px] uppercase font-bold text-gold tracking-wide">{bn.eyebrow}</span>}
                                <h4 className="font-bold text-gray-800 text-sm">{bn.title} {bn.subtitle && <span className="text-gray-500 font-normal">— {bn.subtitle}</span>}</h4>
                                <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">{bn.description}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex flex-col gap-1.5 text-xs text-gray-500 text-left">
                                {bn.button_primary_text && (
                                  <div>
                                    <span className="font-semibold text-gray-700">Chính:</span> {bn.button_primary_text} ({bn.button_primary_url})
                                  </div>
                                )}
                                {bn.button_secondary_text && (
                                  <div>
                                    <span className="font-semibold text-gray-700">Phụ:</span> {bn.button_secondary_text} ({bn.button_secondary_url})
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center font-bold text-gray-700">{bn.order}</td>
                            <td className="py-4 px-4 text-center">
                              <span className={`px-2.5 py-1 rounded text-xs font-bold ${bn.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                                {bn.is_active ? "Đang hiển thị" : "Tạm ẩn"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditBanner(bn)}
                                  className="text-gold hover:text-gold-dark p-1.5 hover:bg-gold/5 rounded transition-colors"
                                  title="Chỉnh sửa slide"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteBanner(bn.id)}
                                  className="text-red-500 hover:text-red-750 p-1.5 hover:bg-red-50 rounded transition-colors"
                                  title="Xóa slide"
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* DOCTORS TAB */}
            {activeTab === "doctors" && (
              <div>
                {/* Mode: List View */}
                {doctorViewMode === "list" && (
                  <div>
                    {/* Breadcrumb path */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setActiveTab("overview")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">Đội ngũ bác sĩ</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      {/* THÊM MỚI Button */}
                      <button
                        onClick={handleOpenAddDoctor}
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[11px] tracking-wider uppercase px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
                      >
                        Thêm mới
                      </button>

                      {/* Search box matching design */}
                      <div className="relative w-72">
                        <input
                          type="text"
                          placeholder="Tìm kiếm.."
                          value={doctorSearchTerm}
                          onChange={(e) => setDoctorSearchTerm(e.target.value)}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 pr-10 rounded text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                        />
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Listing Table matching Design */}
                    {doctors.length === 0 ? (
                      <p className="text-gray-400 text-center py-12 font-light">Chưa có bác sĩ nào.</p>
                    ) : (() => {
                      const filtered = doctors.filter(doc => 
                        doc.name.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
                        (doc.role && doc.role.toLowerCase().includes(doctorSearchTerm.toLowerCase()))
                      );

                      if (filtered.length === 0) {
                        return <p className="text-gray-400 text-center py-12 font-light">Không tìm thấy bác sĩ phù hợp với từ khóa.</p>;
                      }

                      return (
                        <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                          <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                              <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                                <th className="py-4 px-4 w-12 text-center">ID</th>
                                <th className="py-4 px-4 w-28">Hình ảnh</th>
                                <th className="py-4 px-4">Họ tên bác sĩ</th>
                                <th className="py-4 px-4 w-56">Chức vụ / Vai trò</th>
                                <th className="py-4 px-4">Tiểu sử ngắn</th>
                                <th className="py-4 px-4 text-center w-28">Thứ tự</th>
                                <th className="py-4 px-4 text-center w-28">Trạng thái</th>
                                <th className="py-4 px-4 text-right w-24">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                              {filtered.map((doc) => (
                                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                                  {/* ID */}
                                  <td className="py-4 px-4 text-center font-bold text-gray-400 align-middle">
                                    {doc.id}
                                  </td>

                                  {/* HÌNH ẢNH */}
                                  <td className="py-4 px-4 align-middle">
                                    <div className="relative w-14 h-14 bg-gray-100 border border-gray-200 rounded-full overflow-hidden shadow-sm">
                                      {doc.image ? (
                                        <img src={doc.image} alt={doc.name} className="object-cover w-full h-full" />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">No Img</div>
                                      )}
                                    </div>
                                  </td>

                                  {/* HỌ TÊN BÁC SĨ */}
                                  <td className="py-4 px-4 align-middle font-bold text-gray-800 text-left max-w-sm uppercase">
                                    {doc.name}
                                  </td>

                                  {/* CHỨC VỤ / VAI TRÒ */}
                                  <td className="py-4 px-4 align-middle font-semibold text-gold uppercase text-[10px]">
                                    {doc.role}
                                  </td>

                                  {/* TIÊU ĐỀ/TIỂU SỬ */}
                                  <td className="py-4 px-4 align-middle font-light text-gray-400 text-left max-w-xs">
                                    <div className="line-clamp-2 leading-relaxed">
                                      {doc.bio}
                                    </div>
                                  </td>

                                  {/* THỨ TỰ */}
                                  <td className="py-4 px-4 text-center align-middle font-bold text-gray-600">
                                    {doc.order}
                                  </td>

                                  {/* TRẠNG THÁI */}
                                  <td className="py-4 px-4 text-center align-middle">
                                    {doc.is_active ? (
                                      <span className="bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold px-2 py-0.5 rounded border border-[#10b981]/10 uppercase tracking-wider">
                                        Hiển thị
                                      </span>
                                    ) : (
                                      <span className="bg-gray-100 text-gray-450 text-[9px] font-bold px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wider">
                                        Ẩn
                                      </span>
                                    )}
                                  </td>

                                  {/* THAO TÁC */}
                                  <td className="py-4 px-4 text-right align-middle">
                                    <div className="flex justify-end gap-1">
                                      <button
                                        onClick={() => handleOpenEditDoctor(doc)}
                                        className="text-gold hover:text-gold-dark p-2 hover:bg-gold/5 rounded-lg transition-colors"
                                        title="Chỉnh sửa"
                                      >
                                        <Edit size={14} />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteDoctor(doc.id)}
                                        className="text-red-500 hover:text-red-750 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Xóa"
                                      >
                                        <Trash size={14} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Mode: Create/Edit View (Details Editor Page) */}
                {(doctorViewMode === "create" || doctorViewMode === "edit") && (
                  <div>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setDoctorViewMode("list")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setDoctorViewMode("list")}>Đội ngũ</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">{doctorViewMode === "create" ? "Thêm bác sĩ mới" : "Chỉnh sửa thông tin bác sĩ"}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Detailed Editor Form */}
                    <form onSubmit={handleSaveDoctor} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left mt-6">
                      {/* Left Column - 8 cols */}
                      <div className="lg:col-span-8 space-y-6">
                        {/* Họ Và Tên */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Họ Và Tên *</label>
                          <input
                            type="text"
                            required
                            value={doctorForm.data.name}
                            onChange={(e) => doctorForm.setData("name", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-800 font-bold placeholder-gray-300 bg-white"
                            placeholder="Ví dụ: Bùi Như Ngọc"
                          />
                        </div>

                        {/* Chức Danh */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Chức Danh *</label>
                          <input
                            type="text"
                            required
                            value={doctorForm.data.role}
                            onChange={(e) => doctorForm.setData("role", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-800 bg-white"
                            placeholder="Ví dụ: Trưởng phòng Marketing hoặc Bác sĩ Chuyên khoa I"
                          />
                        </div>

                        {/* Description - Short bio */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Tiểu Sử Ngắn *</label>
                            <span className="text-[10px] text-gray-400 font-light select-none">
                              {doctorForm.data.bio.length} Characters, {doctorForm.data.bio.trim().split(/\s+/).filter(Boolean).length} Words
                            </span>
                          </div>
                          <textarea
                            required
                            rows={3}
                            value={doctorForm.data.bio}
                            onChange={(e) => doctorForm.setData("bio", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-700 bg-white resize-none"
                            placeholder="Tóm tắt ngắn gọn chức năng, kinh nghiệm của bác sĩ..."
                          />
                        </div>

                        {/* Biography - Full bio */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Tiểu Sử Đầy Đủ</label>
                          <RichTextEditor
                            value={doctorForm.data.full_bio || ""}
                            onChange={(html) => doctorForm.setData("full_bio", html)}
                            placeholder="Nhập tiểu sử đầy đủ, quá trình đào tạo và kinh nghiệm làm việc chi tiết..."
                            minHeight="260px"
                            onOpenMediaLibrary={openMediaLibraryForEditor}
                          />
                        </div>

                        {/* Gallery Section */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Gallery (Trang Chi Tiết)</label>
                          <div className="border border-dashed border-gray-200 rounded-xl p-6 bg-gray-50/50 flex flex-col items-center justify-center text-center">
                            <button
                              type="button"
                              onClick={() => alert("Chức năng tải lên Gallery sẽ được cập nhật trong phiên bản tiếp theo.")}
                              className="border border-[#f97316] text-[#f97316] font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-orange-50 transition-colors bg-transparent cursor-pointer"
                            >
                              + THÊM ẢNH GALLERY
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - 4 cols */}
                      <div className="lg:col-span-4 space-y-6">
                        {/* Profile Image card at the top */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 block">Ảnh Chân Dung</label>
                          <div
                            onClick={() => {
                              setOnMediaSelect(() => (path: string) => {
                                doctorForm.setData(data => ({
                                  ...data,
                                  image: path,
                                  image_file: null
                                }));
                              });
                              setMediaSelectorOpen(true);
                            }}
                            className="relative aspect-[3/4] bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm flex items-center justify-center group cursor-pointer hover:border-gold/50 transition-colors"
                          >
                            {doctorForm.data.image_file ? (
                              <div className="absolute inset-0 w-full h-full">
                                <img
                                  src={URL.createObjectURL(doctorForm.data.image_file)}
                                  className="object-cover w-full h-full"
                                  alt="Preview"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    doctorForm.setData(data => ({
                                      ...data,
                                      image_file: null,
                                      image: ""
                                    }));
                                  }}
                                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                  title="Xóa hình ảnh"
                                >
                                  <Trash size={12} />
                                </button>
                              </div>
                            ) : doctorForm.data.image ? (
                              <div className="absolute inset-0 w-full h-full">
                                <img
                                  src={doctorForm.data.image}
                                  className="object-cover w-full h-full"
                                  alt="Preview"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    doctorForm.setData(data => ({
                                      ...data,
                                      image_file: null,
                                      image: ""
                                    }));
                                  }}
                                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                  title="Xóa hình ảnh"
                                >
                                  <Trash size={12} />
                                </button>
                              </div>
                            ) : editingDoctor && editingDoctor.image && doctorForm.data.image !== "" ? (
                              <div className="absolute inset-0 w-full h-full">
                                <img
                                  src={editingDoctor.image}
                                  className="object-cover w-full h-full"
                                  alt="Current"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    doctorForm.setData(data => ({
                                      ...data,
                                      image_file: null,
                                      image: ""
                                    }));
                                  }}
                                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                  title="Xóa hình ảnh"
                                >
                                  <Trash size={12} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                <ImageIcon size={32} className="stroke-1" />
                                <span className="text-[10px] font-medium">Click để chọn ảnh từ Thư viện tệp</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status & Order Box */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-5">
                          {/* Trạng thái */}
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2.5 block">Trạng Thái</label>
                            <div className="space-y-2">
                              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-gray-800">
                                <input
                                  type="radio"
                                  name="is_active"
                                  checked={doctorForm.data.is_active === 1}
                                  onChange={() => doctorForm.setData("is_active", 1)}
                                  className="text-[#f97316] focus:ring-[#f97316] border-gray-300 w-4 h-4"
                                />
                                <span>Hiển Thị</span>
                              </label>
                              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-400">
                                <input
                                  type="radio"
                                  name="is_active"
                                  checked={doctorForm.data.is_active === 0}
                                  onChange={() => doctorForm.setData("is_active", 0)}
                                  className="text-[#f97316] focus:ring-[#f97316] border-gray-300 w-4 h-4"
                                />
                                <span>Ẩn</span>
                              </label>
                            </div>
                          </div>

                          {/* Thứ tự hiển thị */}
                          <div className="border-t border-gray-100 pt-4">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">Thứ Tự Hiển Thị</label>
                            <input
                              type="number"
                              required
                              value={doctorForm.data.order}
                              onChange={(e) => doctorForm.setData("order", parseInt(e.target.value) || 0)}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                              placeholder="Ví dụ: 8"
                            />
                          </div>
                        </div>

                        {/* Contact details box */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider block border-b border-gray-100 pb-2">Liên Hệ</label>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 block">Email</label>
                            <input
                              type="email"
                              value={doctorForm.data.email}
                              onChange={(e) => doctorForm.setData("email", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                              placeholder="example@lotus.edu.vn"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-150 mt-4">
                          <div>
                            {editingDoctor && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm("Bạn có chắc chắn muốn xóa bác sĩ này?")) {
                                    handleDeleteDoctor(editingDoctor.id);
                                    setDoctorViewMode("list");
                                  }
                                }}
                                className="text-red-500 hover:text-red-750 text-xs font-bold uppercase tracking-wider transition-colors bg-transparent border-0 outline-none cursor-pointer"
                              >
                                XÓA
                              </button>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setDoctorViewMode("list")}
                              className="px-5 py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-bold transition-colors"
                            >
                              Hủy
                            </button>
                            <button
                              type="submit"
                              disabled={doctorForm.processing}
                              className="px-8 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50"
                            >
                              {doctorForm.processing ? "Đang lưu..." : "LƯU"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* FAQS TAB */}
            {activeTab === "faqs" && (
              <div>
                {/* Breadcrumb path */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                  <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setActiveTab("overview")}>🏠</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-600">Câu hỏi thường gặp FAQ</span>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-150/60 mb-6" />

                {/* Actions Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  {/* THÊM MỚI Button */}
                  <button
                    onClick={handleOpenAddFaq}
                    className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[11px] tracking-wider uppercase px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
                  >
                    Thêm mới
                  </button>

                  {/* Search box matching design */}
                  <div className="relative w-72">
                    <input
                      type="text"
                      placeholder="Tìm kiếm.."
                      value={faqSearchTerm}
                      onChange={(e) => setFaqSearchTerm(e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 pr-10 rounded text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                    />
                    <svg
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Listing Table matching Design */}
                {faqs.length === 0 ? (
                  <p className="text-gray-400 text-center py-12 font-light">Chưa có câu hỏi FAQ nào.</p>
                ) : (() => {
                  const filtered = faqs.filter(fq => 
                    fq.question.toLowerCase().includes(faqSearchTerm.toLowerCase()) ||
                    fq.answer.toLowerCase().includes(faqSearchTerm.toLowerCase())
                  );

                  if (filtered.length === 0) {
                    return <p className="text-gray-400 text-center py-12 font-light">Không tìm thấy câu hỏi phù hợp với từ khóa.</p>;
                  }

                  return (
                    <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                            <th className="py-4 px-4 w-12 text-center">ID</th>
                            <th className="py-4 px-4 w-72">Câu hỏi</th>
                            <th className="py-4 px-4">Câu trả lời</th>
                            <th className="py-4 px-4 text-center w-28">Thứ tự</th>
                            <th className="py-4 px-4 text-center w-28">Trạng thái</th>
                            <th className="py-4 px-4 text-right w-24">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                          {filtered.map((fq) => (
                            <tr key={fq.id} className="hover:bg-gray-50/50 transition-colors">
                              {/* ID */}
                              <td className="py-4 px-4 text-center font-bold text-gray-400 align-top pt-5">
                                {fq.id}
                              </td>

                              {/* CÂU HỎI */}
                              <td className="py-4 px-4 font-bold text-gray-800 text-left max-w-xs align-top pt-5 leading-relaxed uppercase">
                                {fq.question}
                              </td>

                              {/* CÂU TRẢ LỜI */}
                              <td className="py-4 px-4 font-light text-gray-500 text-left align-top pt-5 leading-relaxed">
                                {fq.answer}
                              </td>

                              {/* THỨ TỰ */}
                              <td className="py-4 px-4 text-center align-top pt-5 font-bold text-gray-600">
                                {fq.order}
                              </td>

                              {/* TRẠNG THÁI */}
                              <td className="py-4 px-4 text-center align-top pt-5">
                                <span className="bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold px-2 py-0.5 rounded border border-[#10b981]/10 uppercase tracking-wider">
                                  Hiển thị
                                </span>
                              </td>

                              {/* THAO TÁC */}
                              <td className="py-4 px-4 text-right align-top pt-4">
                                <div className="flex justify-end gap-1">
                                  <button
                                    onClick={() => handleOpenEditFaq(fq)}
                                    className="text-gold hover:text-gold-dark p-2 hover:bg-gold/5 rounded-lg transition-colors"
                                    title="Chỉnh sửa"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFaq(fq.id)}
                                    className="text-red-500 hover:text-red-750 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Xóa"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* REAL RESULTS TAB */}
            {activeTab === "realResults" && (
              <div>
                {/* Mode: List View */}
                {realResultViewMode === "list" && (
                  <div>
                    {/* Breadcrumb path */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setActiveTab("overview")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">Kết quả thực tế</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      {/* THÊM MỚI Button */}
                      <button
                        onClick={handleOpenAddRealResult}
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[11px] tracking-wider uppercase px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
                      >
                        Thêm mới
                      </button>

                      {/* Search box matching design */}
                      <div className="relative w-72">
                        <input
                          type="text"
                          placeholder="Tìm kiếm.."
                          value={realResultSearchTerm}
                          onChange={(e) => setRealResultSearchTerm(e.target.value)}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 pr-10 rounded text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                        />
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Listing Table matching Design */}
                    {realResults.length === 0 ? (
                      <p className="text-gray-400 text-center py-12 font-light">Chưa có kết quả thực tế nào.</p>
                    ) : (() => {
                      const filtered = realResults.filter(res => 
                        res.title.toLowerCase().includes(realResultSearchTerm.toLowerCase()) ||
                        res.detail.toLowerCase().includes(realResultSearchTerm.toLowerCase()) ||
                        (res.category && res.category.toLowerCase().includes(realResultSearchTerm.toLowerCase()))
                      );

                      if (filtered.length === 0) {
                        return <p className="text-gray-400 text-center py-12 font-light">Không tìm thấy kết quả phù hợp với từ khóa.</p>;
                      }

                      return (
                        <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                          <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                              <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                                <th className="py-4 px-4 w-12 text-center">ID</th>
                                <th className="py-4 px-4 w-28">Hình ảnh</th>
                                <th className="py-4 px-4 w-60">Tiêu đề kết quả</th>
                                <th className="py-4 px-4 w-40">Danh mục</th>
                                <th className="py-4 px-4">Chi tiết</th>
                                <th className="py-4 px-4 text-center w-36">Loại phương tiện</th>
                                <th className="py-4 px-4 text-center w-36">Ngày tạo</th>
                                <th className="py-4 px-4 text-center w-28">Trạng thái</th>
                                <th className="py-4 px-4 text-right w-24">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                              {filtered.map((res) => (
                                <tr key={res.id} className="hover:bg-gray-50/50 transition-colors">
                                  {/* ID */}
                                  <td className="py-4 px-4 text-center font-bold text-gray-400 align-middle">
                                    {res.id}
                                  </td>

                                  {/* HÌNH ẢNH */}
                                  <td className="py-4 px-4 align-middle">
                                    <div className="relative w-20 h-12 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                      {res.image ? (
                                        <img src={res.image} alt={res.title} className="object-cover w-full h-full" />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">No Img</div>
                                      )}
                                    </div>
                                  </td>

                                  {/* TIÊU ĐỀ KẾT QUẢ */}
                                  <td className="py-4 px-4 align-middle font-bold text-gray-800 text-left max-w-xs uppercase leading-snug">
                                    {res.title}
                                  </td>

                                  {/* DANH MỤC */}
                                  <td className="py-4 px-4 align-middle text-gray-500 font-semibold uppercase text-[10px]">
                                    <span className="bg-gold/10 text-gold px-2 py-0.5 rounded">
                                      {res.category}
                                    </span>
                                  </td>

                                  {/* CHI TIẾT */}
                                  <td className="py-4 px-4 align-middle font-light text-gray-400 text-left max-w-sm">
                                    <div className="line-clamp-2 leading-relaxed">
                                      {res.detail}
                                    </div>
                                  </td>

                                  {/* LOẠI PHƯƠNG TIỆN */}
                                  <td className="py-4 px-4 text-center align-middle">
                                    {res.is_video ? (
                                      <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-100/50 uppercase tracking-wider">
                                        Video
                                      </span>
                                    ) : (
                                      <span className="bg-gray-100 text-gray-500 text-[9px] font-medium px-2 py-0.5 rounded border border-gray-200/50 uppercase tracking-wider">
                                        Ảnh tĩnh
                                      </span>
                                    )}
                                  </td>

                                  {/* NGÀY TẠO */}
                                  <td className="py-4 px-4 text-center align-middle text-gray-400 font-light text-[10px]">
                                    {res.created_at ? new Date(res.created_at).toLocaleDateString("vi-VN") : "08/07/2026"}
                                  </td>

                                  {/* TRẠNG THÁI */}
                                  <td className="py-4 px-4 text-center align-middle">
                                    <span className="bg-[#10b981]/10 text-[#10b981] text-[9px] font-bold px-2 py-0.5 rounded border border-[#10b981]/10 uppercase tracking-wider">
                                      Hiển thị
                                    </span>
                                  </td>

                                  {/* THAO TÁC */}
                                  <td className="py-4 px-4 text-right align-middle">
                                    <div className="flex justify-end gap-1">
                                      <button
                                        onClick={() => handleOpenEditRealResult(res)}
                                        className="text-gold hover:text-gold-dark p-2 hover:bg-gold/5 rounded-lg transition-colors"
                                        title="Chỉnh sửa"
                                      >
                                        <Edit size={14} />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteRealResult(res.id)}
                                        className="text-red-500 hover:text-red-750 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Xóa"
                                      >
                                        <Trash size={14} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Mode: Create/Edit View (Details Editor Page) */}
                {(realResultViewMode === "create" || realResultViewMode === "edit") && (
                  <div>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setRealResultViewMode("list")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setRealResultViewMode("list")}>Kết quả thực tế</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">{realResultViewMode === "create" ? "Tạo Mới Kết Quả" : "Chỉnh Sửa Kết Quả"}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Detailed Editor Form */}
                    <form onSubmit={handleSaveRealResult} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left mt-6">
                      {/* Left Column - 8 cols */}
                      <div className="lg:col-span-8 space-y-6">
                        {/* Title */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Tiêu đề kết quả *</label>
                            <span className="text-[10px] text-gray-400 font-light select-none">
                              {realResultForm.data.title.length} Characters
                            </span>
                          </div>
                          <input
                            type="text"
                            required
                            value={realResultForm.data.title}
                            onChange={(e) => realResultForm.setData("title", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-800 font-bold placeholder-gray-300 bg-white"
                            placeholder="Ví dụ: Theq Eyeluxe - Cắt mí Double Eyeluxe"
                          />
                          {realResultForm.data.title && (
                            <div className="text-[10px] text-blue-500 font-light select-none break-all mt-1 bg-blue-50/50 border border-blue-100/50 px-3 py-1.5 rounded-md inline-block">
                              URL: https://theq.vn/ket-qua/{realResultForm.data.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
                            </div>
                          )}
                        </div>

                        {/* Detail (WYSIWYG Editor style) */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Chi tiết kết quả thực tế *</label>
                          <RichTextEditor
                            value={realResultForm.data.detail || ""}
                            onChange={(html) => realResultForm.setData("detail", html)}
                            placeholder="Mô tả sự thay đổi của khách hàng trước/sau khi trị liệu..."
                            minHeight="300px"
                            onOpenMediaLibrary={openMediaLibraryForEditor}
                          />
                        </div>

                        {/* Meta Title */}
                        <div className="space-y-1.5 pt-4">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Title</label>
                          <input
                            type="text"
                            value={realResultForm.data.meta_title}
                            onChange={(e) => realResultForm.setData("meta_title", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                            placeholder="Nhập thẻ tiêu đề SEO (Meta Title)..."
                          />
                        </div>

                        {/* Meta Description */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Description</label>
                          <textarea
                            rows={3}
                            value={realResultForm.data.meta_description}
                            onChange={(e) => realResultForm.setData("meta_description", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-600 resize-none font-light leading-relaxed bg-white"
                            placeholder="Nhập thẻ mô tả SEO (Meta Description)..."
                          />
                        </div>

                        {/* Advanced Collapsible Accordion */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                          <button
                            type="button"
                            onClick={() => setAdvancedRealResultOpen(!advancedRealResultOpen)}
                            className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50/50 hover:bg-gray-50 text-left border-b border-gray-150 transition-colors"
                          >
                            <span className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 select-none">
                              {advancedRealResultOpen ? "▼" : "▶"} Cấu hình nâng cao
                            </span>
                          </button>
                          
                          {advancedRealResultOpen && (
                            <div className="p-5 space-y-4 bg-gray-50/25 border-t border-gray-100 transition-all duration-300">
                              {/* Custom Slug */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Custom Slug</label>
                                <input
                                  type="text"
                                  value={realResultForm.data.slug}
                                  onChange={(e) => realResultForm.setData("slug", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Đường dẫn tĩnh tùy chỉnh (ví dụ: ket-qua-cat-mi-double-eyeluxe)..."
                                />
                              </div>

                              {/* Meta Keywords */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Keywords</label>
                                <input
                                  type="text"
                                  value={realResultForm.data.meta_keywords}
                                  onChange={(e) => realResultForm.setData("meta_keywords", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Từ khóa SEO (ví dụ: cắt mí, kết quả cắt mí)..."
                                />
                              </div>

                              {/* Meta Robots */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Robots</label>
                                <input
                                  type="text"
                                  value={realResultForm.data.meta_robots}
                                  onChange={(e) => realResultForm.setData("meta_robots", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Ví dụ: index, follow..."
                                />
                              </div>

                              {/* Canonical Link */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Canonical Link</label>
                                <input
                                  type="text"
                                  value={realResultForm.data.canonical_link}
                                  onChange={(e) => realResultForm.setData("canonical_link", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Đường dẫn canonical (ví dụ: https://theq.vn/ket-qua/xyz)..."
                                />
                              </div>

                              {/* Meta Image */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Image</label>
                                <input
                                  type="text"
                                  value={realResultForm.data.meta_image}
                                  onChange={(e) => realResultForm.setData("meta_image", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="URL hình ảnh SEO cho kết quả thực tế..."
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column - 4 cols */}
                      <div className="lg:col-span-4 space-y-6">
                        {/* Box 1: Status & Media type */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-5">
                          {/* Trạng thái */}
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2.5 block">Trạng thái</label>
                            <div className="space-y-2">
                              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-gray-800">
                                <input
                                  type="radio"
                                  name="real_result_status"
                                  checked={true}
                                  readOnly
                                  className="text-gold focus:ring-gold border-gray-300 w-4 h-4"
                                />
                                <span>Hiển thị</span>
                              </label>
                              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-400">
                                <input
                                  type="radio"
                                  name="real_result_status"
                                  checked={false}
                                  readOnly
                                  className="text-gold focus:ring-gold border-gray-300 w-4 h-4"
                                />
                                <span>Tạm ẩn</span>
                              </label>
                            </div>
                          </div>

                          {/* Dạng phương tiện video */}
                          <div className="border-t border-gray-100 pt-4">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Dạng phương tiện</label>
                            <select
                              value={realResultForm.data.is_video}
                              onChange={(e) => realResultForm.setData("is_video", parseInt(e.target.value))}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                            >
                              <option value={0}>Không (Ảnh tĩnh Before/After)</option>
                              <option value={1}>Có (Hiển thị biểu tượng Play)</option>
                            </select>
                          </div>

                          {/* Hình ảnh */}
                          <div className="border-t border-gray-100 pt-4">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 block">Ảnh Before/After *</label>
                            <div
                              onClick={() => {
                                setOnMediaSelect(() => (path: string) => {
                                  realResultForm.setData(data => ({
                                    ...data,
                                    image: path,
                                    image_file: null
                                  }));
                                });
                                setMediaSelectorOpen(true);
                              }}
                              className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50/50 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                            >
                              {realResultForm.data.image_file ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={URL.createObjectURL(realResultForm.data.image_file)}
                                    className="object-cover w-full h-full"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      realResultForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : realResultForm.data.image ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={realResultForm.data.image}
                                    className="object-cover w-full h-full"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      realResultForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : editingRealResult && editingRealResult.image && realResultForm.data.image !== "" ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={editingRealResult.image}
                                    className="object-cover w-full h-full"
                                    alt="Current"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      realResultForm.setData(data => ({
                                        ...data,
                                        image_file: null,
                                        image: ""
                                      }));
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
                                    title="Xóa hình ảnh"
                                  >
                                    <Trash size={12} />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                  <ImageIcon size={24} className="stroke-1" />
                                  <span className="text-[10px] font-medium">Click để chọn ảnh từ Thư viện tệp</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Video Upload Section */}
                          <div className="border-t border-gray-100 pt-4">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 block">Video Thực Tế (.mp4, .webm)</label>
                            <div className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50/50 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group">
                              {realResultForm.data.video_file ? (
                                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                                  <Play size={24} className="text-gold mb-1" />
                                  <span className="text-[10px] font-bold truncate max-w-full">{realResultForm.data.video_file.name}</span>
                                  <span className="text-[9px] text-gray-400">{(realResultForm.data.video_file.size / 1024 / 1024).toFixed(2)} MB</span>
                                  <span className="text-[9px] text-white/50 mt-2 bg-white/10 px-2 py-0.5 rounded">Click để đổi video</span>
                                </div>
                              ) : editingRealResult && editingRealResult.video ? (
                                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                                  <Play size={24} className="text-gold mb-1" />
                                  <span className="text-[10px] font-bold truncate max-w-full">Đang có video đã tải lên</span>
                                  <span className="text-[9px] text-gray-400">{editingRealResult.video}</span>
                                  <span className="text-[9px] text-white/50 mt-2 bg-white/10 px-2 py-0.5 rounded">Click để đổi video</span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                  <Play size={24} className="stroke-1 text-gray-400" />
                                  <span className="text-[10px] font-medium">Click để chọn file video</span>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  realResultForm.setData((prev) => ({
                                    ...prev,
                                    video_file: file,
                                    is_video: file ? 1 : prev.is_video,
                                  }));
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Box 2: Categorization */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Danh mục điều trị</label>
                            <select
                              value={realResultForm.data.category}
                              onChange={(e) => realResultForm.setData("category", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                            >
                              <option value="eyeluxe">Theq Eyeluxe</option>
                              <option value="sylfirm">Sylfirm X</option>
                              <option value="meso">Cocktail Infusion</option>
                              <option value="pro-lift">Theq Pro-Lift</option>
                              <option value="hya">Hya Reshape</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Thứ tự hiển thị</label>
                            <input
                              type="number"
                              required
                              value={realResultForm.data.order}
                              onChange={(e) => realResultForm.setData("order", parseInt(e.target.value) || 0)}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                              placeholder="Ví dụ: 8"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-150 mt-4">
                          <div>
                            {editingRealResult && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm("Bạn có chắc chắn muốn xóa kết quả này?")) {
                                    handleDeleteRealResult(editingRealResult.id);
                                    setRealResultViewMode("list");
                                  }
                                }}
                                className="text-red-500 hover:text-red-750 text-xs font-bold uppercase tracking-wider transition-colors bg-transparent border-0 outline-none cursor-pointer"
                              >
                                XÓA
                              </button>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setRealResultViewMode("list")}
                              className="px-5 py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-bold transition-colors"
                            >
                              Hủy
                            </button>
                            <button
                              type="submit"
                              disabled={realResultForm.processing}
                              className="px-8 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50"
                            >
                              {realResultForm.processing ? "Đang lưu..." : "LƯU"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* MEDIA MANAGER TAB (QUẢN LÝ TỆP) */}
            {activeTab === "media" && (
              <div className="flex flex-col gap-6 text-left">
                {/* Header Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-gray-150 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-gray-800 shrink-0">Quản lý tệp</h3>
                  </div>
                  
                  {/* Search and Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto md:flex-nowrap justify-end flex-grow">
                    <input
                      type="text"
                      value={mediaSearchQuery}
                      onChange={(e) => setMediaSearchQuery(e.target.value)}
                      placeholder="Nhập tên tệp..."
                      className="border border-gray-200 focus:border-gold px-3.5 py-1.5 rounded-lg text-xs focus:outline-none w-full max-w-xs"
                    />
                    
                    <button
                      type="button"
                      onClick={() => setShowCreateFolderModal(true)}
                      className="px-3.5 py-1.5 border border-[#f97316]/30 hover:border-[#f97316] text-[#f97316] bg-orange-50/20 hover:bg-orange-50 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      TẠO THƯ MỤC
                    </button>
                    
                    <button
                      type="button"
                      disabled={currentFolderId === null}
                      onClick={() => {
                        if (currentFolderId) {
                          handleDeleteFolder(currentFolderId);
                        }
                      }}
                      className="px-3.5 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:hover:bg-transparent rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      XÓA THƯ MỤC
                    </button>
                    
                    <input
                      type="file"
                      ref={mediaFileInputRef}
                      onChange={handleUploadMediaFile}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      disabled={mediaUploadLoading}
                      onClick={() => mediaFileInputRef.current?.click()}
                      className="px-4 py-1.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-lg text-xs font-bold transition-colors shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-1 shrink-0"
                    >
                      {mediaUploadLoading ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-5.025-4.655A6 6 0 0 0 10.5 3.75Zm.75 4.75a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.5Z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span>CHỌN TỆP</span>
                    </button>
                  </div>
                </div>

                {/* Left/Right Split Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[500px]">
                  {/* Left Pane - Directory Tree */}
                  <div className="md:col-span-3 lg:col-span-2.5 bg-white border border-gray-150 rounded-xl p-4 shadow-sm overflow-y-auto max-h-[600px]">
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-3 select-none">
                      Thư mục
                    </div>
                    <FolderTree
                      folders={allMediaFolders}
                      currentFolderId={currentFolderId}
                      onSelectFolder={(id) => fetchMedia(id)}
                    />
                  </div>

                  {/* Right Pane - Content Grid */}
                  <div 
                    onDragOver={handleMediaDragOver}
                    onDragEnter={handleMediaDragEnter}
                    onDragLeave={handleMediaDragLeave}
                    onDrop={handleMediaDrop}
                    className="md:col-span-9 lg:col-span-9.5 bg-white border border-gray-150 rounded-xl p-6 shadow-sm flex flex-col relative"
                  >
                    {isMediaDragging && (
                      <div className="absolute inset-0 bg-orange-50/60 border-2 border-dashed border-[#f97316] rounded-xl z-50 flex flex-col items-center justify-center pointer-events-none animate-pulse">
                        <div className="bg-white px-6 py-5 rounded-xl shadow-lg border border-orange-100 flex flex-col items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-[#f97316] animate-bounce">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                          </svg>
                          <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Thả tệp vào đây để tải lên</span>
                          <span className="text-[10px] text-gray-400 font-light">Hỗ trợ tải lên nhiều tệp tin ảnh cùng lúc</span>
                        </div>
                      </div>
                    )}
                    {/* Breadcrumbs for orientation */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 bg-gray-50/70 border border-gray-100 px-4 py-2 rounded-lg select-none">
                      <span className="font-semibold cursor-pointer hover:text-gold" onClick={() => fetchMedia(null)}>
                        File Manager
                      </span>
                      {mediaBreadcrumbs.map((crumb) => (
                        <React.Fragment key={crumb.id}>
                          <span className="text-gray-400">/</span>
                          <span
                            className="font-semibold cursor-pointer hover:text-gold"
                            onClick={() => fetchMedia(crumb.id)}
                          >
                            {crumb.name}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Files display area */}
                    {mediaLoading ? (
                      <div className="my-auto py-20 flex flex-col items-center justify-center gap-2">
                        <div className="w-8 h-8 border-3 border-gold border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-gray-450">Đang tải tệp tin...</span>
                      </div>
                    ) : mediaFolders.length === 0 && mediaFiles.length === 0 ? (
                      <div className="my-auto py-20 border border-dashed border-gray-150 rounded-xl text-center flex flex-col items-center justify-center gap-2 bg-gray-50/20">
                        <ImageIcon size={36} className="text-gray-300 stroke-1" />
                        <span className="text-xs font-semibold text-gray-400">Thư mục trống</span>
                        <span className="text-[10px] text-gray-400">Hãy chọn tải hình ảnh lên thư mục này!</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {/* Subfolders in right grid (with option to open on click) */}
                        {mediaFolders.map((folder) => (
                          <div
                            key={folder.id}
                            className="group relative border border-gray-150 hover:border-[#f97316]/30 rounded-xl p-3 bg-white hover:bg-orange-50/5 transition-all cursor-pointer flex flex-col items-center text-center justify-center"
                            onClick={() => fetchMedia(folder.id)}
                          >
                            {/* Delete Folder Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFolder(folder.id);
                              }}
                              className="absolute top-1.5 right-1.5 p-1 text-gray-455 hover:text-red-500 rounded bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Xóa thư mục"
                            >
                              <Trash size={14} />
                            </button>
                            
                            <div className="w-10 h-10 text-yellow-500 mb-1.5 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                                <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-1.5V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v1.5H4.5A3 3 0 0 0 1.5 13.5V18a3 3 0 0 0 3 3h15ZM6 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5H6V9Zm-3 4.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.5Z" />
                              </svg>
                            </div>
                            <span className="text-[11px] font-semibold text-gray-700 truncate w-full px-1">{folder.name}</span>
                          </div>
                        ))}

                        {/* Files grid */}
                        {mediaFiles
                          .filter(file => !mediaSearchQuery || file.name.toLowerCase().includes(mediaSearchQuery.toLowerCase()))
                          .map((file) => (
                            <div
                              key={file.id}
                              onClick={() => {
                                setSelectedMediaIds(prev => 
                                  prev.includes(file.id) 
                                    ? prev.filter(id => id !== file.id) 
                                    : [...prev, file.id]
                                );
                              }}
                              className={`group relative border rounded-xl overflow-hidden bg-white hover:shadow-md transition-all flex flex-col cursor-pointer select-none ${
                                selectedMediaIds.includes(file.id)
                                  ? "border-gold ring-2 ring-gold/25"
                                  : "border-gray-150 hover:border-gold/40"
                              }`}
                            >
                              {/* Selection Checkbox indicator */}
                              <div className={`absolute top-2 left-2 z-10 transition-opacity duration-200 ${
                                selectedMediaIds.includes(file.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                              }`}>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                  selectedMediaIds.includes(file.id)
                                    ? "bg-gold border-gold text-white"
                                    : "bg-white/85 border-gray-350 hover:border-gold backdrop-blur-sm"
                                }`}>
                                  {selectedMediaIds.includes(file.id) && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>

                              {/* Action buttons inside card */}
                              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(window.location.origin + file.path);
                                    alert("Đã sao chép đường dẫn hình ảnh!");
                                  }}
                                  className="p-1 text-gray-700 hover:text-gold rounded bg-white/90 shadow-sm border-0 cursor-pointer animate-fade-in"
                                  title="Sao chép link"
                                >
                                  <LinkIcon size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteMediaFile(file.id);
                                  }}
                                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded bg-white/95 shadow-sm border border-red-150 cursor-pointer animate-fade-in"
                                  title="Xóa tệp"
                                >
                                  <Trash size={14} />
                                </button>
                              </div>

                              {/* Thumbnail */}
                              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
                                <img
                                  src={file.path}
                                  alt={file.name}
                                  className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-300"
                                />
                              </div>

                              {/* Info footer */}
                              <div className="p-2 text-left">
                                <p className="text-[10px] font-semibold text-gray-700 truncate" title={file.name}>
                                  {file.name}
                                </p>
                                <p className="text-[9px] text-gray-400 mt-0.5">
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Create Folder Modal */}
                {showCreateFolderModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-auto text-left">
                      <h3 className="text-sm font-bold text-gray-800 mb-4">Tạo Thư Mục Mới</h3>
                      <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                        autoFocus
                        className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 mb-4"
                        placeholder="Nhập tên thư mục..."
                      />
                      <div className="flex gap-3 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCreateFolderModal(false);
                            setNewFolderName("");
                          }}
                          className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          onClick={handleCreateFolder}
                          className="px-5 py-2 text-sm font-bold bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
                        >
                          Tạo mới
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SYSTEM CONFIGS TAB (CONFIGS) */}
            {activeTab === "configs" && (
              <div className="text-left">
                <div className="border-b border-gray-150 pb-4 mb-6">
                  <h3 className="text-lg font-bold font-serif text-gray-800">Cấu Hình Trạng Thái</h3>
                  <p className="text-xs text-gray-400 mt-1">Thiết lập trạng thái hoạt động hoặc bảo trì của website hệ thống.</p>
                </div>

                <form onSubmit={handleSaveSettings} className="w-full space-y-6">
                  {/* Status Options */}
                  <div className="bg-gray-50/50 border border-gray-150 rounded-xl p-6 space-y-4">
                    <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Trạng thái hệ thống</label>
                    <div className="space-y-3.5">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="system_status"
                          value="active"
                          checked={settingsForm.data.settings.system_status === "active"}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            system_status: e.target.value
                          })}
                          className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                        />
                        <div>
                          <span className="text-sm font-semibold text-gray-700 block">Hoạt động bình thường</span>
                          <span className="text-xs text-gray-400">Khách hàng truy cập và sử dụng dịch vụ bình thường.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="system_status"
                          value="maintenance"
                          checked={settingsForm.data.settings.system_status === "maintenance"}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            system_status: e.target.value
                          })}
                          className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                        />
                        <div>
                          <span className="text-sm font-semibold text-gray-700 block">Bảo trì hệ thống</span>
                          <span className="text-xs text-gray-400">Khách truy cập sẽ thấy màn hình thông báo bảo trì. Chỉ admin mới truy cập được CMS.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="system_status"
                          value="scheduled"
                          checked={settingsForm.data.settings.system_status === "scheduled"}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            system_status: e.target.value
                          })}
                          className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                        />
                        <div>
                          <span className="text-sm font-semibold text-gray-700 block">Theo thời gian (Sắp ra mắt)</span>
                          <span className="text-xs text-gray-400">Đặt lịch bảo trì theo giờ định sẵn.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Maintenance Message */}
                  {settingsForm.data.settings.system_status === "maintenance" && (
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-gray-400 tracking-wider block">Thông báo bảo trì</label>
                      <textarea
                        rows={4}
                        value={settingsForm.data.settings.maintenance_message}
                        onChange={(e) => settingsForm.setData("settings", {
                          ...settingsForm.data.settings,
                          maintenance_message: e.target.value
                        })}
                        className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-700"
                        placeholder="Ví dụ: Hệ thống đang nâng cấp định kỳ..."
                      />
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={settingsForm.processing}
                      className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-md transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {settingsForm.processing ? "Đang lưu cài đặt..." : "Lưu cài đặt"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-bold font-serif text-gray-800 mb-6">Cấu Hình Thông Tin Hệ Thống</h3>
                <form onSubmit={handleSaveSettings} className="w-full space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Số điện thoại Hotline</label>
                      <input
                        type="text"
                        value={settingsForm.data.settings.site_hotline}
                        onChange={(e) => settingsForm.setData("settings", {
                          ...settingsForm.data.settings,
                          site_hotline: e.target.value
                        })}
                        className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                        placeholder="Ví dụ: 19005006"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Email liên hệ</label>
                      <input
                        type="email"
                        value={settingsForm.data.settings.site_email}
                        onChange={(e) => settingsForm.setData("settings", {
                          ...settingsForm.data.settings,
                          site_email: e.target.value
                        })}
                        className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                        placeholder="Ví dụ: info@theq.vn"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Địa chỉ phòng khám</label>
                    <input
                      type="text"
                      value={settingsForm.data.settings.site_address}
                      onChange={(e) => settingsForm.setData("settings", {
                        ...settingsForm.data.settings,
                        site_address: e.target.value
                      })}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                      placeholder="Nhập địa chỉ đầy đủ của phòng khám"
                    />
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-4">Logo thương hiệu</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Logo tối màu (nền sáng) */}
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Logo tối màu (Dùng cho nền sáng/trắng)</label>
                        <div
                          onClick={() => {
                            setOnMediaSelect(() => (path: string) => {
                              settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                site_logo_dark: path
                              });
                            });
                            setMediaSelectorOpen(true);
                          }}
                          className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50 flex flex-col items-center justify-center min-h-[120px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                        >
                          {settingsForm.data.settings.site_logo_dark ? (
                            <>
                              <div className="absolute inset-0 w-full h-full p-4 bg-white flex items-center justify-center">
                                <img
                                  src={settingsForm.data.settings.site_logo_dark}
                                  className="object-contain max-h-full max-w-full"
                                  alt="Logo tối màu"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi logo</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  settingsForm.setData("settings", {
                                    ...settingsForm.data.settings,
                                    site_logo_dark: ""
                                  });
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-650 text-white rounded-lg shadow-md transition-all z-20 hover:scale-105 duration-200"
                                title="Xóa logo"
                              >
                                <Trash size={12} />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 text-gray-400">
                              <ImageIcon size={20} className="stroke-1" />
                              <span className="text-[10px] font-medium">Chọn logo từ thư viện</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Logo sáng màu (nền tối) */}
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Logo sáng màu (Dùng cho nền tối/trong suốt)</label>
                        <div
                          onClick={() => {
                            setOnMediaSelect(() => (path: string) => {
                              settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                site_logo_light: path
                              });
                            });
                            setMediaSelectorOpen(true);
                          }}
                          className="border border-dashed border-gray-250 rounded-xl p-3 bg-[#232323] flex flex-col items-center justify-center min-h-[120px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                        >
                          {settingsForm.data.settings.site_logo_light ? (
                            <>
                              <div className="absolute inset-0 w-full h-full p-4 bg-[#171717] flex items-center justify-center">
                                <img
                                  src={settingsForm.data.settings.site_logo_light}
                                  className="object-contain max-h-full max-w-full"
                                  alt="Logo sáng màu"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi logo</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  settingsForm.setData("settings", {
                                    ...settingsForm.data.settings,
                                    site_logo_light: ""
                                  });
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-650 text-white rounded-lg shadow-md transition-all z-20 hover:scale-105 duration-200"
                                title="Xóa logo"
                              >
                                <Trash size={12} />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 text-gray-400">
                              <ImageIcon size={20} className="stroke-1" />
                              <span className="text-[10px] font-medium">Chọn logo từ thư viện</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Logo vuông (Favicon) */}
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Logo vuông (Favicon / Icon đại diện)</label>
                        <div
                          onClick={() => {
                            setOnMediaSelect(() => (path: string) => {
                              settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                site_logo_square: path
                              });
                            });
                            setMediaSelectorOpen(true);
                          }}
                          className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50 flex flex-col items-center justify-center min-h-[120px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                        >
                          {settingsForm.data.settings.site_logo_square ? (
                            <>
                              <div className="absolute inset-0 w-full h-full p-4 bg-white flex items-center justify-center border border-gray-100 rounded-lg">
                                <img
                                  src={settingsForm.data.settings.site_logo_square}
                                  className="object-contain max-h-full max-w-full"
                                  alt="Logo vuông"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi logo</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  settingsForm.setData("settings", {
                                    ...settingsForm.data.settings,
                                    site_logo_square: ""
                                  });
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-655 text-white rounded-lg shadow-md transition-all z-20 hover:scale-105 duration-200"
                                title="Xóa logo"
                              >
                                <Trash size={12} />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 text-gray-400">
                              <ImageIcon size={20} className="stroke-1" />
                              <span className="text-[10px] font-medium">Chọn logo từ thư viện</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Logo vuông sáng màu (nền tối) */}
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Logo vuông sáng màu (Dùng cho nền tối)</label>
                        <div
                          onClick={() => {
                            setOnMediaSelect(() => (path: string) => {
                              settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                site_logo_square_light: path
                              });
                            });
                            setMediaSelectorOpen(true);
                          }}
                          className="border border-dashed border-gray-250 rounded-xl p-3 bg-[#232323] flex flex-col items-center justify-center min-h-[120px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                        >
                          {settingsForm.data.settings.site_logo_square_light ? (
                            <>
                              <div className="absolute inset-0 w-full h-full p-4 bg-[#171717] flex items-center justify-center border border-white/10 rounded-lg">
                                <img
                                  src={settingsForm.data.settings.site_logo_square_light}
                                  className="object-contain max-h-full max-w-full"
                                  alt="Logo vuông sáng màu"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi logo</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  settingsForm.setData("settings", {
                                    ...settingsForm.data.settings,
                                    site_logo_square_light: ""
                                  });
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-655 text-white rounded-lg shadow-md transition-all z-20 hover:scale-105 duration-200"
                                title="Xóa logo"
                              >
                                <Trash size={12} />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 text-gray-400">
                              <ImageIcon size={20} className="stroke-1" />
                              <span className="text-[10px] font-medium">Chọn logo từ thư viện</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-4">Mạng xã hội & Hỗ trợ trực tuyến</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đường dẫn Facebook</label>
                        <input
                          type="text"
                          value={settingsForm.data.settings.facebook_url}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            facebook_url: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                          placeholder="Link trang Fanpage"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đường dẫn Zalo</label>
                        <input
                          type="text"
                          value={settingsForm.data.settings.zalo_url}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            zalo_url: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                          placeholder="Link chat Zalo"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Kênh YouTube</label>
                        <input
                          type="text"
                          value={settingsForm.data.settings.youtube_url}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            youtube_url: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                          placeholder="Link kênh YouTube"
                        />
                      </div>
                    </div>
                  </div>

                  <BlogHeaderAndCategoriesEditor
                    settings={settingsForm.data.settings}
                    onUpdate={(patch) =>
                      settingsForm.setData("settings", {
                        ...settingsForm.data.settings,
                        ...patch,
                      })
                    }
                    onSelectBannerImage={(cb) => {
                      setOnMediaSelect(() => cb);
                      setMediaSelectorOpen(true);
                    }}
                  />

                  <FooterSettingsEditor
                    settings={settingsForm.data.settings}
                    onUpdate={(patch) =>
                      settingsForm.setData("settings", {
                        ...settingsForm.data.settings,
                        ...patch,
                      })
                    }
                  />

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={settingsForm.processing}
                      className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white font-bold rounded text-sm shadow-md transition-colors disabled:opacity-50"
                    >
                      {settingsForm.processing ? "Đang lưu cấu hình..." : "Lưu Cấu Hình"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* INTRO TAB */}
            {activeTab === "intro" && (
              <div>
                <h3 className="text-lg font-bold font-serif text-gray-800 mb-6">Quản Lý Trang Giới Thiệu & Triết Lý</h3>
                <form onSubmit={handleSaveSettings} className="w-full space-y-8 text-left pb-12">
                  
                  {/* PHẦN 1: GIỚI THIỆU CHÍNH */}
                  <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-6">
                    <h4 className="text-sm font-bold font-serif text-gold uppercase tracking-wider border-b border-gray-100 pb-3">
                      1. Khối Giới Thiệu Chính (Giới thiệu & Triết lý)
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Nhãn phụ giới thiệu (Eyebrow)</label>
                            <input
                              type="text"
                              value={settingsForm.data.settings.intro_subtitle}
                              onChange={(e) => settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_subtitle: e.target.value
                              })}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none"
                              placeholder="Ví dụ: Về Chúng Tôi"
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Tiêu đề chính (Title)</label>
                            <input
                              type="text"
                              value={settingsForm.data.settings.intro_title}
                              onChange={(e) => settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_title: e.target.value
                              })}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none"
                              placeholder="Ví dụ: THEQ NAIL CENTRE"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Đoạn mô tả giới thiệu 1</label>
                            <textarea
                              rows={10}
                              value={settingsForm.data.settings.intro_desc_1}
                              onChange={(e) => settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_desc_1: e.target.value
                              })}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none resize-y"
                              placeholder="Nhập đoạn văn giới thiệu thứ nhất..."
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Đoạn mô tả giới thiệu 2</label>
                            <textarea
                              rows={10}
                              value={settingsForm.data.settings.intro_desc_2}
                              onChange={(e) => settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_desc_2: e.target.value
                              })}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none resize-y"
                              placeholder="Nhập đoạn văn giới thiệu thứ hai..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1.5 block">
                          Ảnh Đại Diện Phần Giới Thiệu (Ảnh lớn trang chủ)
                        </label>
                        <div
                          onClick={() => {
                            setOnMediaSelect(() => (path: string) => {
                              settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_image: path
                              });
                            });
                            setMediaSelectorOpen(true);
                          }}
                          className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50 flex flex-col items-center justify-center aspect-[4/5] w-full text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                        >
                           {settingsForm.data.settings.intro_image ? (
                            <>
                              <div className="absolute inset-0 w-full h-full">
                                <img
                                  src={settingsForm.data.settings.intro_image}
                                  className="object-cover w-full h-full"
                                  alt="Preview Intro Image"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  settingsForm.setData("settings", {
                                    ...settingsForm.data.settings,
                                    intro_image: ""
                                  });
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all z-20 hover:scale-105 duration-200"
                                title="Xóa ảnh"
                              >
                                <Trash size={14} />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 text-gray-400">
                              <ImageIcon size={24} className="stroke-1" />
                              <span className="text-[10px] font-medium">Chọn ảnh từ thư viện</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                      {/* Cấu hình đếm bác sĩ */}
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đếm số lượng Bác sĩ</label>
                        <select
                          value={settingsForm.data.settings.intro_stats_doctors_mode}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_stats_doctors_mode: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none text-gray-600 mb-3"
                        >
                          <option value="auto">Tự động (Đếm theo số lượng bác sĩ thực tế: {doctors.length})</option>
                          <option value="manual">Thủ công (Sử dụng số lượng nhập tay dưới đây)</option>
                        </select>
                        
                        {settingsForm.data.settings.intro_stats_doctors_mode === "manual" && (
                          <input
                            type="text"
                            value={settingsForm.data.settings.intro_stats_doctors_manual}
                            onChange={(e) => settingsForm.setData("settings", {
                              ...settingsForm.data.settings,
                              intro_stats_doctors_manual: e.target.value
                            })}
                            className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                            placeholder="Ví dụ: 15"
                          />
                        )}
                      </div>

                      {/* Cấu hình đếm khách hàng */}
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đếm số lượng Khách hàng</label>
                        <select
                          value={settingsForm.data.settings.intro_stats_customers_mode}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_stats_customers_mode: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none text-gray-600 mb-3"
                        >
                          <option value="crm_auto">Tự động CRM (Cơ sở + Số lượng khách đã liên hệ)</option>
                          <option value="manual">Thủ công (Sử dụng giá trị nhập tay dưới đây)</option>
                        </select>
                        
                        {settingsForm.data.settings.intro_stats_customers_mode === "crm_auto" ? (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Số cơ sở (Base)</span>
                              <input
                                type="text"
                                value={settingsForm.data.settings.intro_stats_customers_base}
                                onChange={(e) => settingsForm.setData("settings", {
                                  ...settingsForm.data.settings,
                                  intro_stats_customers_base: e.target.value
                                })}
                                className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                                placeholder="Ví dụ: 10000"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Đã liên hệ (CRM)</span>
                              <div className="bg-gray-50 border border-gray-150 px-3 py-2.5 rounded text-sm text-gray-500 font-semibold select-none">
                                + {submissions.filter(s => s.status === 'Đã liên hệ').length}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={settingsForm.data.settings.intro_stats_customers_manual}
                            onChange={(e) => settingsForm.setData("settings", {
                              ...settingsForm.data.settings,
                              intro_stats_customers_manual: e.target.value
                            })}
                            className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                            placeholder="Ví dụ: 10k+"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* PHẦN 2: CÂU CHUYỆN SÁNG LẬP */}
                  <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-6">
                    <h4 className="text-sm font-bold font-serif text-gold uppercase tracking-wider border-b border-gray-100 pb-3">
                      2. Câu Chuyện Nhà Sáng Lập (Founder Story)
                    </h4>
                    
                    <div>
                      <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Tiêu đề câu chuyện</label>
                      <input
                        type="text"
                        value={settingsForm.data.settings.intro_story_title || ""}
                        onChange={(e) => settingsForm.setData("settings", {
                          ...settingsForm.data.settings,
                          intro_story_title: e.target.value
                        })}
                        className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none"
                        placeholder="Nhập tiêu đề câu chuyện..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Đoạn mô tả câu chuyện 1</label>
                        <textarea
                          rows={10}
                          value={settingsForm.data.settings.intro_story_desc_1 || ""}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_story_desc_1: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none resize-y"
                          placeholder="Nhập nội dung mô tả thứ nhất..."
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Đoạn mô tả câu chuyện 2</label>
                        <textarea
                          rows={10}
                          value={settingsForm.data.settings.intro_story_desc_2 || ""}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_story_desc_2: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none resize-y"
                          placeholder="Nhập nội dung mô tả thứ hai..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-50">
                      <div className="md:col-span-2">
                        <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Câu trích dẫn (Quote)</label>
                        <input
                          type="text"
                          value={settingsForm.data.settings.intro_story_quote || ""}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_story_quote: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none"
                          placeholder="Câu nói truyền cảm hứng..."
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Người trích dẫn (Tác giả)</label>
                        <input
                          type="text"
                          value={settingsForm.data.settings.intro_story_quote_author || ""}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_story_quote_author: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none"
                          placeholder="Ví dụ: CEO Khánh Tôn"
                        />
                      </div>
                    </div>

                    {/* Bộ 3 ảnh câu chuyện */}
                    <div className="pt-6 border-t border-gray-100">
                      <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-4 block">Bộ ba hình ảnh câu chuyện</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Ảnh 1 */}
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold block mb-1.5">Ảnh 1: Hội thảo (Dọc/Ngang nhỏ)</span>
                          <div
                            onClick={() => {
                              setOnMediaSelect(() => (path: string) => {
                                settingsForm.setData("settings", {
                                  ...settingsForm.data.settings,
                                  intro_story_image_1: path
                                });
                              });
                              setMediaSelectorOpen(true);
                            }}
                            className="border border-dashed border-gray-250 rounded-xl p-2 bg-gray-55/10 flex flex-col items-center justify-center aspect-video w-full text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                          >
                            {settingsForm.data.settings.intro_story_image_1 ? (
                              <>
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={settingsForm.data.settings.intro_story_image_1}
                                    className="object-cover w-full h-full"
                                    alt="Story 1"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[9px] text-white font-bold bg-black/60 px-2 py-0.5 rounded">Thay đổi</span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    settingsForm.setData("settings", {
                                      ...settingsForm.data.settings,
                                      intro_story_image_1: ""
                                    });
                                  }}
                                  className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition-all z-20 hover:scale-105 duration-200"
                                  title="Xóa ảnh"
                                >
                                  <Trash size={10} />
                                </button>
                              </>
                            ) : (
                              <div className="text-gray-400 flex flex-col items-center gap-1">
                                <ImageIcon size={20} className="stroke-1" />
                                <span className="text-[9px]">Chọn ảnh</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Ảnh 2 */}
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold block mb-1.5">Ảnh 2: Nhỏ/Chứng nhận</span>
                          <div
                            onClick={() => {
                              setOnMediaSelect(() => (path: string) => {
                                settingsForm.setData("settings", {
                                  ...settingsForm.data.settings,
                                  intro_story_image_2: path
                                });
                              });
                              setMediaSelectorOpen(true);
                            }}
                            className="border border-dashed border-gray-250 rounded-xl p-2 bg-gray-55/10 flex flex-col items-center justify-center aspect-video w-full text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                          >
                            {settingsForm.data.settings.intro_story_image_2 ? (
                              <>
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={settingsForm.data.settings.intro_story_image_2}
                                    className="object-cover w-full h-full"
                                    alt="Story 2"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[9px] text-white font-bold bg-black/60 px-2 py-0.5 rounded">Thay đổi</span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    settingsForm.setData("settings", {
                                      ...settingsForm.data.settings,
                                      intro_story_image_2: ""
                                    });
                                  }}
                                  className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition-all z-20 hover:scale-105 duration-200"
                                  title="Xóa ảnh"
                                >
                                  <Trash size={10} />
                                </button>
                              </>
                            ) : (
                              <div className="text-gray-400 flex flex-col items-center gap-1">
                                <ImageIcon size={20} className="stroke-1" />
                                <span className="text-[9px]">Chọn ảnh</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Ảnh 3 */}
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold block mb-1.5">Ảnh 3: Toàn cảnh (Ngang to)</span>
                          <div
                            onClick={() => {
                              setOnMediaSelect(() => (path: string) => {
                                settingsForm.setData("settings", {
                                  ...settingsForm.data.settings,
                                  intro_story_image_3: path
                                });
                              });
                              setMediaSelectorOpen(true);
                            }}
                            className="border border-dashed border-gray-250 rounded-xl p-2 bg-gray-55/10 flex flex-col items-center justify-center aspect-video w-full text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                          >
                            {settingsForm.data.settings.intro_story_image_3 ? (
                              <>
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={settingsForm.data.settings.intro_story_image_3}
                                    className="object-cover w-full h-full"
                                    alt="Story 3"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[9px] text-white font-bold bg-black/60 px-2 py-0.5 rounded">Thay đổi</span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    settingsForm.setData("settings", {
                                      ...settingsForm.data.settings,
                                      intro_story_image_3: ""
                                    });
                                  }}
                                  className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition-all z-20 hover:scale-105 duration-200"
                                  title="Xóa ảnh"
                                >
                                  <Trash size={10} />
                                </button>
                              </>
                            ) : (
                              <div className="text-gray-400 flex flex-col items-center gap-1">
                                <ImageIcon size={20} className="stroke-1" />
                                <span className="text-[9px]">Chọn ảnh</span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* PHẦN 3: TẠI SAO KHÁCH HÀNG TIN CHỌN */}
                  <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-6">
                    <h4 className="text-sm font-bold font-serif text-gold uppercase tracking-wider border-b border-gray-100 pb-3">
                      3. Tại sao khách hàng tin chọn (Why Choose Us Cards)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((num) => {
                        const titleKey = `why_choose_us_${num}_title`;
                        const descKey = `why_choose_us_${num}_desc`;
                        const imgKey = `why_choose_us_${num}_image`;
                        
                        return (
                          <div key={num} className="border border-gray-100 rounded-xl p-4 bg-gray-50/30 space-y-4">
                            <span className="text-[10px] font-black bg-gold/15 text-gold px-2.5 py-1 rounded-full uppercase">Thẻ {num}</span>
                            
                            <div>
                              <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Tiêu đề thẻ</label>
                              <input
                                type="text"
                                value={(settingsForm.data.settings as any)[titleKey] || ""}
                                onChange={(e) => settingsForm.setData("settings", {
                                  ...settingsForm.data.settings,
                                  [titleKey]: e.target.value
                                })}
                                className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none bg-white"
                                placeholder={`Tiêu đề thẻ ${num}...`}
                              />
                            </div>
                            
                            <div>
                              <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Mô tả ngắn</label>
                              <textarea
                                rows={6}
                                value={(settingsForm.data.settings as any)[descKey] || ""}
                                onChange={(e) => settingsForm.setData("settings", {
                                  ...settingsForm.data.settings,
                                  [descKey]: e.target.value
                                })}
                                className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded text-base focus:outline-none bg-white resize-y"
                                placeholder={`Mô tả thẻ ${num}...`}
                              />
                            </div>
                            
                            <div>
                              <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Hình ảnh đại diện</label>
                              <div
                                onClick={() => {
                                  setOnMediaSelect(() => (path: string) => {
                                    settingsForm.setData("settings", {
                                      ...settingsForm.data.settings,
                                      [imgKey]: path
                                    });
                                  });
                                  setMediaSelectorOpen(true);
                                }}
                                className="border border-dashed border-gray-250 rounded-lg p-2 bg-white flex flex-col items-center justify-center aspect-[16/10] w-full text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                              >
                                {(settingsForm.data.settings as any)[imgKey] ? (
                                  <>
                                    <div className="absolute inset-0 w-full h-full">
                                      <img
                                        src={(settingsForm.data.settings as any)[imgKey]}
                                        className="object-cover w-full h-full"
                                        alt={`Card ${num}`}
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <span className="text-[8px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">Thay đổi</span>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        settingsForm.setData("settings", {
                                          ...settingsForm.data.settings,
                                          [imgKey]: ""
                                        });
                                      }}
                                      className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow transition-all z-20 hover:scale-105 duration-200"
                                      title="Xóa ảnh"
                                    >
                                      <Trash size={10} />
                                    </button>
                                  </>
                                ) : (
                                  <div className="text-gray-400 flex flex-col items-center gap-1">
                                    <ImageIcon size={18} className="stroke-1" />
                                    <span className="text-[9px]">Chọn ảnh</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* PHẦN 4: TIÊU ĐỀ KHỐI BÁC SĨ & CHUYÊN GIA */}
                  <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-6">
                    <h4 className="text-sm font-bold font-serif text-gold uppercase tracking-wider border-b border-gray-100 pb-3">
                      4. Tiêu đề khối Đội ngũ Bác sĩ & Chuyên gia
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Cấu hình trang Giới thiệu */}
                      <div className="space-y-4 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
                        <span className="text-[10px] font-black bg-gold/15 text-gold px-2.5 py-1 rounded-full uppercase">Trang Giới thiệu</span>
                        
                        <div>
                          <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Nhãn phụ (Ví dụ: ĐỘI NGŨ CHUYÊN GIA)</label>
                          <input
                            type="text"
                            value={(settingsForm.data.settings as any).doctors_intro_eyebrow || ""}
                            onChange={(e) => settingsForm.setData("settings", {
                              ...settingsForm.data.settings,
                              doctors_intro_eyebrow: e.target.value
                            })}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded text-sm focus:outline-none"
                            placeholder="Nhập nhãn phụ..."
                          />
                        </div>

                        <div>
                          <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Tiêu đề chính (Ví dụ: Hội Đồng Bác Sĩ Đầu Ngành)</label>
                          <input
                            type="text"
                            value={(settingsForm.data.settings as any).doctors_intro_title || ""}
                            onChange={(e) => settingsForm.setData("settings", {
                              ...settingsForm.data.settings,
                              doctors_intro_title: e.target.value
                            })}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded text-sm focus:outline-none"
                            placeholder="Nhập tiêu đề chính..."
                          />
                        </div>
                      </div>

                      {/* Cấu hình Carousel dùng chung */}
                      <div className="space-y-4">
                        <span className="text-[10px] font-black bg-gold/15 text-gold px-2.5 py-1 rounded-full uppercase">Khối Carousel dùng chung</span>
                        
                        <div>
                          <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Nhãn phụ (Ví dụ: ĐỘI NGŨ BÁC SĨ)</label>
                          <input
                            type="text"
                            value={(settingsForm.data.settings as any).doctors_carousel_eyebrow || ""}
                            onChange={(e) => settingsForm.setData("settings", {
                              ...settingsForm.data.settings,
                              doctors_carousel_eyebrow: e.target.value
                            })}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded text-sm focus:outline-none"
                            placeholder="Nhập nhãn phụ..."
                          />
                        </div>

                        <div>
                          <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Tiêu đề chính (Ví dụ: Đội Ngũ Chuyên Gia Làm Đẹp)</label>
                          <input
                            type="text"
                            value={(settingsForm.data.settings as any).doctors_carousel_title || ""}
                            onChange={(e) => settingsForm.setData("settings", {
                              ...settingsForm.data.settings,
                              doctors_carousel_title: e.target.value
                            })}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded text-sm focus:outline-none"
                            placeholder="Nhập tiêu đề chính..."
                          />
                        </div>
                      </div>

                      {/* Cấu hình Model Carousel (Kiến tạo - Vẻ đẹp độc bản) */}
                      <div className="space-y-4 pt-6 border-t border-gray-100">
                        <span className="text-[10px] font-black bg-gold/15 text-gold px-2.5 py-1 rounded-full uppercase">Khối Model Carousel (Kiến tạo - Vẻ đẹp độc bản)</span>
                        
                        <div>
                          <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Nhãn phụ (Ví dụ: THEQ NAIL CENTRE)</label>
                          <input
                            type="text"
                            value={(settingsForm.data.settings as any).about_carousel_eyebrow || ""}
                            onChange={(e) => settingsForm.setData("settings", {
                              ...settingsForm.data.settings,
                              about_carousel_eyebrow: e.target.value
                            })}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded text-sm focus:outline-none"
                            placeholder="Nhập nhãn phụ..."
                          />
                        </div>

                        <div>
                          <label className="text-xs md:text-sm font-semibold text-gray-600 mb-1.5 block">Tiêu đề chính (Ví dụ: Kiến tạo - Vẻ đẹp độc bản)</label>
                          <input
                            type="text"
                            value={(settingsForm.data.settings as any).about_carousel_title || ""}
                            onChange={(e) => settingsForm.setData("settings", {
                              ...settingsForm.data.settings,
                              about_carousel_title: e.target.value
                            })}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded text-sm focus:outline-none"
                            placeholder="Nhập tiêu đề chính..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NÚT LƯU */}
                  <div className="flex justify-end pt-4 border-t border-gray-150">
                    <button
                      type="submit"
                      disabled={settingsForm.processing}
                      className="px-8 py-3 bg-gold hover:bg-gold-dark text-white font-bold rounded text-sm shadow-md transition-colors disabled:opacity-50"
                    >
                      {settingsForm.processing ? "Đang lưu cấu hình..." : "Lưu Cấu Hình Trang Giới Thiệu"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* POLICIES TAB */}
            {activeTab === "policies" && (
              <div>
                <h3 className="text-lg font-bold font-serif text-gray-800 mb-6">Quản Lý Nội Dung Trang Chính Sách</h3>
                
                {/* Policy Tabs */}
                <div className="flex border-b border-gray-200 mb-6 overflow-x-auto gap-2">
                  {[
                    { key: "dieu-khoan", label: "Điều khoản sử dụng" },
                    { key: "bao-mat", label: "Chính sách bảo mật" },
                    { key: "thanh-toan", label: "Chính sách thanh toán" },
                    { key: "hoan-tien", label: "Chính sách hoàn tiền" },
                    { key: "mien-tru", label: "Miễn trừ trách nhiệm" },
                  ].map((p, idx) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setActivePolicyTab(p.key)}
                      className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                        activePolicyTab === p.key
                          ? "border-gold text-gold"
                          : "border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {idx + 1}. {p.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSaveSettings} className="w-full space-y-8 text-left pb-12">
                  <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-6">
                    {activePolicyTab === "dieu-khoan" && (
                      <div className="space-y-4">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Nội dung Điều khoản sử dụng</label>
                        <RichTextEditor
                          value={settingsForm.data.settings.policy_dieu_khoan_su_dung || ""}
                          onChange={(html) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            policy_dieu_khoan_su_dung: html
                          })}
                          onOpenMediaLibrary={openMediaLibraryForEditor}
                        />
                      </div>
                    )}

                    {activePolicyTab === "bao-mat" && (
                      <div className="space-y-4">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Nội dung Chính sách bảo mật</label>
                        <RichTextEditor
                          value={settingsForm.data.settings.policy_chinh_sach_bao_mat || ""}
                          onChange={(html) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            policy_chinh_sach_bao_mat: html
                          })}
                          onOpenMediaLibrary={openMediaLibraryForEditor}
                        />
                      </div>
                    )}

                    {activePolicyTab === "thanh-toan" && (
                      <div className="space-y-4">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Nội dung Chính sách thanh toán</label>
                        <RichTextEditor
                          value={settingsForm.data.settings.policy_chinh_sach_thanh_toan || ""}
                          onChange={(html) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            policy_chinh_sach_thanh_toan: html
                          })}
                          onOpenMediaLibrary={openMediaLibraryForEditor}
                        />
                      </div>
                    )}

                    {activePolicyTab === "hoan-tien" && (
                      <div className="space-y-4">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Nội dung Chính sách hoàn tiền</label>
                        <RichTextEditor
                          value={settingsForm.data.settings.policy_chinh_sach_hoan_tien || ""}
                          onChange={(html) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            policy_chinh_sach_hoan_tien: html
                          })}
                          onOpenMediaLibrary={openMediaLibraryForEditor}
                        />
                      </div>
                    )}

                    {activePolicyTab === "mien-tru" && (
                      <div className="space-y-4">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Nội dung Tuyên bố miễn trừ trách nhiệm</label>
                        <RichTextEditor
                          value={settingsForm.data.settings.policy_tuyen_bo_mien_tru_trach_nhiem || ""}
                          onChange={(html) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            policy_tuyen_bo_mien_tru_trach_nhiem: html
                          })}
                          onOpenMediaLibrary={openMediaLibraryForEditor}
                        />
                      </div>
                    )}
                  </div>

                  {/* SAVE BUTTON */}
                  <div className="flex justify-end pt-4 border-t border-gray-150">
                    <button
                      type="submit"
                      disabled={settingsForm.processing}
                      className="px-8 py-3 bg-gold hover:bg-gold-dark text-white font-bold rounded text-sm shadow-md transition-colors disabled:opacity-50"
                    >
                      {settingsForm.processing ? "Đang lưu cấu hình..." : "Lưu Thay Đổi Chính Sách"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* AUTHORS TAB */}
            {activeTab === "authors" && (
              <div>
                {/* Mode: List View */}
                {authorViewMode === "list" && (
                  <div>
                    {/* Breadcrumb path */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setActiveTab("overview")}>🏠</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">Tác giả bài viết</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-150/60 mb-6" />

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <button
                        onClick={handleOpenAddAuthor}
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[11px] tracking-wider uppercase px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
                      >
                        Thêm mới
                      </button>

                      {/* Search box matching design */}
                      <div className="relative w-72">
                        <input
                          type="text"
                          placeholder="Tìm kiếm.."
                          value={authorSearchTerm}
                          onChange={(e) => setAuthorSearchTerm(e.target.value)}
                          className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 pr-10 rounded text-xs focus:outline-none placeholder-gray-400 font-light text-gray-700 bg-white shadow-sm"
                        />
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Listing Table matching Design */}
                    {authors.length === 0 ? (
                      <p className="text-gray-400 text-center py-12 font-light">Chưa có tác giả nào.</p>
                    ) : (() => {
                      const filtered = authors.filter(aut =>
                        aut.name.toLowerCase().includes(authorSearchTerm.toLowerCase()) ||
                        (aut.role && aut.role.toLowerCase().includes(authorSearchTerm.toLowerCase()))
                      );

                      if (filtered.length === 0) {
                        return <p className="text-gray-400 text-center py-12 font-light">Không tìm thấy tác giả phù hợp.</p>;
                      }

                      return (
                        <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                          <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                              <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                                <th className="py-4 px-4 w-12 text-center">ID</th>
                                <th className="py-4 px-4 w-24">Ảnh đại diện</th>
                                <th className="py-4 px-4">Tên tác giả</th>
                                <th className="py-4 px-4">Chức vụ / Vai trò</th>
                                <th className="py-4 px-4">Đường dẫn</th>
                                <th className="py-4 px-4 text-right w-24">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                              {filtered.map((aut) => (
                                <tr key={aut.id} className="hover:bg-gray-50/50 transition-colors">
                                  {/* ID */}
                                  <td className="py-4 px-4 text-center font-bold text-gray-400 align-middle">
                                    {aut.id}
                                  </td>

                                  {/* AVATAR */}
                                  <td className="py-4 px-4 align-middle">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-250/70 shadow-inner bg-gray-100 flex items-center justify-center">
                                      {aut.avatar ? (
                                        <img src={aut.avatar} className="object-cover w-full h-full" alt={aut.name} />
                                      ) : (
                                        <div className="text-xs text-gray-400 font-bold uppercase select-none">
                                          {aut.name.split(" ").pop()?.substring(0, 2)}
                                        </div>
                                      )}
                                    </div>
                                  </td>

                                  {/* TÊN */}
                                  <td className="py-4 px-4 align-middle font-bold text-gray-800 text-left">
                                    {aut.name}
                                  </td>

                                  {/* VAI TRÒ */}
                                  <td className="py-4 px-4 align-middle text-gray-500 font-medium">
                                    {aut.role || "Tác giả"}
                                  </td>

                                  {/* SLUG */}
                                  <td className="py-4 px-4 align-middle text-gray-400 font-mono text-[10px]">
                                    /tac-gia/{aut.slug}
                                  </td>

                                  {/* THAO TÁC */}
                                  <td className="py-4 px-4 text-right align-middle">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => handleOpenEditAuthor(aut)}
                                        className="p-1.5 hover:bg-gray-100 rounded text-blue-600 hover:text-blue-700 transition-colors"
                                        title="Chỉnh sửa"
                                      >
                                        Sửa
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteAuthor(aut.id)}
                                        className="p-1.5 hover:bg-red-50 rounded text-red-500 hover:text-red-650 transition-colors font-semibold"
                                        title="Xóa"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Mode: Create/Edit View */}
                {(authorViewMode === "create" || authorViewMode === "edit") && (
                  <div>
                    {/* Header bar matching styles */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-150 mb-6">
                      <div className="flex items-center gap-2 select-none">
                        <span className="text-gray-400 cursor-pointer hover:text-gold" onClick={() => setAuthorViewMode("list")}>Tác giả bài viết</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-600">{authorViewMode === "create" ? "Thêm Tác Giả" : "Chỉnh Sửa Tác Giả"}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAuthorViewMode("list")}
                        className="text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors border border-gray-200 px-3.5 py-1.5 rounded-lg bg-white"
                      >
                        Quay lại danh sách
                      </button>
                    </div>

                    <form onSubmit={handleSaveAuthor} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left pb-16">
                      {/* Left side inputs - 8 cols */}
                      <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-5">
                          {/* Name */}
                          <div className="space-y-1.5">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Tên tác giả *</label>
                            <input
                              type="text"
                              required
                              value={authorForm.data.name}
                              onChange={(e) => authorForm.setData("name", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-800 bg-white"
                              placeholder="Nhập họ và tên tác giả"
                            />
                          </div>

                          {/* Role */}
                          <div className="space-y-1.5">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Chức danh / Vai trò</label>
                            <input
                              type="text"
                              value={authorForm.data.role}
                              onChange={(e) => authorForm.setData("role", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-750 bg-white"
                              placeholder="Ví dụ: Bác sĩ CKI Da liễu, Chuyên gia thẩm mỹ..."
                            />
                          </div>

                          {/* Bio */}
                          <div className="space-y-1.5">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Tóm tắt tiểu sử</label>
                            <textarea
                              rows={3}
                              value={authorForm.data.bio}
                              onChange={(e) => authorForm.setData("bio", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-655 bg-white resize-none"
                              placeholder="Nhập thông tin giới thiệu tóm tắt..."
                            />
                          </div>

                          {/* Description */}
                          <div className="space-y-1.5">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Nội dung giới thiệu chi tiết (Markdown/HTML)</label>
                            <RichTextEditor
                              value={authorForm.data.description || ""}
                              onChange={(html) => authorForm.setData("description", html)}
                              placeholder="Giới thiệu chi tiết chuyên môn, quá trình học tập và làm việc của tác giả..."
                              minHeight="280px"
                              onOpenMediaLibrary={openMediaLibraryForEditor}
                            />
                          </div>
                        </div>

                        {/* SEO Fields Accordion */}
                        <div className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm">
                          <button
                            type="button"
                            onClick={() => setAdvancedAuthorOpen(!advancedAuthorOpen)}
                            className="w-full flex items-center justify-between px-5 py-4 bg-gray-50/50 hover:bg-gray-50 border-b border-gray-150 text-left transition-colors"
                          >
                            <span className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 select-none">
                              {advancedAuthorOpen ? "▼" : "▶"} Cấu hình SEO & Nâng cao
                            </span>
                          </button>
                          
                          {advancedAuthorOpen && (
                            <div className="p-5 space-y-4 bg-gray-50/25 border-t border-gray-100 transition-all">
                              {/* Slug */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Custom Slug</label>
                                <input
                                  type="text"
                                  value={authorForm.data.slug}
                                  onChange={(e) => authorForm.setData("slug", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Đường dẫn tùy chỉnh (mặc định tạo từ tên)"
                                />
                              </div>

                              {/* Meta Title */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Title</label>
                                <input
                                  type="text"
                                  value={authorForm.data.meta_title}
                                  onChange={(e) => authorForm.setData("meta_title", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Nhập tiêu đề SEO..."
                                />
                              </div>

                              {/* Meta Description */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Description</label>
                                <textarea
                                  rows={3}
                                  value={authorForm.data.meta_description}
                                  onChange={(e) => authorForm.setData("meta_description", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-650 bg-white resize-none"
                                  placeholder="Nhập thẻ mô tả SEO..."
                                />
                              </div>

                              {/* Meta Keywords */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Keywords</label>
                                <input
                                  type="text"
                                  value={authorForm.data.meta_keywords}
                                  onChange={(e) => authorForm.setData("meta_keywords", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="Từ khóa SEO (phẫu thuật thẩm mỹ, cấy tóc...)"
                                />
                              </div>

                              {/* Meta Robots */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Robots</label>
                                <input
                                  type="text"
                                  value={authorForm.data.meta_robots}
                                  onChange={(e) => authorForm.setData("meta_robots", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="index, follow"
                                />
                              </div>

                              {/* Canonical Link */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Canonical Link</label>
                                <input
                                  type="text"
                                  value={authorForm.data.canonical_link}
                                  onChange={(e) => authorForm.setData("canonical_link", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="https://theq.vn/..."
                                />
                              </div>

                              {/* Meta Image */}
                              <div className="space-y-1.5">
                                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Image</label>
                                <input
                                  type="text"
                                  value={authorForm.data.meta_image}
                                  onChange={(e) => authorForm.setData("meta_image", e.target.value)}
                                  className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                                  placeholder="URL hình ảnh SEO..."
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right side panel - 4 cols */}
                      <div className="lg:col-span-4 space-y-6">
                        {/* Profile avatar box */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 block">Ảnh Đại Diện</label>


                          <div className="relative w-36 h-36 mx-auto mb-4">
                            {/* The Clickable Circle */}
                            <div
                              onClick={() => {
                                setOnMediaSelect(() => (path: string) => {
                                  authorForm.setData(data => ({
                                    ...data,
                                    avatar: path,
                                    avatar_file: null
                                  }));
                                });
                                setMediaSelectorOpen(true);
                              }}
                              className="w-full h-full rounded-full overflow-hidden border-2 border-dashed border-gray-200 hover:border-gold/60 bg-gray-50 flex items-center justify-center group cursor-pointer transition-colors relative shadow-sm"
                            >
                              {authorForm.data.avatar_file ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={URL.createObjectURL(authorForm.data.avatar_file)}
                                    className="object-cover w-full h-full"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                </div>
                              ) : authorForm.data.avatar ? (
                                <div className="absolute inset-0 w-full h-full">
                                  <img
                                    src={authorForm.data.avatar}
                                    className="object-cover w-full h-full"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded">Thay đổi ảnh</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center p-4 flex flex-col items-center justify-center">
                                  <svg className="w-10 h-10 text-gray-350 mb-1 group-hover:text-gold/60 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                  </svg>
                                  <p className="text-[10px] text-gray-400 group-hover:text-gold font-bold uppercase tracking-wider mt-0.5">Chọn ảnh</p>
                                </div>
                              )}
                            </div>

                            {/* Floating Close Button outside the clipped circle */}
                            {(authorForm.data.avatar_file || authorForm.data.avatar) && (
                              <button
                                type="button"
                                onClick={() => {
                                  authorForm.setData(data => ({
                                    ...data,
                                    avatar_file: null,
                                    avatar: ""
                                  }));
                                }}
                                className="absolute top-0 right-0 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md border-2 border-white transition-colors z-20 cursor-pointer w-6 h-6 flex items-center justify-center font-bold text-xs"
                                title="Xóa hình ảnh"
                              >
                                ×
                              </button>
                            )}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100/60">
                            <label className="text-[10px] font-bold text-gray-450 uppercase tracking-wider mb-2 block text-center">Hoặc tải tệp lên từ thiết bị</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => authorForm.setData("avatar_file", e.target.files?.[0] || null)}
                              className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-xl file:border file:border-gray-250/60 file:text-[10px] file:font-bold file:uppercase file:bg-gray-55 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Save card */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-3">
                          <button
                            type="submit"
                            disabled={authorForm.processing}
                            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg shadow-sm transition-all disabled:opacity-50"
                          >
                            {authorForm.processing ? "Đang lưu..." : "Lưu cấu hình tác giả"}
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setAuthorViewMode("list")}
                            className="w-full border border-gray-200 hover:bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors"
                          >
                            Hủy bỏ
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <div>
                {/* Breadcrumb path */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 font-semibold select-none text-left">
                  <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setActiveTab("overview")}>🏠</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-600">Đánh giá dịch vụ</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-150/60 mb-6" />

                <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm text-left">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-4">Quản lý nhận xét & Đánh giá dịch vụ</h3>
                  
                  {service_reviews.length === 0 ? (
                    <p className="text-gray-450 font-light text-center py-12">Chưa có đánh giá nào từ khách hàng.</p>
                  ) : (
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                      <table className="w-full text-left border-collapse min-w-[850px]">
                        <thead>
                          <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                            <th className="py-4 px-4 w-40">Dịch vụ</th>
                            <th className="py-4 px-4 w-40">Khách hàng</th>
                            <th className="py-4 px-4 w-28">Điểm đánh giá</th>
                            <th className="py-4 px-4">Nhận xét chi tiết</th>
                            <th className="py-4 px-4 w-28 text-center">Trạng thái</th>
                            <th className="py-4 px-4 text-right w-36">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                          {service_reviews.map((rev) => (
                            <tr key={rev.id} className="hover:bg-gray-50/50 transition-colors">
                              {/* SERVICE NAME */}
                              <td className="py-4 px-4 font-semibold text-gray-800 align-middle">
                                {rev.service?.name || `Dịch vụ #${rev.service_id}`}
                              </td>

                              {/* CLIENT NAME */}
                              <td className="py-4 px-4 align-middle">
                                <div className="font-bold text-gray-800">{rev.name}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5">{rev.created_at ? new Date(rev.created_at).toLocaleDateString("vi-VN") : ""}</div>
                              </td>

                              {/* RATING */}
                              <td className="py-4 px-4 align-middle">
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-3.5 h-3.5 ${i < rev.rating ? "text-yellow-400 fill-current" : "text-gray-200"}`}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </td>

                              {/* COMMENT */}
                              <td className="py-4 px-4 align-middle text-gray-550 leading-relaxed font-light">
                                {rev.comment || <em className="text-gray-300">Không có bình luận</em>}
                              </td>

                              {/* STATUS */}
                              <td className="py-4 px-4 text-center align-middle">
                                {rev.is_approved ? (
                                  <span className="bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded border border-green-200 uppercase tracking-wider">
                                    Đã hiển thị
                                  </span>
                                ) : (
                                  <span className="bg-amber-50 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
                                    Chờ duyệt
                                  </span>
                                )}
                              </td>

                              {/* ACTIONS */}
                              <td className="py-4 px-4 text-right align-middle">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleReviewApproval(rev.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                                      rev.is_approved
                                        ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                        : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                                  >
                                    {rev.is_approved ? "Ẩn đi" : "Duyệt hiển thị"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteReview(rev.id)}
                                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                                    title="Xóa đánh giá"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}


          </div>
        </main>
      </div>

      {/* BANNER MODAL */}
      {bannerModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-start justify-center z-50 p-4 md:p-6 overflow-y-auto transition-opacity duration-300 pt-8 md:pt-16 pb-8">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 md:p-8 shadow-2xl relative text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
              <h3 className="text-lg font-bold font-serif text-gray-800">
                {editingBanner ? "Chỉnh sửa slide banner" : "Thêm slide banner mới"}
              </h3>
              <button
                type="button"
                onClick={() => setBannerModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer bg-transparent border-0"
              >
                <X size={20} />
              </button>
            </div>

             <form onSubmit={handleSaveBanner} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="min-w-0">
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Nhãn phụ (Eyebrow)</label>
                  <input
                    type="text"
                    value={bannerForm.data.eyebrow}
                    onChange={(e) => bannerForm.setData("eyebrow", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                    placeholder="Ví dụ: Theq Nail Centre"
                  />
                </div>
                <div className="min-w-0">
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Tiêu đề chính (Title)</label>
                  <input
                    type="text"
                    value={bannerForm.data.title}
                    onChange={(e) => bannerForm.setData("title", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                    placeholder="Ví dụ: Kiến tạo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="min-w-0">
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Tiêu đề phụ (Subtitle)</label>
                  <input
                    type="text"
                    value={bannerForm.data.subtitle}
                    onChange={(e) => bannerForm.setData("subtitle", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                    placeholder="Ví dụ: Vẻ đẹp độc bản"
                  />
                </div>
                <div className="min-w-0">
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Mô tả (Subheading)</label>
                  <input
                    type="text"
                    value={bannerForm.data.description}
                    onChange={(e) => bannerForm.setData("description", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                    placeholder="Nhập mô tả tóm tắt"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Desktop Image */}
                <div className="min-w-0">
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-2 block">
                    Ảnh PC (Desktop Image) <span className="text-red-500">*</span>
                  </label>
                  <div
                    onClick={() => {
                      setOnMediaSelect(() => (path: string) => {
                        bannerForm.setData("image_desktop", path);
                      });
                      setMediaSelectorOpen(true);
                    }}
                    className="w-full border-2 border-dashed border-gray-250 rounded-2xl p-4 bg-gray-50/5 flex flex-col items-center justify-center min-h-[160px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 shadow-sm"
                  >
                    {bannerForm.data.image_desktop ? (
                      <div className="absolute inset-0 w-full h-full animate-fade-in">
                        <img
                          src={bannerForm.data.image_desktop}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          alt="Desktop Banner"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                          <span className="text-xs text-white font-bold bg-black/60 px-4 py-2 rounded-xl backdrop-blur-sm">
                            Thay đổi hình ảnh
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center gap-2">
                        <div className="p-3 bg-white rounded-full shadow-sm text-gray-400 group-hover:text-gold transition-colors duration-300">
                          <ImageIcon size={24} className="stroke-1.5" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 mt-1">Chọn ảnh từ thư viện tệp</span>
                        <span className="text-[10px] text-gray-400 font-light">Tỷ lệ khuyên dùng 16:9</span>
                      </div>
                    )}
                  </div>
                  {bannerForm.data.image_desktop && (
                    <div className="mt-2 flex justify-between items-center text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 w-full min-w-0">
                      <span className="truncate max-w-[80%] font-light">{bannerForm.data.image_desktop}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          bannerForm.setData("image_desktop", "");
                        }}
                        className="text-red-500 hover:text-red-700 font-bold bg-transparent border-0 cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Image */}
                <div className="min-w-0">
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-2 block">
                    Ảnh Mobile (Tùy chọn)
                  </label>
                  <div
                    onClick={() => {
                      setOnMediaSelect(() => (path: string) => {
                        bannerForm.setData("image_mobile", path);
                      });
                      setMediaSelectorOpen(true);
                    }}
                    className="w-full border-2 border-dashed border-gray-250 rounded-2xl p-4 bg-gray-50/5 flex flex-col items-center justify-center min-h-[160px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 shadow-sm"
                  >
                    {bannerForm.data.image_mobile ? (
                      <div className="absolute inset-0 w-full h-full animate-fade-in">
                        <img
                          src={bannerForm.data.image_mobile}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          alt="Mobile Banner"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                          <span className="text-xs text-white font-bold bg-black/60 px-4 py-2 rounded-xl backdrop-blur-sm">
                            Thay đổi hình ảnh
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center gap-2">
                        <div className="p-3 bg-white rounded-full shadow-sm text-gray-400 group-hover:text-gold transition-colors duration-300">
                          <ImageIcon size={24} className="stroke-1.5" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 mt-1">Chọn ảnh từ thư viện tệp</span>
                        <span className="text-[10px] text-gray-400 font-light">Tỷ lệ khuyên dùng 4:5 hoặc 9:16</span>
                      </div>
                    )}
                  </div>
                  {bannerForm.data.image_mobile && (
                    <div className="mt-2 flex justify-between items-center text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 w-full min-w-0">
                      <span className="truncate max-w-[80%] font-light">{bannerForm.data.image_mobile}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          bannerForm.setData("image_mobile", "");
                        }}
                        className="text-red-500 hover:text-red-700 font-bold bg-transparent border-0 cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5 mt-5">
                <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-4">Nút liên kết chính (Primary CTA)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="min-w-0">
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Chữ hiển thị</label>
                    <input
                      type="text"
                      value={bannerForm.data.button_primary_text}
                      onChange={(e) => bannerForm.setData("button_primary_text", e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none"
                      placeholder="Đăng Ký Tư Vấn"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đường dẫn liên kết</label>
                    <input
                      type="text"
                      value={bannerForm.data.button_primary_url}
                      onChange={(e) => bannerForm.setData("button_primary_url", e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none"
                      placeholder="#consult"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5 mt-5">
                <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-4">Nút liên kết phụ (Secondary CTA)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="min-w-0">
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Chữ hiển thị</label>
                    <input
                      type="text"
                      value={bannerForm.data.button_secondary_text}
                      onChange={(e) => bannerForm.setData("button_secondary_text", e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none"
                      placeholder="Tìm Hiểu Dịch Vụ"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đường dẫn liên kết</label>
                    <input
                      type="text"
                      value={bannerForm.data.button_secondary_url}
                      onChange={(e) => bannerForm.setData("button_secondary_url", e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none"
                      placeholder="#services"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-5 mt-5 w-full">
                <div className="min-w-0">
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Thứ tự hiển thị (Order)</label>
                  <input
                    type="number"
                    value={bannerForm.data.order}
                    onChange={(e) => bannerForm.setData("order", parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div className="min-w-0">
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Hiển thị ngay</label>
                  <select
                    value={bannerForm.data.is_active}
                    onChange={(e) => bannerForm.setData("is_active", parseInt(e.target.value))}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded-xl text-sm focus:outline-none text-gray-600"
                  >
                    <option value={1}>Kích hoạt</option>
                    <option value={0}>Tạm ẩn</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setBannerModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-250 text-gray-500 hover:bg-gray-50 rounded-xl text-sm font-semibold transition-all duration-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={bannerForm.processing}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white font-bold rounded-xl text-sm shadow-md transition-all duration-200 disabled:opacity-50"
                >
                  {bannerForm.processing ? "Đang xử lý..." : "Lưu lại"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* DOCTOR MODAL */}
      {doctorModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 md:p-6 overflow-y-auto pt-8 md:pt-16 pb-8">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-xl relative text-left">
            <button
              onClick={() => setDoctorModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold font-serif text-gray-800 mb-6">
              {editingDoctor ? "Chỉnh sửa thông tin bác sĩ" : "Thêm bác sĩ mới"}
            </h3>

            <form onSubmit={handleSaveDoctor} className="space-y-4">
              <div>
                <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Họ và tên bác sĩ *</label>
                <input
                  type="text"
                  required
                  value={doctorForm.data.name}
                  onChange={(e) => doctorForm.setData("name", e.target.value)}
                  className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                  placeholder="Ví dụ: Bs. CKI Ngọc Nữ"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Chức danh / Học hàm / Học vị *</label>
                <input
                  type="text"
                  required
                  value={doctorForm.data.role}
                  onChange={(e) => doctorForm.setData("role", e.target.value)}
                  className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                  placeholder="Ví dụ: Bác Sĩ CKI Da Liễu Thẩm Mỹ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Ảnh chân dung *</label>
                  <input
                    type="file"
                    accept="image/*"
                    required={!editingDoctor}
                    onChange={(e) => doctorForm.setData("image_file", e.target.files?.[0] || null)}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Thứ tự sắp xếp</label>
                  <input
                    type="number"
                    value={doctorForm.data.order}
                    onChange={(e) => doctorForm.setData("order", parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Tiểu sử & Kinh nghiệm chuyên môn *</label>
                <textarea
                  rows={4}
                  required
                  value={doctorForm.data.bio}
                  onChange={(e) => doctorForm.setData("bio", e.target.value)}
                  className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm focus:outline-none resize-none"
                  placeholder="Nhập thông tin giới thiệu chi tiết về bác sĩ..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setDoctorModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded text-sm transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={doctorForm.processing}
                  className="px-5 py-2 bg-gold hover:bg-gold-dark text-white font-bold rounded text-sm shadow-sm transition-colors disabled:opacity-50"
                >
                  {doctorForm.processing ? "Đang xử lý..." : "Lưu lại"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ MODAL */}
      {faqModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 md:p-6 overflow-y-auto pt-8 md:pt-16 pb-8">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-xl relative text-left">
            <button
              onClick={() => setFaqModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold font-serif text-gray-800 mb-6">
              {editingFaq ? "Chỉnh sửa câu hỏi FAQ" : "Thêm câu hỏi FAQ mới"}
            </h3>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Câu hỏi *</label>
                <input
                  type="text"
                  required
                  value={faqForm.data.question}
                  onChange={(e) => faqForm.setData("question", e.target.value)}
                  className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                  placeholder="Nhập nội dung câu hỏi..."
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Thứ tự hiển thị (Order)</label>
                <input
                  type="number"
                  value={faqForm.data.order}
                  onChange={(e) => faqForm.setData("order", parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Câu trả lời giải đáp *</label>
                <textarea
                  rows={5}
                  required
                  value={faqForm.data.answer}
                  onChange={(e) => faqForm.setData("answer", e.target.value)}
                  className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm focus:outline-none resize-none"
                  placeholder="Nhập nội dung câu trả lời giải đáp thắc mắc..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-105">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded text-sm transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={faqForm.processing}
                  className="px-5 py-2 bg-gold hover:bg-gold-dark text-white font-bold rounded text-sm shadow-sm transition-colors disabled:opacity-50"
                >
                  {faqForm.processing ? "Đang xử lý..." : "Lưu lại"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GLOBAL MEDIA SELECTOR MODAL */}
      {mediaSelectorOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-[99] p-4 md:p-6 overflow-y-auto pt-8 md:pt-16 pb-8" onClick={() => setMediaSelectorOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[85vh] flex flex-col text-left" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-4 border-b border-gray-150 mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-800">Thư Viện Hình Ảnh</h3>
                <p className="text-xs text-gray-400 mt-0.5">Chọn một hình ảnh từ thư viện hoặc tải lên hình ảnh mới.</p>
              </div>
              <button onClick={() => setMediaSelectorOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Split Layout inside Selector Modal */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow overflow-hidden min-h-[380px]">
              {/* Left Tree Pane */}
              <div className="md:col-span-3 border border-gray-150 rounded-xl p-3 bg-gray-50/10 overflow-y-auto max-h-[400px]">
                <FolderTree
                  folders={allMediaFolders}
                  currentFolderId={currentFolderId}
                  onSelectFolder={(id) => fetchMedia(id)}
                />
              </div>

              {/* Right Content Grid Pane */}
              <div className="md:col-span-9 flex flex-col overflow-hidden">
                {/* Folder Navigation */}
                <div className="flex justify-between items-center gap-4 mb-3 select-none">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-150 px-3 py-1.5 rounded-lg flex-grow overflow-x-auto">
                    <span className="font-semibold cursor-pointer hover:text-gold" onClick={() => fetchMedia(null)}>
                      Root
                    </span>
                    {mediaBreadcrumbs.map((crumb) => (
                      <React.Fragment key={crumb.id}>
                        <span className="text-gray-400">/</span>
                        <span className="font-semibold cursor-pointer hover:text-gold" onClick={() => fetchMedia(crumb.id)}>
                          {crumb.name}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                    <input
                      type="file"
                      onChange={handleUploadMediaFile}
                      accept="image/*"
                      id="selector-media-upload"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={mediaUploadLoading}
                      onClick={() => document.getElementById("selector-media-upload")?.click()}
                      className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    >
                      {mediaUploadLoading ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ImageIcon size={12} />
                      )}
                      <span>TẢI ẢNH MỚI</span>
                    </button>
                  </div>
                </div>

                {/* Grid of Folders and Files */}
                <div 
                  onDragOver={handleMediaDragOver}
                  onDragEnter={handleMediaDragEnter}
                  onDragLeave={handleMediaDragLeave}
                  onDrop={handleMediaDrop}
                  className="flex-grow overflow-y-auto border border-gray-150 rounded-xl p-4 bg-gray-50/20 max-h-[350px] relative"
                >
                  {isMediaDragging && (
                    <div className="absolute inset-0 bg-orange-50/60 border-2 border-dashed border-[#f97316] rounded-xl z-50 flex flex-col items-center justify-center pointer-events-none animate-pulse">
                      <div className="bg-white px-4 py-3 rounded-lg shadow-md border border-orange-100 flex flex-col items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-[#f97316] animate-bounce">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">Thả để tải lên ảnh</span>
                      </div>
                    </div>
                  )}                  {mediaLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-400">Đang tải...</span>
                    </div>
                  ) : mediaFolders.length === 0 && mediaFiles.length === 0 ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center gap-2">
                      <ImageIcon size={32} className="text-gray-300 stroke-1" />
                      <span className="text-xs font-semibold text-gray-400">Thư mục trống</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {/* Folders in Right Grid */}
                      {mediaFolders.map((folder) => (
                        <div
                          key={folder.id}
                          className="border border-gray-200 hover:border-gold/40 rounded-lg p-2 bg-white hover:bg-gold/5 transition-all cursor-pointer flex flex-col items-center text-center justify-center"
                          onClick={() => fetchMedia(folder.id)}
                        >
                          <div className="w-8 h-8 text-yellow-500 mb-1 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                              <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-1.5V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v1.5H4.5A3 3 0 0 0 1.5 13.5V18a3 3 0 0 0 3 3h15ZM6 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5H6V9Zm-3 4.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.5Z" />
                            </svg>
                          </div>
                          <span className="text-[10px] font-semibold text-gray-700 truncate w-full px-1">{folder.name}</span>
                        </div>
                      ))}

                      {/* Files Grid */}
                      {mediaFiles.map((file) => (
                        <div
                          key={file.id}
                          className="group relative border border-gray-200 hover:border-gold/80 rounded-lg overflow-hidden bg-white hover:shadow-md transition-all flex flex-col cursor-pointer"
                          onClick={() => {
                            if (onMediaSelect) {
                              onMediaSelect(file.path);
                            }
                            setMediaSelectorOpen(false);
                          }}
                        >
                          {/* Action buttons inside card */}
                          <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(window.location.origin + file.path);
                                alert("Đã sao chép đường dẫn hình ảnh!");
                              }}
                              className="p-1 text-gray-750 hover:text-gold rounded bg-white/95 shadow-sm border-0 cursor-pointer animate-fade-in"
                              title="Sao chép link"
                            >
                              <LinkIcon size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteMediaFile(file.id);
                              }}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded bg-white/95 shadow-sm border border-red-150 cursor-pointer animate-fade-in"
                              title="Xóa tệp"
                            >
                              <Trash size={14} />
                            </button>
                          </div>

                          <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
                            <img
                              src={file.path}
                              alt={file.name}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="p-1.5 text-center">
                            <p className="text-[9px] font-semibold text-gray-700 truncate" title={file.name}>
                              {file.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-150 mt-4">
              <button
                type="button"
                onClick={() => setMediaSelectorOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Tạo Lịch Hẹn Mới */}
      {showCreateBookingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setShowCreateBookingModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
              <h3 className="text-base font-bold text-gray-800 font-serif flex items-center gap-2">
                <Calendar size={18} className="text-gold" />
                Tạo Lịch Hẹn Mới
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={manualBookingForm.data.name}
                    onChange={(e) => manualBookingForm.setData("name", e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={manualBookingForm.data.phone}
                    onChange={(e) => manualBookingForm.setData("phone", e.target.value)}
                    placeholder="0912345678"
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Email</label>
                  <input
                    type="email"
                    value={manualBookingForm.data.email}
                    onChange={(e) => manualBookingForm.setData("email", e.target.value)}
                    placeholder="khachhang@gmail.com"
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm"
                  />
                </div>

                {/* Branch */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Cơ sở điều trị</label>
                  <select
                    value={manualBookingForm.data.branch}
                    onChange={(e) => manualBookingForm.setData("branch", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="">-- Chọn cơ sở --</option>
                    <option value="Theq - Sài Gòn">Theq - Sài Gòn</option>
                    <option value="Theq - Hà Nội">Theq - Hà Nội</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Service */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Dịch vụ</label>
                  <select
                    value={manualBookingForm.data.service || ""}
                    onChange={(e) => manualBookingForm.setData("service", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.name}>{srv.name}</option>
                    ))}
                  </select>
                </div>

                {/* Doctor */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Bác sĩ chỉ định</label>
                  <select
                    value={manualBookingForm.data.doctor_id}
                    onChange={(e) => manualBookingForm.setData("doctor_id", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="">-- Chọn bác sĩ --</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Booking Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Ngày hẹn *</label>
                  <input
                    type="date"
                    required
                    value={manualBookingForm.data.booking_date}
                    onChange={(e) => manualBookingForm.setData("booking_date", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  />
                </div>

                {/* Booking Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Khung giờ hẹn *</label>
                  <select
                    required
                    value={manualBookingForm.data.booking_time}
                    onChange={(e) => manualBookingForm.setData("booking_time", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="">-- Chọn khung giờ --</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Warnings check */}
              {(() => {
                const { hasShift, isConflicting } = getDoctorShiftAndConflictStatus(
                  manualBookingForm.data.doctor_id,
                  manualBookingForm.data.booking_date,
                  manualBookingForm.data.booking_time
                );
                if (!hasShift || isConflicting) {
                  return (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3 space-y-1 text-left select-none">
                      {!hasShift && (
                        <div className="text-[10.5px] text-red-600 font-bold flex items-center gap-1.5">
                          <span>⚠️ Bác sĩ không có ca trực vào thứ này tại chi nhánh đã chọn!</span>
                        </div>
                      )}
                      {isConflicting && (
                        <div className="text-[10.5px] text-red-650 font-bold flex items-center gap-1.5">
                          <span>⚠️ Bác sĩ đã có lịch hẹn khác vào khung giờ này!</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })()}

              {/* Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Ghi chú thêm</label>
                <textarea
                  value={manualBookingForm.data.note}
                  onChange={(e) => manualBookingForm.setData("note", e.target.value)}
                  placeholder="Yêu cầu đặc biệt của khách hàng..."
                  rows={3}
                  className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateBookingModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={manualBookingForm.processing}
                  className="px-5 py-2 text-xs font-black bg-gold text-white rounded-xl hover:bg-gold/90 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  Tạo lịch hẹn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Chỉnh Sửa Lịch Hẹn */}
      {showEditBookingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setShowEditBookingModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
              <h3 className="text-base font-bold text-gray-800 font-serif flex items-center gap-2">
                <Edit size={18} className="text-gold" />
                Chỉnh Sửa Lịch Hẹn
              </h3>
              <button
                type="button"
                onClick={() => setShowEditBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 bg-gray-55 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleEditBooking} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={editBookingForm.data.name}
                    onChange={(e) => editBookingForm.setData("name", e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={editBookingForm.data.phone}
                    onChange={(e) => editBookingForm.setData("phone", e.target.value)}
                    placeholder="0912345678"
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editBookingForm.data.email}
                    onChange={(e) => editBookingForm.setData("email", e.target.value)}
                    placeholder="khachhang@gmail.com"
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm"
                  />
                </div>

                {/* Branch */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Cơ sở điều trị</label>
                  <select
                    value={editBookingForm.data.branch}
                    onChange={(e) => editBookingForm.setData("branch", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="">-- Chọn cơ sở --</option>
                    <option value="Theq - Sài Gòn">Theq - Sài Gòn</option>
                    <option value="Theq - Hà Nội">Theq - Hà Nội</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Service */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Dịch vụ</label>
                  <select
                    value={editBookingForm.data.service || ""}
                    onChange={(e) => editBookingForm.setData("service", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.name}>{srv.name}</option>
                    ))}
                  </select>
                </div>

                {/* Doctor */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Bác sĩ chỉ định</label>
                  <select
                    value={editBookingForm.data.doctor_id}
                    onChange={(e) => editBookingForm.setData("doctor_id", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="">-- Chọn bác sĩ --</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Booking Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Ngày hẹn *</label>
                  <input
                    type="date"
                    required
                    value={editBookingForm.data.booking_date}
                    onChange={(e) => editBookingForm.setData("booking_date", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  />
                </div>

                {/* Booking Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Khung giờ hẹn *</label>
                  <select
                    required
                    value={editBookingForm.data.booking_time}
                    onChange={(e) => editBookingForm.setData("booking_time", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="">-- Chọn khung giờ --</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Trạng thái lịch hẹn</label>
                <select
                  value={editBookingForm.data.status}
                  onChange={(e) => editBookingForm.setData("status", e.target.value)}
                  className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm cursor-pointer"
                >
                  <option value="Chờ liên hệ">Chờ liên hệ</option>
                  <option value="Đã liên hệ">Đã xác nhận</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>

              {/* Warnings check */}
              {(() => {
                const { hasShift, isConflicting } = getDoctorShiftAndConflictStatus(
                  editBookingForm.data.doctor_id,
                  editBookingForm.data.booking_date,
                  editBookingForm.data.booking_time,
                  editBookingForm.data.id
                );
                if (!hasShift || isConflicting) {
                  return (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3 space-y-1 text-left select-none">
                      {!hasShift && (
                        <div className="text-[10.5px] text-red-650 font-bold flex items-center gap-1.5">
                          <span>⚠️ Bác sĩ không có ca trực vào thứ này tại chi nhánh đã chọn!</span>
                        </div>
                      )}
                      {isConflicting && (
                        <div className="text-[10.5px] text-red-650 font-bold flex items-center gap-1.5">
                          <span>⚠️ Bác sĩ đã có lịch hẹn khác vào khung giờ này!</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })()}

              {/* Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Ghi chú thêm</label>
                <textarea
                  value={editBookingForm.data.note}
                  onChange={(e) => editBookingForm.setData("note", e.target.value)}
                  placeholder="Yêu cầu đặc biệt của khách hàng..."
                  rows={3}
                  className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-gray-700 bg-white shadow-sm resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditBookingModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={editBookingForm.processing}
                  className="px-5 py-2 text-xs font-black bg-gold text-white rounded-xl hover:bg-gold/90 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
