import { motion } from "motion/react";
import { Sparkles, Lock, Crown, MessageCircle } from "lucide-react";
import hostessImg from "@/assets/hostess.jpg";

const WA_HREF = `https://wa.me/390744000000?text=${encodeURIComponent(
  "Ciao MAXIMUS! Vorrei informazioni sulle hostess e prenotare una serata."
)}`;

const cards = [
  {
    icon: Sparkles,
    title: "Eleganza",
    text: "Personale selezionato e professionale.",
  },
  {
    icon: Lock,
    title: "Discrezione",
    text: "Massima riservatezza e comfort.",
  },
  {
    icon: Crown,
    title: "Esperienza Premium",
    text: "Un'accoglienza curata in ogni dettaglio.",
  },
];

export function Hostess() {
  return (
    <section id="hostess" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-neon-purple/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Ospitalità</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold neon-logo">
            Eleganza, Ospitalità e Compagnia
          </h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
          <p className="mt-6 text-lg italic text-muted-foreground max-w-2xl mx-auto">
            Un'esperienza esclusiva in un ambiente riservato e sofisticato.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative rounded-2xl overflow-hidden neon-border"
          >
            <img
              src={hostessImg}
              alt="Hostess elegante al MAXIMUS"
              loading="lazy"
              decoding="async"
              width={1024}
              height={1024}
              className="w-full h-[520px] md:h-[640px] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-8"
          >
            <p className="text-lg leading-relaxed text-foreground/90">
              Le nostre hostess internazionali contribuiscono a creare un'atmosfera accogliente,
              discreta e raffinata. Professionalità, eleganza e attenzione agli ospiti sono gli
              elementi che rendono ogni serata al <span className="text-gold">MAXIMUS</span> un
              momento piacevole e memorabile.
            </p>

            <div className="grid sm:grid-cols-3 gap-5">
              {cards.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="glass-card neon-border rounded-xl p-6 text-center transition-shadow hover:shadow-[0_0_30px_rgba(245,208,111,0.35)]"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-gold-gradient mb-2">
                    ✦ {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
