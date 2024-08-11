import type { Metadata } from "next";
import "./globals.css";
import ReactQueryClientProvider from "@/config/ReactQueryClientProvider";
import { Header } from "./components/Header";
import { nanumSquare } from "./utils/font";

export const metadata: Metadata = {
  title: "Do it",
  description: "할 일 목록을 관리하는 To Do 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanumSquare.variable} font-sans`}>
      <ReactQueryClientProvider>
        <body className="bg-[#F9FAFB]">
          <Header />
          {children}
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
