"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  sanitizeEmail,
  sanitizeMobile,
  sanitizeName,
  validateEmail,
  validateMobile,
  validateName,
} from "@/lib/validation/donation";
import {
  TextReveal,
  ParagraphReveal,
  SectionReveal,
} from "@/components/animation";
import HeadingDivider from "@/components/HeadingDivider";

function validateMessage(msg: string): string | null {
  const cleaned = msg.trim();
  if (!cleaned || cleaned.length < 5) {
    return "Please enter your message.";
  }
  return null;
}

export default function ContactPage() {
  const { lang } = useApp();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "fullName") {
      const err = validateName(formData.fullName);
      setErrors((prev) => ({ ...prev, fullName: err || undefined }));
    } else if (field === "email") {
      const err = validateEmail(formData.email);
      setErrors((prev) => ({ ...prev, email: err || undefined }));
    } else if (field === "phone") {
      const err = validateMobile(formData.phone, false);
      setErrors((prev) => ({ ...prev, phone: err || undefined }));
    } else if (field === "message") {
      const err = validateMessage(formData.message);
      setErrors((prev) => ({ ...prev, message: err || undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = validateName(formData.fullName);
    const emailErr = validateEmail(formData.email);
    const phoneErr = validateMobile(formData.phone, false);
    const msgErr = validateMessage(formData.message);

    if (nameErr || emailErr || phoneErr || msgErr) {
      setErrors({
        fullName: nameErr || undefined,
        email: emailErr || undefined,
        phone: phoneErr || undefined,
        message: msgErr || undefined,
      });
      if (nameErr) document.getElementById("contact-fullname")?.focus();
      else if (emailErr) document.getElementById("contact-email")?.focus();
      else if (phoneErr) document.getElementById("contact-phone")?.focus();
      else if (msgErr) document.getElementById("contact-message")?.focus();
      return;
    }

    setFormData((prev) => ({
      ...prev,
      fullName: sanitizeName(prev.fullName),
      email: sanitizeEmail(prev.email),
      phone: sanitizeMobile(prev.phone),
      subject: prev.subject.trim(),
      message: prev.message.trim(),
    }));
    setFormSubmitted(true);
  };

  return (
    <div className="w-full space-y-0">
      {/* HERO SECTION */}
      <section className="relative py-14 md:py-20 bg-[#FBF2E7] border-b border-[#E7D8C8]">
        <div className="page-container text-center space-y-4 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7F160C]">
            {lang === "hi" ? "संपर्क करें" : "REACH OUT TO US"}
          </p>
          <TextReveal as="h1" className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#7F160C]">
            {lang === "hi" ? "हमसे जुड़े रहें" : "Let’s Stay Connected"}
          </TextReveal>
          <ParagraphReveal className="text-base sm:text-lg text-[#2B201A]/85 leading-relaxed font-sans max-w-2xl mx-auto">
            {lang === "hi"
              ? "सदस्यता, दान, सेवा प्रकल्पों, आयोजनों या किसी भी सामान्य जानकारी के लिए, ट्रस्ट से संपर्क करें। हमारी टीम आपकी पूरी सहायता करेगी।"
              : "For membership, donations, programs, events, or general enquiries, reach out to the Trust and our team will guide you to the right next step."}
          </ParagraphReveal>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="section-py">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Contact Form */}
            <SectionReveal as="div" yOffset={30} className="lg:col-span-7 card-warm p-8 sm:p-10 space-y-6">
              <h2 className="font-editorial text-3xl font-bold text-[#7F160C]">
                {lang === "hi" ? "हमें संदेश भेजें" : "Send Us a Message"}
              </h2>
              <HeadingDivider align="left" className="!py-0" />

              {formSubmitted ? (
                <div className="p-8 bg-[#FFF9F2] rounded-2xl text-center space-y-4 border border-[#2F5A43]">
                  <CheckCircle2 className="w-12 h-12 text-[#2F5A43] mx-auto" />
                  <h3 className="font-editorial text-2xl font-bold text-[#2B201A]">
                    {lang === "hi" ? "संदेश सफलतापूर्वक भेजा गया!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-sm text-[#2B201A]/85">
                    {lang === "hi" ? (
                      <>
                        धन्यवाद, <strong>{formData.fullName}</strong>! आपकी पूछताछ दर्ज कर ली गई है और हमारी टीम २४ घंटे के भीतर <strong>{formData.email}</strong> पर संपर्क करेगी।
                      </>
                    ) : (
                      <>
                        Thank you, <strong>{formData.fullName}</strong>. Your enquiry has been logged and our team will respond to <strong>{formData.email}</strong> within 24 hours.
                      </>
                    )}
                  </p>
                  <button onClick={() => setFormSubmitted(false)} className="btn-primary">
                    {lang === "hi" ? "एक और संदेश भेजें" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-fullname" className="block text-xs font-bold uppercase tracking-wider text-[#2B201A]/80 mb-1">
                        {lang === "hi" ? "पूरा नाम *" : "Full Name *"}
                      </label>
                      <input
                        id="contact-fullname"
                        type="text"
                        required
                        maxLength={60}
                        placeholder={lang === "hi" ? "आपका पूरा नाम" : "Your full name"}
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName && validateName(e.target.value) === null) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        onBlur={() => handleBlur("fullName")}
                        className="input-warm"
                      />
                      {errors.fullName && (touched.fullName || errors.fullName) && (
                        <p className="mt-1 text-xs font-semibold text-[#B3261E]">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#2B201A]/80 mb-1">
                        {lang === "hi" ? "ईमेल पता *" : "Email Address *"}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        maxLength={254}
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email && validateEmail(e.target.value) === null) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        onBlur={() => handleBlur("email")}
                        className="input-warm"
                      />
                      {errors.email && (touched.email || errors.email) && (
                        <p className="mt-1 text-xs font-semibold text-[#B3261E]">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-[#2B201A]/80 mb-1">
                        {lang === "hi" ? "मोबाइल नंबर " : "Phone Number "}
                        <span className="font-normal text-[#2B201A]/50">({lang === "hi" ? "वैकल्पिक" : "optional"})</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="+91"
                        value={formData.phone}
                        onChange={(e) => {
                          const sanitized = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setFormData({ ...formData, phone: sanitized });
                          if (errors.phone && validateMobile(sanitized, false) === null) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        onBlur={() => handleBlur("phone")}
                        className="input-warm"
                      />
                      {errors.phone && (touched.phone || errors.phone) && (
                        <p className="mt-1 text-xs font-semibold text-[#B3261E]">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-[#2B201A]/80 mb-1">
                        {lang === "hi" ? "विषय" : "Subject"}
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        maxLength={120}
                        placeholder={lang === "hi" ? "उदा. सदस्यता या सेवा पूछताछ" : "e.g., Membership Enquiry"}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input-warm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-[#2B201A]/80 mb-1">
                      {lang === "hi" ? "संदेश *" : "Message *"}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      maxLength={2000}
                      placeholder={lang === "hi" ? "अग्रवाल वैश्य समाज हरियाणा आपकी क्या सहायता कर सकता है?" : "How can Aggarwal Vaish Samaj Haryana assist you today?"}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message && validateMessage(e.target.value) === null) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      onBlur={() => handleBlur("message")}
                      className="input-warm"
                    />
                    {errors.message && (touched.message || errors.message) && (
                      <p className="mt-1 text-xs font-semibold text-[#B3261E]">{errors.message}</p>
                    )}
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    <Send className="w-4 h-4" />
                    <span>{lang === "hi" ? "संदेश भेजें" : "Send Message"}</span>
                  </button>
                </form>
              )}
            </SectionReveal>

            {/* Right Contact Info Details & Map Card */}
            <SectionReveal as="div" yOffset={30} delay={0.2} className="lg:col-span-5 space-y-6">
              <div className="card-warm space-y-6">
                <h2 className="font-editorial text-2xl font-bold text-[#7F160C]">
                  {lang === "hi" ? "कार्यालय संपर्क विवरण" : "AVVS Haryana Contact Details"}
                </h2>
                <HeadingDivider align="left" className="!py-0" />

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-[#7F160C]/10 text-[#7F160C] rounded-xl shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B201A]">{lang === "hi" ? "केंद्रीय कार्यालय पता" : "Head Office Address"}</h4>
                      <p className="text-[#2B201A]/85 text-xs leading-relaxed mt-0.5">
                        {lang === "hi"
                          ? "150, सेक्टर 19 पार्ट–1, हुडा, कैथल–136027 (हरियाणा)"
                          : "150, Sector 19 Part-1, HUDA, Kaithal - 136027 (Haryana)"}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-[#2F5A43]/10 text-[#2F5A43] rounded-xl shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B201A]">{lang === "hi" ? "फ़ोन / हेल्पलाइन" : "Phone / Helpline"}</h4>
                      <a
                        href="tel:+919088500061"
                        className="text-xs text-[#7F160C] hover:underline font-bold"
                      >
                        +91 90885 00061
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-[#B8893E]/10 text-[#B8893E] rounded-xl shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B201A]">{lang === "hi" ? "ईमेल पता" : "Official Email"}</h4>
                      <a
                        href="mailto:aggarwalvaishvikassangthan@gmail.com"
                        className="text-xs text-[#7F160C] hover:underline font-bold break-all"
                      >
                        aggarwalvaishvikassangthan@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-[#7F160C]/10 text-[#7F160C] rounded-xl shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B201A]">{lang === "hi" ? "कार्यालय समय" : "Office Hours"}</h4>
                      <p className="text-xs text-[#2B201A]/85">
                        {lang === "hi" ? "सोमवार – शनिवार: सुबह ९:३० – सायं ६:३० (IST)" : "Monday – Saturday: 9:30 AM – 6:30 PM (IST)"}
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Social Connect: Facebook & Instagram */}
                <div className="pt-4 border-t border-[#E7D8C8]">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#7F160C] mb-2.5">
                    {lang === "hi" ? "सोशल मीडिया पर जुड़ें (@avvsharyana)" : "Connect On Social Media (@avvsharyana)"}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://www.facebook.com/profile.php?id=61596429263536"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all text-xs font-bold border border-[#1877F2]/20"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Facebook</span>
                    </a>

                    <a
                      href="https://www.instagram.com/avvsharyana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white transition-all text-xs font-bold border border-[#E4405F]/20"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Membership Form Download Card */}
              <div className="card-warm bg-[#FFF9F2] text-center space-y-3 p-6 border-2 border-dashed border-[#7F160C]/30">
                <MapPin className="w-8 h-8 text-[#7F160C] mx-auto animate-bounce" />
                <h4 className="font-editorial text-xl font-bold text-[#2B201A]">
                  {lang === "hi" ? "केंद्रीय कार्यालय (कैथल, हरियाणा)" : "Central Office (Kaithal, Haryana)"}
                </h4>
                <p className="text-xs text-[#2B201A]/85 max-w-sm mx-auto">
                  {lang === "hi"
                    ? "150, सेक्टर 19 पार्ट–1, हुडा, कैथल–136027 (हरियाणा)। समाज बंधुओं का सदैव हार्दिक स्वागत है।"
                    : "150, Sector 19 Part-1, HUDA, Kaithal - 136027 (Haryana). All community members are cordially welcome."}
                </p>
                <div className="pt-2">
                  <a
                    href="/membership-form-avvs.pdf"
                    download="MEMBERSHIP_FORM_AVVS.pdf"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7F160C] hover:bg-[#69120A] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>{lang === "hi" ? "ऑफिशियल सदस्यता फॉर्म डाउनलोड करें (PDF)" : "Download Official Membership Form (PDF)"}</span>
                  </a>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
