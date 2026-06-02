import waLogo from "@/assets/whatsapp-logo.jpg.asset.json";

const WA_HREF = `https://wa.me/390744000000?text=${encodeURIComponent(
  "Ciao MAXIMUS! Vorrei informazioni e prenotare.",
)}`;

export function WhatsAppFab() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full overflow-hidden shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <img
        src={waLogo.url}
        alt=""
        width={56}
        height={56}
        className="w-full h-full object-cover"
      />
    </a>
  );
}
