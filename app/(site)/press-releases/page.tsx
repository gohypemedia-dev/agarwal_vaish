import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/server/prisma";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryPageClient from "../gallery/GalleryPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "प्रेस विज्ञप्ति | Press Releases - Aggarwal Vaish Vikas Sangathan",
  description:
    "अग्रवाल वैश्य विकास संगठन की प्रमुख गतिविधियों, सामाजिक निर्णयों एवं आयोजनों से संबंधित समाचार पत्रों की कतरनें एवं प्रेस विज्ञप्तियाँ।",
};

export default async function PressReleasesPage() {
  let items: GalleryItem[] = [];

  try {
    const rawDbItems = await prisma.galleryItem.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    const dbItems = rawDbItems.filter(
      (item: any) =>
        item.section === "press-release" ||
        item.event?.toLowerCase().includes("press")
    );

    if (dbItems.length > 0) {
      items = dbItems.map((item) => ({
        id: item.id,
        type: item.type === "PHOTO" ? "photo" : "video",
        section: item.section || "press-release",
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
        (i) => i.section === "press-release" || i.event?.toLowerCase().includes("press")
      );
    }
  } catch (error) {
    console.error("Error fetching press releases:", error);
    items = galleryData.filter(
      (i) => i.section === "press-release" || i.event?.toLowerCase().includes("press")
    );
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
        subheadingEn="Official press coverage, newspaper clippings, and media statements of Aggarwal Vaish Vikas Sangathan."
        subheadingHi="अग्रवाल वैश्य विकास संगठन के आयोजनों एवं वक्तव्यों से संबंधित समाचार पत्रों की कतरनें एवं प्रेस विज्ञप्तियाँ।"
      />
    </Suspense>
  );
}
