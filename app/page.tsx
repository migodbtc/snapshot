"use client";
import AppLayout from "./_layouts/AppLayout";
import { NewHeroSection } from "./_components/NewHeroSection";
import { AboutSection } from "./_components/SectionsV2/AboutSection";
import { StatsStrip } from "./_components/SectionsV2/StatsStrip";
import { ProjectsSection } from "./_components/SectionsV2/ProjectsSection";
import { FaqSection } from "./_components/SectionsV2/FaqSection";
import { ContactSection } from "./_components/SectionsV2/ContactSection";

// Home: the default component to be exported, contains the entirety of the home page.
export default function Home() {
  return (
    <AppLayout>
      <main className="relative flex flex-1 w-full h-fit flex-col items-center justify-between sm:items-start">
        <NewHeroSection />
        <AboutSection />
        <StatsStrip />
        <ProjectsSection />
        <FaqSection />
        <ContactSection />
      </main>
    </AppLayout>
  );
}
