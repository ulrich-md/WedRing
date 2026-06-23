import type { Metadata, Viewport } from "next";
import { Fraunces, Mulish } from "next/font/google";
import "./globals.css";
import { WeddingProvider } from "@/components/providers/WeddingProvider";
import { Preloader } from "@/components/Preloader";

// Fraunces: serif expresivo y cálido (divertido pero con clase) para títulos.
// Mulish: sans humanista para el cuerpo. Ambas con acentos en español.
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "wedRing — planea tu boda en WhatsApp, sin estrés",
  description:
    "La app mexicana para planear tu boda con alma: RSVP por WhatsApp, invitados, presupuesto, padrinos y tu web de boda. Vibrante, fácil y gratis.",
};

export const viewport: Viewport = {
  themeColor: "#FFF7ED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-dvh bg-cream text-ink antialiased">
        <WeddingProvider>
          <Preloader />
          {children}
        </WeddingProvider>
      </body>
    </html>
  );
}
