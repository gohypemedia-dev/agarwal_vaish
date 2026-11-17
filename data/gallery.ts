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
    title: "Farmer Welfare & Natural Agriculture",
    titleHi: "किसान कल्याण एवं प्राकृतिक कृषि",
    event: "Farmer Welfare",
    eventHi: "कृषि कल्याण",
    src: "/images/pillar-farmer.jpg",
    thumbnail: "/images/pillar-farmer.jpg",
    alt: "Farmer Welfare & Natural Agriculture",
    focalPoint: "center",
    displayOrder: 1,
    date: "2026-02-15",
  },
  {
    id: "avs-gal-2",
    type: "photo",
    title: "Women Empowerment & Self Reliance",
    titleHi: "महिला स्वावलंबन एवं सशक्तिकरण",
    event: "Women Empowerment",
    eventHi: "महिला सशक्तिकरण",
    src: "/images/pillar-women.jpg",
    thumbnail: "/images/pillar-women.jpg",
    alt: "Women Empowerment & Self Reliance",
    focalPoint: "center",
    displayOrder: 2,
    date: "2026-02-14",
  },
  {
    id: "avs-gal-3",
    type: "photo",
    title: "Youth Empowerment & Teamwork",
    titleHi: "युवा नेतृत्व एवं सशक्तिकरण",
    event: "Youth Empowerment",
    eventHi: "युवा सशक्तिकरण",
    src: "/images/pillar-youth.jpg",
    thumbnail: "/images/pillar-youth.jpg",
    alt: "Youth Empowerment & Teamwork",
    focalPoint: "center",
    displayOrder: 3,
    date: "2026-02-12",
  },
  {
    id: "avs-gal-4",
    type: "photo",
    title: "Spiritual Education & Value-Based Living",
    titleHi: "आध्यात्मिक शिक्षा एवं संस्कार संवर्धन",
    event: "Spiritual Education",
    eventHi: "आध्यात्मिक शिक्षा",
    src: "/images/pillar-spiritual.jpg",
    thumbnail: "/images/pillar-spiritual.jpg",
    alt: "Spiritual Education & Value-Based Living",
    focalPoint: "center",
    displayOrder: 4,
    date: "2026-02-10",
  },
];
