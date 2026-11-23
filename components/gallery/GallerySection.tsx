"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import useEmblaCarousel from "embla-carousel-react";
import { Play } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryModal from "./GalleryModal";
import HeadingDivider from "@/components/HeadingDivider";
import { TextReveal } from "@/components/animation";

function GalleryCarouselTile({
  item,
  title,
  onOpen,
  lang,
}: {
  item: GalleryItem;
  title: string;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  lang: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isVideo = item.type === "video";

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay aborted or blocked
          });
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
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${lang === "hi" ? "तस्वीर देखें" : "View photo"}: ${title}`}
      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#E7D8C8]/40 border border-[#E7D8C8] shadow-[0_4px_16px_-4px_rgba(43,32,26,0.1)] hover:shadow-[0_12px_28px_-6px_rgba(127,22,12,0.25)] hover:border-[#7F160C] transition-all duration-300 block cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7F160C] focus-visible:outline-none"
    >
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
          {/* Ambient overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />

          {/* Centered Play Button */}
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
        <>
          <Image
            src={item.thumbnail}
            alt={item.alt || title}
            fill
            loading="lazy"
            unoptimized={item.thumbnail.startsWith("http") && !item.thumbnail.includes("r2.dev") && !item.thumbnail.includes("youtube.com") && !item.thumbnail.includes("unsplash.com")}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
            style={{ objectPosition: item.focalPoint || "center" }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
        </>
      )}
    </button>
  );
}

export default function GallerySection({ initialItems }: { initialItems?: GalleryItem[] }) {
  const { lang } = useApp();
  const [items, setItems] = useState<GalleryItem[]>(
    initialItems && initialItems.length > 0 ? initialItems : galleryData
  );
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Fetch live gallery items
  useEffect(() => {
    fetch("/api/gallery?v=avs-photos-v3")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.slice(0, 4));
        }
      })
      .catch((err) => console.warn("Could not fetch live gallery items:", err));
  }, []);

  // Exactly 4 items for static showcase
  const displayItems = useMemo(() => {
    return [...items].slice(0, 4);
  }, [items]);

  /* 
  // Carousel and Autoplay commented out as requested
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);
  */

  // Open photo/video in full lightbox
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
    ? displayItems.findIndex((i) => i.id === selectedItem.id)
    : -1;

  const handlePrevItem = () => {
    if (displayItems.length === 0) return;
    const prevIdx = (currentIndex - 1 + displayItems.length) % displayItems.length;
    setSelectedItem(displayItems[prevIdx]);
  };

  const handleNextItem = () => {
    if (displayItems.length === 0) return;
    const nextIdx = (currentIndex + 1) % displayItems.length;
    setSelectedItem(displayItems[nextIdx]);
  };

  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 lg:py-24 bg-[#FFFDF9] border-t border-[#E8DFD3] scroll-mt-20 relative overflow-hidden"
    >
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==================================================================== */}
        {/* SECTION HEADER: Gallery with line-dot-line divider                    */}
        {/* ==================================================================== */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 text-center">
          <TextReveal
            as="h2"
            className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#7F160C] tracking-wider whitespace-nowrap px-2"
            text={lang === "hi" ? "गैलरी" : "Gallery"}
          />
          <HeadingDivider className="mt-2.5" />
        </div>

        {/* ==================================================================== */}
        {/* 4 IMAGES STATIC GRID (Scroll & Carousel commented out)                */}
        {/* ==================================================================== */}
        {displayItems.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm bg-white/60 rounded-2xl border border-dashed border-[#E8DFD3] max-w-xl mx-auto p-8">
            <p className="font-medium text-[#1E1612]">
              {lang === "hi" ? "जल्द ही नई तस्वीरें एवं वीडियो यहाँ जोड़े जाएँगे।" : "New photos and videos will be added here soon."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {displayItems.map((item) => {
              const title = lang === "hi" && item.titleHi ? item.titleHi : item.title;

              return (
                <div key={item.id} className="w-full">
                  <GalleryCarouselTile
                    item={item}
                    title={title}
                    lang={lang}
                    onOpen={(e) => handleOpenPhoto(item, e)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* ==================================================================== */}
        {/* CAROUSEL PAGINATION DOTS (Commented out)                              */}
        {/* ==================================================================== */}
        {/*
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-9">
          {displayItems.map((_, index) => (
            <span
              key={index}
              className="w-2.5 h-2.5 rounded-full bg-[#1E1612]"
            />
          ))}
        </div>
        */}

        {/* ==================================================================== */}
        {/* VIEW ALL BUTTON                                                      */}
        {/* ==================================================================== */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="#gallery"
            className="inline-flex items-center justify-center px-7 py-2.5 rounded-lg bg-[#7F160C] hover:bg-[#69120A] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>{lang === "hi" ? "सभी देखें" : "View All"}</span>
          </Link>
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR FULLSCREEN PHOTO/VIDEO VIEWING */}
      <GalleryModal
        isOpen={isModalOpen}
        item={selectedItem}
        items={displayItems}
        currentIndex={currentIndex}
        onClose={handleCloseModal}
        onPrev={handlePrevItem}
        onNext={handleNextItem}
        lang={lang}
        lastFocusedElement={lastTriggerRef.current}
      />
    </section>
  );
}
