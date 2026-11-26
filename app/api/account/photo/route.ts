import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { identifier, photoUrl } = body;

    if (!identifier || typeof identifier !== "string" || !identifier.trim()) {
      return NextResponse.json({ error: "Identifier is required" }, { status: 400 });
    }

    if (!photoUrl || typeof photoUrl !== "string" || !photoUrl.trim()) {
      return NextResponse.json({ error: "Photo data is required" }, { status: 400 });
    }

    const trimmedUrl = photoUrl.trim();
    if (
      !trimmedUrl.startsWith("data:image/") &&
      !trimmedUrl.startsWith("http://") &&
      !trimmedUrl.startsWith("https://") &&
      !trimmedUrl.startsWith("/")
    ) {
      return NextResponse.json({ error: "Invalid photo format" }, { status: 400 });
    }

    const id = identifier.trim();
    const digitsOnly = id.replace(/\D/g, "");
    const cleanPhone = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;
    const isEmail = id.includes("@");
    const isRegNo = id.toUpperCase().startsWith("AVVS");

    const conditions: any[] = [];
    if (isRegNo || id.length > 5) {
      conditions.push({ registrationNo: { equals: id, mode: "insensitive" } });
    }
    if (isEmail) {
      conditions.push({ email: { equals: id.toLowerCase(), mode: "insensitive" } });
    }
    if (cleanPhone.length >= 10) {
      conditions.push({ phone: { contains: cleanPhone } });
    }

    // Update in MembershipRegistration
    const regUpdated = await prisma.membershipRegistration.updateMany({
      where: { OR: conditions },
      data: { photoUrl: trimmedUrl },
    });

    // Also update in Member if exists
    const memberConditions: any[] = [];
    if (cleanPhone.length >= 10) {
      memberConditions.push({ phone: { contains: cleanPhone } });
    }
    if (isEmail) {
      memberConditions.push({ email: { equals: id.toLowerCase(), mode: "insensitive" } });
    }
    if (memberConditions.length > 0) {
      await prisma.member.updateMany({
        where: { OR: memberConditions },
        data: { photoUrl: trimmedUrl },
      }).catch(() => null);
    }

    return NextResponse.json({
      success: true,
      updatedCount: regUpdated.count,
      photoUrl: trimmedUrl,
    });
  } catch (error: any) {
    console.error("[account/photo] Error updating photo:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update profile photo" },
      { status: 500 }
    );
  }
}
