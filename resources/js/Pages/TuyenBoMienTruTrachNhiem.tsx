import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ChevronRight } from "lucide-react";

export default function TuyenBoMienTruTrachNhiemPage() {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};

  const defaultContent = `<div>
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">1. Về mặt thông tin trên Website</h2>
              <p class="mb-4">
                Mọi thông tin, bài viết, hình ảnh tư vấn khoa học được đăng tải trên website này chỉ mang tính chất tham khảo, chia sẻ kiến thức phổ thông và không được coi là lời khuyên, chẩn đoán, phác đồ điều trị thay thế cho các văn bản y khoa chính thức. Người dùng không được tự ý áp dụng các thông tin trên website để tự điều trị tại nhà khi chưa có sự thăm khám và chỉ định từ bác sĩ chuyên môn. Theq Nail Centre hoàn toàn miễn trừ trách nhiệm pháp lý đối với bất kỳ hậu quả nào do việc tự ý áp dụng thông tin của người dùng gây ra.
              </p>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">2. Về hiệu quả và kết quả dịch vụ</h2>
              <p class="mb-4">
                Y khoa và thẩm mỹ là những lĩnh vực phụ thuộc lớn vào yếu tố cơ địa. Kết quả thực tế của các liệu trình chăm sóc, điều trị da hoặc thẩm mỹ tại Theq Nail Centre có thể khác nhau tùy thuộc vào:
              </p>
              <ul class="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Cơ địa, thể trạng và cấu trúc da riêng biệt của mỗi khách hàng.</li>
                <li>Mức độ tuân thủ hướng dẫn chăm sóc sau dịch vụ tại nhà của khách hàng.</li>
                <li>Chế độ ăn uống, sinh hoạt và các yếu tố môi trường tác động ngoài tầm kiểm soát của trung tâm. Chúng tôi không đưa ra các cam kết mang tính chất tuyệt đối 100% cho tất cả các trường hợp khách hàng.</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">3. Về các liên kết ngoài (External Links)</h2>
              <p class="mb-4">
                Website có thể chứa các liên kết dẫn đến các website thuộc bên thứ ba nhằm mục đích cung cấp thêm nguồn tham khảo hữu ích cho người đọc. Theq Nail Centre không quản lý, không chịu trách nhiệm về nội dung, tính chính xác hay chính sách bảo mật của các website bên ngoài này.
              </p>
            </div>`;

  const content = settings.policy_tuyen_bo_mien_tru_trach_nhiem || defaultContent;

  return (
    <>
      <Head title="Tuyên Bố Miễn Trừ Trách Nhiệm | Theq" />
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
              <span className="text-white">Miễn trừ trách nhiệm</span>
            </div>
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white">
              Tuyên Bố Miễn Trừ Trách Nhiệm
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
