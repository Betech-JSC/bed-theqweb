import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Chính Sách Thanh Toán | KT Beauty Medical Centre",
  description: "Các hình thức thanh toán được chấp nhận khi giao dịch sử dụng dịch vụ trực tiếp tại trung tâm KT Beauty Medical Centre.",
};

export default function ChinhSachThanhToanPage() {
  return (
    <>
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
              <span className="text-white">Chính sách thanh toán</span>
            </div>
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white">
              Chính Sách Thanh Toán
            </h1>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-16 px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-left text-gray-700 leading-relaxed font-light text-sm md:text-base space-y-8">
            <p>
              KT Beauty Medical Centre hướng tới việc mang lại sự thuận tiện và an tâm nhất cho khách hàng. Hiện tại, website của chúng tôi hoạt động với tính năng cung cấp thông tin và hỗ trợ đặt lịch hẹn trực tuyến, không yêu cầu khách hàng phải thanh toán trực tuyến hoặc đặt cọc trước trên website.
            </p>
            <p>
              Quy trình thanh toán chi phí dịch vụ được thực hiện hoàn toàn trực tiếp tại trung tâm theo các bước sau:
            </p>

            <div>
              <h2 className="text-xl font-serif font-bold text-dark-bg mb-4">1. Các hình thức thanh toán được chấp nhận</h2>
              <p className="mb-4">
                Khi sử dụng dịch vụ trực tiếp tại KT Beauty Medical Centre, khách hàng có thể lựa chọn các hình thức thanh toán linh hoạt bao gồm:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li><strong className="text-dark-bg">Tiền mặt:</strong> Thanh toán trực tiếp tại quầy thu ngân của trung tâm.</li>
                <li><strong className="text-dark-bg">Chuyển khoản Ngân hàng:</strong> Khách hàng chuyển khoản vào tài khoản ngân hàng chính thức của CÔNG TY TNHH KHÁNH MINH GROUP (Thông tin tài khoản sẽ được nhân viên thu ngân cung cấp trực tiếp tại quầy).</li>
                <li><strong className="text-dark-bg">Thanh toán bằng thẻ (POS):</strong> Chấp nhận các loại thẻ nội địa (ATM) và thẻ quốc tế (Visa, Mastercard,…) theo hệ thống máy POS tại trung tâm.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-dark-bg mb-4">2. Xác nhận chi phí và hóa đơn</h2>
              <ul className="list-disc list-inside pl-4 space-y-2 text-gray-600">
                <li>Mọi chi phí dịch vụ đều được tư vấn rõ ràng, công khai và có sự đồng ý của khách hàng trước khi tiến hành thực hiện dịch vụ.</li>
                <li>Sau khi hoàn tất thanh toán, khách hàng sẽ nhận được hóa đơn/phiếu thu hợp lệ từ KT Beauty Medical Centre. Đối với khách hàng có nhu cầu xuất hóa đơn giá trị gia tăng (VAT), vui lòng thông báo với nhân viên thu ngân tại thời điểm thanh toán để được hỗ trợ theo quy định pháp luật.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
