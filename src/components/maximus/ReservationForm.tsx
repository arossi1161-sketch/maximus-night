import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { CalendarDays, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { logFormSubmission } from "@/lib/form-log";


const today = new Date().toISOString().slice(0, 10);

const schema = z.object({
  name: z.string().trim().min(2, "Nome troppo corto").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  phone: z.string().trim().min(6, "Telefono non valido").max(30),
  reservation_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data non valida"),
  reservation_time: z.string().regex(/^\d{2}:\d{2}$/, "Ora non valida"),
  party_size: z.number().int().min(1).max(30),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reservation_date: "",
    reservation_time: "22:30",
    party_size: 2,
    notes: "",
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
      void logFormSubmission({
        formType: "reservation",
        status: "validation_error",
        errorStage: "zod",
        errorMessage: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
      });
      return;
    }
    setErrors({});
    setStatus("loading");
    const summary = {
      email: parsed.data.email,
      date: parsed.data.reservation_date,
      time: parsed.data.reservation_time,
      party: parsed.data.party_size,
    };
    const { error } = await supabase.from("reservations").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      reservation_date: parsed.data.reservation_date,
      reservation_time: parsed.data.reservation_time,
      party_size: parsed.data.party_size,
      notes: parsed.data.notes || null,
    });
    if (error) {
      console.error(error);
      void logFormSubmission({
        formType: "reservation",
        status: "db_error",
        errorStage: "insert",
        errorMessage: error.message,
        payloadSummary: summary,
      });
      setStatus("error");
      return;
    }
    void logFormSubmission({
      formType: "reservation",
      status: "success",
      payloadSummary: summary,
    });
    setStatus("ok");
  };

  if (status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card neon-border rounded-2xl p-10 text-center max-w-2xl mx-auto"
      >
        <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
        <h3 className="font-display text-3xl mb-3 text-gold-gradient">Prenotazione Ricevuta</h3>
        <p className="text-muted-foreground mb-2">
          Grazie {form.name}! Riceverai una conferma all'indirizzo{" "}
          <span className="text-gold">{form.email}</span>.
        </p>
        <p className="text-sm text-muted-foreground">
          Tavolo per {form.party_size} il {form.reservation_date} alle {form.reservation_time}.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="glass-card neon-border rounded-2xl p-6 md:p-10 space-y-5 max-w-2xl mx-auto"
      noValidate
    >
      <div className="flex items-center gap-3 mb-2">
        <CalendarDays className="w-6 h-6 text-gold" />
        <h3 className="font-display text-2xl">Prenota il Tuo Tavolo</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
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
      </div>

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

      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="Data *" error={errors.reservation_date}>
          <input
            type="date"
            value={form.reservation_date}
            min={today}
            onChange={(e) => setForm({ ...form, reservation_date: e.target.value })}
            className="input-luxe"
            required
          />
        </Field>
        <Field label="Ora *" error={errors.reservation_time}>
          <input
            type="time"
            value={form.reservation_time}
            onChange={(e) => setForm({ ...form, reservation_time: e.target.value })}
            className="input-luxe"
            required
          />
        </Field>
        <Field label="N. Persone *" error={errors.party_size}>
          <input
            type="number"
            min={1}
            max={30}
            value={form.party_size}
            onChange={(e) => setForm({ ...form, party_size: parseInt(e.target.value) || 1 })}
            className="input-luxe"
            required
          />
        </Field>
      </div>

      <Field label="Note (allergie, occasioni speciali...)" error={errors.notes}>
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          className="input-luxe resize-none"
          maxLength={1000}
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
          <CalendarDays className="w-4 h-4" />
        )}
        Conferma Prenotazione
      </button>
      <p className="text-xs text-muted-foreground text-center">
        La prenotazione sarà confermata via email entro 24 ore.
      </p>
    </form>
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
