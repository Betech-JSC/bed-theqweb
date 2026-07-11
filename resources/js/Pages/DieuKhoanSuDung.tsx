import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ChevronRight } from "lucide-react";

export default function DieuKhoanSuDungPage() {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};
  
  const defaultContent = `<div>
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">1. Chấp thuận điều khoản</h2>
              <p class="mb-4">
                Bằng việc truy cập, duyệt website hoặc sử dụng bất kỳ dịch vụ trực tuyến nào do KT Beauty Medical Centre cung cấp, người dùng đồng ý tuân thủ toàn bộ các điều khoản, điều kiện và thông báo được quy định tại đây. Nếu bạn không đồng ý với các điều khoản này, vui lòng ngừng sử dụng website.
              </p>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">2. Sở hữu trí tuệ</h2>
              <ul class="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Toàn bộ nội dung trên website bao gồm nhưng không giới hạn ở: văn bản, hình ảnh, video, đồ họa, logo, thiết kế và giao diện thuộc quyền sở hữu hợp pháp của KT Beauty Medical Centre (CÔNG TY TNHH KHÁNH MINH GROUP).</li>
                <li>Mọi hành vi sao chép, trích dẫn, phân phối hoặc sử dụng thương mại các tài nguyên trên website khi chưa có sự đồng ý bằng văn bản của chúng tôi đều là vi phạm pháp luật.</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">3. Giới hạn trách nhiệm và bản chất thông tin</h2>
              <ul class="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Các kiến thức, bài viết hướng dẫn chăm sóc da hoặc thông tin dịch vụ trên website mang tính chất tham khảo, không thể thay thế cho việc thăm khám, chẩn đoán, tư vấn và phác đồ điều trị chuyên môn trực tiếp từ bác sĩ.</li>
                <li>KT Beauty Medical Centre nỗ lực đảm bảo tính chính xác của thông tin trên website nhưng không chịu trách nhiệm pháp lý đối với bất kỳ hậu quả nào phát sinh từ việc người dùng tự ý áp dụng thông tin mà không qua tư vấn y khoa chuyên môn.</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">4. Quy định về hành vi của người dùng</h2>
              <p class="mb-4">Người dùng cam kết không thực hiện các hành vi sau khi truy cập website:</p>
              <ul class="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Sử dụng bất kỳ thiết bị, phần mềm nào nhằm can thiệp, phá hoại hoặc làm gián đoạn hoạt động của website.</li>
                <li>Đăng tải, truyền bá các nội dung vi phạm pháp luật, thuần phong mỹ tục, hoặc bôi nhọ uy tín của tổ chức, cá nhân khác.</li>
                <li>Thu thập thông tin của người dùng khác trên website khi chưa được sự đồng ý của họ.</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">5. Thay đổi điều khoản</h2>
              <p class="mb-4">
                KT Beauty Medical Centre có quyền chỉnh sửa, cập nhật nội dung Điều khoản sử dụng này vào bất kỳ lúc nào mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
              </p>
            </div>`;

  const content = settings.policy_dieu_khoan_su_dung || defaultContent;

  return (
    <>
      <Head title="Điều Khoản Sử Dụng | KT Beauty" />
      <Header />
      <main className="flex-grow font-sans bg-white">
        {/* Banner/Hero */}
        <section className="relative w-full flex items-center bg-dark-bg text-white overflow-hidden pt-44 md:pt-52 pb-16 md:pb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/95 to-gold/10 z-10" />
          <div className="relative z-20 max-w-4xl mx-auto px-4 w-full text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-gold mb-3 font-semibold">
              <Link href="/" className="hover:underline">Trang chủ</Link>
              <ChevronRight size={12} className="text-gray-400" />
              <span className="text-white">Điều khoản sử dụng</span>
            </div>
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white">
              Điều Khoản Sử Dụng
            </h1>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-16 px-4 md:px-0">
          <div 
            className="max-w-3xl mx-auto text-left text-gray-700 leading-relaxed font-light text-sm md:text-base space-y-8 rich-text-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
