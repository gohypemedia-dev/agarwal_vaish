// Facts shared by the policy pages (privacy, terms, refunds, shipping). Change them here once.
// Have the Trust's CA / lawyer review the policy pages before relying on them.

export const LEGAL = {
  trustName: "Aggarwal Vaish Vikas Sangathan",
  registration: "Regd. No. (रजि.)",
  address: "150, Sector 19 Part-1, HUDA, Kaithal - 136027 (Haryana)",
  addressHi: "150, सेक्टर 19 पार्ट–1, हुडा, कैथल–136027 (हरियाणा)",
  email: "aggarwalvaishvikassangthan@gmail.com",
  phone: "+91 90885 00061",
  phoneRaw: "90885-00061",
  phoneHref: "tel:+919088500061",
  whatsappHref: "https://wa.me/919088500061",
  instagramHandle: "avvsharyana",
  instagramHref: "https://www.instagram.com/avvsharyana/",
  facebookHandle: "avvsharyana",
  facebookHref: "https://www.facebook.com/profile.php?id=61596429263536",
  lastUpdated: "20 November 2026",

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
