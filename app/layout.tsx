import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-v2-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-v2-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://migueljustin.vercel.app"),
  title: "Miguel Justin Bunda — Software Engineer",
  description:
    "Official portfolio of Miguel Justin Bunda showcasing full-stack engineering, cloud architecture, and technical projects.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Miguel Justin Bunda — Software Engineer",
    description:
      "Official portfolio of Miguel Justin Bunda showcasing full-stack engineering, cloud architecture, and technical projects.",
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
  themeColor: "#0a0a0a",
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
        ${jakartaSans.variable} ${jetbrainsMono.variable}
        h-full antialiased dark
      `}
    >
      {/* Scrollbar styling for v2: neutral dark bg and neutral lightish thumb */}
      <head>
        <style>{`
        * {
          scrollbar-width: thin;
          scrollbar-color: #737373 #0a0a0a;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #525252;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #737373;
        }
      `}</style>
      </head>
      <body
        className="min-h-full flex flex-col bg-neutral-950 text-slate-100 selection:bg-rose-800/30 selection:text-rose-200 overflow-x-hidden"
        style={{
          fontFamily:
            "var(--font-v2-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
