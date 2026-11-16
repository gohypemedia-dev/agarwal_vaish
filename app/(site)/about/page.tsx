"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  TextReveal,
  ParagraphReveal,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  ParallaxSection,
  ParallaxImage,
} from "@/components/animation";
import HeadingDivider from "@/components/HeadingDivider";


export default function AboutPage() {
  const { lang, openDonateModal } = useApp();

  const commitmentCards = [
    {
      id: "social-participation",
      title: "Social Participation",
      titleHi: "सामाजिक सहभागिता",
      badge: "PANCH SANKALP I",
      badgeHi: "पंच संकल्प १",
      desc: "Uniting families and fostering collective social responsibility, ensuring every section of the community actively participates in societal progress.",
      descHi: "समाज के प्रत्येक वर्ग को संगठित करना, सामूहिक सामाजिक उत्तरदायित्व को बढ़ावा देना और आपसी सहयोग से समाज को सशक्त बनाना।",
      image: "/images/agarwal/design-1.jpg",
      points: [
        { en: "Community cohesion & grassroots outreach", hi: "सामुदायिक एकजुटता एवं जमीनी स्तर पर संपर्क" },
        { en: "Social welfare drives & public assistance", hi: "सामाजिक जनकल्याणकारी अभियान एवं सहायता" },
        { en: "District-level coordination across Haryana", hi: "हरियाणा के सभी जिलों में समन्वित संगठनात्मक कार्य" },
      ],
    },
    {
      id: "womens-empowerment",
      title: "Women’s Empowerment",
      titleHi: "महिला सशक्तिकरण",
      badge: "PANCH SANKALP II",
      badgeHi: "पंच संकल्प २",
      desc: "Equipping women with leadership roles, entrepreneurship avenues, and educational mentorship to ensure self-reliance and dignity.",
      descHi: "मातृशक्ति को नेतृत्वकारी भूमिका, उद्यमशीलता के अवसर और शिक्षा संवर्धन प्रदान कर स्वावलंबी व आत्मनिर्भर बनाना।",
      image: "/images/agarwal/design-2.jpg",
      points: [
        { en: "State Mahila Wing & local units", hi: "राज्यस्तरीय महिला इकाई एवं स्थानीय प्रकोष्ठ" },
        { en: "Support for women entrepreneurs & artisans", hi: "महिला उद्यमियों व स्वरोजगार को प्रोत्साहन" },
        { en: "Pratibha Samman & meritorious student felicitations", hi: "प्रतिभा सम्मान एवं मेधावी बालिकाओं का सम्मान" },
      ],
    },
    {
      id: "youth-leadership",
      title: "Youth Leadership",
      titleHi: "युवा नेतृत्व",
      badge: "PANCH SANKALP III",
      badgeHi: "पंच संकल्प ३",
      desc: "Nurturing the younger generation with career guidance, business networking, and leadership forums to shape the future of society.",
      descHi: "युवाओं को करियर मार्गदर्शन, व्यावसायिक नेटवर्क और नेतृत्व मंच प्रदान करना ताकि वे समाज व राष्ट्र निर्माण में अग्रणी भूमिका निभा सकें।",
      image: "/images/agarwal/design-6.jpg",
      points: [
        { en: "Yuva Wing conventions & business conclaves", hi: "युवा प्रकोष्ठ महासम्मेलन एवं व्यापार कॉन्क्लेव" },
        { en: "Entrepreneurship mentorship & startup guidance", hi: "स्टार्टअप मार्गदर्शन एवं उद्यमशीलता परामर्श" },
        { en: "Social advocacy and youth mobilization", hi: "सामाजिक जागरूकता एवं युवा शक्ति का सदुपयोग" },
      ],
    },
    {
      id: "political-participation",
      title: "Political Participation",
      titleHi: "राजनीतिक सहभागिता",
      badge: "PANCH SANKALP IV",
      badgeHi: "पंच संकल्प ४",
      desc: "Enhancing democratic consciousness and representation for the Vaish community to ensure its legitimate voice in policy and public life.",
      descHi: "लोकतांत्रिक प्रक्रियाओं में वैश्य समाज की सक्रिय सहभागिता सुनिश्चित करना तथा नीतिगत निर्णयों में समाज के प्रतिनिधित्व को सशक्त बनाना।",
      image: "/images/agarwal/design-4.jpg",
      points: [
        { en: "Democratic awareness and voter mobilization", hi: "लोकतांत्रिक जागरूकता एवं मतदाता सहभागिता" },
        { en: "Promoting community leadership in civic life", hi: "सार्वजनिक जीवन में समाज के योग्य नेतृत्व को प्रोत्साहन" },
        { en: "Statewide seminars on public representation", hi: "सार्थक प्रतिनिधित्व पर राज्यस्तरीय विचार गोष्ठियाँ" },
      ],
    },
    {
      id: "organized-community",
      title: "Organized Community",
      titleHi: "संगठित समाज",
      badge: "PANCH SANKALP V",
      badgeHi: "पंच संकल्प ५",
      desc: "Building a unified and disciplined community network rooted in the timeless philosophy of Maharaja Agrasen: One Brick, One Coin.",
      descHi: "महाराजा अग्रसेन जी के समाजवाद के अमर सिद्धांत 'एक ईंट, एक रुपया' के आधार पर संगठित, अनुशासित व समर्थ समाज का निर्माण।",
      image: "/images/agarwal/design-3.jpg",
      points: [
        { en: "Maharaja Agrasen Jayanti celebrations across Haryana", hi: "हरियाणा भर में भव्य महाराजा अग्रसेन जयंती महोत्सव" },
        { en: "Mutual assistance and economic solidarity", hi: "परस्पर सहयोग एवं आर्थिक संबल की परंपरा" },
        { en: "Digital membership portal & district network", hi: "डिजिटल सदस्यता पोर्टल एवं जिलावार संपर्क सूत्र" },
      ],
    },
  ];

  return (
    <div className="w-full space-y-0 text-[#2B201A] font-sans">
      {/* 1. HERO SECTION - RECREATED FROM REFERENCE (PANORAMIC ON DESKTOP, 100VH ON MOBILE & LAPTOP) */}
      <section className="relative overflow-hidden bg-[#1F150E] md:bg-[#F7EDE1] border-b border-[#E7D8C8] min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-74px)] min-[1000px]:min-h-[calc(100vh-76px)] xl:min-h-[calc(100vh-82px)] md:flex md:items-center">
        {/* Desktop Panoramic Background Banner (hidden on mobile) */}
        <ParallaxImage offset={45} className="hidden md:block absolute inset-0 z-0">
          <Image
            src="/images/about-hero-banner.png"
            alt="Rooted in Wisdom. Driven by Service."
            fill
            priority
            sizes="100vw"
            className="object-cover object-right lg:object-center"
          />
          {/* Clean feathered mask: completely masks baked-in text on the left while seamlessly revealing Lord Krishna on the right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #F7EDE1 0%, #F7EDE1 52%, rgba(247,237,225,0.98) 55%, rgba(247,237,225,0.85) 59%, rgba(247,237,225,0.45) 64%, rgba(247,237,225,0.12) 68%, rgba(247,237,225,0) 72%)",
            }}
          />
        </ParallaxImage>

        {/* MOBILE HERO (100VH Full Viewport Height with Bottom Overlay) */}
        <div className="md:hidden relative z-1 w-full h-[calc(100vh-68px)] min-h-[540px] flex items-center justify-center overflow-hidden">
          <ParallaxImage offset={30} className="absolute inset-0 w-full h-full">
            <Image
              src="/images/about-mobile-hero.png"
              alt="Lord Krishna and Children - Rooted in Wisdom. Driven by Service."
              fill
              priority
              sizes="100vw"
              className="w-full h-full object-cover object-top block select-none pointer-events-none"
            />
          </ParallaxImage>

          {/* Mobile Overlay Action Bar */}
          <div className="absolute bottom-0 inset-x-0 z-20 w-full px-4 pt-16 pb-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col items-center gap-2 text-center pointer-events-auto">
            <TextReveal as="h2" className="font-editorial text-sm sm:text-base font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
              {lang === "hi" ? "ज्ञान में निष्ठा • सेवा में समर्पण" : "Rooted in Wisdom • Driven by Service"}
            </TextReveal>
            <div className="flex items-center justify-center gap-2.5 w-full max-w-xs pt-1">
              <a
                href="#about-story"
                className="flex-1 py-2 px-3 rounded-lg bg-[#E86F1D] text-white font-bold text-xs uppercase tracking-wider text-center shadow-md active:scale-95 transition-transform"
              >
                {lang === "hi" ? "ट्रस्ट परिचय" : "Our Story"}
              </a>
              <button
                onClick={() => openDonateModal()}
                className="flex-1 py-2 px-3 rounded-lg bg-white text-[#2B201A] font-bold text-xs uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-transform"
              >
                <Heart className="w-3 h-3 text-[#E86F1D] fill-current" />
                <span>{lang === "hi" ? "सहयोग करें" : "Support"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Hero Content (hidden on mobile) */}
        <div className="hidden md:block relative z-10 page-container py-8 sm:py-12 md:py-24 w-full">
          <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-5">
            {/* Main Title matching reference */}
            <TextReveal as="h1" className="font-editorial text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F1712] leading-[1.12] tracking-tight">
              {lang === "hi" ? (
                <>
                  ज्ञान में निष्ठा।
                  <br />
                  <span className="text-[#E86F1D]">सेवा में समर्पण।</span>
                </>
              ) : (
                <>
                  Rooted in Wisdom.
                  <br />
                  <span className="text-[#E86F1D]">Driven by Service.</span>
                </>
              )}
            </TextReveal>

            {/* Subtitle matching exact reference text */}
            <ParagraphReveal className="text-sm sm:text-base md:text-lg text-[#3E3129] leading-relaxed font-sans font-medium">
              {lang === "hi"
                ? "अग्रवाल वैश्य समाज (AVS Haryana) समाज को संगठित करने, महिला सशक्तिकरण, युवा नेतृत्व और जनसेवा के पंच संकल्प के प्रति समर्पित एक अग्रणी सामाजिक संगठन है।"
                : "Aggarwal Vaish Samaj (AVS Haryana) is dedicated to uniting the community, empowering youth & women, and advancing public service under the sacred Panch Sankalp."}
            </ParagraphReveal>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-4">
              <a
                href="#about-story"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl bg-[#E86F1D] hover:bg-[#D25E12] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>{lang === "hi" ? "हमारा परिचय एवं इतिहास" : "Our Story & Journey"}</span>
              </a>
              <button
                type="button"
                onClick={() => openDonateModal()}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl bg-white/80 hover:bg-white text-[#2B201A] font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#E7D8C8] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>{lang === "hi" ? "समाज सेवा में सहयोग करें" : "Support Our Mission"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTHENTIC NARRATIVE: "ABOUT US" & "OUR MISSION" */}
      <SectionReveal className="py-16 sm:py-20 lg:py-24 bg-[#FBF6EE]" id="about-story">
        <div className="page-container max-w-5xl lg:max-w-6xl space-y-12 sm:space-y-16">
          {/* ABOUT US BLOCK */}
          <div className="space-y-4 sm:space-y-5 text-center sm:text-left">
            <TextReveal as="h2" className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#E86F1D] leading-tight">
              {lang === "hi"
                ? "महाराजा अग्रसेन जी के आदर्शों पर आधारित संगठित समाज"
                : "Rooted in the Ideals of Maharaja Agrasen, Dedicated to Community"}
            </TextReveal>
            <HeadingDivider align="left" className="!py-0.5 max-sm:justify-center" />

            <ParagraphReveal className="text-sm sm:text-base md:text-lg text-[#3E3129] leading-relaxed space-y-4 pt-1 font-normal">
              <p>
                {lang === "hi" ? (
                  <>
                    <strong>अग्रवाल वैश्य समाज (AVS Haryana)</strong> का गठन <strong>श्री अशोक बुवानीवाला जी</strong> के कुशल नेतृत्व में समाज के सभी वर्गों को एक सूत्र में पिरोने और उनके स्वाभिमान, सामाजिक प्रतिष्ठा व राजनीतिक सहभागिता को सुदृढ़ करने के उद्देश्य से किया गया था।
                  </>
                ) : (
                  <>
                    <strong>Aggarwal Vaish Samaj (AVS Haryana)</strong> was established under the visionary leadership of <strong>Shri Ashok Buwaniwala</strong> with a clear mandate: uniting every section of our community and strengthening socio-political representation and welfare.
                  </>
                )}
              </p>
              <p>
                {lang === "hi" ? (
                  <>
                    संगठन महाराजा अग्रसेन जी के समाजवाद के पावन संदेश 'एक ईंट, एक रुपया' से प्रेरणा प्राप्त करता है। यह भावना हमारे <strong>पंच संकल्प</strong> का मूल आधार है: <strong>सामाजिक सहभागिता, महिला सशक्तिकरण, युवा नेतृत्व, राजनीतिक सहभागिता और संगठित समाज।</strong>
                  </>
                ) : (
                  <>
                    The organization draws its core inspiration from Maharaja Agrasen’s egalitarian principle of mutual help. This foundation powers our <strong>Panch Sankalp</strong>: <strong>Social Participation, Women Empowerment, Youth Leadership, Political Participation, and an Organized Community.</strong>
                  </>
                )}
              </p>
            </ParagraphReveal>
          </div>

          {/* OUR MISSION BLOCK */}
          <div className="space-y-4 sm:space-y-5 text-center sm:text-left">
            <TextReveal as="h2" className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#E86F1D] leading-tight">
              {lang === "hi"
                ? "आंतरिक सामर्थ्य और व्यावहारिक अवसरों का संगम"
                : "Real Empowerment When Inner Strength Meets Real Opportunity"}
            </TextReveal>
            <HeadingDivider align="left" className="!py-0.5 max-sm:justify-center" />

            <ParagraphReveal className="text-sm sm:text-base md:text-lg text-[#3E3129] leading-relaxed space-y-4 pt-1 font-normal">
              <p>
                {lang === "hi" ? (
                  <>
                    हमारी यात्रा एक केंद्रित उद्देश्य के साथ आरंभ हुई: विद्यालयों व सामुदायिक कार्यक्रमों के माध्यम से नन्हे बच्चों को श्रीमद्भगवद्गीता की शिक्षाओं से जोड़ना और आजीवन मानसिक शांति व एकाग्रता के साधन के रूप में ध्यान का परिचय देना।
                  </>
                ) : (
                  <>
                    We began with a focused mission: bringing the teachings of the Bhagavad Gita to young children through schools and community programs and introducing them to meditation as a tool for lifelong wellness and clarity of mind.
                  </>
                )}
              </p>
              <p>
                {lang === "hi" ? (
                  <>
                    समय के साथ, हमारा सेवा कार्य उन समुदायों की व्यावहारिक आवश्यकताओं को पूरा करने के लिए विस्तारित हुआ जिनकी हम सेवा करते हैं। आज हम वित्तीय स्वतंत्रता प्राप्त करने वाली महिलाओं, नए कौशल व आत्मविश्वास विकसित करने वाले युवाओं, और आधुनिक कृषि ज्ञान के माध्यम से पैदावार बढ़ाने वाले गन्ना किसानों के साथ सीधे काम कर रहे हैं।
                  </>
                ) : (
                  <>
                    Over time, our work has grown to meet the practical needs of the communities we serve. Today, we work directly with women building financial independence, young people developing skills and confidence, and farmers, particularly sugarcane growers, improving yields through modern agricultural knowledge.
                  </>
                )}
              </p>
              <p className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7D8C8] shadow-xs italic text-[#2B201A] font-serif">
                {lang === "hi" ? (
                  <>
                    “जो बच्चा ध्यान के माध्यम से स्थिरता सीखता है, वह जीवन के दबावों का सामना करने में सक्षम वयस्क बनता है। जो महिला कौशल और स्वावलंबन से सम्पन्न होती है, वह अपने पूरे परिवार की संबल बनती है। और जो किसान आधुनिक तकनीकों से सशक्त होता है, वह न केवल बेहतर फसल उगाता है बल्कि उसी भूमि पर अगली पीढ़ी के लिए उज्ज्वल भविष्य भी गढ़ता है।”
                  </>
                ) : (
                  <>
                    “What connects all of this is a single conviction: real empowerment happens when inner strength meets practical opportunity. A child who learns stillness through meditation grows into an adult equipped to handle life’s pressures. A woman equipped with financial and vocational skills becomes an anchor for her family. A farmer equipped with modern techniques builds not just a better harvest, but a better future for the next generation on that same land.”
                  </>
                )}
              </p>
            </ParagraphReveal>
          </div>
        </div>
      </SectionReveal>

      {/* 3. SACRED TEMPLE BRAND STATEMENT BANNER */}
      <section className="py-8 sm:py-12 md:py-16 bg-[#FFFDF9]">
        <div className="page-container">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#E7D8C8] shadow-[0_8px_30px_rgb(0,0,0,0.06)] min-h-[220px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px] flex items-center">
            {/* Background Temple Landscape (2nd image) */}
            <Image
              src="/images/about-temple-quote-bg.webp"
              alt="Sacred Vedic Temple Skyline"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-right md:object-center"
            />
            {/* Soft gradient wash on left for contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F0]/75 via-[#FFF8F0]/35 to-transparent pointer-events-none" />

            {/* Text on Left Side in 2 lines */}
            <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:px-14 py-8 sm:py-12">
              <ParagraphReveal yOffset={15} className="max-w-full md:max-w-[720px] lg:max-w-[820px] xl:max-w-[880px]">
                <blockquote className="font-editorial text-base sm:text-lg md:text-[18px] lg:text-[20px] xl:text-[21px] text-[#2B201A] font-bold leading-relaxed tracking-tight">
                  {lang === "hi" ? (
                    <>
                      <span className="relative inline-block pb-1">
                        हम
                        <span className="absolute left-0 bottom-0.5 w-full h-[3px] bg-[#E86F1D] rounded-full" />
                      </span>{" "}
                      हृदय से शिक्षकों, विचारकों और कर्मठ समाजसेवियों का एक परिवार हैं —<br className="hidden md:inline" />
                      जो गाँव-गाँव, विद्यालय-विद्यालय और परिवार-परिवार जाकर सेवा कार्य कर रहे हैं।
                    </>
                  ) : (
                    <>
                      <span className="relative inline-block pb-1">
                        We
                        <span className="absolute left-0 bottom-0.5 w-full h-[3px] bg-[#E86F1D] rounded-full" />
                      </span>{" "}
                      are, at heart, a foundation of teachers, practitioners and community builders<br className="hidden md:inline" />
                      working village by village, school by school, and family by family.
                    </>
                  )}
                </blockquote>
              </ParagraphReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION STATEMENT (CLEAN & DIGNIFIED MINIMALIST PRESENTATION) */}
      <SectionReveal className="py-14 sm:py-20 bg-[#FFFDF9] border-b border-[#E7D8C8]">
        <div className="page-container max-w-5xl text-center space-y-6">
          <div className="flex justify-center">
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold inline-flex items-baseline gap-2.5 sm:gap-3">
              <span className="relative inline-block text-[#1F1712] pb-2">
                {lang === "hi" ? "मिशन" : "Mission"}
                <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-[#E86F1D] rounded-full" />
              </span>
              <span className="text-[#E86F1D]">
                {lang === "hi" ? "संकल्प" : "Statement"}
              </span>
            </h2>
          </div>

          <TextReveal as="h3" className="font-editorial text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[30px] text-[#E86F1D] font-bold leading-relaxed max-w-4xl lg:max-w-5xl mx-auto">
            {lang === "hi" ? (
              <>
                “समाज को संगठित करना, युवा व महिला नेतृत्व को बढ़ावा देना<br className="hidden md:inline" />
                और पंच संकल्प के माध्यम से राष्ट्र व समाज का नव-निर्माण करना।”
              </>
            ) : (
              <>
                “To unite the community, champion youth and women leadership,<br className="hidden md:inline" />
                and empower society through the vision of the Panch Sankalp.”
              </>
            )}
          </TextReveal>
        </div>
      </SectionReveal>

      {/* 5. WE ARE COMMITTED TO (4 PILLAR MODULES FAITHFULLY MATCHING ORIGINAL SITE) */}
      <SectionReveal className="py-16 sm:py-20 lg:py-24 bg-[#FBF6EE]">
        <div className="page-container space-y-12">
          {/* Section Heading */}
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <TextReveal as="h2" className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-[#E86F1D]">
              {lang === "hi" ? "हम समर्पित हैं" : "WE ARE COMMITTED TO"}
            </TextReveal>
            <HeadingDivider className="my-1.5" />
            <p className="text-sm sm:text-base text-[#3E3129]/80 font-medium">
              {lang === "hi"
                ? "हमारी संपूर्ण सेवा यात्रा चार मूलभूत स्तंभों पर आधारित है"
                : "Our entire community service operates through four foundational pillars"}
            </p>
          </div>

          {/* Cards Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {commitmentCards.map((card) => {
              return (
                <StaggerItem key={card.id} className="h-full">
                  <div className="bg-white rounded-3xl border border-[#E7D8C8] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full">
                    {/* Card Header & Content */}
                    <div className="p-6 sm:p-8 space-y-5">
                      {/* Card Title */}
                      <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#E86F1D] uppercase tracking-wider">
                        {lang === "hi" ? card.titleHi : card.title}
                      </h3>

                      {/* Description Paragraph */}
                      <p className="text-sm sm:text-base text-[#3E3129] leading-relaxed">
                        {lang === "hi" ? card.descHi : card.desc}
                      </p>

                      {/* Specific Action Points */}
                      <div className="pt-2 space-y-2 border-t border-[#F2E5D5]">
                        {card.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4E3E33]">
                            <span className="w-2 h-2 rounded-full bg-[#E86F1D] shrink-0 mt-1.5" aria-hidden="true" />
                            <span>{lang === "hi" ? pt.hi : pt.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Real Photograph at bottom (Full-bleed flush to bottom/side borders) */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden mt-auto">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill sizes="100vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <div className="text-center pt-2">
            <Link
              href="/initiatives"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#2B201A] hover:bg-[#3D2C24] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>{lang === "hi" ? "सभी सेवा प्रकल्प विस्तार से देखें" : "Explore All Trust Initiatives"}</span>
            </Link>
          </div>
        </div>
      </SectionReveal>

      {/* 6. CLOSING GOLDEN WALK LANDSCAPE BANNER (MATCHING REFERENCE DESIGN) */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-28 border-t border-[#E7D8C8] flex flex-col justify-start items-center min-h-[540px] sm:min-h-[600px]">
        {/* Landscape Banner Artwork (Golden Sunrise Rural Family) */}
        <ParallaxImage offset={25} className="absolute inset-0 z-0">
          <Image
            src="/images/about-closing-walk.jpg"
            alt="Rural family walking together into golden horizon"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </ParallaxImage>

        {/* Floating Card Container (Matching Reference Image 2) */}
        <div className="relative z-10 page-container max-w-4xl text-center px-4 sm:px-6 w-full pt-2 sm:pt-4">
          <div className="bg-[#FFFDF9]/95 sm:bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#E86F1D]/35 shadow-[0_16px_40px_rgba(0,0,0,0.18)] p-6 sm:p-10 md:p-12 space-y-5">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#E86F1D]">
              {lang === "hi" ? "समग्र समाज उत्थान का संकल्प" : "WALKING TOGETHER FOR HUMANITY"}
            </p>

            <ParagraphReveal yOffset={20}>
              <blockquote className="font-editorial text-base sm:text-xl md:text-2xl text-[#2B1810] font-semibold leading-relaxed">
                {lang === "hi"
                  ? "“इन निरंतर प्रयासों के माध्यम से, अग्रवाल वैश्य समाज (AVS Haryana) एक ऐसे समर्थ समाज के निर्माण के लिए समर्पित है जहाँ एकता, स्वाभिमान और सेवा साथ-साथ आगे बढ़ें — हर परिवार, हर युवा और हर बहन के जीवन को नई दिशा देते हुए।”"
                  : "“Through these dedicated efforts, Aggarwal Vaish Samaj (AVS Haryana) strives to build a united society where solidarity, dignity, and public service walk hand in hand — uplifting every family, youth, and sister across Haryana.”"}
              </blockquote>
            </ParagraphReveal>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={() => openDonateModal("General Seva")}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-xl bg-[#E86F1D] hover:bg-[#D25E12] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current text-white" />
                <span>{lang === "hi" ? "सेवा में सहयोग करें" : "Support Our Seva"}</span>
              </button>
              <Link
                href="/membership"
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-xl bg-[#FFF9F2] hover:bg-white text-[#2B1810] font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#E86F1D]/60 shadow-xs hover:shadow-sm active:scale-95 transition-all text-center"
              >
                <span>{lang === "hi" ? "ट्रस्ट के सदस्य बनें" : "Become a Member"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
