"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeadingDivider from "@/components/HeadingDivider";

export default function PresidentPage() {
  return (
    <div className="w-full min-h-screen bg-[#FFF9F2] text-[#2B201A] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">

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
                <span>श्री रामप्रताप गुप्ता — संस्थापक अध्यक्ष, अग्रवाल वैश्य विकास संगठन</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>व्यक्ति की पहचान उसके पद से नहीं, बल्कि समाज के लिए किए गए उसके कार्यों से होती है</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>10,000+ नए सदस्य जोड़कर बने ‘मोदी मित्र’ • अग्रवाल युवा सभा में 1,600 महिलाओं को जोड़ने का कीर्तिमान</span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>संगठन • नेतृत्व • स्वावलंबन • विकास</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. PAGE HEADER: ABOUT PRESIDENT (OUR BRAND COLOR #7F160C)    */}
      {/* ============================================================ */}
      <section className="pt-10 sm:pt-14 pb-2 sm:pb-4 bg-[#FFF9F2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            About President
          </h1>
          <HeadingDivider className="mt-3.5" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. MAIN PRESIDENT CONTENT CONTAINER (NO BORDER RADIUS)        */}
      {/* ============================================================ */}
      <section className="py-4 sm:py-8 bg-[#FFF9F2]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Top Leader Card (rounded-none, clean neutral border) */}
          <div className="bg-white rounded-none border border-[#E8DFD3] shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              {/* Left Photo filling full height */}
              <div className="md:col-span-5 relative min-h-[360px] sm:min-h-[420px] md:min-h-full w-full bg-[#1F150E]">
                <Image
                  src="/images/agarwal/founder-ram-pratap-gupta.jpg"
                  alt="श्री रामप्रताप गुप्ता - संस्थापक अध्यक्ष"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Right Content */}
              <div className="md:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#1F150E] leading-tight">
                    Our<br />
                    Founder President
                  </h2>

                  <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                    Born on <strong>1st November 1966</strong> in Kaithal, Haryana, Ram Pratap Gupta is a distinguished social worker, senior political leader, entrepreneur and visionary who has dedicated nearly three decades of his life to social service and community development. A leader known for his simplicity, accessibility and commitment, he believes in creating change through action rather than words.
                  </p>
                </div>

                {/* Overlapping Floating Badge at Bottom-Right (rounded-none, clean neutral border) */}
                <div className="mt-6 sm:mt-8 pt-4">
                  <div className="bg-white rounded-none p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-[#E8DFD3] inline-block w-full max-w-sm">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-black tracking-wide uppercase">
                      RAM PRATAP GUPTA
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#7F160C] uppercase tracking-wider mt-0.5">
                      FOUNDER PRESIDENT
                    </p>
                    <div className="w-16 h-[2px] bg-[#7F160C] mt-2 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Biography Section (rounded-none, clean neutral border) */}
          <div className="bg-white rounded-none border border-[#E8DFD3] shadow-xs p-6 sm:p-10 lg:p-12 space-y-6">
            
            {/* Top Quote Header */}
            <h3 className="font-sans text-lg md:text-xl font-medium text-black">
              ‘व्यक्ति की पहचान उसके पद से नहीं, बल्कि समाज के लिए किए गए उसके कार्यों से होती है’
            </h3>

            {/* Biography Prose */}
            <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
              <p>
                ‘व्यक्ति की पहचान उसके पद से नहीं, बल्कि समाज के लिए किए गए उसके कार्यों से होती है’ यही फलसफा है रामप्रताप गुप्ता के व्यक्तित्व का।
              </p>
              <p>
                एक समाज सेवक और एक सक्रिय राजनेता के इतर उन्हें मात्र एक कर्मठ कार्यकर्ता कहलाना अच्छा लगता है। केवल आदर्श की बातें करके लोगों का दिल जीतना नहीं वरन आदर्श स्थापित करके लोगों के दिलों में जगह बनाना रामप्रताप गुप्ता का शगल रहा है।
              </p>
            </div>

            <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans pt-4 border-t border-gray-100">
              <h4 className="font-sans text-lg md:text-xl font-medium text-black">
                एक कर्मठ कार्यकर्ता, दूरदर्शी नेतृत्वकर्ता और समाज के प्रति समर्पित व्यक्तित्व
              </h4>
              <p>
                रामप्रताप गुप्ता के व्यक्तित्व का मूल आधार सेवा, संगठन और समर्पण है। एक समाजसेवक और सक्रिय राजनेता के रूप में विभिन्न जिम्मेदारियों का निर्वहन करने के बावजूद उन्हें स्वयं को एक कर्मठ कार्यकर्ता कहलाना अधिक पसंद है। उनका मानना है कि नेतृत्व का वास्तविक अर्थ पद प्राप्त करना नहीं, बल्कि लोगों के बीच रहकर उनकी अपेक्षाओं को समझना और उनके लिए निरंतर कार्य करना है।
              </p>
              <p>
                राजनीतिक एवं सामाजिक जीवन में उन्होंने विभिन्न जिम्मेदारियों का निर्वहन करते हुए अपनी सक्रिय पहचान बनाई है। नगर परिषद कैथल का चुनाव लड़ते हुए उन्होंने लगभग <strong>13,700 मत</strong> प्राप्त कर अपनी जनस्वीकार्यता और जनसंपर्क का परिचय दिया। भारतीय जनता पार्टी के वरिष्ठ नेता के रूप में वे संगठनात्मक गतिविधियों में निरंतर सक्रिय रहे हैं।
              </p>
              <p>
                भाजपा के राष्ट्रव्यापी सदस्यता अभियान के दौरान उन्होंने कैथल हरियाणा में <strong>10,000 से अधिक नए सदस्यों</strong> को पार्टी से जोड़ने में महत्वपूर्ण भूमिका निभाई। उनके इस उल्लेखनीय योगदान के लिए उन्हें <strong>‘मोदी मित्र’</strong> की उपाधि से सम्मानित किया गया।
              </p>
            </div>

            <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans pt-4 border-t border-gray-100">
              <h4 className="font-sans text-lg md:text-xl font-medium text-black">
                व्यवसाय से आत्मनिर्भरता तक का सफर
              </h4>
              <p>
                व्यापारिक क्षेत्र में भी रामप्रताप गुप्ता की यात्रा प्रेरणादायक रही है। मात्र 22 वर्ष की आयु में उन्होंने रियल एस्टेट के क्षेत्र में कदम रखा और अपनी पहली कॉलोनी विकसित की। दूरदर्शिता, परिश्रम और उद्यमशीलता के बल पर उन्होंने व्यवसाय के क्षेत्र में अपनी अलग पहचान बनाई। वर्तमान में कैथल एवं पंचकूला सहित विभिन्न स्थानों पर उनके व्यावसायिक उपक्रम संचालित हैं।
              </p>
              <p>
                उनका मानना है कि आर्थिक आत्मनिर्भरता किसी भी समाज की वास्तविक मजबूती का आधार है और युवाओं को रोजगार मांगने वाला नहीं, बल्कि रोजगार देने वाला बनना चाहिए।
              </p>
            </div>

            <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans pt-4 border-t border-gray-100">
              <h4 className="font-sans text-lg md:text-xl font-medium text-black">
                अग्रवाल युवा सभा कैथल – संगठन से सशक्तिकरण तक
              </h4>
              <p>
                वर्ष 2025 में रामप्रताप गुप्ता ने अग्रवाल युवा सभा कैथल के प्रधान पद की जिम्मेदारी संभाली। उनके नेतृत्व में संगठन ने सामाजिक सहभागिता और जनसंपर्क के क्षेत्र में नई ऊंचाइयों को छुआ।
              </p>
              <p>
                उनके नेतृत्व की सबसे उल्लेखनीय उपलब्धियों में महिलाओं की भागीदारी को बढ़ावा देना रहा है। जिस अग्रवाल युवा सभा में पहले एक भी महिला सदस्य नहीं थी, आज वहां <strong>लगभग 1,600 महिलाएं</strong> सदस्य के रूप में जुड़ चुकी हैं। यह परिवर्तन उनके महिला सशक्तिकरण के प्रति समर्पण और दूरदर्शी सोच को दर्शाता है।
              </p>
              <p>
                उनकी अध्यक्षता में मातृ दिवस, पितृ दिवस, बैसाखी उत्सव, होली परिवार मिलन समारोह, रक्षाबंधन समारोह सहित अनेक सामाजिक, सांस्कृतिक एवं पारिवारिक कार्यक्रमों का सफल आयोजन किया गया। इन आयोजनों ने समाज के विभिन्न वर्गों को एक मंच पर लाने और पारिवारिक एवं सामाजिक संबंधों को मजबूत करने में महत्वपूर्ण भूमिका निभाई।
              </p>
            </div>

            <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans pt-4 border-t border-gray-100">
              <h4 className="font-sans text-lg md:text-xl font-medium text-black">
                अग्रवाल वैश्य विकास संगठन – एक नई सोच, एक नया संकल्प
              </h4>
              <p>
                लगभग तीन दशकों के सामाजिक अनुभव और समाज की आवश्यकताओं को निकट से समझने के बाद उन्होंने एक ऐसे व्यापक संगठन की आवश्यकता महसूस की, जो पूरे हरियाणा में अग्रवाल वैश्य समाज को एकजुट कर सके और समाज के सर्वांगीण विकास के लिए प्रभावी भूमिका निभाए।
              </p>
              <p>
                इसी दूरदर्शी सोच और दृढ़ संकल्प के साथ <strong>1 नवंबर 2026</strong> को कैथल, हरियाणा से रामप्रताप गुप्ता के नेतृत्व एवं संस्थापक प्रयासों द्वारा <strong>अग्रवाल वैश्य विकास संगठन</strong> की स्थापना की गई।
              </p>
              <p>
                इस संगठन का उद्देश्य केवल समाज को एक मंच पर एकत्रित करना नहीं, बल्कि उसे राजनीतिक, सामाजिक, आर्थिक और शैक्षणिक रूप से सशक्त बनाना है। विशेष रूप से महिलाओं को नेतृत्व एवं उद्यमिता के अवसर प्रदान करना, युवाओं को सामाजिक और राजनीतिक नेतृत्व के लिए तैयार करना, व्यापारियों एवं उद्यमियों के बीच आपसी सहयोग बढ़ाना तथा समाज को संगठित शक्ति के रूप में स्थापित करना उनके प्रमुख संकल्प हैं।
              </p>
              <p>
                उनका विश्वास है कि समाज की वास्तविक प्रगति तभी संभव है, जब महिलाओं को समान अवसर मिलें, युवाओं को उचित मार्गदर्शन मिले और प्रत्येक व्यक्ति संगठन की शक्ति से जुड़कर आगे बढ़े।
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-2">
              <p className="font-sans text-lg md:text-xl font-medium text-[#7F160C]">
                “कल भी समाज के साथ थे, आज भी समाज के साथ हैं और आने वाले कल में भी समाज की उन्नति, एकता और सम्मान के लिए समर्पित रहेंगे।”
              </p>
              <p className="font-medium text-black">
                संगठन • नेतृत्व • स्वावलंबन • विकास
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
