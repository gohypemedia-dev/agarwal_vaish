import { requireAdminPage } from "@/lib/server/auth";
import { prisma } from "@/lib/server/prisma";
import { ensureVerifiedMembershipsSynced } from "@/lib/server/member-sync";
import AdminMembersTabs from "@/components/admin/members/AdminMembersTabs";
import { AdminMemberItem, MembershipTier } from "@/components/admin/members/MemberManager";
import { MembershipRegistrationItem } from "@/components/admin/members/MembershipApplicationsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Member Management | AVVS Haryana Admin",
};

export default async function AdminMembersPage() {
  await requireAdminPage();

  // Sync verified memberships non-blockingly in the background
  void ensureVerifiedMembershipsSynced();

  const [rawMembers, rawRegistrations] = await Promise.all([
    prisma.member.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.membershipRegistration?.findMany
      ? prisma.membershipRegistration.findMany({
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),
  ]);

  const formattedMembers: AdminMemberItem[] = rawMembers.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: m.phone,
    tier: (m.tier as MembershipTier) || "BASIC",
    status: (m.status as "ACTIVE" | "INACTIVE" | "EXPIRED") || "ACTIVE",
    role: m.role,
    address: m.address,
    city: m.city,
    state: m.state,
    pincode: m.pincode,
    photoUrl: m.photoUrl,
    validUntil: m.validUntil ? m.validUntil.toISOString() : null,
    createdAt: m.createdAt.toISOString(),
  }));

  const formattedRegistrations: MembershipRegistrationItem[] = rawRegistrations.map((r) => ({
    id: r.id,
    registrationNo: r.registrationNo,
    fullName: r.fullName,
    guardianName: r.guardianName,
    gender: r.gender,
    caste: r.caste,
    gotra: r.gotra,
    email: r.email,
    phone: r.phone,
    dob: r.dob,
    state: r.state,
    district: r.district,
    address: r.address,
    wardNumber: r.wardNumber,
    pincode: r.pincode,
    occupation: r.occupation,
    occupationDetails: r.occupationDetails,
    photoUrl: r.photoUrl,
    planId: r.planId,
    planName: r.planName,
    amount: r.amount,
    status: r.status as any,
    utr: r.utr,
    notes: r.notes,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <AdminMembersTabs
      initialMembers={formattedMembers}
      initialRegistrations={formattedRegistrations}
    />
  );
}
