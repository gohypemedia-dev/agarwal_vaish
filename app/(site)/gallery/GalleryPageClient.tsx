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

      {/* Top subtle badge indicating type or section */}
      {item.section === "press-release" && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-[#7F160C] text-white text-[10px] font-bold shadow-sm">
          {lang === "hi" ? "प्रेस विज्ञप्ति" : "Press Release"}
        </div>
      )}
      {item.section === "news-circulars" && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-emerald-800 text-white text-[10px] font-bold shadow-sm">
          {lang === "hi" ? "समाचार" : "News"}
        </div>
      )}
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
      /talent|felicitation|youth|student|scholarship|सम्मान|प्रतिभा|छात्रवृत्ति|युवा/i.test(
        `${i.event || ""} ${i.eventHi || ""} ${i.title || ""} ${i.titleHi || ""}`
      ),
  },
  {
    key: "women-empowerment",
    labelEn: "Women Empowerment",
    labelHi: "महिला सशक्तिकरण",
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

export interface GalleryPageClientProps {
  initialItems?: GalleryItem[];
  section?: "photos" | "videos" | "press-release" | "news-circulars" | "all";
  headingEnPrefix?: string;
  headingEnHighlight?: string;
  headingHiPrefix?: string;
  headingHiHighlight?: string;
  subheadingEn?: string;
  subheadingHi?: string;
}

export default function GalleryPageClient({
  initialItems,
  section = "photos",
  headingEnPrefix = "Photo ",
  headingEnHighlight = "Gallery",
  headingHiPrefix = "फोटो ",
  headingHiHighlight = "गैलरी",
  subheadingEn = "A glimpse into the cherished moments, celebrations, and community initiatives of Aggarwal Vaish Samaj Haryana.",
  subheadingHi = "अग्रवाल वैश्य समाज हरियाणा के आयोजनों, सम्मेलनों और समाज सेवा के यादगार पलों की खूबसूरत झलकियाँ।",
}: GalleryPageClientProps = {}) {
  const { lang } = useApp();

  const [items, setItems] = useState<GalleryItem[]>(
    initialItems && initialItems.length > 0 ? initialItems : galleryData
  );

  // Sync with live database gallery items
  React.useEffect(() => {
    const secQuery = section && section !== "all" ? `&section=${section}` : "";
    fetch(`/api/gallery?t=${Date.now()}${secQuery}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: GalleryItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.warn("Could not sync live gallery items:", err));
  }, [section]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Filter items strictly by the chosen section (e.g. photos, videos, press-release, news-circulars)
  const filteredItems = useMemo(() => {
    let list = [...items].sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999));

    // Filter by Section
    if (section === "photos") {
      list = list.filter((i) => i.section === "photos" || (!i.section && i.type === "photo"));
    } else if (section === "videos") {
      list = list.filter((i) => i.section === "videos" || (!i.section && i.type === "video"));
    } else if (section === "press-release") {
      list = list.filter((i) => i.section === "press-release" || i.event?.toLowerCase().includes("press"));
    } else if (section === "news-circulars") {
      list = list.filter((i) => i.section === "news-circulars" || i.event?.toLowerCase().includes("circular") || i.event?.toLowerCase().includes("news"));
    }

    // Filter by curated category if applied
    if (selectedCategory !== "all") {
      const activeCat = CURATED_CATEGORIES.find((c) => c.key === selectedCategory);
      if (activeCat) {
        list = list.filter(activeCat.match);
      }
    }

    return list;
  }, [items, section, selectedCategory]);

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

  // Generate page numbers array
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
        {/* TWO-TONE HEADER (NO HORIZONTAL TAB BAR)                              */}
        {/* ==================================================================== */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-[#1E1612]">
              {lang === "hi" ? headingHiPrefix : headingEnPrefix}
            </span>
            <span className="text-[#7F160C]">
              {lang === "hi" ? headingHiHighlight : headingEnHighlight}
            </span>
          </h1>
          <HeadingDivider className="!py-1" />
          <p className="text-sm sm:text-base text-[#5C4D43] leading-relaxed font-sans">
            {lang === "hi" ? subheadingHi : subheadingEn}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* 4-COLUMN LANDSCAPE PHOTO/VIDEO GRID                                  */}
        {/* ==================================================================== */}
        {totalItems === 0 ? (
          <div className="text-center py-16 px-6 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#E7D8C8] text-[#B8893E] flex items-center justify-center mx-auto shadow-xs">
              <Layers className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-editorial text-xl font-bold text-[#1E1612]">
                {lang === "hi" ? "कोई सामग्री उपलब्ध नहीं है" : "No Media Available"}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4D43] leading-relaxed">
                {lang === "hi"
                  ? "इस अनुभाग में अभी कोई फ़ोटो या वीडियो अपलोड नहीं हुआ है। शीघ्र ही अपडेट किया जाएगा।"
                  : "No media has been uploaded to this section yet. Updates will appear here soon."}
              </p>
            </div>
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
        {/* PAGINATION CONTROLS                                                  */}
        {/* ==================================================================== */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E7D8C8]/60">
            <div className="text-xs sm:text-sm text-[#5C4D43]">
              {lang === "hi" ? (
                <>
                  कुल <span className="font-semibold text-[#1E1612]">{totalItems}</span> में से{" "}
                  <span className="font-semibold text-[#1E1612]">
                    {(safeCurrentPage - 1) * pageSize + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-semibold text-[#1E1612]">
                    {Math.min(safeCurrentPage * pageSize, totalItems)}
                  </span>{" "}
                  प्रदर्शित
                </>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-[#1E1612]">
                    {(safeCurrentPage - 1) * pageSize + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-[#1E1612]">
                    {Math.min(safeCurrentPage * pageSize, totalItems)}
                  </span>{" "}
                  of <span className="font-semibold text-[#1E1612]">{totalItems}</span> items
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                aria-label={lang === "hi" ? "पिछला पृष्ठ" : "Previous page"}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#E7D8C8] bg-white text-[#1E1612] hover:bg-[#FAF6F0] hover:border-[#7F160C] disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-[#E7D8C8] disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {lang === "hi" ? "पिछला" : "Prev"}
                </span>
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, idx) => {
                  if (pageNum === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-8 h-8 flex items-center justify-center text-xs text-[#5C4D43]"
                      >
                        …
                      </span>
                    );
                  }
                  const isCurrent = pageNum === safeCurrentPage;
                  return (
                    <button
                      key={`page-${pageNum}`}
                      type="button"
                      onClick={() => setCurrentPage(Number(pageNum))}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isCurrent
                          ? "bg-[#7F160C] text-white shadow-xs"
                          : "bg-white text-[#1E1612] border border-[#E7D8C8] hover:bg-[#FAF6F0] hover:border-[#7F160C]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                aria-label={lang === "hi" ? "अगला पृष्ठ" : "Next page"}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#E7D8C8] bg-white text-[#1E1612] hover:bg-[#FAF6F0] hover:border-[#7F160C] disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-[#E7D8C8] disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <span className="hidden sm:inline">
                  {lang === "hi" ? "अगला" : "Next"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
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
