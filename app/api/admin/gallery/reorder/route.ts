import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/server/auth";
import { jsonError } from "@/lib/server/http";
import { prisma } from "@/lib/server/prisma";

const reorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1),
      displayOrder: z.number().int(),
    })
  ),
});

export async function PUT(request: Request) {
  const admin = await requireAdminApi(request);
  if (admin instanceof Response) return admin;

  const body = await request.json().catch(() => null);
  const parsed = reorderSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Invalid reorder data payload.", 400);
  }

  const { items } = parsed.data;

  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.galleryItem.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    // Force revalidation on frontend pages so rank updates show immediately
    revalidatePath("/gallery");
    revalidatePath("/");

    return Response.json({ success: true, count: items.length });
  } catch (error) {
    console.error("Failed to batch update gallery ranks:", error);
    return jsonError("Failed to update ranks in database.", 500);
  }
}
