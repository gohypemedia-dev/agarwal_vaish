"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, CheckCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useApp } from "@/context/AppContext";
import { MEMBERSHIP_PLANS, formatINR } from "@/lib/donation-config";
import HeadingDivider from "@/components/HeadingDivider";
import {
  sanitizeEmail,
  sanitizeMobile,
  sanitizeName,
  validateEmail,
  validateMobile,
  validateName,
} from "@/lib/validation/donation";

export default function MembershipPage() {
  const { lang, openDonateModal } = useApp();
  const [planId, setPlanId] = useState<string>("patron");
  const [consent, setConsent] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    guardianName: "",
    gender: "",
    caste: "",
    gotra: "",
    email: "",
    phone: "",
    dob: "",
    state: "Haryana",
    district: "",
    address: "",
    wardNumber: "",
    pincode: "",
    occupation: "",
    occupationDetails: "",
    photoName: "",
  });
  const [copiedUpi, setCopiedUpi] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("aggarwalvaishvikassangathan@idbi");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const tiers = [
    {
      id: "active",
      name: "Active Member",
      nameHi: "सक्रिय सदस्य",
      price: 100,
      period: "lifetime",
      periodHi: "आजीवन",
      desc: "For every Vaish brother and sister committed to grassroots community empowerment.",
      descHi: "वैश्य समाज के प्रत्येक जागरूक बंधु व भगिनी के लिए, जो समाज के उत्थान में सक्रिय भूमिका निभाना चाहते हैं।",
      features: [
        "Official Member Digital ID & Certificate",
        "Direct participation in community conventions & drives",
        "Invitation to District & State Level Sammelans",
        "Active involvement in Panch Sankalp initiatives",
      ],
      featuresHi: [
        "आधिकारिक डिजिटल सदस्यता पहचान पत्र व प्रमाणपत्र",
        "संगठन के सामाजिक व जनसेवा अभियानों में सीधी सहभागिता",
        "ज़िला एवं राज्यस्तरीय सम्मेलनों में विशेष आमंत्रण",
        "पंच संकल्प के सामाजिक प्रकल्पों में सक्रिय योगदान",
      ],
      highlight: false,
      cardStyle: "bg-[#FFF9F2] border-2 border-[#E7D8C8] shadow-sm hover:border-[#7F160C]/50 relative",
      badgeText: null,
      badgeTextHi: null,
      badgeStyle: "",
      priceColor: "text-[#7F160C]",
      checkColor: "text-[#7F160C]",
      buttonStyle: "btn-outline w-full hover:bg-[#7F160C] hover:text-white transition-colors",
    },
    {
      id: "co_patron",
      name: "Co-Patron Member",
      nameHi: "सह-संरक्षक सदस्य",
      price: 21000,
      period: "lifetime",
      periodHi: "आजीवन",
      desc: "For respected business leaders and mentors supporting district operations and youth growth.",
      descHi: "समाज के प्रतिष्ठित उद्यमियों, व्यापारियों व मार्गदर्शकों हेतु जो ज़िला स्तर पर संगठन को सशक्त बनाते हैं।",
      features: [
        "All Active Membership privileges included",
        "Felicitation & stage honor at State Sammelans",
        "Nomination to District & State Advisory Council",
        "Special Co-Patron Scroll & Commemorative Plaque",
      ],
      featuresHi: [
        "सक्रिय सदस्यता के सभी विशेषाधिकार सम्मिलित",
        "राज्यस्तरीय सम्मेलनों में मंच पर विशिष्ट सम्मान व सत्कार",
        "ज़िला व राज्य सलाहकार समिति में मनोनयन का अवसर",
        "विशिष्ट सह-संरक्षक प्रशस्ति पत्र व स्मृति चिन्ह",
      ],
      highlight: true,
      cardStyle: "bg-gradient-to-b from-[#FFFDF7] via-[#FFF9EA] to-[#FFF3D6] border-2 border-[#D4A359] shadow-md hover:border-[#7F160C] relative",
      badgeText: "MOST POPULAR",
      badgeTextHi: "सर्वाधिक लोकप्रिय",
      badgeStyle: "bg-gradient-to-r from-[#D48820] to-[#7F160C] text-white shadow-sm",
      priceColor: "text-[#7F160C]",
      checkColor: "text-[#7F160C]",
      buttonStyle: "btn-primary w-full bg-[#7F160C] hover:bg-[#69120A] text-white",
    },
    {
      id: "patron",
      name: "Patron Member",
      nameHi: "संरक्षक सदस्य",
      price: 100000,
      period: "lifetime",
      periodHi: "आजीवन",
      desc: "Highest leadership patron supporting state-level infrastructure, institutions and community welfare.",
      descHi: "संगठन का सर्वोच्च संरक्षक स्तर, जो राज्यस्तरीय प्रकल्पों, भवनों व समाज के दूरगामी विकास को नई दिशा देते हैं।",
      features: [
        "Lifetime Chief Patron status & highest VIP protocol",
        "Permanent membership in State Core Policy & Executive Board",
        "Prominent permanent inscription at state headquarters",
        "Grand memento, framed royal scroll & lifetime citation",
      ],
      featuresHi: [
        "आजीवन मुख्य संरक्षक दर्जा एवं सर्वोच्च वीआईपी सत्कार",
        "राज्यस्तरीय उच्च कोर समिति व नीति निर्माण में स्थायी स्थान",
        "राज्य मुख्यालय व केंद्रीय कार्यालय में स्थायी नाम पट्टिका",
        "भव्य स्मृति चिन्ह, फ्रेमयुक्त मानपत्र व आजीवन सम्मान",
      ],
      highlight: false,
      cardStyle: "bg-gradient-to-b from-[#FDF8F5] to-[#F5ECE5] border-2 border-[#7F160C]/30 shadow-md hover:border-[#7F160C] relative",
      badgeText: "PATRON TIER",
      badgeTextHi: "संरक्षक श्रेणी",
      badgeStyle: "bg-[#7F160C] text-white shadow-sm",
      priceColor: "text-[#7F160C]",
      checkColor: "text-[#7F160C]",
      buttonStyle: "w-full min-h-[48px] px-6 bg-[#7F160C] hover:bg-[#69120A] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer",
    },
  ];

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "fullName") {
      const err = validateName(formData.fullName);
      setErrors((prev) => ({ ...prev, fullName: err || undefined }));
    } else if (field === "email") {
      const err = validateEmail(formData.email);
      setErrors((prev) => ({ ...prev, email: err || undefined }));
    } else if (field === "phone") {
      const err = validateMobile(formData.phone, true);
      setErrors((prev) => ({ ...prev, phone: err || undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = validateName(formData.fullName);
    const emailErr = formData.email ? validateEmail(formData.email) : null;
    const phoneErr = validateMobile(formData.phone, true);

    if (nameErr || emailErr || phoneErr) {
      setErrors({
        fullName: nameErr || undefined,
        email: emailErr || undefined,
        phone: phoneErr || undefined,
      });
      if (nameErr) document.getElementById("mem-fullname")?.focus();
      else if (emailErr) document.getElementById("mem-email")?.focus();
      else if (phoneErr) document.getElementById("mem-phone")?.focus();
      return;
    }

    const plan = MEMBERSHIP_PLANS.find((p) => p.id === planId) ?? MEMBERSHIP_PLANS[0];

    // Scroll to the QR payment card smoothly
    const qrSection = document.getElementById("payment-qr");
    if (qrSection) {
      qrSection.scrollIntoView({ behavior: "smooth" });
    }

    openDonateModal(plan.name, plan.price, true, {
      name: sanitizeName(formData.fullName),
      email: formData.email ? sanitizeEmail(formData.email) : undefined,
      mobile: sanitizeMobile(formData.phone),
    });
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-[#000000] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">
      {/* 1. TOP PAGE HEADER */}
      <section className="pt-8 sm:pt-12 pb-2 bg-[#FAF7F2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            Membership Registration
          </h1>
          <HeadingDivider className="mt-2.5" />
        </div>
      </section>

      {/* 2. MEMBERSHIP REGISTRATION FORM */}
      <section className="pt-2 sm:pt-4 pb-12 sm:pb-16 bg-[#FAF7F2]">
        <div className="page-container max-w-4xl">
          {/* Form Card (White Background) */}
          <div className="p-6 sm:p-10 bg-white border border-[#E8DFD3] rounded-[24px] shadow-sm">
            <form onSubmit={handleFormSubmit} noValidate className="space-y-8">
              {/* SECTION 1: PERSONAL DETAILS */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#7F160C]">
                  {lang === "hi" ? "व्यक्तिगत विवरण" : "Personal Details"}
                </h3>

                {/* Photo Upload */}
                <div>
                  <label className="block text-[16px] font-bold text-[#1F1712] mb-2">
                    {lang === "hi" ? "फोटो" : "Photo"}
                  </label>
                  <div className="border border-dashed border-[#7F160C] rounded-lg px-3.5 py-2.5 bg-white inline-flex items-center gap-3">
                    <label className="inline-flex items-center px-4 py-2 rounded border border-[#D1D5DB] bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[16px] font-semibold text-[#1F1712] cursor-pointer transition-colors">
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData({ ...formData, photoName: e.target.files[0].name });
                          }
                        }}
                      />
                    </label>
                    <span className="text-[16px] text-[#6B7280]">
                      {formData.photoName || "No file chosen"}
                    </span>
                  </div>
                </div>

                {/* Row 1: Full Name, S/o W/o D/o, Gender (3 Equal Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="mem-fullname" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "पूरा नाम" : "Full Name"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="mem-fullname"
                      type="text"
                      required
                      maxLength={60}
                      placeholder={lang === "hi" ? "पूरा नाम" : "Full Name"}
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName && validateName(e.target.value) === null) {
                          setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }
                      }}
                      onBlur={() => handleBlur("fullName")}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                    {errors.fullName && (touched.fullName || errors.fullName) && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="mem-guardian" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "पिता / पति का नाम" : "S/o, W/o, D/o"}
                    </label>
                    <input
                      id="mem-guardian"
                      type="text"
                      maxLength={60}
                      placeholder={lang === "hi" ? "पिता / पति का नाम" : "S/o, W/o, D/o Name"}
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="mem-gender" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "लिंग" : "Gender"} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="mem-gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] outline-none transition-all cursor-pointer"
                    >
                      <option value="">{lang === "hi" ? "--लिंग चुनें--" : "--Select Gender--"}</option>
                      <option value="Male">{lang === "hi" ? "पुरुष (Male)" : "Male"}</option>
                      <option value="Female">{lang === "hi" ? "महिला (Female)" : "Female"}</option>
                      <option value="Other">{lang === "hi" ? "अन्य (Other)" : "Other"}</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Caste, Gotra, Email (3 Equal Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="mem-caste" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "जाति" : "Caste"}
                    </label>
                    <input
                      id="mem-caste"
                      type="text"
                      maxLength={40}
                      placeholder={lang === "hi" ? "जाति" : "Caste"}
                      value={formData.caste}
                      onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="mem-gotra" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "गोत्र" : "Gotra"}
                    </label>
                    <input
                      id="mem-gotra"
                      type="text"
                      maxLength={40}
                      placeholder={lang === "hi" ? "गोत्र" : "Gotra"}
                      value={formData.gotra}
                      onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="mem-email" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "ईमेल" : "Email"}
                    </label>
                    <input
                      id="mem-email"
                      type="email"
                      maxLength={254}
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email && validateEmail(e.target.value) === null) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                      onBlur={() => handleBlur("email")}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                    {errors.email && (touched.email || errors.email) && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Phone Number, Date of Birth, Empty Col (3 Equal Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="mem-phone" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "मोबाइल नंबर" : "Phone Number"} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-[16px] text-[#4B5563] font-medium select-none flex items-center gap-1.5">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        id="mem-phone"
                        type="tel"
                        inputMode="numeric"
                        required
                        maxLength={10}
                        placeholder=""
                        value={formData.phone}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length > 10 && val.startsWith("91")) {
                            val = val.slice(2);
                          }
                          const sanitized = val.slice(0, 10);
                          setFormData({ ...formData, phone: sanitized });
                          if (errors.phone && validateMobile(sanitized, true) === null) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        onBlur={() => handleBlur("phone")}
                        className="w-full h-12 !pl-20 pr-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] outline-none transition-all"
                      />
                    </div>
                    {errors.phone && (touched.phone || errors.phone) && (
                      <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="mem-dob" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "जन्म तिथि" : "Date of Birth"}
                    </label>
                    <input
                      id="mem-dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] outline-none transition-all cursor-pointer"
                    />
                  </div>

                  {/* Empty 3rd Column for exact 3-col alignment */}
                  <div className="hidden sm:block" />
                </div>
              </div>

              {/* SECTION 2: ADDRESS DETAILS */}
              <div className="space-y-6 pt-6 border-t border-[#F3F4F6]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#7F160C]">
                  {lang === "hi" ? "पते का विवरण" : "Address Details"}
                </h3>

                {/* Row 1: State, District, Address (3 Equal Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="mem-state" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "राज्य" : "State"} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="mem-state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] outline-none transition-all cursor-pointer"
                    >
                      <option value="Haryana">Haryana (हरियाणा)</option>
                      <option value="Delhi">Delhi (दिल्ली)</option>
                      <option value="Uttar Pradesh">Uttar Pradesh (उत्तर प्रदेश)</option>
                      <option value="Rajasthan">Rajasthan (राजस्थान)</option>
                      <option value="Punjab">Punjab (पंजाब)</option>
                      <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
                      <option value="Bihar">Bihar (बिहार)</option>
                      <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
                      <option value="Gujarat">Gujarat (गुजरात)</option>
                      <option value="Other">Other State (अन्य)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mem-district" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "जिला" : "District"} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="mem-district"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] outline-none transition-all cursor-pointer"
                    >
                      <option value="">{lang === "hi" ? "--जिला चुनें--" : "--Select District--"}</option>
                      {[
                        "Ambala", "Bhiwani", "Chandigarh", "Charkhi Dadri", "Faridabad", "Fatehabad",
                        "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra",
                        "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak",
                        "Sirsa", "Sonipat", "Yamunanagar", "Other"
                      ].map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mem-address" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "वर्तमान पता" : "Address"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="mem-address"
                      type="text"
                      placeholder={lang === "hi" ? "वर्तमान पता" : "Current Address"}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Ward Number, Pincode, Empty Col (3 Equal Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="mem-ward" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "वार्ड नंबर" : "Ward Number"}
                    </label>
                    <input
                      id="mem-ward"
                      type="text"
                      maxLength={20}
                      placeholder={lang === "hi" ? "वार्ड नंबर" : "Ward Number"}
                      value={formData.wardNumber}
                      onChange={(e) => setFormData({ ...formData, wardNumber: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="mem-pincode" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "पिनकोड" : "Pincode"}
                    </label>
                    <input
                      id="mem-pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder={lang === "hi" ? "पिनकोड" : "Pincode"}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                  </div>

                  {/* Empty 3rd Column for exact 3-col alignment */}
                  <div className="hidden sm:block" />
                </div>

                {/* Row 3: Occupation, Occupation Details, Empty Col (3 Equal Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="mem-occupation" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "व्यवसाय" : "Occupation"}
                    </label>
                    <select
                      id="mem-occupation"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] outline-none transition-all cursor-pointer"
                    >
                      <option value="">{lang === "hi" ? "--व्यवसाय चुनें--" : "--Select Occupation--"}</option>
                      <option value="Business">{lang === "hi" ? "व्यवसाय (Business)" : "Business"}</option>
                      <option value="Private Job">{lang === "hi" ? "निजी सेवा (Private Job)" : "Private Job"}</option>
                      <option value="Government Job">{lang === "hi" ? "सरकारी सेवा (Govt Job)" : "Government Job"}</option>
                      <option value="Agriculture">{lang === "hi" ? "कृषि (Agriculture)" : "Agriculture"}</option>
                      <option value="Social Work">{lang === "hi" ? "समाज सेवा (Social Work)" : "Social Work"}</option>
                      <option value="Self Employed">{lang === "hi" ? "स्वरोजगार (Self Employed)" : "Self Employed"}</option>
                      <option value="Student">{lang === "hi" ? "विद्यार्थी (Student)" : "Student"}</option>
                      <option value="Homemaker">{lang === "hi" ? "गृहिणी (Homemaker)" : "Homemaker"}</option>
                      <option value="Other">{lang === "hi" ? "अन्य (Other)" : "Other"}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mem-occ-details" className="block text-[16px] font-bold text-[#1F1712] mb-2">
                      {lang === "hi" ? "व्यवसाय का विवरण" : "Occupation Details"}
                    </label>
                    <input
                      id="mem-occ-details"
                      type="text"
                      placeholder={lang === "hi" ? "विवरण दर्ज करें" : "Mention Details"}
                      value={formData.occupationDetails}
                      onChange={(e) => setFormData({ ...formData, occupationDetails: e.target.value })}
                      className="w-full h-12 px-4 bg-white border border-[#D1D5DB] focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] rounded-lg text-[16px] text-[#1F1712] placeholder:text-[#9CA3AF] outline-none transition-all"
                    />
                  </div>

                  {/* Empty 3rd Column for exact 3-col alignment */}
                  <div className="hidden sm:block" />
                </div>
              </div>

              {/* SECTION 3: MEMBERSHIP PAYMENT & QR CODE (SPECIAL HIGHLIGHTED CARD MATCHING REF PIC 2) */}
              <div id="payment-qr" className="mt-8 p-5 sm:p-7 lg:p-8 bg-[#FFF9F2] border border-[#E8DFD3] rounded-2xl shadow-xs space-y-4">
                {/* Header & Instructions */}
                <div>
                  <h3 className="font-bold text-xl sm:text-2xl text-[#0A2540]">
                    {lang === "hi" ? "सदस्यता भुगतान" : "Membership Payment"}
                  </h3>
                  <p className="text-[16px] text-[#4B5563] mt-1">
                    {lang === "hi"
                      ? "कृपया नीचे दिए गए QR कोड को स्कैन करके अपना सदस्यता सहयोग पूरा करें।"
                      : "Please complete your membership payment by scanning the QR code below."}
                  </p>
                </div>

                {/* 4 Steps */}
                <ol className="text-[16px] text-[#374151] space-y-2.5 leading-relaxed pt-1">
                  <li>
                    1. {lang === "hi"
                      ? "अपने पसंदीदा UPI ऐप (GPay, PhonePe, Paytm, BHIM) से QR कोड स्कैन करें।"
                      : "Scan the QR code using your preferred UPI app."}
                  </li>
                  <li>
                    2. {lang === "hi"
                      ? `लागू सदस्यता राशि का भुगतान करें: ${formatINR(
                          (MEMBERSHIP_PLANS.find((p) => p.id === planId) ?? MEMBERSHIP_PLANS[0]).price
                        )}`
                      : "Check the available membership plans below and pay the applicable amount."}
                  </li>
                  <li>
                    3. {lang === "hi"
                      ? "भुगतान का स्क्रीनशॉट संगठन कार्यालय को व्हाट्सएप पर भेजें: +91 90885 00061"
                      : "Share the screenshot over WhatsApp with Organization Office at +91 90885 00061."}
                  </li>
                  <li>
                    4. {lang === "hi"
                      ? "हमारी टीम भुगतान का सत्यापन करके आपके खाते की सदस्यता सक्रिय करेगी और प्रमाणपत्र जारी करेगी।"
                      : "Our team will verify the payment and activate the appropriate membership for your account."}
                  </li>
                </ol>

                {/* 2-COLUMN DESKTOP (WINDOW) & 1-COLUMN MOBILE LAYOUT (EXACT REPLICA OF REFERENCE PIC 1) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start pt-4">
                  {/* LEFT COLUMN: QR Standee Card */}
                  <div className="md:col-span-5 flex justify-center md:justify-start">
                    <div className="w-full max-w-[320px] bg-white rounded-2xl border-2 border-[#E5E7EB] shadow-md overflow-hidden select-none">
                      {/* Green Top Bar */}
                      <div className="bg-[#007A5E] text-white py-2 px-4 flex items-center justify-center gap-2">
                        <span className="text-[10px] tracking-wider uppercase text-white/80">Powered by</span>
                        <span className="text-xs font-black tracking-wider uppercase bg-[#E31E24] text-white px-2 py-0.5 rounded text-[11px]">
                          IDBI BANK
                        </span>
                      </div>

                      {/* Organization Name Strip */}
                      <div className="bg-[#D7EAD8] py-2 px-3 text-center border-b border-[#B8D7BB]">
                        <span className="font-extrabold text-xs sm:text-[13px] text-[#0E4A35] tracking-wider uppercase block leading-tight">
                          AGGARWAL VAISH VIKAS SANGATHAN
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 sm:p-5 flex flex-col items-center text-center bg-white">
                        <span className="text-xs font-black tracking-widest text-[#111827] uppercase mb-2">
                          SCAN & PAY
                        </span>

                        {/* Live SVG QR Code with Organization Logo in Center */}
                        <div className="p-2.5 bg-white rounded-xl border border-gray-200 shadow-2xs relative">
                          <QRCodeSVG
                            value="upi://pay?pa=aggarwalvaishvikassangathan@idbi&pn=AGGARWAL%20VAISH%20VIKAS%20SANGATHAN&cu=INR"
                            size={185}
                            level="H"
                            imageSettings={{
                              src: "/images/agarwal/logo.png",
                              height: 36,
                              width: 36,
                              excavate: true,
                            }}
                          />
                        </div>

                        {/* UPI ID */}
                        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#7F160C] font-bold">
                          <span>UPI ID:</span>
                          <span className="font-mono text-[#7F160C] select-all">aggarwalvaishvikassangathan@idbi</span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="ml-1 text-[#007A5E] hover:text-[#0B6E4F] cursor-pointer"
                            title="Copy UPI ID"
                          >
                            {copiedUpi ? (
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 inline" />
                            )}
                          </button>
                        </div>

                        {/* BHIM UPI Badge */}
                        <div className="mt-3 pt-2.5 border-t border-gray-100 w-full flex items-center justify-center gap-3">
                          <div className="flex items-center gap-1 font-black italic text-xs tracking-wider text-[#002D62]">
                            <span>BHIM</span>
                            <span className="text-[#00A859]">▶</span>
                            <span>UPI</span>
                          </div>
                        </div>

                        {/* Payment App Badges */}
                        <div className="mt-2 flex items-center justify-center gap-3">
                          <div className="flex items-center gap-1 bg-[#F8FAFC] border border-gray-200 px-2 py-0.5 rounded text-[11px] font-bold text-gray-700">
                            <span className="text-blue-500 font-extrabold">G</span>
                            <span className="text-red-500 font-extrabold">P</span>
                            <span className="text-amber-500 font-extrabold">a</span>
                            <span className="text-green-500 font-extrabold">y</span>
                          </div>
                          <div className="bg-[#002E6E] text-white px-2 py-0.5 rounded text-[11px] font-extrabold">
                            <span>Pay</span><span className="text-[#00BAF2]">tm</span>
                          </div>
                          <div className="bg-[#5F259F] text-white px-2 py-0.5 rounded text-[11px] font-extrabold">
                            पे PhonePe
                          </div>
                        </div>

                        {/* Bilingual Footer */}
                        <div className="mt-2.5 pt-2 border-t border-gray-100 text-[10px] text-gray-500 font-medium leading-tight">
                          <p>सभी UPI Apps से भुगतान स्वीकार किया जाता है ।</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">Payment Accepted from all UPI Apps</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Available Memberships (White Cards) + Consent + Submit Button */}
                  <div className="md:col-span-7 flex flex-col justify-start">
                    <h4 className="font-bold text-lg sm:text-xl text-[#1E293B] mb-3">
                      {lang === "hi" ? "उपलब्ध सदस्यता योजनाएं" : "Available Memberships"}
                    </h4>

                    <div className="space-y-3">
                      {[
                        { id: "patron", name: "Patron Member", nameHi: "संरक्षक सदस्य", price: 100000, period: "Lifetime", periodHi: "आजीवन", priceDisplay: "₹100000" },
                        { id: "co_patron", name: "Co Patron Member", nameHi: "सह-संरक्षक सदस्य", price: 21000, period: "Lifetime", periodHi: "आजीवन", priceDisplay: "₹21000" },
                        { id: "active", name: "Active Member", nameHi: "सक्रिय सदस्य", price: 100, period: "Lifetime", periodHi: "आजीवन", priceDisplay: "₹100" },
                      ].map((m) => {
                        const isSelected = planId === m.id;
                        return (
                          <div
                            key={m.id}
                            onClick={() => setPlanId(m.id)}
                            className={`flex items-center justify-between px-5 py-4 rounded-xl cursor-pointer transition-all border ${
                              isSelected
                                ? "bg-white border-2 border-[#7F160C] shadow-sm ring-2 ring-[#7F160C]/15"
                                : "bg-white border border-[#E5E7EB] hover:border-gray-300 shadow-2xs"
                            }`}
                          >
                            <div>
                              <p className="font-bold text-base sm:text-lg text-[#1E293B]">
                                {lang === "hi" ? m.nameHi : m.name}
                              </p>
                              <p className="text-xs sm:text-sm text-[#6B7280] font-medium mt-0.5">
                                {lang === "hi" ? m.periodHi : m.period}
                              </p>
                            </div>
                            <span className="font-bold text-lg sm:text-xl text-[#7F160C] tabular-nums">
                              {m.priceDisplay}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Consent Checkbox (Exact replica of reference format) */}
                    <label className="flex items-start gap-2.5 mt-5 cursor-pointer text-xs sm:text-[13px] text-[#374151] leading-relaxed select-none">
                      <input
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 accent-[#2563EB] w-4 h-4 rounded cursor-pointer shrink-0"
                      />
                      <span>
                        {lang === "hi"
                          ? "यह फॉर्म सबमिट करके, मैं अग्रवाल वैश्य विकास संगठन के रिकॉर्ड हेतु अपने नाम और विवरण का उपयोग करने की सहमति देता/देती हूँ। मैंने संस्था के सभी नियम एवं शर्तें पढ़ और समझ ली हैं।"
                          : "By submitting this form, I consent to the President of Aggarwal Vaish Vikas Sangathan for using my name and details for records of Aggarwal Vaish Vikas Sangathan. I have read and understood all the terms and conditions of the foundation."}
                      </span>
                    </label>

                    {/* Submit Button (Exact replica of reference format: Left-aligned, compact) */}
                    <div className="mt-4 flex justify-start">
                      <button
                        type="submit"
                        className="w-auto min-w-[150px] sm:min-w-[170px] py-2.5 px-8 sm:px-10 rounded-lg bg-[#7F160C] hover:bg-[#69120A] text-white font-bold text-sm sm:text-base tracking-wide shadow-xs transition-colors cursor-pointer text-center"
                      >
                        {lang === "hi" ? "सबमिट करें" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
