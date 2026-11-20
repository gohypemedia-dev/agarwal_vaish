"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function MissionVisionPage() {
  const fivePledges = [
    {
      num: "01",
      titleHi: "राजनीतिक सशक्तिकरण",
      titleEn: "Political Empowerment",
      desc: "वैश्य समाज को राजनीतिक रूप से जागरूक करना तथा लोकतांत्रिक व्यवस्था में उसकी सक्रिय भागीदारी और उचित प्रतिनिधित्व के लिए प्रयास करना।",
    },
    {
      num: "02",
      titleHi: "नारी स्वावलंबन एवं उद्यमिता",
      titleEn: "Women Empowerment & Entrepreneurship",
      desc: "महिलाओं को शिक्षा, कौशल विकास, रोजगार और उद्यमिता के अवसर प्रदान कर आत्मनिर्भर एवं सशक्त बनाना।",
    },
    {
      num: "03",
      titleHi: "युवा नेतृत्व निर्माण",
      titleEn: "Youth Leadership Development",
      desc: "युवाओं में नेतृत्व क्षमता, सामाजिक जिम्मेदारी, संगठनात्मक कौशल और राष्ट्र निर्माण की भावना विकसित करना।",
    },
    {
      num: "04",
      titleHi: "आर्थिक आत्मनिर्भरता",
      titleEn: "Economic Self-Reliance",
      desc: "व्यापार, स्वरोजगार, उद्यमिता, कौशल विकास एवं आपसी सहयोग के माध्यम से समाज की आर्थिक मजबूती को बढ़ावा देना।",
    },
    {
      num: "05",
      titleHi: "संगठित समाज",
      titleEn: "Organised Society",
      desc: "समाज के सभी वर्गों को एक मंच पर जोड़कर एकता, भाईचारे, सहयोग और सामूहिक विकास की भावना को मजबूत करना।",
    },
  ];

  return (
    <div className="w-full bg-[#FFFDF9] text-[#000000] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">
      {/* 1. PAGE HEADER */}
      <section className="py-10 sm:py-14 bg-[#FFF9F2] border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <div className="text-xs sm:text-sm font-bold tracking-widest text-[#7F160C] uppercase mb-1">
            CORE FOUNDATIONAL GOALS
          </div>
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            OUR MISSION & VISION
          </h1>
          <p className="font-sans text-lg md:text-xl font-medium text-black">
            हमारा मिशन एवं विजन
          </p>
        </div>
      </section>

      {/* 2. MISSION & VISION BODY */}
      <section className="py-10 sm:py-16 bg-[#FFFDF9]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E8DFD3] p-6 sm:p-10 lg:p-12 space-y-8">
            
            {/* Our Mission */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold text-[#7F160C] uppercase tracking-wider block">
                MISSION
              </span>
              <h2 className="font-sans text-lg md:text-xl font-medium text-black">
                हमारा मिशन (Our Mission)
              </h2>

              <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
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
            <div className="space-y-3 pt-6 border-t border-[#E8DFD3]">
              <span className="text-xs sm:text-sm font-bold text-[#7F160C] uppercase tracking-wider block">
                VISION
              </span>
              <h2 className="font-sans text-lg md:text-xl font-medium text-black">
                हमारा विजन (Our Vision)
              </h2>

              <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
                <p>
                  एक ऐसे <strong>संगठित, आत्मनिर्भर एवं सशक्त अग्रवाल वैश्य समाज</strong> का निर्माण करना, जहां युवा नेतृत्वकर्ता बनें, महिलाएं उद्यमी एवं आत्मनिर्भर बनें, समाज को राजनीतिक एवं आर्थिक क्षेत्र में उचित प्रतिनिधित्व मिले और सामूहिक शक्ति के माध्यम से समाज एवं राष्ट्र के विकास में अग्रणी भूमिका निभाई जाए।
                </p>
                
                <p className="font-sans text-lg md:text-xl font-medium text-[#7F160C] pt-1">
                  हमारा संकल्प – संगठित समाज, सशक्त नेतृत्व और आत्मनिर्भर भविष्य।
                </p>

                <p>
                  हमारा विश्वास है – संगठित समाज ही सशक्त समाज है और सशक्त समाज ही विकसित राष्ट्र की आधारशिला है।
                </p>
              </div>
            </div>

            {/* Five Pledges Grid (Official 2nd Pic Card Style with AVS Emblem) */}
            <div className="space-y-6 pt-6 border-t border-[#E8DFD3]">
              <div>
                <h3 className="font-sans text-lg md:text-xl font-medium text-black">
                  हमारे पाँच प्रमुख संकल्प (Our Five Pledges)
                </h3>
                <p className="text-sm font-medium text-black/70 mt-1 font-sans">
                  Five guiding commitments shaping a united, empowered and progressive Vaish community.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {fivePledges.map((pledge) => (
                  <div
                    key={pledge.num}
                    className="rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-100/80 shadow-md bg-white flex flex-col justify-between select-none"
                  >
                    {/* Top Solid Brand Swatch Section (#7F160C) */}
                    <div className="relative bg-[#7F160C] h-[130px] sm:h-[150px] flex items-center justify-center p-4 sm:p-6 text-center shadow-inner">
                      <h4 className="font-sans text-lg md:text-xl font-medium text-white leading-tight drop-shadow-sm px-2">
                        {pledge.titleHi}
                      </h4>
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
                      <h5 className="font-sans font-medium text-base sm:text-lg text-black leading-tight">
                        {pledge.titleEn}
                      </h5>

                      {/* Line-dot-line in Brand Swatch Color */}
                      <div className="flex items-center justify-center gap-1.5 my-2.5 sm:my-3" aria-hidden="true">
                        <span className="w-8 sm:w-12 h-[2px] bg-[#7F160C] rounded-full" />
                        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#7F160C]" />
                        <span className="w-8 sm:w-12 h-[2px] bg-[#7F160C] rounded-full" />
                      </div>

                      <p className="text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 font-sans px-1 text-center">
                        {pledge.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* 6th Card: Slogan Banner Card in exact same size/proportions */}
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#69120A] shadow-md bg-gradient-to-br from-[#7F160C] to-[#69120A] text-white flex flex-col justify-between p-6 sm:p-8 select-none text-center">
                  <div className="space-y-4 my-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-200 block">
                      हमारा मूल मंत्र
                    </span>
                    <h4 className="font-sans font-bold text-xl sm:text-2xl text-white leading-snug">
                      संगठन से शक्ति, नेतृत्व से पहचान, स्वावलंबन से विकास।
                    </h4>
                    <div className="flex items-center justify-center gap-1.5 my-2" aria-hidden="true">
                      <span className="w-8 h-[2px] bg-amber-300 rounded-full" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                      <span className="w-8 h-[2px] bg-amber-300 rounded-full" />
                    </div>
                    <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
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
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
