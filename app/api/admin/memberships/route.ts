import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { requireAdminApi } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    const url = new URL(req.url);
    const q = url.searchParams.get("q")?.trim() || "";
    const status = url.searchParams.get("status") || "ALL";
    const planId = url.searchParams.get("planId") || "ALL";
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status !== "ALL") {
      where.status = status;
    }
    if (planId !== "ALL") {
      where.planId = planId;
    }
    if (q) {
      where.OR = [
        { registrationNo: { contains: q, mode: "insensitive" } },
        { fullName: { contains: q, mode: "insensitive" } },
        { phone: { contains: q } },
        { email: { contains: q, mode: "insensitive" } },
        { district: { contains: q, mode: "insensitive" } },
        { utr: { contains: q } },
      ];
    }

    const [items, total, counts] = await Promise.all([
      prisma.membershipRegistration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.membershipRegistration.count({ where }),
      prisma.membershipRegistration.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
    ]);

    const statusCounts = {
      ALL: 0,
      PENDING_VERIFICATION: 0,
      VERIFIED: 0,
      REJECTED: 0,
    };

    counts.forEach((c) => {
      if (c.status in statusCounts) {
        statusCounts[c.status as keyof typeof statusCounts] = c._count._all;
      }
      statusCounts.ALL += c._count._all;
    });

    return NextResponse.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      counts: statusCounts,
    });
  } catch (error: any) {
    console.error("Admin memberships GET error:", error);
    return NextResponse.json(
      { error: error.message || "Unauthorized or failed to load memberships" },
      { status: error.message?.includes("Redirect") ? 401 : 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    const body = await req.json();
    const { id, status, utr, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Membership ID is required" }, { status: 400 });
    }

    const updated = await prisma.membershipRegistration.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(utr !== undefined ? { utr: utr ? utr.trim() : null } : {}),
        ...(notes !== undefined ? { notes: notes ? notes.trim() : null } : {}),
      },
    });

    if (status === "VERIFIED") {
      try {
        const cleanPhone = updated.phone.replace(/\D/g, "");
        const existingMember = await prisma.member.findFirst({
          where: {
            OR: [
              ...(cleanPhone.length >= 10 ? [{ phone: { contains: cleanPhone.slice(-10) } }] : []),
              ...(updated.email ? [{ email: { equals: updated.email.toLowerCase(), mode: "insensitive" as const } }] : []),
            ],
          },
        });

        if (existingMember) {
          await prisma.member.update({
            where: { id: existingMember.id },
            data: { status: "ACTIVE" },
          });
        } else {
          await prisma.member.create({
            data: {
              name: updated.fullName,
              phone: updated.phone,
              email: updated.email || null,
              status: "ACTIVE",
              tier: updated.planId === "patron" ? "PLATINUM" : updated.planId === "co_patron" ? "GOLD" : "BASIC",
              role: `${updated.planName.split(" ")[0]} Member (${updated.registrationNo})`,
              city: updated.district,
              state: updated.state,
              address: updated.address,
              pincode: updated.pincode,
              photoUrl: updated.photoUrl,
            },
          });
        }
      } catch (syncErr) {
        console.warn("[admin/memberships] Error syncing member to Member table:", syncErr);
      }
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("Admin memberships PATCH error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update membership" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Membership ID is required" }, { status: 400 });
    }

    await prisma.membershipRegistration.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin memberships DELETE error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete membership" },
      { status: 500 }
    );
  }
}
