"use client";

import { HUDOverlay } from "@/components/ui/HUDOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AmbientCanvas } from "@/components/ui/AmbientCanvas";
import { AniketCLI } from "@/components/ui/AniketCLI";
import { ThunderFace } from "@/components/hero/ThunderFace";
import { AboutSection } from "@/components/about/AboutSection";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { BeyondSection } from "@/components/beyond/BeyondSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#030303] text-zinc-100 overflow-x-hidden">
      {/* Ambient Procedural Floating Orbs Field across all sections */}
      <AmbientCanvas />

      {/* Interactive Cybernetic Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Tactical HUD Navigation & Viewport Matrix Brackets */}
      <HUDOverlay />

      {/* Interactive Developer Terminal / Cyber Console */}
      <AniketCLI />

      {/* 1. CORE: Scroll-Driven 3D Particle Face & Neural Orb Experience (#core) */}
      <ThunderFace />

      {/* 2. IDENTITY: Engineering & Intelligence Manifesto & GLA University (#identity) */}
      <AboutSection />

      {/* 3. CAPABILITIES: Dedicated Technical Matrix & Known Stack (#capabilities) */}
      <CapabilitiesSection />

      {/* 4. LABORATORY: Live Experiments, Projects & Split Interactive Views (#laboratory) */}
      <ProjectsSection />

      {/* 5. BEYOND: Hackathons Won, Certifications & Leadership (#beyond) */}
      <BeyondSection />

      {/* 6. COMMUNICATE: Transmission Dispatch & Verification (#communicate) */}
      <ContactSection />
    </main>
  );
}
