import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";

export const dynamic = "force-dynamic";

function generateRegNo(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `AVVS-${year}-${randomPart}`;
}

const PLAN_MAP: Record<string, { name: string; amount: number; tier: string }> = {
  patron: { name: "Patron Member (संरक्षक सदस्य)", amount: 100000, tier: "PLATINUM" },
  co_patron: { name: "Co Patron Member (सह-संरक्षक सदस्य)", amount: 21000, tier: "GOLD" },
  active: { name: "Active Member (सक्रिय सदस्य)", amount: 100, tier: "BASIC" },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      guardianName,
      gender,
      caste,
      gotra,
      email,
      phone,
      dob,
      state,
      district,
      address,
      wardNumber,
      pincode,
      occupation,
      occupationDetails,
      photoName,
      photoUrl,
      planId,
      utr,
    } = body;

    // Basic Validation
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json({ error: "Full Name is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (!state || !district || !address) {
      return NextResponse.json({ error: "Address, State and District are required" }, { status: 400 });
    }

    const selectedPlan = PLAN_MAP[planId] || PLAN_MAP["patron"];
    let registrationNo = generateRegNo();

    // Ensure uniqueness
    let exists = await prisma.membershipRegistration.findUnique({
      where: { registrationNo },
      select: { id: true },
    });
    let attempts = 0;
    while (exists && attempts < 5) {
      registrationNo = generateRegNo();
      exists = await prisma.membershipRegistration.findUnique({
        where: { registrationNo },
        select: { id: true },
      });
      attempts++;
    }

    // Save Registration to Neon Postgres
    const record = await prisma.membershipRegistration.create({
      data: {
        registrationNo,
        fullName: fullName.trim(),
        guardianName: guardianName ? guardianName.trim() : null,
        gender: gender || "Not Specified",
        caste: caste ? caste.trim() : null,
        gotra: gotra ? gotra.trim() : null,
        email: email ? email.trim().toLowerCase() : null,
        phone: phone.trim(),
        dob: dob || null,
        state: state.trim(),
        district: district.trim(),
        address: address.trim(),
        wardNumber: wardNumber ? wardNumber.trim() : null,
        pincode: pincode ? pincode.trim() : null,
        occupation: occupation || null,
        occupationDetails: occupationDetails ? occupationDetails.trim() : null,
        photoUrl: photoUrl || photoName || null,
        planId: planId || "patron",
        planName: selectedPlan.name,
        amount: selectedPlan.amount,
        status: "PENDING_VERIFICATION",
        utr: utr ? utr.trim() : null,
      },
    });

    // Also sync to Member table so it's visible in Member list
    await prisma.member.create({
      data: {
        name: fullName.trim(),
        email: email ? email.trim().toLowerCase() : null,
        phone: phone.trim(),
        tier: selectedPlan.tier,
        status: "ACTIVE",
        role: `${selectedPlan.name.split(" ")[0]} Member (${registrationNo})`,
        address: address.trim(),
        city: district.trim(),
        state: state.trim(),
        pincode: pincode ? pincode.trim() : null,
        photoUrl: photoUrl || null,
      },
    }).catch((e) => {
      console.warn("Auto-sync to Member table notice:", e.message);
    });

    return NextResponse.json({
      success: true,
      message: "Membership registration submitted successfully",
      registrationNo: record.registrationNo,
      data: {
        id: record.id,
        registrationNo: record.registrationNo,
        fullName: record.fullName,
        planName: record.planName,
        amount: record.amount,
        createdAt: record.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Membership registration error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process membership registration" },
      { status: 500 }
    );
  }
}
