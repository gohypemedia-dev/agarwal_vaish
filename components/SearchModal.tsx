"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  FileText,
  Users,
  Compass,
  Heart,
  Calendar,
  Image as ImageIcon,
  ShieldCheck,
  Building,
  Landmark,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface SearchResultItem {
  id: string;
  title: string;
  titleHi: string;
  category: "page" | "leader" | "initiative" | "service";
  categoryLabel: string;
  categoryLabelHi: string;
  description: string;
  descriptionHi: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string[];
}

const SEARCH_DATABASE: SearchResultItem[] = [
  // 1. Core Pages
  {
    id: "page-home",
    title: "Home",
    titleHi: "मुख्य पृष्ठ",
    category: "page",
    categoryLabel: "Page",
    categoryLabelHi: "पेज",
    description: "Welcome to Aggarwal Vaish Vikas Sangathan Haryana official portal.",
    descriptionHi: "अग्रवाल वैश्य विकास संगठन हरियाणा का आधिकारिक पोर्टल।",
    href: "/",
    icon: Compass,
    keywords: ["home", "main", "start", "homepage", "sangathan", "haryana", "portal", "संगठन", "हरियाणा"],
  },
  {
    id: "page-about",
    title: "About Us & History",
    titleHi: "संगठन परिचय एवं इतिहास",
    category: "page",
    categoryLabel: "Page",
    categoryLabelHi: "पेज",
    description: "Learn about the foundation, vision, and mission of the Sangathan.",
    descriptionHi: "संगठन का उद्देश्य, इतिहास और दूरगामी लक्ष्य।",
    href: "/about",
    icon: Building,
    keywords: ["about", "history", "mission", "vision", "ideology", "sangathan", "परिचय", "इतिहास"],
  },
  {
    id: "page-leadership",
    title: "Leadership & Executive Board",
    titleHi: "राज्य कार्यकारिणी एवं पदाधिकारी",
    category: "leader",
    categoryLabel: "Leadership",
    categoryLabelHi: "पदाधिकारी",
    description: "Meet the state leadership, president, and executive committee members.",
    descriptionHi: "प्रदेश अध्यक्ष एवं राज्य कार्यकारिणी के वरिष्ठ पदाधिकारी।",
    href: "/about#leadership",
    icon: Users,
    keywords: ["leadership", "president", "executive", "board", "padadhikari", "team", "अध्यक्ष", "कार्यकारिणी"],
  },
  {
    id: "page-panch-sankalp",
    title: "Panch Sankalp (5 Resolutions)",
    titleHi: "पंच संकल्प",
    category: "initiative",
    categoryLabel: "Initiative",
    categoryLabelHi: "प्रकल्प",
    description: "Five core societal resolutions for the empowerment of Vaish Samaj.",
    descriptionHi: "वैश्य समाज के उत्थान हेतु पांच मुख्य सामाजिक संकल्प।",
    href: "/about#panch-sankalp",
    icon: CheckCircle2,
    keywords: ["panch", "sankalp", "resolutions", "initiatives", "five", "pledge", "पंच", "संकल्प"],
  },
  {
    id: "page-agroha",
    title: "About Agroha Dham",
    titleHi: "अग्रोहा धाम दर्शन",
    category: "page",
    categoryLabel: "Heritage",
    categoryLabelHi: "धरोहर",
    description: "Sacred heritage, historical significance, and temple complex of Agroha Dham.",
    descriptionHi: "पवित्र अग्रोहा धाम की ऐतिहासिक महत्ता एवं तीर्थ स्थल।",
    href: "/agroha-dham",
    icon: Landmark,
    keywords: ["agroha", "dham", "temple", "agrasen", "heritage", "hisar", "अग्रोहा", "धाम"],
  },
  {
    id: "page-inspirations",
    title: "Our Inspiration",
    titleHi: "हमारे प्रेरणास्रोत",
    category: "page",
    categoryLabel: "Heritage",
    categoryLabelHi: "धरोहर",
    description: "Ideals of Maharaja Agrasen, Agrasen Baoli, and Vaish icons.",
    descriptionHi: "महाराजा अग्रसेन जी के आदर्श, अग्रसेन की बावली एवं वैश्य महापुरुष।",
    href: "/inspirations",
    icon: Landmark,
    keywords: ["inspiration", "maharaja", "agrasen", "baoli", "prernasrot", "प्रेरणास्रोत", "अग्रसेन"],
  },
  {
    id: "page-gallery",
    title: "Photo & Video Gallery (Vaish Express)",
    titleHi: "वैश्य एक्सप्रेस व फोटो गैलरी",
    category: "page",
    categoryLabel: "Media",
    categoryLabelHi: "मीडिया",
    description: "Photo and video highlights from Sangathan events, sammelans, and drives.",
    descriptionHi: "संगठन के कार्यक्रमों, सम्मेलनों व सामाजिक अभियानों की तस्वीरें एवं वीडियो।",
    href: "/gallery",
    icon: ImageIcon,
    keywords: ["gallery", "photos", "videos", "media", "vaish", "express", "गैलरी", "फोटो", "वीडियो"],
  },
  {
    id: "page-events",
    title: "Events & Sammelans",
    titleHi: "आगामी कार्यक्रम व सम्मेलन",
    category: "page",
    categoryLabel: "Events",
    categoryLabelHi: "कार्यक्रम",
    description: "State-wide conventions, celebrations, and community welfare programs.",
    descriptionHi: "राज्यव्यापी महासम्मेलन, उत्सव एवं समाज सेवा कार्यक्रम।",
    href: "/events",
    icon: Calendar,
    keywords: ["events", "sammelan", "programs", "calendar", "meetings", "कार्यक्रम", "सम्मेलन"],
  },
  {
    id: "page-membership",
    title: "Online Membership Registration",
    titleHi: "ऑनलाइन सदस्यता पंजीकरण",
    category: "service",
    categoryLabel: "Membership",
    categoryLabelHi: "सदस्यता",
    description: "Join the Sangathan as an Active, Co-Patron, or Patron Member.",
    descriptionHi: "संगठन के सक्रिय या संरक्षक सदस्य बनकर समाज उत्थान में भागीदार बनें।",
    href: "/membership",
    icon: ShieldCheck,
    keywords: ["membership", "join", "register", "patron", "active", "apply", "सदस्यता", "रजिस्ट्रेशन"],
  },
  {
    id: "page-account",
    title: "Member Account & Digital ID",
    titleHi: "सदस्य खाता एवं डिजिटल पहचान पत्र",
    category: "service",
    categoryLabel: "Account",
    categoryLabelHi: "खाता",
    description: "View verified member profile, download Digital ID Card, and contribution receipts.",
    descriptionHi: "सत्यापित सदस्य विवरण देखें, डिजिटल आईडी कार्ड और रसीद प्राप्त करें।",
    href: "/account",
    icon: Users,
    keywords: ["account", "member", "profile", "id card", "login", "details", "खाता", "आईडी"],
  },
  {
    id: "page-donate",
    title: "Make a Contribution (Donation)",
    titleHi: "सहयोग राशि दान करें",
    category: "service",
    categoryLabel: "Donation",
    categoryLabelHi: "दान",
    description: "Support community welfare projects, education, and cultural initiatives via UPI.",
    descriptionHi: "समाज सेवा, शिक्षा व सामाजिक प्रकल्पों के लिए सहयोग राशि अर्पित करें।",
    href: "/donate",
    icon: Heart,
    keywords: ["donate", "contribution", "support", "upi", "payment", "sahyog", "दान", "सहयोग"],
  },
  {
    id: "page-contact",
    title: "Contact & Head Office",
    titleHi: "संपर्क एवं मुख्यालय",
    category: "page",
    categoryLabel: "Contact",
    categoryLabelHi: "संपर्क",
    description: "Address, helpline phone numbers, email, and coordinator contacts.",
    descriptionHi: "संगठन मुख्यालय का पता, हेल्पलाइन नंबर, ईमेल व संपर्क विवरण।",
    href: "/contact",
    icon: FileText,
    keywords: ["contact", "helpline", "phone", "email", "address", "office", "संपर्क", "मुख्यालय"],
  },

  // 2. Key Office Bearers (Leadership)
  {
    id: "leader-ashok",
    title: "Shri Ashok Buwaniwala",
    titleHi: "श्री अशोक बुवानीवाला (प्रदेश अध्यक्ष)",
    category: "leader",
    categoryLabel: "State President",
    categoryLabelHi: "प्रदेश अध्यक्ष",
    description: "State President (प्रदेश अध्यक्ष) — Bhiwani, Haryana",
    descriptionHi: "प्रदेश अध्यक्ष — भिवानी, हरियाणा",
    href: "/about#leadership",
    icon: Users,
    keywords: ["ashok", "buwaniwala", "president", "state president", "bhiwani", "अशोक", "बुवानीवाला", "अध्यक्ष"],
  },
  {
    id: "leader-rajiv",
    title: "Shri Rajiv Gupta",
    titleHi: "श्री राजीव गुप्ता (प्रधान महासचिव)",
    category: "leader",
    categoryLabel: "General Secretary",
    categoryLabelHi: "प्रधान महासचिव",
    description: "Chief General Secretary (प्रधान महासचिव) — Hisar, Haryana",
    descriptionHi: "प्रधान महासचिव — हिसार, हरियाणा",
    href: "/about#leadership",
    icon: Users,
    keywords: ["rajiv", "gupta", "general secretary", "hisar", "राजीव", "गुप्ता", "महासचिव"],
  },
  {
    id: "leader-satish",
    title: "Shri Satish Goyal",
    titleHi: "श्री सतीश गोयल (संगठन सचिव)",
    category: "leader",
    categoryLabel: "Org Secretary",
    categoryLabelHi: "संगठन सचिव",
    description: "Organization Secretary (संगठन सचिव) — Gurugram, Haryana",
    descriptionHi: "संगठन सचिव — गुरुग्राम, हरियाणा",
    href: "/about#leadership",
    icon: Users,
    keywords: ["satish", "goyal", "secretary", "gurugram", "सतीश", "गोयल"],
  },
  {
    id: "leader-vikas",
    title: "Shri Vikas Garg",
    titleHi: "श्री विकास गर्ग (कोषाध्यक्ष)",
    category: "leader",
    categoryLabel: "Treasurer",
    categoryLabelHi: "कोषाध्यक्ष",
    description: "State Treasurer (कोषाध्यक्ष) — Rohtak, Haryana",
    descriptionHi: "कोषाध्यक्ष — रोहतक, हरियाणा",
    href: "/about#leadership",
    icon: Users,
    keywords: ["vikas", "garg", "treasurer", "rohtak", "विकास", "गर्ग", "कोषाध्यक्ष"],
  },
  {
    id: "leader-rekha",
    title: "Smt. Rekha Gupta",
    titleHi: "श्रीमती रेखा गुप्ता (प्रदेश अध्यक्षा, महिला प्रकोष्ठ)",
    category: "leader",
    categoryLabel: "Women Wing",
    categoryLabelHi: "महिला प्रकोष्ठ",
    description: "State President, Women Wing — Gurugram, Haryana",
    descriptionHi: "प्रदेश अध्यक्षा, महिला प्रकोष्ठ — गुरुग्राम, हरियाणा",
    href: "/about#leadership",
    icon: Users,
    keywords: ["rekha", "gupta", "women", "mahila", "रेखा", "गुप्ता", "महिला"],
  },
  {
    id: "leader-rahul",
    title: "Shri Rahul Tayal",
    titleHi: "श्री राहुल तायल (प्रदेश अध्यक्ष, युवा प्रकोष्ठ)",
    category: "leader",
    categoryLabel: "Youth Wing",
    categoryLabelHi: "युवा प्रकोष्ठ",
    description: "State President, Youth Wing — Hisar, Haryana",
    descriptionHi: "प्रदेश अध्यक्ष, युवा प्रकोष्ठ — हिसार, हरियाणा",
    href: "/about#leadership",
    icon: Users,
    keywords: ["rahul", "tayal", "youth", "yuva", "राहुल", "तायल", "युवा"],
  },

  // 3. Key Panch Sankalp Initiatives
  {
    id: "init-beti",
    title: "Beti Bachao Beti Padhao Initiative",
    titleHi: "बेटी बचाओ बेटी पढ़ाओ प्रकल्प",
    category: "initiative",
    categoryLabel: "Resolution 1",
    categoryLabelHi: "संकल्प १",
    description: "Empowering girls through higher education scholarships and leadership.",
    descriptionHi: "बालिकाओं की उच्च शिक्षा, छात्रवृत्ति व आत्मनिर्भरता हेतु अभियान।",
    href: "/about#panch-sankalp",
    icon: Heart,
    keywords: ["beti", "bachao", "padhao", "girl", "education", "बेटी", "शिक्षा"],
  },
  {
    id: "init-kanya",
    title: "Kanya Vivah Sahayata",
    titleHi: "सामूहिक व आर्थिक कन्या विवाह सहयोग",
    category: "initiative",
    categoryLabel: "Resolution 2",
    categoryLabelHi: "संकल्प २",
    description: "Financial assistance and mass wedding support for underprivileged families.",
    descriptionHi: "जरूरतमंद वैश्य परिवारों की बेटियों के विवाह में आर्थिक सहयोग।",
    href: "/about#panch-sankalp",
    icon: Heart,
    keywords: ["kanya", "vivah", "marriage", "wedding", "sahayata", "कन्या", "विवाह"],
  },
  {
    id: "init-yuva",
    title: "Yuva Rozgar & Business Mentorship",
    titleHi: "युवा स्वरोजगार एवं व्यापार मार्गदर्शन",
    category: "initiative",
    categoryLabel: "Resolution 3",
    categoryLabelHi: "संकल्प ३",
    description: "Mentoring Vaish youth for startups, trade skills, and business expansion.",
    descriptionHi: "वैश्य युवाओं को स्टार्टअप, व्यापारिक मार्गदर्शन व रोजगार के अवसर।",
    href: "/about#panch-sankalp",
    icon: Briefcase,
    keywords: ["yuva", "rozgar", "jobs", "business", "startup", "mentorship", "युवा", "रोजगार"],
  },
];

const SUGGESTED_CHIPS = [
  { label: "About Sangathan", labelHi: "संगठन परिचय", query: "about" },
  { label: "Panch Sankalp", labelHi: "पंच संकल्प", query: "sankalp" },
  { label: "Agroha Dham", labelHi: "अग्रोहा धाम", query: "agroha" },
  { label: "Office Bearers", labelHi: "पदाधिकारी", query: "leadership" },
  { label: "Membership", labelHi: "सदस्यता", query: "membership" },
  { label: "Donation", labelHi: "सहयोग दान", query: "donate" },
  { label: "Events", labelHi: "कार्यक्रम", query: "events" },
  { label: "Gallery", labelHi: "गैलरी", query: "gallery" },
];

export default function SearchModal() {
  const router = useRouter();
  const { isSearchOpen, closeSearch, lang } = useApp();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Global Keyboard Shortcut: '/' or 'Cmd+K' / 'Ctrl+K' opens search, 'Escape' closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isSearchOpen && (e.target as HTMLElement)?.tagName !== "INPUT" && (e.target as HTMLElement)?.tagName !== "TEXTAREA")) {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else {
          // Open search modal
          inputRef.current?.focus();
        }
      } else if (e.key === "Escape" && isSearchOpen) {
        e.preventDefault();
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Filter items
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // When empty, show top 6 recommended pages/destinations
      return SEARCH_DATABASE.slice(0, 6);
    }

    const words = q.split(/\s+/).filter(Boolean);
    return SEARCH_DATABASE.filter((item) => {
      const haystack = [
        item.title.toLowerCase(),
        item.titleHi.toLowerCase(),
        item.categoryLabel.toLowerCase(),
        item.categoryLabelHi.toLowerCase(),
        item.description.toLowerCase(),
        item.descriptionHi.toLowerCase(),
        ...item.keywords.map((k) => k.toLowerCase()),
      ].join(" ");

      return words.every((w) => haystack.includes(w));
    });
  }, [query]);

  // Handle arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredResults[selectedIndex];
      if (target) {
        handleNavigate(target.href);
      }
    }
  };

  const handleNavigate = (href: string) => {
    closeSearch();
    router.push(href);
  };

  if (!isSearchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search website"
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150 overflow-y-auto"
      onClick={closeSearch}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl border border-[#E8DFD3] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP SEARCH INPUT BAR */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-[#E8DFD3] bg-[#FFFDF9]">
          <Search className="w-5 h-5 text-[#7F160C] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              lang === "hi"
                ? "वेबसाइट, पदाधिकारी, प्रकल्प या पेज खोजें..."
                : "Search pages, leadership, initiatives, events..."
            }
            className="flex-1 bg-transparent text-sm sm:text-base text-gray-900 placeholder:text-gray-400 outline-none font-medium"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-gray-200">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-gray-500 bg-gray-100 border border-gray-300 rounded shadow-2xs">
              ESC
            </kbd>
          </div>

          <button
            type="button"
            onClick={closeSearch}
            className="p-1 rounded-lg text-gray-500 hover:text-[#7F160C] hover:bg-gray-100 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QUICK SUGGESTION CHIPS (VISIBLE WHEN QUERY IS EMPTY) */}
        {!query && (
          <div className="px-4 sm:px-5 py-2.5 bg-[#FFF9F2] border-b border-[#E8DFD3]/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <span className="text-[11px] font-bold text-gray-500 shrink-0 uppercase tracking-wider mr-1">
              {lang === "hi" ? "त्वरित खोज:" : "Quick:"}
            </span>
            {SUGGESTED_CHIPS.map((chip) => (
              <button
                key={chip.query}
                type="button"
                onClick={() => {
                  setQuery(chip.query);
                  setSelectedIndex(0);
                }}
                className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#E7D8C8] text-[#7F160C] hover:bg-[#7F160C] hover:text-white hover:border-[#7F160C] font-semibold transition-all shrink-0 cursor-pointer shadow-2xs"
              >
                {lang === "hi" ? chip.labelHi : chip.label}
              </button>
            ))}
          </div>
        )}

        {/* RESULTS CONTAINER */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 p-2 sm:p-3">
          {filteredResults.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6 stroke-[1.8]" />
              </div>
              <p className="text-sm font-bold text-gray-800">
                {lang === "hi" ? `"${query}" के लिए कोई परिणाम नहीं मिला` : `No results found for "${query}"`}
              </p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {lang === "hi"
                  ? "कृपया कोई अन्य शब्द या गोत्र/जिले का नाम लिखकर खोजें।"
                  : "Please check your spelling or try searching for another topic or keyword."}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>{query ? (lang === "hi" ? "खोज परिणाम" : "Search Results") : (lang === "hi" ? "शीर्ष पृष्ठ" : "Top Pages")}</span>
                <span>{filteredResults.length} {lang === "hi" ? "उपलब्ध" : "results"}</span>
              </div>

              {filteredResults.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.href)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#FAF3EA] text-[#7F160C]"
                        : "hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#7F160C] text-white"
                          : "bg-gray-100 text-[#7F160C]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm sm:text-[15px] truncate block text-gray-900">
                        {lang === "hi" ? item.titleHi : item.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER SHORTCUT HINT */}
        <div className="px-4 py-2 bg-[#FFF9F2] border-t border-[#E8DFD3] flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded font-mono text-[9px]">↑</kbd>
              <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded font-mono text-[9px]">↓</kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded font-mono text-[9px]">↵</kbd>
              <span>select</span>
            </span>
          </div>
          <span className="hidden sm:inline font-medium text-gray-400">
            Aggarwal Vaish Vikas Sangathan Portal
          </span>
        </div>
      </div>
    </div>
  );
}
