import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { Briefcase, Loader2, CheckCircle2, Sparkles, Clock, Wallet, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ROLES = [
  "Ragazza Immagine",
  "Barista / Bartender",
  "Hostess",
  "Cameriera / Cameriere",
  "PR / Promoter",
  "Altro",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Nome troppo corto").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  phone: z.string().trim().min(6, "Telefono non valido").max(30),
  role: z.enum(ROLES, { errorMap: () => ({ message: "Seleziona un ruolo" }) }),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const BENEFITS = [
  { icon: Sparkles, label: "Ambiente stimolante" },
  { icon: Clock, label: "Orari flessibili" },
  { icon: Wallet, label: "Ottimi guadagni" },
  { icon: Users, label: "Team giovane" },
];

export function JobApplicationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "" as (typeof ROLES)[number] | "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    const { error } = await supabase.from("job_applications").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      role: parsed.data.role,
      message: parsed.data.message || null,
    });
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("ok");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Sei una persona dinamica, solare e ami il mondo della notte? MAXIMUS è sempre alla
          ricerca di nuovi talenti per ampliare il proprio team.
        </p>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Offriamo un ambiente di lavoro stimolante, orari flessibili e ottime opportunità di
          crescita. Unisciti a noi e fai parte delle notti più esclusive dell'Umbria.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-4 rounded-xl glass-card neon-border"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {status === "ok" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card neon-border rounded-2xl p-10 text-center"
        >
          <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
          <h3 className="font-display text-2xl md:text-3xl mb-3 text-gold-gradient">
            Candidatura Inviata
          </h3>
          <p className="text-muted-foreground">
            Grazie {form.name}! Ti ricontatteremo a breve all'indirizzo{" "}
            <span className="text-gold">{form.email}</span>.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={submit}
          className="glass-card neon-border rounded-2xl p-6 md:p-8 space-y-5"
          noValidate
        >
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-6 h-6 text-gold" />
            <h3 className="font-display text-xl md:text-2xl">Invia la tua Candidatura</h3>
          </div>
          <p className="text-xs text-muted-foreground -mt-3">Compila il form e ti ricontatteremo.</p>

          <Field label="Nome e Cognome *" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-luxe"
              required
              maxLength={100}
              autoComplete="name"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Email *" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-luxe"
                required
                maxLength={255}
                autoComplete="email"
              />
            </Field>
            <Field label="Telefono *" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-luxe"
                required
                maxLength={30}
                autoComplete="tel"
              />
            </Field>
          </div>

          <Field label="Seleziona Ruolo *" error={errors.role}>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as (typeof ROLES)[number] })
              }
              className="input-luxe"
              required
            >
              <option value="">— Scegli un ruolo —</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Messaggio (opzionale)" error={errors.message}>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="input-luxe resize-none"
              maxLength={1000}
              placeholder="Raccontaci qualcosa di te, esperienze, disponibilità..."
            />
          </Field>

          {status === "error" && (
            <p className="text-sm text-red-400">Errore. Verifica i dati e riprova.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-neon-gold w-full px-8 py-4 rounded-md text-sm inline-flex items-center justify-center gap-3 disabled:opacity-60"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Briefcase className="w-4 h-4" />
            )}
            Invia Candidatura
          </button>
          <p className="text-xs text-muted-foreground text-center">
            I tuoi dati saranno trattati nel rispetto della privacy.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-400 mt-1 block">{error}</span>}
    </label>
  );
}
