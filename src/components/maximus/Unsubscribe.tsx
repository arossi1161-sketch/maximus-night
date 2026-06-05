import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export function Unsubscribe() {
  const token = new URLSearchParams(window.location.search).get("token");
  const [state, setState] = useState<"loading" | "valid" | "already" | "invalid" | "done" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const r = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_ANON },
        });
        const d = await r.json();
        if (d.valid) setState("valid");
        else if (d.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState("loading");
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
    if (error || (data && data.error)) setState("error");
    else setState("done");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="glass-card neon-border rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="font-display text-3xl text-gold-gradient mb-4">Disiscrizione</h1>
        {state === "loading" && <p className="text-muted-foreground">Verifica in corso…</p>}
        {state === "valid" && (
          <>
            <p className="text-muted-foreground mb-6">Confermi la disiscrizione dalle email di MAXIMUS?</p>
            <button onClick={confirm} className="btn-neon-gold px-8 py-3 rounded-md text-sm">
              Conferma disiscrizione
            </button>
          </>
        )}
        {state === "done" && <p className="text-muted-foreground">Disiscrizione completata. Non riceverai più email.</p>}
        {state === "already" && <p className="text-muted-foreground">Sei già disiscritto.</p>}
        {state === "invalid" && <p className="text-red-400">Link non valido o scaduto.</p>}
        {state === "error" && <p className="text-red-400">Errore. Riprova più tardi.</p>}
      </div>
    </div>
  );
}
