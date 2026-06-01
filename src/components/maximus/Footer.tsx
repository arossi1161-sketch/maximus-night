import { Instagram, Facebook, Twitter, Music2 } from "lucide-react";

export function Footer({ onOpenPrivacy, onOpenCookies, onOpenTerms }: {
  onOpenPrivacy: () => void;
  onOpenCookies: () => void;
  onOpenTerms: () => void;
}) {
  return (
    <footer className="relative bg-black border-t border-gold/20 px-6 py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display neon-logo text-4xl mb-4">MAXIMUS</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L'esperienza nightlife più esclusiva. Musica, eleganza, emozioni.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Contatti</p>
            <p className="text-sm text-muted-foreground">Via della Notte 1</p>
            <p className="text-sm text-muted-foreground">00100 Roma, Italia</p>
            <p className="text-sm text-muted-foreground mt-2">+39 06 1234 5678</p>
            <p className="text-sm text-muted-foreground">info@maximusclub.it</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Seguici</p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Music2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-10 h-10 rounded-full neon-border-blue flex items-center justify-center hover:bg-gold/10 hover:border-gold transition-all"
                >
                  <Icon className="w-4 h-4 text-gold" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MAXIMUS Luxury Night Club. Tutti i diritti riservati.</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <button onClick={onOpenPrivacy} className="hover:text-gold transition">Privacy Policy</button>
            <button onClick={onOpenCookies} className="hover:text-gold transition">Cookie Policy</button>
            <button onClick={onOpenTerms} className="hover:text-gold transition">Termini</button>
          </div>
          <p>
            Powered by{" "}
            <a
              href="https://omniratech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-gradient font-semibold hover:opacity-80 transition"
            >
              Omnira Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
