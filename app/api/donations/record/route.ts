import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/server/prisma";

export const dynamic = "force-dynamic";

function generateDonationId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DON-${dateStr}-${random}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const { name, email, mobile, amount, utr, program } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const numAmount = Number(amount);
    if (!numAmount || isNaN(numAmount) || numAmount < 1) {
      return NextResponse.json({ error: "Please enter a valid donation amount." }, { status: 400 });
    }

    const amountPaise = Math.round(numAmount * 100);
    const donationId = generateDonationId();
    const upiUri = `upi://pay?pa=aggarwalvaishvikassangathan@idbi&pn=AGGARWAL%20VAISH%20VIKAS%20SANGATHAN&am=${numAmount}&cu=INR`;
    const randomSecret = crypto.randomBytes(16).toString("hex");
    const submitTokenHash = crypto.createHash("sha256").update(randomSecret).digest("hex");

    const donation = await prisma.donation.create({
      data: {
        donationId,
        type: "DONATION",
        program: program && typeof program === "string" ? program.trim() : "General Donation",
        donorName: name.trim(),
        donorEmail: email.trim().toLowerCase(),
        donorMobile: mobile && typeof mobile === "string" ? mobile.trim() : null,
        amountPaise,
        currency: "INR",
        status: "PENDING_VERIFICATION",
        paymentMethod: "UPI_MANUAL",
        upiUri,
        submitTokenHash,
        utr: utr && typeof utr === "string" && utr.trim() ? utr.trim() : null,
        proofSubmittedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        donationId: donation.donationId,
        amount: donation.amountPaise / 100,
        status: donation.status,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[donations/record] Failed to record donation:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to record donation" },
      { status: 500 }
    );
  }
}
