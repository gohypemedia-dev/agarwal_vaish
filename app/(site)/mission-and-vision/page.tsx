"use client";

import React from "react";
import Image from "next/image";
import HeadingDivider from "@/components/HeadingDivider";

export default function MissionVisionPage() {
  // Authentic Community Objectives (Pic 1 Reference Format)
  const keyObjectives = [
    "हमें सभी चुनावों में 100 प्रतिशत मतदान करना चाहिए। यह हमारा राष्ट्रीय कर्तव्य है। इस तरह से वैश्य समुदाय भी गेम चेंजर हो सकता है।",
    "हमें हर स्तर पर अपने लोगों पर अत्याचार, उत्पीड़न, जबरन वसूली के खिलाफ संयुक्त रूप से प्रतिक्रिया और लड़ाई करनी चाहिए।",
    "हमारे साथ जुड़ने के लिए और उनकी रुचि के विभिन्न उपयोगी घटनाओं के माध्यम से उन्हें सुविधाजनक बनाने के लिए विशेष रूप से 18-35 आयु वर्ग में युवा पीढ़ी को प्रोत्साहित करें।",
    "आर्थिक पिछड़ेपन के आधार पर 14 प्रतिशत आरक्षण की मांग के लिए सशक्त अभियान।",
    "समाज को प्रेरित करने के लिए उत्कृष्ट प्रतिभाओं को पुरस्कार एवं प्रोत्साहन राशि प्रदान करना।",
    "भारत माता की गरिमा और समृद्धि बनाए रखने के लिए हमारे ऐतिहासिक योगदानों, उपलब्धियों और कार्य का प्रचार करें।",
    "वैश्य राजनीतिक नेताओं और कार्यकर्ताओं की आकांक्षा के लिए नेतृत्व कार्यशालाओं का आयोजन करना, जिससे वे पंचायत से संसद तक चुनाव लड़ने के लिए एकता, शक्ति और समर्थन प्रदर्शित कर सकें।",
    "वैश्य समुदाय के परिचय और विवाह सम्मेलन का आयोजन करें।",
    "हमारे महासम्मेलनों की बैठक में हमारे सभी घटक को आमंत्रित किया जाना चाहिए और सम्मान के कारण उनके पदाधिकारियों को दिया जाना चाहिए।",
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column (8 cols): Title & Key Bulleted Objectives */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="font-sans text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-snug">
                  वैश्य समुदाय को सशक्त बनाने और हमारी ऐतिहासिक विरासत और प्रतिष्ठा को बनाए रखने के उद्देश्य।
                </h2>

                <ul className="space-y-3.5 text-sm sm:text-[15px] font-normal leading-relaxed text-gray-800">
                  {keyObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-justify">
                      <span className="text-[#7F160C] font-bold text-base leading-none shrink-0 mt-1">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column (4 cols): Round Emblem with Our Logo (Pic 1 Format) */}
              <div className="lg:col-span-4 flex justify-center items-center py-4 lg:py-0">
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
