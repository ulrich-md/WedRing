// Mapa de secciones del cascarón. El orden refleja cómo se irá construyendo
// la app: primero el tablero y el corazón (RSVP), luego lo demás.

import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ListChecks,
  Store,
  HeartHandshake,
  Globe,
  Settings,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** secciones aún por construir muestran un estado "próximamente" calmado */
  ready: boolean;
}

export const NAV: NavItem[] = [
  { href: "/tablero", label: "Tablero", icon: LayoutDashboard, ready: true },
  { href: "/invitados", label: "Invitados", icon: Users, ready: false },
  { href: "/presupuesto", label: "Presupuesto", icon: Wallet, ready: false },
  { href: "/checklist", label: "Checklist", icon: ListChecks, ready: false },
  { href: "/proveedores", label: "Proveedores", icon: Store, ready: false },
  { href: "/padrinos", label: "Padrinos", icon: HeartHandshake, ready: false },
  { href: "/web", label: "Web de boda", icon: Globe, ready: false },
  { href: "/configuracion", label: "Ajustes", icon: Settings, ready: true },
];

/** Las 4 secciones más usadas, para la barra inferior en móvil. */
export const MOBILE_NAV: NavItem[] = [
  NAV[0], // Tablero
  NAV[1], // Invitados
  NAV[2], // Presupuesto
  NAV[3], // Checklist
];
