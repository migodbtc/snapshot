"use client"

import { BLOG_POSTS, EXPERIENCE_CONSTS } from "@/lib/constants";
import { ArrowUpRight, Briefcase, BriefcaseBusinessIcon, Circle, Code, Code2, Eye, FileText, Mail, Send, User, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AppHeader from "./_components/AppHeader";
import { AboutSection, AboutSectionSmall } from "./_components/AboutSection";
import { EducationSection, EducationSectionSmall } from "./_components/EducationSection";
import { HeroSection, HeroSectionSmall } from "./_components/HeroSection";
import { SkillsSection, SkillSectionSmall } from "./_components/SkillsSection";
import { CommuneyeSection, CommuneyeSectionSmall } from "./_components/CommuneyeSection";
import { BlogSection, BlogSectionSmall } from "./_components/BlogSection";
import { ExperienceSection, ExperienceSectionSmall } from "./_components/ExperienceSection";
import { AppFooter } from "./_components/AppFooter";


// ContactSection: A dedicated section where there is a form with captcha one can use to 
// email me. I don't know why you would email me. But here we go.
const ContactButton = ({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
}) => {
  return (
    <button
      onClick={() => href && window.open(href, "_blank")}
      className="
        text-xs lg:text-sm
        group
        relative
        overflow-hidden
        rounded-xl
        border border-slate-300
        dark:border-slate-800
        backdrop-blur-md
        py-2 px-4
        flex flex-row gap-2
        justify-center items-center
        cursor-pointer
        text-slate-900
        dark:text-slate-50
        transition-transform
        duration-300
        hover:scale-[1.02]
      "
    >
      {/* Base glass layer, same as cards */}
      <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      {/* Hover shine layer */}
      <div
        className="
          absolute inset-0 -z-10
          bg-radial from-slate-300/40 via-slate-200/10 to-transparent
          dark:from-slate-400/30 dark:via-slate-300/10 dark:to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "
      />

      <Icon size={18} />
      {label}
    </button>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        group
        relative
        overflow-hidden
        w-full
        max-w-md
        rounded-xl
        border border-slate-300
        dark:border-slate-800
        backdrop-blur-md
        p-6
        flex flex-col
        gap-4
      "
    >

      {/* Glass base layer (Commented because background already has a gradient)
      <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" /> */}

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="text-xs lg:text-sm text-slate-700 dark:text-slate-300"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Juan Dela Cruz"
          required
          className="
            rounded-lg
            border border-slate-300
            dark:border-slate-700
            bg-slate-50/50
            dark:bg-slate-900/50
            px-3 py-2
            text-sm
            text-slate-900
            dark:text-slate-50
            placeholder:text-slate-400
            dark:placeholder:text-slate-500
            focus:outline-none
            focus:border-rose-400
            dark:focus:border-rose-700
            transition-colors
          "
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-xs lg:text-sm text-slate-700 dark:text-slate-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="juan@example.com"
          required
          className="
            rounded-lg
            border border-slate-300
            dark:border-slate-700
            bg-slate-50/50
            dark:bg-slate-900/50
            px-3 py-2
            text-sm
            text-slate-900
            dark:text-slate-50
            placeholder:text-slate-400
            dark:placeholder:text-slate-500
            focus:outline-none
            focus:border-rose-400
            dark:focus:border-rose-700
            transition-colors
          "
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="message"
          className="text-xs lg:text-sm text-slate-700 dark:text-slate-300"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="What's on your mind?"
          required
          className="
            rounded-lg
            border border-slate-300
            dark:border-slate-700
            bg-slate-50/50
            dark:bg-slate-900/50
            px-3 py-2
            text-sm
            text-slate-900
            dark:text-slate-50
            placeholder:text-slate-400
            dark:placeholder:text-slate-500
            focus:outline-none
            focus:border-rose-400
            dark:focus:border-rose-700
            transition-colors
            resize-none
          "
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="
          mt-2
          py-2 px-4
          rounded-lg
          bg-rose-800
          hover:bg-rose-700
          disabled:opacity-60
          disabled:cursor-not-allowed
          text-slate-50
          text-sm
          font-semibold
          cursor-pointer
          transition-colors
          uppercase
          flex
          items-center
          gap-2
          justify-center
        "
      >
        <Send />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {/* Status messages */}
      {status === "success" && (
        <p className="text-xs lg:text-sm text-rose-700 dark:text-rose-300">
          Message sent! I'll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-xs lg:text-sm text-slate-700 dark:text-slate-300">
          Something went wrong — please try again. (P.S. The form isn't working for now since I haven't scaffolded the endpoint ++ other stuff haha)
        </p>
      )}
    </form>
  );
};

const ContactSection = () => {
  return <section className="flex flex-col w-full h-fit overflow-hidden lg:mx-auto aspect-video  mb-8">

    {/* Body */}
    <div className="flex flex-row flex-1 w-full h-fill px-8 pb-8 gap-4 align-middle justify-center">

      {/* Left Half */}
      <div className="w-1/2 bg-transparent flex flex-col items-start justify-center py-2 px-4 lg:py-4 lg:px-6 gap-3">
        <h1 className="text-2xl lg:text-4xl tracking-wide text-justify">
          Got a concern in mind? <b className="text-rose-800">Let's connect!</b>.
        </h1>
        <p className="text-md lg:text-lg text-gray-700 dark:text-gray-400 text-justify max-w-lg">
          I'm always up for a conversation about software engineering, web development, or the industry in general. The form on the right sends a message straight to my email — or if you'd rather reach out directly, I've listed a few social links below.
        </p>
        <div className="w-full grid grid-cols-2 griw-rows-auto gap-2">
          <ContactButton icon={Briefcase} label="Facebook" href="..." />
          <ContactButton icon={Mail} label="LinkedIn" href="..." />
          <ContactButton icon={Code2} label="GitHub" href="..." />
          <ContactButton icon={Code2} label="Communeye IG" href="..." />
        </div>
      
      </div>

      {/* Right Half */}
      <div className="w-1/2 flex items-center justify-center bg-radial from-slate-500/25 dark:from-slate-50/25 to-transparent to-70%">
        <ContactForm />
      </div>

    </div>

  </section>
}

const ContactSectionSmall = () => {
  return 
}


// Home: the default component to be exported, contains the entirety of the home page.
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <AppHeader />

      {/* Main Content - Medium-Large */}
      <main className="hidden sm:flex flex-1 w-full h-fit lg:max-w-6xl flex-col items-center justify-between sm:items-start ">

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Education Section */}
        <EducationSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Communeye Section */}
        <CommuneyeSection />

        {/* ContactSection */}
        <ContactSection />

      </main>

      {/* Main Content - Small */}
      <main className="flex sm:hidden flex-1 w-full h-fit lg:max-w-6xl flex-col items-center justify-between sm:items-start ">

        {/* Hero Section - Small */}
        <HeroSectionSmall />

        {/* About Me - Small */}
        <AboutSectionSmall />

        {/* Skills Section - Small */}
        <SkillSectionSmall />
        
        {/* Education Section - Small  */}
        <EducationSectionSmall />

        {/* Experience Section - Small */}
        <ExperienceSectionSmall />
        
        {/* Blog Section - Small */}
        <BlogSectionSmall />

        {/* CommuneyeSectionSmall */}
        <CommuneyeSectionSmall />

        <section className="w-full bg-indigo-600 h-screen py-8 px-12">
          CTA - Contact Me
        </section>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
