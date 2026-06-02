import { motion } from "motion/react";
import { Diamond, Star, Wine, Moon } from "lucide-react";

const features = [
  {
    icon: Diamond,
    title: "Identità riconoscibile",
    desc: "Un format diverso dai soliti club della provincia: meno ressa, più carattere.",
  },
  {
    icon: Star,
    title: "Line-up selezionata",
    desc: "DJ e live act scelti uno per uno, senza serate copia-incolla.",
  },
  {
    icon: Wine,
    title: "Drink fatti bene",
    desc: "Spirits di livello, ricette firmate e bicchieri sempre pieni al punto giusto.",
  },
  {
    icon: Moon,
    title: "A due passi da Terni",
    desc: "Facile da raggiungere da tutta l'Umbria, parcheggio comodo davanti al locale.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/40 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gold/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Perché Noi</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">
            Cosa rende <span className="text-gold-gradient">MAXIMUS</span> diverso
          </h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
        </motion.div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group text-center p-8 rounded-2xl glass-card hover:neon-border-blue transition-all duration-500"
            >
              <div className="relative mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-neon-blue/20 group-hover:from-gold/40 group-hover:to-neon-blue/40 transition-all duration-500" />
                <div className="absolute inset-0 rounded-full blur-xl bg-neon-blue/30 group-hover:bg-neon-blue/60 transition-all duration-500" />
                <f.icon className="relative w-9 h-9 text-gold drop-shadow-[0_0_12px_rgba(245,208,111,0.8)]" />
              </div>
              <h3 className="font-display text-xl mb-3 group-hover:text-gold transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
