"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import HeadingDivider from "@/components/HeadingDivider";
import { Download, Eye, FileText, X, Check, ExternalLink } from "lucide-react";

interface ResourceItem {
  id: string;
  titleEn: string;
  titleHi: string;
  type: "image" | "pdf";
  categoryEn: string;
  categoryHi: string;
  format: string;
  previewSrc: string;
  downloadUrl: string;
  downloadFileName: string;
  contain?: boolean;
}

const RESOURCES: ResourceItem[] = [
  {
    id: "maharaja-agrasen",
    titleEn: "Maharaja Agrasen",
    titleHi: "महाराजा अग्रसेन जी (पवित्र स्वरूप)",
    type: "image",
    categoryEn: "Divine Inspiration",
    categoryHi: "आराध्य देव",
    format: "PNG • Transparent HD",
    previewSrc: "/images/downloads/maharaja-agrasen.png",
    downloadUrl: "/images/downloads/maharaja-agrasen.png",
    downloadFileName: "Maharaja-Agrasen-Ji.png",
    contain: true,
  },
  {
    id: "founder-rampratap-gupta",
    titleEn: "Shri Rampratap Gupta",
    titleHi: "श्री रामप्रताप गुप्ता जी (संस्थापक)",
    type: "image",
    categoryEn: "Founder & State President",
    categoryHi: "संस्थापक एवं प्रदेशाध्यक्ष",
    format: "JPG • High Resolution",
    previewSrc: "/images/agarwal/founder-ram-pratap-gupta.jpg",
    downloadUrl: "/images/agarwal/founder-ram-pratap-gupta.jpg",
    downloadFileName: "Shri-Rampratap-Gupta-Founder.jpg",
    contain: false,
  },
  {
    id: "avvs-official-logo",
    titleEn: "AVVS Official Logo",
    titleHi: "अग्रवाल वैश्य विकास संगठन लोगो",
    type: "image",
    categoryEn: "Official Emblem",
    categoryHi: "आधिकारिक प्रतीक",
    format: "PNG • Transparent Crest",
    previewSrc: "/images/agarwal/logo.png",
    downloadUrl: "/images/agarwal/logo.png",
    downloadFileName: "AVVS-Official-Logo.png",
    contain: true,
  },
  {
    id: "avs-membership-form",
    titleEn: "AVS Membership Form",
    titleHi: "सदस्यता आवेदन प्रपत्र (ऑफलाइन)",
    type: "pdf",
    categoryEn: "Application Form",
    categoryHi: "सदस्यता प्रपत्र",
    format: "PDF • 3.4 MB Printable",
    previewSrc: "/images/membership-hero-unity.jpg",
    downloadUrl: "/membership-form-avvs.pdf",
    downloadFileName: "AVVS-Membership-Form.pdf",
    contain: false,
  },
  {
    id: "avvs-banner",
    titleEn: "AVVS Official Banner",
    titleHi: "संगठन का आधिकारिक बैनर",
    type: "image",
    categoryEn: "Digital Media",
    categoryHi: "आधिकारिक बैनर",
    format: "JPG • HD Wide Banner",
    previewSrc: "/images/agarwal/hero-banner.jpg",
    downloadUrl: "/images/agarwal/hero-banner.jpg",
    downloadFileName: "AVVS-Official-Banner.jpg",
    contain: false,
  },
  {
    id: "avvs-seal",
    titleEn: "AVVS Square Crest",
    titleHi: "संगठन का वर्गाकार प्रतीक चिह्न",
    type: "image",
    categoryEn: "Official Crest",
    categoryHi: "प्रतीक चिह्न",
    format: "JPG • Square Emblem",
    previewSrc: "/images/agarwal/banner-square.jpg",
    downloadUrl: "/images/agarwal/banner-square.jpg",
    downloadFileName: "AVVS-Square-Seal.jpg",
    contain: false,
  },
  {
    id: "haryana-map",
    titleEn: "Haryana Sangathan Map",
    titleHi: "हरियाणा संगठन जिला मानचित्र",
    type: "image",
    categoryEn: "Sangathan Network",
    categoryHi: "जिला संगठन मानचित्र",
    format: "PNG • District Network",
    previewSrc: "/images/agarwal/haryana-district-map.png",
    downloadUrl: "/images/agarwal/haryana-district-map.png",
    downloadFileName: "AVVS-Haryana-District-Map.png",
    contain: true,
  },
  {
    id: "agroha-dham",
    titleEn: "Agroha Dham Darshan",
    titleHi: "अग्रोहा धाम पावन मंदिर दर्शन",
    type: "image",
    categoryEn: "Sacred Heritage",
    categoryHi: "अग्रोहा पावन धाम",
    format: "JPG • Heritage Temple",
    previewSrc: "/agroha/one.jpeg",
    downloadUrl: "/agroha/one.jpeg",
    downloadFileName: "Agroha-Dham-Temple.jpg",
    contain: false,
  },
];

export default function DownloadsPageClient() {
  const { lang } = useApp();
  const [activeItem, setActiveItem] = useState<ResourceItem | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (item: ResourceItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadingId(item.id);

    try {
      const response = await fetch(item.downloadUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = item.downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: direct anchor trigger
      const link = document.createElement("a");
      link.href = item.downloadUrl;
      link.download = item.downloadFileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  const handleView = (item: ResourceItem) => {
    if (item.type === "pdf") {
      window.open(item.downloadUrl, "_blank", "noopener,noreferrer");
    } else {
      setActiveItem(item);
    }
  };

  return (
    <div className="w-full bg-[#FFF9F2] min-h-screen py-10 sm:py-16">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* ==================================================================== */}
        {/* HEADER SECTION (TWO-TONE HEADLINE & SUBTITLE)                        */}
        {/* ==================================================================== */}
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-[#1E1612]">
              {lang === "hi" ? "डाउनलोड " : "Download "}
            </span>
            <span className="text-[#7F160C]">
              {lang === "hi" ? "संसाधन एवं प्रपत्र" : "Resources"}
            </span>
          </h1>
          <HeadingDivider className="!py-1" />
          <p className="text-sm sm:text-base text-[#5C4D43] leading-relaxed font-sans max-w-2xl mx-auto">
            {lang === "hi"
              ? "अग्रवाल वैश्य विकास संगठन के आधिकारिक लोगो, सदस्यता प्रपत्र, आराध्य देव के पावन चित्र एवं आवश्यक संसाधन आसानी से डाउनलोड करें।"
              : "Download AVS official logo, membership forms, documents and other useful resources quickly and conveniently."}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* 4-COLUMN RESOURCE CARDS GRID                                         */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {RESOURCES.map((item) => {
            const isDownloading = downloadingId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E7D8C8] shadow-[0_4px_16px_-4px_rgba(43,32,26,0.08)] hover:shadow-[0_12px_28px_-6px_rgba(184,137,62,0.22)] hover:border-[#B8893E] transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 group"
              >
                {/* Media Preview Box */}
                <div
                  onClick={() => handleView(item)}
                  className="w-full h-48 sm:h-52 rounded-xl bg-[#FAF6F0] border border-[#E7D8C8]/60 relative flex items-center justify-center p-3 cursor-pointer overflow-hidden group-hover:bg-white transition-colors"
                >
                  {item.type === "pdf" ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center text-center space-y-2 p-2">
                      <Image
                        src={item.previewSrc}
                        alt={item.titleEn}
                        fill
                        className="object-cover opacity-20 blur-[1px] group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border border-[#E7D8C8] text-[#7F160C] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <FileText className="w-7 h-7" />
                      </div>
                      <span className="relative z-10 text-[11px] font-bold text-[#7F160C] uppercase tracking-wider bg-white/90 px-2.5 py-0.5 rounded-full border border-[#E7D8C8]">
                        PDF Document
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.previewSrc}
                        alt={item.titleEn}
                        fill
                        className={`${
                          item.contain ? "object-contain" : "object-cover"
                        } group-hover:scale-105 transition-transform duration-500`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                </div>

                {/* Title & Metadata */}
                <div className="pt-3.5 pb-2 text-center space-y-0.5">
                  <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1E1612] line-clamp-1 group-hover:text-[#7F160C] transition-colors">
                    {lang === "hi" ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-[11px] text-[#5C4D43] font-medium font-sans">
                    {lang === "hi" ? item.categoryHi : item.categoryEn}
                  </p>
                </div>

                {/* Two Action Buttons: View & Download (Matching Screenshot) */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#E7D8C8]/50">
                  {/* View Button (Blue pill) */}
                  <button
                    type="button"
                    onClick={() => handleView(item)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#1D63D8] hover:bg-[#1551B5] active:bg-[#0E3E8E] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    {item.type === "pdf" ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                    <span>{lang === "hi" ? "देखें" : "View"}</span>
                  </button>

                  {/* Download Button (Orange/Gold pill) */}
                  <button
                    type="button"
                    onClick={(e) => handleDownload(item, e)}
                    disabled={isDownloading}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#E88605] hover:bg-[#CF7400] active:bg-[#A85D00] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isDownloading ? (
                      <Check className="w-3.5 h-3.5 animate-bounce" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isDownloading
                        ? lang === "hi"
                          ? "सेव..."
                          : "Saved!"
                        : lang === "hi"
                        ? "डाउनलोड"
                        : "Download"}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Note */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7D8C8] text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-[#5C4D43]">
            {lang === "hi" ? (
              <>
                संगठन के अन्य प्रपत्र, डिजिटल बैनर या सदस्यता संबंधित सहायता के लिए{" "}
                <span className="font-bold text-[#7F160C]">कार्यालय संपर्क</span> पर संदेश भेजें।
              </>
            ) : (
              <>
                For organizational publications, high-resolution media kits, or custom banners, contact the{" "}
                <span className="font-bold text-[#7F160C]">AVVS Media Office</span>.
              </>
            )}
          </p>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* IMAGE PREVIEW LIGHTBOX MODAL                                         */}
      {/* ==================================================================== */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative bg-[#1A1412] text-white rounded-2xl max-w-2xl w-full border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#251D19]">
              <div>
                <h3 className="font-editorial text-lg font-bold text-white">
                  {lang === "hi" ? activeItem.titleHi : activeItem.titleEn}
                </h3>
                <p className="text-[11px] text-[#B8893E]">
                  {lang === "hi" ? activeItem.categoryHi : activeItem.categoryEn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative w-full h-[60vh] max-h-[500px] bg-black/50 flex items-center justify-center p-4">
              <Image
                src={activeItem.previewSrc}
                alt={activeItem.titleEn}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            {/* Modal Footer with Direct Download */}
            <div className="px-5 py-3.5 border-t border-white/10 bg-[#251D19] flex items-center justify-between gap-4">
              <span className="text-xs text-white/60">
                {activeItem.downloadFileName}
              </span>
              <button
                type="button"
                onClick={() => handleDownload(activeItem)}
                className="px-5 py-2 rounded-xl bg-[#E88605] hover:bg-[#CF7400] text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{lang === "hi" ? "डाउनलोड करें" : "Download Resource"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
