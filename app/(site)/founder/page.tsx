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

export default function FounderPage() {
  const { lang, openDonateModal } = useApp();

  const commitmentAreas = [
    {
      title: "Social Participation & Community Unity",
      titleHi: "सामाजिक सहभागिता एवं सामुदायिक एकता",
    },
    {
      title: "Women’s Empowerment & Mahila Wing",
      titleHi: "महिला सशक्तिकरण एवं महिला प्रकोष्ठ",
    },
    {
      title: "Youth Leadership & Entrepreneurship",
      titleHi: "युवा नेतृत्व एवं उद्यमशीलता",
    },
    {
      title: "Political Awareness & Democratic Representation",
      titleHi: "राजनीतिक सहभागिता एवं वैचारिक चेतना",
    },
    {
      title: "Organized Community Welfare (Panch Sankalp)",
      titleHi: "संगठित समाज एवं जनकल्याण (पंच संकल्प)",
    },
    {
      title: "Maharaja Agrasen Ideals: One Brick, One Coin",
      titleHi: "महाराजा अग्रसेन सिद्धांत: एक ईंट, एक रुपया",
    },
    {
      title: "Trade, Commerce & Business Support",
      titleHi: "व्यापार, वाणिज्य एवं आर्थिक संवर्धन",
    },
    {
      title: "Merit Scholarships & Pratibha Samman",
      titleHi: "प्रतिभा सम्मान एवं मेधावी छात्र प्रोत्साहन",
    },
    {
      title: "Healthcare Camps & Public Assistance",
      titleHi: "स्वास्थ्य शिविर एवं जरूरतमंदों की सहायता",
    },
    {
      title: "District Coordination Across All 22 Haryana Districts",
      titleHi: "हरियाणा के सभी 22 जिलों में संगठनात्मक समन्वय",
    },
    {
      title: "Cultural Heritage & Agrasen Jayanti Mahotsav",
      titleHi: "सांस्कृतिक धरोहर एवं अग्रसेन जयंती महोत्सव",
    },
  ];

  return (
    <div className="w-full space-y-0 text-[#2B201A] font-sans">
      {/* 1. HERO SECTION (PANORAMIC ON DESKTOP, 100VH ON MOBILE & LAPTOP) */}
      <section className="relative overflow-hidden bg-[#1F150E] md:bg-[#F7EDE1] border-b border-[#E7D8C8] min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-74px)] min-[1000px]:min-h-[calc(100vh-76px)] xl:min-h-[calc(100vh-82px)] md:flex md:items-center">
        {/* Desktop Panoramic Background Banner (hidden on mobile) */}
        <div className="hidden md:block absolute inset-0 z-0 overflow-hidden">
          <ParallaxSection range={[0, 30]} className="w-full h-full">
            <div className="relative w-full h-[108%] -mt-4 sm:-mt-5 md:-mt-6">
              <Image
                src="/images/agarwal/hero-split-banner.jpg"
                alt="Shri Ashok Buwaniwala - Founder President, Aggarwal Vaish Samaj Haryana"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[80%_top] lg:object-[82%_top]"
              />
            </div>
            {/* Clean feathered mask */}
            <div
              className="absolute -top-10 -bottom-10 inset-x-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, #F7EDE1 0%, #F7EDE1 47%, rgba(247,237,225,0.98) 51%, rgba(247,237,225,0.85) 56%, rgba(247,237,225,0.45) 62%, rgba(247,237,225,0.12) 67%, rgba(247,237,225,0) 72%)",
              }}
            />
          </ParallaxSection>
        </div>

        {/* MOBILE HERO (100VH Full Viewport Height with Bottom Overlay) */}
        <div className="md:hidden relative z-1 w-full h-[calc(100vh-68px)] min-h-[540px] flex items-center justify-center overflow-hidden">
          <ParallaxImage offset={30} className="absolute inset-0 w-full h-full">
            <Image
              src="/images/agarwal/banner-square.jpg"
              alt="Shri Ashok Buwaniwala - Founder President"
              fill
              priority
              sizes="100vw"
              className="w-full h-full object-cover object-top block select-none pointer-events-none"
            />
          </ParallaxImage>

          {/* Mobile Overlay Action Bar */}
          <div className="absolute bottom-0 inset-x-0 z-20 w-full px-4 pt-16 pb-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col items-center gap-2 text-center pointer-events-auto">
            <TextReveal as="h2" className="font-editorial text-sm sm:text-base font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
              {lang === "hi" ? "श्री अशोक बुवानीवाला जी" : "Shri Ashok Buwaniwala"}
            </TextReveal>
            <div className="flex items-center justify-center gap-2.5 w-full max-w-xs pt-1">
              <a
                href="#founder-story"
                className="flex-1 py-2 px-3 rounded-lg bg-[#E86F1D] text-white font-bold text-xs uppercase tracking-wider text-center shadow-md active:scale-95 transition-transform"
              >
                {lang === "hi" ? "जीवन यात्रा" : "Biography"}
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
                  श्री अशोक बुवानीवाला <br />
                  <span className="text-[#E86F1D]">संस्थापक अध्यक्ष</span>
                </>
              ) : (
                <>
                  Founder President <br />
                  <span className="text-[#E86F1D]">Shri Ashok Buwaniwala</span>
                </>
              )}
            </TextReveal>

            {/* Subtitle matching exact reference text */}
            <ParagraphReveal className="text-sm sm:text-base md:text-lg text-[#3E3129] leading-relaxed font-sans font-medium">
              {lang === "hi"
                ? "अग्रवाल वैश्य समाज (AVS Haryana) के संस्थापक अध्यक्ष। समाज को संगठित करने, राजनीतिक चेतना जगाने, युवाओं व महिलाओं को सशक्त बनाने और महाराजा अग्रसेन जी के समरसता संदेश को जन-जन तक पहुँचाने के लिए समर्पित।"
                : "Founder President of Aggarwal Vaish Samaj (AVS Haryana). Dedicated to community unification, youth & women empowerment, political representation, and propagating the egalitarian philosophy of Maharaja Agrasen."}
            </ParagraphReveal>



            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-4">
              <a
                href="#founder-story"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl bg-[#E86F1D] hover:bg-[#D25E12] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>{lang === "hi" ? "जीवन यात्रा व दर्शन जानें" : "Read Life Journey & Philosophy"}</span>
              </a>
              <button
                type="button"
                onClick={() => openDonateModal()}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-white/80 hover:bg-white text-[#2B201A] font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#E7D8C8] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>{lang === "hi" ? "समाज सेवा में सहयोग करें" : "Support Our Cause"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTHENTIC FOUNDER NARRATIVE */}
      <SectionReveal className="py-16 sm:py-20 lg:py-24 bg-[#FBF6EE]" id="founder-story">
        <div className="page-container max-w-5xl lg:max-w-6xl space-y-8">
          <div className="text-center space-y-2">
            <TextReveal as="h2" className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-[#E86F1D]">
              {lang === "hi" ? "अग्रवाल वैश्य समाज (AVS Haryana)" : "AGGARWAL VAISH SAMAJ HARYANA"}
            </TextReveal>
            <HeadingDivider className="my-1.5" />
          </div>

          <ParagraphReveal className="bg-white rounded-3xl border border-[#E7D8C8] p-6 sm:p-10 md:p-12 shadow-sm space-y-6 text-sm sm:text-base md:text-lg text-[#3E3129] leading-relaxed font-normal">
            <p>
              {lang === "hi" ? (
                <>
                  <strong>श्री अशोक बुवानीवाला जी</strong> हरियाणा में वैश्य समाज के उत्थान, राजनीतिक चेतना और संगठनात्मक मजबूती के अग्रदूत हैं। भिवानी में जन्मे श्री बुवानीवाला जी ने अपने जीवन के कई दशक समाज की सेवा, युवाओं के मार्गदर्शन और वंचित परिवारों की सहायता में समर्पित किए हैं।
                </>
              ) : (
                <>
                  <strong>Shri Ashok Buwaniwala</strong> is a veteran social leader and the founding architect of the Aggarwal Vaish Samaj (AVS Haryana). Born in Bhiwani, he has devoted decades of grassroots service to community upliftment, youth guidance, and advocating for democratic representation.
                </>
              )}
            </p>

            <p>
              {lang === "hi" ? (
                <>
                  उनका मानना है कि संगठित समाज ही प्रगति का मूल मंत्र है। महाराजा अग्रसेन जी के समाजवाद के अमर सिद्धांत 'एक ईंट, एक रुपया' से प्रेरणा लेते हुए उन्होंने <strong>पंच संकल्प</strong> का सूत्रपात किया: <em>सामाजिक सहभागिता, महिला सशक्तिकरण, युवा नेतृत्व, राजनीतिक सहभागिता और संगठित समाज।</em>
                </>
              ) : (
                <>
                  Believing that unity is the true catalyst of progress, and drawing inspiration from Maharaja Agrasen’s vision of collective compassion, he formulated the <strong>Panch Sankalp</strong>: <em>Social Participation, Women Empowerment, Youth Leadership, Political Consciousness, and an Organized Community.</em>
                </>
              )}
            </p>

            <p>
              {lang === "hi" ? (
                <>
                  श्री बुवानीवाला जी के नेतृत्व में अग्रवाल वैश्य समाज ने हरियाणा के सभी 22 जिलों में सशक्त सांगठनिक ढांचा तैयार किया है। युवा इकाई, महिला प्रकोष्ठ, छात्र इकाई और व्यापार प्रकोष्ठ के माध्यम से लाखों अग्र-बंधु आज एक मजबूत मंच से जुड़े हुए हैं।
                </>
              ) : (
                <>
                  Under his leadership, AVS Haryana has established active units across all 22 districts of the state, empowering tens of thousands of members through its dedicated Youth Wing, Mahila Wing, Student Wing, and Trade Cells.
                </>
              )}
            </p>
          </ParagraphReveal>
        </div>
      </SectionReveal>

      {/* 3. HER PHILOSOPHY BANNER (INSPIRED BY REFERENCE PIC 3: LIGHT CREAM AESTHETIC WITH OPEN BOOK) */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-28 border-y border-[#E7D8C8] flex items-center mb-10 sm:mb-16 md:mb-20">
        {/* Soft Sacred Still-Life Artwork (Book & Mala on right, clean space on left) */}
        <ParallaxImage offset={35} className="absolute inset-0 z-0">
          <Image
            src="/images/founder-philosophy-bg.jpg"
            alt="Sacred Bhagavad Gita Scripture and Rudraksha Japa Mala"
            fill sizes="100vw"
            className="object-cover object-right sm:object-center"
          />
          {/* Subtle mobile-only soft cream fade for perfect text contrast on small screens */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE]/95 via-[#FAF6EE]/80 to-transparent sm:hidden" />
        </ParallaxImage>

        {/* Content (Clean, left-aligned, matching reference pic 3) */}
        <div className="relative z-10 page-container px-6 sm:px-10 lg:px-12 w-full">
          <div className="max-w-xl lg:max-w-2xl space-y-3.5 text-left">
            <p className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#5A4638] uppercase">
              {lang === "hi"
                ? "उनका जीवन दर्शन इन पावन शब्दों में प्रतिबिंबित होता है:"
                : "Her philosophy is beautifully reflected in these words:"}
            </p>

            <ParagraphReveal yOffset={20}>
              <blockquote className="font-editorial text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold leading-relaxed text-[#1F1712]">
                {lang === "hi"
                  ? "“संगठन ही शक्ति है और स्वाभिमान ही जीवन। जब समाज का हर व्यक्ति दूसरे के सुख-दुख में सहभागी बनेगा, तभी महाराजा अग्रसेन जी के समरस और समृद्ध समाज का स्वप्न साकार होगा।”"
                  : "“Unity is strength, and dignity is life. When every individual shares in the joys and trials of their fellow brethren, only then will Maharaja Agrasen’s dream of an egalitarian, prosperous society be realized.”"}
              </blockquote>
            </ParagraphReveal>
          </div>
        </div>
      </section>

      {/* 4. OUR COMMITMENT TO SOCIETY (11 SEVA AREAS EXACTLY MATCHING ORIGINAL SITE) */}
      <SectionReveal className="py-16 sm:py-20 lg:py-24 bg-[#FBF6EE] border-b border-[#E7D8C8]">
        <div className="page-container space-y-12">
          {/* Section Heading */}
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <TextReveal as="h2" className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-[#E86F1D]">
              {lang === "hi" ? "समाज के प्रति हमारा संकल्प" : "OUR COMMITMENT TO SOCIETY"}
            </TextReveal>
            <HeadingDivider className="my-1.5" />
          </div>

          {/* 11 Commitment Cards Grid (Pure Text with Animated Interactive Effects) */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {commitmentAreas.map((area, idx) => (
              <StaggerItem key={idx}>
                <div className="relative overflow-hidden bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#FFF8F0] px-6 py-5 rounded-2xl border border-[#E7D8C8] hover:border-[#E86F1D] shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(232,111,29,0.16)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center min-h-[96px] group cursor-pointer before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:transition-transform before:duration-700">
                  {/* Animated Text Content */}
                  <div className="relative z-10 w-full">
                    <span className="font-sans text-lg sm:text-[20px] font-bold text-[#1F1712] group-hover:text-[#E86F1D] group-hover:translate-x-1.5 transition-all duration-300 leading-snug inline-block tracking-tight">
                      {lang === "hi" ? area.titleHi : area.title}
                    </span>
                    {/* Animated Saffron Sweep Underline */}
                    <span className="block h-[2.5px] w-0 group-hover:w-20 bg-gradient-to-r from-[#E86F1D] to-[#F59E0B] rounded-full transition-all duration-400 mt-1.5" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Concluding Founder Bio Paragraphs */}
          <ParagraphReveal className="bg-[#FFFDF9] rounded-3xl border border-[#E7D8C8] p-6 sm:p-10 md:p-12 space-y-5 text-sm sm:text-base md:text-lg text-[#3E3129] leading-relaxed shadow-xs">
            <p>
              {lang === "hi" ? (
                <>
                  श्री अशोक बुवानीवाला जी का संपूर्ण जीवन सादगी, संघर्ष, समर्पण और समाज के अधिकारों के प्रति निरंतर सक्रियता का प्रतीक है। वे मानते हैं कि समाज की वास्तविक प्रगति तभी संभव है जब युवा नेतृत्व आगे आए और महिलाएं स्वावलंबी होकर समाज संचालन में बराबरी की हिस्सेदार बनें।
                </>
              ) : (
                <>
                  Shri Ashok Buwaniwala’s life stands as a testament to grassroots dedication, humility, and relentless advocacy for community rights. He firmly believes that genuine progress occurs when dynamic youth take on leadership and women stand shoulder-to-shoulder in community governance.
                </>
              )}
            </p>

            <p>
              {lang === "hi" ? (
                <>
                  आज अग्रवाल वैश्य समाज (AVS Haryana) पूरे हरियाणा में सामाजिक एकता, आर्थिक स्वावलंबन और राजनीतिक चेतना का एक सशक्त केंद्र बन चुका है। पंच संकल्प के माध्यम से समाज का हर वर्ग गर्व और आत्मसम्मान के साथ प्रगति पथ पर अग्रसर है।
                </>
              ) : (
                <>
                  Today, Aggarwal Vaish Samaj (AVS Haryana) has grown into a powerful beacon of social solidarity, economic resilience, and civic consciousness throughout Haryana, empowering every family to advance with pride and dignity under the Panch Sankalp.
                </>
              )}
            </p>
          </ParagraphReveal>
        </div>
      </SectionReveal>

      {/* 5. BHAGAVAD GITA & KARMA YOGA IN PRACTICE (BACKGROUND IMAGE WITH ENHANCED HIGH-VISIBILITY CARD) */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-28 border-y border-[#E7D8C8] flex items-center justify-center">
        {/* Background Image: Gurukul / Bhagavad Gita Temple Courtyard with subtle dark/warm overlay */}
        <ParallaxImage offset={30} className="absolute inset-0 z-0">
          <Image
            src="/images/founder-karma-bg.jpg"
            alt="Bhagavad Gita Wisdom and Vedic Courtyard"
            fill sizes="100vw"
            priority
            className="object-cover object-center"
          />
          {/* Multi-layered soft contrast overlay for optimal background depth & card pop */}
          <div className="absolute inset-0 bg-black/20 backdrop-brightness-95" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25" />
        </ParallaxImage>

        {/* Enhanced High-Visibility Card Container */}
        <div className="relative z-10 page-container max-w-4xl px-4 sm:px-6 w-full">
          <div className="bg-white/75 sm:bg-[#FFFDF9]/70 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/80 sm:border-[#E86F1D]/35 shadow-[0_20px_50px_rgba(0,0,0,0.22)] p-6 sm:p-10 md:p-12 text-center space-y-6">
            <ParagraphReveal yOffset={15}>
              <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#1F1712] font-medium leading-relaxed">
                {lang === "hi" ? (
                  <>
                    श्री अशोक बुवानीवाला जी समाज के प्रत्येक व्यक्ति को <span className="text-[#E86F1D] font-bold">एकता</span>, <span className="text-[#E86F1D] font-bold">परस्पर सहयोग</span>, सामाजिक समरसता और समाज निर्माण में सक्रिय भागीदारी निभाने की प्रेरणा देते हैं। उनका विश्वास है कि जब समाज का युवा शिक्षित, संस्कारित और आत्मनिर्भर होगा, तभी समग्र समाज का मान-सम्मान बढ़ेगा।
                  </>
                ) : (
                  <>
                    Shri Ashok Buwaniwala inspires every community member to embrace <span className="text-[#E86F1D] font-bold">Unity</span>, <span className="text-[#E86F1D] font-bold">Mutual Solidarity</span>, social harmony, and active participation in community governance. He believes that an educated, ethical, and self-reliant youth is the cornerstone of societal pride.
                  </>
                )}
              </p>
            </ParagraphReveal>

            {/* Sacred Divider */}
            <div className="flex items-center justify-center gap-4 my-2 select-none" aria-hidden="true">
              <span className="h-px w-20 sm:w-32 bg-[#E86F1D]/40" />
              <span className="font-editorial text-2xl sm:text-3xl text-[#E86F1D] font-bold leading-none">★</span>
              <span className="h-px w-20 sm:w-32 bg-[#E86F1D]/40" />
            </div>

            <ParagraphReveal yOffset={15}>
              <p className="font-sans text-xs sm:text-sm md:text-[15px] text-[#3D2C24] font-medium leading-relaxed max-w-3xl mx-auto">
                {lang === "hi"
                  ? "उनके दूरदर्शी नेतृत्व में अग्रवाल वैश्य समाज (AVS Haryana) आज पूरे प्रदेश में समाज के मान, स्वाभिमान और अधिकारों का प्रतीक बन चुका है।"
                  : "Under his visionary stewardship, Aggarwal Vaish Samaj (AVS Haryana) stands today as a beacon of dignity, self-respect, and collective empowerment across Haryana."}
              </p>
            </ParagraphReveal>
          </div>
        </div>
      </section>

      {/* 6. HER LIFE MESSAGE */}
      <SectionReveal className="py-16 sm:py-24 bg-[#FAF3EA] border-t border-[#E7D8C8]">
        <div className="page-container max-w-4xl text-center space-y-6">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#E86F1D]">
            {lang === "hi" ? "संस्थापक अध्यक्ष का संदेश" : "FOUNDER'S MESSAGE"}
          </p>

          <ParagraphReveal yOffset={25}>
            <blockquote className="font-editorial text-xl sm:text-2xl md:text-3xl text-[#1F1712] font-semibold leading-relaxed px-4">
              {lang === "hi"
                ? "“समाज को जगाना है, राजनीति में लाना है। महाराजा अग्रसेन जी के समाजवाद व समरसता के मार्ग पर चलकर हमें अपने अधिकारों, युवाओं के रोजगार और समाज की स्वाभिमानी उपस्थिति को सुनिश्चित करना है। जब तक समाज का अंतिम व्यक्ति सशक्त नहीं होगा, हमारा आंदोलन जारी रहेगा।”"
                : "“Awaken the community, bring them into civic leadership! Walking on the path of socialism and harmony enlightened by Maharaja Agrasen Ji, we must ensure our community's pride, youth leadership, and rightful political representation.”"}
            </blockquote>
          </ParagraphReveal>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => openDonateModal("AVS Haryana Seva")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E86F1D] hover:bg-[#D25E12] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>{lang === "hi" ? "अग्रवाल वैश्य समाज में सहयोग करें" : "Support AVS Haryana"}</span>
            </button>
            <Link
              href="/membership"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-neutral-50 text-[#2B201A] font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#E7D8C8] shadow-sm active:scale-95 transition-all text-center"
            >
              <span>{lang === "hi" ? "सदस्यता ग्रहण करें" : "Join AVS Network"}</span>
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
