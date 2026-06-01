import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/maximus/Navbar";
import { Hero } from "@/components/maximus/Hero";
import { About } from "@/components/maximus/About";
import { Experience } from "@/components/maximus/Experience";
import { Gallery } from "@/components/maximus/Gallery";
import { WhyUs } from "@/components/maximus/WhyUs";
import { Contact } from "@/components/maximus/Contact";
import { Footer } from "@/components/maximus/Footer";
import { CookieConsent } from "@/components/maximus/CookieConsent";
import { LegalModal, PrivacyContent, CookieContent, TermsContent } from "@/components/maximus/LegalModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAXIMUS — Luxury Night Club Experience" },
      { name: "description", content: "MAXIMUS — Luxury Night Club. Musica, atmosfera ed esperienze esclusive nel cuore della notte." },
      { property: "og:title", content: "MAXIMUS — Luxury Night Club" },
      { property: "og:description", content: "Musica, atmosfera e notti indimenticabili al MAXIMUS Luxury Night Club." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [privacy, setPrivacy] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [terms, setTerms] = useState(false);
  const [reopenConsent, setReopenConsent] = useState(0);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Gallery />
        <WhyUs />
        <Contact />
      </main>
      <Footer
        onOpenPrivacy={() => setPrivacy(true)}
        onOpenCookies={() => setCookies(true)}
        onOpenTerms={() => setTerms(true)}
      />

      <CookieConsent
        key={reopenConsent}
        forceOpen={reopenConsent > 0}
        onClose={() => setReopenConsent(0)}
      />

      <LegalModal open={privacy} onClose={() => setPrivacy(false)} title="Privacy Policy">
        <PrivacyContent />
      </LegalModal>
      <LegalModal open={cookies} onClose={() => setCookies(false)} title="Cookie Policy">
        <CookieContent
          onManage={() => {
            setCookies(false);
            setReopenConsent((n) => n + 1);
          }}
        />
      </LegalModal>
      <LegalModal open={terms} onClose={() => setTerms(false)} title="Termini & Condizioni">
        <TermsContent />
      </LegalModal>
    </div>
  );
}
