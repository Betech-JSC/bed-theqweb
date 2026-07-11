"use client";

import React from "react";
import { ZaloIcon, PhoneIcon } from "./icons";

export const FloatingWidgets: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4">
      {/* Hotline Ringing Float */}
      <a
        href="tel:19005006"
        className="relative group flex items-center justify-center w-14 h-14 bg-gold hover:bg-gold-dark text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
        aria-label="Call Hotline 19005006"
      >
        {/* Ring ripple animations */}
        <span className="absolute inset-0 rounded-full bg-gold opacity-40 animate-ping" />
        <PhoneIcon size={24} className="relative z-10 animate-bounce" />
      </a>

      {/* Zalo Chat Float */}
      <a
        href="https://zalo.me"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#0068ff] hover:bg-[#0054cc] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
        aria-label="Chat via Zalo"
      >
        <ZaloIcon size={30} className="text-white" />
      </a>
    </div>
  );
};
