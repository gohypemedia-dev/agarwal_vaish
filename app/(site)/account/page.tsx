"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
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
  ArrowRight,
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
  donationId?: string;
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

  // Tab Order: 1st Profile ("details"), 2nd Digital ID Card ("card"), 3rd Donations ("donations")
  const [activeTab, setActiveTab] = useState<"details" | "card" | "donations">("details");

  // Helper to safely validate image URLs and avoid invalid URL exceptions
  const getValidImageUrl = (url?: string | null): string | null => {
    if (!url || typeof url !== "string") return null;
    const trimmed = url.trim();
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/") ||
      trimmed.startsWith("data:image/")
    ) {
      return trimmed;
    }
    if (trimmed.startsWith("images/")) {
      return "/" + trimmed;
    }
    return null;
  };

  // Fetch Member Details by Identifier (Phone / Reg No / Email)
  const handleLookup = useCallback(async (searchQuery: string, isAuto = false) => {
    const q = searchQuery.trim();
    if (!q) {
      if (!isAuto) toast.error("Please enter your registered mobile number or registration number.");
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
        throw new Error(data.error || "Failed to retrieve member account details.");
      }

      if (data.found && data.member) {
        setMember(data.member);
        setDonations(data.donations || []);
        setIsVerified(Boolean(data.isVerified));
        localStorage.setItem("avvs_member_identifier", q);
        if (!isAuto) toast.success(`Welcome, ${data.member.fullName}!`);
      } else {
        setMember(null);
        setDonations([]);
        setIsVerified(false);
        setNotFoundMessage(
          data.message || "No registered member found with this mobile number or registration number. Please check and try again."
        );
        if (!isAuto) toast.error("No record found.");
      }
    } catch (err: any) {
      setNotFoundMessage(err.message || "Unable to load data.");
      if (!isAuto) toast.error(err.message || "Could not connect to server.");
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
    setActiveTab("details");
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "PATRON":
        return {
          title: "Patron Member",
          amountText: "₹1,00,000",
          icon: Crown,
          bgCls: "bg-gradient-to-r from-[#7F160C] to-[#550D06] text-white border-amber-300/40",
          pillCls: "bg-[#7F160C]/10 text-[#7F160C] border-[#7F160C]/20",
        };
      case "CO_PATRON":
        return {
          title: "Co-Patron Member",
          amountText: "₹21,000",
          icon: Award,
          bgCls: "bg-gradient-to-r from-[#B8893E] to-[#8C6221] text-white border-amber-200/40",
          pillCls: "bg-[#B8893E]/10 text-[#B8893E] border-[#B8893E]/20",
        };
      default:
        return {
          title: "Active Member",
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
        <p className="text-sm font-semibold text-[#1E1612]/70">Loading member account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* 1. TOP TITLE BANNER (Badge removed per user request) */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1612] tracking-tight">
            Member <span className="text-[#7F160C]">Account</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            Unified directory records, verified credentials, and digital membership identity card for Aggarwal Vaish Vikas Sangathan.
          </p>
        </div>

        {/* 2. IF NOT LOGGED IN / SEARCH FORM */}
        {!member ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#E8DFD3] shadow-md p-6 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF9F2] text-[#7F160C] mx-auto flex items-center justify-center border border-[#E7D8C8] mb-5 shadow-xs">
              <User className="w-8 h-8" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#1E1612] mb-2 font-editorial">
              Find Your Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
              Enter your <strong className="text-[#1E1612]">registered mobile number</strong> or <strong className="text-[#1E1612]">registration number</strong>
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
                  placeholder="e.g. +91XXXXXXXXXX or AVVS-2026-XXXX"
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
                    <span>View Details</span>
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
                    If you haven&apos;t enrolled yet, you can join online now:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Link
                      href="/membership"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7F160C] text-white text-xs font-bold hover:bg-[#69120A]"
                    >
                      <span>Apply for Membership</span>
                    </Link>
                    <Link
                      href="/donate"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7D8C8] text-[#7F160C] text-xs font-bold hover:bg-gray-50"
                    >
                      <span>Donate Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Aggarwal Vaish Vikas Sangathan Haryana Portal</span>
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
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#7F160C] to-[#550D06] text-white flex items-center justify-center font-editorial font-bold text-2xl sm:text-3xl shadow-md border-2 border-amber-200 overflow-hidden">
                    {(() => {
                      const photo = getValidImageUrl(member.photoUrl);
                      return photo ? (
                        <img
                          src={photo}
                          alt={member.fullName}
                          className="w-full h-full object-cover rounded-2xl"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        member.fullName.charAt(0).toUpperCase()
                      );
                    })()}
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Member</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pending Verification</span>
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
                        Gotra: <strong className="text-gray-800">{member.gotra}</strong>
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
                  <span>Switch Account</span>
                </button>
              </div>
            </div>

            {/* TAB NAVIGATION: 1st Profile, 2nd Digital ID Card, 3rd Donations */}
            <div className="flex items-center gap-2 border-b border-[#E8DFD3] pb-1 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("details")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "details"
                    ? "bg-[#7F160C] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Member Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("card")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "card"
                    ? "bg-[#7F160C] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Digital ID Card</span>
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
                <span>Donations & Contributions ({donations.length})</span>
              </button>
            </div>

            {/* TAB 1: DETAILED MEMBER PROFILE (First Section as requested) */}
            {activeTab === "details" && (
              <div className="bg-white rounded-3xl border border-[#E8DFD3] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-[#E8DFD3] pb-4">
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E1612]">
                    Registered Member Profile
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Verified registration details from the Aggarwal Vaish Vikas Sangathan directory.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-1">
                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Full Name</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.fullName}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Father / Guardian</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.guardianName || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Mobile Number</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block font-mono">{member.phone}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Email Address</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block truncate">{member.email || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Gotra</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.gotra || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Occupation</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.occupation || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3] sm:col-span-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Address</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">{member.address || "—"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">District & State</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">
                      {[member.district, member.state].filter(Boolean).join(", ")}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Membership Tier</span>
                    <span className="text-sm sm:text-base font-bold text-[#7F160C] mt-1 block">
                      {member.tier === "PATRON"
                        ? "Patron Member (₹1L)"
                        : member.tier === "CO_PATRON"
                        ? "Co-Patron Member (₹21k)"
                        : "Active Member (₹100)"}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Member Since</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 block">
                      {new Date(member.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3]">
                    <span className="text-xs font-semibold text-gray-500 uppercase block tracking-wider">Verification Status</span>
                    <span className={`text-sm sm:text-base font-bold mt-1 block ${isVerified ? "text-emerald-700" : "text-amber-700"}`}>
                      {isVerified ? "Verified Member" : "Verification Pending"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DIGITAL ID CARD (Second Section) */}
            {activeTab === "card" && (
              <div className="space-y-6">
                <div className="max-w-md mx-auto bg-white rounded-3xl border-2 border-[#D4A359] shadow-xl overflow-hidden relative">
                  {/* Card Header (Pure English) */}
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
                        <h3 className="font-editorial text-xs sm:text-sm font-bold tracking-tight uppercase leading-tight">
                          Aggarwal Vaish Vikas Sangathan
                        </h3>
                        <p className="text-[10px] text-amber-200 tracking-wider uppercase mt-0.5 font-semibold">
                          Official Membership Identity Card
                        </p>
                      </div>
                      <div className="w-10" />
                    </div>
                  </div>

                  {/* Card Body (Pure English) */}
                  <div className="p-6 bg-gradient-to-b from-[#FFFDF9] to-[#FFF9F2]">
                    <div className="flex items-start gap-4">
                      {/* Photo Box */}
                      <div className="w-24 h-28 rounded-xl bg-white border-2 border-[#E7D8C8] overflow-hidden flex items-center justify-center text-[#7F160C] font-editorial font-bold text-3xl shadow-sm shrink-0">
                        {(() => {
                          const photo = getValidImageUrl(member.photoUrl);
                          return photo ? (
                            <img
                              src={photo}
                              alt={member.fullName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            member.fullName.charAt(0).toUpperCase()
                          );
                        })()}
                      </div>

                      {/* Info Rows */}
                      <div className="min-w-0 space-y-1.5 text-xs text-gray-800 flex-1">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase block font-semibold tracking-wider">Reg No:</span>
                          <span className="font-mono font-bold text-[#7F160C] text-sm">{member.registrationNo}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-500 uppercase block font-semibold tracking-wider">Name:</span>
                          <span className="font-bold text-sm text-[#1E1612] block truncate">{member.fullName}</span>
                        </div>

                        {member.guardianName && (
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold tracking-wider">Father / Guardian:</span>
                            <span className="font-medium text-gray-700 block truncate">{member.guardianName}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold tracking-wider">Gotra:</span>
                            <span className="font-semibold text-gray-800">{member.gotra || "—"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold tracking-wider">District:</span>
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
                      <span>Issue Date: {new Date(member.createdAt).toLocaleDateString("en-IN")}</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isVerified ? "Verified Member" : "Verification Pending"}</span>
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
                    <span>Print Identity Card</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: DONATIONS & PAYMENTS (Third Section) */}
            {activeTab === "donations" && (
              <div className="space-y-4">
                {donations.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-[#E8DFD3] p-12 text-center text-gray-500">
                    <HeartHandshake className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="font-semibold text-gray-700">No donation or contribution records found.</p>
                    <p className="text-xs text-gray-500 mt-1">To support our social and community initiatives, click below:</p>
                    <Link
                      href="/donate"
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-[#7F160C] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#69120A]"
                    >
                      <span>Donate / Contribute Now</span>
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
                              {d.program || "Community Welfare Contribution"}
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
                              {d.status === "VERIFIED" || d.status === "COMPLETED" ? "Verified" : "Pending"}
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
                              <span>View Certificate</span>
                            </Link>

                            <Link
                              href={`/pass/${d.id}${d.certificateKey ? `?k=${d.certificateKey}` : ""}`}
                              target="_blank"
                              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Pass / Receipt</span>
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
