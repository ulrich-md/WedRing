"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWedding } from "@/components/providers/WeddingProvider";
import { Sidebar } from "@/components/shell/Sidebar";
import { MobileNav } from "@/components/shell/MobileNav";
import { Topbar } from "@/components/shell/Topbar";
import { RingMark } from "@/components/brand/RingMark";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { ready, session, wedding } = useWedding();

  // Guardia tranquila: te llevamos a donde debes estar, sin sobresaltos.
  useEffect(() => {
    if (!ready) return;
    if (!session) router.replace("/login");
    else if (!wedding) router.replace("/configurar");
  }, [ready, session, wedding, router]);

  if (!ready || !session || !wedding) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream">
        <RingMark size={42} className="animate-pulse opacity-70" />
      </main>
    );
  }

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-5 pb-28 pt-7 sm:px-8 lg:pb-12">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
