import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Nome troppo corto").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Messaggio troppo corto").max(2000),
});

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
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
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  if (status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card neon-border rounded-2xl p-10 text-center"
      >
        <CheckCircle2 className="w-14 h-14 text-gold mx-auto mb-4" />
        <h3 className="font-display text-2xl mb-2 text-gold-gradient">Grazie!</h3>
        <p className="text-muted-foreground">Abbiamo ricevuto il tuo messaggio. Ti risponderemo al più presto.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-sm text-gold hover:underline">
          Invia un altro messaggio
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card neon-border rounded-2xl p-6 md:p-10 space-y-5" noValidate>
      <h3 className="font-display text-2xl mb-2">Scrivici un Messaggio</h3>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nome *" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-luxe"
            autoComplete="name"
            required
            maxLength={100}
          />
        </Field>
        <Field label="Email *" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-luxe"
            autoComplete="email"
            required
            maxLength={255}
          />
        </Field>
      </div>
      <Field label="Telefono" error={errors.phone}>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="input-luxe"
          autoComplete="tel"
          maxLength={30}
        />
      </Field>
      <Field label="Messaggio *" error={errors.message}>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          className="input-luxe resize-none"
          required
          maxLength={2000}
        />
      </Field>
      {status === "error" && (
        <p className="text-sm text-red-400">Errore nell'invio. Riprova tra qualche istante.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-neon-gold w-full px-8 py-4 rounded-md text-sm inline-flex items-center justify-center gap-3 disabled:opacity-60"
      >
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Invia Messaggio
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">{label}</span>
      {children}
      {error && <span className="text-xs text-red-400 mt-1 block">{error}</span>}
    </label>
  );
}
