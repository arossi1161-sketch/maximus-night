import { lazy, Suspense } from "react";
import { Hero } from "@/components/maximus/Hero";
import { About } from "@/components/maximus/About";
import { SiteLayout } from "@/components/maximus/SiteLayout";
import { Unsubscribe } from "@/components/maximus/Unsubscribe";

const Experience = lazy(() =>
  import("@/components/maximus/Experience").then((m) => ({ default: m.Experience })),
);
const Gallery = lazy(() =>
  import("@/components/maximus/Gallery").then((m) => ({ default: m.Gallery })),
);
const Hostess = lazy(() =>
  import("@/components/maximus/Hostess").then((m) => ({ default: m.Hostess })),
);
const JobApplicationForm = lazy(() =>
  import("@/components/maximus/JobApplicationForm").then((m) => ({
    default: m.JobApplicationForm,
  })),
);
const Contact = lazy(() =>
  import("@/components/maximus/Contact").then((m) => ({ default: m.Contact })),
);
const FAQ = lazy(() =>
  import("@/components/maximus/FAQ").then((m) => ({ default: m.FAQ })),
);
const AdminLogin = lazy(() =>
  import("@/components/maximus/AdminLogin").then((m) => ({ default: m.AdminLogin })),
);
const AdminLogs = lazy(() =>
  import("@/components/maximus/AdminLogs").then((m) => ({ default: m.AdminLogs })),
);

const SectionFallback = () => <div className="min-h-[400px]" aria-hidden="true" />;

export default function App() {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/unsubscribe")) return <Unsubscribe />;
    if (path.startsWith("/admin/login")) {
      return (
        <Suspense fallback={<SectionFallback />}>
          <AdminLogin />
        </Suspense>
      );
    }
    if (path.startsWith("/admin")) {
      return (
        <Suspense fallback={<SectionFallback />}>
          <AdminLogs />
        </Suspense>
      );
    }
  }
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Suspense fallback={<SectionFallback />}>
        <section id="esperienze">
          <Experience />
        </section>
        <Gallery />
        <Hostess />
        <section id="lavora" className="relative py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-xs tracking-[0.5em] text-gold uppercase mb-4">Lavora con Noi</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Entra nel <span className="text-gold-gradient">Team MAXIMUS</span>
            </h2>
            <div className="divider-gold w-32 mx-auto mt-6" />
            <p className="text-muted-foreground mt-6">
              Stiamo cercando nuovi talenti per le notti più esclusive dell'Umbria.
            </p>
          </div>
          <JobApplicationForm />
        </section>
        <FAQ />
        <section id="contatti">
          <Contact />
        </section>
      </Suspense>
    </SiteLayout>
  );
}
