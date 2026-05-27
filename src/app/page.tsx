import { InteractiveEntry } from "@/components/home/InteractiveEntry";
import { PillarsStrip } from "@/components/home/PillarsStrip";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { SpacesPreview } from "@/components/home/SpacesPreview";
import { UseCasesPreview } from "@/components/home/UseCasesPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ImpactSection } from "@/components/home/ImpactSection";
import { MembershipPitch } from "@/components/home/MembershipPitch";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      {/* Cinematic scroll-driven entry: parking → gates → courtyard → doors → interior */}
      <InteractiveEntry />
      <PillarsStrip />
      <MarqueeBand />
      <SpacesPreview />
      <UseCasesPreview />
      <MembershipPitch />
      <AboutPreview />
      <ImpactSection />
      <CTASection />
    </>
  );
}
