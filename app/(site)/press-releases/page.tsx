import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/server/prisma";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryPageClient from "../gallery/GalleryPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "प्रेस विज्ञप्ति | Press Releases - Aggarwal Vaish Samaj Haryana",
  description:
    "अग्रवाल वैश्य समाज (AVS Haryana) की प्रमुख गतिविधियों, सामाजिक निर्णयों एवं आयोजनों से संबंधित समाचार पत्रों की कतरनें एवं प्रेस विज्ञप्तियाँ।",
};

export default async function PressReleasesPage() {
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
    console.error("Error fetching press releases:", error);
    items = galleryData;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF9F2]" />}>
      <GalleryPageClient
        initialItems={items}
        section="press-release"
        headingEnPrefix="Press "
        headingEnHighlight="Releases"
        headingHiPrefix="प्रेस "
        headingHiHighlight="विज्ञप्ति"
        subheadingEn="Official press coverage, newspaper clippings, and media statements of Aggarwal Vaish Samaj Haryana."
        subheadingHi="अग्रवाल वैश्य समाज हरियाणा के आयोजनों एवं वक्तव्यों से संबंधित समाचार पत्रों की कतरनें एवं प्रेस विज्ञप्तियाँ।"
      />
    </Suspense>
  );
}
