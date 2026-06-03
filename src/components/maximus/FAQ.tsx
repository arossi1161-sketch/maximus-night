const faqs = [
  {
    q: "Dove si trova il MAXIMUS Night Club?",
    a: "Il MAXIMUS Night Club si trova a Stroncone, a pochi minuti da Terni, nel cuore dell'Umbria.",
  },
  {
    q: "Quali sono gli orari di apertura del locale notturno?",
    a: "Il MAXIMUS è aperto venerdì, sabato e domenica dalle 22:00 alle 04:00.",
  },
  {
    q: "Come posso prenotare un tavolo alla discoteca MAXIMUS di Terni?",
    a: "Puoi prenotare un tavolo contattandoci via WhatsApp al +39 388 371 6721 oppure tramite il modulo contatti del sito.",
  },
  {
    q: "MAXIMUS è il miglior night club in Umbria?",
    a: "MAXIMUS è uno dei locali notturni più esclusivi dell'Umbria, con musica, champagne, hostess e un'atmosfera premium.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">FAQ</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Domande <span className="text-gold-gradient">Frequenti</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
          <p className="text-muted-foreground mt-6">
            Tutto quello che devi sapere sul Night Club MAXIMUS a Terni.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-lg border border-gold/20 bg-card/40 backdrop-blur-sm p-6 transition-colors hover:border-gold/40"
            >
              <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
                <h3 className="font-display text-lg md:text-xl text-foreground">{f.q}</h3>
                <span className="text-gold text-2xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
