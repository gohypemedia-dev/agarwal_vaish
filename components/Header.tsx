"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, Globe, Menu, X, ChevronDown, ChevronRight, User, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useSmoothScroll } from "@/components/animation/SmoothScrollProvider";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, user, openAuthModal, openDonateModal } = useApp();
  const { lenis } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>("about");
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

  // Navigation matching reference website (avsharyana.com) exactly - with dedicated pages
  const navSections = [
    {
      id: "about",
      label: "About",
      href: "/about",
      subItems: [
        { label: "About AVVS", href: "/about" },
        { label: "About President", href: "/president" },
        { label: "President Message", href: "/president-message" },
        { label: "Mission & Vision", href: "/mission-and-vision" },
        { label: "Ghatak", href: "/ghatak" },
        { label: "Our Inspiration", href: "/inspirations" },
        { label: "About Agroha Dham", href: "/agroha-dham" },
      ],
    },
    {
      id: "organisation",
      label: "Organisation",
      href: "/organisation/president-cell",
      subItems: [
        { label: "President Cell", href: "/organisation/president-cell" },
        { label: "CWC", href: "/organisation/cwc" },
        { label: "Patrons", href: "/organisation/patrons" },
        { label: "Mahila Wing", href: "/organisation/mahila-wing" },
        { label: "Youth Wing", href: "/organisation/youth-wing" },
        { label: "District President", href: "/organisation/district-president" },
        { label: "Frontal Organization", href: "/organisation/frontal-organization" },
      ],
    },
    {
      id: "media",
      label: "Media",
      href: "/gallery",
      subItems: [
        { label: "Photo Gallery", href: "/gallery" },
        { label: "Video Gallery", href: "/gallery" },
        { label: "Press Releases", href: "/gallery" },
        { label: "News & Circulars", href: "/gallery" },
        { label: "Blogs", href: "/gallery" },
        { label: "Downloads", href: "/gallery" },
      ],
    },
    {
      id: "initiatives",
      label: "Initiatives",
      href: "/initiatives",
      subItems: [
        { label: "Matrimonial", href: "/initiatives" },
        { label: "Job", href: "/initiatives" },
        { label: "Business Exchange", href: "/initiatives" },
        { label: "Blood Donation", href: "/initiatives" },
      ],
    },
    {
      id: "join",
      label: "Join Now",
      href: "/membership",
      subItems: [
        { label: "Membership", href: "/membership" },
        { label: "Business", href: "/membership" },
        { label: "Donation", href: "/donate" },
      ],
    },
    {
      id: "network",
      label: "Network",
      href: "/#network",
      subItems: [
        { label: "Haryana", href: "/#network" },
      ],
    },
  ];

  // Close desktop dropdown and close mobile drawer on route change,
  // but keep the current section open in the mobile menu (or remember the opened section)
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    const activeSec = navSections.find((sec) => {
      if (sec.href === pathname) return true;
      return sec.subItems?.some((sub) => {
        const cleanHref = sub.href.split("#")[0];
        return cleanHref === pathname || (cleanHref !== "/" && pathname.startsWith(cleanHref));
      });
    });

    if (activeSec) {
      setOpenMobileDropdown(activeSec.id);
    }
  }, [pathname]);

  const handleToggleMobileMenu = () => {
    if (!mobileMenuOpen && !openMobileDropdown) {
      const activeSec = navSections.find((sec) => {
        if (sec.href === pathname) return true;
        return sec.subItems?.some((sub) => {
          const cleanHref = sub.href.split("#")[0];
          return cleanHref === pathname || (cleanHref !== "/" && pathname.startsWith(cleanHref));
        });
      });
      setOpenMobileDropdown(activeSec ? activeSec.id : "about");
    }
    setMobileMenuOpen((prev) => !prev);
  };

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

            {/* 2. CENTER: Navigation Menu with Active Dropdowns */}
            <nav className="flex items-center justify-center gap-1 xl:gap-2.5 shrink-0">
              {navSections.map((sec) => (
                <div
                  key={sec.id}
                  className="relative group py-2"
                  onMouseEnter={() => setActiveDropdown(sec.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={sec.href}
                    onClick={() => {
                      if (sec.href === pathname || (sec.href === "/about" && pathname === "/about")) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setActiveDropdown(activeDropdown === sec.id ? null : sec.id);
                    }}
                    className="navtext flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 h-9 xl:h-10 rounded-md text-[12px] xl:text-[14px] font-semibold text-[#2B201A] hover:text-[#7F160C] tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{sec.label}</span>
                    {sec.subItems && sec.subItems.length > 0 && (
                      <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 group-hover:rotate-180 text-gray-400 group-hover:text-[#7F160C]" />
                    )}
                  </Link>

                  {/* Dropdown Menu - Styled with our fonts and brand colors matching reference website */}
                  {sec.subItems && sec.subItems.length > 0 && (
                    <div
                      className={`absolute left-0 top-full pt-1.5 w-64 xl:w-72 z-50 transition-all duration-150 ${
                        activeDropdown === sec.id
                          ? "block opacity-100 pointer-events-auto"
                          : "hidden group-hover:block opacity-100 pointer-events-auto"
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 ring-1 ring-black/5 divide-y divide-gray-100">
                        {sec.subItems.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            onClick={() => {
                              if (sub.href === pathname || (sub.href.startsWith("/about") && pathname === "/about")) {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }
                              setActiveDropdown(null);
                            }}
                            className="group/item flex items-center justify-between px-4 py-2.5 text-xs xl:text-[13px] font-medium text-gray-800 hover:text-[#7F160C] hover:bg-[#FFFDF5] transition-colors cursor-pointer"
                          >
                            <span>{sub.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-[#7F160C] group-hover/item:translate-x-0.5 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* 3. RIGHT: Search Members Button */}
            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              <Link
                href="/advance-search"
                onClick={() => setActiveDropdown(null)}
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
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/images/agarwal/logo.png"
                  alt="Aggarwal Vaish Vikas Sangathan Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-sans text-[11.5px] sm:text-sm font-extrabold tracking-tight text-[#1E1612] uppercase truncate leading-tight">
                  AGGARWAL VAISH
                </span>
                <span className="text-[9px] sm:text-[10.5px] font-extrabold tracking-wider text-[#7F160C] uppercase truncate leading-tight">
                  VIKAS SANGATHAN
                </span>
              </div>
            </Link>

            {/* Mobile Right Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Link
                href="/advance-search"
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#7F160C] text-[#7F160C] hover:bg-[#7F160C] hover:text-white transition-all text-xs font-semibold"
                aria-label="Search Members"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search</span>
              </Link>

              <button
                onClick={handleToggleMobileMenu}
                className="p-1.5 sm:p-2 text-[#2B201A] rounded-md hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SLIDE-OVER DRAWER (EXACT REPLICA OF REFERENCE SITE) */}
        {mounted && mobileMenuOpen && createPortal(
          <div className="lg:hidden fixed inset-0 z-[9999]">
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />
            <div className="absolute top-0 right-0 bottom-0 w-[82%] max-w-[320px] bg-[#FAF7F2] shadow-2xl flex flex-col justify-start p-5 border-l border-[#E8DFD3] z-10 overflow-y-auto">
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E8DFD3]/80 mb-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-2xs">
                    <Image
                      src="/images/agarwal/logo.png"
                      alt="AVVS Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-xs tracking-wider text-[#1E293B] uppercase leading-tight">
                      AGGARWAL VAISH
                    </span>
                    <span className="text-[9.5px] font-bold text-[#7F160C] uppercase tracking-wider leading-tight">
                      VIKAS SANGATHAN
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-gray-800 hover:text-black cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>

              {/* Drawer Navigation List matching reference website */}
              <nav className="flex-1 py-1 space-y-0.5 overflow-y-auto">
                {/* 1. HOME */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[13px] font-bold text-[#1E293B] hover:text-[#7F160C] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  HOME
                </Link>

                {/* 2-7. ACCORDION DROPDOWN SECTIONS (ABOUT, ORGANISATION, MEDIA, INITIATIVES, JOIN NOW, NETWORK) */}
                {navSections.map((sec) => {
                  const isOpen = openMobileDropdown === sec.id;
                  return (
                    <div key={sec.id} className="py-0.5">
                      <button
                        type="button"
                        onClick={() => setOpenMobileDropdown(isOpen ? null : sec.id)}
                        className="flex items-center justify-between w-full py-2 text-left text-[13px] font-bold text-[#1E293B] hover:text-[#7F160C] uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>{sec.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#7F160C]" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Subitems */}
                      {isOpen && sec.subItems && (
                        <div className="pl-3.5 pr-1 py-1 mb-1.5 space-y-1 border-l-2 border-[#7F160C]/30 ml-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                          {sec.subItems.map((sub, i) => (
                            <Link
                              key={i}
                              href={sub.href}
                              onClick={() => {
                                if (sub.href === pathname || (sub.href.startsWith("/about") && pathname === "/about")) {
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                                setMobileMenuOpen(false);
                              }}
                              className="flex items-center justify-between py-1.5 text-xs font-semibold text-gray-700 hover:text-[#7F160C] transition-colors cursor-pointer"
                            >
                              <span>{sub.label}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* 8. SEARCH MEMBERS */}
                <Link
                  href="/advance-search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[13px] font-bold text-[#1E293B] hover:text-[#7F160C] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  SEARCH MEMBERS
                </Link>

                {/* 9. DONATE NOW */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (openDonateModal) openDonateModal();
                    else router.push("/donate");
                  }}
                  className="block w-full text-left py-2 text-[13px] font-bold text-[#1E293B] hover:text-[#7F160C] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  DONATE NOW
                </button>

                {/* 11. CIRCULARS */}
                <Link
                  href="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[13px] font-bold text-[#1E293B] hover:text-[#7F160C] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  CIRCULARS
                </Link>

                {/* 12. PRESS RELEASE */}
                <Link
                  href="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[13px] font-bold text-[#1E293B] hover:text-[#7F160C] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  PRESS RELEASE
                </Link>
              </nav>
            </div>
          </div>,
          document.body
        )}
      </header>
    </>
  );
}
