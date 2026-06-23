"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWedding } from "@/components/providers/WeddingProvider";
import { RingMark } from "@/components/brand/RingMark";

/**
 * Punto de entrada. Decide a dónde llevarte, con calma:
 *  sin sesión        → iniciar sesión
 *  sin boda          → configurar la boda
 *  todo listo        → el tablero
 */
export default function Home() {
  const router = useRouter();
  const { ready, session, wedding } = useWedding();

  useEffect(() => {
    if (!ready) return;
    if (!session) router.replace("/login");
    else if (!wedding) router.replace("/configurar");
    else router.replace("/tablero");
  }, [ready, session, wedding, router]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ivory">
      <RingMark size={44} className="animate-pulse opacity-70" />
    </main>
  );
}
