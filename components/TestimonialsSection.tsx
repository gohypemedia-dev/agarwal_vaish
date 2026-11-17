"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionReveal, TextReveal, ParagraphReveal } from "@/components/animation";
import HeadingDivider from "@/components/HeadingDivider";

interface Testimonial {
  name: string;
  nameHi: string;
  initial: string;
  location: string;
  locationHi: string;
  role: string;
  roleHi: string;
  rating: number;
  quote: string;
  quoteHi: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Rajesh Aggarwal",
    nameHi: "राजेश अग्रवाल",
    initial: "R",
    location: "Hisar, Haryana",
    locationHi: "हिसार, हरियाणा",
    role: "District Executive Member",
    roleHi: "जिला कार्यकारिणी सदस्य",
    rating: 5,
    quote:
      "Under Shri Ashok Buwaniwala's leadership, Aggarwal Vaish Samaj has united thousands of families across Haryana. The Panch Sankalp mission has given our community pride and a strong voice.",
    quoteHi:
      "श्री अशोक बुवानीवाला जी के नेतृत्व में अग्रवाल वैश्य समाज ने पूरे हरियाणा में हजारों परिवारों को एकजुट किया है। पंच संकल्प ने समाज को मान-सम्मान और एक सशक्त मंच दिया है।",
  },
  {
    name: "Sunita Gupta",
    nameHi: "सुनीता गुप्ता",
    initial: "S",
    location: "Bhiwani, Haryana",
    locationHi: "भिवानी, हरियाणा",
    role: "Mahila Wing Coordinator",
    roleHi: "महिला प्रकोष्ठ संयोजिका",
    rating: 5,
    quote:
      "The Mahila Wing gives women of the Vaish community real opportunities for social leadership, self-reliance, and skill-building. AVS Haryana stands strongly with every daughter and mother.",
    quoteHi:
      "महिला प्रकोष्ठ के माध्यम से वैश्य समाज की महिलाओं को सामाजिक नेतृत्व, आत्मनिर्भरता और कौशल विकास के वास्तविक अवसर मिले हैं। AVS हरियाणा हर बेटी और बहन के साथ मजबूती से खड़ा है।",
  },
  {
    name: "Amit Garg",
    nameHi: "अमित गर्ग",
    initial: "A",
    location: "Gurugram, Haryana",
    locationHi: "गुरुग्राम, हरियाणा",
    role: "Youth Wing President",
    roleHi: "युवा इकाई अध्यक्ष",
    rating: 5,
    quote:
      "AVS Haryana's youth entrepreneurship programs and leadership camps are empowering the next generation. We are actively carrying forward the socialist ideals of Maharaja Agrasen.",
    quoteHi:
      "AVS हरियाणा के युवा उद्यमिता कार्यक्रम और नेतृत्व शिविर नई पीढ़ी को सशक्त बना रहे हैं। हम महाराजा अग्रसेन जी के समाजवाद के विचारों को पूरी ऊर्जा से आगे बढ़ा रहे हैं।",
  },
  {
    name: "Pawan Mittal",
    nameHi: "पवन मित्तल",
    initial: "P",
    location: "Rohtak, Haryana",
    locationHi: "रोहतक, हरियाणा",
    role: "Senior Life Member",
    roleHi: "वरिष्ठ आजीवन सदस्य",
    rating: 5,
    quote:
      "The transparency and democratic strength of Aggarwal Vaish Samaj Haryana is unmatched. From blood donation drives to political awareness, their on-ground work is commendable.",
    quoteHi:
      "अग्रवाल वैश्य समाज हरियाणा की पारदर्शिता और सांगठनिक शक्ति अद्वितीय है। रक्तदान शिविरों से लेकर सामाजिक व राजनीतिक चेतना तक, उनका जमीनी कार्य अत्यंत सराहनीय है।",
  },
  {
    name: "Vikas Bansal",
    nameHi: "विकास बंसल",
    initial: "V",
    location: "Panipat, Haryana",
    locationHi: "पानीपत, हरियाणा",
    role: "Vyapar Mandal Delegate",
    roleHi: "व्यापार प्रकोष्ठ प्रतिनिधि",
    rating: 5,
    quote:
      "Traders and small businessmen finally have a dedicated organization in Haryana that listens to their issues and advocates firmly for fair policies and community welfare.",
    quoteHi:
      "व्यापारियों और उद्यमियों को हरियाणा में एक ऐसा मजबूत संगठन मिला है जो हमारी समस्याओं को सुनता है और नीतिगत स्तर पर मजबूती से समाज के पक्ष में आवाज उठाता है।",
  },
  {
    name: "Dr. Sandeep Singhal",
    nameHi: "डॉ. संदीप सिंघल",
    initial: "S",
    location: "Karnal, Haryana",
    locationHi: "करनाल, हरियाणा",
    role: "Health & Seva Cell",
    roleHi: "चिकित्सा सेवा प्रकोष्ठ",
    rating: 5,
    quote:
      "The free medical checkup camps, eye care drives, and emergency assistance organized by AVS Haryana across rural and urban centers demonstrate true human service.",
    quoteHi:
      "AVS हरियाणा द्वारा ग्रामीण व शहरी क्षेत्रों में आयोजित निःशुल्क स्वास्थ्य जांच शिविर, नेत्र चिकित्सा और आपातकालीन सहायता वास्तविक मानव सेवा का अनुपम उदाहरण हैं।",
  },
  {
    name: "Deepak Jindal",
    nameHi: "दीपक जिंदल",
    initial: "D",
    location: "Ambala, Haryana",
    locationHi: "अंबाला, हरियाणा",
    role: "Student Wing Mentor",
    roleHi: "छात्र इकाई मार्गदर्शक",
    rating: 5,
    quote:
      "Pratibha Samman Samaroh rewards our brightest students with scholarships and recognition. It inspires our youth to achieve excellence while staying rooted in our heritage.",
    quoteHi:
      "प्रतिभा सम्मान समारोह के माध्यम से मेधावी छात्र-छात्राओं को छात्रवृत्ति और प्रोत्साहन मिलता है। इससे हमारे युवा अपनी संस्कृति से जुड़ते हुए सफलता की नई ऊंचाइयों को छू रहे हैं।",
  },
  {
    name: "Mukesh Goyal",
    nameHi: "मुकेश गोयल",
    initial: "M",
    location: "Faridabad, Haryana",
    locationHi: "फरीदाबाद, हरियाणा",
    role: "District Patron",
    roleHi: "जिला संरक्षक",
    rating: 5,
    quote:
      "Maharaja Agrasen's visionary principle of 'Ek Eent, Ek Rupaya' is practiced in spirit by Aggarwal Vaish Samaj. Every member feels respected, supported, and connected.",
    quoteHi:
      "महाराजा अग्रसेन जी का 'एक ईंट, एक रुपया' का सिद्धांत अग्रवाल वैश्य समाज की कार्यप्रणाली में प्रत्यक्ष दिखाई देता है। हर सदस्य यहां सम्मानित और सुरक्षित महसूस करता है।",
  },
];

interface TestimonialsSectionProps {
  lang?: string;
}

export default function TestimonialsSection({ lang = "en" }: TestimonialsSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Autoplay functionality (6 seconds, pauses on hover)
  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      if (emblaApi && !isHovered) {
        emblaApi.scrollNext();
      }
    }, 6000);
  }, [emblaApi, isHovered]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [startAutoplay]);

  return (
    <SectionReveal
      className="py-16 sm:py-20 lg:py-24 bg-[#FFF9F2] border-t border-[#E7D8C8]/60 relative select-none"
    >
      <div
        className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <TextReveal
            as="h2"
            className="font-editorial text-3xl sm:text-4xl font-bold text-[#7F160C] tracking-tight"
            text={lang === "hi" ? "समाज के विचार एवं अनुभव" : "Voices of Vaish Samaj Community"}
          />
          <HeadingDivider className="mt-2" />
        </div>

        {/* Carousel Container with Side Controls for Desktop (Positioned cleanly outside cards) */}
        <div className="relative flex items-center">
          {/* Desktop Left Button */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex shrink-0 mr-2.5 lg:mr-3.5 w-11 h-11 rounded-full border border-[#E7D8C8] bg-white hover:bg-[#7F160C] text-[#2B201A] hover:text-white items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Carousel Viewport (NO overlapping buttons over cards) */}
          <div className="relative overflow-hidden px-1 py-2 flex-1 min-w-0" ref={emblaRef}>
            <div className="flex -ml-4 sm:-ml-5 touch-pan-y">
              {testimonialsData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4 sm:pl-5 min-w-0"
                >
                  {/* Testimonial Card with authentic styling */}
                  <div className="h-full bg-white rounded-2xl border border-[#E7D8C8] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(43,32,26,0.06)] hover:border-[#7F160C] hover:shadow-warm-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                    <div className="flex flex-col h-full justify-between space-y-3.5">
                      {/* Devotee Info: Avatar + Name & Location */}
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7F160C] to-[#B8893E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                          {item.initial}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-editorial font-bold text-sm sm:text-base text-[#2B201A] group-hover:text-[#7F160C] transition-colors truncate">
                            {lang === "hi" ? item.nameHi : item.name}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-[#7A6B60] font-medium truncate">
                            {lang === "hi" ? item.locationHi : item.location}
                          </p>
                        </div>
                      </div>

                      {/* 5 Golden Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-[#7F160C] text-[#7F160C]"
                          />
                        ))}
                      </div>

                      {/* Testimonial Quote - Fills the card naturally without truncation */}
                      <p className="text-xs sm:text-[13px] text-[#4A3E38] leading-relaxed italic flex-1">
                        &ldquo;{lang === "hi" ? item.quoteHi : item.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Right Button */}
          <button
            onClick={scrollNext}
            className="hidden md:flex shrink-0 ml-2.5 lg:ml-3.5 w-11 h-11 rounded-full border border-[#E7D8C8] bg-white hover:bg-[#7F160C] text-[#2B201A] hover:text-white items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Carousel Bottom Controls: Mobile Prev/Next + Indicators on all screens */}
        <div className="flex items-center justify-center gap-4 mt-7 sm:mt-9">
          {/* Mobile Prev Button */}
          <button
            onClick={scrollPrev}
            className="md:hidden w-10 h-10 rounded-full border border-[#E7D8C8] bg-white hover:bg-[#7F160C] text-[#2B201A] hover:text-white flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  selectedIndex === idx
                    ? "w-8 bg-[#7F160C]"
                    : "w-2.5 bg-[#7F160C]/25 hover:bg-[#7F160C]/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Next Button */}
          <button
            onClick={scrollNext}
            className="md:hidden w-10 h-10 rounded-full border border-[#E7D8C8] bg-white hover:bg-[#7F160C] text-[#2B201A] hover:text-white flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>
    </SectionReveal>
  );
}


