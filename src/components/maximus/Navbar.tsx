import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "#locale", label: "Il Locale" },
  { href: "#esperienze", label: "Esperienze" },
  { href: "#galleria", label: "Galleria" },
  { href: "#contatti", label: "Contatti" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl neon-logo tracking-widest">
          MAXIMUS
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs tracking-[0.2em] uppercase text-foreground/80 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#prenota" className="btn-neon-gold px-5 py-2 rounded-md text-xs">
            Prenota
          </a>
        </nav>

        <button
          className="md:hidden text-gold"
          onClick={() => setOpen(!open)}
          aria-label="Apri menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <nav className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#prenota"
              onClick={() => setOpen(false)}
              className="btn-neon-gold px-5 py-3 rounded-md text-xs text-center"
            >
              Prenota un Tavolo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
