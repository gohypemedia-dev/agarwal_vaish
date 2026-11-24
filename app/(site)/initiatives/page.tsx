"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, HeartHandshake, Briefcase, Users, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import HeadingDivider from "@/components/HeadingDivider";

export default function InitiativesPage() {
  const { lang } = useApp();

  const initiativeCards = [
    {
      titleEn: "Matrimonial",
      titleHi: "वैवाहिक प्रकोष्ठ",
      descHi: "समाज के युवक-युवतियों हेतु सुगम एवं विश्वसनीय वैवाहिक मंच।",
      descEn: "A trusted community matrimonial network and matrimonial melas.",
      icon: Users,
    },
    {
      titleEn: "Job Placement",
      titleHi: "रोजगार प्रकोष्ठ",
      descHi: "युवाओं को रोजगार, कौशल प्रशिक्षण एवं कॉर्पोरेट प्लेसमेंट सहायता।",
      descEn: "Career guidance, skill development and youth job placements.",
      icon: Briefcase,
    },
    {
      titleEn: "Business Exchange",
      titleHi: "व्यापार विनिमय",
      descHi: "वैश्य व्यापारियों व उद्यमियों हेतु व्यापारिक नेटवर्किंग व साझेदारी।",
      descEn: "Business networking, trade exchange and entrepreneurial growth.",
      icon: HeartHandshake,
    },
    {
      titleEn: "Blood Donation",
      titleHi: "रक्तदान अभियान",
      descHi: "राज्यव्यापी रक्तदान शिविर एवं आपातकालीन रक्त सहायता नेटवर्क।",
      descEn: "Statewide blood donation drives and emergency healthcare support.",
      icon: Heart,
    },
  ];

  return (
    <div className="w-full bg-[#FFFDF9] text-[#1F1712] font-sans selection:bg-[#7F160C] selection:text-white min-h-[80vh]">
      {/* 1. PAGE HEADER */}
      <section className="py-10 sm:py-14 bg-[#FFF9F2] border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[46px] text-[#7F160C] tracking-tight">
            {lang === "hi" ? "प्रमुख सेवा प्रकल्प एवं पहल" : "Key Initiatives"}
          </h1>
          <HeadingDivider className="mt-3" />
          <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-widest mt-2">
            Matrimonial • Job • Business Exchange • Blood Donation
          </p>
        </div>
      </section>

      {/* 2. COMING SOON SECTION */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Notice Box */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#E8DFD3] p-10 sm:p-14 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#7F160C]/10 text-[#7F160C] flex items-center justify-center mx-auto border border-[#7F160C]/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
                {lang === "hi" ? "पहल एवं प्रकल्प विवरण शीघ्र उपलब्ध होगा" : "Initiatives Data Coming Soon"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
                {lang === "hi"
                  ? "अग्रवाल वैश्य विकास संगठन के इन चारों प्रमुख प्रकल्पों (Matrimonial, Job, Business Exchange एवं Blood Donation) का संपूर्ण विवरण, पंजीकरण एवं हेल्पलाइन शीघ्र ही संगठन द्वारा जारी की जाएगी।"
                  : "Detailed registration guidelines, directories, and portals for Matrimonial, Job, Business Exchange, and Blood Donation initiatives will be launched soon."}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#7F160C] bg-[#FFF9F2] px-4 py-2 rounded-full border border-[#7F160C]/20">
              <span className="w-2 h-2 rounded-full bg-[#7F160C] animate-pulse" />
              <span>{lang === "hi" ? "डेटा एवं विवरण प्रक्रियाधीन है" : "Data & Portal Under Preparation"}</span>
            </div>
          </div>

          {/* 4 Cards Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {initiativeCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-xs flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFF9F2] border border-[#7F160C]/20 text-[#7F160C] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans font-bold text-base sm:text-lg text-gray-900">
                        {card.titleEn}
                      </h3>
                      <span className="text-[10px] font-bold text-[#7F160C] bg-[#7F160C]/10 px-2 py-0.5 rounded-md">
                        {card.titleHi}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {lang === "hi" ? card.descHi : card.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back Home */}
          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#7F160C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#69120A] transition-colors shadow-xs"
            >
              ← {lang === "hi" ? "मुख्य पृष्ठ पर वापस जाएं" : "Return to Homepage"}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
