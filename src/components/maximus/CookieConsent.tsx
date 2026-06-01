import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "maximus_cookie_consent_v1";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

export function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function saveConsent(c: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

export function CookieConsent({
  forceOpen,
  onClose,
}: {
  forceOpen?: boolean;
  onClose?: () => void;
}) {
  const [show, setShow] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      const c = loadConsent();
      if (c) {
        setAnalytics(c.analytics);
        setMarketing(c.marketing);
      }
      setShowPrefs(true);
      setShow(true);
      return;
    }
    const existing = loadConsent();
    if (!existing) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, [forceOpen]);

  const close = () => {
    setShow(false);
    setShowPrefs(false);
    onClose?.();
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });
    close();
  };
  const rejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });
    close();
  };
  const saveCustom = () => {
    saveConsent({ necessary: true, analytics, marketing, timestamp: Date.now() });
    close();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22 }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-[200] max-w-3xl md:mx-auto"
        >
          <div className="glass-card neon-border rounded-2xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted-foreground hover:text-gold"
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-xl text-gold-gradient">
                  La tua privacy è importante
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Utilizziamo cookie tecnici necessari e, previo tuo consenso, cookie di analisi
                  e marketing per migliorare la tua esperienza, ai sensi del GDPR (Reg. UE 2016/679).
                  Puoi accettare, rifiutare o personalizzare le tue preferenze in qualsiasi momento.
                </p>
              </div>
            </div>

            {showPrefs && (
              <div className="space-y-3 my-5 border-t border-border pt-5">
                <PrefRow
                  title="Cookie Necessari"
                  desc="Indispensabili per il funzionamento del sito. Sempre attivi."
                  checked
                  disabled
                />
                <PrefRow
                  title="Cookie di Analisi"
                  desc="Ci aiutano a capire come usi il sito (statistiche anonime)."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <PrefRow
                  title="Cookie di Marketing"
                  desc="Utilizzati per mostrarti contenuti pubblicitari pertinenti."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button onClick={acceptAll} className="btn-neon-gold px-6 py-3 rounded-md text-xs flex-1">
                Accetta Tutti
              </button>
              <button onClick={rejectAll} className="btn-neon-outline px-6 py-3 rounded-md text-xs flex-1">
                Rifiuta Tutti
              </button>
              {showPrefs ? (
                <button onClick={saveCustom} className="btn-neon-outline px-6 py-3 rounded-md text-xs flex-1">
                  Salva Preferenze
                </button>
              ) : (
                <button
                  onClick={() => setShowPrefs(true)}
                  className="text-xs text-muted-foreground hover:text-gold underline tracking-wider self-center px-2"
                >
                  Personalizza
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PrefRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
      <button
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
          checked ? "bg-gold" : "bg-muted"
        } ${disabled ? "opacity-60" : "cursor-pointer"}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
