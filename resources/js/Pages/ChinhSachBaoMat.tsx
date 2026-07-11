import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ChevronRight } from "lucide-react";

export default function ChinhSachBaoMatPage() {
  const { props } = usePage();
  const settings = (props.settings as Record<string, string>) || {};

  const defaultContent = `<div>
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">1. Mục đích và phạm vi thu thập thông tin</h2>
              <p class="mb-4">
                KT Beauty Medical Centre (thuộc sở hữu của CÔNG TY TNHH KHÁNH MINH GROUP) thực hiện việc thu thập thông tin cá nhân của khách hàng khi khách hàng tương tác, đăng ký tư vấn hoặc đặt lịch dịch vụ trên website.
              </p>
              <ul class="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Phạm vi dữ liệu thu thập bao gồm: Họ và tên, số điện thoại, địa chỉ email, nhu cầu tư vấn hoặc các thông tin khác do khách hàng chủ động cung cấp qua biểu mẫu trực tuyến.</li>
                <li>Mọi thông tin cung cấp phải đảm bảo tính chính xác và hợp pháp. KT Beauty Medical Centre không chịu trách nhiệm liên quan đến pháp luật của thông tin khai báo.</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">2. Phạm vi sử dụng thông tin</h2>
              <p class="mb-4">Website sử dụng thông tin khách hàng cung cấp để:</p>
              <ul class="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Liên hệ xác nhận lịch hẹn, tư vấn dịch vụ theo nhu cầu của khách hàng.</li>
                <li>Cung cấp các thông tin chăm sóc khách hàng, chương trình ưu đãi (nếu có sự đồng ý của khách hàng).</li>
                <li>Giải quyết các khiếu nại, thắc mắc hoặc các vấn đề phát sinh liên quan đến việc sử dụng dịch vụ.</li>
                <li>Nâng cao chất lượng dịch vụ và tối ưu hóa trải nghiệm trên website.</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">3. Thời gian lưu trữ thông tin</h2>
              <p class="mb-4">
                Dữ liệu cá nhân của khách hàng sẽ được lưu trữ bảo mật trên hệ thống nội bộ của KT Beauty Medical Centre cho đến khi có yêu cầu hủy bỏ từ phía khách hàng hoặc khi mục đích thu thập không còn phù hợp với quy định của pháp luật.
              </p>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">4. Những người hoặc tổ chức có thể được tiếp cận thông tin</h2>
              <p class="mb-4">
                KT Beauty Medical Centre cam kết không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào khác, ngoại trừ các trường hợp sau:
              </p>
              <ul class="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Các nhân viên nội bộ thuộc hệ thống KT Beauty Medical Centre được phân công trách nhiệm chăm sóc khách hàng.</li>
                <li>Cung cấp theo yêu cầu bằng văn bản của cơ quan Nhà nước có thẩm quyền theo quy định của pháp luật Việt Nam.</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">5. Địa chỉ của đơn vị thu thập và quản lý thông tin</h2>
              <ul class="list-none pl-4 space-y-2 text-gray-600">
                <li><strong class="text-dark-bg font-semibold">Tên đơn vị:</strong> CÔNG TY TNHH KHÁNH MINH GROUP</li>
                <li><strong class="text-dark-bg font-semibold">Mã số thuế:</strong> 0318660537</li>
                <li><strong class="text-dark-bg font-semibold">Địa chỉ trụ sở:</strong> Số 1, Đường Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam.</li>
                <li><strong class="text-dark-bg font-semibold">Hotline:</strong> 19005006</li>
                <li><strong class="text-dark-bg font-semibold">Email:</strong> cskh@ktbeautycentre.com.vn</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">6. Phương thức để người dùng tiếp cận và chỉnh sửa dữ liệu</h2>
              <p class="mb-4">
                Khách hàng có quyền yêu cầu kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách:
              </p>
              <ul class="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Gọi điện trực tiếp đến hotline: 19005006</li>
                <li>Gửi email yêu cầu về địa chỉ: cskh@ktbeautycentre.com.vn. Ban quản trị website có trách nhiệm hỗ trợ khách hàng thực hiện các quyền này sớm nhất.</li>
              </ul>
            </div>

            <div class="mt-8">
              <h2 class="text-xl font-serif font-bold text-dark-bg mb-4">7. Cam kết bảo mật thông tin cá nhân khách hàng</h2>
              <p class="mb-4">
                Thông tin cá nhân của khách hàng trên website được cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân này và quy định của pháp luật.
              </p>
              <p class="mb-4">
                Chúng tôi áp dụng các biện pháp kỹ thuật phù hợp nhằm hạn chế tối đa các rủi ro về truy cập trái phép hoặc rò rỉ dữ liệu. Tuy nhiên, trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân, chúng tôi sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho khách hàng được biết.
              </p>
            </div>`;

  const content = settings.policy_chinh_sach_bao_mat || defaultContent;

  return (
    <>
      <Head title="Chính Sách Bảo Mật | KT Beauty" />
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
              <span className="text-white">Chính sách bảo mật</span>
            </div>
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white">
              Chính Sách Bảo Mật
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
