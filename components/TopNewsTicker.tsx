"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const DEFAULT_TICKER_ITEMS = [
  "संगठन • नेतृत्व • स्वावलंबन • विकास — एकता हमारी शक्ति, विकास हमारा संकल्प",
  "1 नवंबर 2026 : ऐतिहासिक नगरी कैथल से अग्रवाल वैश्य विकास संगठन की स्थापना",
  "संस्थापक अध्यक्ष श्री रामप्रताप गुप्ता के नेतृत्व में संगठित एवं सशक्त समाज",
  "वैश्य समाज का एक ही नारा, राजनीति में हो प्रतिनिधित्व हमारा",
];

const TICKER_ITEMS_BY_PATH: Record<string, string[]> = {
  "/": [
    "वैश्य समाज का एक ही नारा, राजनीति में हो प्रतिनिधित्व हमारा।",
    "अग्रवाल वैश्य विकास संगठन के पंच संकल्प: राजनीतिक सशक्तिकरण, नारी स्वावलंबन एवं उद्यमिता, युवा नेतृत्व निर्माण, आर्थिक आत्मनिर्भरता, संगठित समाज",
    "हमारा लक्ष्य केवल समाज को संगठित करना नहीं, बल्कि उसे नेतृत्व, सामर्थ्य और स्वाभिमान के शिखर तक पहुंचाना है।",
  ],
  "/about": DEFAULT_TICKER_ITEMS,
  "/agroha-dham": [
    "अग्रवाल वैश्य विकास संगठन — अग्रोहा धाम पावन तीर्थ दर्शन",
    "महाराजा अग्रसेन की राजधानी अग्रोहा — वैश्य समाज का सर्वोच्च आस्था केंद्र",
    "संगठन • नेतृत्व • स्वावलंबन • विकास",
  ],
  "/ghatak": [
    "अग्रवाल वैश्य विकास संगठन — 356 वैश्य घटक एकता एवं समग्र विकास",
    "घटकों के भेद मिटाएं, एक होकर वैश्य समाज को सशक्त बनाएं",
    "संगठन • नेतृत्व • स्वावलंबन • विकास",
  ],
  "/panch-sankalp": [
    "अग्रवाल वैश्य विकास संगठन — पंच संकल्प (Panch Sankalp)",
    "संगठन से शक्ति, नेतृत्व से पहचान, स्वावलंबन से विकास",
    "राजनीतिक सशक्तिकरण • नारी स्वावलंबन • युवा नेतृत्व • आर्थिक आत्मनिर्भरता • संगठित समाज",
  ],
  "/president": [
    "श्री रामप्रताप गुप्ता — संस्थापक अध्यक्ष, अग्रवाल वैश्य विकास संगठन",
    "व्यक्ति की पहचान उसके पद से नहीं, बल्कि समाज के लिए किए गए उसके कार्यों से होती है",
    "10,000+ नए सदस्य जोड़कर बने ‘मोदी मित्र’ • अग्रवाल युवा सभा में 1,600 महिलाओं को जोड़ने का कीर्तिमान",
    "संगठन • नेतृत्व • स्वावलंबन • विकास",
  ],
};

/**
 * Full-width scrolling announcement bar rendered directly beneath the fixed navbar
 * across all public site pages.
 */
export default function TopNewsTicker() {
  const pathname = usePathname();
  const items = TICKER_ITEMS_BY_PATH[pathname] ?? DEFAULT_TICKER_ITEMS;

  return (
    <div className="w-full bg-[#7F160C] text-white py-2 sm:py-2.5 overflow-hidden select-none relative z-30 shadow-sm border-b border-[#69120A] print:hidden">
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {[1, 2].map((set) => (
          <div
            key={`ticker-set-${set}`}
            className="flex items-center shrink-0 gap-8 sm:gap-12 px-4 text-xs sm:text-sm font-semibold tracking-wide"
            aria-hidden={set > 1 ? "true" : undefined}
          >
            {items.map((text, idx) => (
              <div key={idx} className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image
                    src="/images/agarwal/logo.png"
                    alt="AVVS"
                    fill
                    className="object-contain"
                  />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
