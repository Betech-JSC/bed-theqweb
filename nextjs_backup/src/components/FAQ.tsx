"use client";

import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "../components/icons";

interface FAQItem {
  q: string;
  a: string;
}

export const FAQ: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleFAQ = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const faqs: FAQItem[] = [
    {
      q: "Quy trình thăm khám tại KT Beauty Medical Centre như thế nào?",
      a: "Tất cả khách hàng đến với KT Beauty đều được đón tiếp theo quy trình chuẩn y khoa. Bạn sẽ được Bác sĩ chuyên khoa trực tiếp soi da, tư vấn tình trạng và thiết kế phác đồ điều trị riêng biệt. Trung tâm cam kết tính minh bạch trong chỉ định và sử dụng các sản phẩm chính hãng.",
    },
    {
      q: "KT Beauty Medical Centre có cam kết hiệu quả điều trị không?",
      a: "Chúng tôi luôn cam kết chất lượng điều trị bằng văn bản dựa trên tình trạng lâm sàng thực tế của khách hàng. Tất cả dịch vụ phẫu thuật hay điều trị công nghệ cao đều đi kèm chế độ bảo hành và chăm sóc hậu phẫu chu đáo.",
    },
    {
      q: "Các công nghệ điều trị tại trung tâm có đạt chuẩn y khoa không?",
      a: "100% máy móc và công nghệ tại KT Beauty Medical Centre đều được chứng nhận FDA (Hoa Kỳ) và CE (Châu Âu) về tính an toàn và hiệu quả, được chuyển giao chính hãng trực tiếp từ các tập đoàn y tế thẩm mỹ lớn.",
    },
    {
      q: "Chi phí các dịch vụ tại KT Beauty như thế nào?",
      a: "Chi phí được công khai rõ ràng trong quá trình tư vấn và không phát sinh thêm bất kỳ khoản phụ thu nào trong suốt liệu trình. Chúng tôi cũng thường xuyên có các chương trình ưu đãi tri ân và hỗ trợ trả góp 0% lãi suất.",
    },
    {
      q: "Tôi cần lưu ý gì sau khi thực hiện dịch vụ?",
      a: "Sau mỗi dịch vụ, điều dưỡng viên sẽ hướng dẫn chi tiết chế độ ăn uống, sinh hoạt và vệ sinh vùng điều trị. Bạn cũng sẽ nhận được cẩm nang hướng dẫn chăm sóc tại nhà và lịch hẹn tái khám định kỳ miễn phí.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-[10%] font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
            Hỏi Đáp Y Khoa
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-dark-bg">
            FAQ – Quyền Lợi & Cam Kết
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className="border-b border-beige-bg pb-4 transition-all duration-300"
              >
                {/* Header Question Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center py-4 text-left font-serif font-bold text-base md:text-lg text-dark-bg focus:outline-none"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className="text-gold flex-shrink-0">
                    {isOpen ? <MinusIcon size={18} /> : <PlusIcon size={18} />}
                  </div>
                </button>

                {/* Content Panel (Answer) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
