import waLogo from "@/assets/whatsapp-logo.png.asset.json";

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
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center
        w-16 h-16
        rounded-full
        bg-white
        border-2 border-[#25D366]
        shadow-[0_4px_20px_rgba(37,211,102,0.45)]
        hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)]
        hover:scale-110
        active:scale-95
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-[3px] focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <img
        src={waLogo.url}
        alt=""
        width={64}
        height={64}
        className="w-12 h-12 object-contain"
      />
    </a>
  );
}
