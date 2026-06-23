"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingProvider";
import { RingMark, Wordmark } from "@/components/brand/RingMark";
import { Button } from "@/components/ui/Button";
import { EASE_CALM } from "@/lib/motion";

export default function LoginPage() {
  const router = useRouter();
  const { ready, session, wedding, signIn } = useWedding();
  const [method, setMethod] = useState<"whatsapp" | "email">("whatsapp");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  // Si ya hay sesión, no te quedes en login.
  useEffect(() => {
    if (ready && session) router.replace(wedding ? "/tablero" : "/configurar");
  }, [ready, session, wedding, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    signIn({ name: name.trim(), contact: contact.trim(), method });
    router.push(wedding ? "/tablero" : "/configurar");
  }

  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      {/* Panel de vibra — solo desktop. Sage profundo, anillo dorado, una frase cálida. */}
      <aside className="relative hidden overflow-hidden bg-rosa-700 lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(120% 80% at 80% 10%, rgba(194,163,107,0.22), transparent 55%), radial-gradient(90% 70% at 10% 100%, rgba(255,253,249,0.10), transparent 60%)",
          }}
        />
        <div className="relative flex items-center gap-3 text-cream">
          <RingMark size={36} />
          <span className="font-serif text-2xl">
            wed<span className="text-gold-soft">Ring</span>
          </span>
        </div>

        <motion.div
          className="relative max-w-md"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CALM, delay: 0.2 }}
        >
          <div className="rule-gold mb-7" />
          <p className="font-serif text-[2.1rem] leading-[1.25] text-cream">
            Tranquila. Yo te ayudo a ponerlo en orden.
          </p>
          <p className="mt-5 max-w-sm font-sans text-rosa-100/90">
            Tu boda como tú la imaginas, a tu ritmo. Todo en un solo lugar
            ordenado —y donde ya estás: WhatsApp.
          </p>
        </motion.div>

        <p className="relative font-sans text-sm text-rosa-200/70">
          Hecho en México · para bodas con alma
        </p>
      </aside>

      {/* Formulario */}
      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_CALM }}
        >
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <RingMark size={34} />
            <Wordmark />
          </div>

          <p className="eyebrow">Te damos la bienvenida</p>
          <h1 className="mt-2 text-[2.15rem] leading-tight">
            Empecemos por lo importante: tú.
          </h1>
          <p className="mt-3 font-sans text-ink-soft">
            Sin contraseñas complicadas. Entra como entras a todo lo demás.
          </p>

          {/* Método: WhatsApp por defecto (es el corazón de wedRing) */}
          <div className="mt-8 grid grid-cols-2 gap-2 rounded-full bg-rosa-50 p-1">
            <MethodTab
              active={method === "whatsapp"}
              onClick={() => setMethod("whatsapp")}
              icon={<MessageCircle size={16} />}
              label="WhatsApp"
            />
            <MethodTab
              active={method === "email"}
              onClick={() => setMethod("email")}
              icon={<Mail size={16} />}
              label="Correo"
            />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field
              label="¿Cómo te llamas?"
              value={name}
              onChange={setName}
              placeholder="Tu nombre"
              autoFocus
            />
            <Field
              label={method === "whatsapp" ? "Tu WhatsApp" : "Tu correo"}
              value={contact}
              onChange={setContact}
              placeholder={
                method === "whatsapp" ? "55 1234 5678" : "tu@correo.com"
              }
              type={method === "whatsapp" ? "tel" : "email"}
            />

            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full"
              disabled={!name.trim() || !contact.trim()}
            >
              Entrar a mi boda
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="mt-6 text-center font-sans text-sm text-ink-faint">
            El RSVP, los invitados y tu web de boda son siempre gratis.
          </p>
        </motion.div>
      </section>
    </main>
  );
}

function MethodTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex h-10 items-center justify-center gap-2 rounded-full font-sans text-sm font-medium transition-colors duration-[250ms] ease-calm " +
        (active
          ? "bg-card text-rosa-700 shadow-calm"
          : "text-ink-faint hover:text-ink-soft")
      }
    >
      {icon}
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-sm font-medium text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-line bg-card px-4 font-sans text-ink placeholder:text-ink-faint/70 transition-colors duration-[250ms] ease-calm focus:border-rosa-300 focus:outline-none"
      />
    </label>
  );
}
