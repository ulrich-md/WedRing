"use client";

// Página PÚBLICA de RSVP. El invitado llega desde su link personal de
// WhatsApp: sin login, sin apps, mobile-first, ES/EN. Solo puede ver y
// responder SU invitación (el endpoint valida el token).

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Clock, X, Minus, Plus } from "lucide-react";
import { RingMark } from "@/components/brand/RingMark";
import { EASE_CALM } from "@/lib/motion";
import { MENU_OPTIONS, type RsvpStatus } from "@/lib/types";

interface Data {
  wedding: { partners: [string, string]; date: string | null; location: string };
  guest: {
    name: string;
    status: RsvpStatus;
    party: number;
    menu: string | null;
    note: string | null;
  };
}

const T = {
  es: {
    invited: "Estás invitada a la boda de",
    hello: (n: string) => `Hola, ${n} 🤍`,
    question: "¿Nos acompañas?",
    yes: "Sí, ahí estaré",
    maybe: "Tal vez",
    no: "No podré",
    party: "¿Cuántos van contigo? (incluyéndote)",
    menu: "¿Qué prefieres de menú?",
    note: "¿Algo que debamos saber? (alergias, niños…)",
    notePh: "Escríbenos aquí (opcional)",
    send: "Enviar mi respuesta",
    sending: "Enviando…",
    thanksYes: "¡Qué alegría! Te esperamos 🤍",
    thanksMaybe: "Gracias por avisar. ¡Ojalá se pueda!",
    thanksNo: "Gracias por avisarnos. Te vamos a extrañar.",
    change: "Cambiar mi respuesta",
    already: "Ya respondiste:",
    notFound: "Este link no es válido. Pide a los novios que te lo reenvíen.",
    date: "Fecha por confirmar",
    poweredBy: "Hecho con",
  },
  en: {
    invited: "You are invited to the wedding of",
    hello: (n: string) => `Hi, ${n} 🤍`,
    question: "Will you join us?",
    yes: "Yes, I'll be there",
    maybe: "Maybe",
    no: "Can't make it",
    party: "How many of you? (including you)",
    menu: "Menu preference",
    note: "Anything we should know? (allergies, kids…)",
    notePh: "Write here (optional)",
    send: "Send my answer",
    sending: "Sending…",
    thanksYes: "Wonderful! See you there 🤍",
    thanksMaybe: "Thanks for letting us know. Hope you can!",
    thanksNo: "Thanks for telling us. You'll be missed.",
    change: "Change my answer",
    already: "You answered:",
    notFound: "This link is not valid. Ask the couple to resend it.",
    date: "Date to be confirmed",
    poweredBy: "Made with",
  },
} as const;

const MESES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function longDate(date: string | null, lang: "es" | "en", fallback: string) {
  if (!date) return fallback;
  const d = new Date(date + "T00:00:00");
  return lang === "es"
    ? `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`
    : `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function RsvpPage() {
  const { token } = useParams<{ token: string }>();
  const [lang, setLang] = useState<"es" | "en">("es");
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);
  const [answer, setAnswer] = useState<RsvpStatus | null>(null);
  const [party, setParty] = useState(1);
  const [menu, setMenu] = useState<string>("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const t = T[lang];

  useEffect(() => {
    fetch(`/api/rsvp/${token}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Data) => {
        setData(d);
        if (d.guest.status !== "pendiente") {
          setAnswer(d.guest.status);
          setDone(true);
        }
        setParty(d.guest.party || 1);
        setMenu(d.guest.menu ?? "");
        setNote(d.guest.note ?? "");
      })
      .catch(() => setFailed(true));
  }, [token]);

  const thanks = useMemo(() => {
    if (answer === "confirmado") return t.thanksYes;
    if (answer === "talvez") return t.thanksMaybe;
    return t.thanksNo;
  }, [answer, t]);

  async function submit() {
    if (!answer || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/rsvp/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: answer, party, menu, note }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center bg-ivory px-5 py-8">
      {/* idioma */}
      <div className="mb-6 flex w-full max-w-md justify-end">
        <div className="flex rounded-full border border-line bg-card p-0.5">
          {(["es", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={
                "rounded-full px-3 py-1 font-sans text-xs font-semibold uppercase transition-colors duration-[250ms] ease-calm " +
                (lang === l ? "bg-sage-600 text-ivory" : "text-ink-faint")
              }
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_CALM }}
        className="w-full max-w-md"
      >
        {failed ? (
          <div className="card-calm px-6 py-10 text-center">
            <RingMark size={34} className="mx-auto opacity-60" />
            <p className="mt-4 font-sans text-ink-soft">{t.notFound}</p>
          </div>
        ) : !data ? (
          <div className="card-calm px-6 py-14 text-center">
            <RingMark size={38} className="mx-auto animate-pulse opacity-60" />
          </div>
        ) : (
          <div className="card-calm overflow-hidden">
            {/* encabezado de la invitación */}
            <div className="border-b border-line bg-gradient-to-b from-sage-50/80 to-card px-6 pb-7 pt-8 text-center">
              <RingMark size={34} className="mx-auto" />
              <p className="eyebrow mt-4">{t.invited}</p>
              <h1 className="mt-2 font-serif text-[2rem] leading-tight text-ink">
                {data.wedding.partners[0]}{" "}
                <span className="text-gold">&</span>{" "}
                {data.wedding.partners[1]}
              </h1>
              <p className="mt-2 font-sans text-sm text-ink-soft">
                {longDate(data.wedding.date, lang, t.date)}
                {data.wedding.location ? ` · ${data.wedding.location}` : ""}
              </p>
            </div>

            <div className="px-6 py-7">
              {done ? (
                <div className="text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-confirmed/12 text-confirmed">
                    <Check size={22} />
                  </span>
                  <p className="mt-4 font-serif text-xl text-ink">{thanks}</p>
                  <p className="mt-2 font-sans text-sm text-ink-faint">
                    {t.already}{" "}
                    <b>
                      {answer === "confirmado"
                        ? t.yes
                        : answer === "talvez"
                          ? t.maybe
                          : t.no}
                    </b>
                    {answer === "confirmado" && party > 1 ? ` · ${party}` : ""}
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-5 font-sans text-sm text-sage-600 underline-offset-4 hover:underline"
                  >
                    {t.change}
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-center font-sans text-sm text-ink-soft">
                    {t.hello(data.guest.name)}
                  </p>
                  <p className="mt-1 text-center font-serif text-xl text-ink">
                    {t.question}
                  </p>

                  {/* respuesta */}
                  <div className="mt-5 space-y-2">
                    <AnswerBtn
                      active={answer === "confirmado"}
                      onClick={() => setAnswer("confirmado")}
                      icon={<Check size={16} />}
                      label={t.yes}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <AnswerBtn
                        active={answer === "talvez"}
                        onClick={() => setAnswer("talvez")}
                        icon={<Clock size={15} />}
                        label={t.maybe}
                        small
                      />
                      <AnswerBtn
                        active={answer === "declinado"}
                        onClick={() => setAnswer("declinado")}
                        icon={<X size={15} />}
                        label={t.no}
                        small
                      />
                    </div>
                  </div>

                  {/* detalles solo si viene */}
                  {answer === "confirmado" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.4, ease: EASE_CALM }}
                      className="overflow-hidden"
                    >
                      <p className="mt-6 font-sans text-sm font-medium text-ink-soft">
                        {t.party}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <Stepper
                          value={party}
                          onChange={(v) => setParty(Math.min(12, Math.max(1, v)))}
                        />
                      </div>

                      <p className="mt-5 font-sans text-sm font-medium text-ink-soft">
                        {t.menu}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {MENU_OPTIONS.map((m) => (
                          <button
                            key={m}
                            onClick={() => setMenu(menu === m ? "" : m)}
                            className={
                              "rounded-full px-4 py-2 font-sans text-sm transition-colors duration-[250ms] ease-calm " +
                              (menu === m
                                ? "bg-sage-600 font-medium text-ivory"
                                : "border border-line bg-card text-ink-soft")
                            }
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {answer && (
                    <>
                      <p className="mt-5 font-sans text-sm font-medium text-ink-soft">
                        {t.note}
                      </p>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={2}
                        placeholder={t.notePh}
                        className="mt-2 w-full rounded-xl border border-line bg-ivory/60 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint/60 focus:border-sage-300 focus:outline-none"
                      />
                      <button
                        onClick={submit}
                        disabled={busy}
                        className="mt-5 h-12 w-full rounded-full bg-sage-600 font-sans font-medium text-ivory shadow-calm transition-colors duration-[250ms] ease-calm hover:bg-sage-700 disabled:opacity-60"
                      >
                        {busy ? t.sending : t.send}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* pie discreto: aquí las invitadas conocen wedRing */}
        <p className="mt-6 text-center font-sans text-xs text-ink-faint">
          {t.poweredBy}{" "}
          <a href="/" className="font-semibold text-sage-600 hover:text-sage-700">
            wedRing
          </a>
        </p>
      </motion.div>
    </main>
  );
}

function AnswerBtn({
  active,
  onClick,
  icon,
  label,
  small,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "flex w-full items-center justify-center gap-2 rounded-full font-sans transition-all duration-[250ms] ease-calm " +
        (small ? "px-3 py-2.5 text-sm" : "px-4 py-3 text-[0.95rem]") +
        " " +
        (active
          ? "bg-sage-600 font-semibold text-ivory shadow-calm"
          : "border border-line bg-card text-ink-soft hover:border-sage-200")
      }
    >
      <span
        className={
          "grid h-5 w-5 place-items-center rounded-full " +
          (active ? "bg-ivory/20 text-ivory" : "bg-sage-50 text-sage-500")
        }
      >
        {icon}
      </span>
      {label}
    </button>
  );
}

function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-full border border-line bg-card px-2 py-1.5">
      <button
        onClick={() => onChange(value - 1)}
        className="grid h-9 w-9 place-items-center rounded-full bg-sage-50 text-sage-600 hover:bg-sage-100"
        aria-label="Menos"
      >
        <Minus size={15} />
      </button>
      <span className="min-w-8 text-center font-serif text-2xl text-ink">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="grid h-9 w-9 place-items-center rounded-full bg-sage-50 text-sage-600 hover:bg-sage-100"
        aria-label="Más"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
