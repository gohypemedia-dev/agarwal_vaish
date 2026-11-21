// Shared by the donate modal and the API. Contains no secrets.

export const PRESET_AMOUNTS = [499, 999, 1499, 2100, 5100, 11000];

// Membership prices live here so the server, not the browser, decides what a plan costs.
// Shown on the membership page's plan cards and printed on the membership certificate:
// `period`, `description`, `badge` and `benefits` as on the cards; `title`, `term` (validity)
// and `color` on the certificate.
export const MEMBERSHIP_PLANS = [
  {
    id: "active",
    name: "Active Member",
    price: 100,
    title: "Active Member",
    term: "lifetime",
    color: "#7F160C",
    period: "lifetime",
    description: "Ideal for community members wishing to actively participate in public initiatives and social welfare.",
    badge: "ACTIVE MEMBER",
    benefits: [
      "Official Member Digital ID & Certificate",
      "Direct Participation in Community Conventions",
      "Invitation to District & State Level Sammelans",
      "Active Role in Panch Sankalp Initiatives",
    ],
  },
  {
    id: "co_patron",
    name: "Co-Patron Member",
    price: 21000,
    title: "Co-Patron Member",
    term: "lifetime",
    color: "#B4531A",
    period: "lifetime",
    description: "For leaders and business mentors dedicated to guiding district initiatives and youth programs.",
    badge: "CO-PATRON TIER",
    benefits: [
      "All Active Membership Privileges",
      "Felicitation & Stage Honor at State Sammelans",
      "Nomination to District & State Advisory Committees",
      "Special Co-Patron Scroll & Commemorative Plaque",
    ],
  },
  {
    id: "patron",
    name: "Patron Member",
    price: 100000,
    title: "Patron Member",
    term: "lifetime",
    color: "#7F160C",
    period: "lifetime",
    description: "Highest patron honor for esteemed benefactors supporting statewide social and community infrastructure.",
    badge: "PATRON TIER",
    benefits: [
      "Lifetime Chief Patron Honor & VIP Protocol",
      "Participation in State Core Policy & Executive Board",
      "Prominent Recognition at State Headquarters & Events",
      "Exclusive Memento, Framed Scroll & Lifetime Citation",
    ],
  },
] as const;

export type MembershipPlanId = (typeof MEMBERSHIP_PLANS)[number]["id"];
export type MembershipPlan = (typeof MEMBERSHIP_PLANS)[number];

export function findPlan(id: string) {
  return MEMBERSHIP_PLANS.find((p) => p.id === id);
}

// Memberships store the plan's name in `program`. Unknown names fall back to the basic plan.
export function planForProgram(program: string | null | undefined): MembershipPlan {
  const norm = program?.trim().toLowerCase() || "";
  return (
    MEMBERSHIP_PLANS.find(
      (p) =>
        p.name.toLowerCase() === norm ||
        p.id === norm ||
        (p.id === "active" && (norm === "membership" || norm.includes("active") || norm.includes("basic")))
    ) ?? MEMBERSHIP_PLANS[0]
  );
}

// Last day of a yearly membership that starts on `start`; null for lifetime plans.
export function membershipValidUntil(plan: MembershipPlan, start: Date): Date | null {
  if (plan.term === "lifetime") return null;
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + 1);
  end.setDate(end.getDate() - 1);
  return end;
}

export const MAX_DONATION_AMOUNT = 1_000_000; // ₹10,00,000 per transaction

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const UTR_PATTERN = /^\d{12}$/;

// ₹1,000 for whole rupees, ₹1,000.01 when there are paise.
export function formatINR(rupees: number) {
  const paise = Math.round(rupees * 100) % 100 !== 0;
  return `₹${rupees.toLocaleString("en-IN", { minimumFractionDigits: paise ? 2 : 0, maximumFractionDigits: 2 })}`;
}
