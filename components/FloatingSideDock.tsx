"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Calendar, Megaphone, ArrowUp, MessageCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function FloatingSideDock() {
  const { lang, openDonateModal } = useApp();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Right-edge Vertical Action Dock (Exact Reference Screenshot 1 & 2) */}
      <aside
        aria-label="Quick Actions"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-2 p-1.5 bg-white/70 backdrop-blur-md rounded-l-2xl border-l-2 border-y-2 border-[#FFAE08]/30 shadow-xl"
      >
        {/* 1. Document / Registration */}
        <Link
          href="#network"
          className="group relative p-2.5 rounded-xl bg-[#FFAE08] text-white hover:bg-[#E59C00] transition-transform hover:scale-110 shadow-md flex items-center justify-center"
          title={lang === "hi" ? "सदस्यता फॉर्म" : "Membership Registration"}
        >
          <FileText className="w-5 h-5" />
          <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#1F1712] text-white text-[11px] font-bold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {lang === "hi" ? "सदस्यता" : "Membership"}
          </span>
        </Link>

        {/* 2. Rupee / Sahyog / Fee */}
        <button
          type="button"
          onClick={() => openDonateModal("Samajik Sahyog")}
          className="group relative p-2.5 rounded-xl bg-[#1F1712] text-white hover:bg-[#FFAE08] transition-all hover:scale-110 shadow-md flex items-center justify-center cursor-pointer"
          title={lang === "hi" ? "सहयोग राशि" : "Support / Contribution"}
        >
          <span className="font-extrabold text-base leading-none">₹</span>
          <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#1F1712] text-white text-[11px] font-bold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {lang === "hi" ? "सहयोग करें" : "Contribute"}
          </span>
        </button>

        {/* 3. Calendar / Events */}
        <Link
          href="/#events"
          className="group relative p-2.5 rounded-xl bg-[#FFAE08] text-white hover:bg-[#E59C00] transition-transform hover:scale-110 shadow-md flex items-center justify-center"
          title={lang === "hi" ? "आगामी कार्यक्रम" : "Upcoming Events"}
        >
          <Calendar className="w-5 h-5" />
          <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#1F1712] text-white text-[11px] font-bold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {lang === "hi" ? "कार्यक्रम" : "Events"}
          </span>
        </Link>

        {/* 4. Megaphone / Announcements */}
        <Link
          href="#gallery"
          className="group relative p-2.5 rounded-xl bg-[#1F1712] text-white hover:bg-[#FFAE08] transition-all hover:scale-110 shadow-md flex items-center justify-center"
          title={lang === "hi" ? "प्रेस विज्ञप्ति व घोषणाएँ" : "News & Announcements"}
        >
          <Megaphone className="w-5 h-5" />
          <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#1F1712] text-white text-[11px] font-bold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {lang === "hi" ? "घोषणाएँ" : "Announcements"}
          </span>
        </Link>
      </aside>

      {/* Floating Bottom-Right Controls: WhatsApp + Scroll-To-Top */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
        {/* WhatsApp Icon (Exact Reference) */}
        <a
          href="https://wa.me/919416055000?text=Namaste%2C%20Aggarwal%20Vaish%20Samaj"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 group"
          aria-label="WhatsApp Helpline"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="absolute right-full mr-2 px-2.5 py-1 bg-[#1F1712] text-white text-xs font-bold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {lang === "hi" ? "व्हाट्सएप संपर्क" : "WhatsApp Helpline"}
          </span>
        </a>

        {/* Scroll To Top Button */}
        {showTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-[#FFAE08] hover:bg-[#E59C00] text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
}
