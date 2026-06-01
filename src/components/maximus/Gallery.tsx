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
  { src: g4, alt: "Sala principale con luci blu" , span: "row-span-2" },
  { src: g7, alt: "Bar centrale del MAXIMUS" },
  { src: g8, alt: "Salotti in zona lounge" },
  { src: g1, alt: "Pista da ballo illuminata", span: "row-span-2" },
  { src: g5, alt: "Area divani privati" },
  { src: g3, alt: "Sala con scultura" },
  { src: g6, alt: "Corridoio rosso del locale" },
  { src: g2, alt: "Sala secondaria" },
  { src: g9, alt: "Ingresso panoramico" },
  { src: g10, alt: "Cabine private" },
] as const;

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] gap-3 sm:gap-4">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-xl neon-border ${("span" in p && p.span) || ""}`}
              aria-label={p.alt}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-500" />
            </motion.button>
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
