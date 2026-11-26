import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const regNo = url.searchParams.get("regNo")?.trim() || "";
    const phone = url.searchParams.get("phone")?.trim() || "";

    if (!regNo && !phone) {
      return NextResponse.json({ error: "regNo or phone is required" }, { status: 400 });
    }

    const conditions: any[] = [];
    if (regNo) {
      conditions.push({ registrationNo: { equals: regNo, mode: "insensitive" } });
    }
    if (phone) {
      const clean = phone.replace(/\D/g, "");
      conditions.push({ phone: { contains: clean.length >= 10 ? clean.slice(-10) : clean } });
    }

    const reg = await prisma.membershipRegistration.findFirst({
      where: { OR: conditions },
      select: {
        registrationNo: true,
        fullName: true,
        status: true,
        planName: true,
        amount: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });

    if (!reg) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      registrationNo: reg.registrationNo,
      status: reg.status,
      isVerified: reg.status === "VERIFIED",
      fullName: reg.fullName,
      planName: reg.planName,
      amount: reg.amount,
      phone: reg.phone,
      email: reg.email,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (err: any) {
    console.error("[membership/status] Error:", err);
    return NextResponse.json({ error: "Failed to check status" }, { status: 500 });
  }
}
