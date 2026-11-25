import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/server/prisma";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryPageClient from "../gallery/GalleryPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "समाचार एवं परिपत्र | News & Circulars - Aggarwal Vaish Vikas Sangathan",
  description:
    "अग्रवाल वैश्य विकास संगठन प्रदेश कार्यालय द्वारा जारी आधिकारिक परिपत्र, संगठनात्मक घोषणाएँ एवं ताजा समाचार।",
};

export default async function NewsCircularsPage() {
  let items: GalleryItem[] = [];

  try {
    const rawDbItems = await prisma.galleryItem.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    const dbItems = rawDbItems.filter(
      (item: any) =>
        item.section === "news-circulars" ||
        item.event?.toLowerCase().includes("circular") ||
        item.event?.toLowerCase().includes("news")
    );

    if (dbItems.length > 0) {
      items = dbItems.map((item) => ({
        id: item.id,
        type: item.type === "PHOTO" ? "photo" : "video",
        section: item.section || "news-circulars",
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
      items = galleryData.filter(
        (i) =>
          i.section === "news-circulars" ||
          i.event?.toLowerCase().includes("circular") ||
          i.event?.toLowerCase().includes("news")
      );
    }
  } catch (error) {
    console.error("Error fetching news circulars:", error);
    items = galleryData.filter(
      (i) =>
        i.section === "news-circulars" ||
        i.event?.toLowerCase().includes("circular") ||
        i.event?.toLowerCase().includes("news")
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF9F2]" />}>
      <GalleryPageClient
        initialItems={items}
        section="news-circulars"
        headingEnPrefix="News & "
        headingEnHighlight="Circulars"
        headingHiPrefix="समाचार एवं "
        headingHiHighlight="परिपत्र"
        subheadingEn="Official organizational circulars, notifications, and announcements issued by the state executive."
        subheadingHi="प्रदेश कार्यकारिणी द्वारा जारी आधिकारिक परिपत्र, संगठनात्मक सूचनाएँ एवं नवीनतम समाचार।"
      />
    </Suspense>
  );
}
