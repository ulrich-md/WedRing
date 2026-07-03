"use client";

// Configuración de la web de boda (lado pareja): mensaje de bienvenida,
// link público y compartir. El sitio vive en /boda/[slug].

import { useEffect, useState } from "react";
import { Globe, Copy, Check, ExternalLink, MessageCircle } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { api, waLink } from "@/lib/api";

export default function WebPage() {
  const { wedding } = useWedding();
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const url =
    wedding?.slug && typeof window !== "undefined"
      ? `${window.location.origin}/boda/${wedding.slug}`
      : "";

  // Cargar el mensaje actual desde el servidor.
  useEffect(() => {
    if (!wedding?.serverId || !wedding.coupleKey) return;
    fetch(`/api/weddings/${wedding.serverId}`, {
      headers: { "x-couple-key": wedding.coupleKey },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { wedding: { webMessage: string } }) =>
        setMessage(d.wedding.webMessage ?? ""),
      )
      .catch(() => {});
  }, [wedding?.serverId, wedding?.coupleKey]);

  if (!wedding) return null;

  return (
    <div>
      <SectionHeader
        eyebrow="Para tus invitados"
        title="Tu web de boda"
        subtitle="Un sitio simple y bonito con sus nombres, la fecha y cómo confirmar. Siempre gratis."
      />

      {!wedding.slug ? (
        <Reveal className="mt-8">
          <div className="card-calm px-6 py-8 text-center font-sans text-sm text-ink-soft">
            Preparando tu web… recarga en unos segundos.
          </div>
        </Reveal>
      ) : (
        <>
          {/* Link público */}
          <Reveal className="mt-8">
            <div className="card-calm p-6 sm:p-7">
              <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-eyebrow text-gold-deep">
                <Globe size={14} /> Tu sitio ya está publicado
              </p>
              <p className="mt-2 break-all font-serif text-xl text-ink">{url}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="soft"
                  onClick={async () => {
                    await navigator.clipboard.writeText(url).catch(() => {});
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copiado" : "Copiar link"}
                </Button>
                <a
                  href={waLink(
                    `¡Nos casamos! 💍 Conoce los detalles de nuestra boda aquí: ${url}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-confirmed/12 px-5 font-sans text-[0.95rem] font-medium text-confirmed hover:bg-confirmed/20"
                >
                  <MessageCircle size={16} /> Compartir por WhatsApp
                </a>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full px-5 font-sans text-[0.95rem] text-ink-soft hover:bg-sage-50 hover:text-ink"
                >
                  <ExternalLink size={16} /> Ver mi web
                </a>
              </div>
            </div>
          </Reveal>

          {/* Mensaje de bienvenida */}
          <Reveal className="mt-6" delay={0.06}>
            <div className="card-calm p-6 sm:p-7">
              <h2 className="font-serif text-xl text-ink">Su mensaje</h2>
              <p className="mt-1 font-sans text-sm text-ink-faint">
                Unas líneas suyas para recibir a sus invitados (opcional).
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={600}
                placeholder="Nos hace muy felices compartir este día con ustedes…"
                className="mt-3 w-full rounded-xl border border-line bg-ivory/60 px-4 py-3 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/60 focus:border-sage-300 focus:outline-none"
              />
              <div className="mt-3 flex items-center gap-3">
                <Button
                  onClick={async () => {
                    await api.syncWedding(wedding, { webMessage: message });
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                  }}
                >
                  {saved ? (
                    <>
                      <Check size={16} /> Guardado
                    </>
                  ) : (
                    "Guardar"
                  )}
                </Button>
                {saved && (
                  <span className="font-sans text-sm text-sage-600">
                    Tu web ya lo muestra.
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        </>
      )}
    </div>
  );
}
