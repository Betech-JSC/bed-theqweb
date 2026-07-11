import React from "react";
import { Link, Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { ChevronRight } from "lucide-react";



export default function ChinhSachHoanTienPage() {
  return (
    <><Head title="Chính Sách Hoàn Tiền | KT Beauty" />
      <Header />
      <main className="flex-grow font-sans bg-white">
        {/* Banner/Hero */}
        <section className="relative w-full h-[30vh] min-h-[220px] flex items-center bg-dark-bg text-white overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/95 to-gold/10 z-10" />
          <div className="relative z-20 max-w-4xl mx-auto px-4 w-full text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-gold mb-3 font-semibold">
              <Link href="/" className="hover:underline">Trang chủ</Link>
              <ChevronRight size={12} className="text-gray-400" />
              <span className="text-white">Chính sách hoàn tiền</span>
            </div>
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white">
              Chính Sách Hoàn Tiền
            </h1>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-16 px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-left text-gray-700 leading-relaxed font-light text-sm md:text-base space-y-8">
            <div>
              <h2 className="text-xl font-serif font-bold text-dark-bg mb-4">1. Nguyên tắc chung</h2>
              <p>
                Do đặc thù các dịch vụ tại KT Beauty Medical Centre là dịch vụ chăm sóc sức khỏe và thẩm mỹ được thực hiện trực tiếp, chúng tôi không áp dụng chính sách hoàn trả tiền mặt hoặc hủy ngang đối với các dịch vụ đã được thực hiện xong dựa trên sự đồng ý trước đó của khách hàng.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-dark-bg mb-4">2. Các trường hợp được xem xét giải quyết hoàn tiền/đổi dịch vụ</h2>
              <p className="mb-4">
                KT Beauty Medical Centre sẽ tiếp nhận và xử lý hoàn tiền hoặc chuyển đổi giá trị dịch vụ tương đương trong các trường hợp đặc biệt sau:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li><strong className="text-dark-bg">Lỗi giao dịch tài chính:</strong> Khách hàng chuyển khoản thừa, chuyển khoản trùng lặp do lỗi hệ thống ngân hàng hoặc nhầm lẫn trong quá trình thao tác.</li>
                <li><strong className="text-dark-bg">Lý do bất khả kháng từ phía Trung tâm:</strong> Lịch hẹn bị hủy từ phía trung tâm mà không thể sắp xếp được lịch thay thế phù hợp với khách hàng, hoặc trung tâm không đáp ứng được đúng dịch vụ như đã cam kết trong hợp đồng gói dịch vụ (nếu có).</li>
                <li><strong className="text-dark-bg">Lý do y khoa từ phía khách hàng:</strong> Khách hàng đã mua gói dịch vụ nhưng phát sinh tình trạng sức khỏe đột xuất (có xác nhận của bác sĩ chuyên khoa) chỉ định không thể tiếp tục sử dụng liệu trình thẩm mỹ đó.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-dark-bg mb-4">3. Quy trình và thời gian xử lý hoàn tiền</h2>
              <ul className="list-decimal list-inside pl-4 space-y-2 text-gray-600">
                <li><strong className="text-dark-bg">Bước 1:</strong> Khách hàng gửi yêu cầu hỗ trợ qua Hotline: 19005006 hoặc đến trực tiếp trung tâm để lập biên bản xác nhận.</li>
                <li><strong className="text-dark-bg">Bước 2:</strong> Bộ phận kế toán và CSKH của KT Beauty Medical Centre sẽ tiến hành xác minh thông tin giao dịch trong vòng 03 đến 05 ngày làm việc.</li>
                <li><strong className="text-dark-bg">Bước 3:</strong> Nếu yêu cầu hợp lệ, tiền sẽ được hoàn trả lại cho khách hàng thông qua hình thức chuyển khoản ngân hàng trong vòng 07 ngày làm việc tiếp theo.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
