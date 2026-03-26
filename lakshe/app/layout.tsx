import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Bentham } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bentham = Bentham({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bentham",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lakshe.co",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${bentham.variable} antialiased font-sans`}
      >
        {/* <Navbar/> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
