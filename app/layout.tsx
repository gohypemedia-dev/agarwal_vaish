import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Aggarwal Vaish Samaj Haryana | AVS Haryana | एकता, सेवा और स्वाभिमान",
  description:
    "आधिकारिक पोर्टल - अग्रवाल वैश्य समाज (AVS Haryana)। पंच संकल्प: सामाजिक सहभागिता, महिला सशक्तिकरण, युवा नेतृत्व, राजनीतिक सहभागिता और संगठित समाज।",
  keywords: [
    "Aggarwal Vaish Samaj",
    "AVS Haryana",
    "Aggarwal Vaish Vikas Sangthan",
    "Ashok Buwaniwala",
    "Maharaja Agrasen",
    "Panch Sankalp",
    "Vaish Samaj Haryana",
    "Youth Wing",
    "Mahila Wing",
  ],
  authors: [{ name: "Aggarwal Vaish Samaj Haryana" }],
  openGraph: {
    title: "Aggarwal Vaish Samaj Haryana | AVS Haryana",
    description:
      "अग्रवाल वैश्य समाज हरियाणा - संगठित समाज, सशक्त युवा, और सेवा के पंच संकल्प के साथ समाज का गौरव।",
    url: "https://avsharyana.com",
    siteName: "Aggarwal Vaish Samaj Haryana",
    images: [
      {
        url: "/images/agarwal/logo.png",
        width: 800,
        height: 800,
        alt: "Aggarwal Vaish Samaj Haryana Logo",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FFF9F2] text-[#2B201A]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
