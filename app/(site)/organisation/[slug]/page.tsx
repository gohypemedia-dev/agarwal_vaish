import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Shield, Award, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import HeadingDivider from "@/components/HeadingDivider";

interface WingInfo {
  title: string;
  titleHi: string;
  desc: string;
  mandate: string;
  members: { name: string; role: string; district: string }[];
}

const WINGS_DATA: Record<string, WingInfo> = {
  "president-cell": {
    title: "President Cell",
    titleHi: "अध्यक्ष प्रकोष्ठ (President Secretariat)",
    desc: "प्रदेश अध्यक्ष सचिवालय जो संगठन के राज्यव्यापी अभियानों, संवाद, नीति-निर्धारण और मीडिया समन्वय का केंद्रीय नियंत्रण करता है।",
    mandate: "समस्त 23 जिलों के संगठनात्मक कार्यों, आधिकारिक विज्ञप्तियों और नीतिगत निर्णयों का संचालन।",
    members: [
      { name: "श्री अशोक बुवानीवाला", role: "प्रदेश अध्यक्ष", district: "भिवानी / केंद्रीय" },
      { name: "श्री राजीव गुप्ता", role: "प्रधान महासचिव", district: "हिसार" },
      { name: "श्री सतीश गोयल", role: "संगठन सचिव", district: "गुरुग्राम" },
      { name: "श्री विकास गर्ग", role: "कोषाध्यक्ष", district: "रोहतक" },
    ],
  },
  cwc: {
    title: "Central Working Committee (CWC)",
    titleHi: "प्रदेश कार्यकारिणी (CWC)",
    desc: "अग्रवाल वैश्य विकास संगठन की सर्वोच्च नीति-निर्धारक संस्था जो समाजहित के निर्णयों और अभियानों को अंतिम रूप देती है।",
    mandate: "वार्षिक कार्ययोजना, सम्मेलन, पंच संकल्प का क्रियान्वयन और जिला इकाइयों की समीक्षा।",
    members: [
      { name: "श्री अशोक बुवानीवाला", role: "अध्यक्ष", district: "भिवानी" },
      { name: "श्री नरेश बंसल", role: "वरिष्ठ उपाध्यक्ष", district: "करनाल" },
      { name: "श्री पवन मित्तल", role: "उपाध्यक्ष", district: "पानीपत" },
      { name: "श्री दीपक सिंघल", role: "महासचिव", district: "अंबाला" },
      { name: "श्री अमित तायल", role: "सचिव", district: "सिरसा" },
    ],
  },
  patrons: {
    title: "Patrons Board",
    titleHi: "संरक्षक मंडल (Patrons)",
    desc: "समाज के वरिष्ठतम प्रबुद्ध नागरिकों, उद्योगपतियों और पूर्व जनसेवकों का मार्गदर्शन मंडल जो संगठन को दिशा प्रदान करता है।",
    mandate: "मूल्यों, सांस्कृतिक शुचिता और दीर्घकालिक सामाजिक लक्ष्यों के प्रति दिशा-निर्देशन।",
    members: [
      { name: "श्री सत्यनारायण अग्रवाल", role: "मुख्य संरक्षक", district: "फरीदाबाद" },
      { name: "श्री ओमप्रकाश गुप्ता", role: "संरक्षक", district: "हिसार" },
      { name: "श्री रामअवतार जिंदल", role: "संरक्षक", district: "यमुनानगर" },
    ],
  },
  "mahila-wing": {
    title: "Mahila Wing",
    titleHi: "महिला प्रकोष्ठ (Women's Wing)",
    desc: "वैश्य समाज की मातृशक्ति को सार्वजनिक जीवन, सामाजिक नेतृत्व और उद्यमिता में सशक्त करने हेतु समर्पित प्रकोष्ठ।",
    mandate: "महिला स्व-सहायता समूह, बेटी बचाओ-बेटी पढ़ाओ, नारी स्वावलंबन और पारिवारिक संस्कार संवर्धन।",
    members: [
      { name: "श्रीमती रेखा गुप्ता", role: "प्रदेश अध्यक्षा, महिला प्रकोष्ठ", district: "गुरुग्राम" },
      { name: "श्रीमती सुनीता गोयल", role: "वरिष्ठ उपाध्यक्ष", district: "पंचकूला" },
      { name: "श्रीमती अंजना बंसल", role: "महासचिव", district: "रोहतक" },
      { name: "श्रीमती पूजा गर्ग", role: "कोषाध्यक्ष", district: "सोनीपत" },
    ],
  },
  "youth-wing": {
    title: "Youth Wing",
    titleHi: "युवा प्रकोष्ठ (Youth Wing)",
    desc: "18 से 35 वर्ष के युवाओं को नेतृत्व, रोजगार, स्टार्टअप मार्गदर्शन और खेल-कूद में मंच प्रदान करने वाला ऊर्जावान प्रकोष्ठ।",
    mandate: "युवा नेतृत्व सम्मेलन, करियर काउंसलिंग, रक्तदान शिविर और डिजिटल सशक्तिकरण अभियान।",
    members: [
      { name: "श्री राहुल तायल", role: "प्रदेश अध्यक्ष, युवा प्रकोष्ठ", district: "हिसार" },
      { name: "श्री गौरव अग्रवाल", role: "वरिष्ठ उपाध्यक्ष", district: "करनाल" },
      { name: "श्री मोहित जिंदल", role: "महासचिव", district: "कैथल" },
      { name: "श्री अंकित गर्ग", role: "सचिव", district: "कुरुक्षेत्र" },
    ],
  },
  "district-president": {
    title: "District Presidents",
    titleHi: "जिला अध्यक्ष परिषद (District Leadership)",
    desc: "हरियाणा के सभी जिलों में संगठन की रीढ़ के रूप में कार्यरत जिला अध्यक्षों का समर्पित नेतृत्व समूह।",
    mandate: "तहसील और खंड स्तर तक संगठन विस्तार, सदस्य सत्यापन और स्थानीय समस्याओं का निवारण।",
    members: [
      { name: "श्री संजय मित्तल", role: "जिला अध्यक्ष, गुरुग्राम", district: "गुरुग्राम" },
      { name: "श्री राजेश बंसल", role: "जिला अध्यक्ष, हिसार", district: "हिसार" },
      { name: "श्री राकेश गोयल", role: "जिला अध्यक्ष, करनाल", district: "करनाल" },
      { name: "श्री मनोज अग्रवाल", role: "जिला अध्यक्ष, रोहतक", district: "रोहतक" },
      { name: "श्री विजय गर्ग", role: "जिला अध्यक्ष, फरीदाबाद", district: "फरीदाबाद" },
      { name: "श्री सुनील तायल", role: "जिला अध्यक्ष, भिवानी", district: "भिवानी" },
    ],
  },
  "frontal-organization": {
    title: "Frontal Organization",
    titleHi: "अग्रिम संगठन एवं व्यापार प्रकोष्ठ (Frontal Cells)",
    desc: "व्यापारियों, उद्योगपतियों, अधिवक्ताओं, चिकित्सकों और शिक्षकों के लिए विशेष प्रकोष्ठ जो नीतिगत पैरवी करते हैं।",
    mandate: "व्यापारी सुरक्षा, जीएसटी व कर परामर्श, शिक्षा एवं चिकित्सा सहायता शिविरों का संचालन।",
    members: [
      { name: "श्री दिनेश कुमार", role: "अध्यक्ष, व्यापार प्रकोष्ठ", district: "पानीपत" },
      { name: "श्री विमल जैन", role: "प्रमुख, विधिक प्रकोष्ठ (Legal Cell)", district: "चंडीगढ़ / पंचकूला" },
      { name: "डॉ. एन. के. गोयल", role: "प्रमुख, चिकित्सा प्रकोष्ठ (Medical Cell)", district: "रोहतक" },
    ],
  },
};

export default async function OrganisationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wing = WINGS_DATA[slug] || WINGS_DATA["president-cell"];

  return (
    <div className="w-full bg-[#FFFDF9] text-[#1F1712] font-sans selection:bg-[#7F160C] selection:text-white">
      {/* 1. PAGE HEADER */}
      <section className="py-10 sm:py-14 bg-[#FFF9F2] border-b border-[#E8DFD3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[46px] text-[#7F160C] tracking-tight">
            {wing.title}
          </h1>
          <HeadingDivider className="mt-3" />
          <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-widest mt-2">
            {wing.titleHi} • सांगठनिक इकाई
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW & MANDATE */}
      <section className="py-10 sm:py-16 bg-[#FFFDF9]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#7F160C]/25 shadow-xl p-6 sm:p-10 space-y-5">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#7F160C]/10 text-[#7F160C] text-xs font-bold uppercase tracking-wider">
              इकाई परिचय एवं कार्यक्षेत्र
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-gray-900 leading-snug">
              {wing.titleHi}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              {wing.desc}
            </p>
            <div className="p-4 bg-[#FFF9F2] rounded-xl border border-[#7F160C]/20 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#7F160C] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">
                <strong>मुख्य दायित्व:</strong> {wing.mandate}
              </p>
            </div>
          </div>

          {/* 3. KEY MEMBERS & OFFICE BEARERS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 flex-wrap gap-2">
              <h3 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
                प्रमुख पदाधिकारी एवं सदस्यगण
              </h3>
              <span className="text-xs font-bold text-[#7F160C] uppercase tracking-wider bg-[#FFF9F2] px-3 py-1 rounded-full border border-[#7F160C]/20">
                सक्रिय कार्यकारिणी सूची
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wing.members.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm hover:shadow-md hover:border-[#7F160C] transition-all space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#7F160C]/10 text-[#7F160C] font-bold flex items-center justify-center text-sm border border-[#7F160C]/20">
                      {m.name.charAt(3) || "वै"}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-base text-gray-900 leading-tight">
                        {m.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#7F160C] mt-0.5">
                        {m.role}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#7F160C]" />
                      <span>{m.district}</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                      अधिकृत
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. OTHER WINGS QUICK LINKS */}
          <div className="p-6 sm:p-8 bg-[#FFF9F2] rounded-2xl border border-[#7F160C]/20 space-y-4">
            <h4 className="font-sans font-bold text-base text-[#7F160C] uppercase tracking-wider">
              अन्य सांगठनिक प्रकोष्ठ देखें:
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {Object.entries(WINGS_DATA).map(([key, data]) => (
                <Link
                  key={key}
                  href={`/organisation/${key}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    key === slug
                      ? "bg-[#7F160C] text-white shadow-xs"
                      : "bg-white text-gray-800 border border-gray-200 hover:border-[#7F160C] hover:text-[#7F160C]"
                  }`}
                >
                  {data.title}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
