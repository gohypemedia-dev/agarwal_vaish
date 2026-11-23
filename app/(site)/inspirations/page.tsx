"use client";

import React, { useState } from "react";
import Image from "next/image";
import HeadingDivider from "@/components/HeadingDivider";

export default function InspirationsPage() {
  const [selectedFigure, setSelectedFigure] = useState<any>(null);

  // 10 historical inspirations in exact requested sequence & symmetry
  // 1. Maharaja Agrasen, 2. Lala Lajpat Rai, 3. Shaheed Hukum Chand Jain,
  // 4. Shri Fakirchand Ji Aggarwal Jain, 5. Padma Bhushan Shri Darshan Lal Jain Singla,
  // 6. Advocate Babu Shyam Lal Jain, 7. Lala Murlidhar Gupta, 8. Babu Mool Chand Jain,
  // 9. Shri Nand Kishore Goenka, 10. Shri O.P. Jindal
  const inspirations = [
    {
      name: "महाराजा अग्रसेन जी",
      nameEn: "Maharaja Agrasen Ji",
      image: "/images/inspirations/maharaja-agrasen.jpg",
      tagline: "समाजवाद एवं अहिंसा के प्रणेता • अग्रोहा गणराज्य के संस्थापक",
      desc: "5000 वर्ष पूर्व 'एक ईंट और एक रुपया' का विश्व का सर्वप्रथम समाजवादी कल्याणकारी सिद्धांत प्रतिपादित किया। समस्त 18 गोत्रों के प्रवर्तक एवं वैश्य समाज के मूल पुरुष।",
      life: "द्वापर युग के अंत एवं कलि काल के आरंभिक कालखंड",
      contribution: "गणतांत्रिक समाजवाद, अहिंसा, व्यापार संवर्धन और सर्वकल्याणकारी शासन व्यवस्था की स्थापना।",
    },
    {
      name: "लाला लाजपत राय",
      nameEn: "Lala Lajpat Rai",
      image: "/images/inspirations/lala-lajpat-rai.jpg",
      tagline: "पंजाब केसरी • स्वाधीनता संग्राम के अमर महानायक (लाल-बाल-पाल)",
      desc: "हरियाणा व पंजाब के वैश्य कुल के महान सपूत जिन्होंने साइमन कमीशन के विरोध में ब्रिटिश लाठियों का सामना कर अपने प्राणों का सर्वोच्च बलिदान दिया।",
      life: "28 जनवरी 1865 - 17 नवंबर 1928",
      contribution: "पंजाब नेशनल बैंक की स्थापना, आर्य समाज आंदोलन, लक्ष्मी बीमा कंपनी और प्रखर राष्ट्रवादी पत्रकारिता।",
    },
    {
      name: "शहीद हुकम चंद जैन",
      nameEn: "Shaheed Hukum Chand Jain",
      image: "/images/inspirations/hukum-chand-jain.jpg",
      tagline: "1857 के प्रथम स्वाधीनता संग्राम के अमर शहीद (हांसी, हरियाणा)",
      desc: "1857 की क्रांति में हांसी-हिसar से अंग्रेजी हुकूमत के विरुद्ध सशस्त्र संघर्ष का नेतृत्व किया और मातृभूमि की आजादी के लिए फांसी के फंदे को हंसते-हंसते चूमा।",
      life: "1816 - 19 जनवरी 1858",
      contribution: "1857 स्वतंत्रता संग्राम में हरियाणा से अंग्रेजी साम्राज्य के विरुद्ध सशस्त्र जन-विद्रोह का नेतृत्व।",
    },
    {
      name: "श्री फकीरचंद जी अग्रवाल जैन",
      nameEn: "Shri Fakirchand Ji Aggarwal Jain",
      image: "/images/agarwal/logo.png",
      tagline: "समाजसेवी एवं दानवीर विभूति",
      desc: "वैश्य समाज के उत्थान, सामाजिक एकता और जनकल्याणकारी शैक्षणिक व सामाजिक संस्थाओं के संवर्धन में जीवन पर्यन्त समर्पित रहे।",
      life: "20वीं शताब्दी",
      contribution: "वैश्य समाज का संगठन, शिक्षा संस्थानों का निर्माण और सामाजिक समरसता।",
    },
    {
      name: "पद्मभूषण श्री दर्शन लाल जैन सिंगला",
      nameEn: "Padma Bhushan Shri Darshan Lal Jain Singla",
      image: "/images/agarwal/logo.png",
      tagline: "पद्मभूषण अलंकृत • प्रख्यात समाजसेवी व सरस्वती पुनरुद्धार प्रणेता",
      desc: "जगाधरी (हरियाणा) के महान समाजसेवी जिन्होंने विलुप्त सरस्वती नदी के पुनरुद्धार और वनवासी कल्याण के लिए ऐतिहासिक कार्य किया। भारत सरकार द्वारा पद्मभूषण से विभूषित।",
      life: "12 दिसंबर 1927 - 8 फरवरी 2021",
      contribution: "सरस्वती शोध संस्थान, युवा संस्कार केंद्र, वनवासी कल्याण आश्रम और सामाजिक समरसता।",
    },
    {
      name: "एडवोकेट बाबू श्याम लाल जैन",
      nameEn: "Advocate Babu Shyam Lal Jain",
      image: "/images/inspirations/shyam-lal-jain.jpg",
      tagline: "प्रख्यात विधिवेत्ता, स्वतंत्रता सेनानी व सामाजिक मार्गदर्शक",
      desc: "स्वाधीनता आंदोलन के अग्रिम पंक्ति के वैचारिक सेनानी जिन्होंने वैश्य समाज के कानूनी अधिकारों, शैक्षणिक संस्थाओं और जन-चेतना को नई दिशा दी।",
      life: "हरियाणा",
      contribution: "स्वतंत्रता संग्राम में कानूनी सहायता, वैश्य समाज की शिक्षण संस्थाओं की स्थापना और मार्गदर्शन।",
    },
    {
      name: "लाला मुरलीधर गुप्त",
      nameEn: "Lala Murlidhar Gupta",
      image: "/images/inspirations/murlidhar-gupta.jpg",
      tagline: "राय बहादुर • 'ग्रैंड ओल्ड मैन ऑफ पंजाब' • कांग्रेस के संस्थापक सदस्य",
      desc: "अंबाला (हरियाणा) के गौरव जिन्होंने 1885 में भारतीय राष्ट्रीय कांग्रेस के प्रथम अधिवेशन में हरियाणा का प्रतिनिधित्व किया। स्वदेशी आंदोलन के प्रणेता।",
      life: "1848 - 1922",
      contribution: "कांग्रेस के संस्थापक सदस्य, अंबाला में प्रथम गौशाला व अनाथालय, स्वदेशी आंदोलन का शंखनाद।",
    },
    {
      name: "बाबू मूलचंद जैन",
      nameEn: "Babu Mool Chand Jain",
      image: "/images/inspirations/mool-chand-jain.jpg",
      tagline: "हरियाणा के गांधी • स्वतंत्रता सेनानी, पूर्व वित्तमंत्री व गांधीवादी चिंतक",
      desc: "करनाल-गोहाना के महान सपूत जिन्होंने विनोबा भावे के भूदान आंदोलन और नशाबंदी अभियान का नेतृत्व किया। निष्कलंक राजनीति के अप्रतिम आदर्श।",
      life: "20 अगस्त 1915 - 12 सितंबर 1997",
      contribution: "भूदान आंदोलन, संयुक्त पंजाब व हरियाणा के वित्तमंत्री, गांधीवादी सिद्धांतों का प्रचार।",
    },
    {
      name: "श्री नंद किशोर गोयनका",
      nameEn: "Shri Nand Kishore Goenka",
      image: "/images/inspirations/nand-kishore-goenka.jpg",
      tagline: "वैश्य समाज के गौरव, वरिष्ठ उद्योगपति एवं दानवीर",
      desc: "उद्योग जगत में सात्विक व्यापार के प्रतीक और जनकल्याण, धर्म संवर्धन व निर्धनों की सहायता में अग्रणी दानवीर विभूति।",
      life: "20वीं शताब्दी",
      contribution: "धार्मिक व सामाजिक संस्थाओं की स्थापना, समाज कल्याण और औद्योगिक स्वावलंबन।",
    },
    {
      name: "श्री ओ.पी. जिंदल",
      nameEn: "Shri O.P. Jindal",
      image: "/images/inspirations/op-jindal.jpg",
      tagline: "जिंदल समूह के संस्थापक • प्रख्यात उद्योगपति, पूर्व मंत्री व जननायक",
      desc: "हिसार (हरियाणा) में एक किसान परिवार से निकलकर वैश्विक स्टील साम्राज्य (Jindal Group) की स्थापना की। हरियाणा के विकास पुरुष और कर्मयोगी जननायक।",
      life: "7 अगस्त 1930 - 31 मार्च 2005",
      contribution: "जिंदल स्टील समूह की स्थापना, हरियाणा के ऊर्जा व वित्त मंत्री, शिक्षा-स्वास्थ्य व रोजगार क्रांति।",
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

      {/* 2. SYMMETRIC GRID (10 FIGURES - 2x5 Desktop, 2x5 Mobile) */}
      <section className="py-10 sm:py-16 bg-[#FFFDF9]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-1">
            <h2 className="font-sans text-lg md:text-xl font-medium text-black">
              जिनके पदचिन्हों पर चलकर समाज को नई दिशा मिलती है
            </h2>
            <p className="text-sm md:text-base font-medium leading-7 text-black/80 font-sans">
              वैश्य समाज का इतिहास राष्ट्रनिर्माण, त्याग, विद्या और नेतृत्व के स्वर्णिम अध्यायों से समृद्ध है।
            </p>
          </div>

          {/* Symmetrical Grid matching reference avsharyana.com */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {inspirations.map((fig, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFigure(fig)}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFD3] shadow-2xs hover:shadow-md hover:border-[#7F160C] transition-all flex flex-col items-center justify-between cursor-pointer group text-center min-h-[200px]"
              >
                {/* Circular Portrait Photo */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#E8DFD3] group-hover:border-[#7F160C] transition-all shadow-xs bg-[#FAF7F2] shrink-0 mx-auto">
                  <Image
                    src={fig.image}
                    alt={fig.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name & Title */}
                <div className="mt-3 w-full">
                  <h3 className="font-sans font-bold text-sm sm:text-base text-[#1E1612] group-hover:text-[#7F160C] transition-colors leading-snug">
                    {fig.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#7F160C] uppercase tracking-wider mt-1 line-clamp-1">
                    {fig.nameEn}
                  </p>
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

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#7F160C]/30 shadow-xs shrink-0">
                <Image
                  src={selectedFigure.image}
                  alt={selectedFigure.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#7F160C] uppercase tracking-wider bg-[#FFF9F2] px-3 py-1 rounded-full border border-[#7F160C]/20">
                  वैश्य समाज प्रेरणास्रोत
                </span>
                <h3 className="font-sans text-lg md:text-xl font-bold text-black mt-1">
                  {selectedFigure.name}
                </h3>
                <p className="text-xs font-bold text-[#7F160C] uppercase tracking-wide">
                  {selectedFigure.nameEn}
                </p>
              </div>
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
