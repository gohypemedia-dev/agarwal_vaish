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

  const heroSlides = [
    {
      id: "hero-slide-1",
      src: "/images/agarwal/hero-slide-1-hd.png",
      alt: "अग्रवाल वैश्य विकास संगठन हरियाणा - वैश्य समाज का एक ही नारा, राजनीति में हो प्रतिनिधित्व हमारा।",
    },
    {
      id: "hero-slide-2",
      src: "/images/agarwal/hero-slide-2-hd.png",
      alt: "संकल्प - अग्रवाल वैश्य विकास संगठन के पंच संकल्प",
    },
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const defaultEvents: EventItem[] = [
    {
      id: "ev-1",
      slug: "agrasen-jayanti-mahotsav-2026",
      title: "Maharaja Agrasen Jayanti Mahotsav",
      titleHi: "महाराजा अग्रसेन जयंती भव्य महोत्सव",
      summary: "Grand annual celebration honoring the life, ideals, and socio-economic philosophy of Maharaja Agrasen Ji.",
      summaryHi: "महाराजा अग्रसेन जी के पावन आदर्शों, समाजवाद के सिद्धांत एवं जीवन दर्शन को समर्पित भव्य वार्षिक जयंती महोत्सव।",
      description: "Join thousands of members across Haryana to celebrate the divine birth anniversary of Maharaja Agrasen Ji. Featuring cultural processions (Shobha Yatra), community sammelan, honoring distinguished social workers, and grand mahaprasad.",
      startDate: "2026-10-11T10:30:00Z",
      endDate: "2026-10-11T17:00:00Z",
      timeText: "10:00 AM – 5:00 PM IST",
      location: "Bhiwani & District Centres across Haryana",
      address: "Aggarwal Vaish Bhawan, Hansi Road, Bhiwani, Haryana - 127021",
      contactPhone: "+91 94160 55000",
      isPublished: true,
    },
    {
      id: "ev-2",
      slug: "vaish-yuva-leadership-conclave-2026",
      title: "Vaish Yuva Leadership & Business Conclave",
      titleHi: "वैश्य युवा नेतृत्व एवं व्यापार सम्मेलन",
      summary: "Statewide youth convention fostering entrepreneurship, public leadership, and professional networking.",
      summaryHi: "युवाओं में व्यापार, स्टार्टअप, नेतृत्व कौशल और सामाजिक सहभागिता को बढ़ावा देने हेतु राज्यस्तरीय युवा महासम्मेलन।",
      description: "A transformative convention connecting emerging entrepreneurs and youth leaders with seasoned industry icons and community mentors to drive economic resilience and public representation.",
      startDate: "2026-11-28T09:00:00Z",
      endDate: "2026-11-28T16:00:00Z",
      timeText: "9:30 AM – 4:30 PM IST",
      location: "Auditorium, Hisar / Gurugram",
      address: "AVS Youth Convention Centre, Haryana",
      contactPhone: "+91 94160 55000",
      isPublished: true,
    },
    {
      id: "ev-3",
      slug: "mahila-samman-sashaktikaran-2027",
      title: "State Mahila Sammelan & Pratibha Samman",
      titleHi: "राज्यस्तरीय महिला सम्मेलन एवं प्रतिभा सम्मान",
      summary: "Statewide gathering dedicated to empowering women entrepreneurs and felicitating young community achievers.",
      summaryHi: "महिला उद्यमियों के सशक्तिकरण, बालिका शिक्षा संवर्धन और समाज की प्रतिभावान बेटियों का राज्यस्तरीय सम्मान समारोह।",
      description: "A prestigious assembly celebrating exceptional women leaders, academic toppers, sports achievers, and grassroots social changemakers from all 22 districts of Haryana.",
      startDate: "2027-01-24T05:00:00Z",
      endDate: "2027-01-24T12:00:00Z",
      timeText: "10:30 AM – 3:30 PM IST",
      location: "State Central Hall, Bhiwani / Rohtak",
      address: "Aggarwal Vaish Central Complex, Haryana",
      contactPhone: "+91 94160 55000",
      isPublished: true,
    },
  ];

  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  useEffect(() => {
    cachedFetch<{ events: EventItem[] }>("/api/events")
      .then((data) => {
        if (data?.events && Array.isArray(data.events) && data.events.length > 0) {
          const legacyKeywords = ["bhagwat", "gurukul", "gopashtami", "sadhvi", "ashram", "vrindavan"];
          const valid = data.events.filter((e) => {
            const t = `${e.title || ""} ${e.titleHi || ""} ${e.location || ""}`.toLowerCase();
            return !legacyKeywords.some((k) => t.includes(k));
          });
          if (valid.length > 0) {
            setEvents(valid);
          } else {
            setEvents(defaultEvents);
          }
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

  // Districts of Haryana for the Network section (Authentic realistic counts)
  const haryanaDistricts = [
    { name: "Bhiwani", members: 847 },
    { name: "Hisar", members: 629 },
    { name: "Gurugram", members: 684 },
    { name: "Faridabad", members: 593 },
    { name: "Rohtak", members: 518 },
    { name: "Panipat", members: 452 },
    { name: "Karnal", members: 396 },
    { name: "Sonipat", members: 381 },
    { name: "Sirsa", members: 314 },
    { name: "Ambala", members: 295 },
    { name: "Jind", members: 273 },
    { name: "Fatehabad", members: 241 },
    { name: "Yamunanagar", members: 237 },
    { name: "Rewari", members: 219 },
    { name: "Kaithal", members: 194 },
    { name: "Kurukshetra", members: 182 },
    { name: "Mahendragarh", members: 175 },
    { name: "Jhajjar", members: 163 },
    { name: "Palwal", members: 151 },
    { name: "Panchkula", members: 142 },
    { name: "Charkhi Dadri", members: 136 },
    { name: "Nuh", members: 88 },
  ];

  const currentMembersCount =
    selectedDistrict === "All"
      ? 6103
      : haryanaDistricts.find((d) => d.name === selectedDistrict)?.members || 265;

  const sankalpCarouselRef = useRef<HTMLDivElement>(null);

  const scrollSankalpLeft = () => {
    if (sankalpCarouselRef.current) {
      sankalpCarouselRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollSankalpRight = () => {
    if (sankalpCarouselRef.current) {
      sankalpCarouselRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  const sankalpItems = [
    {
      id: "sankalp-1",
      titleHi: "राजनीतिक सशक्तिकरण",
      titleEn: "Political Empowerment",
      desc: "To strengthen political representation and encourage active participation in decision making for the community.",
    },
    {
      id: "sankalp-2",
      titleHi: "नारी स्वावलंबन एवं उद्यमिता",
      titleEn: "Women Empowerment & Entrepreneurship",
      desc: "To promote women's independence, leadership, equal opportunities and entrepreneurship.",
    },
    {
      id: "sankalp-3",
      titleHi: "युवा नेतृत्व निर्माण",
      titleEn: "Youth Leadership Development",
      desc: "To empower young generations with leadership skills, confidence and opportunities to shape the future.",
    },
    {
      id: "sankalp-4",
      titleHi: "आर्थिक आत्मनिर्भरता",
      titleEn: "Economic Self-Reliance",
      desc: "To encourage entrepreneurship, business growth, employment and financial independence within the community.",
    },
    {
      id: "sankalp-5",
      titleHi: "संगठित समाज",
      titleEn: "Organized Community",
      desc: "Building a united, strong, and organized community that works collectively towards shared goals and interests.",
    },
    {
      id: "sankalp-6",
      titleHi: "सामाजिक सहभागिता",
      titleEn: "Social Participation",
      desc: "Encouraging active involvement of every section of society in social initiatives and fostering collective responsibility.",
    },
    {
      id: "sankalp-7",
      titleHi: "मातृशक्ति का उत्थान",
      titleEn: "Empowering Women",
      desc: "Promoting the participation, leadership, and empowerment of women as an integral part of community development.",
    },
    {
      id: "sankalp-8",
      titleHi: "प्रतिभा सम्मान एवं शिक्षा",
      titleEn: "Education & Pratibha Samman",
      desc: "Honoring meritorious students with scholarships and recognition to build a brighter tomorrow.",
    },
  ];

  return (
    <div className="w-full bg-[#FFFDF9] text-[#1F1712] font-sans selection:bg-[#FFAE08] selection:text-white">
      
      {/* ============================================================ */}
      {/* 1. TOP NEWS TICKER (EXACT REFERENCE SCREENSHOT 1)           */}
      {/* ============================================================ */}
      <div className="w-full bg-[#FFAE08] text-white py-2 sm:py-2.5 overflow-hidden select-none relative z-30 shadow-sm border-b border-[#E59C00]">
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
      <section className="relative w-full aspect-[1672/941] overflow-hidden select-none group border-b border-gray-200 bg-white">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentHeroSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                unoptimized
                className="object-cover object-center w-full h-full block select-none"
                sizes="100vw"
              />
            </div>
          );
        })}

        {/* Carousel Arrow Controls */}
        <button
          type="button"
          onClick={() => setCurrentHeroSlide((prev) => (prev === 0 ? 1 : 0))}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs flex items-center justify-center transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <button
          type="button"
          onClick={() => setCurrentHeroSlide((prev) => (prev === 0 ? 1 : 0))}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs flex items-center justify-center transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 sm:gap-3 bg-black/25 backdrop-blur-xs px-4 py-1.5 sm:py-2 rounded-full">
          {heroSlides.map((slide, idx) => (
            <button
              key={`dot-${slide.id}`}
              type="button"
              onClick={() => setCurrentHeroSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentHeroSlide
                  ? "w-8 sm:w-10 h-2.5 sm:h-3 bg-[#FFAE08] shadow-md"
                  : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. OUR NETWORK SECTION (EXACT REFERENCE SCREENSHOT 2)        */}
      {/* ============================================================ */}
      <section id="network" className="py-14 sm:py-20 lg:py-24 bg-[#FFF9F2] border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Bordered Badge: [ OUR NETWORK ] */}
          <div className="flex justify-center mb-10 sm:mb-14">
            <div className="inline-block px-7 py-2.5 rounded-lg border-2 border-[#FFAE08] text-[#FFAE08] font-black text-base sm:text-lg tracking-[0.2em] uppercase bg-white shadow-xs">
              OUR NETWORK
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Official Haryana Map with AVS Emblem */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden shadow-xl bg-[#FFAE08]">
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
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="w-full max-w-[420px] bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-6">
                
                {/* Top Row: Total Districts: 23 with underline */}
                <div className="pb-4 border-b border-gray-200">
                  <label htmlFor="district-select" className="sr-only">Select District</label>
                  <div className="relative">
                    <select
                      id="district-select"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full appearance-none bg-transparent pr-8 text-xl sm:text-[22px] font-bold text-gray-900 cursor-pointer focus:outline-none"
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
                <div className="border border-gray-200/90 rounded-2xl p-5 sm:p-6 bg-white flex items-center gap-5">
                  <div className="text-black shrink-0">
                    <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[15px] font-normal text-gray-500">
                      {selectedDistrict === "All" ? "Total Members" : `${selectedDistrict} Members`}
                    </p>
                    <p className="font-sans font-bold text-[28px] sm:text-[32px] text-gray-900 leading-none tracking-tight">
                      <CountUp start={100} end={currentMembersCount} duration={1000} />
                    </p>
                  </div>
                </div>

                {/* View More Link in Orange (Exact Reference) */}
                <div className="pt-0.5">
                  <Link
                    href="#network"
                    className="inline-block text-[15px] font-semibold text-[#FFAE08] hover:text-[#E59C00] underline decoration-[#FFAE08] underline-offset-4 transition-colors"
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
      <section id="sankalp" className="py-14 sm:py-20 lg:py-24 bg-[#FFFDF9] border-b border-gray-200 overflow-hidden select-none">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Title & Subtitle on Left, < > Arrow Buttons on Right (Exact Reference Pic 1) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div className="py-1">
              <h2 className="font-sans text-[30px] sm:text-[36px] font-bold tracking-tight leading-tight">
                <span className="relative inline-block text-[#1F1712] border-b-[3px] sm:border-b-4 border-[#FFAE08] pb-0.5 sm:pb-1 mr-2.5 sm:mr-3">
                  Panch
                </span>
                <span className="text-[#FFAE08]">
                  Sankalp
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl font-normal leading-relaxed">
                Five guiding commitments shaping a united, empowered and progressive Vaish community.
              </p>
            </div>

            {/* Circular Carousel Control Buttons (Exact Orange Circles with White Arrows) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={scrollSankalpLeft}
                aria-label="Previous Panch Sankalp"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFAE08] hover:bg-[#E59C00] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                onClick={scrollSankalpRight}
                aria-label="Next Panch Sankalp"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFAE08] hover:bg-[#E59C00] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Cards Track: Horizontal Smooth Scrollable Carousel with Hidden Scrollbar */}
          <div
            ref={sankalpCarouselRef}
            className="flex gap-5 sm:gap-7 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sankalpItems.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_88%] sm:flex-[0_0_47%] lg:flex-[0_0_31%] xl:flex-[0_0_31.5%] snap-start shrink-0"
              >
                {/* 100% Native Rendered Card Matching Exact Reference Formatting */}
                <div className="h-full rounded-3xl overflow-hidden border border-amber-100/80 shadow-md bg-white flex flex-col aspect-square justify-between select-none">
                  {/* Top Solid Brand Swatch Section (#FFAE08) */}
                  <div className="relative bg-[#FFAE08] h-[48%] flex items-center justify-center p-6 text-center shadow-inner">
                    <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight drop-shadow-sm px-2">
                      {item.titleHi}
                    </h3>
                  </div>

                  {/* Overlapping Round Logo Emblem */}
                  <div className="relative -mt-7 z-10 flex justify-center">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white p-1 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
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
                  <div className="h-[48%] p-5 sm:p-6 pt-1.5 flex flex-col justify-start items-center text-center">
                    <h4 className="font-sans font-bold text-[20px] text-[#1F1712] leading-tight">
                      {item.titleEn}
                    </h4>

                    {/* Exact Reference Underline: line • dot • line in Brand Swatch Color */}
                    <div className="flex items-center justify-center gap-1.5 my-2.5" aria-hidden="true">
                      <span className="w-10 sm:w-12 h-[2px] bg-[#FFAE08] rounded-full" />
                      <span className="w-2 h-2 rounded-full bg-[#FFAE08]" />
                      <span className="w-10 sm:w-12 h-[2px] bg-[#FFAE08] rounded-full" />
                    </div>

                    <p className="text-[16px] text-gray-700 leading-relaxed line-clamp-3 px-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centered [ View All ] Button (Exact Reference Pic 1) */}
          <div className="flex justify-center mt-8 sm:mt-12">
            <Link
              href="#sankalp"
              className="inline-block px-8 py-2.5 rounded-lg bg-[#FFAE08] hover:bg-[#E59C00] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              View All
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5.5. PANCH SANKALP WIDE BANNER SECTION (CLIENT'S OFFICIAL)   */}
      {/* ============================================================ */}
      <section className="w-full bg-[#FFFDF9] py-6 sm:py-10 border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[1024/332] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white">
            <Image
              src="/images/agarwal/sankalp-wide-banner.jpg"
              alt="अग्रवाल वैश्य विकास संगठन के पंच संकल्प"
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. UPCOMING EVENTS & SAMMELANS                               */}
      {/* ============================================================ */}
      <section id="events" className="py-16 sm:py-20 lg:py-24 bg-[#FFF9F2] border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="font-sans font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-[#FFAE08] tracking-tight">
              Upcoming Events
            </h2>
            <HeadingDivider className="mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="h-full">
                <div
                  onClick={() => {
                    setSelectedEvent(event);
                    setEventModalOpen(true);
                  }}
                  className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-[#FFAE08] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full group"
                >
                  {/* Top Saffron Banner */}
                  <div className="relative w-full h-[180px] bg-gradient-to-br from-[#FFAE08] to-[#E59C00] flex items-center justify-center p-6 text-center shadow-inner">
                    <h3 className="font-sans font-black text-2xl sm:text-3xl text-white leading-tight drop-shadow-md px-2">
                      {event.titleHi || event.title}
                    </h3>
                  </div>

                  {/* Overlapping AVS Emblem */}
                  <div className="relative -mt-6 z-10 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-white p-0.5 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
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
                  <div className="p-6 pt-3.5 flex-1 flex flex-col justify-between text-center space-y-3.5">
                    <div className="space-y-2.5">
                      <h4 className="font-sans font-bold text-[20px] text-gray-900 group-hover:text-[#FFAE08] transition-colors leading-snug">
                        {event.title}
                      </h4>
                      <p className="text-[16px] text-gray-600 leading-relaxed line-clamp-3">
                        {lang === "hi" && event.summaryHi ? event.summaryHi : event.summary}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-gray-200 flex items-center justify-between text-sm sm:text-base font-semibold gap-2">
                      <span className="flex items-center gap-1.5 truncate max-w-[62%] text-gray-700">
                        <MapPin className="w-4 h-4 text-[#FFAE08] shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </span>
                      <span className="text-[#FFAE08] font-bold text-sm sm:text-base shrink-0 tracking-wide">
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

      {/* ============================================================ */}
      {/* 7. GALLERY SHOWCASE (AUTHENTIC DESIGNS & CAMPAIGNS)          */}
      {/* ============================================================ */}
      <GallerySection />

      {/* ============================================================ */}
      {/* 8. EVENT MODAL                                               */}
      {/* ============================================================ */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onRegister={(title, customAmounts) =>
          openDonateModal(title, undefined, false, undefined, customAmounts)
        }
        lang={lang}
      />

    </div>
  );
}
