import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { FloatingWidgets } from "../components/FloatingWidgets";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KT Beauty Medical Centre | Thẩm Mỹ Chuẩn Y Khoa",
  description: "KT Beauty Medical Centre mang đến cho bạn dịch vụ thẩm mỹ từ da liễu thẩm mỹ, thẩm mỹ nội khoa, phẫu thuật thẩm mỹ cho đến phun xăm thẩm mỹ chất lượng 5 sao.",
  icons: {
    icon: "/images/Favicon_KT.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <FloatingWidgets />
      </body>
    </html>
  );
}


