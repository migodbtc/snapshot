"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Award,
  X,
  Maximize2,
} from "lucide-react";
import { V2Navbar } from "../_components/V2Navbar";
import { SnapshotLoadingScreen } from "@/app/_components/SnapshotLoadingScreen";
import { skillSections } from "../landing/constants";

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  tags: string[];
  badge?: string;
  image?: string;
}

// Sorted chronologically (newest first)
const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Issued Nov 2026 · Expires Nov 2029",
    credentialId: "954e75d4efac490da215c5270f49c5d1",
    description:
      "Validates foundational fluency across the AWS Cloud ecosystem. Demonstrates core proficiency in cloud computing paradigms, AWS core compute, storage, networking, identity and security compliance, billing architectures, and high-availability design principles.",
    badge: "/images/certifications/aws-certified-cloud-practitioner.png",
    tags: [
      "AWS Cloud",
      "Cloud Architecture",
      "IAM & Security",
      "EC2 & S3",
      "VPC Networking",
      "High Availability",
    ],
  },
  {
    id: "aws-ai-practitioner",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Issued Sep 2026 · Expires Sep 2029",
    credentialId: "c29cd4bd008f4955a42f4ed160f7fd06",
    description:
      "Certified in foundational and agentic AI architectures on AWS. Validates expertise spanning foundation models, Amazon Bedrock, vector RAG retrieval pipelines, generative AI security, prompt engineering, and responsible AI governance.",
    badge: "/images/certifications/aws-certified-ai-practitioner.png",
    tags: [
      "AWS Bedrock",
      "Generative AI",
      "Foundation Models",
      "RAG Pipelines",
      "Prompt Engineering",
      "Cloud Security",
    ],
  },
  {
    id: "dbtc-degree-honors",
    title: "Bachelor of Science in Information Technology",
    issuer: "Don Bosco Technical College",
    date: "August 2022 – June 2026",
    description:
      "Conferred with highest collegiate honors: Batch Valedictorian, Magna Cum Laude, and Service Award. Demonstrated academic and practical leadership across full-stack software development, relational database engineering, software quality assurance, and technical communication.",
    badge: "/images/certifications/dbtc.png",
    tags: [
      "Batch Valedictorian",
      "Magna Cum Laude",
      "Service Award",
      "Software Engineering",
      "Database Optimization",
      "Technical Leadership",
    ],
  },
  {
    id: "rakso-internship-cert",
    title: "Backend & Cloud Development Internship Certificate",
    issuer: "Rakso Creative Technologies",
    date: "January 2026 – April 2026",
    description:
      "Completed rigorous software engineering internship under the CRM Development and Azure Deployment Departments. Engineered cloud-native infrastructure using Azure Bicep (IaC), Docker containerization, automated GitHub Actions CI/CD, and high-volume Laravel/TypeScript RESTful services.",
    badge: "/images/certifications/raksoct.png",
    tags: [
      "Microsoft Azure",
      "Azure Bicep (IaC)",
      "Docker",
      "GitHub Actions CI/CD",
      "Laravel",
      "TypeScript",
    ],
    image: "/images/experience/certification_raks.jpg",
  },
];

function SkillsPageContent() {
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen bg-neutral-950">
      {/* Top Navbar Header */}
      <div className="relative z-20 w-full">
        <V2Navbar />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-start">
        {/* Split Layout: Left Column (Dedicated Header) & Right Column (Skills & Certifications) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Responsive Sticky Title + Description */}
          <div className="w-full lg:col-span-4 xl:col-span-3 flex flex-col justify-start lg:sticky lg:top-28 xl:top-32 self-start pb-4 lg:pb-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-3 sm:mb-5 break-words"
            >
              Skills & <span className="text-rose-600">Certifications</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed text-justify"
            >
              A directory of technical capabilities, frameworks, cloud
              platforms, and verified credentials accumulated across software
              engineering projects, academic studies, and production
              environments.
            </motion.p>
          </div>

          {/* Right Column: Actual Page Content (Skills Grid & Certifications Rows) */}
          <div className="w-full lg:col-span-8 xl:col-span-9 flex flex-col gap-12 sm:gap-16 lg:gap-20">
            {/* ─── SECTION 1: SKILLS ────────────────────────────────────────────── */}
            <section id="skills" className="w-full flex flex-col">
              {/* Section Header: Signature Red Icon + Text */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-white/10 mb-6 sm:mb-8"
              >
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600 shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Skills
                </h2>
              </motion.div>

              {/* 2-Column Responsive Layout: Restored generous padding, clean domain headers without icons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
                {skillSections.map((section, idx) => (
                  <motion.div
                    key={section.index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: "easeOut",
                    }}
                    className="bg-neutral-900/70 border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-2xl flex flex-col justify-start group hover:border-white/20 transition-all duration-300"
                  >
                    {/* Cell Header: Clean domain title without icons */}
                    <div className="mb-4 sm:mb-5">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight leading-snug">
                        {section.title}
                      </h3>
                    </div>

                    {/* Complete List of Badges with comfortable spacing */}
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {section.skills.map(({ name, icon: TechIcon, color }) => (
                        <div
                          key={name}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950/80 hover:bg-neutral-950 border border-white/5 hover:border-white/20 text-slate-300 hover:text-white transition-all duration-200 select-none group/badge shadow-sm cursor-default"
                        >
                          <TechIcon
                            className={`w-4 h-4 ${color} group-hover/badge:scale-110 transition-transform duration-200 shrink-0`}
                          />
                          <span className="text-xs sm:text-sm font-mono tracking-wide">
                            {name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ─── SECTION 2: CERTIFICATIONS ────────────────────────────────────── */}
            <section id="certifications" className="w-full flex flex-col">
              {/* Section Header: Signature Red Icon + Text */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-white/10 mb-4 sm:mb-6"
              >
                <Award className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600 shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Certifications & Credentials
                </h2>
              </motion.div>

              {/* Dedicated Rows for Each Achievement with Centered Mobile Badges */}
              <div className="w-full flex flex-col">
                {CERTIFICATIONS.map((cert, idx) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-30px", once: true }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: "easeOut",
                    }}
                    className="w-full border-b border-white/10 pb-8 sm:pb-12 pt-6 sm:pt-8 flex flex-col md:grid md:grid-cols-12 gap-5 sm:gap-6 md:gap-8 items-start group"
                  >
                    {/* Left: Badge Graphic (Centered on mobile, left-aligned on desktop, no background) */}
                    <div className="w-full md:w-auto md:col-span-2 flex items-center justify-center md:justify-start shrink-0 mb-3 md:mb-0">
                      {cert.badge ? (
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                          <Image
                            src={cert.badge}
                            alt={cert.title}
                            width={96}
                            height={96}
                            className="w-full h-full object-contain filter drop-shadow-[0_4px_14px_rgba(255,153,0,0.2)] group-hover:scale-105 transition-transform duration-300"
                            priority={idx < 2}
                          />
                        </div>
                      ) : (
                        <div className="hidden md:block w-20 h-20 sm:w-24 sm:h-24" />
                      )}
                    </div>

                    {/* Middle: Title, Subtext (Issuer, Dates, Credential ID), and Description */}
                    <div className="w-full md:col-span-6 lg:col-span-6 flex flex-col">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight group-hover:text-white transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-rose-500/90 font-semibold mt-1">
                        {cert.issuer} <span className="text-slate-500 font-normal">· {cert.date}</span>
                      </p>
                      {cert.credentialId && (
                        <p className="text-[11px] sm:text-xs font-mono text-slate-400 mt-1 select-all">
                          Credential ID: <span className="text-slate-300 font-medium">{cert.credentialId}</span>
                        </p>
                      )}
                      <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed text-justify mt-3">
                        {cert.description}
                      </p>
                    </div>

                    {/* Right: Competency Badges & Document Preview Button */}
                    <div className="w-full md:col-span-4 lg:col-span-4 flex flex-col gap-3.5 sm:gap-4 mt-2 md:mt-0">
                      {/* Competency Badges */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {cert.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-900 text-slate-300 hover:text-white transition-all duration-200 select-none text-xs font-mono tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Certificate image inspection button if available */}
                      {cert.image && (
                        <div className="mt-1">
                          <button
                            type="button"
                            onClick={() => setSelectedCertImage(cert.image!)}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-900 border border-white/10 hover:border-white/25 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group/btn shadow-sm"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-rose-500 group-hover/btn:scale-110 transition-transform" />
                            <span>View Certificate Document</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ─── CERTIFICATE HIGH-RES MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCertImage && (
          <div
            onClick={() => setSelectedCertImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-neutral-950/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] flex items-center justify-center cursor-default"
            >
              {/* Floating Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCertImage(null)}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10 p-2 rounded-full bg-neutral-900 border border-white/20 text-white hover:text-rose-500 hover:scale-110 shadow-2xl transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Just the image of the doc, fit to modal */}
              <Image
                src={selectedCertImage}
                alt="Certificate Document"
                width={1400}
                height={1000}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
                priority
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function V2SkillsPage() {
  return (
    <Suspense
      fallback={
        <SnapshotLoadingScreen message="Loading Skills & Certifications..." />
      }
    >
      <SkillsPageContent />
    </Suspense>
  );
}
