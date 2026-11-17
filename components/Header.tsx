"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Globe, Menu, X, ChevronDown, User, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useSmoothScroll } from "@/components/animation/SmoothScrollProvider";

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, user, openAuthModal, openDonateModal } = useApp();
  const { lenis } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let unsubscribeLenis: (() => void) | undefined;
    if (lenis) {
      const lenisHandler = (e: any) => {
        const scrollY = e.scroll ?? window.scrollY ?? 0;
        setScrolled(scrollY > 20);
      };
      lenis.on("scroll", lenisHandler);
      unsubscribeLenis = () => {
        lenis.off("scroll", lenisHandler);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (unsubscribeLenis) unsubscribeLenis();
    };
  }, [lenis]);

  // Navigation matching reference website (avsharyana.com) exactly - Anchored to Homepage Sections for First Draft
  const navSections = [
    {
      id: "about",
      label: "ABOUT",
      href: "#network",
      subItems: [
        { label: "हमारे बारे में / About Us", href: "#network" },
        { label: "संगठन परिचय (Organisation)", href: "#network" },
        { label: "महाराजा अग्रसेन दर्शन", href: "#sankalp" },
      ],
    },
    {
      id: "organisation",
      label: "ORGANISATION",
      href: "#network",
      subItems: [
        { label: "प्रदेश कार्यकारिणी (State Executive)", href: "#network" },
        { label: "युवा प्रकोष्ठ (Youth Wing)", href: "#network" },
        { label: "महिला प्रकोष्ठ (Mahila Wing)", href: "#network" },
        { label: "व्यापार प्रकोष्ठ (Vyapar Cell)", href: "#network" },
      ],
    },
    {
      id: "media",
      label: "MEDIA",
      href: "#gallery",
      subItems: [
        { label: "प्रेस विज्ञप्ति व समाचार", href: "#gallery" },
        { label: "फोटो गैलरी (Photo Gallery)", href: "#gallery" },
        { label: "वीडियो व भाषण (Speeches)", href: "#gallery" },
      ],
    },
    {
      id: "initiatives",
      label: "INITIATIVES",
      href: "#sankalp",
      subItems: [
        { label: "पंच संकल्प (Panch Sankalp)", href: "#sankalp" },
        { label: "सामाजिक सहभागिता", href: "#sankalp" },
        { label: "महिला सशक्तिकरण", href: "#sankalp" },
        { label: "युवा नेतृत्व", href: "#sankalp" },
      ],
    },
    {
      id: "join",
      label: "JOIN NOW",
      href: "#network",
      subItems: [
        { label: "ऑनलाइन सदस्यता फॉर्म", href: "#network" },
        { label: "सहयोग एवं सहभागिता", href: "#network" },
      ],
    },
    {
      id: "network",
      label: "NETWORK",
      href: "#network",
      subItems: [
        { label: "हरियाणा जिला नेटवर्क (23)", href: "#network" },
        { label: "कार्यालय संपर्क (Bhiwani HQ)", href: "#network" },
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-md border-b border-gray-200"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-5 lg:px-4 xl:px-8 box-border">
          {/* DESKTOP HEADER BAR (>= 1024px) - FULLY RESPONSIVE FOR ALL LAPTOPS */}
          <div className="hidden lg:flex items-center justify-between h-[80px] xl:h-[92px] gap-2 xl:gap-4">
            
            {/* 1. LEFT: Logo + AGGARWAL VAISH VIKAS SANGATHAN */}
            <Link href="/" className="flex items-center gap-2 xl:gap-3 shrink-0 group whitespace-nowrap">
              <div className="relative w-10 h-10 xl:w-12 xl:h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/images/agarwal/logo.png"
                  alt="Aggarwal Vaish Vikas Sangathan Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-sans text-[13px] lg:text-[14px] xl:text-[16px] font-extrabold tracking-tight text-[#1E1612] group-hover:text-[#7F160C] transition-colors uppercase leading-tight">
                  AGGARWAL VAISH
                </span>
                <span className="text-[10px] lg:text-[10.5px] xl:text-[12px] font-extrabold tracking-wider text-[#7F160C] uppercase leading-tight">
                  VIKAS SANGATHAN
                </span>
              </div>
            </Link>

            {/* 2. CENTER: Navigation Menu (Dropdown temporarily commented out as requested) */}
            <nav className="flex items-center justify-center gap-1 xl:gap-2.5 shrink-0">
              {navSections.map((sec) => (
                <div
                  key={sec.id}
                  className="relative group"
                >
                  <Link
                    href={sec.href}
                    className="navtext flex items-center px-2.5 xl:px-3.5 h-9 xl:h-10 rounded-md text-[12px] xl:text-[14px] font-semibold text-[#2B201A] hover:text-[#7F160C] tracking-wider uppercase transition-colors whitespace-nowrap"
                  >
                    <span>{sec.label}</span>
                  </Link>

                  {/* Dropdown Menu (commented out)
                  {activeDropdown === sec.id && (
                    <div className="absolute left-0 top-full pt-1.5 w-60 xl:w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                        {sec.subItems.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            className="block px-4 py-2.5 text-xs font-semibold text-gray-700 hover:text-[#7F160C] hover:bg-[#FFFDF5] transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  */}
                </div>
              ))}
            </nav>

            {/* 3. RIGHT: Search Members Button */}
            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              <Link
                href="#network"
                className="flex items-center gap-1.5 xl:gap-2 h-9 xl:h-10 px-3 xl:px-4 rounded-lg border border-[#7F160C] text-[#7F160C] hover:bg-[#7F160C] hover:text-white transition-all text-xs xl:text-sm font-semibold tracking-wide shrink-0 shadow-xs cursor-pointer whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5 xl:w-4 xl:h-4 stroke-[2.2]" />
                <span className="hidden xl:inline">Search Members</span>
                <span className="xl:hidden">Search</span>
              </Link>
            </div>

          </div>

          {/* MOBILE / TABLET HEADER (< 1024px) */}
          <div className="flex lg:hidden items-center justify-between h-[72px] sm:h-[78px]">
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/images/agarwal/logo.png"
                  alt="Aggarwal Vaish Vikas Sangathan Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-[#1E1612] uppercase truncate leading-tight">
                  AGGARWAL VAISH
                </span>
                <span className="text-[9.5px] sm:text-[10.5px] font-extrabold tracking-wider text-[#7F160C] uppercase truncate leading-tight">
                  VIKAS SANGATHAN
                </span>
              </div>
            </Link>

            {/* Mobile Right Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="#network"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#7F160C] text-[#7F160C] hover:bg-[#7F160C] hover:text-white transition-all text-xs font-semibold"
                aria-label="Search Members"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Search</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#2B201A] rounded-md hover:bg-gray-100"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SLIDE-OVER DRAWER */}
        {mounted && mobileMenuOpen && createPortal(
          <div className="lg:hidden fixed inset-0 z-[9999]">
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />
            <div className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col justify-between p-5 border-l border-gray-200 z-10 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/images/agarwal/logo.png"
                        alt="AVVS Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-sans text-xs font-extrabold text-[#1F1712] uppercase leading-tight">
                        AGGARWAL VAISH
                      </span>
                      <span className="text-[9.5px] font-bold text-[#7F160C] uppercase leading-tight">
                        VIKAS SANGATHAN
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-gray-500 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navSections.map((sec) => (
                    <div key={sec.id} className="py-1">
                      <Link
                        href={sec.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block font-bold text-sm text-[#1F1712] hover:text-[#7F160C] py-1.5 uppercase"
                      >
                        {sec.label}
                      </Link>
                      {/* Sub-items (commented out)
                      <div className="pl-3 space-y-1 border-l-2 border-[#7F160C]/30 mt-1">
                        {sec.subItems.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs text-gray-600 hover:text-[#7F160C] py-1"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                      */}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="#network"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#7F160C] text-white font-bold text-xs uppercase"
                >
                  <Search className="w-4 h-4" />
                  <span>{lang === "hi" ? "सदस्य खोजें" : "Search Members"}</span>
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
      </header>
    </>
  );
}
