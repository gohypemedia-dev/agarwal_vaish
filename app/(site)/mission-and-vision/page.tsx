"use client";

import React from "react";
import Image from "next/image";
import HeadingDivider from "@/components/HeadingDivider";

export default function MissionVisionPage() {
  // Official Key Objectives (20 Points)
  const keyObjectives = [
    "वैश्य समाज की एकता एवं सामाजिक समरसता को मजबूत करने के लिए प्रदेश स्तर पर एक सशक्त संगठनात्मक नेटवर्क तैयार करना।",
    "समाज के युवाओं को प्रशासनिक, राजनीतिक, सामाजिक एवं व्यावसायिक क्षेत्रों में आगे बढ़ने के लिए प्रेरित करना तथा नेतृत्व के अवसर उपलब्ध करवाना।",
    "महिलाओं को आत्मनिर्भर बनाने के लिए स्वरोजगार, उद्यमिता, कौशल विकास एवं आर्थिक सशक्तिकरण से जुड़े कार्यक्रम आयोजित करना।",
    "समाज के प्रतिभाशाली एवं जरूरतमंद विद्यार्थियों को शिक्षा, छात्रवृत्ति, मार्गदर्शन एवं करियर निर्माण में सहयोग प्रदान करना।",
    "वैश्य समाज के व्यापारियों, उद्यमियों एवं पेशेवरों को एक साझा मंच पर लाकर व्यापारिक सहयोग और नए रोजगार के अवसर विकसित करना।",
    "समाज के युवाओं को राजनीति में सक्रिय भागीदारी के लिए प्रोत्साहित करना तथा पंचायत, नगर निकाय, विधानसभा एवं संसद जैसे लोकतांत्रिक मंचों पर नेतृत्व के लिए तैयार करना।",
    "आर्थिक रूप से कमजोर परिवारों की सहायता के लिए शिक्षा, चिकित्सा, विवाह एवं अन्य सामाजिक आवश्यकताओं से संबंधित सहयोग कार्यक्रम चलाना।",
    "समाज की ऐतिहासिक विरासत, महापुरुषों, स्वतंत्रता सेनानियों एवं राष्ट्र निर्माण में अग्रवाल समाज के योगदान का व्यापक प्रचार-प्रसार करना।",
    "समाज की उत्कृष्ट प्रतिभाओं, मेधावी विद्यार्थियों, सामाजिक कार्यकर्ताओं एवं उल्लेखनीय उपलब्धियां हासिल करने वाले व्यक्तियों को सम्मानित करना।",
    "युवाओं के लिए व्यक्तित्व विकास, संवाद कौशल, रोजगार मार्गदर्शन एवं नेतृत्व प्रशिक्षण शिविरों का आयोजन करना।",
    "समाज में स्वास्थ्य के प्रति जागरूकता बढ़ाने के लिए निःशुल्क स्वास्थ्य जांच शिविर, रक्तदान शिविर एवं चिकित्सा सहायता कार्यक्रम आयोजित करना।",
    "समाज की बेटियों को शिक्षा, सुरक्षा, सम्मान एवं समान अवसर उपलब्ध करवाने के लिए विशेष जागरूकता अभियान चलाना।",
    "वैश्य समाज के विभिन्न घटकों, परिवारों एवं सामाजिक संस्थाओं के बीच आपसी समन्वय और सहयोग की भावना विकसित करना।",
    "समाज की जनसंख्या, सामाजिक स्थिति, शैक्षणिक उपलब्धियों एवं आर्थिक भागीदारी से संबंधित जागरूकता और सकारात्मक पहल को बढ़ावा देना।",
    "पर्यावरण संरक्षण, जल संरक्षण, स्वच्छता एवं सामाजिक जिम्मेदारी से जुड़े जनहितकारी अभियानों में सक्रिय भागीदारी करना।",
    "समाज के जरूरतमंद युवाओं को रोजगार एवं व्यवसाय शुरू करने के लिए अनुभवी उद्यमियों और विशेषज्ञों से मार्गदर्शन दिलवाना।",
    "समाज के अधिकारों, हितों एवं समस्याओं को लोकतांत्रिक और संवैधानिक माध्यमों से उचित मंचों तक पहुंचाना।",
    "प्रदेश के प्रत्येक जिले एवं कस्बे में संगठन की इकाइयां स्थापित कर सामाजिक गतिविधियों को जमीनी स्तर तक पहुंचाना।",
    "समाज के सभी वर्गों में आपसी विश्वास, सहयोग, पारदर्शिता एवं सामूहिक जिम्मेदारी की भावना को मजबूत करना।",
    "राष्ट्रहित एवं जनकल्याण को सर्वोपरि रखते हुए समाज की सकारात्मक ऊर्जा को देश और प्रदेश के विकास में लगाना।",
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFF9F2] text-[#2B201A] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">

      {/* ============================================================ */}
      {/* 1. SIMPLE TITLE HEADER (PIC 1 FORMAT WITH OUR COLOR #7F160C) */}
      {/* ============================================================ */}
      <section className="pt-10 sm:pt-14 pb-4 sm:pb-6 bg-[#FFF9F2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            Mission And Vision
          </h1>
          <HeadingDivider className="mt-3.5" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MAIN CARD: PIC 1 REFERENCE FORMAT WITH OUR LOGO & DATA   */}
      {/* ============================================================ */}
      <section className="py-4 sm:py-8 bg-[#FFF9F2]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

          {/* Main Card (rounded-none, clean neutral border #E8DFD3) */}
          <div className="bg-white rounded-none border border-[#E8DFD3] p-6 sm:p-10 lg:p-12 shadow-xs">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Left Column (8 cols): Title & Key Bulleted Objectives */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                    अग्रवाल वैश्य विकास संगठन – हमारे प्रमुख उद्देश्य
                  </h2>
                  <p className="mt-2.5 text-sm sm:text-base font-semibold text-[#7F160C] leading-relaxed">
                    वैश्य समाज को संगठित, सशक्त, आत्मनिर्भर एवं नेतृत्ववान बनाना तथा समाज की ऐतिहासिक पहचान, गौरव और प्रतिष्ठा को नई ऊंचाइयों तक पहुंचाना हमारा संकल्प है।
                  </p>
                </div>

                <ul className="space-y-3.5 text-sm sm:text-[15px] font-normal leading-relaxed text-gray-800">
                  {keyObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-justify">
                      <span className="text-[#7F160C] font-bold text-lg leading-none shrink-0 mt-0.5">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column (4 cols): Round Emblem with Our Logo (Pic 1 Format) */}
              <div className="lg:col-span-4 flex justify-center items-start py-4 lg:py-0 lg:sticky lg:top-28">
                <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-white p-3 border border-[#E8DFD3] shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-105">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/agarwal/logo.png"
                      alt="Aggarwal Vaish Vikas Sangathan Logo"
                      fill
                      className="object-contain p-2"
                      priority
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Detailed Mission & Vision Statements */}
            <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Our Mission */}
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold text-[#7F160C] uppercase tracking-wider block">
                  MISSION
                </span>
                <h3 className="font-sans text-lg md:text-xl font-bold text-gray-900">
                  हमारा मिशन (Our Mission)
                </h3>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 text-justify">
                  <p>
                    अग्रवाल वैश्य समाज को संगठित कर <strong>राजनीतिक सशक्तिकरण, नारी स्वावलंबन एवं उद्यमिता, युवा नेतृत्व निर्माण और आर्थिक आत्मनिर्भरता</strong> को बढ़ावा देना।
                  </p>
                  <p>
                    समाज के प्रत्येक वर्ग को समान अवसर, उचित प्रतिनिधित्व और विकास का मंच प्रदान करते हुए एक <strong>सशक्त, जागरूक एवं संगठित समाज</strong> का निर्माण करना।
                  </p>
                  <p>
                    हरियाणा सहित देशभर के अग्रवाल वैश्य समाज को एक मजबूत संगठनात्मक मंच प्रदान करना तथा सामाजिक, राजनीतिक, आर्थिक एवं शैक्षणिक क्षेत्र में उसकी सक्रिय भागीदारी सुनिश्चित करने की दिशा में कार्य करना है।
                  </p>
                </div>
              </div>

              {/* Our Vision */}
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold text-[#7F160C] uppercase tracking-wider block">
                  VISION
                </span>
                <h3 className="font-sans text-lg md:text-xl font-bold text-gray-900">
                  हमारा विजन (Our Vision)
                </h3>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 text-justify">
                  <p>
                    एक ऐसे <strong>संगठित, आत्मनिर्भर एवं सशक्त अग्रवाल वैश्य समाज</strong> का निर्माण करना, जहां युवा नेतृत्वकर्ता बनें, महिलाएं उद्यमी एवं आत्मनिर्भर बनें, समाज को राजनीतिक एवं आर्थिक क्षेत्र में उचित प्रतिनिधित्व मिले और सामूहिक शक्ति के माध्यम से समाज एवं राष्ट्र के विकास में अग्रणी भूमिका निभाई जाए।
                  </p>
                  <p className="font-semibold text-[#7F160C] text-base pt-1">
                    हमारा संकल्प – संगठित समाज, सशक्त नेतृत्व और आत्मनिर्भर भविष्य।
                  </p>
                  <p>
                    हमारा विश्वास है – संगठित समाज ही सशक्त समाज है और सशक्त समाज ही विकसित राष्ट्र की आधारशिला है।
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
