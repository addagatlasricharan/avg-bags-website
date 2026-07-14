import React from "react";
import { SiWhatsapp } from "react-icons/si";

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/917780524290"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[9999] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <SiWhatsapp className="w-8 h-8" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-[#25D366]"></span>
      </span>
    </a>
  );
};
