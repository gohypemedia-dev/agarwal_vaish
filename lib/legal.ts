// Facts shared by the policy pages (privacy, terms, refunds, shipping). Change them here once.
// Have the Trust's CA / lawyer review the policy pages before relying on them.

export const LEGAL = {
  trustName: "Aggarwal Vaish Vikas Sangathan",
  registration: "AVVS/HRY/2021/894",
  address: "Aggarwal Vaish Vikas Bhawan, Near Agrasen Chowk, Sector 14, Gurugram, Haryana 122001, India",
  email: "info@aggarwalvaishvikas.org",
  phone: "+91 98120 12345",
  phoneHref: "tel:+919812012345",
  lastUpdated: "21 October 2026",

  // Required by the Consumer Protection (E-Commerce) Rules, 2020.
  // TODO: replace with the name of the person the Trust appoints before going live.
  grievanceOfficer: "Grievance Officer, Aggarwal Vaish Vikas Sangathan",
  grievanceAckHours: 48,
  grievanceResolveDays: 30,

  // Books
  dispatchDays: "3–5 working days",
  deliveryDays: "5–10 working days",
  returnReportDays: 7,
  refundDays: 7,

  // Donations and memberships: refunds only for mistakes reported within this many days.
  donationErrorReportDays: 7,
} as const;

export const POLICY_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/shipping-policy", label: "Shipping Policy" },
] as const;
