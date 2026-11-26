"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import {
  Copy,
  CheckCheck,
  MessageCircle,
  Heart,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import HeadingDivider from "@/components/HeadingDivider";

const PRESET_AMOUNTS = [499, 999, 1499, 2100, 5100, 11000];

export default function DonatePage() {
  const { lang, user } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAmount, setSelectedAmount] = useState<number>(499);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const [fullName, setFullName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [utr, setUtr] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [donationId, setDonationId] = useState<string>("");
  const [submitToken, setSubmitToken] = useState<string>("");
  const [serverQrData, setServerQrData] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const currentAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("aggarwalvaishvikassangathan@idbi");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setValidationError(lang === "hi" ? "कृपया अपना पूरा नाम दर्ज करें" : "Please enter your full name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError(lang === "hi" ? "कृपया एक मान्य ईमेल पता दर्ज करें" : "Please enter a valid email address");
      return;
    }
    if (currentAmount < 100) {
      setValidationError(
        lang === "hi"
          ? "न्यूनतम सहयोग राशि ₹100 होनी चाहिए"
          : "Minimum contribution amount is ₹100"
      );
      return;
    }

    setValidationError("");
    setStep(2);
  };

  const handleCompletePayment = async () => {
    setIsSubmitting(true);
    setValidationError("");

    try {
      const res = await fetch("/api/donations/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          mobile: mobile.trim() || undefined,
          amount: currentAmount,
          utr: utr.trim() || undefined,
          program: "General Donation",
        }),
      });

      const data = await res.json();
      if (res.ok && data.donationId) {
        setDonationId(data.donationId);
      }
    } catch (err: any) {
      console.error("[donation] Failed to record donation:", err);
    } finally {
      setIsSubmitting(false);
      setStep(3);
    }
  };

  const upiQrString = `upi://pay?pa=aggarwalvaishvikassangathan@idbi&pn=AGGARWAL%20VAISH%20VIKAS%20SANGATHAN&am=${currentAmount}&cu=INR`;

  const whatsappMessage = `नमस्ते, मैंने अग्रवाल वैश्य विकास संगठन के लिए सहयोग राशि का भुगतान किया है।
विवरण:
- नाम: ${fullName}
- राशि: ₹${currentAmount.toLocaleString("en-IN")}
- ईमेल: ${email}
- मोबाइल: ${mobile || "N/A"}
${utr ? `- UTR / Ref No: ${utr}` : ""}
- कार्यक्रम: सामान्य सहयोग राशि दान
कृपया मेरा भुगतान सत्यापित करें।`;

  return (
    <div className="w-full bg-[#FFF9F2] text-[#2B201A] font-sans min-h-screen pb-16 sm:pb-24 selection:bg-[#7F160C] selection:text-white">
      {/* 1. PAGE HEADER */}
      <section className="pt-8 sm:pt-12 pb-2 sm:pb-3 px-4 text-center bg-[#FFF9F2]">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            {lang === "hi" ? "सहयोग राशि दान करें" : "Make a Contribution"}
          </h1>
          <HeadingDivider className="mt-2.5" />
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto px-2">
            {lang === "hi"
              ? "समाज कल्याण, शिक्षा, सांस्कृतिक पहल एवं सेवा कार्यों में अपना अमूल्य सहयोग दें। आपका प्रत्येक अंशदान एक बड़ा सकारात्मक प्रभाव डालने में सहायक है।"
              : "Support community welfare, education, cultural initiatives, and social service through your valued contribution."}
          </p>
        </div>
      </section>

      {/* 2. DONATION CARD (MATCHING REFERENCE SPEC) */}
      <section className="px-4 pt-3 pb-12 sm:pb-16 bg-[#FFF9F2]">
        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-[#E8DFD3] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-white px-5 sm:px-6 py-4 sm:py-5 border-b border-[#E8DFD3] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#7F160C]/10 flex items-center justify-center text-[#7F160C]">
                  <Heart className="w-5 h-5 fill-current text-[#7F160C]" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-sans font-bold text-base sm:text-lg text-[#1E293B] truncate leading-snug">
                    {lang === "hi" ? "दान / सहयोग राशि" : "Make a Donation"}
                  </h2>
                  <p className="text-xs text-[#7F160C] font-semibold tracking-wide">
                    Aggarwal Vaish Vikas Sangathan
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Step Tabs */}
            <div className="bg-white border-b border-[#E8DFD3] px-5 sm:px-6 pt-1">
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-[13px] font-bold tracking-wider">
                <button
                  type="button"
                  onClick={() => step > 1 && setStep(1)}
                  className={`pb-2.5 pt-2 transition-all cursor-pointer ${
                    step === 1
                      ? "text-[#7F160C] border-b-2 border-[#7F160C]"
                      : step > 1
                      ? "text-gray-700 hover:text-[#7F160C]"
                      : "text-gray-400 cursor-default"
                  }`}
                >
                  1. DETAILS
                </button>

                <button
                  type="button"
                  onClick={() => step > 2 && setStep(2)}
                  className={`pb-2.5 pt-2 transition-all ${
                    step === 2
                      ? "text-[#7F160C] border-b-2 border-[#7F160C]"
                      : step > 2
                      ? "text-gray-700 hover:text-[#7F160C] cursor-pointer"
                      : "text-gray-400 cursor-default"
                  }`}
                >
                  2. PAY
                </button>

                <div
                  className={`pb-2.5 pt-2 ${
                    step === 3
                      ? "text-[#7F160C] border-b-2 border-[#7F160C]"
                      : "text-gray-400"
                  }`}
                >
                  3. CONFIRMED
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7 bg-white">
              
              {/* STEP 1: DETAILS */}
              {step === 1 && (
                <form onSubmit={handleContinueToPayment} className="space-y-5">
                  {/* SELECT CONTRIBUTION AMOUNT */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                      SELECT CONTRIBUTION AMOUNT
                    </label>

                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                      {PRESET_AMOUNTS.map((amt) => {
                        const isSelected = !isCustom && selectedAmount === amt;
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amt);
                              setIsCustom(false);
                              setCustomAmount("");
                              setValidationError("");
                            }}
                            className={`py-3 px-2 rounded-xl text-center text-sm sm:text-base font-bold transition-all cursor-pointer border ${
                              isSelected
                                ? "bg-[#7F160C] text-white border-[#7F160C] shadow-sm"
                                : "bg-white text-[#2B201A] border-[#E8DFD3] hover:border-[#7F160C] hover:bg-[#FFF9F2]"
                            }`}
                          >
                            ₹{amt.toLocaleString("en-IN")}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Amount Option */}
                    <div className="mt-3">
                      {!isCustom ? (
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustom(true);
                            setCustomAmount("");
                          }}
                          className="text-xs font-bold text-[#7F160C] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>
                            {lang === "hi"
                              ? "+ अन्य राशि दर्ज करें (न्यूनतम ₹100)"
                              : "+ Enter Custom Amount (Min ₹100)"}
                          </span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                              ₹
                            </span>
                            <input
                              type="number"
                              min={100}
                              value={customAmount}
                              onChange={(e) => {
                                setCustomAmount(e.target.value);
                                setValidationError("");
                              }}
                              placeholder={lang === "hi" ? "राशि दर्ज करें (न्यूनतम ₹100)" : "Enter amount (min ₹100)"}
                              className="w-full pl-7 pr-3 py-2 bg-white rounded-xl border border-[#7F160C] text-sm font-bold text-black focus:outline-none focus:ring-1 focus:ring-[#7F160C]"
                              autoFocus
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustom(false);
                              setSelectedAmount(499);
                            }}
                            className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-black border border-[#E8DFD3] rounded-xl bg-white cursor-pointer"
                          >
                            {lang === "hi" ? "वापस" : "Reset"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setValidationError("");
                        }}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD3] text-sm text-[#1E293B] placeholder-gray-400 focus:outline-none focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Mobile Number <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+91"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD3] text-sm text-[#1E293B] placeholder-gray-400 focus:outline-none focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setValidationError("");
                      }}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD3] text-sm text-[#1E293B] placeholder-gray-400 focus:outline-none focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] transition-colors"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Your confirmation will be sent here after we verify the payment.
                    </p>
                  </div>

                  {/* Trust Box */}
                  <div className="p-3.5 rounded-xl bg-[#FFF9F2] border border-[#E8DFD3] flex items-start gap-2.5 text-xs text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      You will pay directly to the Trust's UPI account using any UPI app. No card details are collected.
                    </span>
                  </div>

                  {validationError && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700 text-center">
                      {validationError}
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#7F160C] hover:bg-[#69120A] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 uppercase disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span>CONTINUE TO PAYMENT • ₹{currentAmount.toLocaleString("en-IN")}</span>
                    )}
                  </button>
                </form>
              )}

              {/* STEP 2: PAY */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF9F2] border border-[#E8DFD3]">
                    <div>
                      <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">
                        CONTRIBUTION FOR
                      </span>
                      <span className="font-bold text-sm text-black">
                        {fullName}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-[#7F160C] block leading-tight">
                        ₹{currentAmount.toLocaleString("en-IN")}
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-[11px] font-bold text-[#7F160C] hover:underline cursor-pointer"
                      >
                        Change Amount
                      </button>
                    </div>
                  </div>

                  {/* Standee QR Card */}
                  <div className="flex justify-center">
                    <div className="w-full max-w-[320px] rounded-2xl border-2 border-[#E5E7EB] bg-white p-3.5 sm:p-4 shadow-sm flex flex-col items-center text-center">
                      <div className="w-full bg-[#007A5E] text-white py-1 px-3 rounded-lg flex items-center justify-center gap-1.5 mb-2 shadow-2xs">
                        <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5">
                          <span className="text-[#007A5E] font-black text-[8px] leading-none">IDBI</span>
                        </div>
                        <span className="text-[10px] font-bold tracking-wider">IDBI BANK</span>
                      </div>

                      <div className="w-full bg-[#E8F5E9] py-1 px-2 rounded text-[10px] font-extrabold text-[#1B5E20] uppercase tracking-wide truncate">
                        AGGARWAL VAISH VIKAS SANGATHAN
                      </div>

                      <span className="text-[10px] font-extrabold text-gray-700 uppercase tracking-widest my-1.5">
                        SCAN &amp; PAY • ₹{currentAmount.toLocaleString("en-IN")}
                      </span>

                      <div className="p-2 bg-white rounded-xl border border-gray-200 shadow-2xs relative">
                        <QRCodeSVG
                          value={serverQrData || upiQrString}
                          size={180}
                          level="H"
                          imageSettings={{
                            src: "/images/agarwal/logo.png",
                            height: 34,
                            width: 34,
                            excavate: true,
                          }}
                        />
                      </div>

                      <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-[#7F160C] font-bold">
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
                      {copiedUpi && (
                        <p className="text-[10px] text-emerald-600 font-bold mt-0.5">UPI ID कॉपी हो गई! (Copied)</p>
                      )}

                      <div className="mt-2.5 pt-2 border-t border-gray-100 w-full flex items-center justify-center gap-3">
                        <div className="flex items-center gap-1 font-black italic text-[11px] tracking-wider text-[#002D62]">
                          <span>BHIM</span>
                          <span className="text-[#00A859]">▶</span>
                          <span>UPI</span>
                        </div>
                      </div>

                      <div className="mt-1.5 flex items-center justify-center gap-2 flex-wrap">
                        <div className="flex items-center gap-0.5 bg-[#F8FAFC] border border-gray-200 px-1.5 py-0.5 rounded text-[9px] font-bold text-gray-700">
                          <span className="text-blue-500 font-extrabold">G</span>
                          <span className="text-red-500 font-extrabold">P</span>
                          <span className="text-amber-500 font-extrabold">a</span>
                          <span className="text-green-500 font-extrabold">y</span>
                        </div>
                        <div className="bg-[#002E6E] text-white px-1.5 py-0.5 rounded text-[9px] font-extrabold">
                          <span>Pay</span><span className="text-[#00BAF2]">tm</span>
                        </div>
                        <div className="bg-[#5F259F] text-white px-1.5 py-0.5 rounded text-[9px] font-extrabold">
                          पे PhonePe
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UTR input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">
                      {lang === "hi"
                        ? "UPI संदर्भ / UTR नंबर (भुगतान के बाद 12 अंक दर्ज करें)"
                        : "UPI Reference / UTR Number (optional 12 digits)"}
                    </label>
                    <input
                      type="text"
                      maxLength={18}
                      value={utr}
                      onChange={(e) => setUtr(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleCompletePayment();
                        }
                      }}
                      placeholder="e.g. 432109876543"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD3] text-sm text-[#1E293B] placeholder-gray-400 focus:outline-none focus:border-[#7F160C] transition-colors font-mono"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleCompletePayment}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#7F160C] hover:bg-[#69120A] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 uppercase disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCheck className="w-4 h-4" />
                          <span>I HAVE COMPLETED PAYMENT</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/919017336118?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>WhatsApp पर शेयर करें</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 3: CONFIRMED */}
              {step === 3 && (
                <div className="space-y-5 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-xl text-gray-900">
                      {lang === "hi" ? "सहयोग राशि हेतु बहुत-बहुत धन्यवाद!" : "Thank You for Your Contribution!"}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {lang === "hi"
                        ? "आपका भुगतान विवरण सफलतापूर्वक प्राप्त हो गया है।"
                        : "Your contribution details have been recorded successfully."}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#E8DFD3] text-left text-xs sm:text-sm space-y-2">
                    {donationId && (
                      <div className="flex justify-between border-b border-[#E8DFD3] pb-1.5">
                        <span className="text-gray-500 font-medium">Donation ID:</span>
                        <span className="font-mono font-bold text-[#7F160C]">{donationId}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-[#E8DFD3] pb-1.5">
                      <span className="text-gray-500 font-medium">Donor Name:</span>
                      <span className="font-bold text-gray-900">{fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E8DFD3] pb-1.5">
                      <span className="text-gray-500 font-medium">Amount:</span>
                      <span className="font-extrabold text-[#7F160C]">₹{currentAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E8DFD3] pb-1.5">
                      <span className="text-gray-500 font-medium">Email:</span>
                      <span className="font-semibold text-gray-900">{email}</span>
                    </div>
                    {mobile && (
                      <div className="flex justify-between border-b border-[#E8DFD3] pb-1.5">
                        <span className="text-gray-500 font-medium">Mobile:</span>
                        <span className="font-semibold text-gray-900">{mobile}</span>
                      </div>
                    )}
                    {utr && (
                      <div className="flex justify-between border-b border-[#E8DFD3] pb-1.5">
                        <span className="text-gray-500 font-medium">UTR / Ref:</span>
                        <span className="font-mono font-bold text-gray-900">{utr}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 text-left">
                    {lang === "hi"
                      ? "कृपया त्वरित सत्यापन के लिए अपने UPI भुगतान का स्क्रीनशॉट कार्यालय प्रभारी संदीप जी को WhatsApp पर भेजें।"
                      : "For instant verification, please share your payment screenshot on WhatsApp with our office coordinator."}
                  </div>

                  <div className="space-y-2 pt-1">
                    <a
                      href={`https://wa.me/919017336118?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp पर रसीद / स्क्रीनशॉट भेजें</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setUtr("");
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-colors cursor-pointer"
                    >
                      {lang === "hi" ? "नया दान करें (Make Another Donation)" : "Make Another Donation"}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
