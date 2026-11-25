import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/server/prisma";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryPageClient from "./GalleryPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "गैलरी एवं झलकियाँ | Aggarwal Vaish Samaj Haryana",
  description:
    "अग्रवाल वैश्य समाज (AVS Haryana) के आयोजनों, सम्मेलनों, युवा व महिला प्रकोष्ठ गतिविधियों और यादगार पलों की खूबसूरत झलकियाँ।",
  openGraph: {
    title: "हमारी झलकियाँ | Photos & Videos Gallery - Aggarwal Vaish Samaj Haryana",
    description:
      "हमारे आयोजनों, सम्मेलनों और समाज सेवा के यादगार पलों की खूबसूरत झलकियाँ। AVS Haryana Gallery.",
    url: "https://avsharyana.com/gallery",
    siteName: "Aggarwal Vaish Samaj Haryana",
    images: [
      {
        url: "/images/agarwal/banner-square.jpg",
        width: 1200,
        height: 630,
        alt: "Aggarwal Vaish Samaj Haryana Gallery",
      },
    ],
  },
};

export default async function GalleryPage() {
  let items: GalleryItem[] = galleryData;

  try {
    const dbItems = await prisma.galleryItem.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    if (dbItems.length > 0) {
      items = dbItems.map((item) => ({
        id: item.id,
        type: item.type === "PHOTO" ? "photo" : "video",
        section: item.section || (item.type === "PHOTO" ? "photos" : "videos"),
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
    }
  } catch (error) {
    console.error("Error fetching gallery items for site:", error);
    items = galleryData;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF9F2]" />}>
      <GalleryPageClient initialItems={items} />
    </Suspense>
  );
}
