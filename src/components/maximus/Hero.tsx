import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import p1 from "@/assets/photos/p1.jpg";
import p2 from "@/assets/photos/p2.jpg";
import p3 from "@/assets/photos/p3.jpg";
import p4 from "@/assets/photos/p4.jpg";
import p5 from "@/assets/photos/p5.jpg";
import p6 from "@/assets/photos/p6.jpg";
import p7 from "@/assets/photos/p7.jpg";
import p8 from "@/assets/photos/p8.jpg";
import p9 from "@/assets/photos/p9.jpg";
import p10 from "@/assets/photos/p10.jpg";

// Foto reali del locale — la scorrono velocemente e rallentano fermandosi su p7 (bar)
const slides = [p4, p8, p1, p5, p9, p3, p2, p6, p10, p7];
const durations = [160, 180, 210, 250, 320, 450, 650, 950, 1400, 99999];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setIndex(slides.length - 1);
      return;
    }
    if (index >= slides.length - 1) return;
    const t = setTimeout(() => setIndex((i) => i + 1), durations[index]);
    return () => clearTimeout(t);
  }, [index, reduceMotion]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === index ? 1 : 0,
            }}
            aria-hidden={i !== index}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      <div className="absolute inset-0 bg-hero-ambient pointer-events-none" />

      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gold/70"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                boxShadow: "0 0 8px rgba(245,208,111,0.8)",
              }}
              animate={{ y: [0, -40, 0], opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 6 + (i % 5),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute -top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neon-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-1/3 right-0 h-[400px] w-[400px] rounded-full bg-neon-purple/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xs sm:text-sm tracking-[0.5em] text-gold/80 uppercase mb-6"
          >
            ★ Luxury Night Club · Stroncone (TR) ★
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-display neon-logo text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold leading-none"
          >
            MAXIMUS
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="divider-gold w-48 mx-auto my-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-base sm:text-xl text-foreground/90 tracking-[0.3em] uppercase mb-4"
          >
            Locale Esclusivo · Terni
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-base sm:text-lg italic text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            "Musica, atmosfera e notti indimenticabili nel cuore dell'Umbria."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/prenota" className="btn-neon-gold px-8 py-4 rounded-md text-sm">
              Prenota un Tavolo
            </Link>
            <Link to="/contatti" className="btn-neon-outline px-8 py-4 rounded-md text-sm">
              Contattaci
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold/60 text-xs tracking-[0.4em] uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}
