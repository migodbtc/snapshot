import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miguel Justin | Portfolio",
  description: "Miguel Justin Bunda’s portfolio website, showcasing selected web projects, technical skills, professional experience, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable} ${geistMono.variable} 
        h-full antialiased
        scrollbar-track-slate-50 dark:scrollbar-track-slate-950
        scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700
      `}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
