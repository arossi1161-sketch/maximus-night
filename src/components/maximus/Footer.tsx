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
            <p className="text-sm text-muted-foreground mt-2">info@maximusclub.it</p>
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

          <a
            href="https://nexorastudioconsulting.it"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by Omnira Tech"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#0b1d4d] via-[#0f2566] to-[#0b1d4d] border border-[#22d3ee]/30 hover:border-[#a78bfa]/60 transition-all hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
              Powered by
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
                <circle cx="9" cy="12" r="2" fill="#22d3ee" />
                <circle cx="15" cy="12" r="2" fill="#a78bfa" />
              </svg>
              <span className="font-semibold text-sm tracking-wide bg-gradient-to-r from-[#22d3ee] via-[#7dd3fc] to-[#a78bfa] bg-clip-text text-transparent">
                Omnira Tech
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
