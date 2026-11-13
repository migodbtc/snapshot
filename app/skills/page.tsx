import V2SkillsPage from "@/app/v2/skills/page";
import { V2Footer } from "@/app/v2/_components/V2Footer";

export const metadata = {
  title: "Skills & Certifications | Snapshot Portfolio",
  description:
    "A directory of technical capabilities, frameworks, cloud platforms, and verified credentials accumulated across engineering projects, academic studies, and production environments.",
};

export default function SkillsPage() {
  return (
    <>
      <V2SkillsPage />
      <V2Footer />
    </>
  );
}
