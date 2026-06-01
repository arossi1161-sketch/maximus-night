import { createFileRoute } from "@tanstack/react-router";
import { ReservationForm } from "@/components/maximus/ReservationForm";
import { SiteLayout, PageHeader } from "@/components/maximus/SiteLayout";

const SITE = "https://maximus-night.lovable.app";

export const Route = createFileRoute("/prenota")({
  head: () => ({
    meta: [
      { title: "Prenota un Tavolo — MAXIMUS Club Stroncone" },
      { name: "description", content: "Prenota il tuo tavolo al MAXIMUS Club di Stroncone (Terni). Scegli data, ora e numero di persone: riceverai la conferma via email." },
      { property: "og:title", content: "Prenota — MAXIMUS Club" },
      { property: "og:description", content: "Prenotazione tavoli online. Conferma rapida via email." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/prenota` },
      { property: "og:locale", content: "it_IT" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/prenota` }],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Prenotazioni" title={<>Prenota il Tuo <span className="text-gold-gradient">Tavolo</span></>} subtitle="Riserva la tua serata al MAXIMUS — riceverai conferma via email." />
      <section className="py-12 md:py-20 px-6">
        <ReservationForm />
      </section>
    </SiteLayout>
  ),
});
