// Mapa de secciones de la app. Todas las del núcleo ya están construidas.

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
  { href: "/invitados", label: "Invitados", icon: Users, ready: true },
  { href: "/presupuesto", label: "Presupuesto", icon: Wallet, ready: true },
  { href: "/checklist", label: "Checklist", icon: ListChecks, ready: true },
  { href: "/proveedores", label: "Proveedores", icon: Store, ready: true },
  { href: "/padrinos", label: "Padrinos", icon: HeartHandshake, ready: true },
  { href: "/web", label: "Web de boda", icon: Globe, ready: true },
  { href: "/configuracion", label: "Ajustes", icon: Settings, ready: true },
];

/** Las 4 secciones más usadas, para la barra inferior en móvil. */
export const MOBILE_NAV: NavItem[] = [
  NAV[0], // Tablero
  NAV[1], // Invitados
  NAV[2], // Presupuesto
  NAV[3], // Checklist
];
