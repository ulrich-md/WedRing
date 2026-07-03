"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Session, Wedding } from "@/lib/types";
import { storage } from "@/lib/storage";
import { api } from "@/lib/api";

interface WeddingContextValue {
  /** false hasta hidratar desde localStorage — evita parpadeos de auth */
  ready: boolean;
  session: Session | null;
  wedding: Wedding | null;
  signIn: (session: Session) => void;
  signOut: () => void;
  saveWedding: (wedding: Wedding) => void;
}

const WeddingContext = createContext<WeddingContextValue | null>(null);

export function WeddingProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const creating = useRef(false);

  // Hidratar una sola vez al montar.
  useEffect(() => {
    setSession(storage.getSession());
    setWedding(storage.getWedding());
    setReady(true);
  }, []);

  // Vincular con el servidor: crea el registro compartido si aún no existe
  // (necesario para RSVP y web pública), o sincroniza los detalles si cambió.
  useEffect(() => {
    if (!ready || !wedding) return;
    if (!wedding.serverId) {
      if (creating.current) return;
      creating.current = true;
      api
        .createWedding(wedding)
        .then(({ id, coupleKey, slug }) => {
          const linked = { ...wedding, serverId: id, coupleKey, slug };
          storage.setWedding(linked);
          setWedding(linked);
        })
        .catch(() => {
          /* sin red no pasa nada: se reintenta en la próxima visita */
        })
        .finally(() => {
          creating.current = false;
        });
    } else {
      api.syncWedding(wedding).catch(() => {});
    }
    // Solo cuando cambian los datos compartidos.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ready,
    wedding?.serverId,
    wedding?.partners,
    wedding?.date,
    wedding?.location,
    wedding?.palette?.hex,
  ]);

  const signIn = useCallback((next: Session) => {
    storage.setSession(next);
    setSession(next);
  }, []);

  const signOut = useCallback(() => {
    storage.clearAll();
    setSession(null);
    setWedding(null);
  }, []);

  const saveWedding = useCallback((next: Wedding) => {
    // conserva el vínculo con el servidor aunque la UI mande un objeto nuevo
    setWedding((prev) => {
      const merged = {
        ...next,
        serverId: next.serverId ?? prev?.serverId,
        coupleKey: next.coupleKey ?? prev?.coupleKey,
        slug: next.slug ?? prev?.slug,
      };
      storage.setWedding(merged);
      return merged;
    });
  }, []);

  const value = useMemo<WeddingContextValue>(
    () => ({ ready, session, wedding, signIn, signOut, saveWedding }),
    [ready, session, wedding, signIn, signOut, saveWedding],
  );

  return (
    <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>
  );
}

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error("useWedding debe usarse dentro de WeddingProvider");
  return ctx;
}
