import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/config/ReactQueryClientProvider";
import { Header } from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="ko">
      <ReactQueryClientProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
