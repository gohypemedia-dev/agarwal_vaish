import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/server/prisma";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryPageClient from "./GalleryPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "गैलरी एवं झलकियाँ | Aggarwal Vaish Vikas Sangathan",
  description:
    "अग्रवाल वैश्य विकास संगठन के आयोजनों, सम्मेलनों, युवा व महिला प्रकोष्ठ गतिविधियों और यादगार पलों की खूबसूरत झलकियाँ।",
  openGraph: {
    title: "हमारी झलकियाँ | Photos & Videos Gallery - Aggarwal Vaish Vikas Sangathan",
    description:
      "हमारे आयोजनों, सम्मेलनों और समाज सेवा के यादगार पलों की खूबसूरत झलकियाँ।",
    url: "https://avvs.org/gallery",
    siteName: "Aggarwal Vaish Vikas Sangathan",
    images: [
      {
        url: "/images/agarwal/banner-square.jpg",
        width: 1200,
        height: 630,
        alt: "Aggarwal Vaish Vikas Sangathan Gallery",
      },
    ],
  },
};

export default async function GalleryPage() {
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
        item.section === "photos" || (!item.section && item.type === "PHOTO")
    );

    if (dbItems.length > 0) {
      items = dbItems.map((item) => ({
        id: item.id,
        type: item.type === "PHOTO" ? "photo" : "video",
        section: item.section || "photos",
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
      items = galleryData.filter((i) => i.type === "photo" && i.section !== "press-release");
    }
  } catch (error) {
    console.error("Error fetching gallery items for site:", error);
    items = galleryData.filter((i) => i.type === "photo" && i.section !== "press-release");
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF9F2]" />}>
      <GalleryPageClient initialItems={items} />
    </Suspense>
  );
}
