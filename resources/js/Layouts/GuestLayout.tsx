import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen bg-[#fbfaf8] text-dark-bg font-sans">
            {/* Left Column - Beautiful Luxury Visuals (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#171717] flex-col justify-between p-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#121212] via-[#1a1815] to-[#2a241e] z-10" />

                {/* Left Column Content */}
                <div className="relative z-20">
                    <Link href="/" className="inline-block font-serif text-2xl font-bold text-gold tracking-widest uppercase">
                        CMS BLOG SEO
                    </Link>
                </div>

                <div className="relative z-20 max-w-md my-auto space-y-6">
                    <div className="inline-block px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-semibold tracking-widest uppercase">
                        Editorial & SEO Workspace
                    </div>
                    <h1 className="font-serif text-4xl xl:text-5xl text-white font-medium leading-tight tracking-wide">
                        Hệ thống Quản trị <span className="text-gold italic font-normal">Bài viết SEO</span>
                    </h1>
                    <p className="text-gray-300 text-sm xl:text-base leading-relaxed font-light">
                        Không gian biên tập nội dung chuyên sâu, chấm điểm SEO On-Page theo thời gian thực và quản lý xuất bản bài viết chuẩn tìm kiếm.
                    </p>
                </div>

                <div className="relative z-20 flex justify-between items-center text-xs text-gray-500 font-light border-t border-white/10 pt-6">
                    <span>© {new Date().getFullYear()} Blog CMS. Bảo lưu mọi quyền.</span>
                    <div className="flex gap-4">
                        <a href="/" className="hover:text-gold transition-colors">Trang chủ Blog</a>
                        <a href="/sitemap.xml" className="hover:text-gold transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>

            {/* Right Column - Elegant Form Container */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-16 bg-white lg:bg-[#fbfaf9] relative">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-beige-bg/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Mobile & Tablet Logo Header */}
                <div className="lg:hidden mb-10 text-center relative z-20">
                    <Link href="/" className="inline-block font-serif text-2xl font-bold text-gold tracking-widest uppercase">
                        CMS BLOG SEO
                    </Link>
                </div>

                {/* The Form Card */}
                <div className="w-full max-w-[440px] bg-white rounded-2xl p-8 lg:p-10 border border-gray-150/40 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative z-20 transition-all duration-300">
                    {children}
                </div>
            </div>
        </div>
    );
}

