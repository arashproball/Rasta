import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "رستا | روان سالم و تاب‌آور",
  description: "پلتفرم سلامت روان، خودمراقبتی و تاب‌آوری ویژه دانشجویان علوم پزشکی",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
