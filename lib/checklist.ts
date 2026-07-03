// Plan guiado por meses antes de la boda. Cada tarea puede sugerir una
// categoría de proveedor: ahí es donde los verificados aparecen en contexto.

import type { VendorCategory } from "./types";

export interface ChecklistTask {
  id: string;
  label: string;
  /** si la tarea implica contratar, mostramos proveedores verificados aquí */
  vendorCategory?: VendorCategory;
}

export interface ChecklistSection {
  monthsBefore: number;
  title: string;
  tasks: ChecklistTask[];
}

export const CHECKLIST_TEMPLATE: ChecklistSection[] = [
  {
    monthsBefore: 12,
    title: "12 meses antes",
    tasks: [
      { id: "presupuesto", label: "Definir su presupuesto total" },
      { id: "lista-preliminar", label: "Hacer la lista preliminar de invitados" },
      { id: "venue", label: "Visitar y apartar el lugar (venue)", vendorCategory: "venue" },
      { id: "fecha", label: "Elegir la fecha y apartarla" },
    ],
  },
  {
    monthsBefore: 10,
    title: "10 meses antes",
    tasks: [
      { id: "fotografo", label: "Contratar fotógrafo y video", vendorCategory: "fotografia" },
      { id: "catering", label: "Elegir banquete / catering", vendorCategory: "catering" },
      { id: "planner", label: "Decidir si quieren wedding planner", vendorCategory: "planeacion" },
    ],
  },
  {
    monthsBefore: 8,
    title: "8 meses antes",
    tasks: [
      { id: "musica", label: "Contratar música (banda, mariachi o DJ)", vendorCategory: "musica" },
      { id: "flores", label: "Definir flores y decoración", vendorCategory: "flores" },
      { id: "vestuario", label: "Empezar con vestido y traje" },
    ],
  },
  {
    monthsBefore: 6,
    title: "6 meses antes",
    tasks: [
      { id: "padrinos", label: "Asignar padrinos por rol" },
      { id: "invitaciones", label: "Enviar los links de RSVP por WhatsApp" },
      { id: "web", label: "Publicar su web de boda" },
      { id: "anillos", label: "Comprar los anillos" },
    ],
  },
  {
    monthsBefore: 3,
    title: "3 meses antes",
    tasks: [
      { id: "menu-final", label: "Degustación y menú final", vendorCategory: "catering" },
      { id: "pastel", label: "Elegir el pastel", vendorCategory: "pastel" },
      { id: "belleza", label: "Prueba de maquillaje y peinado", vendorCategory: "belleza" },
      { id: "recordar-rsvp", label: "Recordar a los invitados pendientes" },
    ],
  },
  {
    monthsBefore: 1,
    title: "El último mes",
    tasks: [
      { id: "confirmar-proveedores", label: "Confirmar horarios con proveedores" },
      { id: "pagos", label: "Liquidar pagos finales" },
      { id: "itinerario", label: "Armar el itinerario del gran día" },
      { id: "respirar", label: "Respirar hondo: lo lograron 🤍" },
    ],
  },
];

export const TOTAL_TASKS = CHECKLIST_TEMPLATE.reduce(
  (n, s) => n + s.tasks.length,
  0,
);
