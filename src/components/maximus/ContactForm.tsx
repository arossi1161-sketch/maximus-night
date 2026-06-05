import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { logFormSubmission } from "@/lib/form-log";

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
      void logFormSubmission({
        formType: "contact",
        status: "validation_error",
        errorStage: "zod",
        errorMessage: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
      });
      return;
    }
    setErrors({});
    setStatus("loading");
    const submissionId = crypto.randomUUID();
    const summary = { email: parsed.data.email, hasPhone: !!parsed.data.phone, msgLen: parsed.data.message.length };
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    if (error) {
      console.error(error);
      void logFormSubmission({
        formType: "contact",
        status: "db_error",
        errorStage: "insert",
        errorMessage: error.message,
        payloadSummary: summary,
      });
      setStatus("error");
      return;
    }
    const { error: emailError } = await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "contact-notification",
        recipientEmail: "info@maximusterni.com",
        idempotencyKey: `contact-${submissionId}`,
        templateData: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || "",
          message: parsed.data.message,
        },
      },
    });
    if (emailError) {
      void logFormSubmission({
        formType: "contact",
        status: "email_error",
        errorStage: "send-transactional-email",
        errorMessage: emailError.message,
        recipientEmail: "info@maximusterni.com",
        payloadSummary: summary,
      });
    } else {
      void logFormSubmission({
        formType: "contact",
        status: "success",
        recipientEmail: "info@maximusterni.com",
        payloadSummary: summary,
      });
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
        <p className="text-muted-foreground">
          Abbiamo ricevuto il tuo messaggio. Ti risponderemo al più presto.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-gold hover:underline"
        >
          Invia un altro messaggio
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="glass-card neon-border rounded-2xl p-6 md:p-10 space-y-5"
      noValidate
    >
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
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        Invia Messaggio
      </button>

      <div className="relative flex items-center gap-3 py-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">oppure</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <a
        href={`https://wa.me/393883716721?text=${encodeURIComponent(
          "Ciao MAXIMUS! Vorrei avere informazioni sul locale e sulle prossime serate.",
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-8 py-4 rounded-md text-sm inline-flex items-center justify-center gap-3 bg-[#25D366] text-black font-semibold hover:bg-[#1ebe5d] transition-colors"
      >
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.02 5.33C10.13 5.33 5.34 10.12 5.34 16c0 1.88.5 3.71 1.43 5.33L5.33 26.67l5.49-1.43A10.61 10.61 0 0 0 16.02 26.67c5.89 0 10.68-4.79 10.68-10.67 0-2.85-1.11-5.53-3.13-7.54a10.6 10.6 0 0 0-7.55-3.13zm0 19.55a8.82 8.82 0 0 1-4.51-1.24l-.32-.19-3.26.85.87-3.18-.21-.33A8.86 8.86 0 0 1 7.18 16c0-4.88 3.97-8.85 8.84-8.85 2.36 0 4.58.92 6.25 2.59a8.79 8.79 0 0 1 2.59 6.26c0 4.88-3.97 8.85-8.84 8.85z" />
        </svg>
        Scrivici su WhatsApp
      </a>

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
