import { motion } from "motion/react";
import heroWebp from "@/assets/photos/p7.webp";
import heroWebp1024 from "@/assets/photos/p7-1024.webp";
import heroWebp640 from "@/assets/photos/p7-640.webp";
import heroJpg from "@/assets/photos/p7.jpg";
import heroJpg1024 from "@/assets/photos/p7-1024.jpg";
import heroJpg640 from "@/assets/photos/p7-640.jpg";

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <picture>
        <source
          type="image/webp"
          srcSet={`${heroWebp640} 640w, ${heroWebp1024} 1024w, ${heroWebp} 1600w`}
          sizes="100vw"
        />
        <img
          src={heroJpg1024}
          srcSet={`${heroJpg640} 640w, ${heroJpg1024} 1024w, ${heroJpg} 1600w`}
          sizes="100vw"
          alt="MAXIMUS — interno del locale notturno a Stroncone, Terni"
          fetchPriority="high"
          decoding="async"
          width={1204}
          height={1600}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      <div className="absolute inset-0 bg-hero-ambient pointer-events-none" />

      <div className="absolute -top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neon-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-1/3 right-0 h-[400px] w-[400px] rounded-full bg-neon-purple/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs sm:text-sm tracking-[0.5em] text-gold/80 uppercase mb-6"
          >
            ★ Night Club · Stroncone · Terni ★
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-display neon-logo text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold leading-none"
          >
            MAXIMUS
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="divider-gold w-48 mx-auto my-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-base sm:text-xl text-foreground/90 tracking-[0.3em] uppercase mb-4"
          >
            La tua notte, alle porte di Terni
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-base sm:text-lg italic text-muted-foreground max-w-2xl mx-auto mb-4"
          >
            "Dove la musica accende l'Umbria fino all'alba."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-sm sm:text-base text-gold/90 max-w-2xl mx-auto mb-10"
          >
            Champagne, musica, eleganza e la compagnia delle nostre splendide hostess.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#prenota" className="btn-neon-gold px-8 py-4 rounded-md text-sm">
              Prenota un Tavolo
            </a>
            <a href="#contatti" className="btn-neon-outline px-8 py-4 rounded-md text-sm">
              Contattaci
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#locale"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold/60 text-xs tracking-[0.4em] uppercase"
      >
        Scroll
      </motion.a>
    </section>
  );
}
