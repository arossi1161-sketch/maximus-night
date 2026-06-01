import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/maximus/Experience";
import { WhyUs } from "@/components/maximus/WhyUs";
import { SiteLayout, PageHeader } from "@/components/maximus/SiteLayout";

const SITE = "https://maximus-night.lovable.app";

export const Route = createFileRoute("/esperienze")({
  head: () => ({
    meta: [
      { title: "Esperienze — Serate ed Eventi al MAXIMUS Club" },
      { name: "description", content: "Serate esclusive, eventi privati e musica dal vivo al MAXIMUS Club di Stroncone (Terni). Scopri le esperienze del locale notturno più elegante dell'Umbria." },
      { property: "og:title", content: "Esperienze — MAXIMUS Club" },
      { property: "og:description", content: "Eventi, musica, serate a tema: l'esperienza nightlife più esclusiva della provincia di Terni." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/esperienze` },
      { property: "og:locale", content: "it_IT" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/esperienze` }],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Esperienze" title={<>Le <span className="text-gold-gradient">Esperienze</span> MAXIMUS</>} subtitle="Ogni serata è un'esperienza unica, pensata per chi cerca qualcosa di più." />
      <Experience />
      <WhyUs />
    </SiteLayout>
  ),
});
