import { motion } from "motion/react";
import { MapPin, Phone, Clock, Navigation, Mail } from "lucide-react";

export function Contact() {
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
                  <a href="tel:+393883716721" className="text-foreground hover:text-gold">
                    +39 388 371 6721
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
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden border border-gold/20 bg-black min-h-[320px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-full"
          >
            <iframe
              title="Mappa MAXIMUS — Stroncone (TR)"
              src={`https://www.google.com/maps?q=${mapsQ}&output=embed`}
              className="block w-full h-full min-h-[320px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[520px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-5 text-sm md:text-base">
            Per informazioni e prenotazioni veloci, scrivici direttamente su WhatsApp.
          </p>
          <a
            href={`https://wa.me/393883716721?text=${encodeURIComponent(
              "Ciao MAXIMUS! Vorrei avere informazioni sul locale e sulle prossime serate.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md text-sm md:text-base font-semibold bg-[#25D366] text-black hover:bg-[#1ebe5d] transition-colors shadow-[0_0_30px_rgba(37,211,102,0.35)]"
            aria-label="Contattaci su WhatsApp"
          >
            <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.02 5.33C10.13 5.33 5.34 10.12 5.34 16c0 1.88.5 3.71 1.43 5.33L5.33 26.67l5.49-1.43A10.61 10.61 0 0 0 16.02 26.67c5.89 0 10.68-4.79 10.68-10.67 0-2.85-1.11-5.53-3.13-7.54a10.6 10.6 0 0 0-7.55-3.13zm0 19.55a8.82 8.82 0 0 1-4.51-1.24l-.32-.19-3.26.85.87-3.18-.21-.33A8.86 8.86 0 0 1 7.18 16c0-4.88 3.97-8.85 8.84-8.85 2.36 0 4.58.92 6.25 2.59a8.79 8.79 0 0 1 2.59 6.26c0 4.88-3.97 8.85-8.84 8.85z" />
            </svg>
            Scrivici su WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
