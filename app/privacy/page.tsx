import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { V2Navbar } from "@/app/v2/_components/V2Navbar";
import { V2Footer } from "@/app/v2/_components/V2Footer";

export const metadata: Metadata = {
  title: "Privacy Notice — Miguel Justin Bunda",
  description:
    "Privacy statement, data protection disclosures, and statutory rights under Philippine Republic Act No. 10173 (Data Privacy Act of 2012).",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-slate-200 flex flex-col justify-between">
      <V2Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 w-full flex-1">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-rose-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Compliance & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Privacy Statement
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: November 2026 · Governed by Philippine Republic Act No. 10173 (Data Privacy Act of 2012)
          </p>
        </header>

        <article className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-rose-500 font-mono text-sm">01.</span>
              Data Controller Information
            </h2>
            <p>
              This personal portfolio website (&ldquo;Snapshot&rdquo;) is owned and operated by{" "}
              <strong className="text-white">Miguel Justin Bunda</strong>, based in Mandaluyong City, Metro Manila, Philippines.
              The site exists solely to showcase software engineering credentials, architecture artifacts, open-source projects, and technical publications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-rose-500 font-mono text-sm">02.</span>
              Data Minimization & Zero Trackers
            </h2>
            <p>
              Snapshot operates under a strict data minimization principle:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
              <li><strong className="text-slate-200">Zero Behavioral Tracking</strong>: We do not deploy Google Analytics, Meta Pixels, session replay tools, or marketing cookies.</li>
              <li><strong className="text-slate-200">No Cookie Banners Required</strong>: We do not store persistent profiling cookies on your terminal equipment.</li>
              <li><strong className="text-slate-200">Edge Infrastructure Logs</strong>: Standard ephemeral request metadata (IP address, TLS cipher, user-agent) is processed automatically by our hosting platform (Vercel Edge) solely for DDoS mitigation, edge routing, and network security.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-rose-500 font-mono text-sm">03.</span>
              Communication & Direct Inquiries
            </h2>
            <p>
              When you initiate contact via direct email or the portfolio inquiry link, your email address, name, and message content are transmitted directly via your chosen email client to <code className="text-rose-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-white/10">migueljustin.bunda@gmail.com</code>.
              This information is used strictly to respond to professional opportunities, collaboration requests, and technical inquiries. It is never sold, leased, or disclosed to unauthorized third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-rose-500 font-mono text-sm">04.</span>
              Data Subject Rights (RA 10173 & GDPR)
            </h2>
            <p>
              In accordance with Section 16 of the Philippine Data Privacy Act (RA 10173) and Chapter III of the GDPR (where applicable), you are entitled to the following statutory rights regarding any personal information you provide:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
              <li><strong className="text-slate-200">Right to be Informed</strong>: You have the right to know how your information is collected and processed.</li>
              <li><strong className="text-slate-200">Right to Access</strong>: You may request confirmation and a copy of any personal data maintained about you.</li>
              <li><strong className="text-slate-200">Right to Rectification & Erasure</strong>: You may request the correction of inaccurate data or the immediate deletion of your correspondence records.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-8">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-rose-500 font-mono text-sm">05.</span>
              Contact & Inquiries
            </h2>
            <p>
              For any questions regarding this statement or to exercise your statutory privacy rights, please contact:
            </p>
            <p className="font-mono text-sm text-rose-400">
              Miguel Justin Bunda · <a href="mailto:migueljustin.bunda@gmail.com" className="underline hover:text-rose-300">migueljustin.bunda@gmail.com</a>
            </p>
          </section>
        </article>
      </main>

      <V2Footer />
    </div>
  );
}
