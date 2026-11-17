import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Aggarwal Vaish Vikas Sangathan | एकता, सेवा और स्वाभिमान",
  description:
    "आधिकारिक पोर्टल - अग्रवाल वैश्य विकास संगठन हरियाणा। पंच संकल्प: राजनीतिक सशक्तिकरण, नारी स्वावलंबन एवं उद्यमिता, युवा नेतृत्व निर्माण, आर्थिक आत्मनिर्भरता और संगठित समाज।",
  keywords: [
    "Aggarwal Vaish Vikas Sangathan",
    "अग्रवाल वैश्य विकास संगठन",
    "AVVS Haryana",
    "Ashok Buwaniwala",
    "Maharaja Agrasen",
    "Panch Sankalp",
    "Vaish Vikas Sangathan",
    "Youth Wing",
    "Mahila Wing",
  ],
  authors: [{ name: "Aggarwal Vaish Vikas Sangathan" }],
  openGraph: {
    title: "Aggarwal Vaish Vikas Sangathan | एकता, सेवा और स्वाभिमान",
    description:
      "अग्रवाल वैश्य विकास संगठन हरियाणा - संगठित समाज, सशक्त युवा, और सेवा के पंच संकल्प के साथ समाज का गौरव।",
    url: "https://avsharyana.com",
    siteName: "Aggarwal Vaish Vikas Sangathan",
    images: [
      {
        url: "/images/agarwal/logo.png",
        width: 800,
        height: 800,
        alt: "Aggarwal Vaish Vikas Sangathan Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="font-sans h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Mukta:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FFF9F2] text-[#2B201A]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
