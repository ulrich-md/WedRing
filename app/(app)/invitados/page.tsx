"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  Plus,
  Upload,
  MessageCircle,
  Link2,
  Trash2,
  Check,
  BellRing,
  Copy,
} from "lucide-react";
import { useWedding } from "@/components/providers/WeddingProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { api, inviteMessage, reminderMessage, rsvpUrl, waLink } from "@/lib/api";
import type { Guest, RsvpStatus } from "@/lib/types";

type Filter = "todos" | RsvpStatus;

const STATUS_META: Record<RsvpStatus, { label: string; cls: string }> = {
  confirmado: { label: "Confirmó", cls: "bg-confirmed/12 text-confirmed" },
  pendiente: { label: "Pendiente", cls: "bg-pending/15 text-gold-deep" },
  declinado: { label: "No podrá", cls: "bg-declined/12 text-declined" },
  talvez: { label: "Tal vez", cls: "bg-maybe/15 text-ink-soft" },
};

export default function InvitadosPage() {
  const { wedding } = useWedding();
  const [guests, setGuests] = useState<Guest[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");
  const [showImport, setShowImport] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const linked = Boolean(wedding?.serverId && wedding?.coupleKey);

  const refresh = useCallback(() => {
    if (!wedding || !linked) return;
    api
      .listGuests(wedding)
      .then(({ guests }) => setGuests(guests))
      .catch((e) => setError(e.message));
  }, [wedding, linked]);

  useEffect(() => {
    refresh();
    // El conteo se actualiza solo: refresco suave cada 15s mientras miras.
    const t = setInterval(refresh, 15000);
    return () => clearInterval(t);
  }, [refresh]);

  const totals = useMemo(() => {
    const g = guests ?? [];
    const by = (s: RsvpStatus) => g.filter((x) => x.status === s);
    return {
      confirmados: by("confirmado").reduce((n, x) => n + x.party, 0),
      pendientes: by("pendiente").length,
      declinaron: by("declinado").length,
      talvez: by("talvez").length,
      total: g.length,
    };
  }, [guests]);

  const visible = useMemo(
    () => (guests ?? []).filter((g) => filter === "todos" || g.status === filter),
    [guests, filter],
  );

  async function copy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      setError("No se pudo copiar");
    }
  }

  if (!wedding) return null;

  return (
    <div>
      <SectionHeader
        eyebrow="El corazón"
        title="Invitados & RSVP"
        subtitle="Cada invitado tiene su link personal. Compártelo por WhatsApp y tu conteo se actualiza solo, en vivo."
      />

      {!linked && (
        <Reveal className="mt-8">
          <div className="card-calm px-6 py-5 font-sans text-sm text-ink-soft">
            Sincronizando tu boda… si esto no avanza, revisa tu conexión y
            recarga. Tus invitados necesitan el servidor para confirmar.
          </div>
        </Reveal>
      )}

      {/* Totales en vivo */}
      <Reveal className="mt-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Confirmados (personas)" value={totals.confirmados} tone="text-confirmed" />
          <StatCard label="Pendientes" value={totals.pendientes} tone="text-gold-deep" />
          <StatCard label="No podrán" value={totals.declinaron} tone="text-declined" />
          <StatCard label="Tal vez" value={totals.talvez} tone="text-ink-soft" />
        </div>
      </Reveal>

      {/* Agregar + importar */}
      <Reveal className="mt-6" delay={0.05}>
        <div className="card-calm p-5 sm:p-6">
          <AddGuestForm
            disabled={!linked}
            onAdd={async (name, phone) => {
              await api.addGuest(wedding, { name, phone });
              refresh();
            }}
          />
          <button
            onClick={() => setShowImport((v) => !v)}
            className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm text-sage-600 hover:text-sage-700"
          >
            <Upload size={14} />
            {showImport ? "Cerrar importación" : "Importar varios (pega tu lista)"}
          </button>
          {showImport && (
            <ImportBox
              disabled={!linked}
              onImport={async (items) => {
                await api.addGuestsBulk(wedding, items);
                setShowImport(false);
                refresh();
              }}
            />
          )}
        </div>
      </Reveal>

      {/* Filtros + recordatorios */}
      <Reveal className="mt-6" delay={0.08}>
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              ["todos", `Todos (${totals.total})`],
              ["confirmado", "Confirmaron"],
              ["pendiente", `Pendientes (${totals.pendientes})`],
              ["talvez", "Tal vez"],
              ["declinado", "No podrán"],
            ] as [Filter, string][]
          ).map(([f, label]) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "rounded-full px-3.5 py-1.5 font-sans text-sm transition-colors duration-[250ms] ease-calm " +
                (filter === f
                  ? "bg-sage-600 font-medium text-ivory"
                  : "border border-line bg-card text-ink-soft hover:border-sage-200")
              }
            >
              {label}
            </button>
          ))}

          {totals.pendientes > 0 && (
            <button
              onClick={() => setFilter("pendiente")}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gold-soft/50 px-3.5 py-1.5 font-sans text-sm font-medium text-gold-deep transition-colors duration-[250ms] ease-calm hover:bg-gold-soft/80"
            >
              <BellRing size={14} />
              Recordar a pendientes
            </button>
          )}
        </div>
      </Reveal>

      {error && (
        <p className="mt-4 font-sans text-sm text-declined">{error}</p>
      )}

      {/* Lista */}
      <Reveal className="mt-5" delay={0.1}>
        {guests === null ? (
          <div className="card-calm px-6 py-10 text-center font-sans text-sm text-ink-faint">
            Cargando invitados…
          </div>
        ) : visible.length === 0 ? (
          <div className="card-calm px-6 py-12 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sage-50 text-sage-600">
              <Users size={22} />
            </span>
            <p className="mt-4 font-serif text-xl text-ink">
              {guests.length === 0
                ? "Empieza por tu primera invitada"
                : "Nadie con ese estado (todavía)"}
            </p>
            <p className="mx-auto mt-1 max-w-sm font-sans text-sm text-ink-soft">
              {guests.length === 0
                ? "Agrégala arriba y mándale su link por WhatsApp. Confirmar le tomará un minuto."
                : "Cambia el filtro para ver al resto."}
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {visible.map((g) => {
              const meta = STATUS_META[g.status];
              const message =
                g.status === "pendiente"
                  ? reminderMessage(wedding, g)
                  : inviteMessage(wedding, g);
              return (
                <li
                  key={g.id}
                  className="card-calm flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans font-semibold text-ink">
                      {g.name}
                      {g.party > 1 && (
                        <span className="ml-2 font-normal text-ink-faint">
                          +{g.party - 1} acomp.
                        </span>
                      )}
                    </p>
                    <p className="truncate font-sans text-xs text-ink-faint">
                      {g.phone ? `📱 ${g.phone}` : "Sin teléfono"}
                      {g.menu ? ` · Menú: ${g.menu}` : ""}
                      {g.note ? ` · “${g.note}”` : ""}
                    </p>
                  </div>

                  <span
                    className={
                      "rounded-full px-3 py-1 font-sans text-xs font-semibold " +
                      meta.cls
                    }
                  >
                    {meta.label}
                  </span>

                  <div className="flex items-center gap-1">
                    <a
                      href={waLink(message, g.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Enviar por WhatsApp"
                      className="grid h-9 w-9 place-items-center rounded-full bg-confirmed/12 text-confirmed transition-colors duration-[250ms] ease-calm hover:bg-confirmed/20"
                    >
                      <MessageCircle size={16} />
                    </a>
                    <button
                      onClick={() => copy(rsvpUrl(g.token), g.id)}
                      title="Copiar link personal"
                      className="grid h-9 w-9 place-items-center rounded-full bg-sage-50 text-sage-600 transition-colors duration-[250ms] ease-calm hover:bg-sage-100"
                    >
                      {copied === g.id ? <Check size={16} /> : <Link2 size={16} />}
                    </button>
                    <button
                      onClick={async () => {
                        await api.deleteGuest(wedding, g.id).catch(() => {});
                        refresh();
                      }}
                      title="Quitar invitado"
                      className="grid h-9 w-9 place-items-center rounded-full text-ink-faint transition-colors duration-[250ms] ease-calm hover:bg-declined/10 hover:text-declined"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Reveal>

      {/* Recordatorio masivo: copia todos los mensajes de pendientes */}
      {filter === "pendiente" && visible.length > 0 && (
        <Reveal className="mt-5">
          <div className="card-calm flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <p className="font-sans text-sm text-ink-soft">
              Toca el botón verde de cada quien para recordarle por WhatsApp —o
              copia todos los mensajes de una vez.
            </p>
            <Button
              variant="soft"
              onClick={() =>
                copy(
                  visible.map((g) => reminderMessage(wedding, g)).join("\n\n"),
                  "bulk",
                )
              }
            >
              {copied === "bulk" ? <Check size={16} /> : <Copy size={16} />}
              Copiar mensajes
            </Button>
          </div>
        </Reveal>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="card-calm px-5 py-4">
      <p className={`font-serif text-3xl leading-none ${tone}`}>{value}</p>
      <p className="mt-1 font-sans text-xs text-ink-faint">{label}</p>
    </div>
  );
}

function AddGuestForm({
  onAdd,
  disabled,
}: {
  onAdd: (name: string, phone?: string) => Promise<void>;
  disabled: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="flex flex-col gap-2.5 sm:flex-row"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!name.trim() || busy) return;
        setBusy(true);
        try {
          await onAdd(name.trim(), phone.trim() || undefined);
          setName("");
          setPhone("");
        } finally {
          setBusy(false);
        }
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del invitado"
        className="h-11 flex-1 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="WhatsApp (opcional)"
        inputMode="tel"
        className="h-11 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none sm:w-56"
      />
      <Button type="submit" disabled={disabled || !name.trim() || busy}>
        <Plus size={17} />
        Agregar
      </Button>
    </form>
  );
}

function ImportBox({
  onImport,
  disabled,
}: {
  onImport: (items: { name: string; phone?: string }[]) => Promise<void>;
  disabled: boolean;
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const items = useMemo(
    () =>
      text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((line) => {
          const [name, phone] = line.split(",").map((s) => s.trim());
          return { name, phone: phone || undefined };
        })
        .filter((i) => i.name),
    [text],
  );

  return (
    <div className="mt-3 rounded-xl border border-line bg-ivory/50 p-4">
      <p className="font-sans text-xs text-ink-faint">
        Un invitado por línea: <b>Nombre, teléfono</b> (el teléfono es opcional).
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder={"Ana López, 5512345678\nRaúl Mendoza\nFamilia Torres, 5587654321"}
        className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint/60 focus:border-sage-300 focus:outline-none"
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="font-sans text-xs text-ink-faint">
          {items.length} por importar
        </span>
        <Button
          variant="soft"
          disabled={disabled || items.length === 0 || busy}
          onClick={async () => {
            setBusy(true);
            try {
              await onImport(items);
              setText("");
            } finally {
              setBusy(false);
            }
          }}
        >
          Importar {items.length > 0 ? items.length : ""}
        </Button>
      </div>
    </div>
  );
}
