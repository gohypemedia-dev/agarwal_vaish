"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryModal from "@/components/gallery/GalleryModal";
import HeadingDivider from "@/components/HeadingDivider";

type MediaFilter = "all" | "photos" | "videos";

interface GalleryCardProps {
  item: GalleryItem;
  title: string;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  lang: string;
}

function GalleryCard({ item, title, onOpen, lang }: GalleryCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isVideo = item.type === "video";

  const isItem9 =
    item.id === "avs-gal-9" ||
    item.src?.includes("avs-gallery-09") ||
    item.thumbnail?.includes("avs-gallery-09");
  const computedObjectPosition = isItem9 ? "center 56%" : item.focalPoint || "center 20%";

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(e as any);
        }
      }}
      aria-label={`${lang === "hi" ? "देखें" : "View"}: ${title}`}
      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#E7D8C8]/30 border border-[#E7D8C8] shadow-[0_4px_16px_-4px_rgba(43,32,26,0.1)] hover:shadow-[0_12px_28px_-6px_rgba(127,22,12,0.25)] hover:border-[#7F160C] transition-all duration-300 block cursor-pointer select-none"
    >
      {/* Media: Video or Photo */}
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.thumbnail}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
          />

          {/* Centered Play Button (fades out when video plays on hover) */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
              isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-[#7F160C]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#7F160C] transition-transform duration-300">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
        </>
      ) : (
        <Image
          src={item.thumbnail}
          alt={item.alt || title}
          fill
          loading="lazy"
          unoptimized={item.thumbnail.startsWith("http") && !item.thumbnail.includes("r2.dev") && !item.thumbnail.includes("youtube.com") && !item.thumbnail.includes("unsplash.com")}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
          style={{ objectPosition: computedObjectPosition }}
        />
      )}

      {/* Top subtle badge indicating type */}
      <div className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/55 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
        <Maximize2 className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

interface CuratedCategory {
  key: string;
  labelEn: string;
  labelHi: string;
  match: (item: GalleryItem) => boolean;
}

const CURATED_CATEGORIES: CuratedCategory[] = [
  {
    key: "convention",
    labelEn: "State Convention & Organisation",
    labelHi: "प्रांतीय सम्मेलन एवं संगठन",
    match: (i) =>
      /convention|organisation|meeting|executive|सम्मेलन|संगठन|बैठक/i.test(
        `${i.event || ""} ${i.eventHi || ""} ${i.title || ""} ${i.titleHi || ""}`
      ),
  },
  {
    key: "talent-youth",
    labelEn: "Youth & Talent Felicitation",
    labelHi: "युवा एवं प्रतिभा सम्मान",
    match: (i) =>
      /talent|youth|felicitation|scholarship|education|युवा|प्रतिभा|सम्मान|छात्रवृत्ति|शिक्षा/i.test(
        `${i.event || ""} ${i.eventHi || ""} ${i.title || ""} ${i.titleHi || ""}`
      ),
  },
  {
    key: "women-empowerment",
    labelEn: "Women Empowerment",
    labelHi: "महिला स्वावलंबन",
    match: (i) =>
      /women|swavalamban|entrepreneurship|महिला|स्वावलंबन|उद्यमिता/i.test(
        `${i.event || ""} ${i.eventHi || ""} ${i.title || ""} ${i.titleHi || ""}`
      ),
  },
  {
    key: "community-food-seva",
    labelEn: "Community & Food Seva",
    labelHi: "समाज सेवा एवं अन्नपूर्णा",
    match: (i) =>
      /food|annapurna|ration|charity|community|अन्नपूर्णा|राशन|सेवा|समाज/i.test(
        `${i.event || ""} ${i.eventHi || ""} ${i.title || ""} ${i.titleHi || ""}`
      ),
  },
  {
    key: "health-blood",
    labelEn: "Health & Blood Donation",
    labelHi: "चिकित्सा एवं रक्तदान",
    match: (i) =>
      /health|medical|blood|donation|camp|चिकित्सा|स्वास्थ्य|रक्तदान|शिविर/i.test(
        `${i.event || ""} ${i.eventHi || ""} ${i.title || ""} ${i.titleHi || ""}`
      ),
  },
  {
    key: "agroha-heritage",
    labelEn: "Agroha Dham & Heritage",
    labelHi: "अग्रोहा धाम एवं सांस्कृतिक",
    match: (i) =>
      /agroha|agrasen|jayanti|cultural|aarti|darshan|अग्रोहा|अग्रसेन|जयंती|सांस्कृतिक|आरती|दर्शन/i.test(
        `${i.event || ""} ${i.eventHi || ""} ${i.title || ""} ${i.titleHi || ""}`
      ),
  },
];

export default function GalleryPageClient({ initialItems }: { initialItems?: GalleryItem[] } = {}) {
  const { lang } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeMediaFilter, setActiveMediaFilter] = useState<MediaFilter>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const currentData = initialItems && initialItems.length > 0 ? initialItems : galleryData;

  // Sort and filter items using curated categories
  const filteredItems = useMemo(() => {
    let list = [...currentData].sort((a, b) => a.displayOrder - b.displayOrder);

    // Filter by curated category
    if (selectedCategory !== "all") {
      const activeCat = CURATED_CATEGORIES.find((c) => c.key === selectedCategory);
      if (activeCat) {
        list = list.filter(activeCat.match);
      }
    }

    // Filter by media type
    if (activeMediaFilter === "photos") {
      list = list.filter((i) => i.type === "photo");
    } else if (activeMediaFilter === "videos") {
      list = list.filter((i) => i.type === "video");
    }

    return list;
  }, [currentData, selectedCategory, activeMediaFilter]);

  // Pagination calculation
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, safeCurrentPage, pageSize]);

  const handleOpenPhoto = (item: GalleryItem, e: React.MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const currentIndex = selectedItem
    ? filteredItems.findIndex((i) => i.id === selectedItem.id)
    : -1;

  const handlePrevItem = () => {
    if (filteredItems.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIdx]);
  };

  const handleNextItem = () => {
    if (filteredItems.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIdx]);
  };

  // Generate page numbers array (with ellipsis for large page counts)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) pages.push("...");
      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (safeCurrentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full bg-[#FFF9F2] min-h-screen py-10 sm:py-16">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* ==================================================================== */}
        {/* TWO-TONE HEADER: Our Gallery (Matching avsharyana.com photo gallery) */}
        {/* ==================================================================== */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-[#1E1612]">
              {lang === "hi" ? "हमारी " : "Our "}
            </span>
            <span className="text-[#7F160C]">
              {lang === "hi" ? "गैलरी" : "Gallery"}
            </span>
          </h1>
          <HeadingDivider className="!py-1" />
          <p className="text-sm sm:text-base text-[#5C4D43] leading-relaxed font-sans">
            {lang === "hi"
              ? "हमारे पावन आयोजनों, सत्संग, गुरुकुल शिक्षा एवं जनकल्याणकारी सेवा कार्यों की दिव्य झलकियाँ।"
              : "A glimpse into the cherished moments, celebrations, and milestones that reflect the spirit and unity of our community."}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* 4-COLUMN LANDSCAPE PHOTO/VIDEO GRID (Matching avsharyana.com)        */}
        {/* ==================================================================== */}
        {totalItems === 0 ? (
          <div className="text-center py-16 px-6 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#E7D8C8] text-[#B8893E] flex items-center justify-center mx-auto shadow-xs">
              <Layers className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-editorial text-xl font-bold text-[#1E1612]">
                {lang === "hi" ? "कोई मीडिया उपलब्ध नहीं है" : "No Media Found"}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4D43] leading-relaxed">
                {lang === "hi"
                  ? "इस श्रेणी में अभी कोई फ़ोटो या वीडियो नहीं मिला।"
                  : "There is currently no media available under this filter."}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setActiveMediaFilter("all");
                setCurrentPage(1);
              }}
              className="px-6 py-2 rounded-lg bg-[#7F160C] text-white font-bold text-xs"
            >
              {lang === "hi" ? "सभी देखें" : "View All"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {paginatedItems.map((item) => {
              const title =
                lang === "hi" && item.titleHi
                  ? item.titleHi
                  : item.event && item.event.length > 0
                  ? item.event
                  : item.title;

              return (
                <GalleryCard
                  key={item.id}
                  item={item}
                  title={title}
                  lang={lang}
                  onOpen={(e) => handleOpenPhoto(item, e)}
                />
              );
            })}
          </div>
        )}

        {/* ==================================================================== */}
        {/* BOTTOM PAGINATION BAR: Total X items | < 1 2 3 ... 9 > | X / page    */}
        {/* ==================================================================== */}
        {totalItems > 0 && (
          <div className="pt-6 sm:pt-8 border-t border-[#E7D8C8] flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Total items counter */}
            <p className="text-xs sm:text-sm font-semibold text-[#5C4D43]">
              {lang === "hi"
                ? `कुल ${totalItems} आइटम`
                : `Total ${totalItems} items`}
            </p>

            {/* Numeric page navigation buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                aria-label="Previous Page"
                className="w-8 h-8 rounded-md bg-white border border-[#E7D8C8] text-[#1E1612] hover:bg-[#FFF5EA] hover:border-[#7F160C] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getPageNumbers().map((p, idx) => {
                if (typeof p === "string") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-8 h-8 flex items-center justify-center text-xs text-[#8C6B3E] font-bold select-none"
                    >
                      ...
                    </span>
                  );
                }

                const isActive = p === safeCurrentPage;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-8 h-8 rounded-md font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#7F160C] text-white shadow-xs"
                        : "bg-white border border-[#E7D8C8] text-[#1E1612] hover:bg-[#FFF5EA] hover:border-[#7F160C]"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                aria-label="Next Page"
                className="w-8 h-8 rounded-md bg-white border border-[#E7D8C8] text-[#1E1612] hover:bg-[#FFF5EA] hover:border-[#7F160C] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 rounded-md border border-[#E7D8C8] bg-white text-xs font-semibold text-[#1E1612] focus:border-[#7F160C] focus:outline-none cursor-pointer"
              >
                <option value="12">12 / page</option>
                <option value="16">16 / page</option>
                <option value="24">24 / page</option>
                <option value="32">32 / page</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      <GalleryModal
        isOpen={isModalOpen}
        item={selectedItem}
        items={filteredItems}
        currentIndex={currentIndex}
        onClose={handleCloseModal}
        onPrev={handlePrevItem}
        onNext={handleNextItem}
        lang={lang}
        lastFocusedElement={lastTriggerRef.current}
      />
    </div>
  );
}
