import type { Metadata } from "next";
import HeadingDivider from "@/components/HeadingDivider";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "डाउनलोड्स एवं प्रपत्र | Downloads - Aggarwal Vaish Samaj Haryana",
  description: "अग्रवाल वैश्य समाज हरियाणा के सदस्यता फॉर्म, नियमावली एवं आवश्यक प्रपत्र डाउनलोड करें।",
};

const DOWNLOAD_ITEMS = [
  {
    titleEn: "Membership Application Form (Offline)",
    titleHi: "सदस्यता आवेदन प्रपत्र (ऑफलाइन)",
    desc: "अग्रवाल वैश्य समाज हरियाणा की सदस्यता हेतु ऑफलाइन आवेदन फॉर्म डाउनलोड करें।",
    size: "PDF",
    href: "/assets/certificate/sample.pdf",
  },
  {
    titleEn: "Constitution & By-Laws of AVVS",
    titleHi: "संगठन की नियमावली एवं विधान",
    desc: "अग्रवाल वैश्य समाज हरियाणा के उद्देश्य, नियम एवं संगठनात्मक संरचना।",
    size: "PDF",
    href: "/assets/certificate/sample.pdf",
  },
];

export default function DownloadsPage() {
  return (
    <div className="w-full bg-[#FFF9F2] min-h-screen py-12 sm:py-20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-[#1E1612]">डाउनलोड्स एवं </span>
            <span className="text-[#7F160C]">प्रपत्र</span>
          </h1>
          <HeadingDivider className="!py-1" />
          <p className="text-sm sm:text-base text-[#5C4D43] leading-relaxed font-sans">
            अग्रवाल वैश्य समाज हरियाणा के आधिकारिक आवेदन फॉर्म, नियमावली एवं प्रपत्र।
          </p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {DOWNLOAD_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E7D8C8] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md hover:border-[#7F160C] transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E7D8C8] text-[#7F160C] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-[#1E1612]">
                    {item.titleHi}
                  </h3>
                  <p className="text-xs font-semibold text-[#7F160C]">
                    {item.titleEn}
                  </p>
                  <p className="text-xs text-[#5C4D43] pt-1">
                    {item.desc}
                  </p>
                </div>
              </div>

              <a
                href={item.href}
                download
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#7F160C] hover:bg-[#69120A] text-white text-xs font-bold transition-all shrink-0 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>डाउनलोड</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
