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
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-black shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:bg-[#1ebe5d] hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background animate-[pulse_3s_ease-in-out_infinite]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" aria-hidden="true" />
      <svg viewBox="0 0 32 32" className="relative w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.02 5.33C10.13 5.33 5.34 10.12 5.34 16c0 1.88.5 3.71 1.43 5.33L5.33 26.67l5.49-1.43A10.61 10.61 0 0 0 16.02 26.67c5.89 0 10.68-4.79 10.68-10.67 0-2.85-1.11-5.53-3.13-7.54a10.6 10.6 0 0 0-7.55-3.13zm0 19.55a8.82 8.82 0 0 1-4.51-1.24l-.32-.19-3.26.85.87-3.18-.21-.33A8.86 8.86 0 0 1 7.18 16c0-4.88 3.97-8.85 8.84-8.85 2.36 0 4.58.92 6.25 2.59a8.79 8.79 0 0 1 2.59 6.26c0 4.88-3.97 8.85-8.84 8.85z" />
      </svg>
    </a>
  );
}
