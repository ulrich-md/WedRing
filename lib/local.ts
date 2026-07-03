"use client";

// Estado privado de la pareja (checklist, presupuesto, padrinos): vive en
// localStorage. Cuando haya backend con cuentas, este hook se reimplementa
// y las páginas no cambian.

import { useCallback, useEffect, useState } from "react";

export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* valor inicial */
    }
    setLoaded(true);
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(v));
        } catch {
          /* almacenamiento lleno: seguimos en memoria */
        }
        return v;
      });
    },
    [key],
  );

  return [value, update, loaded] as const;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
