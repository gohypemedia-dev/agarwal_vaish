"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, User, Phone, CheckCircle2, Filter } from "lucide-react";
import HeadingDivider from "@/components/HeadingDivider";

const HARYANA_DISTRICTS = [
  "All Districts (समस्त हरियाणा)",
  "Ambala (अम्बाला)", "Bhiwani (भिवानी)", "Charkhi Dadri (चरखी दादरी)", "Faridabad (फरीदाबाद)", 
  "Fatehabad (फतेहाबाद)", "Gurugram (गुरुग्राम)", "Hisar (हिसार)", "Jhajjar (झज्जर)", 
  "Jind (जींद)", "Kaithal (कैथल)", "Karnal (करनाल)", "Kurukshetra (कुरुक्षेत्र)", 
  "Mahendragarh (महेंद्रगढ़)", "Nuh (नूह)", "Palwal (पलवल)", "Panchkula (पंचकूला)", 
  "Panipat (पानीपत)", "Rewari (रेवाड़ी)", "Rohtak (रोहतक)", "Sirsa (सिरसा)", 
  "Sonipat (सोनीपत)", "Yamunanagar (यमुनानगर)"
];

const SAMPLE_MEMBERS = [
  { id: 1, name: "अशोक बुवानीवाला", gotra: "गोयल", district: "भिवानी", role: "प्रदेश अध्यक्ष", phone: "+91 98120 XXXXX", verified: true },
  { id: 2, name: "राजीव गुप्ता", gotra: "गर्ग", district: "हिसार", role: "प्रधान महासचिव", phone: "+91 94160 XXXXX", verified: true },
  { id: 3, name: "सतीश गोयल", gotra: "गोयल", district: "गुरुग्राम", role: "संगठन सचिव", phone: "+91 98100 XXXXX", verified: true },
  { id: 4, name: "विकास गर्ग", gotra: "गर्ग", district: "रोहतक", role: "कोषाध्यक्ष", phone: "+91 92150 XXXXX", verified: true },
  { id: 5, name: "श्रीमती रेखा गुप्ता", gotra: "मित्तल", district: "गुरुग्राम", role: "प्रदेश अध्यक्षा, महिला प्रकोष्ठ", phone: "+91 98111 XXXXX", verified: true },
  { id: 6, name: "राहुल तायल", gotra: "तायल", district: "हिसार", role: "प्रदेश अध्यक्ष, युवा प्रकोष्ठ", phone: "+91 98125 XXXXX", verified: true },
  { id: 7, name: "दिनेश कुमार", gotra: "बंसल", district: "पानीपत", role: "अध्यक्ष, व्यापार प्रकोष्ठ", phone: "+91 94161 XXXXX", verified: true },
  { id: 8, name: "नरेश बंसल", gotra: "बंसल", district: "करनाल", role: "वरिष्ठ उपाध्यक्ष", phone: "+91 98960 XXXXX", verified: true },
];

export default function AdvanceSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts (समस्त हरियाणा)");

  const filteredMembers = SAMPLE_MEMBERS.filter((m) => {
    const matchesName = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.gotra.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === "All Districts (समस्त हरियाणा)" || m.district === selectedDistrict.split(" ")[0];
    return matchesName && matchesDistrict;
  });

  return (
    <div className="w-full bg-[#FFFDF9] text-[#1F1712] font-sans selection:bg-[#7F160C] selection:text-white">
      {/* 1. PAGE HEADER */}
      <section className="py-10 sm:py-14 bg-[#FFF9F2] border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[46px] text-[#7F160C] tracking-tight">
            Advance Member Search
          </h1>
          <HeadingDivider className="mt-3" />
          <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-widest mt-2">
            सदस्य खोज • हरियाणा राज्यव्यापी वैश्य समाज डायरेक्टरी
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <section className="py-10 sm:py-16 bg-[#FFFDF9]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#7F160C]/25 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="max-w-2xl">
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
                नाम, गोत्र या जिला के आधार पर खोजें
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                संगठन के पंजीकृत पदाधिकारियों और सदस्यों की आधिकारिक जानकारी प्राप्त करें।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="सदस्य का नाम, गोत्र या पद दर्ज करें..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#7F160C] focus:ring-2 focus:ring-[#7F160C]/20 outline-none text-sm font-medium transition-all"
                />
              </div>

              <div className="md:col-span-5 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#7F160C] focus:ring-2 focus:ring-[#7F160C]/20 outline-none text-sm font-medium transition-all bg-white cursor-pointer"
                >
                  {HARYANA_DISTRICTS.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3. SEARCH RESULTS GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-gray-600 uppercase tracking-wider px-1">
              <span>परिणाम: {filteredMembers.length} सदस्य उपलब्ध</span>
              <span className="text-[#7F160C]">सत्यापित डायरेक्टरी</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMembers.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm hover:shadow-lg hover:border-[#7F160C] transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-full bg-[#FFF9F2] text-[#7F160C] border border-[#7F160C]/25 font-bold flex items-center justify-center text-sm">
                        {m.name.charAt(0) || "वै"}
                      </div>
                      <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-green-200">
                        <CheckCircle2 className="w-3 h-3" />
                        सत्यापित
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans font-bold text-lg text-gray-900 leading-snug">
                        {m.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#7F160C] mt-0.5">
                        {m.role}
                      </p>
                      <p className="text-[11px] text-gray-500 font-medium">
                        गोत्र: {m.gotra}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#7F160C] shrink-0" />
                      <span>जिला: {m.district} (हरियाणा)</span>
                    </p>
                    <p className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-[#7F160C] shrink-0" />
                      <span>{m.phone}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
