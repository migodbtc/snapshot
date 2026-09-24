import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { V2Footer } from "./_components/V2Footer";

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
  title: "Miguel Justin Bunda — Software Engineer | v2 Experience",
  description:
    "Alternate v2 portfolio showcasing full-stack engineering, cloud architecture, and technical projects in a modern slate & rose aesthetic.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`
        ${jakartaSans.variable} ${jetbrainsMono.variable}
        relative min-h-screen w-full
        bg-neutral-950 text-slate-100
        font-sans antialiased
        selection:bg-rose-800/30 selection:text-rose-200
        overflow-x-hidden
      `}
      style={{
        fontFamily:
          "var(--font-v2-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Scrollbar styling for v2: neutral dark bg and neutral lightish thumb */}
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

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">{children}</div>

      {/* Footer */}
      <V2Footer />
    </div>
  );
}
