"use client";

import {
  Code2,
  Code,
  BriefcaseBusinessIcon,
  FileText,
  Mail,
  User,
  Braces,
  GraduationCap,
  Briefcase,
  Newspaper,
  Eye,
  Laptop,
  X,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// ─── Legal Modal ─────────────────────────────────────────────────────────────

type LegalModal = "tos" | "privacy" | null;

type LegalModalProps = {
  open: LegalModal;
  onClose: () => void;
};

const LegalModal = ({ open, onClose }: LegalModalProps) => {
  const isTos = open === "tos";
  const isPrivacy = open === "privacy";
  const isVisible = isTos || isPrivacy;

  return (
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        backdrop-blur-xs
        transition-opacity duration-300
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative overflow-hidden
          w-[90%] max-w-2xl
          max-h-[80vh]
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50
          dark:bg-slate-950/70
          p-6
          flex flex-col
          transition-all duration-300
          ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {/* Radial gradient layer */}
        <div className="absolute inset-0 -z-10 bg-radial from-slate-400/50 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {isTos ? (
              <>
                <ScrollText size={20} className="text-rose-700" />
                Terms of Service
              </>
            ) : (
              <>
                <ShieldCheck size={20} className="text-rose-700" />
                Privacy Policy
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="
              p-1.5
              text-slate-700 dark:text-slate-300
              hover:text-rose-800 dark:hover:text-rose-500
              hover:bg-rose-50 dark:hover:bg-rose-950/30
              rounded-md
              transition-colors
              cursor-pointer
            "
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto pr-1 flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
          {isTos && (
            <>
              <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wide font-semibold">
                Last updated: August 2026
              </p>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ScrollText size={14} className="text-rose-700" />
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing and using Snapshot, you accept and agree to be
                  bound by these Terms of Service. If you do not agree to these
                  terms, please do not use Snapshot.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ScrollText size={14} className="text-rose-700" />
                  2. Purpose of Snapshot
                </h3>
                <p>
                  Snapshot is a personal portfolio belonging to Miguel Justin
                  Bunda. It is intended solely for informational and
                  professional presentation purposes — showcasing skills,
                  projects, educational background, and work experience.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ScrollText size={14} className="text-rose-700" />
                  3. Intellectual Property
                </h3>
                <p>
                  All content on Snapshot, including but not limited to text,
                  images, code snippets, and design, is the property of Miguel
                  Justin Bunda unless otherwise credited. You may not reproduce,
                  distribute, or create derivative works from any content
                  without explicit written permission.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ScrollText size={14} className="text-rose-700" />
                  4. External Links
                </h3>
                <p>
                  Snapshot may contain links to third-party websites (e.g.,
                  GitHub, LinkedIn). These links are provided for convenience
                  only. Miguel Justin Bunda has no control over and assumes no
                  responsibility for the content or practices of any third-party
                  sites.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ScrollText size={14} className="text-rose-700" />
                  5. Disclaimer of Warranties
                </h3>
                <p>
                  Snapshot is provided "as is" without warranties of any kind.
                  Miguel Justin Bunda makes no warranties, expressed or implied,
                  and hereby disclaims all warranties including, without
                  limitation, implied warranties of merchantability and fitness
                  for a particular purpose.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ScrollText size={14} className="text-rose-700" />
                  6. Changes to Terms
                </h3>
                <p>
                  Miguel Justin Bunda reserves the right to update these Terms
                  of Service at any time without prior notice. Continued use of
                  Snapshot after any changes constitutes your acceptance of the
                  new terms.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ScrollText size={14} className="text-rose-700" />
                  7. Contact
                </h3>
                <p>
                  For any questions regarding these Terms, please reach out via
                  the{" "}
                  <Link
                    href="/contact"
                    className="text-rose-700 hover:underline"
                    onClick={onClose}
                  >
                    Contact page
                  </Link>{" "}
                  or email{" "}
                  <a
                    href="mailto:migueljustin.bunda@gmail.com"
                    className="text-rose-700 hover:underline"
                  >
                    migueljustin.bunda@gmail.com
                  </a>
                  .
                </p>
              </section>
            </>
          )}

          {isPrivacy && (
            <>
              <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wide font-semibold">
                Last updated: August 2026
              </p>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-rose-700" />
                  1. Overview
                </h3>
                <p>
                  Your privacy is important. This Privacy Policy explains what
                  information is collected when you visit this portfolio website
                  and how it is used.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-rose-700" />
                  2. Information Collected
                </h3>
                <p>
                  Snapshot does not actively collect personal data. However,
                  standard web server logs may automatically record technical
                  information such as your IP address, browser type, referring
                  URL, and pages visited. This data is used solely for
                  maintaining site security and performance.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-rose-700" />
                  3. Contact Form
                </h3>
                <p>
                  If you use the Contact page to send a message, the information
                  you provide (name, email, message) will be used solely to
                  respond to your inquiry. This information will not be shared
                  with third parties.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-rose-700" />
                  4. Cookies
                </h3>
                <p>
                  Snapshot may use minimal cookies to remember user preferences
                  (e.g., dark/light mode). No tracking cookies or advertising
                  cookies are used. You may disable cookies in your browser
                  settings at any time.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-rose-700" />
                  5. Third-Party Services
                </h3>
                <p>
                  Snapshot links to third-party services such as GitHub and
                  LinkedIn. These services have their own privacy policies.
                  Miguel Justin Bunda is not responsible for the privacy
                  practices of these external sites.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-rose-700" />
                  6. Data Security
                </h3>
                <p>
                  Reasonable precautions are taken to protect any information
                  processed through Snapshot. However, no method of
                  transmission over the internet is 100% secure, and absolute
                  security cannot be guaranteed.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-rose-700" />
                  7. Changes to This Policy
                </h3>
                <p>
                  This Privacy Policy may be updated periodically. Any changes
                  will be reflected on this page with an updated date. Continued
                  use of Snapshot after changes constitutes acceptance of the
                  revised policy.
                </p>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-rose-700" />
                  8. Contact
                </h3>
                <p>
                  For privacy-related questions, please reach out via the{" "}
                  <Link
                    href="/contact"
                    className="text-rose-700 hover:underline"
                    onClick={onClose}
                  >
                    Contact page
                  </Link>{" "}
                  or email{" "}
                  <a
                    href="mailto:migueljustin.bunda@gmail.com"
                    className="text-rose-700 hover:underline"
                  >
                    migueljustin.bunda@gmail.com
                  </a>
                  .
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────

// Footer: The footer to be used throughout the website.
export const AppFooter = () => {
  const [legalModal, setLegalModal] = useState<LegalModal>(null);

  return (
    <>
      <LegalModal open={legalModal} onClose={() => setLegalModal(null)} />

      <footer
        className="
      relative z-0
      flex flex-col
      px-8 md:px-8 
      py-6
      w-full
      bg-slate-100
      dark:bg-slate-950
      border-t
      border-slate-300
      dark:border-slate-800
    "
      >
        {/* Upper Layout - Medium/Large */}
        <div className="hidden sm:grid w-full lg:w-[90%] lg:mx-auto grid-cols-3 gap-8 py-4">
          {/* Branding */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex flex-col select-none cursor-pointer">
              <span className="font-bold text-xl uppercase tracking-wide flex flex-row gap-1">
                <span className="text-slate-950 dark:text-slate-50 text-lg sm:text-xl">
                  <Image
                    src="/images/favicons/favicon-32x32.png"
                    alt="Site Icon"
                    width={28}
                    height={28}
                  />
                </span>
                <span className="text-slate-950 dark:text-slate-50 flex flex-row">
                  SNAP<div className="text-rose-800">SHOT</div>
                </span>
                <span className="flex h-fill items-end text-sm text-slate-500">
                  BY MIGO
                </span>
              </span>
              <span className="text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wide font-semibold">
                A Career-focused Website
              </span>
            </Link>

            <p className="text-base text-slate-600 dark:text-slate-400 max-w-xs text-justify">
              The personal portfolio of Miguel Justin Bunda — a software engineer
              documenting his journey through building software, exploring
              technology, and growing within the industry.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
              Navigation
            </h3>

            <Link
              href="/about"
              className="flex items-center gap-2 hover:underline cursor-pointer"
            >
              <User size={16} />
              About
            </Link>

            <Link
              href="/skills"
              className="flex items-center gap-2 hover:underline cursor-pointer"
            >
              <Braces size={16} />
              Skills
            </Link>

            <Link
              href="/education"
              className="flex items-center gap-2 hover:underline cursor-pointer"
            >
              <GraduationCap size={16} />
              Education
            </Link>

            <Link
              href="/experience"
              className="flex items-center gap-2 hover:underline cursor-pointer"
            >
              <Briefcase size={16} />
              Experience
            </Link>

            <Link
              href="/projects"
              className="flex items-center gap-2 hover:underline cursor-pointer"
            >
              <Laptop size={16} />
              Projects
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-2 hover:underline cursor-pointer"
            >
              <Newspaper size={16} />
              Blog
            </Link>

            <Link
              href="/communeye"
              className="flex items-center gap-2 hover:underline cursor-pointer"
            >
              <Eye size={16} />
              Communeye
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 hover:underline cursor-pointer"
            >
              <Mail size={16} />
              Contact
            </Link>
          </div>

          {/* External Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wide text-sm">Links</h3>

            <a
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              target="_blank"
              href="https://www.github.com/migodbtc"
            >
              <Code size={14} />
              GitHub
            </a>

            <a
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              target="_blank"
              href="https://www.linkedin.com/in/migueljustin"
            >
              <BriefcaseBusinessIcon size={14} />
              LinkedIn
            </a>

            <a
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              href="https://drive.google.com/file/d/1FneKVe1A4jso6aTLsWh6M8xKUowwf5OY/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={14} />
              Resume
            </a>

            <a
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              href="mailto:migueljustin.bunda@gmail.com?subject=Inquiry%20via%20migueljustin.vercel.app"
            >
              <Mail size={14} />
              Email
            </a>
          </div>
        </div>

        {/* Upper Layout - Small */}
        <div className="grid sm:hidden gap-6 py-4">
          {/* Branding */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex flex-col select-none mx-auto cursor-pointer"
            >
              <span className="font-bold text-xl uppercase tracking-wide flex flex-row gap-1">
                <span className="text-slate-950 dark:text-slate-50 text-lg sm:text-xl">
                  <Image
                    src="/images/favicons/favicon-32x32.png"
                    alt="Site Icon"
                    width={28}
                    height={28}
                  />
                </span>
                <span className="text-slate-950 dark:text-slate-50 flex flex-row">
                  SNAP<div className="text-rose-800">SHOT</div>
                </span>
                <span className="flex h-fill items-end text-sm text-slate-500">
                  BY MIGO
                </span>
              </span>
              <span className="w-fill text-center text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wide font-semibold">
                A Career-focused Website
              </span>
            </Link>

            <p className="text-base text-center text-slate-600 dark:text-slate-400">
              The personal portfolio of Miguel Justin Bunda — a software engineer
              documenting his journey through building software, exploring
              technology, and growing within the industry.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Navigation */}
            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase tracking-wide text-sm">
                Navigation
              </h3>

              <Link
                href="/about"
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              >
                <User size={14} />
                About
              </Link>

              <Link
                href="/skills"
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              >
                <Braces size={14} />
                Skills
              </Link>

              <Link
                href="/education"
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              >
                <GraduationCap size={14} />
                Education
              </Link>

              <Link
                href="/experience"
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              >
                <Briefcase size={14} />
                Experience
              </Link>

              <Link
                href="/projects"
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              >
                <Laptop size={14} />
                Projects
              </Link>

              <Link
                href="/blog"
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              >
                <Newspaper size={14} />
                Blog
              </Link>

              <Link
                href="/communeye"
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              >
                <Eye size={14} />
                Communeye
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
              >
                <Mail size={14} />
                Contact
              </Link>
            </div>

            {/* External Links */}
            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase tracking-wide text-sm">Links</h3>

              <a
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
                target="_blank"
                href="https://www.github.com/migodbtc"
              >
                <Code size={14} />
                GitHub
              </a>

              <a
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
                target="_blank"
                href="https://www.linkedin.com/in/migueljustin"
              >
                <BriefcaseBusinessIcon size={14} />
                LinkedIn
              </a>

              <a
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
                href="https://drive.google.com/file/d/1FneKVe1A4jso6aTLsWh6M8xKUowwf5OY/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={14} />
                Resume
              </a>

              <a
                className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
                href="mailto:migueljustin.bunda@gmail.com?subject=Inquiry%20via%20migueljustin.vercel.app"
              >
                <Mail size={14} />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Medium/Large */}
        <div
          className="
            hidden sm:flex
            w-full
            lg:w-[90%]
            lg:mx-auto
            pt-6
            mt-4
            border-t
            border-slate-300
            dark:border-slate-800
            text-sm
          "
        >
          <button className="hover:underline cursor-pointer">
            © 2026 Miguel Justin
          </button>

          <div className="flex-1 flex justify-end gap-6">
            <button
              className="hover:underline cursor-pointer flex items-center gap-1.5"
              onClick={() => setLegalModal("tos")}
            >
              <ScrollText size={13} />
              Terms of Service
            </button>

            <button
              className="hover:underline cursor-pointer flex items-center gap-1.5"
              onClick={() => setLegalModal("privacy")}
            >
              <ShieldCheck size={13} />
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Bottom Footer - Small */}
        <div
          className="
            flex sm:hidden
            flex-col
            items-center
            gap-2
            pt-4
            mt-2
            border-t
            border-slate-300
            dark:border-slate-800
            text-xs
          "
        >
          <button className="hover:underline cursor-pointer">
            © 2026 Miguel Justin
          </button>

          <div className="flex gap-4">
            <button
              className="hover:underline cursor-pointer flex items-center gap-1"
              onClick={() => setLegalModal("tos")}
            >
              <ScrollText size={11} />
              Terms of Service
            </button>

            <button
              className="hover:underline cursor-pointer flex items-center gap-1"
              onClick={() => setLegalModal("privacy")}
            >
              <ShieldCheck size={11} />
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
