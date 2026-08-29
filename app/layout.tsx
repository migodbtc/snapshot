import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://migueljustin.vercel.app"),
  title: "Miguel Justin | Portfolio",
  description:
    "Software engineer portfolio for Miguel Justin Bunda, featuring selected projects, technical skills, experience, and contact information.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Miguel Justin | Portfolio",
    description:
      "Software engineer portfolio for Miguel Justin Bunda, featuring selected projects, technical skills, experience, and contact information.",
    url: "https://migueljustin.vercel.app",
    siteName: "Miguel Justin | Portfolio",
    images: [
      {
        url: "/images/hero_picture.jpg",
        width: 1200,
        height: 630,
        alt: "Miguel Justin portfolio preview",
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
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
