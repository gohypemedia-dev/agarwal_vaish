"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart, ArrowUp, FileText, ExternalLink } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { POLICY_LINKS, LEGAL } from "@/lib/legal";

export default function Footer() {
  const { lang, openDonateModal } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FFF9F2] border-t border-[#E7D8C8] text-[#2B201A] relative pt-12 sm:pt-16 pb-8 sm:pb-12">
      <div className="page-container px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1fr_1.3fr] gap-8 xl:gap-10 pb-8 sm:pb-12 border-b border-[#E7D8C8]">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#7F160C]/20 bg-white shadow-sm shrink-0">
                <Image
                  src="/images/agarwal/logo.png"
                  alt="Aggarwal Vaish Samaj Haryana Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-sans text-lg xl:text-xl font-bold text-[#2B201A] leading-tight">
                  {lang === "hi" ? "अग्रवाल वैश्य" : "AGGARWAL VAISH"}
                </h3>
                <p className="text-[10.5px] xl:text-[11.5px] font-extrabold tracking-[0.14em] text-[#7F160C] uppercase">
                  {lang === "hi" ? "विकास संगठन" : "VIKAS SANGATHAN"}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#2B201A]/85 leading-relaxed">
              {lang === "hi"
                ? "अग्रवाल वैश्य विकास संगठन समाज को संगठित करने, महिला सशक्तिकरण, युवा नेतृत्व, सामाजिक सहभागिता और जनसेवा के पंच संकल्प के प्रति समर्पित एक अग्रणी सामाजिक संगठन है।"
                : "Aggarwal Vaish Vikas Sangathan is a premier social and community organization dedicated to community unity, women empowerment, youth leadership, and public service under the sacred Panch Sankalp."}
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => openDonateModal("General Donation")}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7F160C] hover:bg-[#69120A] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-warm-sm transition-all"
              >
                <Heart className="w-4 h-4 fill-current text-white" />
                <span>{lang === "hi" ? "सहयोग एवं दान" : "Support Our Cause"}</span>
              </button>

              <a
                href="/membership-form-avvs.pdf"
                download="MEMBERSHIP_FORM_AVVS.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-50 text-[#7F160C] border border-[#7F160C]/30 text-xs font-bold rounded-xl shadow-xs transition-all w-fit"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === "hi" ? "सदस्यता फॉर्म (PDF)" : "Membership Form (PDF)"}</span>
              </a>
            </div>
          </div>

          {/* Column 1: Links */}
          <div className="space-y-3">
            <h4 className="font-sans text-lg font-bold text-[#7F160C] border-b border-[#E7D8C8] pb-1.5 inline-block">
              {lang === "hi" ? "त्वरित लिंक" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "मुख्य पृष्ठ" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "हमारे बारे में" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/initiatives" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "पंच संकल्प" : "Panch Sankalp"}
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "सदस्यता" : "Membership"}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "गैलरी" : "Gallery & Moments"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "संपर्क करें" : "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Our Work */}
          <div className="space-y-3">
            <h4 className="font-editorial text-lg font-bold text-[#7F160C] border-b border-[#E7D8C8] pb-1.5 inline-block">
              {lang === "hi" ? "पंच संकल्प" : "Panch Sankalp"}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="#sankalp" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "राजनीतिक सशक्तिकरण" : "Political Empowerment"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "नारी स्वावलंबन एवं उद्यमिता" : "Women Empowerment & Entrepreneurship"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "युवा नेतृत्व निर्माण" : "Youth Leadership Development"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "आर्थिक आत्मनिर्भरता" : "Economic Self-Reliance"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#7F160C] transition-colors">
                  {lang === "hi" ? "संगठित समाज" : "Organised Society"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <h4 className="font-editorial text-lg font-bold text-[#7F160C] border-b border-[#E7D8C8] pb-1.5 inline-block">
              {lang === "hi" ? "संपर्क विवरण" : "Contact Details"}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7F160C] shrink-0 mt-0.5" />
                <span className="text-[#2B201A]/85 leading-snug">
                  {lang === "hi" ? LEGAL.addressHi : LEGAL.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#7F160C] shrink-0" />
                <a
                  href={LEGAL.phoneHref}
                  className="text-[#2B201A]/85 hover:text-[#7F160C] font-semibold transition-colors"
                >
                  {LEGAL.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#7F160C] shrink-0" />
                <a
                  href={`mailto:${LEGAL.email}`}
                  className="text-[#2B201A]/85 hover:text-[#7F160C] font-semibold text-xs sm:text-sm break-all transition-colors"
                >
                  {LEGAL.email}
                </a>
              </li>
            </ul>

            {/* Social Media: Instagram & Facebook (avvsharyana) */}
            <div className="pt-2 border-t border-[#E7D8C8]/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#7F160C] mb-2">
                {lang === "hi" ? "सोशल मीडिया पर जुड़ें" : "Connect With Us"}
              </p>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href={LEGAL.facebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white text-xs font-semibold transition-all border border-[#1877F2]/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>avvsharyana</span>
                </a>

                {/* Instagram */}
                <a
                  href={LEGAL.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white text-xs font-semibold transition-all border border-[#E4405F]/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>avvsharyana</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2B201A]/75 font-medium text-center sm:text-left">
          <p>
            {lang === "hi"
              ? `© ${new Date().getFullYear()} अग्रवाल वैश्य विकास संगठन। सर्वाधिकार सुरक्षित।`
              : `© ${new Date().getFullYear()} Aggarwal Vaish Vikas Sangathan. All rights reserved.`}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-4">
            {POLICY_LINKS.map((p) => {
              const labelHi =
                p.href === "/privacy-policy"
                  ? "गोपनीयता नीति"
                  : p.href === "/terms"
                    ? "नियम व शर्तें"
                    : p.href === "/refund-policy"
                      ? "रिफंड व रद्दीकरण"
                      : "शिपिंग नीति";
              return (
                <React.Fragment key={p.href}>
                  <Link href="#" className="hover:text-[#7F160C] transition-colors">
                    {lang === "hi" ? labelHi : p.label}
                  </Link>
                  <span>•</span>
                </React.Fragment>
              );
            })}
            <span>{lang === "hi" ? "अग्रवाल वैश्य विकास संगठन (रजि.)" : "Aggarwal Vaish Vikas Sangathan (Regd.)"}</span>
            <button
              onClick={scrollToTop}
              className="ml-1 p-2.5 bg-[#FFF9F2] hover:bg-[#7F160C] hover:text-white rounded-xl border border-[#E7D8C8] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
