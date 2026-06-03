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
        w-14 h-14
        rounded-full
        bg-[#25D366]
        shadow-[0_4px_24px_rgba(18,140,126,0.55)]
        hover:shadow-[0_6px_32px_rgba(18,140,126,0.75)]
        hover:scale-110
        active:scale-95
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-[3px] focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-8 h-8"
        fill="#ffffff"
        aria-hidden="true"
      >
        <path d="M16.003 3C9.374 3 4 8.373 4 15c0 2.385.703 4.605 1.91 6.47L4 29l7.74-1.86A11.93 11.93 0 0 0 16.003 27C22.63 27 28 21.627 28 15S22.63 3 16.003 3Zm0 21.6c-1.86 0-3.6-.51-5.09-1.4l-.36-.21-4.59 1.1 1.12-4.47-.23-.37A9.55 9.55 0 0 1 6.4 15c0-5.3 4.3-9.6 9.6-9.6 5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6Zm5.27-7.18c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.91 1.12-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.43-1.71-1.6-2-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.13-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.02c.14.19 2.01 3.07 4.88 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z" />
      </svg>
    </a>
  );
}
