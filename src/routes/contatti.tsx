import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/maximus/Contact";
import { SiteLayout, PageHeader } from "@/components/maximus/SiteLayout";

const SITE = "https://maximus-night.lovable.app";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — MAXIMUS Club Stroncone (Terni)" },
      { name: "description", content: "Contatta il MAXIMUS Club a Stroncone (Terni): indirizzo, telefono, email e modulo contatti. Aperti venerdì, sabato e domenica dalle 22:00 alle 04:00." },
      { property: "og:title", content: "Contatti — MAXIMUS Club" },
      { property: "og:description", content: "Scrivici, chiamaci o vieni a trovarci a Stroncone (TR)." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/contatti` },
      { property: "og:locale", content: "it_IT" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/contatti` }],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Contatti" title={<>Vieni a <span className="text-gold-gradient">Trovarci</span></>} subtitle="A Stroncone, nel cuore della provincia di Terni." />
      <Contact />
    </SiteLayout>
  ),
});
