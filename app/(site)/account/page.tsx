"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  Award,
  Crown,
  Shield,
  Search,
  CheckCircle2,
  Printer,
  FileText,
  LogOut,
  HeartHandshake,
  Download,
  AlertCircle,
  Briefcase,
  Calendar,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface MemberData {
  id: string;
  registrationNo: string;
  fullName: string;
  guardianName?: string | null;
  gender?: string | null;
  caste?: string | null;
  gotra?: string | null;
  phone: string;
  email?: string | null;
  dob?: string | null;
  district: string;
  state: string;
  address: string;
  wardNumber?: string | null;
  pincode?: string | null;
  occupation?: string | null;
  occupationDetails?: string | null;
  photoUrl?: string | null;
  planId: string;
  planName: string;
  tier: "PATRON" | "CO_PATRON" | "ACTIVE";
  amount: number;
  status: string;
  utr?: string | null;
  notes?: string | null;
  createdAt: string;
}

interface DonationItem {
  id: string;
  donorName: string;
  amount: number;
  type: string;
  program?: string | null;
  status: string;
  utr?: string | null;
  createdAt: string;
  verifiedAt?: string | null;
  certificateKey?: string | null;
}

export default function AccountPage() {
  const [identifierInput, setIdentifierInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialChecking, setInitialChecking] = useState(true);

  const [member, setMember] = useState<MemberData | null>(null);
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"card" | "details" | "donations">("card");

  // Fetch Member Details by Identifier (Phone / Reg No / Email)
  const handleLookup = useCallback(async (searchQuery: string, isAuto = false) => {
    const q = searchQuery.trim();
    if (!q) {
      if (!isAuto) toast.error("कृपया अपना मोबाइल नंबर या रजिस्ट्रेशन नंबर दर्ज करें।");
      return;
    }

    setIsLoading(true);
    setNotFoundMessage(null);

    try {
      const res = await fetch("/api/account/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: q }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "विवरण प्राप्त करने में त्रुटि हुई।");
      }

      if (data.found && data.member) {
        setMember(data.member);
        setDonations(data.donations || []);
        setIsVerified(Boolean(data.isVerified));
        localStorage.setItem("avvs_member_identifier", q);
        if (!isAuto) toast.success(`स्वागत है, ${data.member.fullName}!`);
      } else {
        setMember(null);
        setDonations([]);
        setIsVerified(false);
        setNotFoundMessage(
          data.message || "इस विवरण से कोई पंजीकृत सदस्य नहीं मिला। कृपया नंबर जांचें।"
        );
        if (!isAuto) toast.error("कोई पंजीकरण नहीं मिला।");
      }
    } catch (err: any) {
      setNotFoundMessage(err.message || "डेटा लोड करने में असमर्थ।");
      if (!isAuto) toast.error(err.message || "सर्वर से कनेक्ट नहीं हो सका।");
    } finally {
      setIsLoading(false);
      setInitialChecking(false);
    }
  }, []);

  // Check LocalStorage on initial load
  useEffect(() => {
    const saved = localStorage.getItem("avvs_member_identifier");
    if (saved) {
      setIdentifierInput(saved);
      handleLookup(saved, true);
    } else {
      setInitialChecking(false);
    }
  }, [handleLookup]);

  // Switch / Exit Account
  const handleSwitchAccount = () => {
    localStorage.removeItem("avvs_member_identifier");
    setMember(null);
    setDonations([]);
    setNotFoundMessage(null);
    setIdentifierInput("");
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "PATRON":
        return {
          title: "संरक्षक सदस्य (Patron)",
          amountText: "₹1,00,000",
          icon: Crown,
          bgCls: "bg-gradient-to-r from-[#7F160C] to-[#550D06] text-white border-amber-300/40",
          pillCls: "bg-[#7F160C]/10 text-[#7F160C] border-[#7F160C]/20",
        };
      case "CO_PATRON":
        return {
          title: "सह-संरक्षक सदस्य (Co-Patron)",
          amountText: "₹21,000",
          icon: Award,
          bgCls: "bg-gradient-to-r from-[#B8893E] to-[#8C6221] text-white border-amber-200/40",
          pillCls: "bg-[#B8893E]/10 text-[#B8893E] border-[#B8893E]/20",
        };
      default:
        return {
          title: "सक्रिय सदस्य (Active Member)",
          amountText: "₹100",
          icon: Shield,
          bgCls: "bg-gradient-to-r from-emerald-700 to-emerald-900 text-white border-emerald-300/40",
          pillCls: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
    }
  };

  if (initialChecking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-[#FFFDF9]">
        <div className="w-12 h-12 rounded-full border-4 border-[#7F160C]/20 border-t-[#7F160C] animate-spin mb-4" />
        <p className="text-sm font-semibold text-[#1E1612]/70">सदस्य विवरण लोड हो रहा है...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* 1. TOP TITLE BANNER */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7F160C]/10 text-[#7F160C] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>आधिकारिक सदस्य पोर्टल (Official Member Portal)</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1612] tracking-tight">
            सदस्य <span className="text-[#7F160C]">खाता</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl mx-auto">
            अग्रवाल वैश्य विकास संगठन के पंजीकृत सदस्यों एवं दानदाताओं का एकीकृत विवरण व डिजिटल पहचान पत्र।
          </p>
        </div>

        {/* 2. IF NOT LOGGED IN / SEARCH FORM */}
        {!member ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#E8DFD3] shadow-md p-6 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF9F2] text-[#7F160C] mx-auto flex items-center justify-center border border-[#E7D8C8] mb-5 shadow-xs">
              <User className="w-8 h-8" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#1E1612] mb-2 font-editorial">
              सदस्य विवरण खोजें (Find Your Account)
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
              साइनअप या पासवर्ड की आवश्यकता नहीं है। सदस्यता फ़ॉर्म या दान के समय उपयोग किया गया{" "}
              <strong className="text-[#1E1612]">मोबाइल नंबर</strong> या{" "}
              <strong className="text-[#1E1612]">रजिस्ट्रेशन नंबर (AVVS-2026-XXXX)</strong> दर्ज करें।
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLookup(identifierInput);
              }}
              className="space-y-4"
            >
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="उदा: 9812345678 या AVVS-2026-XXXX"
                  value={identifierInput}
                  onChange={(e) => setIdentifierInput(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#FFFDF9] border border-[#E7D8C8] text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7F160C] focus:ring-2 focus:ring-[#7F160C]/10 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#7F160C] hover:bg-[#69120A] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>विवरण देखें (View Details)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Not Found Message */}
            {notFoundMessage && (
              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-900 space-y-2">
                  <p className="font-semibold">{notFoundMessage}</p>
                  <p className="text-gray-600">
                    यदि आपने अभी तक सदस्यता नहीं ली है, तो आप तुरंत ऑनलाइन सदस्यता फ़ॉर्म भर सकते हैं:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Link
                      href="/membership"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7F160C] text-white text-xs font-bold hover:bg-[#69120A]"
                    >
                      <span>सदस्यता फ़ॉर्म भरें (Apply Now)</span>
                    </Link>
                    <Link
                      href="/donate"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7D8C8] text-[#7F160C] text-xs font-bold hover:bg-gray-50"
                    >
                      <span>सहयोग / दान करें (Donate)</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>सुरक्षित एवं आधिकारिक अग्रवाल वैश्य विकास संगठन हरियाणा पोर्टल</span>
            </div>
          </div>
        ) : (
          /* 3. MEMBER LOGGED IN DASHBOARD */
          <div className="space-y-6">

            {/* MEMBER HEADER CARD */}
            <div className="bg-white rounded-3xl border border-[#E8DFD3] p-5 sm:p-7 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                {/* Avatar with status ring */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#7F160C] to-[#550D06] text-white flex items-center justify-center font-editorial font-bold text-2xl sm:text-3xl shadow-md border-2 border-amber-200">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.fullName}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      member.fullName.charAt(0)
                    )}
                  </div>
                  {isVerified && (
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md border-2 border-white"
                      title="Verified Member"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Name & Details */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E1612] truncate">
                      {member.fullName}
                    </h2>
                    {isVerified ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>सत्यापित सदस्य</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>सत्यापन प्रक्रिया में (Pending)</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono font-semibold text-[#7F160C] bg-[#FFF9F2] px-2 py-0.5 rounded border border-[#E7D8C8]">
                      {member.registrationNo}
                    </span>
                    {member.district && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{member.district}, {member.state}</span>
                      </span>
                    )}
                    {member.gotra && (
                      <span className="text-gray-500">
                        गोत्र: <strong>{member.gotra}</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Right Side: Tier Badge & Switch Account Button */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                {(() => {
                  const badge = getTierBadge(member.tier);
                  const Icon = badge.icon;
                  return (
                    <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 shadow-xs ${badge.pillCls}`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                        {badge.title}
                      </span>
                    </div>
                  );
                })()}

                <button
                  onClick={handleSwitchAccount}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#7F160C] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>दूसरा खाता खोजें (Switch)</span>
                </button>
              </div>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex items-center gap-2 border-b border-[#E8DFD3] pb-1 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("card")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "card"
                    ? "bg-[#7F160C] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>डिजिटल पहचान पत्र (Digital ID Card)</span>
              </button>

              <button
                onClick={() => setActiveTab("details")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "details"
                    ? "bg-[#7F160C] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <User className="w-4 h-4" />
                <span>व्यक्तिगत विवरण (Member Profile)</span>
              </button>

              <button
                onClick={() => setActiveTab("donations")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "donations"
                    ? "bg-[#7F160C] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>दान एवं सहयोग ({donations.length})</span>
              </button>
            </div>

            {/* TAB 1: DIGITAL ID CARD */}
            {activeTab === "card" && (
              <div className="space-y-6">
                <div className="max-w-md mx-auto bg-white rounded-3xl border-2 border-[#D4A359] shadow-xl overflow-hidden relative">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-[#7F160C] via-[#942012] to-[#550D06] p-4 text-white text-center relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-white p-1 shrink-0 shadow-sm">
                        <Image
                          src="/images/agarwal/logo.png"
                          alt="AVVS Logo"
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-center flex-1 px-2">
                        <h3 className="font-editorial text-sm sm:text-base font-bold tracking-tight leading-tight">
                          अग्रवाल वैश्य विकास संगठन हरियाणा
                        </h3>
                        <p className="text-[10px] text-amber-200 tracking-wider uppercase mt-0.5">
                          आधिकारिक सदस्यता पहचान पत्र (Official Member ID)
                        </p>
                      </div>
                      <div className="w-10" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 bg-gradient-to-b from-[#FFFDF9] to-[#FFF9F2]">
                    <div className="flex items-start gap-4">
                      {/* Photo Box */}
                      <div className="w-24 h-28 rounded-xl bg-white border-2 border-[#E7D8C8] overflow-hidden flex items-center justify-center text-[#7F160C] font-editorial font-bold text-3xl shadow-sm shrink-0">
                        {member.photoUrl ? (
                          <Image
                            src={member.photoUrl}
                            alt={member.fullName}
                            width={96}
                            height={112}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          member.fullName.charAt(0)
                        )}
                      </div>

                      {/* Info Rows */}
                      <div className="min-w-0 space-y-1.5 text-xs text-gray-800 flex-1">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase block font-semibold">रजिस्ट्रेशन संख्या:</span>
                          <span className="font-mono font-bold text-[#7F160C] text-sm">{member.registrationNo}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-500 uppercase block font-semibold">नाम:</span>
                          <span className="font-bold text-sm text-[#1E1612] block truncate">{member.fullName}</span>
                        </div>

                        {member.guardianName && (
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold">पिता / पति:</span>
                            <span className="font-medium text-gray-700 block truncate">{member.guardianName}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold">गोत्र:</span>
                            <span className="font-semibold text-gray-800">{member.gotra || "—"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold">ज़िला:</span>
                            <span className="font-semibold text-gray-800">{member.district || "—"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tier Banner in Card */}
                    {(() => {
                      const badge = getTierBadge(member.tier);
                      const Icon = badge.icon;
                      return (
                        <div className={`mt-5 p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold shadow-xs ${badge.bgCls}`}>
                          <div className="flex items-center gap-1.5">
                            <Icon className="w-4 h-4 text-amber-200" />
                            <span>{badge.title}</span>
                          </div>
                          <span className="text-amber-200 font-mono">{badge.amountText}</span>
                        </div>
                      );
                    })()}

                    {/* Status & Issue Date */}
                    <div className="mt-4 pt-3 border-t border-[#E8DFD3] flex items-center justify-between text-[11px] text-gray-500">
                      <span>जारी तिथि: {new Date(member.createdAt).toLocaleDateString("en-IN")}</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isVerified ? "प्रमाणित सदस्य" : "सत्यापन लंबित"}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Print / Download Button */}
                <div className="text-center">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E7D8C8] hover:bg-[#FFF9F2] text-[#7F160C] font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>पहचान पत्र प्रिंट करें (Print Card)</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: DETAILED MEMBER PROFILE */}
            {activeTab === "details" && (
              <div className="bg-white rounded-3xl border border-[#E8DFD3] p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#1E1612] mb-1">
                    पंजीकृत सदस्यता विवरण (Registered Information)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    यह विवरण संगठन के आधिकारिक डेटाबेस में सुरक्षित है।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block">पूर्ण नाम (Full Name)</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.fullName}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block">पिता / संरक्षक (Guardian)</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.guardianName || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block">मोबाइल नंबर (Phone)</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.phone}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block">ईमेल (Email)</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block truncate">{member.email || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block">गोत्र (Gotra)</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.gotra || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block">व्यवसाय (Occupation)</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.occupation || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3] sm:col-span-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase block">पता (Address)</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.address || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block">ज़िला एवं राज्य</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">
                      {[member.district, member.state].filter(Boolean).join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DONATIONS & PAYMENTS */}
            {activeTab === "donations" && (
              <div className="space-y-4">
                {donations.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-[#E8DFD3] p-12 text-center text-gray-500">
                    <HeartHandshake className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="font-semibold text-gray-700">कोई दान या सहयोग रसीद उपलब्ध नहीं है।</p>
                    <p className="text-xs text-gray-500 mt-1">संगठन के सेवा प्रकल्पों में सहयोग करने के लिए नीचे क्लिक करें:</p>
                    <Link
                      href="/donate"
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-[#7F160C] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#69120A]"
                    >
                      <span>दान / सहयोग करें</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {donations.map((d) => (
                      <div
                        key={d.id}
                        className="bg-white rounded-2xl border border-[#E8DFD3] p-5 shadow-xs flex flex-col justify-between space-y-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block font-mono">
                              #{d.id.slice(-8).toUpperCase()}
                            </span>
                            <h4 className="font-bold text-gray-900 text-sm mt-0.5">
                              {d.program || "संगठन सेवा सहयोग"}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {new Date(d.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-lg font-black text-[#7F160C]">₹{d.amount.toLocaleString("en-IN")}</span>
                            <span
                              className={`block text-[10px] font-bold uppercase px-2 py-0.5 rounded mt-1 text-center ${
                                d.status === "VERIFIED" || d.status === "COMPLETED"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {d.status === "VERIFIED" || d.status === "COMPLETED" ? "सत्यापित" : "प्रतीक्षारत"}
                            </span>
                          </div>
                        </div>

                        {(d.status === "VERIFIED" || d.status === "COMPLETED") && (
                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                            <Link
                              href={`/certificate/${d.id}${d.certificateKey ? `?k=${d.certificateKey}` : ""}`}
                              target="_blank"
                              className="text-xs font-bold text-[#7F160C] hover:underline flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>प्रमाणपत्र देखें (Certificate)</span>
                            </Link>

                            <Link
                              href={`/pass/${d.id}${d.certificateKey ? `?k=${d.certificateKey}` : ""}`}
                              target="_blank"
                              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>पास रसीद (Receipt)</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
