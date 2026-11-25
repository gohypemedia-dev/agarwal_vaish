import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/server/auth";
import { jsonError } from "@/lib/server/http";
import { prisma } from "@/lib/server/prisma";

const itemSchema = z.object({
  type: z.enum(["PHOTO", "VIDEO", "photo", "video"]).default("PHOTO").transform((v) => v.toUpperCase() as "PHOTO" | "VIDEO"),
  section: z.string().trim().max(50).default("photos"),
  title: z.string().trim().min(1, "Title is required").max(200),
  titleHi: z.string().trim().max(200).optional().nullable(),
  event: z.string().trim().max(100).optional().nullable(),
  eventHi: z.string().trim().max(100).optional().nullable(),
  src: z.string().trim().min(1, "Media Source URL is required"),
  thumbnail: z.string().trim().min(1, "Thumbnail URL is required"),
  alt: z.string().trim().min(1, "Alt text is required for accessibility").max(255),
  videoProvider: z.enum(["youtube", "vimeo", "mp4"]).optional().nullable(),
  focalPoint: z.string().trim().max(50).optional().nullable(),
  aspectRatio: z.string().trim().max(20).optional().nullable(),
  displayOrder: z.coerce.number().int().default(0),
  date: z.string().trim().max(50).optional().nullable(),
  isActive: z.boolean().default(true),
});

export async function GET(request: Request) {
  const admin = await requireAdminApi(request);
  if (admin instanceof Response) return admin;

  const items = await prisma.galleryItem.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return Response.json({ items }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("[GALLERY_POST] DATABASE_URL is not set!");
      return jsonError("Database not configured. Please add DATABASE_URL in Vercel settings.", 500);
    }

    const admin = await requireAdminApi(request);
    if (admin instanceof Response) return admin;

    const body = await request.json().catch(() => null);
    const parsed = itemSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(", ");
      return jsonError(message, 400);
    }

    const data = parsed.data;

    const item = await prisma.galleryItem.create({
      data: {
        type: data.type,
        section: data.section || (data.type === "VIDEO" ? "videos" : "photos"),
        title: data.title,
        titleHi: data.titleHi || null,
        event: data.event || null,
        eventHi: data.eventHi || null,
        src: data.src,
        thumbnail: data.thumbnail,
        alt: data.alt,
        videoProvider: data.videoProvider || null,
        focalPoint: data.focalPoint || null,
        aspectRatio: data.aspectRatio || (data.type === "VIDEO" ? "16/9" : null),
        displayOrder: data.displayOrder,
        date: data.date || null,
        isActive: data.isActive,
      },
    });

    // Revalidate frontend pages so updates show immediately
    try {
      revalidatePath("/gallery");
      revalidatePath("/gallery/videos");
      revalidatePath("/press-releases");
      revalidatePath("/news-circulars");
      revalidatePath("/");
    } catch (e) {
      console.warn("Revalidation notice:", e);
    }

    return Response.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error("[GALLERY_POST_ERROR]", error);
    const msg = error instanceof Error ? error.message : "Failed to create gallery item";
    return jsonError(msg, 500);
  }
}
