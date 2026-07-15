import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { Introduction } from "@/Components/Introduction";
import { DoctorsCarousel } from "@/Components/DoctorsCarousel";
import { ConsultLocations } from "@/Components/ConsultLocations";
import Image from "@/Components/Image";
import { ChevronRight, Target, Compass, Award, Eye, Shield, Heart, Sparkles, CheckCircle } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
}

interface GioiThieuProps {
  doctors?: Doctor[];
}

export default function GioiThieu({ doctors = [] }: GioiThieuProps) {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};

  const storyTitle = settings.intro_story_title || "Triết Lý Làm Đẹp Chuẩn Y Khoa & Vẻ Đẹp Độc Bản";
  const storyDesc1 = settings.intro_story_desc_1 || "Tại KT Beauty Medical Centre, chúng tôi tin rằng mỗi người đều sở hữu một vẻ đẹp độc bản riêng biệt. Sự tự tin của bạn là món quà quý giá nhất, và sứ mệnh của chúng tôi là giúp bạn khám phá và gìn giữ nét riêng đó thông qua các giải pháp y khoa thẩm mỹ tiên tiến, an toàn.";
  const storyDesc2 = settings.intro_story_desc_2 || "Được thành lập bởi đội ngũ bác sĩ chuyên khoa I, KT Beauty đã không ngừng nâng cấp hệ thống phòng khám, chuyển giao độc quyền các công nghệ từ Hàn Quốc, Mỹ và châu Âu. Chúng tôi coi sự an toàn và hiệu quả thực tế của khách hàng là kim chỉ nam tối thượng.";
  const storyQuote = settings.intro_story_quote || "Chúng tôi không thay đổi diện mạo của bạn, chúng tôi tôn vinh và khôi phục những nét đẹp độc bản tự nhiên nhất.";
  const storyQuoteAuthor = settings.intro_story_quote_author || "CEO Khánh Tôn";
  const storyImage1 = settings.intro_story_image_1 || "";
  const storyImage2 = settings.intro_story_image_2 || "";
  const storyImage3 = settings.intro_story_image_3 || "";
  const coreValues = [
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      title: "Chuyên Nghiệp",
      desc: "Quy tụ đội ngũ bác sĩ chuyên khoa có chuyên môn cao và giàu kinh nghiệm cùng hệ thống trang thiết bị hiện đại hàng đầu.",
    },
    {
      icon: <Compass className="w-8 h-8 text-gold" />,
      title: "Tận Tâm",
      desc: "Lắng nghe, thấu hiểu và chăm sóc khách hàng như người thân bằng sự ân cần, chu đáo suốt hành trình làm đẹp.",
    },
    {
      icon: <Target className="w-8 h-8 text-gold" />,
      title: "Trung Thực",
      desc: "Cam kết tư vấn đúng tình trạng thực tế, chỉ định phác đồ điều trị chuẩn xác và trung thực với kết quả mang lại.",
    },
  ];

  return (
    <>
      <Head title="Về Chúng Tôi | KT Beauty Medical Centre" />
      <Header />

      <main className="flex-grow font-sans bg-white">
        {/* Banner/Hero */}
        <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
          <div className="absolute inset-0 w-full h-full opacity-40 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="KT Beauty Introduction Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-55/40 via-dark-bg/60 to-transparent z-10" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-[10%] w-full text-white text-left">
            <div className="max-w-5xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold mb-4 font-semibold">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-white">Giới thiệu</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-wide">
                Giới Thiệu
              </h1>

              {/* Subheading */}
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light max-w-3xl">
                Kiến tạo sắc đẹp tự nhiên, chuẩn y khoa với đội ngũ bác sĩ chuyên khoa và hệ thống trang thiết bị chuyển giao chính hãng hàng đầu thế giới.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Introduction Section */}
        <Introduction />

        {/* Story Section */}
        <section className="py-24 bg-white px-4 md:px-[10%] text-left font-sans border-t border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold block">
                Hành Trình Kiến Tạo
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 leading-tight">
                {storyTitle}
              </h2>
              <div className="w-16 h-[2px] bg-gold" />
              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                {storyDesc1}
              </p>
              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                {storyDesc2}
              </p>
              <div className="border-l-4 border-gold pl-5 py-3 bg-gold/5 rounded-r-2xl font-serif italic text-base md:text-lg text-gray-700 leading-relaxed">
                "{storyQuote}"
                <span className="block text-sm font-semibold text-gold mt-2 font-sans not-italic">— {storyQuoteAuthor}</span>
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
              <div className="col-span-8 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gold/15">
                <Image
                  src={storyImage1}
                  alt="KT Beauty Workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-4 relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-gold/15 mt-8">
                <Image
                  src={storyImage2}
                  alt="CEO Khanh Ton APAC"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-12 relative aspect-[2/1] rounded-2xl overflow-hidden shadow-lg border border-gold/15 mt-4">
                <Image
                  src={storyImage3}
                  alt="KT Beauty Clinic"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Values Section */}
        <section className="py-24 bg-[#faf8f5] px-4 md:px-[10%] border-t border-b border-gray-150/40 text-left">
          <div className="max-w-7xl mx-auto">
            {/* Split layout: Vision & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* Vision Card */}
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-gold/15 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-2">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800">
                  Tầm Nhìn Chiến Lược
                </h3>
                <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                  Trở thành hệ thống Viện thẩm mỹ y khoa chuẩn quốc tế hàng đầu tại Việt Nam, tiên phong mang đến các giải pháp làm đẹp an toàn, hiệu quả bền vững bằng công nghệ cao không xâm lấn.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-gold/15 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-2">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800">
                  Sứ Mệnh Nâng Tầm
                </h3>
                <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                  Đồng hành cùng khách hàng trên hành trình giữ gìn và nâng tầm nhan sắc Việt bằng sự tử tế, trung thực và chuyên môn y khoa cao nhất, giúp bạn tự tin tỏa sáng phiên bản tốt nhất của chính mình.
                </p>
              </div>
            </div>

            {/* Core Values Sub-grid */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                  Giá Trị Cốt Lõi
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-dark-bg">
                  Triết Lý Làm Đẹp Tại KT Beauty
                </h3>
                <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {coreValues.map((val) => (
                  <div
                    key={val.title}
                    className="bg-white border border-gold/15 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center md:items-start text-center md:text-left group transition-all duration-300 hover:shadow-md"
                  >
                    <div className="mb-5 p-3 bg-gold/10 rounded-xl text-gold transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                      {val.icon}
                    </div>

                    <h4 className="text-lg font-bold text-gray-800 mb-2.5 font-serif tracking-wide transition-colors duration-300 group-hover:text-gold">
                      {val.title}
                    </h4>

                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-white px-4 md:px-[10%] text-left font-sans border-b border-gray-150/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Cột Mốc Phát Triển
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Hành Trình Y Khoa Vượt Trội
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>

            <div className="relative space-y-12 py-4">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gold/25 md:translate-x-[-1px]" />

              {/* Node 1: 2018 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
                {/* Left Side */}
                <div className="pl-12 md:pl-0 md:text-right md:pr-8 md:col-start-1">
                  <div className="bg-light-bg p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                    <span className="text-gold font-bold font-serif text-2xl block mb-1">2018</span>
                    <h4 className="font-serif font-bold text-gray-800 text-lg mb-2">Thành Lập Cơ Sở Đầu Tiên</h4>
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                      KT Beauty Clinic chính thức ra mắt tại TP. Hồ Chí Minh với định hướng trở thành hệ thống làm đẹp chất lượng cao, tập trung chăm sóc da và điều trị không xâm lấn.
                    </p>
                  </div>
                </div>
                {/* Dot */}
                <div className="absolute left-[10px] md:left-1/2 w-3.5 h-3.5 rounded-full bg-gold border-4 border-white shadow-md md:translate-x-[-7px] top-6" />
                {/* Right Side (Empty space on desktop) */}
                <div className="hidden md:block col-start-2" />
              </div>

              {/* Node 2: 2020 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
                {/* Left Side (Empty space on desktop) */}
                <div className="hidden md:block col-start-1" />
                {/* Dot */}
                <div className="absolute left-[10px] md:left-1/2 w-3.5 h-3.5 rounded-full bg-gold border-4 border-white shadow-md md:translate-x-[-7px] top-6" />
                {/* Right Side */}
                <div className="pl-12 md:pl-8 md:col-start-2 text-left">
                  <div className="bg-light-bg p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                    <span className="text-gold font-bold font-serif text-2xl block mb-1">2020</span>
                    <h4 className="font-serif font-bold text-gray-800 text-lg mb-2">Chuyển Giao Công Nghệ & Chuẩn Hóa</h4>
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                      Ký kết hợp tác toàn diện và chuyển giao các thiết bị thẩm mỹ công nghệ cao đạt chuẩn FDA từ Hoa Kỳ, Hàn Quốc, nâng chất lượng liệu trình vượt trội.
                    </p>
                  </div>
                </div>
              </div>

              {/* Node 3: 2023 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
                {/* Left Side */}
                <div className="pl-12 md:pl-0 md:text-right md:pr-8 md:col-start-1">
                  <div className="bg-light-bg p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                    <span className="text-gold font-bold font-serif text-2xl block mb-1">2023</span>
                    <h4 className="font-serif font-bold text-gray-800 text-lg mb-2">Vượt Mốc 10.000 Khách Hàng</h4>
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                      Khẳng định thương hiệu uy tín, đón nhận sự tin tưởng từ hơn 10.000 khách hàng thực tế và xây dựng hệ thống phòng phẫu thuật vô trùng khép kín.
                    </p>
                  </div>
                </div>
                {/* Dot */}
                <div className="absolute left-[10px] md:left-1/2 w-3.5 h-3.5 rounded-full bg-gold border-4 border-white shadow-md md:translate-x-[-7px] top-6" />
                {/* Right Side (Empty space on desktop) */}
                <div className="hidden md:block col-start-2" />
              </div>

              {/* Node 4: 2026 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
                {/* Left Side (Empty space on desktop) */}
                <div className="hidden md:block col-start-1" />
                {/* Dot */}
                <div className="absolute left-[10px] md:left-1/2 w-3.5 h-3.5 rounded-full bg-gold border-4 border-white shadow-md md:translate-x-[-7px] top-6" />
                {/* Right Side */}
                <div className="pl-12 md:pl-8 md:col-start-2 text-left">
                  <div className="bg-light-bg p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                    <span className="text-gold font-bold font-serif text-2xl block mb-1">2026</span>
                    <h4 className="font-serif font-bold text-gray-800 text-lg mb-2">Chuyển Giao Ultherapy Prime Thế Hệ Mới</h4>
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                      Ký kết và nhận chuyển giao độc quyền Ultherapy Prime tại Hội nghị APAC, dẫn đầu xu hướng thẩm mỹ công nghệ cao chuẩn y khoa thời đại mới.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-24 bg-[#faf8f5] px-4 md:px-[10%] text-left font-sans border-b border-gray-150/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Không Gian Trị Liệu
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
                Cơ Sở Vật Chất Thượng Lưu
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Facility 1 */}
              <div className="bg-white rounded-3xl overflow-hidden border border-gold/10 shadow-sm hover:shadow-md group transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/images/574583363_122251875866080096_1777622189448333941_n-1.jpg"
                    alt="Sảnh Tiếp Đón VIP"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-serif font-bold text-gray-800 text-lg mb-2">Sảnh Đón Tiếp VIP</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Không gian sảnh chờ sang trọng, yên tĩnh đem lại cảm giác thư thái và đón tiếp nồng hậu ngay từ bước chân đầu tiên.
                  </p>
                </div>
              </div>

              {/* Facility 2 */}
              <div className="bg-white rounded-3xl overflow-hidden border border-gold/10 shadow-sm hover:shadow-md group transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/images/Masterclass-1.jpg"
                    alt="Phòng Đào Tạo & Chuyên Môn"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-serif font-bold text-gray-800 text-lg mb-2">Hội Thảo & MasterClass Chuyên Sâu</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Nơi diễn ra các buổi đào tạo chuyên môn định kỳ và chuyển giao công nghệ thẩm mỹ với sự tham gia của các chuyên gia quốc tế.
                  </p>
                </div>
              </div>

              {/* Facility 3 */}
              <div className="bg-white rounded-3xl overflow-hidden border border-gold/10 shadow-sm hover:shadow-md group transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/images/1-size-web-1.png"
                    alt="Phòng Trị Liệu Công Nghệ Cao"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-serif font-bold text-gray-800 text-lg mb-2">Phòng Điều Trị Đạt Chuẩn</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Hệ thống máy móc trị liệu chính hãng, phòng phẫu thuật vô trùng khép kín tuyệt đối đạt tiêu chuẩn của Bộ Y Tế.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accreditations Section */}
        <section className="py-24 bg-white px-4 md:px-[10%] text-left font-sans">
          <div className="max-w-7xl mx-auto">
            <div className="bg-dark-bg text-white rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl">
              {/* Background Glow Decors */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-gold uppercase tracking-widest text-xs font-semibold block">
                    Bảo Chứng Uy Tín
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                    Cam Kết Vàng Cho Hành Trình Làm Đẹp
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Sự hài lòng và an toàn của khách hàng luôn là tài sản quý giá nhất của KT Beauty Medical Centre. Chúng tôi cam kết duy trì chất lượng dịch vụ ở mức tối đa bằng văn bản và các tiêu chuẩn kiểm duyệt khắt khe nhất.
                  </p>
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Item 1 */}
                  <div className="bg-white/[0.03] border border-white/5 hover:border-gold/30 p-6 rounded-2xl transition-all duration-300">
                    <Shield className="w-8 h-8 text-gold mb-3" />
                    <h5 className="font-serif font-bold text-white text-base mb-1.5">Giấy Phép Bộ Y Tế</h5>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Toàn bộ dịch vụ phẫu thuật tạo hình và trị liệu công nghệ cao được thực hiện theo đúng giấy phép và quy chuẩn an toàn y khoa.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-white/[0.03] border border-white/5 hover:border-gold/30 p-6 rounded-2xl transition-all duration-300">
                    <Award className="w-8 h-8 text-gold mb-3" />
                    <h5 className="font-serif font-bold text-white text-base mb-1.5">100% Thiết Bị FDA</h5>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Các thiết bị nâng cơ Ultherapy, laser sắc tố... là máy chuyển giao chính hãng, được FDA Hoa Kỳ và CE châu Âu chứng nhận.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-white/[0.03] border border-white/5 hover:border-gold/30 p-6 rounded-2xl transition-all duration-300">
                    <Heart className="w-8 h-8 text-gold mb-3" />
                    <h5 className="font-serif font-bold text-white text-base mb-1.5">Bảo Hành Bằng Văn Bản</h5>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Cam kết chất lượng hiệu quả thực tế và bảo đảm chăm sóc hậu phẫu chu đáo, đồng hành cùng khách hàng trọn vẹn hành trình.
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="bg-white/[0.03] border border-white/5 hover:border-gold/30 p-6 rounded-2xl transition-all duration-300">
                    <Sparkles className="w-8 h-8 text-gold mb-3" />
                    <h5 className="font-serif font-bold text-white text-base mb-1.5">Hội Đồng Bác Sĩ CKI</h5>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      100% khách hàng được thăm khám trực tiếp cùng bác sĩ chuyên khoa I, thiết kế phác đồ cá nhân hóa độc bản không qua trung gian.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Doctors Carousel Section */}
        {doctors && doctors.length > 0 && (
          <section className="bg-white border-t border-gray-100">
            <div className="pt-24 text-center max-w-2xl mx-auto -mb-16">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                Đội Ngũ Chuyên Gia
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-dark-bg">
                Hội Đồng Bác Sĩ Đầu Ngành
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>
            <DoctorsCarousel doctors={doctors} />
          </section>
        )}

        {/* Locations and Signups */}
        <ConsultLocations />
      </main>

      <Footer />
    </>
  );
}
