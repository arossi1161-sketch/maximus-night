import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/maximus/Hero";
import { About } from "@/components/maximus/About";
import { Experience } from "@/components/maximus/Experience";
import { SiteLayout } from "@/components/maximus/SiteLayout";

const SITE = "https://maximus-night.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAXIMUS — Luxury Night Club a Stroncone, Terni" },
      { name: "description", content: "MAXIMUS Luxury Night Club a Stroncone (Terni). Musica, atmosfera ed esperienze esclusive nel cuore dell'Umbria. Prenota il tuo tavolo." },
      { property: "og:title", content: "MAXIMUS — Luxury Night Club · Stroncone (TR)" },
      { property: "og:description", content: "Il locale notturno più esclusivo della provincia di Terni. Musica, eleganza, notti indimenticabili." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:site_name", content: "MAXIMUS Club" },
      { property: "og:locale", content: "it_IT" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: `${SITE}/` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NightClub",
        "name": "MAXIMUS Luxury Night Club",
        "url": `${SITE}/`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Stroncone",
          "addressRegion": "Terni",
          "addressCountry": "IT",
          "postalCode": "05039",
        },
        "openingHours": "Fr-Su 22:00-04:00",
        "telephone": "+39 0744 000 000",
      }),
    }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Experience />
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Pronto per la <span className="text-gold-gradient">tua serata</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            Riserva il tuo tavolo o scopri di più sulle nostre esperienze.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/prenota" className="btn-neon-gold px-8 py-4 rounded-md text-sm">Prenota un Tavolo</Link>
            <Link to="/galleria" className="btn-neon-outline px-8 py-4 rounded-md text-sm">Scopri la Galleria</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
