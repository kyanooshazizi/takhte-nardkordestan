import { Vazirmatn } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const font = Vazirmatn({ subsets: ["arabic", "latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "خرید تخته‌نرد | تخته‌نرد ایران", template: "%s | تخته‌نرد ایران" },
  description: "خرید انواع تخته‌نرد چوبی، چرمی و مسافرتی با ضمانت اصالت و ارسال سریع.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={font.className}>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <footer className="footer">© تخته‌نرد ایران</footer>
      </body>
    </html>
  );
}
