import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { Introduction } from "@/Components/Introduction";
import { DoctorsCarousel } from "@/Components/DoctorsCarousel";
import { WhyChooseUs } from "@/Components/WhyChooseUs";
import { AboutHeroCarousel } from "@/Components/AboutHeroCarousel";
import { ConsultLocations } from "@/Components/ConsultLocations";
import Image from "@/Components/Image";
import { ChevronRight, Award, Shield, Heart, Sparkles } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
}

interface RealResultItem {
  id: number;
  category: string;
  title: string;
  detail: string;
  image: string;
  is_video: boolean | number;
  order: number;
}

interface GioiThieuProps {
  doctors?: Doctor[];
  realResults?: RealResultItem[];
}

export default function GioiThieu({ doctors = [], realResults = [] }: GioiThieuProps) {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};

  const storyTitle = settings.intro_story_title || "Triết Lý Làm Đẹp Chuẩn Y Khoa & Vẻ Đẹp Độc Bản";
  const storyDesc1 = settings.intro_story_desc_1 || "Tại Theq Nail Centre, chúng tôi tin rằng mỗi người đều sở hữu một vẻ đẹp độc bản riêng biệt. Sự tự tin của bạn là món quà quý giá nhất, và sứ mệnh của chúng tôi là giúp bạn khám phá và gìn giữ nét riêng đó thông qua các giải pháp y khoa thẩm mỹ tiên tiến, an toàn.";
  const storyDesc2 = settings.intro_story_desc_2 || "Được thành lập bởi đội ngũ bác sĩ chuyên khoa I, Theq đã không ngừng nâng cấp hệ thống phòng khám, chuyển giao độc quyền các công nghệ từ Hàn Quốc, Mỹ và châu Âu. Chúng tôi coi sự an toàn và hiệu quả thực tế của khách hàng là kim chỉ nam tối thượng.";
  const storyQuote = settings.intro_story_quote || "Chúng tôi không thay đổi diện mạo của bạn, chúng tôi tôn vinh và khôi phục những nét đẹp độc bản tự nhiên nhất.";
  const storyQuoteAuthor = settings.intro_story_quote_author || "CEO Khánh Tôn";
  const storyImage1 = settings.intro_story_image_1 || "";
  const storyImage2 = settings.intro_story_image_2 || "";
  const storyImage3 = settings.intro_story_image_3 || "";

  return (
    <>
      <Head title="Về Chúng Tôi | Theq Nail Centre" />
      <Header />

      <main className="flex-grow font-sans bg-white">
        {/* Banner/Hero */}
        <section className="relative w-full flex items-start bg-black overflow-hidden pt-40 md:pt-48 pb-20 md:pb-24">
          <div className="absolute inset-0 w-full h-full opacity-40 z-1">
            <Image
              src="/images/Ban-banner-web-3-1.png"
              alt="Theq Introduction Banner"
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
        <section className="py-16 md:py-20 bg-white px-4 md:px-[10%] text-left font-sans border-t border-gray-100">
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
                  alt="Theq Workshop"
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
                  alt="Theq Clinic"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-20 bg-white px-4 md:px-[10%] text-left font-sans border-b border-gray-150/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
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
                      Theq Clinic chính thức ra mắt tại TP. Hồ Chí Minh với định hướng trở thành hệ thống làm đẹp chất lượng cao, tập trung chăm sóc da và điều trị không xâm lấn.
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

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Facilities Section */}
        <section className="py-16 md:py-20 bg-[#faf8f5] px-4 md:px-[10%] text-left font-sans border-b border-gray-150/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
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

        {/* Model Carousel Section (Clone from theq.com.vn) */}
        <AboutHeroCarousel 
          eyebrow={settings.about_carousel_eyebrow}
          title={settings.about_carousel_title}
          realResults={realResults}
        />

        {/* Dynamic Doctors Carousel Section */}
        {doctors && doctors.length > 0 && (
          <section className="bg-white border-t border-gray-100">
            <div className="pt-16 md:pt-20 text-center max-w-2xl mx-auto -mb-12">
              <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
                {settings.doctors_intro_eyebrow || "ĐỘI NGŨ CHUYÊN GIA"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-dark-bg">
                {settings.doctors_intro_title || "Hội Đồng Bác Sĩ Đầu Ngành"}
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
            </div>
            <DoctorsCarousel doctors={doctors} hideHeader={true} />
          </section>
        )}

        {/* Locations and Signups */}
        <ConsultLocations />
      </main>

      <Footer />
    </>
  );
}
