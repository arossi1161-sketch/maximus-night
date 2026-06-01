import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/maximus/Gallery";
import { SiteLayout, PageHeader } from "@/components/maximus/SiteLayout";

const SITE = "https://maximus-night.lovable.app";

export const Route = createFileRoute("/galleria")({
  head: () => ({
    meta: [
      { title: "Galleria Foto — MAXIMUS Club Stroncone" },
      { name: "description", content: "Galleria fotografica del MAXIMUS Club: sale, bar, lounge e atmosfera del locale notturno più esclusivo di Stroncone, in provincia di Terni." },
      { property: "og:title", content: "Galleria — MAXIMUS Club" },
      { property: "og:description", content: "Le foto reali del locale: sale, bar, lounge e ambienti del MAXIMUS." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/galleria` },
      { property: "og:locale", content: "it_IT" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/galleria` }],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Galleria" title={<>Le <span className="text-gold-gradient">Nostre</span> Notti</>} subtitle="Uno sguardo dentro il MAXIMUS Club." />
      <Gallery />
    </SiteLayout>
  ),
});
