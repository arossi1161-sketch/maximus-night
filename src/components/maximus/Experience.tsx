import { motion } from "motion/react";
import { Sparkles, Music, Crown, CalendarHeart } from "lucide-react";

const items = [
  {
    icon: Sparkles,
    title: "Atmosfera Elegante",
    desc: "Interni sofisticati, sedute confortevoli e un ambiente esclusivo.",
  },
  {
    icon: Music,
    title: "Musica di Qualità",
    desc: "La migliore selezione musicale per mantenere alta l'energia per tutta la notte.",
  },
  {
    icon: Crown,
    title: "Servizio Premium",
    desc: "Personale professionale dedicato a creare un'esperienza memorabile.",
  },
  {
    icon: CalendarHeart,
    title: "Eventi Speciali",
    desc: "Serate a tema uniche e intrattenimento esclusivo.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">
            La Nostra Esperienza
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">
            <span className="text-gold-gradient">L'Esperienza</span> MAXIMUS
          </h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative glass-card rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:neon-border"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-neon-blue/0 group-hover:bg-neon-blue/15 blur-3xl transition-all duration-700" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gold/0 group-hover:bg-gold/15 blur-3xl transition-all duration-700" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-neon-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <it.icon className="w-6 h-6 text-gold drop-shadow-[0_0_10px_rgba(245,208,111,0.7)]" />
                </div>
                <h3 className="font-display text-2xl mb-3 text-foreground group-hover:text-gold transition-colors">
                  {it.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
