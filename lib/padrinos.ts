// Padrinos por rol — el diferenciador local. Sus aportaciones se suman al
// presupuesto (la página de presupuesto lee esta misma clave de storage).

export interface Padrino {
  id: string;
  role: string;
  name: string;
  contact?: string;
  /** qué patrocina (texto libre: "el vino", "las flores"…) */
  sponsors?: string;
  /** aportación en MXN (opcional) — se suma al presupuesto disponible */
  amount?: number;
}

export const DEFAULT_ROLES = [
  "Padrinos de lazo",
  "Padrinos de anillos",
  "Padrinos de arras",
  "Madrina de ramo",
];
