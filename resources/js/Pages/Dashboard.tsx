import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, usePage, Link } from "@inertiajs/react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Plus,
  Trash,
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
}

interface Article {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image: string | null;
  author: string | null;
  published_date: string | null;
  category: string;
  is_highlight?: boolean | number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_robots?: string;
  canonical_link?: string;
  meta_image?: string;
}

interface Service {
  id: number;
  name: string;
  category: string;
  price: string | null;
  description: string | null;
  image: string | null;
  banner_image?: string;
  is_highlight?: boolean | number;
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
}

interface DashboardProps {
  submissions: Submission[];
  articles: Article[];
  services: Service[];
  banners: Banner[];
  doctors: Doctor[];
  faqs: Faq[];
  realResults: RealResult[];
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
  
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  
  const savedRange = useRef<Range | null>(null);

  // Sync value → editor only on initial mount / external reset (not on every keystroke)
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, []); // intentionally only on mount

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
      // target blank all new links
      editorRef.current?.querySelectorAll("a:not([target])").forEach(a => a.setAttribute("target", "_blank"));
      handleInput();
    }
    setShowLinkModal(false);
  };

  const insertImage = (url: string) => {
    const el = editorRef.current;
    if (!el) return;

    el.focus();

    // Try to restore selection
    const sel = window.getSelection();
    if (savedRange.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }

    // Create the image element
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Hình ảnh";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.borderRadius = "8px";
    img.style.margin = "8px 0";
    img.style.display = "block";

    let inserted = false;
    if (sel && sel.rangeCount > 0) {
      try {
        const range = sel.getRangeAt(0);
        // Ensure the range is inside our editor
        if (el.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(img);
          
          // Place cursor after image
          const newRange = document.createRange();
          newRange.setStartAfter(img);
          newRange.setEndAfter(img);
          sel.removeAllRanges();
          sel.addRange(newRange);
          savedRange.current = newRange.cloneRange();
          inserted = true;
        }
      } catch (e) {
        console.warn("Failed to insert node at range, falling back to append:", e);
      }
    }

    if (!inserted) {
      // Fallback: append to the end of the editor
      el.appendChild(img);
      
      // Place cursor at the end
      try {
        const newRange = document.createRange();
        newRange.selectNodeContents(el);
        newRange.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(newRange);
        savedRange.current = newRange.cloneRange();
      } catch (e) {
        console.warn("Failed to set cursor at the end:", e);
      }
    }

    handleInput();
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
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-gold transition-colors bg-white shadow-sm flex flex-col">
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
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("undo"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Hoàn tác">
          <Undo size={14} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); exec("redo"); }}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Làm lại">
          <Redo size={14} />
        </button>
      </div>

      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        className="w-full p-4 text-sm focus:outline-none leading-relaxed text-gray-700 bg-white prose prose-sm max-w-none"
        style={{ minHeight, maxHeight: "450px", overflowY: "auto" }}
        data-placeholder={placeholder}
      />

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

// ────────────────────────────────────────────────────────────────────────────────

export default function Dashboard({
  submissions = [],
  articles = [],
  services = [],
  banners = [],
  doctors = [],
  faqs = [],
  realResults = [],
  analytics,
}: DashboardProps) {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};
  const user = (props.auth as any).user;

  const [activeTab, setActiveTab] = useState<
    "overview" | "submissions" | "articles" | "services" | "banners" | "doctors" | "faqs" | "settings" | "realResults" | "media" | "configs" | "intro"
  >("overview");

  // Search States
  const [articleSearchTerm, setArticleSearchTerm] = useState("");
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [doctorSearchTerm, setDoctorSearchTerm] = useState("");
  const [faqSearchTerm, setFaqSearchTerm] = useState("");
  const [realResultSearchTerm, setRealResultSearchTerm] = useState("");

  // Modal States
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleViewMode, setArticleViewMode] = useState<"list" | "edit" | "create">("list");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceViewMode, setServiceViewMode] = useState<"list" | "edit" | "create">("list");
  const [advancedServiceOpen, setAdvancedServiceOpen] = useState(false);

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
    author: "",
    published_date: "",
    category: "Chuyên môn",
    image_file: null as File | null,
    image: "",
    is_highlight: 0 as number,
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_robots: "",
    canonical_link: "",
    meta_image: "",
  });

  const serviceForm = useForm({
    name: "",
    category: "Phẫu thuật thẩm mỹ",
    price: "Liên hệ",
    description: "",
    image_file: null as File | null,
    image: "",
    banner_image: "",
    is_highlight: 0 as number,
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
      site_email: settings.site_email || "info@ktbeauty.vn",
      site_address: settings.site_address || "",
      facebook_url: settings.facebook_url || "",
      zalo_url: settings.zalo_url || "",
      youtube_url: settings.youtube_url || "",
      intro_title: settings.intro_title || "KT BEAUTY MEDICAL CENTRE",
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
      intro_image: settings.intro_image || "/images/574583363_122251875866080096_1777622189448333941_n-1.jpg",
      intro_story_title: settings.intro_story_title || "Triết Lý Làm Đẹp Chuẩn Y Khoa & Vẻ Đẹp Độc Bản",
      intro_story_desc_1: settings.intro_story_desc_1 || "",
      intro_story_desc_2: settings.intro_story_desc_2 || "",
      intro_story_quote: settings.intro_story_quote || "",
      intro_story_quote_author: settings.intro_story_quote_author || "",
      intro_story_image_1: settings.intro_story_image_1 || "/images/Workshop-1.png",
      intro_story_image_2: settings.intro_story_image_2 || "/images/ultherapy-APAC.jpg",
      intro_story_image_3: settings.intro_story_image_3 || "/images/1-size-web.png",
    },
  });

  // Media Manager States
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [mediaFolders, setMediaFolders] = useState<any[]>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [allMediaFolders, setAllMediaFolders] = useState<any[]>([]);
  const [mediaBreadcrumbs, setMediaBreadcrumbs] = useState<any[]>([]);
  const [mediaSearchQuery, setMediaSearchQuery] = useState("");
  const [mediaLoading, setMediaLoading] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [mediaUploadLoading, setMediaUploadLoading] = useState(false);
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

  const handleUploadMediaFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
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
    } catch (err) {
      console.error("Lỗi khi tải tệp lên:", err);
      alert("Tải tệp lên thất bại!");
    } finally {
      setMediaUploadLoading(false);
      if (e.target) e.target.value = "";
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

  // Submission status updates
  const handleUpdateStatus = (id: number, status: string) => {
    router.patch(
      route("admin.submissions.status", id),
      { status },
      { preserveScroll: true }
    );
  };

  const handleDeleteSubmission = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa lượt đăng ký này?")) {
      router.delete(route("admin.submissions.destroy", id), { preserveScroll: true });
    }
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
      author: art.author || "",
      published_date: art.published_date || "",
      category: art.category,
      image_file: null,
      image: art.image || "",
      is_highlight: art.is_highlight ? 1 : 0,
      slug: art.slug || "",
      meta_title: art.meta_title || "",
      meta_description: art.meta_description || "",
      meta_keywords: art.meta_keywords || "",
      meta_robots: art.meta_robots || "",
      canonical_link: art.canonical_link || "",
      meta_image: art.meta_image || "",
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

  // Service Actions
  const handleOpenAddService = () => {
    setEditingService(null);
    serviceForm.reset();
    setServiceViewMode("create");
  };

  const handleOpenEditService = (srv: Service) => {
    setEditingService(srv);
    serviceForm.setData({
      name: srv.name,
      category: srv.category,
      price: srv.price || "Liên hệ",
      description: srv.description || "",
      image_file: null,
      image: srv.image || "",
      banner_image: srv.banner_image || "",
      is_highlight: srv.is_highlight ? 1 : 0,
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
            <div className="p-1.5 bg-gold/10 rounded-lg border border-gold/30">
              <Sparkles className="text-gold w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="font-serif font-bold text-white text-sm tracking-widest uppercase">KT+ BEAUTY</h2>
              <span className="text-[9px] text-gold tracking-widest uppercase font-semibold">Medical Centre</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "overview"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Tổng quan hệ thống</span>
            </button>

            <button
              onClick={() => setActiveTab("submissions")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "submissions"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <Phone size={16} />
                <span>Đăng ký tư vấn</span>
              </div>
              {submissions.length > 0 && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === "submissions" ? "bg-white text-gold" : "bg-gold/15 text-gold"
                }`}>
                  {submissions.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "articles"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <BookOpen size={16} />
              <span>Bài viết tin tức</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "services"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <Sparkles size={16} />
              <span>Danh mục dịch vụ</span>
            </button>

            <button
              onClick={() => setActiveTab("banners")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "banners"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <Sliders size={16} />
              <span>Quản lý banners</span>
            </button>

            <button
              onClick={() => setActiveTab("doctors")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "doctors"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <Users size={16} />
              <span>Đội ngũ bác sĩ</span>
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "faqs"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <HelpCircle size={16} />
              <span>Hỏi đáp FAQ</span>
            </button>

            <button
              onClick={() => setActiveTab("realResults")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "realResults"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <CheckCircle size={16} />
              <span>Kết quả thực tế</span>
            </button>

            <button
              onClick={() => setActiveTab("intro")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "intro"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <Info size={16} />
              <span>Quản lý giới thiệu</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "settings"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <Settings size={16} />
              <span>Cấu hình hệ thống</span>
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
              <span>Quản lý Tệp</span>
            </button>

            <button
              onClick={() => setActiveTab("configs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "configs"
                  ? "bg-gold text-white font-bold shadow-md shadow-gold/15"
                  : "hover:bg-white/5 hover:text-white text-gray-400"
              }`}
            >
              <Sliders size={16} />
              <span>Configs</span>
            </button>
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
                {analytics?.daily_trends && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div className="text-left">
                        <h3 className="text-base font-bold font-serif text-gray-800 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
                          Biểu Đồ Xu Hướng Đăng Ký
                        </h3>
                        <p className="text-xs text-gray-400 font-light mt-0.5">Số lượng khách hàng đăng ký tư vấn trong 7 ngày gần nhất</p>
                      </div>

                      <a
                        href={route("admin.submissions.export")}
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all shadow-sm hover:shadow-gold/15"
                      >
                        Xuất file dữ liệu CSV (Excel)
                      </a>
                    </div>

                    {/* SVG Chart */}
                    <div className="w-full h-44 relative pt-4">
                      <svg className="w-full h-full" viewBox="0 0 700 150" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="700" y2="20" stroke="#f5f5f5" strokeWidth="1" />
                        <line x1="0" y1="65" x2="700" y2="65" stroke="#f5f5f5" strokeWidth="1" />
                        <line x1="0" y1="110" x2="700" y2="110" stroke="#f5f5f5" strokeWidth="1" />
                        
                        {/* Draw Line / Area Path */}
                        {(() => {
                          const trends = analytics.daily_trends || [];
                          const maxVal = Math.max(...trends.map(d => d.count), 5);
                          const points = trends.map((d, i) => {
                            const x = (i / 6) * 650 + 25;
                            const y = 120 - (d.count / maxVal) * 90;
                            return { x, y, ...d };
                          });

                          if (points.length === 0) return null;

                          const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                          const areaPath = `${linePath} L ${points[points.length-1].x} 120 L ${points[0].x} 120 Z`;

                          return (
                            <>
                              {/* Shaded Area under curve */}
                              <path d={areaPath} fill="url(#chartGrad)" opacity="0.15" />
                              
                              {/* Main line */}
                              <path d={linePath} fill="none" stroke="#d2bfa7" strokeWidth="3" strokeLinecap="round" />
                              
                              {/* Data points & labels */}
                              {points.map((p, i) => (
                                <g key={i} className="group cursor-pointer">
                                  <circle cx={p.x} cy={p.y} r="5" fill="#ffffff" stroke="#d2bfa7" strokeWidth="2.5" />
                                  <circle cx={p.x} cy={p.y} r="8" fill="#d2bfa7" opacity="0" className="hover:opacity-20 transition-opacity" />
                                  
                                  {/* Value label */}
                                  <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#d2bfa7" className="text-[10px] font-bold">
                                    {p.count}
                                  </text>
                                  
                                  {/* X axis dates */}
                                  <text x={p.x} y="138" textAnchor="middle" fill="#9ca3af" className="text-[10px] font-medium">
                                    {p.date}
                                  </text>
                                </g>
                              ))}
                            </>
                          );
                        })()}
                        
                        {/* Gradient definitions */}
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#d2bfa7" />
                            <stop offset="100%" stopColor="#d2bfa7" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                )}

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
            {activeTab === "submissions" && (
              <div className="overflow-x-auto">
                <h3 className="text-lg font-bold font-serif text-gray-800 mb-6">Danh Sách Khách Hàng Đăng Ký</h3>
                {submissions.length === 0 ? (
                  <p className="text-gray-400 text-center py-12 font-light">Chưa có lượt đăng ký tư vấn nào.</p>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400 tracking-wider">
                        <th className="py-4 px-4">Tên khách hàng</th>
                        <th className="py-4 px-4">Số điện thoại</th>
                        <th className="py-4 px-4">Dịch vụ</th>
                        <th className="py-4 px-4">Ngày đăng ký</th>
                        <th className="py-4 px-4 text-center">Trạng thái</th>
                        <th className="py-4 px-4 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-bold text-gray-800">{sub.name}</div>
                            {sub.email && <div className="text-xs text-gray-400 font-light mt-0.5">{sub.email}</div>}
                          </td>
                          <td className="py-4 px-4">
                            <a href={`tel:${sub.phone}`} className="hover:underline font-semibold text-gold">
                              {sub.phone}
                            </a>
                          </td>
                          <td className="py-4 px-4">
                            <span className="bg-gray-100 px-2.5 py-1 rounded text-xs text-gray-500 font-medium">
                              {sub.service || "Chưa chọn"}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-400 text-xs">
                            {new Date(sub.created_at).toLocaleString("vi-VN")}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <select
                              value={sub.status}
                              onChange={(e) => handleUpdateStatus(sub.id, e.target.value)}
                              className={`text-xs font-bold rounded px-3 py-1.5 focus:outline-none border-none cursor-pointer ${
                                sub.status === "Chờ liên hệ"
                                  ? "bg-amber-100 text-amber-700"
                                  : sub.status === "Đã liên hệ"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              <option value="Chờ liên hệ">Chờ liên hệ</option>
                              <option value="Đã liên hệ">Đã liên hệ</option>
                              <option value="Đã hủy">Đã hủy</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="text-red-500 hover:text-red-750 p-1.5 hover:bg-red-50 rounded transition-colors"
                              title="Xóa lượt đăng ký"
                            >
                              <Trash size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

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
                          onChange={(e) => setArticleSearchTerm(e.target.value)}
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

                      return (
                        <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                          <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                              <tr className="border-b border-gray-150 text-[10px] font-bold uppercase text-gray-400 tracking-wider bg-gray-50/75 select-none">
                                <th className="py-4 px-4 w-12 text-center">ID</th>
                                <th className="py-4 px-4 w-28">Hình ảnh</th>
                                <th className="py-4 px-4">Tiêu đề</th>
                                <th className="py-4 px-4 text-center w-28">Is Featured</th>
                                <th className="py-4 px-4 text-center w-28">Trạng thái</th>
                                <th className="py-4 px-4 text-center w-20">Lượt xem</th>
                                <th className="py-4 px-4 text-center w-36">Ngày tạo</th>
                                <th className="py-4 px-4 text-center w-36">Cập nhật cuối</th>
                                <th className="py-4 px-4 text-right w-24">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-xs text-gray-600 bg-white">
                              {filtered.map((art) => (
                                <tr key={art.id} className="hover:bg-gray-50/50 transition-colors">
                                  {/* ID */}
                                  <td className="py-4 px-4 text-center font-bold text-gray-400 align-middle">
                                    {art.id}
                                  </td>

                                  {/* HÌNH ẢNH */}
                                  <td className="py-4 px-4 align-middle">
                                    <div className="relative w-20 h-12 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                      {art.image ? (
                                        <img src={art.image} alt={art.title} className="object-cover w-full h-full" />
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
                                    <div className="text-[10px] text-gray-400 font-light mt-1 flex items-center gap-2">
                                      <span className="bg-gold/10 text-gold font-bold px-1.5 py-0.5 rounded text-[8px] tracking-wider uppercase">
                                        {art.category}
                                      </span>
                                      <span>Tác giả: {art.author || "KT Beauty"}</span>
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

                                  {/* LƯỢT XEM */}
                                  <td className="py-4 px-4 text-center align-middle font-medium text-gray-400">
                                    {art.id * 7 + 13}
                                  </td>

                                  {/* NGÀY TẠO */}
                                  <td className="py-4 px-4 text-center align-middle text-gray-400 font-light text-[10px]">
                                    {art.published_date || "08/07/2026 10:20"}
                                  </td>

                                  {/* CẬP NHẬT CUỐI */}
                                  <td className="py-4 px-4 text-center align-middle text-gray-400 font-light text-[10px]">
                                    {art.published_date || "08/07/2026 10:20"}
                                  </td>

                                  {/* THAO TÁC */}
                                  <td className="py-4 px-4 text-right align-middle">
                                    <div className="flex justify-end gap-1">
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
                              ))}
                            </tbody>
                          </table>
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
                      <span className="cursor-pointer hover:text-gold transition-colors" onClick={() => setArticleViewMode("list")}>🏠</span>
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
                          <button type="button" className="px-5 py-2.5 text-xs font-semibold text-gray-400 hover:text-gray-650 transition-colors">GB English</button>
                          <button type="button" className="px-5 py-2.5 text-xs font-semibold text-gray-400 hover:text-gray-650 transition-colors">CN 中文</button>
                        </div>

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
                            onChange={(e) => articleForm.setData("title", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-3 rounded-lg text-sm focus:outline-none text-gray-800 font-bold placeholder-gray-300 bg-white"
                            placeholder="Nhập tiêu đề bài viết"
                          />
                          {articleForm.data.title && (
                            <div className="text-[10px] text-blue-500 font-light select-none break-all mt-1 bg-blue-50/50 border border-blue-100/50 px-3 py-1.5 rounded-md inline-block">
                              URL: https://ktbeauty.vn/tin-tuc/{articleForm.data.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
                            </div>
                          )}
                        </div>

                        {/* Author */}
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Tác giả *</label>
                          <input
                            type="text"
                            required
                            value={articleForm.data.author}
                            onChange={(e) => articleForm.setData("author", e.target.value)}
                            className="w-full border border-gray-200 focus:border-gold px-4 py-2.5 rounded-lg text-sm focus:outline-none text-gray-700 bg-white"
                            placeholder="Ví dụ: Bác sĩ hoặc Ban biên tập KT+ Beauty"
                          />
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
                        </div>

                        {/* Meta Title */}
                        <div className="space-y-1.5 pt-4">
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Title</label>
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
                          <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meta Description</label>
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
                                  placeholder="Đường dẫn canonical (ví dụ: https://ktbeauty.vn/tin-tuc/abc)..."
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
                          </div>

                        </div>

                        {/* Box 2: Categorization */}
                        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Danh mục</label>
                            <select
                              value={articleForm.data.category}
                              onChange={(e) => articleForm.setData("category", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                            >
                              <option value="Chuyên môn">Chuyên môn</option>
                              <option value="Sự kiện">Sự kiện</option>
                              <option value="Hoạt động">Hoạt động</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">Bài viết liên quan</label>
                            <select
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-400 bg-white"
                              defaultValue=""
                            >
                              <option value="">Chọn bài viết liên quan</option>
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
                          <button type="button" className="px-5 py-2.5 text-xs font-semibold text-gray-400 hover:text-gray-650 transition-colors">GB English</button>
                          <button type="button" className="px-5 py-2.5 text-xs font-semibold text-gray-400 hover:text-gray-650 transition-colors">CN 中文</button>
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
                              URL: https://ktbeauty.vn/dich-vu/{serviceForm.data.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
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
                                          <img src={p.img} className="object-cover w-full h-full absolute inset-0" alt="Bước" />
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
                                            <img src={ba.before} className="object-cover w-full h-full absolute inset-0" alt="Trước" />
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
                                            <img src={ba.after} className="object-cover w-full h-full absolute inset-0" alt="Sau" />
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
                                  placeholder="Đường dẫn canonical (ví dụ: https://ktbeauty.vn/dich-vu/xyz)..."
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
                              value={serviceForm.data.category}
                              onChange={(e) => serviceForm.setData("category", e.target.value)}
                              className="w-full border border-gray-200 focus:border-gold px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-gray-700 bg-white"
                            >
                              <option value="Phẫu thuật thẩm mỹ">Phẫu thuật thẩm mỹ</option>
                              <option value="Nâng mũi chuyên sâu">Nâng mũi chuyên sâu</option>
                              <option value="Thẩm mỹ mắt & Mí">Thẩm mỹ mắt & Mí</option>
                              <option value="Cấy tóc & Trị hói">Cấy tóc & Trị hói</option>
                              <option value="Da liễu & Laser">Da liễu & Laser</option>
                              <option value="Trẻ hóa công nghệ cao">Trẻ hóa công nghệ cao</option>
                              <option value="Phun xăm thẩm mỹ">Phun xăm thẩm mỹ</option>
                              <option value="Chăm sóc da chuyên sâu">Chăm sóc da chuyên sâu</option>
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
                                <th className="py-4 px-4 text-center w-28">Thứ tự</th>
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

                                  {/* THỨ TỰ */}
                                  <td className="py-4 px-4 text-center align-middle font-bold text-gray-600">
                                    {res.order}
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
                            placeholder="Ví dụ: KT Eyeluxe - Cắt mí Double Eyeluxe"
                          />
                          {realResultForm.data.title && (
                            <div className="text-[10px] text-blue-500 font-light select-none break-all mt-1 bg-blue-50/50 border border-blue-100/50 px-3 py-1.5 rounded-md inline-block">
                              URL: https://ktbeauty.vn/ket-qua/{realResultForm.data.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
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
                                  placeholder="Đường dẫn canonical (ví dụ: https://ktbeauty.vn/ket-qua/xyz)..."
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
                              <option value="eyeluxe">KT Eyeluxe</option>
                              <option value="sylfirm">Sylfirm X</option>
                              <option value="meso">Cocktail Infusion</option>
                              <option value="pro-lift">KT Pro-Lift</option>
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
                  <div className="md:col-span-9 lg:col-span-9.5 bg-white border border-gray-150 rounded-xl p-6 shadow-sm flex flex-col">
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
                              className="group relative border border-gray-150 hover:border-gold/40 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all flex flex-col"
                            >
                              {/* Action buttons inside card */}
                              <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(window.location.origin + file.path);
                                    alert("Đã sao chép đường dẫn hình ảnh!");
                                  }}
                                  className="p-1 text-gray-700 hover:text-gold rounded bg-white/90 shadow-sm"
                                  title="Sao chép link"
                                >
                                  <LinkIcon size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMediaFile(file.id)}
                                  className="p-1 text-gray-700 hover:text-red-500 rounded bg-white/90 shadow-sm"
                                  title="Xóa tệp"
                                >
                                  <Trash size={12} />
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

                <form onSubmit={handleSaveSettings} className="max-w-2xl space-y-6">
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
                <form onSubmit={handleSaveSettings} className="max-w-3xl space-y-6 text-left">
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
                        placeholder="Ví dụ: info@ktbeauty.vn"
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
                <form onSubmit={handleSaveSettings} className="max-w-4xl space-y-8 text-left pb-12">
                  
                  {/* PHẦN 1: GIỚI THIỆU CHÍNH */}
                  <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-6">
                    <h4 className="text-sm font-bold font-serif text-gold uppercase tracking-wider border-b border-gray-100 pb-3">
                      1. Khối Giới Thiệu Chính (Giới thiệu & Triết lý)
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Nhãn phụ giới thiệu (Eyebrow)</label>
                            <input
                              type="text"
                              value={settingsForm.data.settings.intro_subtitle}
                              onChange={(e) => settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_subtitle: e.target.value
                              })}
                              className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                              placeholder="Ví dụ: Về Chúng Tôi"
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Tiêu đề chính (Title)</label>
                            <input
                              type="text"
                              value={settingsForm.data.settings.intro_title}
                              onChange={(e) => settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_title: e.target.value
                              })}
                              className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                              placeholder="Ví dụ: KT BEAUTY MEDICAL CENTRE"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đoạn mô tả giới thiệu 1</label>
                            <textarea
                              rows={6}
                              value={settingsForm.data.settings.intro_desc_1}
                              onChange={(e) => settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_desc_1: e.target.value
                              })}
                              className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm focus:outline-none resize-y"
                              placeholder="Nhập đoạn văn giới thiệu thứ nhất..."
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đoạn mô tả giới thiệu 2</label>
                            <textarea
                              rows={6}
                              value={settingsForm.data.settings.intro_desc_2}
                              onChange={(e) => settingsForm.setData("settings", {
                                ...settingsForm.data.settings,
                                intro_desc_2: e.target.value
                              })}
                              className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm focus:outline-none resize-y"
                              placeholder="Nhập đoạn văn giới thiệu thứ hai..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1.5 block">Ảnh Đại Diện Giới Thiệu</label>
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
                          className="border border-dashed border-gray-250 rounded-xl p-3 bg-gray-50 flex flex-col items-center justify-center min-h-[220px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                        >
                          {settingsForm.data.settings.intro_image ? (
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
                      <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Tiêu đề câu chuyện</label>
                      <input
                        type="text"
                        value={settingsForm.data.settings.intro_story_title || ""}
                        onChange={(e) => settingsForm.setData("settings", {
                          ...settingsForm.data.settings,
                          intro_story_title: e.target.value
                        })}
                        className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                        placeholder="Nhập tiêu đề câu chuyện..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đoạn mô tả câu chuyện 1</label>
                        <textarea
                          rows={6}
                          value={settingsForm.data.settings.intro_story_desc_1 || ""}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_story_desc_1: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm focus:outline-none resize-y"
                          placeholder="Nhập nội dung mô tả thứ nhất..."
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đoạn mô tả câu chuyện 2</label>
                        <textarea
                          rows={6}
                          value={settingsForm.data.settings.intro_story_desc_2 || ""}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_story_desc_2: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2 rounded text-sm focus:outline-none resize-y"
                          placeholder="Nhập nội dung mô tả thứ hai..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-50">
                      <div className="md:col-span-2">
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Câu trích dẫn (Quote)</label>
                        <input
                          type="text"
                          value={settingsForm.data.settings.intro_story_quote || ""}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_story_quote: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                          placeholder="Câu nói truyền cảm hứng..."
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Người trích dẫn (Tác giả)</label>
                        <input
                          type="text"
                          value={settingsForm.data.settings.intro_story_quote_author || ""}
                          onChange={(e) => settingsForm.setData("settings", {
                            ...settingsForm.data.settings,
                            intro_story_quote_author: e.target.value
                          })}
                          className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
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
                            className="border border-dashed border-gray-250 rounded-xl p-2 bg-gray-55/10 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                          >
                            {settingsForm.data.settings.intro_story_image_1 ? (
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
                            className="border border-dashed border-gray-250 rounded-xl p-2 bg-gray-55/10 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                          >
                            {settingsForm.data.settings.intro_story_image_2 ? (
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
                            className="border border-dashed border-gray-250 rounded-xl p-2 bg-gray-55/10 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors"
                          >
                            {settingsForm.data.settings.intro_story_image_3 ? (
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
          </div>





      {/* BANNER MODAL */}
      {bannerModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl relative text-left">
            <button
              onClick={() => setBannerModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold font-serif text-gray-800 mb-6">
              {editingBanner ? "Chỉnh sửa slide banner" : "Thêm slide banner mới"}
            </h3>

            <form onSubmit={handleSaveBanner} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Nhãn phụ (Eyebrow)</label>
                  <input
                    type="text"
                    value={bannerForm.data.eyebrow}
                    onChange={(e) => bannerForm.setData("eyebrow", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                    placeholder="Ví dụ: KT Beauty Medical Centre"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Tiêu đề chính (Title)</label>
                  <input
                    type="text"
                    value={bannerForm.data.title}
                    onChange={(e) => bannerForm.setData("title", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                    placeholder="Ví dụ: Kiến tạo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Tiêu đề phụ (Subtitle)</label>
                  <input
                    type="text"
                    value={bannerForm.data.subtitle}
                    onChange={(e) => bannerForm.setData("subtitle", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                    placeholder="Ví dụ: Vẻ đẹp độc bản"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Mô tả (Subheading)</label>
                  <input
                    type="text"
                    value={bannerForm.data.description}
                    onChange={(e) => bannerForm.setData("description", e.target.value)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                    placeholder="Nhập mô tả tóm tắt"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Ảnh PC (Desktop Image) *</label>
                  <input
                    type="file"
                    accept="image/*"
                    required={!editingBanner && !bannerForm.data.image_desktop}
                    onChange={(e) => bannerForm.setData(data => ({
                      ...data,
                      image_desktop_file: e.target.files?.[0] || null,
                      image_desktop: ""
                    }))}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                  />
                  {bannerForm.data.image_desktop && (
                    <p className="text-[10px] text-gray-500 truncate mt-1">Đã chọn: {bannerForm.data.image_desktop}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setOnMediaSelect(() => (path: string) => {
                        bannerForm.setData(data => ({
                          ...data,
                          image_desktop: path,
                          image_desktop_file: null
                        }));
                      });
                      setMediaSelectorOpen(true);
                    }}
                    className="text-[11px] text-gold hover:text-gold-dark font-bold mt-1.5 cursor-pointer block text-left bg-transparent border-0"
                  >
                    Chọn từ Thư viện
                  </button>
                </div>
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Ảnh Mobile (Tùy chọn)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => bannerForm.setData(data => ({
                      ...data,
                      image_mobile_file: e.target.files?.[0] || null,
                      image_mobile: ""
                    }))}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                  />
                  {bannerForm.data.image_mobile && (
                    <p className="text-[10px] text-gray-500 truncate mt-1">Đã chọn: {bannerForm.data.image_mobile}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setOnMediaSelect(() => (path: string) => {
                        bannerForm.setData(data => ({
                          ...data,
                          image_mobile: path,
                          image_mobile_file: null
                        }));
                      });
                      setMediaSelectorOpen(true);
                    }}
                    className="text-[11px] text-gold hover:text-gold-dark font-bold mt-1.5 cursor-pointer block text-left bg-transparent border-0"
                  >
                    Chọn từ Thư viện
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-50 pt-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Nút liên kết chính (Primary CTA)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Chữ hiển thị</label>
                    <input
                      type="text"
                      value={bannerForm.data.button_primary_text}
                      onChange={(e) => bannerForm.setData("button_primary_text", e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                      placeholder="Đăng Ký Tư Vấn"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đường dẫn liên kết</label>
                    <input
                      type="text"
                      value={bannerForm.data.button_primary_url}
                      onChange={(e) => bannerForm.setData("button_primary_url", e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                      placeholder="#consult"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-50 pt-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Nút liên kết phụ (Secondary CTA)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Chữ hiển thị</label>
                    <input
                      type="text"
                      value={bannerForm.data.button_secondary_text}
                      onChange={(e) => bannerForm.setData("button_secondary_text", e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                      placeholder="Tìm Hiểu Dịch Vụ"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Đường dẫn liên kết</label>
                    <input
                      type="text"
                      value={bannerForm.data.button_secondary_url}
                      onChange={(e) => bannerForm.setData("button_secondary_url", e.target.value)}
                      className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                      placeholder="#services"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-3">
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Thứ tự hiển thị (Order)</label>
                  <input
                    type="number"
                    value={bannerForm.data.order}
                    onChange={(e) => bannerForm.setData("order", parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-semibold text-gray-500 mb-1.5 block">Hiển thị ngay</label>
                  <select
                    value={bannerForm.data.is_active}
                    onChange={(e) => bannerForm.setData("is_active", parseInt(e.target.value))}
                    className="w-full border border-gray-200 focus:border-gold px-3 py-2.5 rounded text-sm focus:outline-none text-gray-600"
                  >
                    <option value={1}>Kích hoạt</option>
                    <option value={0}>Tạm ẩn</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setBannerModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded text-sm transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={bannerForm.processing}
                  className="px-5 py-2 bg-gold hover:bg-gold-dark text-white font-bold rounded text-sm shadow-sm transition-colors disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99] p-4" onClick={() => setMediaSelectorOpen(false)}>
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
                <div className="flex-grow overflow-y-auto border border-gray-150 rounded-xl p-4 bg-gray-50/20 max-h-[350px]">
                  {mediaLoading ? (
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
                          className="group border border-gray-200 hover:border-gold/80 rounded-lg overflow-hidden bg-white hover:shadow-md transition-all flex flex-col cursor-pointer"
                          onClick={() => {
                            if (onMediaSelect) {
                              onMediaSelect(file.path);
                            }
                            setMediaSelectorOpen(false);
                          }}
                        >
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

        </main>
      </div>
    </AuthenticatedLayout>
  );
}
