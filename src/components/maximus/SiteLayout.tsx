import { useState, type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { LegalModal, PrivacyContent, CookieContent, TermsContent } from "./LegalModal";
import { WhatsAppFab } from "./WhatsAppFab";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [privacy, setPrivacy] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [terms, setTerms] = useState(false);
  const [reopenConsent, setReopenConsent] = useState(0);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
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

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative pt-32 pb-12 px-6 text-center overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-neon-purple/15 blur-3xl" />
      <div className="relative max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">{eyebrow}</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">{title}</h1>
        <div className="divider-gold w-32 mx-auto mt-6" />
        {subtitle && <p className="text-base md:text-lg text-muted-foreground mt-6">{subtitle}</p>}
      </div>
    </section>
  );
}
