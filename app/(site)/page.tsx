"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Search,
  ChevronDown,
  Award,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cachedFetch } from "@/lib/client-cache";
import EventDetailsModal, { EventItem } from "@/components/EventDetailsModal";
import GallerySection from "@/components/gallery/GallerySection";
import CountUp from "@/components/CountUp";
import HeadingDivider from "@/components/HeadingDivider";
import {
  TextReveal,
  ParagraphReveal,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/animation";

export default function HomePage() {
  const { lang, openDonateModal } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [heroTouchStart, setHeroTouchStart] = useState<number | null>(null);
  const [heroTouchEnd, setHeroTouchEnd] = useState<number | null>(null);

  const heroSlides = [
    {
      id: "hero-slide-1",
      src: "/images/agarwal/hero-slide-1-hd.png",
      srcMobile: "/images/agarwal/hero-slide-1-mobile.png",
      alt: "अग्रवाल वैश्य विकास संगठन हरियाणा - वैश्य समाज का एक ही नारा, राजनीति में हो प्रतिनिधित्व हमारा।",
    },
    {
      id: "hero-slide-2",
      src: "/images/agarwal/hero-slide-2-hd.png",
      srcMobile: "/images/agarwal/hero-slide-2-mobile.png",
      alt: "संकल्प - अग्रवाल वैश्य विकास संगठन के पंच संकल्प",
    },
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    setHeroTouchStart(e.targetTouches[0].clientX);
  };
  const handleHeroTouchMove = (e: React.TouchEvent) => {
    setHeroTouchEnd(e.targetTouches[0].clientX);
  };
  const handleHeroTouchEnd = () => {
    if (!heroTouchStart || !heroTouchEnd) return;
    const distance = heroTouchStart - heroTouchEnd;
    if (distance > 45) {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }
    if (distance < -45) {
      setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
    setHeroTouchStart(null);
    setHeroTouchEnd(null);
  };

  // Dynamic Upcoming Events: Controlled via Admin Panel (/admin/events) and Neon DB
  // If active published events exist in the database, they will automatically display here.
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  useEffect(() => {
    cachedFetch<{ events: EventItem[] }>("/api/events")
      .then((data) => {
        if (data?.events && Array.isArray(data.events)) {
          setEvents(data.events);
        }
      })
      .catch(() => {});
  }, []);

  const formatCardDate = (dateVal: string | Date) => {
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).toUpperCase();
    } catch {
      return String(dateVal);
    }
  };

  // Active Districts of Haryana for the Network section (Total: 2,800 Members across 23 Districts)
  const haryanaDistricts = [
    { name: "Ambala", members: 4 },
    { name: "Bhiwani", members: 520 },
    { name: "Chandigarh", members: 4 },
    { name: "Charkhi Dadri", members: 220 },
    { name: "Faridabad", members: 4 },
    { name: "Fatehabad", members: 3 },
    { name: "Gurugram", members: 4 },
    { name: "Hisar", members: 4 },
    { name: "Jhajjar", members: 3 },
    { name: "Jind", members: 4 },
    { name: "Kaithal", members: 380 },
    { name: "Karnal", members: 360 },
    { name: "Kurukshetra", members: 330 },
    { name: "Mahendragarh", members: 3 },
    { name: "Nuh", members: 3 },
    { name: "Palwal", members: 3 },
    { name: "Panchkula", members: 240 },
    { name: "Panipat", members: 460 },
    { name: "Rewari", members: 4 },
    { name: "Rohtak", members: 4 },
    { name: "Sirsa", members: 290 },
    { name: "Sonipat", members: 4 },
    { name: "Yamunanagar", members: 4 },
  ];

  const totalMembersCount = 2800;

  const currentMembersCount =
    selectedDistrict === "All"
      ? 2800
      : haryanaDistricts.find((d) => d.name === selectedDistrict)?.members ?? 4;

  const sankalpCarouselRef = useRef<HTMLDivElement>(null);

  const scrollSankalpLeft = () => {
    if (sankalpCarouselRef.current) {
      const step = sankalpCarouselRef.current.clientWidth;
      sankalpCarouselRef.current.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const scrollSankalpRight = () => {
    if (sankalpCarouselRef.current) {
      const step = sankalpCarouselRef.current.clientWidth;
      const maxScroll = sankalpCarouselRef.current.scrollWidth - sankalpCarouselRef.current.clientWidth;
      if (sankalpCarouselRef.current.scrollLeft >= maxScroll - 15) {
        sankalpCarouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sankalpCarouselRef.current.scrollBy({ left: step, behavior: "smooth" });
      }
    }
  };

  // Mouse drag-to-scroll support (for desktop click-and-drag & responsive mobile simulator)
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = sankalpCarouselRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = sankalpCarouselRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  // Auto-Scroll for Panch Sankalp Carousel (Looping smoothly, pauses on interaction)
  useEffect(() => {
    const el = sankalpCarouselRef.current;
    if (!el) return;

    let isInteracting = false;
    let resumeTimeout: NodeJS.Timeout;

    const pauseInteraction = () => {
      isInteracting = true;
      clearTimeout(resumeTimeout);
    };

    const resumeInteraction = () => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isInteracting = false;
      }, 5000);
    };

    el.addEventListener("touchstart", pauseInteraction, { passive: true });
    el.addEventListener("touchend", resumeInteraction, { passive: true });
    el.addEventListener("mouseenter", pauseInteraction);
    el.addEventListener("mouseleave", resumeInteraction);

    const autoScrollTimer = setInterval(() => {
      if (isInteracting || isDraggingRef.current || !sankalpCarouselRef.current) return;
      const carousel = sankalpCarouselRef.current;
      const step = carousel.clientWidth;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 15) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 4000);

    return () => {
      clearInterval(autoScrollTimer);
      clearTimeout(resumeTimeout);
      el.removeEventListener("touchstart", pauseInteraction);
      el.removeEventListener("touchend", resumeInteraction);
      el.removeEventListener("mouseenter", pauseInteraction);
      el.removeEventListener("mouseleave", resumeInteraction);
    };
  }, []);

  const sankalpItems = [
    {
      id: "sankalp-1",
      titleHiLine1: "राजनीतिक",
      titleHiLine2: "सशक्तिकरण",
      titleHi: "राजनीतिक सशक्तिकरण",
      titleEn: "Political Empowerment",
      desc: "To strengthen political representation and encourage active participation in decision-making for the community.",
      descHi: "वैश्य समाज को राजनीतिक रूप से जागरूक करना तथा लोकतांत्रिक व्यवस्था में उसकी सक्रिय भागीदारी और उचित प्रतिनिधित्व के लिए प्रयास करना।",
    },
    {
      id: "sankalp-2",
      titleHiLine1: "नारी स्वावलंबन",
      titleHiLine2: "एवं उद्यमिता",
      titleHi: "नारी स्वावलंबन एवं उद्यमिता",
      titleEn: "Women Empowerment & Entrepreneurship",
      desc: "To promote women's independence, leadership, equal opportunities and entrepreneurship.",
      descHi: "महिलाओं को शिक्षा, कौशल विकास, रोजगार और उद्यमिता के अवसर प्रदान कर आत्मनिर्भर एवं सशक्त बनाना।",
    },
    {
      id: "sankalp-3",
      titleHiLine1: "युवा नेतृत्व",
      titleHiLine2: "निर्माण",
      titleHi: "युवा नेतृत्व निर्माण",
      titleEn: "Youth Leadership Development",
      desc: "To empower young generations with leadership skills, confidence and opportunities to shape the future.",
      descHi: "युवाओं में नेतृत्व क्षमता, सामाजिक जिम्मेदारी, संगठनात्मक कौशल और राष्ट्र निर्माण की भावना विकसित करना।",
    },
    {
      id: "sankalp-4",
      titleHiLine1: "आर्थिक",
      titleHiLine2: "आत्मनिर्भरता",
      titleHi: "आर्थिक आत्मनिर्भरता",
      titleEn: "Economic Self-Reliance",
      desc: "To encourage entrepreneurship, business growth, employment and financial independence within the community.",
      descHi: "व्यापार, स्वरोजगार, उद्यमिता, कौशल विकास एवं आपसी सहयोग के माध्यम से समाज की आर्थिक मजबूती को बढ़ावा देना।",
    },
    {
      id: "sankalp-5",
      titleHiLine1: "संगठित",
      titleHiLine2: "समाज",
      titleHi: "संगठित समाज",
      titleEn: "Organised Society",
      desc: "To unite the community through mutual cooperation, collective strength and a shared vision for progress.",
      descHi: "समाज के सभी वर्गों को एक मंच पर जोड़कर एकता, भाईचारे, सहयोग और सामूहिक विकास की भावना को मजबूत करना।",
    },
  ];

  return (
    <div className="w-full bg-[#FFFDF9] text-[#1F1712] font-sans selection:bg-[#7F160C] selection:text-white">

      {/* ============================================================ */}
      {/* 1. TOP NEWS TICKER (EXACT REFERENCE SCREENSHOT 1)           */}
      {/* ============================================================ */}
      <div className="w-full bg-[#7F160C] text-white py-2 sm:py-2.5 overflow-hidden select-none relative z-30 shadow-sm border-b border-[#69120A]">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[1, 2].map((set) => (
            <div
              key={`ticker-set-${set}`}
              className="flex items-center shrink-0 gap-8 sm:gap-12 px-4 text-xs sm:text-sm font-semibold tracking-wide"
              aria-hidden={set > 1 ? "true" : undefined}
            >
              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVS" fill className="object-contain" />
                </span>
                <span>वैश्य समाज का एक ही नारा, राजनीति में हो प्रतिनिधित्व हमारा।</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVS" fill className="object-contain" />
                </span>
                <span>अग्रवाल वैश्य विकास संगठन हरियाणा • समाज को जगाना है, राजनीति में लाना है</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVS" fill className="object-contain" />
                </span>
                <span>अग्रवाल वैश्य विकास संगठन के पंच संकल्प: राजनीतिक सशक्तिकरण, नारी स्वावलंबन एवं उद्यमिता, युवा नेतृत्व निर्माण, आर्थिक आत्मनिर्भरता, संगठित समाज</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVS" fill className="object-contain" />
                </span>
                <span>हमारा लक्ष्य केवल समाज को संगठित करना नहीं, बल्कि उसे नेतृत्व, सामर्थ्य और स्वाभिमान के शिखर तक पहुंचाना है।</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. HERO SECTION: 100% FULL-WIDTH 2-SLIDE CAROUSEL (UNCUT HD) */}
      {/* ============================================================ */}
      <section
        onTouchStart={handleHeroTouchStart}
        onTouchMove={handleHeroTouchMove}
        onTouchEnd={handleHeroTouchEnd}
        className="relative w-full aspect-square sm:aspect-[1672/941] overflow-hidden select-none group border-b-0 sm:border-b sm:border-gray-200 bg-white"
      >
        {/* Horizontal sliding track */}
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}
        >
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className="w-full h-full shrink-0 relative bg-white"
            >
              {/* Desktop / Tablet Image */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                unoptimized
                className="hidden sm:block object-cover object-center w-full h-full select-none"
                sizes="100vw"
              />
              {/* Mobile Image (Tall Portrait Viewport) */}
              <Image
                src={slide.srcMobile || slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                unoptimized
                className="block sm:hidden object-cover object-center w-full h-full select-none"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-2.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-black/25 backdrop-blur-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
          {heroSlides.map((slide, idx) => (
            <button
              key={`dot-${slide.id}`}
              type="button"
              onClick={() => setCurrentHeroSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${idx === currentHeroSlide
                  ? "w-7 sm:w-10 h-2 sm:h-3 bg-[#7F160C] shadow-md"
                  : "w-2 sm:w-3 h-2 sm:h-3 bg-white/70 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. OUR NETWORK SECTION (EXACT REFERENCE SCREENSHOT 2)        */}
      {/* ============================================================ */}
      <section id="network" className="pt-5 pb-12 sm:py-20 lg:py-24 bg-[#FFF9F2] border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centered Bordered Badge: [ OUR NETWORK ] */}
          <div className="flex justify-center mb-5 sm:mb-14">
            <div className="inline-block px-5 py-2 sm:px-7 sm:py-2.5 rounded-lg border-2 border-[#7F160C] text-[#7F160C] font-black text-sm sm:text-lg tracking-[0.18em] sm:tracking-[0.2em] uppercase bg-white shadow-xs">
              OUR NETWORK
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Official Haryana Map with AVS Emblem */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[480px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-[#7F160C]">
                <Image
                  src="/images/agarwal/haryana-map-avs.jpg"
                  alt="हरियाणा - अग्रवाल वैश्य विकास संगठन"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Floating White Card with District Selector (Exact Reference) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start w-full">
              <div className="w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xl p-5 sm:p-8 space-y-5 sm:space-y-6">

                {/* Top Row: Total Districts: 23 with underline */}
                <div className="pb-3.5 sm:pb-4 border-b border-gray-200">
                  <label htmlFor="district-select" className="sr-only">Select District</label>
                  <div className="relative">
                    <select
                      id="district-select"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full appearance-none bg-transparent pr-8 text-lg sm:text-[22px] font-bold text-gray-900 cursor-pointer focus:outline-none"
                    >
                      <option value="All">Total Districts: 23</option>
                      {haryanaDistricts.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.members.toLocaleString()} Members)
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900 pointer-events-none stroke-[2.5]" />
                  </div>
                </div>

                {/* Inner Bordered Card with Person Silhouette & Total Members */}
                <div className="border border-gray-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-white flex items-center gap-4 sm:gap-5">
                  <div className="text-black shrink-0">
                    <svg className="w-8 h-8 sm:w-9 sm:h-9 fill-current" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm sm:text-[15px] font-normal text-gray-500">
                      {selectedDistrict === "All" ? "Total Members" : `${selectedDistrict} Members`}
                    </p>
                    <p className="font-sans font-bold text-[26px] sm:text-[32px] text-gray-900 leading-none tracking-tight">
                      <CountUp key={selectedDistrict} start={currentMembersCount > 10 ? Math.min(50, Math.floor(currentMembersCount / 2)) : 0} end={currentMembersCount} duration={800} />
                    </p>
                  </div>
                </div>

                {/* View More Link in Orange (Exact Reference) */}
                <div className="pt-0.5">
                  <Link
                    href="#network"
                    className="inline-block text-sm sm:text-[15px] font-semibold text-[#7F160C] hover:text-[#69120A] underline decoration-[#7F160C] underline-offset-4 transition-colors"
                  >
                    View More
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. PANCH SANKALP SECTION (EXACT REFERENCE SCREENSHOT FORMAT) */}
      {/* ============================================================ */}
      <section id="sankalp" className="py-12 sm:py-20 lg:py-24 bg-[#FFFDF9] border-b border-gray-200 overflow-hidden select-none">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Row: Title & Subtitle on Left, < > Arrow Buttons on Right (Exact Reference Pic 1) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-12">
            <div className="py-1">
              <h2 className="font-sans text-[26px] sm:text-[36px] font-bold tracking-tight leading-tight">
                <span className="relative inline-block text-[#1F1712] border-b-[3px] sm:border-b-4 border-[#7F160C] pb-0.5 sm:pb-1 mr-2 sm:mr-3">
                  Panch
                </span>
                <span className="text-[#7F160C]">
                  Sankalp
                </span>
              </h2>
              <p className="text-xs sm:text-base text-gray-600 mt-2 font-normal leading-relaxed">
                Five guiding commitments shaping a united, empowered and progressive Vaish community.
              </p>
            </div>

            {/* Circular Carousel Control Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end sm:self-auto">
              <button
                onClick={scrollSankalpLeft}
                aria-label="Previous Panch Sankalp"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#7F160C] hover:bg-[#69120A] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
              <button
                onClick={scrollSankalpRight}
                aria-label="Next Panch Sankalp"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#7F160C] hover:bg-[#69120A] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Cards Track: Horizontal Smooth Scrollable Carousel with Hidden Scrollbar */}
          <div
            ref={sankalpCarouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex gap-4 sm:gap-7 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x pan-y",
            }}
          >
            {sankalpItems.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_100%] sm:flex-[0_0_47%] lg:flex-[0_0_31%] xl:flex-[0_0_31.5%] snap-center shrink-0"
              >
                {/* 100% Native Rendered Card Matching Exact Reference Formatting */}
                <div className="h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-100/80 shadow-md bg-white flex flex-col justify-between select-none min-h-[440px] sm:min-h-[480px]">
                  {/* Top Solid Brand Swatch Section (#7F160C) */}
                  <div className="relative bg-[#7F160C] h-60 sm:h-68 md:h-76 min-h-[240px] sm:min-h-[270px] flex items-center justify-center p-3 sm:p-5 text-center shadow-inner overflow-hidden">
                    <h3 
                      className="font-sankalp-title text-[48px] text-white leading-[1.08] drop-shadow-md px-1 sm:px-2 tracking-tight text-center flex flex-col items-center justify-center"
                      style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 800 }}
                    >
                      <span className="block">{item.titleHiLine1}</span>
                      <span className="block mt-1 sm:mt-2">{item.titleHiLine2}</span>
                    </h3>
                  </div>

                  {/* Overlapping Round Logo Emblem */}
                  <div className="relative -mt-6 sm:-mt-7 z-10 flex justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-1 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                      <Image
                        src="/images/agarwal/logo.png"
                        alt="AVS Logo"
                        width={44}
                        height={44}
                        className="w-full h-full object-contain p-0.5"
                      />
                    </div>
                  </div>

                  {/* Bottom White Description Section */}
                  <div className="flex-1 p-4 sm:p-6 pt-2 sm:pt-2 flex flex-col justify-start items-center text-center">
                    <h4 className="font-sans font-bold text-[17px] sm:text-[19px] text-[#1F1712] leading-tight">
                      {item.titleEn}
                    </h4>

                    {/* Exact Reference Underline: line • dot • line in Brand Swatch Color */}
                    <div className="flex items-center justify-center gap-1.5 my-2.5 sm:my-3" aria-hidden="true">
                      <span className="w-8 sm:w-10 h-[2px] bg-[#7F160C] rounded-full" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7F160C]" />
                      <span className="w-8 sm:w-10 h-[2px] bg-[#7F160C] rounded-full" />
                    </div>

                    <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed font-normal px-1 sm:px-2 line-clamp-4">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centered [ View All ] Button (Links to /panch-sankalp dedicated page) */}
          <div className="flex justify-center mt-6 sm:mt-12">
            <Link
              href="/panch-sankalp"
              className="inline-block px-7 sm:px-8 py-2.5 rounded-lg bg-[#7F160C] hover:bg-[#69120A] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              View All
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5.5. PANCH SANKALP WIDE BANNER (100% FULL-WIDTH END-TO-END)  */}
      {/* ============================================================ */}
      <section className="relative w-full aspect-[1024/332] min-h-[120px] sm:min-h-0 overflow-hidden select-none border-b border-[#E8DFD3] bg-white">
        <Image
          src="/images/agarwal/sankalp-wide-banner.jpg"
          alt="अग्रवाल वैश्य विकास संगठन के पंच संकल्प"
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full block select-none"
        />
      </section>

      {/* ============================================================ */}
      {/* 6. UPCOMING EVENTS & SAMMELANS (Dynamic from Neon DB & Admin Panel) */}
      {/* ============================================================ */}
      {events.length > 0 && (
        <section id="events" className="py-12 sm:py-20 lg:py-24 bg-[#FFF9F2] border-b border-[#E8DFD3]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
              <h2 className="font-sans font-bold text-[28px] sm:text-[38px] lg:text-[42px] text-[#7F160C] tracking-tight">
                Upcoming Events
              </h2>
              <HeadingDivider className="mt-2.5 sm:mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="h-full">
                  <div
                    onClick={() => {
                      setSelectedEvent(event);
                      setEventModalOpen(true);
                    }}
                    className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-[#7F160C] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full group"
                  >
                    {/* Top Saffron Banner */}
                    <div className="relative w-full h-[150px] sm:h-[180px] bg-gradient-to-br from-[#7F160C] to-[#69120A] flex items-center justify-center p-4 sm:p-6 text-center shadow-inner">
                      <h3 className="font-sans font-black text-xl sm:text-2xl sm:text-3xl text-white leading-tight drop-shadow-md px-2">
                        {event.titleHi || event.title}
                      </h3>
                    </div>

                    {/* Overlapping AVS Emblem */}
                    <div className="relative -mt-6 z-10 flex justify-center">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                        <Image
                          src="/images/agarwal/logo.png"
                          alt="AVS Logo"
                          width={44}
                          height={44}
                          className="w-full h-full object-contain p-0.5"
                        />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 pt-3 sm:pt-3.5 flex-1 flex flex-col justify-between text-center space-y-3 sm:space-y-3.5">
                      <div className="space-y-2">
                        <h4 className="font-sans font-bold text-[18px] sm:text-[20px] text-gray-900 group-hover:text-[#7F160C] transition-colors leading-snug">
                          {event.title}
                        </h4>
                        <p className="text-sm sm:text-[16px] text-gray-600 leading-relaxed line-clamp-3">
                          {lang === "hi" && event.summaryHi ? event.summaryHi : event.summary}
                        </p>
                      </div>

                      <div className="pt-3 sm:pt-3.5 border-t border-gray-200 flex items-center justify-between text-xs sm:text-sm font-semibold gap-2">
                        <span className="flex items-center gap-1.5 truncate max-w-[62%] text-gray-700">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7F160C] shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </span>
                        <span className="text-[#7F160C] font-bold text-xs sm:text-sm shrink-0 tracking-wide">
                          {formatCardDate(event.startDate)}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 7. GALLERY SHOWCASE (AUTHENTIC DESIGNS & CAMPAIGNS)          */}
      {/* ============================================================ */}
      <GallerySection />

      {/* ============================================================ */}
      {/* 8. EVENT MODAL                                               */}
      {/* ============================================================ */}
      {events.length > 0 && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={eventModalOpen}
          onClose={() => setEventModalOpen(false)}
          onRegister={(title, customAmounts) =>
            openDonateModal(title, undefined, false, undefined, customAmounts)
          }
          lang={lang}
        />
      )}

    </div>
  );
}
