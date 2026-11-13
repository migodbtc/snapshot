"use client";

import {
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
  Sparkles,
  X,
  ScrollText,
  ShieldCheck,
  Compass,
  Link2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm rounded-lg"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative overflow-hidden
              w-[90%] max-w-2xl
              max-h-[80vh]
              rounded-2xl
              backdrop-blur-md
              bg-neutral-950/60
              p-6 sm:p-8
              flex flex-col
              shadow-2xl
            "
          >
            {/* Radial gradient layer */}
            <div className="absolute inset-0 -z-10 bg-radial from-neutral-800/30 via-neutral-900/10 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                {isTos ? (
                  <>
                    <ScrollText size={20} className="text-rose-600" />
                    Terms of Service
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} className="text-rose-600" />
                    Privacy Policy
                  </>
                )}
              </h2>
              <button
                onClick={onClose}
                className="
                  p-1.5
                  text-slate-400
                  hover:text-rose-500
                  hover:bg-neutral-900
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
            <div className="overflow-y-auto pr-1 flex flex-col gap-4 text-sm text-slate-300 leading-relaxed text-justify">
              {isTos && (
                <>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                    Last updated: August 2026
                  </p>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ScrollText size={14} className="text-rose-600" />
                      1. Acceptance of Terms
                    </h3>
                    <p>
                      By accessing and using Snapshot, you accept and agree to
                      be bound by these Terms of Service. If you do not agree to
                      these terms, please do not use Snapshot.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ScrollText size={14} className="text-rose-600" />
                      2. Purpose of Snapshot
                    </h3>
                    <p>
                      Snapshot is a personal portfolio belonging to Miguel
                      Justin Bunda. It is intended solely for informational and
                      professional presentation purposes — showcasing skills,
                      projects, educational background, and work experience.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ScrollText size={14} className="text-rose-600" />
                      3. Intellectual Property
                    </h3>
                    <p>
                      All content on Snapshot, including but not limited to
                      text, images, code snippets, and design, is the property
                      of Miguel Justin Bunda unless otherwise credited. You may
                      not reproduce, distribute, or create derivative works from
                      any content without explicit written permission.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ScrollText size={14} className="text-rose-600" />
                      4. External Links
                    </h3>
                    <p>
                      Snapshot may contain links to third-party websites (e.g.,
                      GitHub, LinkedIn). These links are provided for
                      convenience only. Miguel Justin Bunda has no control over
                      and assumes no responsibility for the content or practices
                      of any third-party sites.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ScrollText size={14} className="text-rose-600" />
                      5. Disclaimer of Warranties
                    </h3>
                    <p>
                      Snapshot is provided &quot;as is&quot; without warranties
                      of any kind. Miguel Justin Bunda makes no warranties,
                      expressed or implied, and hereby disclaims all warranties
                      including, without limitation, implied warranties of
                      merchantability and fitness for a particular purpose.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ScrollText size={14} className="text-rose-600" />
                      6. Changes to Terms
                    </h3>
                    <p>
                      Miguel Justin Bunda reserves the right to update these
                      Terms of Service at any time without prior notice.
                      Continued use of Snapshot after any changes constitutes
                      your acceptance of the new terms.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ScrollText size={14} className="text-rose-600" />
                      7. Contact
                    </h3>
                    <p>
                      For any questions regarding these Terms, please reach out
                      via the{" "}
                      <Link
                        href="/contact"
                        className="text-rose-500 hover:underline cursor-pointer"
                        onClick={onClose}
                      >
                        Contact page
                      </Link>{" "}
                      or email{" "}
                      <a
                        href="mailto:migueljustin.bunda@gmail.com"
                        className="text-rose-500 hover:underline cursor-pointer"
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
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                    Last updated: August 2026
                  </p>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-rose-600" />
                      1. Overview
                    </h3>
                    <p>
                      Your privacy is important. This Privacy Policy explains
                      what information is collected when you visit this
                      portfolio website and how it is used.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-rose-600" />
                      2. Information Collected
                    </h3>
                    <p>
                      Snapshot does not actively collect personal data. However,
                      standard web server logs may automatically record
                      technical information such as your IP address, browser
                      type, referring URL, and pages visited. This data is used
                      solely for maintaining site security and performance.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-rose-600" />
                      3. Contact Form
                    </h3>
                    <p>
                      If you use the Contact page to send a message, the
                      information you provide (name, email, message) will be
                      used solely to respond to your inquiry. This information
                      will not be shared with third parties.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-rose-600" />
                      4. Cookies
                    </h3>
                    <p>
                      Snapshot may use minimal cookies to remember user
                      preferences (e.g., dark/light mode). No tracking cookies
                      or advertising cookies are used. You may disable cookies
                      in your browser settings at any time.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-rose-600" />
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
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-rose-600" />
                      6. Data Security
                    </h3>
                    <p>
                      Reasonable precautions are taken to protect any
                      information processed through Snapshot. However, no method
                      of transmission over the internet is 100% secure, and
                      absolute security cannot be guaranteed.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-rose-600" />
                      7. Changes to This Policy
                    </h3>
                    <p>
                      This Privacy Policy may be updated periodically. Any
                      changes will be reflected on this page with an updated
                      date. Continued use of Snapshot after changes constitutes
                      acceptance of the revised policy.
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-rose-600" />
                      8. Contact
                    </h3>
                    <p>
                      For privacy-related questions, please reach out via the{" "}
                      <Link
                        href="/contact"
                        className="text-rose-500 hover:underline cursor-pointer"
                        onClick={onClose}
                      >
                        Contact page
                      </Link>{" "}
                      or email{" "}
                      <a
                        href="mailto:migueljustin.bunda@gmail.com"
                        className="text-rose-500 hover:underline cursor-pointer"
                      >
                        migueljustin.bunda@gmail.com
                      </a>
                      .
                    </p>
                  </section>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────

// Hover link style matching project list names in second section:
// underline, offset 4, subtle slate decoration line, hover slate-200 with bright decoration
const footerLinkStyle =
  "flex items-center gap-2 underline underline-offset-4 decoration-slate-700 hover:decoration-slate-300 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer select-none";

export const V2Footer = () => {
  const [legalModal, setLegalModal] = useState<LegalModal>(null);

  return (
    <>
      <LegalModal open={legalModal} onClose={() => setLegalModal(null)} />

      <footer
        className="
          relative z-0
          flex flex-col
          px-8 md:px-12 
          py-10
          w-full
          bg-neutral-950
          border-t
          border-neutral-800
        "
      >
        {/* Upper Layout - Medium/Large */}
        <div className="hidden sm:grid w-full lg:w-[90%] lg:mx-auto grid-cols-3 gap-8 py-4">
          {/* Branding: site title + desc */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-30px", once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <Link href="/" className="flex flex-col select-none cursor-pointer">
              <span className="font-bold text-xl uppercase tracking-wide flex flex-row gap-1 items-center">
                <span className="text-slate-100 text-lg sm:text-xl">
                  <Image
                    src="/images/favicons/favicon-32x32.png"
                    alt="Site Icon"
                    width={28}
                    height={28}
                  />
                </span>
                <span className="text-slate-100 flex flex-row">
                  SNAP<div className="text-rose-600">SHOT</div>
                </span>
                <span className="flex h-full items-end text-sm text-slate-500 ml-1">
                  BY MIGO
                </span>
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold mt-1">
                A Career-focused Website
              </span>
            </Link>

            <p className="text-sm sm:text-base text-slate-400 max-w-xs text-justify leading-relaxed">
              The personal portfolio of Miguel Justin Bunda — a software
              engineer documenting his journey through building software,
              exploring technology, and growing within the industry.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-30px", once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <h3 className="font-bold uppercase tracking-wide text-slate-100 text-sm flex items-center gap-2 mb-1">
              <Compass size={16} className="text-rose-600 shrink-0" />
              <span>Navigation</span>
            </h3>

            <Link href="/projects" className={footerLinkStyle}>
              <Laptop size={16} className="shrink-0" />
              Projects
            </Link>

            <Link href="/skills" className={footerLinkStyle}>
              <Sparkles size={16} className="shrink-0" />
              Skills
            </Link>

            <Link href="/blog" className={footerLinkStyle}>
              <Newspaper size={16} className="shrink-0" />
              Blog
            </Link>
          </motion.div>

          {/* External Links */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-30px", once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <h3 className="font-bold uppercase tracking-wide text-slate-100 text-sm flex items-center gap-2 mb-1">
              <Link2 size={16} className="text-rose-600 shrink-0" />
              <span>Links</span>
            </h3>

            <a
              className={`${footerLinkStyle} text-sm`}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.github.com/migodbtc"
            >
              <Code size={14} className="shrink-0" />
              GitHub
            </a>

            <a
              className={`${footerLinkStyle} text-sm`}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/migueljustin"
            >
              <BriefcaseBusinessIcon size={14} className="shrink-0" />
              LinkedIn
            </a>

            <a
              className={`${footerLinkStyle} text-sm`}
              href="https://drive.google.com/file/d/1FneKVe1A4jso6aTLsWh6M8xKUowwf5OY/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={14} className="shrink-0" />
              Resume
            </a>

            <a
              className={`${footerLinkStyle} text-sm`}
              href="mailto:migueljustin.bunda@gmail.com?subject=Inquiry%20via%20migueljustin.vercel.app"
            >
              <Mail size={14} className="shrink-0" />
              Email
            </a>
          </motion.div>
        </div>

        {/* Upper Layout - Small */}
        <div className="grid sm:hidden gap-6 py-4">
          {/* Branding: site title + desc */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-30px", once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/"
              className="flex flex-col select-none mx-auto cursor-pointer"
            >
              <span className="font-bold text-xl uppercase tracking-wide flex flex-row gap-1 items-center">
                <span className="text-slate-100 text-lg sm:text-xl">
                  <Image
                    src="/images/favicons/favicon-32x32.png"
                    alt="Site Icon"
                    width={28}
                    height={28}
                  />
                </span>
                <span className="text-slate-100 flex flex-row">
                  SNAP<div className="text-rose-600">SHOT</div>
                </span>
                <span className="flex h-full items-end text-sm text-slate-500 ml-1">
                  BY MIGO
                </span>
              </span>
              <span className="w-full text-center text-xs text-slate-400 uppercase tracking-wide font-semibold mt-1">
                A Career-focused Website
              </span>
            </Link>

            <p className="text-sm text-center text-slate-400 leading-relaxed">
              The personal portfolio of Miguel Justin Bunda — a software
              engineer documenting his journey through building software,
              exploring technology, and growing within the industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30px", once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col gap-2"
            >
              <h3 className="font-bold uppercase tracking-wide text-slate-100 text-sm flex items-center gap-1.5 mb-1">
                <Compass size={14} className="text-rose-600 shrink-0" />
                <span>Navigation</span>
              </h3>

              <Link href="/skills" className={`${footerLinkStyle} text-sm`}>
                <Braces size={14} className="shrink-0" />
                Skills
              </Link>

              <Link href="/projects" className={`${footerLinkStyle} text-sm`}>
                <Laptop size={14} className="shrink-0" />
                Projects
              </Link>

              <Link href="/blog" className={`${footerLinkStyle} text-sm`}>
                <Newspaper size={14} className="shrink-0" />
                Blog
              </Link>
            </motion.div>

            {/* External Links */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30px", once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-2"
            >
              <h3 className="font-bold uppercase tracking-wide text-slate-100 text-sm flex items-center gap-1.5 mb-1">
                <Link2 size={14} className="text-rose-600 shrink-0" />
                <span>Links</span>
              </h3>

              <a
                className={`${footerLinkStyle} text-sm`}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.github.com/migodbtc"
              >
                <Code size={14} className="shrink-0" />
                GitHub
              </a>

              <a
                className={`${footerLinkStyle} text-sm`}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/migueljustin"
              >
                <BriefcaseBusinessIcon size={14} className="shrink-0" />
                LinkedIn
              </a>

              <a
                className={`${footerLinkStyle} text-sm`}
                href="https://drive.google.com/file/d/1FneKVe1A4jso6aTLsWh6M8xKUowwf5OY/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={14} className="shrink-0" />
                Resume
              </a>

              <a
                className={`${footerLinkStyle} text-sm`}
                href="mailto:migueljustin.bunda@gmail.com?subject=Inquiry%20via%20migueljustin.vercel.app"
              >
                <Mail size={14} className="shrink-0" />
                Email
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer - Second Row (Medium/Large) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-20px", once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="
            hidden sm:flex
            w-full
            lg:w-[90%]
            lg:mx-auto
            pt-6
            mt-4
            border-t
            border-neutral-800
            text-sm
            text-slate-400
          "
        >
          <button className="underline underline-offset-4 decoration-slate-700 hover:decoration-slate-300 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer">
            © 2026 Miguel Justin
          </button>

          <div className="flex-1 flex justify-end gap-6">
            <button
              className="underline underline-offset-4 decoration-slate-700 hover:decoration-slate-300 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              onClick={() => setLegalModal("tos")}
            >
              <ScrollText size={13} className="text-rose-500" />
              Terms of Service
            </button>

            <button
              className="underline underline-offset-4 decoration-slate-700 hover:decoration-slate-300 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              onClick={() => setLegalModal("privacy")}
            >
              <ShieldCheck size={13} className="text-rose-500" />
              Privacy Policy
            </button>
          </div>
        </motion.div>

        {/* Bottom Footer - Second Row (Small) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-20px", once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="
            flex sm:hidden
            flex-col
            items-center
            gap-2
            pt-4
            mt-2
            border-t
            border-neutral-800
            text-xs
            text-slate-400
          "
        >
          <button className="underline underline-offset-4 decoration-slate-700 hover:decoration-slate-300 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer">
            © 2026 Miguel Justin
          </button>

          <div className="flex gap-4">
            <button
              className="underline underline-offset-4 decoration-slate-700 hover:decoration-slate-300 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer flex items-center gap-1"
              onClick={() => setLegalModal("tos")}
            >
              <ScrollText size={11} className="text-rose-500" />
              Terms of Service
            </button>

            <button
              className="underline underline-offset-4 decoration-slate-700 hover:decoration-slate-300 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer flex items-center gap-1"
              onClick={() => setLegalModal("privacy")}
            >
              <ShieldCheck size={11} className="text-rose-500" />
              Privacy Policy
            </button>
          </div>
        </motion.div>
      </footer>
    </>
  );
};

// Also export as default and AppFooter for compatibility
export default V2Footer;
export { V2Footer as AppFooter };
