export type VideoProvider = "youtube" | "vimeo" | "mp4";

export interface GalleryItem {
  id: string;
  type: "photo" | "video";
  title: string;
  titleHi?: string;
  event?: string;
  eventHi?: string;
  src: string;
  thumbnail: string;
  alt: string;
  videoProvider?: VideoProvider;
  focalPoint?: string;
  aspectRatio?: string;
  displayOrder: number;
  date?: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "avs-gal-1",
    type: "photo",
    title: "Maharaja Agrasen Jayanti Samaroh - Ek Eent Ek Rupaya",
    titleHi: "महाराजा अग्रसेन जयंती समारोह - एक ईंट, एक रुपया सिद्धांत",
    event: "State Annual Festival",
    eventHi: "राज्यस्तरीय जयंती महोत्सव",
    src: "/images/agarwal/design-6.jpg",
    thumbnail: "/images/agarwal/design-6.jpg",
    alt: "महाराजा अग्रसेन जी के पावन आदर्श - अग्रवाल वैश्य विकास संगठन हरियाणा",
    displayOrder: 1,
    date: "2026-02-15",
  },
  {
    id: "avs-gal-2",
    type: "photo",
    title: "Vaish Trade & Industry Conclave",
    titleHi: "व्यापार एवं उद्योग संवर्धन - वैश्य व्यापार प्रकोष्ठ महासम्मेलन",
    event: "Trade & Commerce Wing",
    eventHi: "राज्यस्तरीय व्यापारी महासम्मेलन",
    src: "/images/agarwal/design-7.jpg",
    thumbnail: "/images/agarwal/design-7.jpg",
    alt: "व्यापार एवं उद्योग प्रकोष्ठ - अग्रवाल वैश्य समाज हरियाणा",
    displayOrder: 2,
    date: "2026-02-14",
  },
  {
    id: "avs-gal-3",
    type: "photo",
    title: "State Pratibha Samman & Youth Education",
    titleHi: "प्रतिभा सम्मान एवं मेधावी छात्र प्रोत्साहन समारोह",
    event: "Education & Excellence",
    eventHi: "प्रतिभा सम्मान अधिवेशन",
    src: "/images/agarwal/design-8.jpg",
    thumbnail: "/images/agarwal/design-8.jpg",
    alt: "प्रतिभा सम्मान समारोह - अग्रवाल वैश्य समाज हरियाणा",
    displayOrder: 3,
    date: "2026-02-12",
  },
  {
    id: "avs-gal-4",
    type: "photo",
    title: "Mahila Sashaktikaran - Women Empowerment Wing",
    titleHi: "महिला सशक्तिकरण एवं नारी स्वावलंबन प्रकोष्ठ",
    event: "Women Leadership Wing",
    eventHi: "राज्यस्तरीय महिला सम्मेलन",
    src: "/images/agarwal/design-2.jpg",
    thumbnail: "/images/agarwal/design-2.jpg",
    alt: "महिला सशक्तिकरण - अग्रवाल वैश्य समाज हरियाणा",
    displayOrder: 4,
    date: "2026-02-10",
  },
  {
    id: "avs-gal-5",
    type: "photo",
    title: "Yuva Netritva - Youth Leadership & Entrepreneurship",
    titleHi: "युवा नेतृत्व निर्माण - स्वावलंबन एवं युवा उद्यमशीलता",
    event: "Youth Leadership Conclave",
    eventHi: "युवा शक्ति महासम्मेलन",
    src: "/images/agarwal/design-3.jpg",
    thumbnail: "/images/agarwal/design-3.jpg",
    alt: "युवा नेतृत्व - अग्रवाल वैश्य समाज हरियाणा",
    displayOrder: 5,
    date: "2026-02-08",
  },
  {
    id: "avs-gal-6",
    type: "photo",
    title: "Rajnaitik Sahbhagita - Political Awareness",
    titleHi: "राजनीतिक सहभागिता - वैश्य समाज की लोकतांत्रिक हिस्सेदारी",
    event: "Political Representation",
    eventHi: "राजनीतिक चेतना सम्मेलन",
    src: "/images/agarwal/design-4.jpg",
    thumbnail: "/images/agarwal/design-4.jpg",
    alt: "राजनीतिक सहभागिता - अग्रवाल वैश्य समाज हरियाणा",
    displayOrder: 6,
    date: "2026-02-05",
  },
  {
    id: "avs-gal-7",
    type: "photo",
    title: "Sangathit Samaj - Statewide Haryana Network",
    titleHi: "संगठित समाज - हरियाणा के 22 ज़िलों का सांगठनिक ढांचा",
    event: "State Organization",
    eventHi: "प्रदेश कार्यकारिणी बैठक",
    src: "/images/agarwal/design-5.jpg",
    thumbnail: "/images/agarwal/design-5.jpg",
    alt: "संगठित समाज - अग्रवाल वैश्य समाज हरियाणा",
    displayOrder: 7,
    date: "2026-02-03",
  },
  {
    id: "avs-gal-8",
    type: "photo",
    title: "Founder President Shri Ashok Buwaniwala Address",
    titleHi: "संस्थापक अध्यक्ष श्री अशोक बुवानीवाला जी का उद्बोधन",
    event: "AVS Leadership Assembly",
    eventHi: "राज्य सम्मेलन, भिवानी",
    src: "/images/agarwal/ashok-buwaniwala-hero.jpg",
    thumbnail: "/images/agarwal/ashok-buwaniwala-hero.jpg",
    alt: "श्री अशोक बुवानीवाला जी - संस्थापक अध्यक्ष अग्रवाल वैश्य समाज हरियाणा",
    displayOrder: 8,
    date: "2026-01-28",
  },
  {
    id: "avs-gal-9",
    type: "photo",
    title: "Aggarwal Vaish Samaj Statewide Mahasammelan",
    titleHi: "अग्रवाल वैश्य समाज - हरियाणा सर्व-वैश्य एकता महाकुंभ",
    event: "State Convention",
    eventHi: "अखिल भारतीय महासम्मेलन",
    src: "/images/membership-hero-unity.jpg",
    thumbnail: "/images/membership-hero-unity.jpg",
    alt: "हरियाणा सर्व-वैश्य एकता महाकुंभ - अग्रवाल वैश्य समाज",
    displayOrder: 9,
    date: "2026-01-25",
  },
  {
    id: "avs-gal-10",
    type: "photo",
    title: "Social Participation & Panch Sankalp Campaign",
    titleHi: "सामाजिक सहभागिता एवं सामुदायिक पंच संकल्प अभियान",
    event: "Panch Sankalp Campaign",
    eventHi: "पंच संकल्प जनचेतना अभियान",
    src: "/images/agarwal/design-1.jpg",
    thumbnail: "/images/agarwal/design-1.jpg",
    alt: "सामाजिक सहभागिता - अग्रवाल वैश्य समाज हरियाणा",
    displayOrder: 10,
    date: "2026-01-20",
  },
];
