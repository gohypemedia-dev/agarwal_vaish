"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeadingDivider from "@/components/HeadingDivider";

export default function InspirationsPage() {
  const [selectedFigure, setSelectedFigure] = useState<any>(null);

  const inspirations = [
    {
      name: "महाराजा अग्रसेन जी",
      nameEn: "Maharaja Agrasen Ji",
      tagline: "समाजवाद एवं अहिंसा के जनक • अग्रोहा गणराज्य संस्थापक",
      desc: "5000 वर्ष पूर्व 'एक ईंट और एक रुपया' का विश्व का सर्वप्रथम समाजवादी कल्याणकारी सिद्धांत प्रतिपादित किया। समस्त 18 गोत्रों के प्रवर्तक एवं वैश्य समाज के मूल पुरुष।",
      life: "द्वापर युग के अंत एवं कलि काल के आरंभिक कालखंड",
      contribution: "गणतांत्रिक समाजवाद, अहिंसा, व्यापार संवर्धन और सर्वकल्याणकारी शासन व्यवस्था की स्थापना।",
    },
    {
      name: "राष्ट्रपिता महात्मा गांधी",
      nameEn: "Mahatma Gandhi",
      tagline: "सत्य और अहिंसा के प्रणेता • स्वतंत्रता सेनानी",
      desc: "वैश्य कुल में जन्मे मोहनदास करमचंद गांधी ने सत्य, अहिंसा और सत्याग्रह के दम पर विश्व के सबसे बड़े साम्राज्य को झुकाकर भारत को स्वाधीनता दिलाई।",
      life: "2 अक्टूबर 1869 - 30 जनवरी 1948",
      contribution: "स्वतंत्रता संग्राम, खादी व स्वावलंबन आंदोलन, अस्पृश्यता निवारण और सर्वोदय समाज दर्शन।",
    },
    {
      name: "पंजाब केसरी लाला लाजपत राय",
      nameEn: "Lala Lajpat Rai",
      tagline: "स्वाधीनता संग्राम के अमर सेनानी • लाल-बाल-पाल त्रिमूर्ति",
      desc: "हरियाणा व पंजाब के वैश्य कुल के महान सपूत जिन्होंने साइमन कमीशन के विरोध में ब्रिटिश लाठियों का सामना कर अपने प्राणों का बलिदान दिया।",
      life: "28 जनवरी 1865 - 17 नवंबर 1928",
      contribution: "पंजाब नेशनल बैंक की स्थापना, आर्य समाज आंदोलन, लक्ष्मी बीमा कंपनी और प्रखर राष्ट्रवादी पत्रकारिता।",
    },
    {
      name: "डॉ. राम मनोहर लोहिया",
      nameEn: "Dr. Ram Manohar Lohia",
      tagline: "प्रखर समाजवादी चिंतक • स्वतंत्रता सेनानी व सांसद",
      desc: "भारत में समाजवादी राजनीति के आधारस्तम्भ। गैर-बराबरी, शोषण और अंग्रेजी मानसिकता के खिलाफ देशव्यापी चेतना जगाई।",
      life: "23 मार्च 1910 - 12 अक्टूबर 1967",
      contribution: "सप्तक्रांति सिद्धांत, चौखंभा राज, गोवा मुक्ति आंदोलन और भारतीय समाजवाद के बौद्धिक प्रणेता।",
    },
    {
      name: "देशबंधु लाला देशबंधु गुप्ता",
      nameEn: "Deshbandhu Gupta",
      tagline: "वरिष्ठ पत्रकार, संविधान सभा सदस्य व स्वतंत्रता संग्राम सेनानी",
      desc: "पानीपत (हरियाणा) में जन्मे महान वैश्य नेता जिन्होंने 'रोजाना तेज' समाचार पत्र के माध्यम से राष्ट्रीय चेतना का शंखनाद किया।",
      life: "14 जून 1901 - 21 नवंबर 1951",
      contribution: "भारतीय संविधान सभा के प्रमुख सदस्य, ऑल इंडिया न्यूजपेपर्स एडिटर्स कॉन्फ्रेंस के अध्यक्ष।",
    },
    {
      name: "दानवीर भामाशाह",
      nameEn: "Danveer Bhamashah",
      tagline: "राष्ट्रभक्ति एवं त्याग के अमर प्रतीक • महाराणा प्रताप के सहयोगी",
      desc: "मेवाड़ के संकटकाल में अपना समस्त पैतृक खजाना महाराणा प्रताप के चरणों में समर्पित कर मातृभूमि की रक्षा का मार्ग प्रशस्त किया।",
      life: "1547 - 1600",
      contribution: "मातृभूमि की स्वतंत्रता के लिए ऐतिहासिक धन-समर्पण, दानशीलता और निस्वार्थ राष्ट्रसेवा की सर्वोच्च मिसाल।",
    },
    {
      name: "सेठ जमनालाल बजाज",
      nameEn: "Jamnalal Bajaj",
      tagline: "गांधीजी के पांचवें पुत्र • उद्योगपति व स्वतंत्रता सेनानी",
      desc: "उद्योग जगत के अग्रणी महापुरुष जिन्होंने अपना जीवन और संपत्ति देश की आजादी और गांधीजी के रचनात्मक कार्यों में समर्पित कर दी।",
      life: "4 नवंबर 1889 - 11 फरवरी 1942",
      contribution: "गांधी सेवा संघ, वर्धा आश्रम, खादी प्रचार, हरिजन उत्थान और नैतिक उद्योगिता के आदर्श।",
    },
    {
      name: "दानवीर सेठ छाजू राम",
      nameEn: "Seth Chhaju Ram",
      tagline: "हरियाणा के दानवीर • शिक्षा के अग्रदूत (अलखपुरा, भिवानी)",
      desc: "हरियाणा के भिवानी जिले के अलखपुरा में जन्मे महान वैश्य उद्योगपति, जिन्होंने उत्तर भारत में अनगिनत स्कूल, कॉलेज और अस्पताल स्थापित किए।",
      life: "1865 - 1943",
      contribution: "हिसार जाट कॉलेज, भिवानी कॉलेज और कन्या पाठशालाओं की स्थापना, किसान-मजदूर कल्याण में ऐतिहासिक योगदान।",
    },
  ];

  return (
    <div className="w-full bg-[#FFFDF9] text-[#000000] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">
      {/* 1. PAGE HEADER */}
      <section className="py-10 sm:py-14 bg-[#FFF9F2] border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <div className="text-xs sm:text-sm font-bold tracking-widest text-[#7F160C] uppercase mb-1">
            OUR INSPIRATIONS
          </div>
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            हमारे प्रेरणास्रोत (Our Inspiration)
          </h1>
          <HeadingDivider className="mt-3" />
          <p className="font-sans text-lg md:text-xl font-medium text-black">
            वैश्य समाज के गौरवशाली महापुरुष
          </p>
        </div>
      </section>

      {/* 2. GRID OF INSPIRATIONAL ICONS */}
      <section className="py-10 sm:py-16 bg-[#FFFDF9]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-sans text-lg md:text-xl font-medium text-black">
              जिनके पदचिन्हों पर चलकर समाज को नई दिशा मिलती है
            </h2>
            <p className="text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 font-sans">
              वैश्य समाज का इतिहास राष्ट्रनिर्माण, त्याग, विद्या और नेतृत्व के स्वर्णिम अध्यायों से समृद्ध है।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inspirations.map((fig, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFigure(fig)}
                className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-xs hover:shadow-lg hover:border-[#7F160C] transition-all flex flex-col justify-between space-y-4 cursor-pointer group"
              >
                <div className="space-y-3 text-center">
                  {/* Round AVS Emblem */}
                  <div className="w-16 h-16 rounded-full bg-[#FFF9F2] border border-[#E8DFD3] mx-auto flex items-center justify-center p-2 group-hover:scale-105 transition-transform overflow-hidden shadow-2xs">
                    <Image
                      src="/images/agarwal/logo.png"
                      alt="AVS"
                      width={44}
                      height={44}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-sans text-lg md:text-xl font-medium text-black group-hover:text-[#7F160C] transition-colors">
                      {fig.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#7F160C] uppercase tracking-wider mt-0.5">
                      {fig.nameEn}
                    </p>
                  </div>

                  <p className="text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 line-clamp-3 font-sans">
                    {fig.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-center text-xs font-bold text-[#7F160C]">
                  <span>विस्तार से पढ़ें →</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MODAL FOR DETAILED BIO */}
      {selectedFigure && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedFigure(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black font-bold text-xl flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#7F160C] uppercase tracking-wider bg-[#FFF9F2] px-3 py-1 rounded-full border border-[#7F160C]/20">
                वैश्य समाज गौरव
              </span>
              <h3 className="font-sans text-lg md:text-xl font-medium text-black mt-1">
                {selectedFigure.name}
              </h3>
              <p className="text-xs font-bold text-[#7F160C] uppercase tracking-wide">
                {selectedFigure.nameEn}
              </p>
            </div>

            <p className="text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 bg-[#FFF9F2] p-3 rounded-xl border border-[#E8DFD3] font-sans">
              {selectedFigure.tagline}
            </p>

            <div className="space-y-3 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 font-sans text-justify">
              <p>{selectedFigure.desc}</p>
              <p><strong>कालखंड / जन्म:</strong> {selectedFigure.life}</p>
              <p><strong>राष्ट्र एवं समाज में योगदान:</strong> {selectedFigure.contribution}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedFigure(null)}
                className="px-6 py-2 rounded-xl bg-[#7F160C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#69120A] cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
