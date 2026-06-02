import { motion } from "motion/react";
import { MapPin, Phone, Clock, Navigation, Mail } from "lucide-react";
import { ContactForm } from "./ContactForm";

export function Contact({ showForm = true }: { showForm?: boolean }) {
  const address = "Stroncone, 05039 Terni (TR), Italia";
  const mapsQ = encodeURIComponent(address);
  const mapsLink = "https://maps.app.goo.gl/QvJPiSrK8tYekzjL7";

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-neon-purple/15 blur-3xl" />
      <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-neon-blue/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Contatti</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Vieni a <span className="text-gold-gradient">Trovarci</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card neon-border rounded-2xl p-6 md:p-10 flex flex-col justify-between"
          >
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Indirizzo
                  </p>
                  <p className="text-foreground">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Telefono
                  </p>
                  <a href="tel:+390744000000" className="text-foreground hover:text-gold">
                    +39 0744 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Email
                  </p>
                  <a href="mailto:info@maximusclub.it" className="text-foreground hover:text-gold">
                    info@maximusclub.it
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Orari
                  </p>
                  <p className="text-foreground">Venerdì – Domenica</p>
                  <p className="text-muted-foreground text-sm">22:00 – 04:00</p>
                </div>
              </div>
            </div>

            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-gold mt-8 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md text-sm w-full"
            >
              <Navigation className="w-4 h-4" />
              Indicazioni Stradali
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden neon-border-blue min-h-[360px]"
          >
            <iframe
              title="Mappa MAXIMUS — Stroncone (TR)"
              src={`https://www.google.com/maps?q=${mapsQ}&output=embed`}
              className="w-full h-full min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </motion.div>
        </div>

        {showForm && <ContactForm />}
      </div>
    </section>
  );
}
