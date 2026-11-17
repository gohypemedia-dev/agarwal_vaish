"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingSideDock() {
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

  if (!showTop) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className="w-11 h-11 rounded-full bg-[#7F160C] hover:bg-[#69120A] text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
