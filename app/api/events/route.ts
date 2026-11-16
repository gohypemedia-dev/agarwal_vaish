import { prisma } from "@/lib/server/prisma";

export const dynamic = "force-dynamic";

const defaultAVSEvents = [
  {
    id: "ev-1",
    slug: "agrasen-jayanti-mahotsav-2026",
    title: "Maharaja Agrasen Jayanti Mahotsav",
    titleHi: "महाराजा अग्रसेन जयंती भव्य महोत्सव",
    summary: "Grand annual celebration honoring the life, ideals, and socio-economic philosophy of Maharaja Agrasen Ji.",
    summaryHi: "महाराजा अग्रसेन जी के पावन आदर्शों, समाजवाद के सिद्धांत एवं जीवन दर्शन को समर्पित भव्य वार्षिक जयंती महोत्सव।",
    description: "Join thousands of members across Haryana to celebrate the divine birth anniversary of Maharaja Agrasen Ji. Featuring cultural processions (Shobha Yatra), community sammelan, honoring distinguished social workers, and grand mahaprasad.",
    startDate: "2026-10-11T10:30:00Z",
    endDate: "2026-10-11T17:00:00Z",
    timeText: "10:00 AM – 5:00 PM IST",
    location: "Bhiwani & District Centres across Haryana",
    address: "Aggarwal Vaish Bhawan, Hansi Road, Bhiwani, Haryana - 127021",
    contactPhone: "+91 94160 55000",
    isPublished: true,
  },
  {
    id: "ev-2",
    slug: "vaish-yuva-leadership-conclave-2026",
    title: "Vaish Yuva Leadership & Business Conclave",
    titleHi: "वैश्य युवा नेतृत्व एवं व्यापार सम्मेलन",
    summary: "Statewide youth convention fostering entrepreneurship, public leadership, and professional networking.",
    summaryHi: "युवाओं में व्यापार, स्टार्टअप, नेतृत्व कौशल और सामाजिक सहभागिता को बढ़ावा देने हेतु राज्यस्तरीय युवा महासम्मेलन।",
    description: "A transformative convention connecting emerging entrepreneurs and youth leaders with seasoned industry icons and community mentors to drive economic resilience and public representation.",
    startDate: "2026-11-28T09:00:00Z",
    endDate: "2026-11-28T16:00:00Z",
    timeText: "9:30 AM – 4:30 PM IST",
    location: "Auditorium, Hisar / Gurugram",
    address: "AVS Youth Convention Centre, Haryana",
    contactPhone: "+91 94160 55000",
    isPublished: true,
  },
  {
    id: "ev-3",
    slug: "mahila-samman-sashaktikaran-2027",
    title: "State Mahila Sammelan & Pratibha Samman",
    titleHi: "राज्यस्तरीय महिला सम्मेलन एवं प्रतिभा सम्मान",
    summary: "Statewide gathering dedicated to empowering women entrepreneurs and felicitating young community achievers.",
    summaryHi: "महिला उद्यमियों के सशक्तिकरण, बालिका शिक्षा संवर्धन और समाज की प्रतिभावान बेटियों का राज्यस्तरीय सम्मान समारोह।",
    description: "A prestigious assembly celebrating exceptional women leaders, academic toppers, sports achievers, and grassroots social changemakers from all 22 districts of Haryana.",
    startDate: "2027-01-24T05:00:00Z",
    endDate: "2027-01-24T12:00:00Z",
    timeText: "10:30 AM – 3:30 PM IST",
    location: "State Central Hall, Bhiwani / Rohtak",
    address: "Aggarwal Vaish Central Complex, Haryana",
    contactPhone: "+91 94160 55000",
    isPublished: true,
  },
];

export async function GET() {
  try {
    const all = await prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { startDate: "asc" },
    });

    const legacyKeywords = ["bhagwat", "gurukul", "gopashtami", "sadhvi", "ashram", "vrindavan"];
    const avsEvents = all.filter((e) => {
      const t = `${e.title || ""} ${e.titleHi || ""} ${e.location || ""}`.toLowerCase();
      return !legacyKeywords.some((k) => t.includes(k));
    });

    const activeList = avsEvents.length > 0 ? avsEvents : defaultAVSEvents;

    // Upcoming and ongoing events first (soonest first), then past events (most recent first).
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const isPast = (e: (typeof activeList)[number]) => (new Date(e.endDate ?? e.startDate)) < today;
    const events = [...activeList.filter((e) => !isPast(e)), ...activeList.filter(isPast).reverse()];

    return Response.json(
      { events },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch events, using fallback:", error);
    return Response.json({ events: defaultAVSEvents }, { status: 200 });
  }
}
