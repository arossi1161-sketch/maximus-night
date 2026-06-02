import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import g1 from "@/assets/photos/p1.jpg";
import g2 from "@/assets/photos/p2.jpg";
import g3 from "@/assets/photos/p3.jpg";
import g4 from "@/assets/photos/p4.jpg";
import g5 from "@/assets/photos/p5.jpg";
import g6 from "@/assets/photos/p6.jpg";
import g7 from "@/assets/photos/p7.jpg";
import g8 from "@/assets/photos/p8.jpg";
import g9 from "@/assets/photos/p9.jpg";
import g10 from "@/assets/photos/p10.jpg";

const photos = [
  { src: g4, alt: "Sala principale con luci blu" },
  { src: g7, alt: "Bar centrale del MAXIMUS" },
  { src: g8, alt: "Salotti in zona lounge" },
  { src: g1, alt: "Pista da ballo illuminata" },
  { src: g5, alt: "Area divani privati" },
  { src: g3, alt: "Sala con scultura" },
  { src: g6, alt: "Corridoio rosso del locale" },
  { src: g2, alt: "Sala secondaria" },
  { src: g9, alt: "Ingresso panoramico" },
  { src: g10, alt: "Cabine private" },
];

// Duplicate for seamless marquee loop
const marquee = [...photos, ...photos];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galleria" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Galleria</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Le Nostre <span className="text-gold-gradient">Notti</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
        </motion.div>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-4 md:gap-6 animate-marquee w-max">
          {marquee.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i % photos.length)}
              className="group relative shrink-0 h-56 sm:h-72 md:h-80 w-72 sm:w-96 md:w-[28rem] overflow-hidden rounded-xl neon-border"
              aria-label={p.alt}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-500" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute top-6 right-6 text-gold hover:scale-110 transition"
              onClick={() => setActive(null)}
              aria-label="Chiudi"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={photos[active].src}
              alt={photos[active].alt}
              className="max-h-[90vh] max-w-[95vw] rounded-xl neon-border object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
