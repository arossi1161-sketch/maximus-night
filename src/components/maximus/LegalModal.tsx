import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function LegalModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card neon-border rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl text-gold-gradient">{title}</h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-gold"
                aria-label="Chiudi"
              >
                <X size={24} />
              </button>
            </div>
            <div className="divider-gold mb-6" />
            <div className="prose prose-invert prose-sm max-w-none text-foreground/85 space-y-4 leading-relaxed">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PrivacyContent() {
  return (
    <>
      <p className="text-xs text-muted-foreground">Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}</p>
      <h3 className="font-display text-xl text-gold mt-4">1. Titolare del trattamento</h3>
      <p>MAXIMUS Luxury Night Club — Via della Notte 1, 00100 Roma — info@maximusclub.it</p>

      <h3 className="font-display text-xl text-gold mt-4">2. Dati raccolti</h3>
      <p>Raccogliamo dati di navigazione (indirizzo IP, browser, pagine visitate) e dati forniti volontariamente
      tramite il modulo di contatto o prenotazione (nome, email, telefono).</p>

      <h3 className="font-display text-xl text-gold mt-4">3. Finalità</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Gestione delle prenotazioni e delle richieste di contatto</li>
        <li>Miglioramento del sito tramite statistiche aggregate</li>
        <li>Adempimento di obblighi di legge</li>
        <li>Marketing solo previo consenso esplicito</li>
      </ul>

      <h3 className="font-display text-xl text-gold mt-4">4. Base giuridica</h3>
      <p>I trattamenti si fondano sul consenso (art. 6.1.a GDPR), sull'esecuzione di un contratto (art. 6.1.b)
      e sul legittimo interesse (art. 6.1.f).</p>

      <h3 className="font-display text-xl text-gold mt-4">5. Conservazione</h3>
      <p>I dati sono conservati per il tempo strettamente necessario alle finalità, nel rispetto degli obblighi normativi.</p>

      <h3 className="font-display text-xl text-gold mt-4">6. Diritti dell'interessato</h3>
      <p>Hai diritto di accesso, rettifica, cancellazione, limitazione, portabilità, opposizione e di proporre reclamo
      al Garante Privacy (www.garanteprivacy.it). Per esercitare i tuoi diritti scrivi a privacy@maximusclub.it.</p>

      <h3 className="font-display text-xl text-gold mt-4">7. Trasferimenti</h3>
      <p>I dati non vengono trasferiti al di fuori dello Spazio Economico Europeo salvo adeguate garanzie.</p>
    </>
  );
}

export function CookieContent({ onManage }: { onManage: () => void }) {
  return (
    <>
      <p>
        Questo sito utilizza cookie e tecnologie simili per offrirti la migliore esperienza possibile,
        in conformità al GDPR e alla Direttiva ePrivacy.
      </p>

      <h3 className="font-display text-xl text-gold mt-4">Cookie tecnici (necessari)</h3>
      <p>Indispensabili per il corretto funzionamento del sito. Non richiedono consenso.</p>

      <h3 className="font-display text-xl text-gold mt-4">Cookie analitici</h3>
      <p>Raccolgono informazioni in forma aggregata sull'uso del sito. Richiedono il tuo consenso.</p>

      <h3 className="font-display text-xl text-gold mt-4">Cookie di marketing</h3>
      <p>Utilizzati per profilazione e annunci personalizzati. Richiedono il tuo consenso esplicito.</p>

      <h3 className="font-display text-xl text-gold mt-4">Gestione delle preferenze</h3>
      <p>Puoi modificare in qualsiasi momento le tue preferenze cliccando il pulsante qui sotto.</p>
      <button onClick={onManage} className="btn-neon-gold mt-4 px-6 py-3 rounded-md text-xs">
        Gestisci Preferenze Cookie
      </button>
    </>
  );
}

export function TermsContent() {
  return (
    <>
      <p className="text-xs text-muted-foreground">Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}</p>
      <h3 className="font-display text-xl text-gold mt-4">1. Accesso al locale</h3>
      <p>L'ingresso è riservato a maggiorenni. La direzione si riserva il diritto di non ammettere persone non gradite,
      a propria insindacabile valutazione, nel rispetto delle leggi vigenti.</p>

      <h3 className="font-display text-xl text-gold mt-4">2. Prenotazioni</h3>
      <p>Le prenotazioni di tavoli e servizi sono soggette a conferma. La cancellazione deve essere comunicata almeno
      24 ore prima dell'evento.</p>

      <h3 className="font-display text-xl text-gold mt-4">3. Responsabilità</h3>
      <p>MAXIMUS non risponde di oggetti smarriti o dimenticati all'interno del locale.</p>

      <h3 className="font-display text-xl text-gold mt-4">4. Proprietà intellettuale</h3>
      <p>Tutti i contenuti del sito (testi, immagini, logo) sono di proprietà di MAXIMUS e protetti dalle leggi sul copyright.</p>

      <h3 className="font-display text-xl text-gold mt-4">5. Legge applicabile</h3>
      <p>Le presenti condizioni sono regolate dalla legge italiana. Foro competente: Roma.</p>
    </>
  );
}
