import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/server/prisma";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryPageClient from "../GalleryPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "वीडियो गैलरी | Video Gallery - Aggarwal Vaish Vikas Sangathan",
  description:
    "अग्रवाल वैश्य विकास संगठन के प्रांतीय सम्मेलनों, समाज सेवा एवं सांस्कृतिक कार्यक्रमों के विशेष वीडियो।",
};

export default async function VideoGalleryPage() {
  let items: GalleryItem[] = [];

  try {
    const rawDbItems = await prisma.galleryItem.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    const dbItems = rawDbItems.filter(
      (item: any) => item.section === "videos" || item.type === "VIDEO"
    );

    if (dbItems.length > 0) {
      items = dbItems.map((item) => ({
        id: item.id,
        type: item.type === "PHOTO" ? "photo" : "video",
        section: item.section || "videos",
        title: item.title,
        titleHi: item.titleHi ?? undefined,
        event: item.event ?? undefined,
        eventHi: item.eventHi ?? undefined,
        src: item.src,
        thumbnail: item.thumbnail,
        alt: item.alt,
        videoProvider: (item.videoProvider as "youtube" | "vimeo" | "mp4" | null) ?? undefined,
        focalPoint: item.focalPoint ?? undefined,
        aspectRatio: item.aspectRatio ?? undefined,
        displayOrder: item.displayOrder,
        date: item.date ?? undefined,
      }));
    } else {
      items = galleryData.filter((i) => i.type === "video" || i.section === "videos");
    }
  } catch (error) {
    console.error("Error fetching video gallery:", error);
    items = galleryData.filter((i) => i.type === "video" || i.section === "videos");
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF9F2]" />}>
      <GalleryPageClient
        initialItems={items}
        section="videos"
        headingEnPrefix="Video "
        headingEnHighlight="Gallery"
        headingHiPrefix="वीडियो "
        headingHiHighlight="गैलरी"
        subheadingEn="Watch video highlights, speeches, and recordings of statewide conventions and social welfare drives."
        subheadingHi="प्रांतीय सम्मेलनों, प्रेरणादायक उद्बोधनों एवं जनकल्याणकारी आयोजनों के विशेष वीडियो।"
      />
    </Suspense>
  );
}
