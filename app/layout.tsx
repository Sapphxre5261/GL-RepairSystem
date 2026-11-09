import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Sidebar from "@/app/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixMaster - ระบบแจ้งซ่อมบำรุง",
  description: "ระบบแจ้งซ่อมอุปกรณ์และอาคารสถานที่ออนไลน์",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans text-zinc-900">
        
        {/* 1. Navbar ด้านบนสุด (แสดงทุกหน้า) */}
        <Nav />

        {/* 2. พื้นที่หลักด้านล่าง แบ่งเป็น Sidebar และ เนื้อหา (Children) */}
        <div className="flex flex-1 min-h-[calc(100vh-73px)]">
          
          <main className="flex-1 flex flex-col bg-zinc-50 overflow-y-auto">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}