import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import Image from "@/Components/Image";
import { Clock, Phone, ShieldCheck, Award, Sparkles, CheckCircle2 } from "lucide-react";

interface CountryItem {
  name: string;
  code: string;
  iso: string;
}

const countries: CountryItem[] = [
  { name: "Việt Nam", code: "+84", iso: "VN" },
  { name: "Mỹ", code: "+1", iso: "US" },
  { name: "Hàn Quốc", code: "+82", iso: "KR" },
  { name: "Nhật Bản", code: "+81", iso: "JP" },
  { name: "Úc", code: "+61", iso: "AU" },
  { name: "Singapore", code: "+65", iso: "SG" },
  { name: "Anh", code: "+44", iso: "GB" },
  { name: "Đài Loan", code: "+886", iso: "TW" },
  { name: "Hồng Kông", code: "+852", iso: "HK" },
  { name: "Canada", code: "+1", iso: "CA" },
  { name: "Trung Quốc", code: "+86", iso: "CN" },
  { name: "Thái Lan", code: "+66", iso: "TH" },
  { name: "Malaysia", code: "+60", iso: "MY" },
  { name: "Philippines", code: "+63", iso: "PH" },
  { name: "Indonesia", code: "+62", iso: "ID" },
  { name: "Campuchia", code: "+855", iso: "KH" },
  { name: "Lào", code: "+856", iso: "LA" },
  { name: "Myanmar", code: "+95", iso: "MM" },
  { name: "Pháp", code: "+33", iso: "FR" },
  { name: "Đức", code: "+49", iso: "DE" },
  { name: "Ý", code: "+39", iso: "IT" },
  { name: "Tây Ban Nha", code: "+34", iso: "ES" },
  { name: "Hà Lan", code: "+31", iso: "NL" },
  { name: "Thụy Sĩ", code: "+41", iso: "CH" },
  { name: "Thụy Điển", code: "+46", iso: "SE" },
  { name: "Na Uy", code: "+47", iso: "NO" },
  { name: "Đan Mạch", code: "+45", iso: "DK" },
  { name: "Phần Lan", code: "+358", iso: "FI" },
  { name: "Bỉ", code: "+32", iso: "BE" },
  { name: "Áo", code: "+43", iso: "AT" },
  { name: "Ireland", code: "+353", iso: "IE" },
  { name: "Bồ Đào Nha", code: "+351", iso: "PT" },
  { name: "Ba Lan", code: "+48", iso: "PL" },
  { name: "Nga", code: "+7", iso: "RU" },
  { name: "Ấn Độ", code: "+91", iso: "IN" },
  { name: "New Zealand", code: "+64", iso: "NZ" },
  { name: "UAE", code: "+971", iso: "AE" },
  { name: "Saudi Arabia", code: "+966", iso: "SA" },
  { name: "Nam Phi", code: "+27", iso: "ZA" },
  { name: "Brazil", code: "+55", iso: "BR" },
  { name: "Mexico", code: "+52", iso: "MX" }
];

export const QuickForm: React.FC = () => {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};
  const hotline = settings.site_hotline || "1900 5006";

  const { data, setData, post, processing, reset, wasSuccessful } = useForm({
    name: "",
    phone: "",
    email: "",
    service: "",
  });

  const [countryCode, setCountryCode] = React.useState("+84");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Sync calling code and phone number to form state
  React.useEffect(() => {
    setData("phone", `${countryCode} ${phoneNumber}`.trim());
  }, [countryCode, phoneNumber]);

  // Handle outside clicks to close country dropdown
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    post("/consult", {
      onSuccess: () => {
        reset();
        setPhoneNumber("");
      },
      preserveScroll: true,
    });
  };

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery) ||
      c.iso.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="consult" className="relative py-24 px-4 md:px-[10%] font-sans overflow-hidden bg-gradient-to-br from-[#faf8f5] to-[#f5eee2] text-gray-800 border-t border-gold/10">
      {/* Content Layout */}
      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Clinic Value Props & Contact info (7/12 cols) */}
        <div className="lg:col-span-7 text-left">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-bold mb-3 block">
            Liên hệ tư vấn
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-800 tracking-wide mb-6 leading-tight">
            Khởi Đầu Hành Trình <br />
            <span className="text-[#a88a5e]">Kiến Tạo Sắc Đẹp</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-light max-w-xl leading-relaxed mb-8">
            Đội ngũ chuyên gia và y bác sĩ tại KT Beauty Medical Centre luôn sẵn sàng lắng nghe, đồng hành và thiết kế phác đồ cá nhân hóa giúp bạn sở hữu vẻ đẹp tự nhiên hoàn mỹ nhất.
          </p>

          {/* Key Value Badges */}
          <div className="space-y-4 mb-10 max-w-lg">
            <div className="flex gap-4 items-start bg-white p-4 rounded-2xl border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl bg-gold/15 text-[#a88a5e] flex-shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">Chuyên Gia Đầu Ngành</h4>
                <p className="text-xs text-gray-500 font-light mt-0.5">100% quy trình thăm khám và trị liệu trực tiếp do bác sĩ chuyên khoa CKI đảm nhận.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white p-4 rounded-2xl border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl bg-gold/15 text-[#a88a5e] flex-shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">Chuyển Giao Công Nghệ Hoa Kỳ</h4>
                <p className="text-xs text-gray-500 font-light mt-0.5">Trang thiết bị máy móc cao cấp, cam kết 100% chính hãng đạt chuẩn FDA Hoa Kỳ.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white p-4 rounded-2xl border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl bg-gold/15 text-[#a88a5e] flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">An Toàn Chuẩn Y Khoa</h4>
                <p className="text-xs text-gray-500 font-light mt-0.5">Môi trường vô trùng, bảo mật thông tin khách hàng và cam kết hiệu quả bằng văn bản.</p>
              </div>
            </div>
          </div>

          {/* Hotline & Office Hours quick links */}
          <div className="flex flex-wrap gap-8 items-center border-t border-gray-200/60 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold hover:bg-gold-dark text-white flex items-center justify-center transition-colors">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">Hotline hỗ trợ 24/7</span>
                <a href={`tel:${hotline.replace(/\s+/g, "")}`} className="text-gold font-bold text-lg md:text-xl hover:underline">
                  {hotline}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">Giờ làm việc</span>
                <span className="text-gray-700 text-sm font-semibold">Thứ 2 - Chủ Nhật: 08:30 - 20:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Booking Card (5/12 cols) */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-gray-800 border border-gold/20 relative overflow-hidden group">
            {/* Subtle decorative glows inside card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-serif font-bold text-gray-800 text-center mb-1.5">
              Đặt Lịch Hẹn Tư Vấn
            </h3>
            <p className="text-xs text-gray-400 font-light text-center mb-6 max-w-xs mx-auto">
              Nhận cuộc gọi tư vấn giải đáp trực tiếp từ bác sĩ chuyên khoa trong vòng 15 phút.
            </p>

            {wasSuccessful ? (
              <div className="py-12 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">Đăng Ký Thành Công!</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[240px] mx-auto">
                  Cảm ơn bạn đã tin tưởng KT Beauty. Bác sĩ chuyên khoa sẽ liên hệ trực tiếp cho bạn qua số điện thoại sớm nhất có thể.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 block">Họ và tên *</label>
                  <input
                    type="text"
                    placeholder="Nhập họ tên của bạn"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 block">Số điện thoại *</label>
                  <div className="flex gap-2">
                    {/* Custom Country Code Dropdown */}
                    <div className="relative w-28 flex-shrink-0" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full h-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-3 py-3 rounded-xl text-gray-700 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30 flex justify-between items-center cursor-pointer select-none"
                      >
                        <span className="font-semibold text-gray-800">{countryCode}</span>
                        <span className="text-gray-400 text-[10px] transform transition-transform duration-200">
                          {dropdownOpen ? "▲" : "▼"}
                        </span>
                      </button>

                      {dropdownOpen && (
                        <div className="absolute top-[calc(100%+6px)] left-0 w-72 max-h-60 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-y-auto z-50 py-2 flex flex-col text-left">
                          {/* Search Input Box */}
                          <div className="px-3 pb-2 border-b border-gray-100 mb-1 sticky top-0 bg-white z-10">
                            <input
                              type="text"
                              placeholder="Tìm mã quốc gia..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-gold/85 px-3 py-1.5 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                            />
                          </div>

                          {/* Country List items */}
                          <div className="overflow-y-auto max-h-48">
                            {filteredCountries.length === 0 ? (
                              <div className="text-center py-4 text-xs text-gray-400 font-light">Không tìm thấy</div>
                            ) : (
                              filteredCountries.map((c) => (
                                <button
                                  key={`${c.iso}-${c.code}`}
                                  type="button"
                                  onClick={() => {
                                    setCountryCode(c.code);
                                    setDropdownOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="w-full text-left px-4 py-2 hover:bg-gold/10 text-xs text-gray-700 transition-colors flex justify-between items-center"
                                >
                                  <span className="font-medium text-gray-750">
                                    {c.name} ({c.iso})
                                  </span>
                                  <span className="font-semibold text-gold text-right">{c.code}</span>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Input Box */}
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                      className="flex-grow bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 block">Email</label>
                  <input
                    type="email"
                    placeholder="Nhập email của bạn (không bắt buộc)"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 block">Dịch vụ quan tâm</label>
                  <div className="relative">
                    <select
                      value={data.service}
                      onChange={(e) => setData("service", e.target.value)}
                      className="w-full bg-gray-50/50 border border-gray-200 focus:border-gold/80 px-4 py-3 rounded-xl text-gray-700 focus:outline-none transition-all text-sm focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer"
                    >
                      <option value="" className="text-gray-400">Chọn dịch vụ tư vấn</option>
                      <option value="Phẫu thuật thẩm mỹ">Phẫu thuật thẩm mỹ</option>
                      <option value="Cấy tóc y khoa">Cấy tóc y khoa</option>
                      <option value="Da liễu & Trẻ hóa">Da liễu & Trẻ hóa</option>
                      <option value="Dịch vụ khác">Dịch vụ khác</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-gold/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 shimmer-container"
                  >
                    {processing ? "Đang gửi đăng ký..." : "Gửi Đăng Ký Lịch Hẹn"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
