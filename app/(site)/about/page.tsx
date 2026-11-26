"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import HeadingDivider from "@/components/HeadingDivider";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutPage() {
  const pledgesRef = useRef<HTMLDivElement>(null);
  const scrollPledges = (direction: "left" | "right") => {
    if (pledgesRef.current) {
      const step = pledgesRef.current.clientWidth * 0.85;
      pledgesRef.current.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });
    }
  };

  // 8 Official Logo Meaning Elements from Client (No AI icons)
  const logoElements = [
    {
      id: "logo-1",
      number: "1.",
      title: "उगता हुआ सूरज – नई शुरुआत एवं उज्ज्वल भविष्य",
      desc: "लोगो के ऊपरी हिस्से में उगता हुआ स्वर्णिम सूर्य नई ऊर्जा, आशा, ज्ञान और सकारात्मक परिवर्तन का प्रतीक है। सूर्य की किरणें समाज के उज्ज्वल भविष्य, नई संभावनाओं और निरंतर प्रगति की दिशा को दर्शाती हैं।",
    },
    {
      id: "logo-2",
      number: "2.",
      title: "अक्षर ‘A’ – अग्रवाल समाज की पहचान एवं अग्रणी नेतृत्व",
      desc: "लोगो के केंद्र में बना विशाल अक्षर ‘A’ अग्रवाल समाज की पहचान और अग्रणी नेतृत्व का प्रतीक है। यह समाज को हर क्षेत्र में आगे बढ़ने, नई ऊंचाइयों को छूने और नेतृत्वकारी भूमिका निभाने की प्रेरणा देता है।",
    },
    {
      id: "logo-3",
      number: "3.",
      title: "विकास की ओर बढ़ता ग्राफ – आर्थिक प्रगति एवं आत्मनिर्भरता",
      desc: "लोगो में दर्शाया गया बढ़ता हुआ ग्राफ, स्तंभ और ऊपर की ओर जाती हुई तीर की आकृति आर्थिक उन्नति, व्यापारिक विकास, उद्यमिता और आत्मनिर्भरता का प्रतीक है। यह समाज को आर्थिक रूप से मजबूत बनाने और नए अवसरों का सृजन करने के संकल्प को दर्शाता है।",
    },
    {
      id: "logo-4",
      number: "4.",
      title: "तीन मानव आकृतियां – एकता, युवा शक्ति एवं सामूहिक नेतृत्व",
      desc: "लोगो के मध्य में हाथ उठाए हुए तीन मानव आकृतियां समाज के तीन महत्वपूर्ण स्तंभों – युवा, महिला और समाज की सामूहिक शक्ति – का प्रतिनिधित्व करती हैं। ये आकृतियां एकता, भाईचारे, समान भागीदारी, उत्साह और सामूहिक नेतृत्व का संदेश देती हैं।",
    },
    {
      id: "logo-5",
      number: "5.",
      title: "दोनों ओर की सुनहरी एवं केसरिया लहरें – प्रगति एवं सहयोग",
      desc: "लोगो में मानव आकृतियों के दोनों ओर बनी सुनहरी और केसरिया लहरें निरंतर विकास, ऊर्जा, सकारात्मक सोच और सहयोग की भावना को दर्शाती हैं। ये समाज के विभिन्न वर्गों को एक साथ आगे बढ़ाने के संगठन के प्रयासों का प्रतीक हैं।",
    },
    {
      id: "logo-6",
      number: "6.",
      title: "हाथ मिलाते हुए दो हाथ – विश्वास, सहयोग एवं संगठनात्मक एकता",
      desc: "लोगो के निचले मध्य भाग में दर्शाए गए हाथ मिलाने का प्रतीक आपसी विश्वास, भाईचारे, एकजुटता और सहयोग की भावना को दर्शाता है। यह संदेश देता है कि सामूहिक प्रयास और परस्पर सहयोग से ही बड़े लक्ष्य प्राप्त किए जा सकते हैं।",
    },
    {
      id: "logo-7",
      number: "7.",
      title: "दोनों ओर की लाल आकृतियां – संरक्षण एवं सामूहिक शक्ति",
      desc: "लोगो के निचले हिस्से में दोनों ओर बनी पंखनुमा एवं पत्तियों जैसी आकृतियां संगठन की संरक्षण भावना, सामाजिक सुरक्षा, सेवा, समर्पण और समाज को एक सूत्र में बांधकर रखने की प्रतिबद्धता का प्रतीक हैं।",
    },
    {
      id: "logo-8",
      number: "8.",
      title: "स्वर्णिम एवं गहरा लाल रंग – गौरव, ऊर्जा एवं संकल्प",
      desc: "लोगो में प्रयुक्त स्वर्णिम रंग समृद्धि, सफलता, गौरव और उज्ज्वल भविष्य को दर्शाता है, जबकि गहरा लाल रंग ऊर्जा, साहस, आत्मविश्वास, नेतृत्व और दृढ़ संकल्प का प्रतीक है।",
    },
  ];

  // 5 Official Pledges (Rendered in Official 2nd Pic Card Style with AVS Emblem)
  const fivePledges = [
    {
      num: "01",
      titleHiLine1: "राजनीतिक",
      titleHiLine2: "सशक्तिकरण",
      titleHi: "राजनीतिक सशक्तिकरण",
      titleEn: "Political Empowerment",
      desc: "To strengthen political representation and encourage active participation in decision-making for the community.",
    },
    {
      num: "02",
      titleHiLine1: "नारी स्वावलंबन",
      titleHiLine2: "एवं उद्यमिता",
      titleHi: "नारी स्वावलंबन एवं उद्यमिता",
      titleEn: "Women Empowerment & Entrepreneurship",
      desc: "To promote women's independence, leadership, equal opportunities and entrepreneurship.",
    },
    {
      num: "03",
      titleHiLine1: "युवा नेतृत्व",
      titleHiLine2: "निर्माण",
      titleHi: "युवा नेतृत्व निर्माण",
      titleEn: "Youth Leadership Development",
      desc: "To empower young generations with leadership skills, confidence and opportunities to shape the future.",
    },
    {
      num: "04",
      titleHiLine1: "आर्थिक",
      titleHiLine2: "आत्मनिर्भरता",
      titleHi: "आर्थिक आत्मनिर्भरता",
      titleEn: "Economic Self-Reliance",
      desc: "To encourage entrepreneurship, business growth, employment and financial independence within the community.",
    },
    {
      num: "05",
      titleHiLine1: "संगठित",
      titleHiLine2: "समाज",
      titleHi: "संगठित समाज",
      titleEn: "Organised Society",
      desc: "To unite the community through mutual cooperation, collective strength and a shared vision for progress.",
    },
  ];

  return (
    <div className="w-full bg-[#FFF9F2] text-[#000000] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">

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
                <span>संगठन • नेतृत्व • स्वावलंबन • विकास — एकता हमारी शक्ति, विकास हमारा संकल्प</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>1 नवंबर 2026 : ऐतिहासिक नगरी कैथल से अग्रवाल वैश्य विकास संगठन की स्थापना</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>संस्थापक अध्यक्ष श्री रामप्रताप गुप्ता के नेतृत्व में संगठित एवं सशक्त समाज</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>वैश्य समाज का एक ही नारा, राजनीति में हो प्रतिनिधित्व हमारा</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. HERO HEADER: OUR IDENTITY                                 */}
      {/* ============================================================ */}
      <section className="pt-10 sm:pt-14 pb-2 sm:pb-3 bg-[#FFF9F2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            About Us
          </h1>
          <HeadingDivider className="mt-3.5" />
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 mt-3 sm:mt-6">

        {/* ============================================================ */}
        {/* 3. SECTION 1: हमारी स्थापना एवं परिचय (INTRODUCTION)          */}
        {/* ============================================================ */}
        <section id="intro" className="scroll-mt-24">
          <div className="bg-white rounded-none border border-[#E8DFD3] p-6 sm:p-10 lg:p-12 space-y-6">

            {/* Section Heading (No font size switcher, clean design) */}
            <div className="border-b border-[#E8DFD3] pb-4">
              <span className="text-xs sm:text-sm font-bold text-[#7F160C] tracking-wider uppercase block">
                स्थापना • 1 नवंबर 2026 • कैथल (हरियाणा)
              </span>
              <h2 className="font-sans text-lg md:text-xl font-medium text-black mt-1">
                हमारी स्थापना एवं परिचय
              </h2>
            </div>

            {/* Sub-tagline */}
            <p className="font-sans text-lg md:text-xl font-medium text-[#7F160C]">
              “एकता हमारी शक्ति, विकास हमारा संकल्प।”
            </p>

            {/* Body Text (Exact DevTools Spec: text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90) */}
            <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
              <p>
                भारत के सामाजिक, आर्थिक, सांस्कृतिक एवं राष्ट्रीय विकास में अग्रवाल वैश्य समाज का सदैव महत्वपूर्ण योगदान रहा है। सेवा, सहयोग, उद्यमिता, परोपकार और राष्ट्र निर्माण की भावना वैश्य समाज की गौरवशाली पहचान रही है।
              </p>

              <div className="p-4 sm:p-5 rounded-none bg-[#FFF9F2] border-l-4 border-[#7F160C]">
                <p className="font-medium text-black">
                  इसी गौरवशाली विरासत को आगे बढ़ाने, समाज को संगठित करने तथा बदलते सामाजिक, आर्थिक और राजनीतिक परिवेश में वैश्य समाज को एक नई दिशा एवं सशक्त पहचान दिलाने के उद्देश्य से <strong>अग्रवाल वैश्य विकास संगठन</strong> की स्थापना <strong>1 नवंबर 2026</strong> को ऐतिहासिक नगरी <strong>कैथल (हरियाणा)</strong> से संस्थापक <strong>श्री रामप्रताप गुप्ता</strong> द्वारा की गई।
                </p>
              </div>

              <p>
                संगठन की स्थापना का मूल विचार समाज को केवल एक समुदाय के रूप में नहीं, बल्कि एक संगठित, जागरूक, आत्मनिर्भर और नेतृत्व करने वाली शक्ति के रूप में विकसित करना है।
              </p>

              <p>
                हमारा मानना है कि किसी भी समाज की वास्तविक उन्नति तभी संभव है, जब उसके युवा नेतृत्व की भूमिका निभाएं, महिलाएं आर्थिक एवं सामाजिक रूप से सशक्त बनें, समाज के प्रत्येक वर्ग को समान अवसर प्राप्त हों और सामूहिक शक्ति के माध्यम से विकास के नए आयाम स्थापित किए जाएं।
              </p>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. SECTION 2: हमारा उद्देश्य एवं विजन (MISSION & VISION)       */}
        {/* ============================================================ */}
        <section id="mission-vision" className="scroll-mt-24">
          <div className="bg-white rounded-none border border-[#E8DFD3] p-6 sm:p-10 lg:p-12 space-y-8">

            {/* Section Heading */}
            <div>
              <h2 className="font-sans text-lg md:text-xl font-medium text-black">
                हमारा उद्देश्य एवं संकल्प (Our Mission & Vision)
              </h2>
            </div>

            {/* Mission */}
            <div className="space-y-3">
              <h3 className="font-sans text-lg md:text-xl font-medium text-[#7F160C]">
                हमारा उद्देश्य (Our Mission)
              </h3>
              <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
                <p>
                  अग्रवाल वैश्य विकास संगठन का प्रमुख उद्देश्य हरियाणा सहित देशभर के अग्रवाल वैश्य समाज को एक मजबूत संगठनात्मक मंच प्रदान करना तथा सामाजिक, राजनीतिक, आर्थिक एवं शैक्षणिक क्षेत्र में उसकी सक्रिय भागीदारी सुनिश्चित करने की दिशा में कार्य करना है।
                </p>
                <p>
                  हम समाज के युवाओं को नेतृत्व के लिए तैयार करने, महिलाओं को आत्मनिर्भर एवं उद्यमशील बनाने, प्रतिभाशाली विद्यार्थियों को प्रोत्साहित करने, सामाजिक सहयोग की भावना को मजबूत करने तथा समाज की सामूहिक शक्ति को सकारात्मक दिशा देने के लिए प्रतिबद्ध हैं।
                </p>
                <p>
                  हमारा प्रयास है कि समाज का प्रत्येक व्यक्ति अपनी क्षमता को पहचाने, अपने अधिकारों एवं कर्तव्यों के प्रति जागरूक बने और समाज तथा राष्ट्र के विकास में सक्रिय योगदान दे।
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
              <h3 className="font-sans text-lg md:text-xl font-medium text-[#7F160C]">
                हमारा संकल्प (Our Vision)
              </h3>
              <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
                <p>
                  हम एक ऐसे सशक्त, संगठित और आत्मनिर्भर वैश्य समाज की परिकल्पना करते हैं, जो अपनी गौरवशाली विरासत को संरक्षित रखते हुए आधुनिक भारत के निर्माण में अग्रणी भूमिका निभाए।
                </p>
                <p>
                  हमारा लक्ष्य है कि समाज का प्रत्येक युवा नेतृत्वकर्ता बने, प्रत्येक महिला आत्मनिर्भर बने, प्रत्येक परिवार आर्थिक रूप से सशक्त बने और समाज का प्रत्येक व्यक्ति संगठन की सामूहिक शक्ति से जुड़कर प्रगति की नई ऊंचाइयों को प्राप्त करे।
                </p>
                <p className="font-medium text-[#7F160C] text-lg md:text-xl pt-1">
                  हमारा विश्वास है – संगठित समाज ही सशक्त समाज है और सशक्त समाज ही विकसित राष्ट्र की आधारशिला है।
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. SECTION 3: PANCH SANKALP (EXACT PIC 2 REFERENCE FORMAT)    */}
        {/* ============================================================ */}
        <section id="pledges" className="scroll-mt-24 space-y-6 sm:space-y-8">
          {/* Header: Title on Left, Guiding Subtitle (Exact Pic 2 Layout), Mobile Carousel Arrows */}
          <div className="flex items-end justify-between gap-4">
            <div className="text-left space-y-2">
              <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[34px] tracking-tight leading-tight">
                <span className="text-[#000000] border-b-2 border-[#7F160C] pb-1 mr-2">Panch</span>
                <span className="text-[#7F160C]">Sankalp</span>
              </h2>
              <p className="font-sans text-sm sm:text-[15px] font-medium text-gray-600">
                Five guiding commitments shaping a united, empowered and progressive Vaish community.
              </p>
            </div>

            {/* Mobile Carousel Controls (< >) */}
            <div className="flex md:hidden items-center gap-2 shrink-0 pb-1">
              <button
                type="button"
                onClick={() => scrollPledges("left")}
                aria-label="Previous Sankalp"
                className="w-8 h-8 rounded-full bg-[#7F160C] hover:bg-[#69120A] text-white flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => scrollPledges("right")}
                aria-label="Next Sankalp"
                className="w-8 h-8 rounded-full bg-[#7F160C] hover:bg-[#69120A] text-white flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Cards Track: Mobile Horizontal Carousel / Desktop 3-col Grid */}
          <div
            ref={pledgesRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {fivePledges.map((pledge) => (
              <div
                key={pledge.num}
                className="w-[85vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 snap-center rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-100/80 shadow-md bg-white flex flex-col justify-between select-none"
              >
                {/* Top Solid Brand Swatch Section (#7F160C to #FFAE07 Gradient) */}
                <div className="relative bg-sankalp-gradient h-60 sm:h-68 md:h-76 min-h-[240px] sm:min-h-[270px] flex items-center justify-center p-3 sm:p-5 text-center shadow-inner overflow-hidden">
                  <h3 
                    className="font-sankalp-title text-[54px] text-white leading-[1.08] drop-shadow-md px-1 sm:px-2 tracking-tight text-center flex flex-col items-center justify-center"
                    style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 800 }}
                  >
                    <span className="block">{pledge.titleHiLine1}</span>
                    <span className="block mt-1 sm:mt-2">{pledge.titleHiLine2}</span>
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
                <div className="p-5 sm:p-6 pt-2 sm:pt-3 flex flex-col justify-start items-center text-center">
                  <h4 className="font-sans font-medium text-base sm:text-lg text-black leading-tight">
                    {pledge.titleEn}
                  </h4>

                  {/* Line-dot-line in Brand Swatch Color */}
                  <div className="flex items-center justify-center gap-1.5 my-2.5 sm:my-3" aria-hidden="true">
                    <span className="w-8 sm:w-12 h-[2px] bg-[#7F160C] rounded-full" />
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#7F160C]" />
                    <span className="w-8 sm:w-12 h-[2px] bg-[#7F160C] rounded-full" />
                  </div>

                  <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed font-normal px-1 text-center font-sans">
                    {pledge.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* 6th Card: Slogan Banner Card in exact same size/proportions */}
            <div className="w-[85vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 snap-center rounded-2xl sm:rounded-3xl overflow-hidden border border-[#69120A] shadow-md bg-gradient-to-br from-[#7F160C] to-[#69120A] text-white flex flex-col justify-between p-6 sm:p-8 select-none text-center">
              <div className="space-y-4 my-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-200 block">
                  हमारा मूल मंत्र
                </span>
                <h3 className="font-sans font-medium text-lg md:text-xl text-white leading-snug">
                  संगठन से शक्ति, नेतृत्व से पहचान, स्वावलंबन से विकास।
                </h3>
                <div className="flex items-center justify-center gap-1.5 my-2" aria-hidden="true">
                  <span className="w-8 h-[2px] bg-amber-300 rounded-full" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                  <span className="w-8 h-[2px] bg-amber-300 rounded-full" />
                </div>
                <p className="text-sm md:text-base font-medium leading-7 md:leading-8 text-amber-100/90 font-sans">
                  आइए, मिलकर एक ऐसे समाज का निर्माण करें जिस पर आने वाली पीढ़ियां गर्व कर सकें।
                </p>
              </div>

              <div className="pt-4 border-t border-white/20">
                <Link
                  href="/membership"
                  className="inline-block px-5 py-2 rounded-lg bg-white text-[#7F160C] font-bold text-xs uppercase tracking-wider hover:bg-amber-50 transition-colors shadow-xs"
                >
                  संगठन से जुड़ें
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. SECTION 4: हमारे संगठन के लोगो का अर्थ (MEANING OF LOGO)    */}
        {/* ============================================================ */}
        <section id="logo-meaning" className="scroll-mt-24">
          <div className="bg-white rounded-none border border-[#E8DFD3] p-6 sm:p-10 lg:p-12 space-y-8">

            <div className="border-b border-[#E8DFD3] pb-4">
              <span className="text-xs sm:text-sm font-bold text-[#7F160C] uppercase tracking-wider block">
                OUR EMBLEM
              </span>
              <h2 className="font-sans text-lg md:text-xl font-medium text-black mt-1">
                हमारे संगठन के लोगो का अर्थ (Meaning of Our Logo)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

              {/* Logo Display */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  <Image
                    src="/images/agarwal/logo.png"
                    alt="AVVS Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-sm font-medium text-[#7F160C] text-center mt-3">
                  अग्रवाल वैश्य विकास संगठन (आधिकारिक लोगो)
                </p>
              </div>

              {/* Logo Lead description */}
              <div className="md:col-span-8 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
                <p>
                  अग्रवाल वैश्य विकास संगठन का लोगो केवल एक पहचान चिह्न नहीं, बल्कि संगठन की विचारधारा, उद्देश्य, एकता, नेतृत्व, आत्मनिर्भरता और विकास के संकल्प का प्रतीक है। लोगो में सम्मिलित प्रत्येक आकृति एक विशेष संदेश देती है।
                </p>
              </div>
            </div>

            {/* 8 Numbered Points (Clean typography, no AI icons) */}
            <div className="space-y-4 pt-4 border-t border-[#E8DFD3]">
              {logoElements.map((el) => (
                <div key={el.id} className="space-y-1.5 border-b border-gray-100 pb-4 last:border-b-0">
                  <h3 className="font-sans text-lg md:text-xl font-medium text-[#7F160C]">
                    {el.number} {el.title}
                  </h3>
                  <p className="text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
                    {el.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Overall Meaning */}
            <div className="pt-6 border-t border-[#E8DFD3] space-y-4">
              <h3 className="font-sans text-lg md:text-xl font-medium text-black">
                संपूर्ण लोगो का संदेश (Overall Meaning of the Logo)
              </h3>

              <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
                <p>
                  अग्रवाल वैश्य विकास संगठन का संपूर्ण लोगो समाज की गौरवशाली पहचान, संगठनात्मक एकता, सशक्त नेतृत्व, आर्थिक आत्मनिर्भरता और सर्वांगीण विकास की सामूहिक परिकल्पना को प्रस्तुत करता है।
                </p>

                <p>
                  इसमें उगता हुआ सूरज नए युग की शुरुआत का संदेश देता है, अक्षर ‘A’ अग्रवाल समाज की पहचान एवं नेतृत्व को दर्शाता है, विकास का ग्राफ आर्थिक उन्नति का प्रतीक है, तीन मानव आकृतियां सामूहिक शक्ति एवं सहभागिता को दर्शाती हैं और हाथ मिलाने का प्रतीक आपसी विश्वास एवं संगठन की मजबूती को प्रदर्शित करता है।
                </p>

                <p>
                  लोगो का मूल संदेश है कि जब समाज संगठित होगा, युवा नेतृत्व करेंगे, महिलाएं आत्मनिर्भर बनेंगी और प्रत्येक व्यक्ति विकास की यात्रा में सहभागी बनेगा, तभी एक सशक्त एवं समृद्ध समाज का निर्माण संभव होगा।
                </p>

                <p>
                  अग्रवाल वैश्य विकास संगठन का यह लोगो केवल एक प्रतीक नहीं, बल्कि एक विचार, एक पहचान और समाज के उज्ज्वल भविष्य का संकल्प है।
                </p>

                <p className="font-sans text-lg md:text-xl font-medium text-[#7F160C] pt-1">
                  आइए, मिलकर एक नया इतिहास बनाएं! संगठन से शक्ति, नेतृत्व से पहचान और स्वावलंबन से विकास।
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
