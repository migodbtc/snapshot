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
import { ContactSection, ContactSectionSmall } from "./_components/ContactSection";

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

        {/* Communeye Section - Small */}
        <CommuneyeSectionSmall />

        {/* Contact Section - Small */}
        <ContactSectionSmall />
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
