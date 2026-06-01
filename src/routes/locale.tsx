import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/maximus/About";
import { SiteLayout, PageHeader } from "@/components/maximus/SiteLayout";

const SITE = "https://maximus-night.lovable.app";

export const Route = createFileRoute("/locale")({
  head: () => ({
    meta: [
      { title: "Il Locale — MAXIMUS Club Stroncone (Terni)" },
      { name: "description", content: "Scopri il MAXIMUS: il locale notturno più esclusivo di Stroncone, in provincia di Terni. Atmosfera elegante, bar curato e oltre 10 anni di esperienza." },
      { property: "og:title", content: "Il Locale — MAXIMUS Club" },
      { property: "og:description", content: "Sale ampie, luci d'atmosfera e servizio premium nel cuore dell'Umbria." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/locale` },
      { property: "og:locale", content: "it_IT" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/locale` }],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Il Locale" title={<>Il MAXIMUS <span className="text-gold-gradient">Club</span></>} subtitle="Eleganza, musica e atmosfera nel cuore di Stroncone." />
      <About />
    </SiteLayout>
  ),
});
