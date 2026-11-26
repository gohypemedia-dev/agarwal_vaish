import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { certificateKey } from "@/lib/server/certificate";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identifier = (body.identifier || "").trim();

    if (!identifier) {
      return NextResponse.json(
        { error: "Please enter your registered mobile number, registration number, or email." },
        { status: 400 }
      );
    }

    const digitsOnly = identifier.replace(/\D/g, "");
    const cleanPhone = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;
    const isEmail = identifier.includes("@");
    const isRegNo = identifier.toUpperCase().startsWith("AVVS");

    // 1. Search in MembershipRegistration
    const regConditions: any[] = [];

    if (isRegNo || identifier.length > 5) {
      regConditions.push({ registrationNo: { equals: identifier, mode: "insensitive" } });
    }
    if (isEmail) {
      regConditions.push({ email: { equals: identifier.toLowerCase(), mode: "insensitive" } });
    }
    if (cleanPhone.length >= 10) {
      regConditions.push({ phone: { contains: cleanPhone } });
    } else if (digitsOnly.length > 0) {
      regConditions.push({ phone: { contains: digitsOnly } });
    }

    // Always fallback search query on common fields
    regConditions.push({ registrationNo: { contains: identifier, mode: "insensitive" } });

    const registration = await prisma.membershipRegistration.findFirst({
      where: { OR: regConditions },
      orderBy: [
        // Verified first, then latest
        { status: "asc" },
        { createdAt: "desc" },
      ],
    });

    // 2. Search in Member table (if member was directly added or synced)
    const memberConditions: any[] = [];
    if (cleanPhone.length >= 10) {
      memberConditions.push({ phone: { contains: cleanPhone } });
    }
    if (isEmail) {
      memberConditions.push({ email: { equals: identifier.toLowerCase(), mode: "insensitive" } });
    }
    if (registration?.phone) {
      memberConditions.push({ phone: { contains: registration.phone.slice(-10) } });
    }

    const memberRecord = memberConditions.length > 0
      ? await prisma.member.findFirst({
          where: { OR: memberConditions },
          orderBy: { createdAt: "desc" },
        })
      : null;

    // 3. Search Donations made by this phone or email
    const donationConditions: any[] = [];
    if (cleanPhone.length >= 10) {
      donationConditions.push({ donorPhone: { contains: cleanPhone } });
    }
    if (registration?.phone) {
      donationConditions.push({ donorPhone: { contains: registration.phone.slice(-10) } });
    }
    if (isEmail) {
      donationConditions.push({ donorEmail: { equals: identifier.toLowerCase(), mode: "insensitive" } });
    }
    if (registration?.email) {
      donationConditions.push({ donorEmail: { equals: registration.email.toLowerCase(), mode: "insensitive" } });
    }

    const donations = donationConditions.length > 0
      ? await prisma.donation.findMany({
          where: { OR: donationConditions },
          orderBy: { createdAt: "desc" },
          take: 50,
          select: {
            id: true,
            donorName: true,
            amountPaise: true,
            type: true,
            program: true,
            status: true,
            utr: true,
            createdAt: true,
            verifiedAt: true,
          },
        })
      : [];

    // If nothing found in registrations, members, or donations
    if (!registration && !memberRecord && donations.length === 0) {
      return NextResponse.json({
        success: true,
        found: false,
        message: "No registered member or donation record found with this mobile number or registration number.",
      });
    }

    // Determine normalized tier and status
    let tier = "ACTIVE";
    let planName = "Active Member";
    let planId = "active";
    let amount = 100;
    let status = "PENDING_VERIFICATION";
    let isVerified = false;

    if (registration) {
      status = registration.status;
      isVerified = registration.status === "VERIFIED";
      planId = registration.planId.toLowerCase();
      planName = registration.planName;
      amount = registration.amount;

      if (planId === "patron" || planName.toLowerCase().includes("patron") && !planName.toLowerCase().includes("co")) {
        tier = "PATRON";
      } else if (planId === "co_patron" || planName.toLowerCase().includes("co-patron") || planName.toLowerCase().includes("co patron")) {
        tier = "CO_PATRON";
      } else {
        tier = "ACTIVE";
      }
    } else if (memberRecord) {
      isVerified = memberRecord.status === "ACTIVE";
      status = isVerified ? "VERIFIED" : "PENDING_VERIFICATION";
      const t = (memberRecord.tier || "").toUpperCase();
      if (t === "PATRON" || t === "PLATINUM") {
        tier = "PATRON";
        planName = "Patron Member";
        planId = "patron";
        amount = 100000;
      } else if (t === "CO_PATRON" || t === "GOLD" || t === "SILVER") {
        tier = "CO_PATRON";
        planName = "Co-Patron Member";
        planId = "co_patron";
        amount = 21000;
      } else {
        tier = "ACTIVE";
        planName = "Active Member";
        planId = "active";
        amount = 100;
      }
    } else if (donations.length > 0) {
      // Devotee / donor profile
      status = "DONOR";
      isVerified = donations.some((d) => d.status === "VERIFIED");
      planName = "Supporter / Devotee";
      tier = "ACTIVE";
    }

    const fullName = registration?.fullName || memberRecord?.name || donations[0]?.donorName || "Devotee";
    const phone = registration?.phone || memberRecord?.phone || cleanPhone;
    const email = registration?.email || memberRecord?.email || (isEmail ? identifier : null);
    const regNo = registration?.registrationNo || (memberRecord?.role?.match(/AVVS-[A-Z0-9-]+/)?.[0]) || "AVVS-MEMBER";

    return NextResponse.json({
      success: true,
      found: true,
      isVerified,
      member: {
        id: registration?.id || memberRecord?.id || "member",
        registrationNo: regNo,
        fullName,
        guardianName: registration?.guardianName || null,
        gender: registration?.gender || null,
        caste: registration?.caste || null,
        gotra: registration?.gotra || null,
        phone,
        email,
        dob: registration?.dob || null,
        district: registration?.district || memberRecord?.city || "",
        state: registration?.state || memberRecord?.state || "Haryana",
        address: registration?.address || memberRecord?.address || "",
        wardNumber: registration?.wardNumber || null,
        pincode: registration?.pincode || memberRecord?.pincode || null,
        occupation: registration?.occupation || null,
        occupationDetails: registration?.occupationDetails || null,
        photoUrl: registration?.photoUrl || memberRecord?.photoUrl || null,
        planId,
        planName,
        tier,
        amount,
        status,
        utr: registration?.utr || null,
        notes: registration?.notes || null,
        createdAt: registration?.createdAt || memberRecord?.createdAt || donations[0]?.createdAt,
      },
      donations: donations.map((d) => ({
        id: d.id,
        donorName: d.donorName,
        amount: d.amountPaise / 100,
        type: d.type,
        program: d.program,
        status: d.status,
        utr: d.utr,
        createdAt: d.createdAt,
        verifiedAt: d.verifiedAt,
        certificateKey: certificateKey(d as any),
      })),
    });
  } catch (error: any) {
    console.error("Account lookup error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to lookup account details" },
      { status: 500 }
    );
  }
}
