import { motion } from "motion/react";
import about from "@/assets/photos/p7.jpg";

export function About() {
  return (
    <section id="locale" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-neon-purple/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-neon-blue/10 blur-3xl" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gold/10 blur-2xl rounded-3xl" />
          <div className="relative overflow-hidden rounded-2xl neon-border">
            <img
              src={about}
              alt="Bar e sala interna del MAXIMUS Club a Stroncone"
              loading="lazy"
              decoding="async"
              className="w-full h-[420px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block">
            <div className="glass-card neon-border-blue p-6 rounded-xl">
              <p className="font-display text-3xl text-gold-gradient">10+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                Anni di Attività
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Il Locale
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Benvenuto al{" "}
            <span className="text-gold-gradient">MAXIMUS</span>
          </h2>
          <div className="divider-gold w-24 mb-8" />
          <p className="text-lg text-foreground/85 mb-6 leading-relaxed">
            Nel cuore di Stroncone, in provincia di Terni, il MAXIMUS è il punto
            di riferimento per chi cerca un'esperienza notturna raffinata,
            intima e fuori dagli schemi.
          </p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Sale ampie, luci d'atmosfera, un bar curato e un servizio attento:
            ogni dettaglio è pensato per regalarvi serate da ricordare.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {[
              { n: "120+", l: "Eventi" },
              { n: "150", l: "Posti" },
              { n: "10+", l: "Anni" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display text-3xl text-gold-gradient">{s.n}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
