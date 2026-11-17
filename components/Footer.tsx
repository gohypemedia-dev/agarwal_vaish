"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart, ArrowUp } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { POLICY_LINKS } from "@/lib/legal";

export default function Footer() {
  const { lang, openDonateModal } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FFF9F2] border-t border-[#E7D8C8] text-[#2B201A] relative pt-16 pb-12">
      <div className="page-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1fr_1.3fr] gap-8 xl:gap-10 pb-12 border-b border-[#E7D8C8]">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B8893E] bg-white shadow-sm shrink-0">
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
                <p className="text-[10.5px] xl:text-[11.5px] font-extrabold tracking-[0.14em] text-[#FFAE08] uppercase">
                  {lang === "hi" ? "समाज हरियाणा" : "SAMAJ HARYANA"}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#2B201A]/85 leading-relaxed">
              {lang === "hi"
                ? "अग्रवाल वैश्य समाज (AVS Haryana) समाज को संगठित करने, महिला सशक्तिकरण, युवा नेतृत्व, सामाजिक सहभागिता और जनसेवा के पंच संकल्प के प्रति समर्पित एक अग्रणी सामाजिक संगठन है।"
                : "Aggarwal Vaish Samaj (AVS Haryana) is a premier social and community organization dedicated to community unity, women empowerment, youth leadership, and public service under the sacred Panch Sankalp."}
            </p>
            <div className="pt-2">
              <button
                onClick={() => openDonateModal("General Donation")}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFAE08] hover:bg-[#E59C00] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-warm-sm transition-all"
              >
                <Heart className="w-4 h-4 fill-current text-white" />
                <span>{lang === "hi" ? "सहयोग एवं दान" : "Support Our Cause"}</span>
              </button>
            </div>
          </div>

          {/* Column 1: Links */}
          <div className="space-y-3">
            <h4 className="font-sans text-lg font-bold text-[#FFAE08] border-b border-[#E7D8C8] pb-1.5 inline-block">
              {lang === "hi" ? "त्वरित लिंक" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="#" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "मुख्य पृष्ठ" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="#network" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "हमारे बारे में" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "पंच संकल्प" : "Panch Sankalp"}
                </Link>
              </li>
              <li>
                <Link href="#network" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "सदस्यता" : "Membership"}
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "गैलरी" : "Gallery & Moments"}
                </Link>
              </li>
              <li>
                <Link href="#network" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "संपर्क करें" : "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Our Work */}
          <div className="space-y-3">
            <h4 className="font-editorial text-lg font-bold text-[#FFAE08] border-b border-[#E7D8C8] pb-1.5 inline-block">
              {lang === "hi" ? "पंच संकल्प" : "Panch Sankalp"}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="#sankalp" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "सामाजिक सहभागिता" : "Social Participation"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "महिला सशक्तिकरण" : "Women Empowerment"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "युवा नेतृत्व" : "Youth Leadership"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "राजनीतिक सहभागिता" : "Political Participation"}
                </Link>
              </li>
              <li>
                <Link href="#sankalp" className="hover:text-[#FFAE08] transition-colors">
                  {lang === "hi" ? "संगठित समाज" : "Organized Community"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <h4 className="font-editorial text-lg font-bold text-[#FFAE08] border-b border-[#E7D8C8] pb-1.5 inline-block">
              {lang === "hi" ? "संपर्क विवरण" : "Contact Details"}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B8893E] shrink-0 mt-0.5" />
                <span className="text-[#2B201A]/85 leading-snug">
                  Adarsh College Market, Bhiwani - Hansi Rd, Bhiwani, Haryana 127021, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B8893E] shrink-0" />
                <a href="tel:+919416055000" className="text-[#2B201A]/85 hover:text-[#E86F1D] font-semibold">
                  +91 94160 55000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B8893E] shrink-0" />
                <a href="mailto:avshry@gmail.com" className="text-[#2B201A]/85 hover:text-[#E86F1D] font-semibold text-xs sm:text-sm whitespace-nowrap">
                  avshry@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2B201A]/75 font-medium text-center sm:text-left">
          <p>
            {lang === "hi"
              ? `© ${new Date().getFullYear()} अग्रवाल वैश्य समाज (AVS Haryana)। सर्वाधिकार सुरक्षित।`
              : `© ${new Date().getFullYear()} Aggarwal Vaish Samaj Haryana. All rights reserved.`}
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
                  <Link href="#" className="hover:text-[#FFAE08] transition-colors">
                    {lang === "hi" ? labelHi : p.label}
                  </Link>
                  <span>•</span>
                </React.Fragment>
              );
            })}
            <span>{lang === "hi" ? "पंजीकरण: AVS/HRY/2009" : "Reg. No: AVS/HRY/2009"}</span>
            <button
              onClick={scrollToTop}
              className="ml-1 p-2.5 bg-[#FFF9F2] hover:bg-[#FFAE08] hover:text-white rounded-xl border border-[#E7D8C8] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer"
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
