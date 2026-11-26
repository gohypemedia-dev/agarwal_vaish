import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HeadingDivider from "@/components/HeadingDivider";

export const metadata: Metadata = {
  title: "Panch Sankalp (पाँच संकल्प) | Aggarwal Vaish Vikas Sangathan",
  description: "Five guiding commitments shaping a united, empowered and progressive Vaish community — Aggarwal Vaish Vikas Sangathan Haryana.",
};

const sankalps = [
  {
    num: "01",
    id: "political-empowerment",
    titleHiLine1: "राजनीतिक",
    titleHiLine2: "सशक्तिकरण",
    titleHi: "राजनीतिक सशक्तिकरण",
    titleEn: "Political Empowerment",
    desc: "To strengthen political representation and encourage active participation in decision-making for the community.",
  },
  {
    num: "02",
    id: "women-empowerment",
    titleHiLine1: "नारी स्वावलंबन",
    titleHiLine2: "एवं उद्यमिता",
    titleHi: "नारी स्वावलंबन एवं उद्यमिता",
    titleEn: "Women Empowerment & Entrepreneurship",
    desc: "To promote women's independence, leadership, equal opportunities and entrepreneurship.",
  },
  {
    num: "03",
    id: "youth-leadership",
    titleHiLine1: "युवा नेतृत्व",
    titleHiLine2: "निर्माण",
    titleHi: "युवा नेतृत्व निर्माण",
    titleEn: "Youth Leadership Development",
    desc: "To empower young generations with leadership skills, confidence and opportunities to shape the future.",
  },
  {
    num: "04",
    id: "economic-self-reliance",
    titleHiLine1: "आर्थिक",
    titleHiLine2: "आत्मनिर्भरता",
    titleHi: "आर्थिक आत्मनिर्भरता",
    titleEn: "Economic Self-Reliance",
    desc: "To encourage entrepreneurship, business growth, employment and financial independence within the community.",
  },
  {
    num: "05",
    id: "organised-society",
    titleHiLine1: "संगठित",
    titleHiLine2: "समाज",
    titleHi: "संगठित समाज",
    titleEn: "Organised Society",
    desc: "To unite the community through mutual cooperation, collective strength and a shared vision for progress.",
  },
];

export default function PanchSankalpPage() {
  return (
    <div className="w-full min-h-screen bg-[#FFF9F2] text-[#2B201A] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">

      {/* ============================================================ */}
      {/* 1. TOP NEWS TICKER (BRAND MAROON #7F160C)                    */}
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
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>अग्रवाल वैश्य विकास संगठन — पंच संकल्प (Panch Sankalp)</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>संगठन से शक्ति, नेतृत्व से पहचान, स्वावलंबन से विकास</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>राजनीतिक सशक्तिकरण • नारी स्वावलंबन • युवा नेतृत्व • आर्थिक आत्मनिर्भरता • संगठित समाज</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. PAGE HEADER (EXACT PIC 2 REFERENCE FORMAT)                */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Section Heading: Exact Reference Pic 2 Layout */}
        <div className="text-left border-b border-[#E8DFD3] pb-6 sm:pb-8">
          <div className="inline-block relative">
            <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-[42px] tracking-tight leading-tight text-gray-900">
              <span>Panch </span>
              <span className="text-[#7F160C]">Sankalp</span>
            </h1>
            {/* Underline accent below 'Panch' (Exact Pic 2 Reference) */}
            <div className="w-16 sm:w-20 h-[3px] bg-[#7F160C] rounded-full mt-1.5" />
          </div>
          <p className="text-sm sm:text-base font-medium text-gray-600 mt-2 max-w-3xl leading-relaxed">
            Five guiding commitments shaping a united, empowered and progressive Vaish community.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. CARDS GRID: EXACT PIC 2 REFERENCE FORMAT (MOBILE HORIZONTAL) */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div 
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 snap-x snap-mandatory scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {sankalps.map((pledge) => (
            <div
              key={pledge.num}
              id={pledge.id}
              className="w-[85vw] max-w-[320px] sm:w-auto sm:max-w-none shrink-0 snap-center rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DFD3] shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col justify-between select-none"
            >
              {/* Top Solid Brand Swatch (#7F160C to #FFAE07 Gradient) */}
              <div className="relative bg-sankalp-gradient h-60 sm:h-68 md:h-76 min-h-[240px] sm:min-h-[270px] flex flex-col items-center justify-center p-3 sm:p-5 text-center shadow-inner overflow-hidden">
                <h3 
                  className="font-sankalp-title text-[54px] text-white leading-[1.08] drop-shadow-md px-1 sm:px-2 tracking-tight text-center flex flex-col items-center justify-center"
                  style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 800 }}
                >
                  <span className="block">{pledge.titleHiLine1}</span>
                  <span className="block mt-1 sm:mt-2">{pledge.titleHiLine2}</span>
                </h3>
              </div>

              {/* Overlapping Round Logo Emblem with AVVS Logo */}
              <div className="relative -mt-7 sm:-mt-8 z-10 flex justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/agarwal/logo.png"
                    alt="AVVS Logo"
                    width={52}
                    height={52}
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
              </div>

              {/* Bottom White Section */}
              <div className="p-5 sm:p-6 pt-3 sm:pt-4 pb-6 sm:pb-8 flex-1 flex flex-col justify-start items-center text-center">
                {/* English Title */}
                <h4 className="font-sans font-bold text-lg sm:text-xl text-gray-900 leading-tight">
                  {pledge.titleEn}
                </h4>

                {/* Brand line-dot-line in #7F160C */}
                <div className="flex items-center justify-center gap-1.5 my-3" aria-hidden="true">
                  <span className="w-10 sm:w-14 h-[2px] bg-[#7F160C] rounded-full" />
                  <span className="w-2 h-2 rounded-full bg-[#7F160C]" />
                  <span className="w-10 sm:w-14 h-[2px] bg-[#7F160C] rounded-full" />
                </div>

                {/* English Summary Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans px-1">
                  {pledge.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. CALL TO ACTION: संगठन से जुड़ें / JOIN THE CAMPAIGN       */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#7F160C] via-[#6B1209] to-[#7F160C] p-8 sm:p-12 text-white shadow-xl text-center relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

          <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-200 uppercase block mb-2">
            हमारा मूल मंत्र
          </span>

          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-3">
            संगठन से शक्ति, नेतृत्व से पहचान, स्वावलंबन से विकास।
          </h2>

          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            आइए, पंच संकल्प अभियान से जुड़कर एक सशक्त, जागरूक और आत्मनिर्भर अग्रवाल वैश्य समाज के निर्माण में अपनी सक्रिय सहभागिता निभाएं।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/membership"
              className="px-7 py-3 rounded-lg bg-white text-[#7F160C] hover:bg-amber-50 font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              संगठन से जुड़ें (Join Membership)
            </Link>

            <Link
              href="/mission-and-vision"
              className="px-7 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/30 tracking-wide transition-all duration-200"
            >
              हमारा विजन एवं उद्देश्य
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
