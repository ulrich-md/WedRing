import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { ChaosToCalm } from "@/components/landing/ChaosToCalm";
import { RsvpFeature } from "@/components/landing/RsvpFeature";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { MexicanSoul } from "@/components/landing/MexicanSoul";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

/**
 * Landing pública de wedRing (pre-lanzamiento, lista de espera).
 * Un toque cinematográfico —smooth-scroll, parallax sutil, reveals al scroll—
 * pero siempre con calma. Construida con el UI real de la app, sin assets
 * inventados ni números falsos.
 */
export default function LandingPage() {
  return (
    <>
      <SmoothScroll />
      <LandingNav />
      <main>
        <Hero />
        <ChaosToCalm />
        <RsvpFeature />
        <FeatureBento />
        <MexicanSoul />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
