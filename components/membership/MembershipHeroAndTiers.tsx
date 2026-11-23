"use client";

import React from "react";
import Image from "next/image";
import { Check, Heart } from "lucide-react";
import {
  TextReveal,
  ParagraphReveal,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  ParallaxImage,
} from "@/components/animation";
import HeadingDivider from "@/components/HeadingDivider";

interface MembershipHeroAndTiersProps {
  lang: string;
  tiers: any[];
  openDonateModal: (name: string, price?: number, isMonthly?: boolean) => void;
}

/**
 * Preserved component for Membership Hero Banner & Membership Tiers (Pricing Cards).
 * Temporarily unmounted per user request ("shayed wo hame waps lagana pade , abhi ke lie remove krde").
 */
export default function MembershipHeroAndTiers({
  lang,
  tiers,
  openDonateModal,
}: MembershipHeroAndTiersProps) {
  return (
    <>
      {/* HERO SECTION - PANORAMIC ON DESKTOP, 100VH ON MOBILE */}
      <section className="relative overflow-hidden bg-[#1F150E] md:bg-[#F6EDE2] border-b border-[#E7D8C8] min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-74px)] min-[1000px]:min-h-[calc(100vh-76px)] xl:min-h-[calc(100vh-82px)] md:flex md:items-center">
        {/* Desktop Panoramic Background Banner (hidden on mobile) */}
        <ParallaxImage offset={45} className="hidden md:block absolute inset-0 z-0">
          <Image
            src="/images/membership-hero-banner.png"
            alt="Together for a Better Tomorrow"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6EDE2] via-[#F6EDE2] via-[35%] to-transparent to-[48%] pointer-events-none" />
        </ParallaxImage>

        {/* MOBILE HERO */}
        <div className="md:hidden relative z-1 w-full h-[calc(100vh-68px)] min-h-[540px] flex items-center justify-center overflow-hidden">
          <ParallaxImage offset={30} className="absolute inset-0 w-full h-full">
            <Image
              src="/images/membership-mobile-hero.png"
              alt="Together for a Better Tomorrow - Aggarwal Vaish Samaj Haryana"
              fill
              sizes="100vw"
              priority
              className="w-full h-full object-cover object-top block select-none pointer-events-none"
            />
          </ParallaxImage>

          {/* Mobile Overlay Action Bar */}
          <div className="absolute bottom-0 inset-x-0 z-20 w-full px-4 pt-16 pb-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col items-center gap-2 text-center pointer-events-auto">
            <TextReveal
              as="h2"
              className="font-editorial text-sm sm:text-base font-extrabold text-white tracking-wide leading-tight drop-shadow-md"
            >
              {lang === "hi" ? "एक बेहतर कल के लिए साथ" : "Together for a Better Tomorrow"}
            </TextReveal>
            <div className="flex items-center justify-center gap-2.5 w-full max-w-xs pt-1">
              <a
                href="#membership-plans"
                className="flex-1 py-2 px-3 rounded-lg bg-[#7F160C] text-white font-bold text-xs uppercase tracking-wider text-center shadow-md active:scale-95 transition-transform"
              >
                {lang === "hi" ? "योजनाएं देखें" : "View Plans"}
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById("membership-plans");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-white text-[#2B201A] font-bold text-xs uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-transform"
              >
                <Heart className="w-3 h-3 text-[#7F160C] fill-current" />
                <span>{lang === "hi" ? "जुड़ें" : "Join Now"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Hero Content */}
        <div className="hidden md:block relative z-10 page-container py-8 sm:py-12 md:py-24 w-full">
          <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-5">
            <TextReveal
              as="h1"
              className="font-editorial text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B201A] leading-[1.18] tracking-tight"
            >
              {lang === "hi" ? (
                <>
                  एक बेहतर कल के लिए <span className="text-[#7F160C]">साथ</span>
                </>
              ) : (
                <>
                  Together for a <span className="text-[#7F160C]">Better Tomorrow</span>
                </>
              )}
            </TextReveal>

            <ParagraphReveal className="text-sm sm:text-base md:text-[15px] text-[#4A3B32] leading-relaxed font-sans font-medium">
              {lang === "hi"
                ? "आइए, एक ऐसे परिवार का हिस्सा बनें जो सेवा, संस्कृति और समाज के सशक्तिकरण में विश्वास रखता है। साथ मिलकर हम एक ऐसे भविष्य का निर्माण कर सकते हैं जहाँ शिक्षा, स्वास्थ्य, गौ सेवा, पर्यावरण संरक्षण और आध्यात्मिक चेतना से सभी का समग्र कल्याण और उत्थान हो सके।"
                : "Come, be a part of a family that believes in service, culture, and the empowerment of society. Together, we can create a future where education, health, cow protection, environmental conservation, and spiritual awareness bring holistic well-being and enlightened prosperity for all."}
            </ParagraphReveal>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#membership-plans"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl bg-[#7F160C] hover:bg-[#69120A] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>{lang === "hi" ? "सदस्यता योजनाएं देखें" : "Explore Membership Plans"}</span>
              </a>
              <a
                href="/membership-form-avvs.pdf"
                download="MEMBERSHIP_FORM_AVVS.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-[#7F160C] border-2 border-[#7F160C] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>{lang === "hi" ? "फॉर्म डाउनलोड करें (PDF)" : "Download Form (PDF)"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS (PRICING CARDS) */}
      <SectionReveal className="section-py" id="membership-plans">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto section-header space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B8893E]">
              {lang === "hi" ? "सदस्यता श्रेणी चुनें" : "CHOOSE YOUR MEMBERSHIP TIER"}
            </p>
            <TextReveal as="h2" className="font-editorial text-3xl sm:text-4xl font-bold text-[#7F160C]">
              {lang === "hi" ? "अग्रवाल वैश्य विकास संगठन से जुड़ें" : "Join Aggarwal Vaish Vikas Sangathan"}
            </TextReveal>
            <HeadingDivider className="mt-2" />
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <StaggerItem key={tier.name} className="h-full">
                <div
                  className={`rounded-[18px] p-6 flex flex-col justify-between transition-all duration-300 h-full ${tier.cardStyle}`}
                >
                  {tier.badgeText && (
                    <div
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full z-10 whitespace-nowrap ${tier.badgeStyle}`}
                    >
                      {lang === "hi" && tier.badgeTextHi ? tier.badgeTextHi : tier.badgeText}
                    </div>
                  )}

                  <div className="card-body space-y-4">
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#2B201A]">
                        {lang === "hi" ? tier.nameHi : tier.name}
                      </h3>
                      <p className="text-xs text-[#2B201A]/75 mt-1 leading-relaxed">
                        {lang === "hi" && tier.descHi ? tier.descHi : tier.desc}
                      </p>
                    </div>

                    <div className="py-3 border-y border-[#2B201A]/10">
                      <span className={`font-sans text-3xl font-bold tracking-tight ${tier.priceColor}`}>
                        ₹{tier.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#2B201A]/60 ml-1.5 font-semibold">
                        INR / {lang === "hi" && tier.periodHi ? tier.periodHi : tier.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-[#2B201A]/85 font-sans pt-1">
                      {(lang === "hi" && tier.featuresHi ? tier.featuresHi : tier.features).map((feat: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.checkColor}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-action">
                    <button
                      onClick={() => openDonateModal(lang === "hi" ? tier.nameHi : tier.name, tier.price, true)}
                      className={tier.buttonStyle}
                    >
                      {lang === "hi"
                        ? `सदस्यता लें — ₹${tier.price.toLocaleString("en-IN")}`
                        : `Join Now — ₹${tier.price.toLocaleString("en-IN")}`}
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </SectionReveal>
    </>
  );
}
