import { motion } from "motion/react";

export function About() {
  return (
    <section id="locale" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-neon-purple/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-neon-blue/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Il Locale</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            La notte secondo <span className="text-gold-gradient">MAXIMUS</span>
          </h2>
          <div className="divider-gold w-24 mx-auto mb-8" />
          <p className="text-lg text-foreground/85 mb-6 leading-relaxed">
            A pochi minuti da Terni, fra le colline di Stroncone, abbiamo creato uno spazio dove
            la musica detta il ritmo e l'eleganza fa il resto. Il MAXIMUS non è una discoteca
            qualunque: è il luogo in cui scegliere come vivere la tua notte.
          </p>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Lounge intimi, una console che alterna i nomi più interessanti della scena umbra,
            una drink list firmata dai nostri bartender e un servizio al tavolo pensato per farti
            sentire ospite, non cliente.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[
              { n: "120+", l: "Serate l'anno" },
              { n: "150", l: "Posti riservati" },
              { n: "10+", l: "Anni nel cuore di Terni" },
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
