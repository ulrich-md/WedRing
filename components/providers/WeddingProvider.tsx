"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session, Wedding } from "@/lib/types";
import { storage } from "@/lib/storage";

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

  // Hidratar una sola vez al montar.
  useEffect(() => {
    setSession(storage.getSession());
    setWedding(storage.getWedding());
    setReady(true);
  }, []);

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
    storage.setWedding(next);
    setWedding(next);
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
