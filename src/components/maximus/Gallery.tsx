import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import g1 from "@/assets/photos/p1.webp";
import g2 from "@/assets/photos/p2.webp";
import g3 from "@/assets/photos/p3.webp";
import g4 from "@/assets/photos/p4.webp";
import g5 from "@/assets/photos/p5.webp";
import g6 from "@/assets/photos/p6.webp";
import g7 from "@/assets/photos/p7.webp";
import g8 from "@/assets/photos/p8.webp";
import g9 from "@/assets/photos/p9.webp";
import g10 from "@/assets/photos/p10.webp";
import g1j from "@/assets/photos/p1.jpg";
import g2j from "@/assets/photos/p2.jpg";
import g3j from "@/assets/photos/p3.jpg";
import g4j from "@/assets/photos/p4.jpg";
import g5j from "@/assets/photos/p5.jpg";
import g6j from "@/assets/photos/p6.jpg";
import g7j from "@/assets/photos/p7.jpg";
import g8j from "@/assets/photos/p8.jpg";
import g9j from "@/assets/photos/p9.jpg";
import g10j from "@/assets/photos/p10.jpg";

const photos = [
  { src: g4, fallback: g4j, alt: "Sala principale con luci blu" },
  { src: g7, fallback: g7j, alt: "Bar centrale del MAXIMUS" },
  { src: g8, fallback: g8j, alt: "Salotti in zona lounge" },
  { src: g1, fallback: g1j, alt: "Pista da ballo illuminata" },
  { src: g5, fallback: g5j, alt: "Area divani privati" },
  { src: g3, fallback: g3j, alt: "Sala con scultura" },
  { src: g6, fallback: g6j, alt: "Corridoio rosso del locale" },
  { src: g2, fallback: g2j, alt: "Sala secondaria" },
  { src: g9, fallback: g9j, alt: "Ingresso panoramico" },
  { src: g10, fallback: g10j, alt: "Cabine private" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.9, 600) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.pointerType === "touch") return;
    dragState.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragState.current.down) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 6) {
      dragState.current.moved = true;
      el.scrollLeft = dragState.current.startScroll - dx;
    }
  };
  const onPointerUp = () => {
    dragState.current.down = false;
    // Reset moved on next tick so the immediate click handler can read it
    setTimeout(() => { dragState.current.moved = false; }, 0);
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    if (active === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
      } else if (e.key === "ArrowLeft") {
        setActive((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
      } else if (e.key === "ArrowRight") {
        setActive((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
      }
    };
    // Focus trap + initial focus
    const closeBtn = closeBtnRef.current;
    if (closeBtn) closeBtn.focus();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="galleria" className="relative py-24 md:py-32 overflow-hidden" aria-label="Galleria fotografica">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-gold-gradient">
            GALLERIA
          </h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          id="gallery-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="region"
          aria-roledescription="carosello"
          aria-label={`Carosello fotografico con ${photos.length} immagini`}
          aria-describedby="carousel-hint"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); scrollBy(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); scrollBy(-1); }
          }}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-4 cursor-grab active:cursor-grabbing select-none touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
        >
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={(e) => {
                if (dragState.current.moved) {
                  e.preventDefault();
                  return;
                }
                setActive(i);
              }}
              draggable={false}
              className="group relative shrink-0 snap-center h-56 sm:h-72 md:h-80 w-72 sm:w-96 md:w-[28rem] overflow-hidden rounded-xl neon-border"
              aria-label={`Apri in grandezza: ${p.alt}`}
              aria-roledescription="slide"
              role="group"
            >
              <picture>
                <source type="image/webp" srcSet={p.src} />
                <img
                  src={p.fallback}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  width={1204}
                  height={1600}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            </button>
          ))}
        </div>
        <p id="carousel-hint" className="sr-only">
          Usa i pulsanti precedente e successivo per scorrere le foto, oppure le frecce da tastiera quando la lightbox è aperta.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8" role="group" aria-label="Controlli carosello">
          <button
            ref={prevBtnRef}
            onClick={() => scrollBy(-1)}
            aria-label="Foto precedenti"
            aria-controls="gallery-track"
            className="w-12 h-12 rounded-full neon-border flex items-center justify-center text-gold hover:bg-gold/10 transition"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            ref={nextBtnRef}
            onClick={() => scrollBy(1)}
            aria-label="Foto successive"
            aria-controls="gallery-track"
            className="w-12 h-12 rounded-full neon-border flex items-center justify-center text-gold hover:bg-gold/10 transition"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            aria-describedby="lightbox-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setActive(null)}
            onTouchStart={(e) => {
              dragState.current.startX = e.touches[0].clientX;
              dragState.current.moved = false;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - dragState.current.startX;
              if (Math.abs(dx) > 50) {
                if (dx < 0) {
                  setActive((p) => (p !== null && p < photos.length - 1 ? p + 1 : 0));
                } else {
                  setActive((p) => (p !== null && p > 0 ? p - 1 : photos.length - 1));
                }
              }
            }}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="fixed top-4 right-4 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 transition shadow-[0_0_20px_rgba(245,208,111,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={(e) => { e.stopPropagation(); setActive(null); }}
              aria-label="Chiudi galleria"
            >
              <X size={24} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full neon-border items-center justify-center text-gold hover:bg-gold/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={(e) => { e.stopPropagation(); setActive((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1)); }}
              aria-label="Foto precedente"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full neon-border items-center justify-center text-gold hover:bg-gold/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={(e) => { e.stopPropagation(); setActive((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0)); }}
              aria-label="Foto successiva"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
            <h2 id="lightbox-title" className="sr-only">{photos[active].alt}</h2>
            <motion.img
              key={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={photos[active].src}
              alt={photos[active].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[95vw] rounded-xl neon-border object-contain touch-pan-y"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex sm:hidden items-center gap-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActive((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1)); }}
                aria-label="Foto precedente"
                className="w-11 h-11 rounded-full bg-background/80 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <span id="lightbox-counter" className="text-sm text-gold/90 font-medium tabular-nums" aria-live="polite">
                {active + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActive((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0)); }}
                aria-label="Foto successiva"
                className="w-11 h-11 rounded-full bg-background/80 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              Foto {active + 1} di {photos.length}: {photos[active].alt}. Scorri a destra o sinistra per cambiare foto.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
