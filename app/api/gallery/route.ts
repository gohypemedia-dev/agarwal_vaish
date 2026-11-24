import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { galleryData } from "@/data/gallery";

export const revalidate = 60;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

export async function GET() {
  try {
    const dbItems = await prisma.galleryItem.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    if (dbItems && dbItems.length > 0) {
      const items = dbItems.map((item) => ({
        id: item.id,
        type: item.type === "PHOTO" ? "photo" : "video",
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

      return NextResponse.json(items, {
        status: 200,
        headers: CACHE_HEADERS,
      });
    }
  } catch (error) {
    console.error("Error fetching live gallery in /api/gallery:", error);
  }

  // Fallback to static galleryData if database query fails or is empty
  const fallback = [...galleryData].sort(
    (a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999)
  );

  return NextResponse.json(fallback, {
    status: 200,
    headers: CACHE_HEADERS,
  });
}
