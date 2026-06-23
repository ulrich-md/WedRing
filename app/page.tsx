import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { FiestaBackground } from "@/components/landing/FiestaBackground";
import { RingLayer } from "@/components/landing/RingLayer";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { ChaosToCalm } from "@/components/landing/ChaosToCalm";
import { RsvpFeature } from "@/components/landing/RsvpFeature";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { MexicanSoul } from "@/components/landing/MexicanSoul";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { Wave } from "@/components/landing/Waves";

/**
 * Landing pública de wedRing (pre-lanzamiento, lista de espera).
 * Rediseño festivo y muy mexicano: fondo vibrante, anillo 3D que viaja con el
 * scroll, divisores en onda y color-blocking. Hecha con el UI real de la app,
 * sin assets ni números inventados.
 */
export default function LandingPage() {
  return (
    <>
      <FiestaBackground />
      <SmoothScroll />
      <RingLayer />
      <LandingNav />

      <main className="relative z-10">
        {/* Hero transparente: deja ver el fondo de fiesta */}
        <Hero />

        {/* Onda hacia la banda de contenido translúcida */}
        <Wave className="text-cream/85" />
        <div className="bg-cream/85 backdrop-blur-xl">
          <ChaosToCalm />
          <RsvpFeature />
          <FeatureBento />
        </div>

        {/* Alma mexicana: panel vibrante propio */}
        <MexicanSoul />

        <Pricing />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
