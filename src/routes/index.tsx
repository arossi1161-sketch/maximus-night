import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/maximus/Hero";
import { About } from "@/components/maximus/About";
import { Experience } from "@/components/maximus/Experience";
import { Gallery } from "@/components/maximus/Gallery";
import { Contact } from "@/components/maximus/Contact";
import { ReservationForm } from "@/components/maximus/ReservationForm";
import { SiteLayout } from "@/components/maximus/SiteLayout";
import ogImage from "@/assets/photos/p7.jpg";
import heroWebp1024 from "@/assets/photos/p7-1024.webp";
import heroWebp640 from "@/assets/photos/p7-640.webp";

const SITE = "https://maximus-night.lovable.app";
const TITLE = "MAXIMUS — Luxury Night Club a Stroncone, Terni";
const DESC =
  "MAXIMUS Luxury Night Club a Stroncone (Terni). Musica, atmosfera ed esperienze esclusive nel cuore dell'Umbria. Prenota il tuo tavolo.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "discoteca Terni, night club Stroncone, locale notturno Umbria, MAXIMUS, prenotazione tavoli Terni, eventi Terni" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:site_name", content: "MAXIMUS Club" },
      { property: "og:locale", content: "it_IT" },
      { property: "og:image", content: `${SITE}${ogImage}` },
      { property: "og:image:width", content: "1204" },
      { property: "og:image:height", content: "1600" },
      { property: "og:image:alt", content: "MAXIMUS Luxury Night Club — Stroncone, Terni" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: `${SITE}${ogImage}` },
    ],
    links: [
      { rel: "canonical", href: `${SITE}/` },
      {
        rel: "preload",
        as: "image",
        href: heroWebp1024,
        type: "image/webp",
        imagesrcset: `${heroWebp640} 640w, ${heroWebp1024} 1024w`,
        imagesizes: "100vw",
        fetchpriority: "high",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NightClub",
          name: "MAXIMUS Luxury Night Club",
          url: `${SITE}/`,
          image: `${SITE}${ogImage}`,
          description: DESC,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Stroncone",
            addressRegion: "TR",
            addressCountry: "IT",
            postalCode: "05039",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Friday", "Saturday", "Sunday"],
              opens: "22:00",
              closes: "04:00",
            },
          ],
          priceRange: "€€€",
          telephone: "+39 0744 000 000",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <section id="esperienze">
        <Experience />
      </section>
      <Gallery />
      <section id="prenota" className="relative py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Prenotazioni</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Prenota il tuo <span className="text-gold-gradient">Tavolo</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
          <p className="text-muted-foreground mt-6">
            Riserva la tua serata al MAXIMUS. Ti contatteremo per confermare.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <ReservationForm />
        </div>
      </section>
      <section id="contatti">
        <Contact />
      </section>
    </SiteLayout>
  );
}
