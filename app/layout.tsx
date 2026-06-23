import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { WeddingProvider } from "@/components/providers/WeddingProvider";
import { Preloader } from "@/components/Preloader";

// Serif elegante y cálido para títulos; sans humanista para el cuerpo.
// Ambas con soporte completo de acentos en español.
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  title: "wedRing — planea tu boda con calma",
  description:
    "El hogar tranquilo donde planeas tu boda, y vive donde ya estás: WhatsApp. RSVP, invitados, presupuesto y más, sin estrés.",
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
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
      <body className="min-h-dvh bg-ivory text-ink antialiased">
        <WeddingProvider>
          <Preloader />
          {children}
        </WeddingProvider>
      </body>
    </html>
  );
}
