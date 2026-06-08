export function Footer({
  onOpenPrivacy,
  onOpenCookies,
  onOpenTerms,
}: {
  onOpenPrivacy: () => void;
  onOpenCookies: () => void;
  onOpenTerms: () => void;
}) {
  return (
    <footer className="relative bg-black border-t border-gold/20 px-6 py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-display neon-logo text-4xl mb-4">MAXIMUS</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              L'esperienza nightlife più esclusiva. Musica, eleganza, emozioni.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Contatti</p>
            <p className="text-sm text-muted-foreground">Stroncone, 05039 Terni (TR)</p>
            <p className="text-sm text-muted-foreground">Umbria, Italia</p>
            <p className="text-sm mt-2">
              <a
                href="mailto:info@maximusterni.com"
                className="text-gold hover:underline underline-offset-4 transition"
              >
                info@maximusterni.com
              </a>
            </p>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MAXIMUS Luxury Night Club. Tutti i diritti riservati.</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <button onClick={onOpenPrivacy} className="hover:text-gold transition">
              Privacy Policy
            </button>
            <button onClick={onOpenCookies} className="hover:text-gold transition">
              Cookie Policy
            </button>
            <button onClick={onOpenTerms} className="hover:text-gold transition">
              Termini
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
