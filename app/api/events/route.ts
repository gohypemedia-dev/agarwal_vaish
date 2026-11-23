import { prisma } from "@/lib/server/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const all = await prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { startDate: "asc" },
    });

    // Upcoming and ongoing events first (soonest first), then past events (most recent first).
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const isPast = (e: (typeof all)[number]) => (new Date(e.endDate ?? e.startDate)) < today;
    const events = [...all.filter((e) => !isPast(e)), ...all.filter(isPast).reverse()];

    return Response.json(
      { events },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch events from database:", error);
    return Response.json({ events: [] }, { status: 200 });
  }
}
