"use client";
import { AboutSection, AboutSectionSmall } from "./_components/AboutSection";
import {
  EducationSection,
  EducationSectionSmall,
} from "./_components/EducationSection";
import { HeroSection, HeroSectionSmall } from "./_components/HeroSection";
import { SkillsSection, SkillSectionSmall } from "./_components/SkillsSection";
import {
  CommuneyeSection,
  CommuneyeSectionSmall,
} from "./_components/CommuneyeSection";
import { BlogSection, BlogSectionSmall } from "./_components/BlogSection";
import {
  ExperienceSection,
  ExperienceSectionSmall,
} from "./_components/ExperienceSection";
import { ContactSection } from "./_components/ContactSection";
import AppLayout from "./_layouts/AppLayout";

// Home: the default component to be exported, contains the entirety of the home page.
export default function Home() {
  return (
    <AppLayout>
      {/* Main Content - Medium-Large */}
      <main className="relative hidden sm:flex flex-1 w-full h-fit lg:max-w-6xl flex-col items-center justify-between sm:items-start ">
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

        {/* ContactSection */}
        <ContactSection />
      </main>

      {/* Main Content - Small */}
      <main className="relative flex sm:hidden flex-1 w-full h-fit lg:max-w-6xl flex-col items-center justify-between sm:items-start ">
        {/* Decorative background gradients - Small */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rose-400/30 dark:bg-rose-700/20 blur-3xl" />
          <div className="absolute top-1/2 -right-20 w-64 h-64 rounded-full bg-sky-400/20 dark:bg-sky-700/20 blur-3xl" />
        </div>

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

        {/* Contact Section - Small */}
        <ContactSection />
      </main>
    </AppLayout>
  );
}
