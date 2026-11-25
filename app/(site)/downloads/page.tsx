import type { Metadata } from "next";
import { Suspense } from "react";
import DownloadsPageClient from "./DownloadsPageClient";

export const metadata: Metadata = {
  title: "डाउनलोड संसाधन एवं प्रपत्र | Download Resources - Aggarwal Vaish Vikas Sangathan",
  description:
    "अग्रवाल वैश्य विकास संगठन के आधिकारिक लोगो, सदस्यता प्रपत्र, महाराजा अग्रसेन जी के पावन स्वरूप एवं डिजिटल संसाधन डाउनलोड करें।",
  openGraph: {
    title: "Download Resources - Aggarwal Vaish Vikas Sangathan",
    description: "Download AVS official logo, membership forms, portraits, and media resources.",
    images: ["/images/downloads/maharaja-agrasen.png"],
  },
};

export default function DownloadsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF9F2]" />}>
      <DownloadsPageClient />
    </Suspense>
  );
}
