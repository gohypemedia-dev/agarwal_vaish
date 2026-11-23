"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeadingDivider from "@/components/HeadingDivider";

export default function PresidentMessagePage() {
  return (
    <div className="w-full min-h-screen bg-[#FFF9F2] text-[#2B201A] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">
      {/* 1. PAGE HEADER */}
      <section className="pt-10 sm:pt-14 pb-4 sm:pb-6 bg-[#FFF9F2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            President Message
          </h1>
          <HeadingDivider className="mt-3.5" />
        </div>
      </section>

      {/* 2. MESSAGE BODY SECTION (ROUNDED-NONE, CLEAN NEUTRAL BORDER, STICKY SCROLL) */}
      <section className="py-4 sm:py-8 bg-[#FFF9F2]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-none border border-[#E8DFD3] shadow-xs p-6 sm:p-10 lg:p-12 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start relative">
              
              {/* Photo Column: STICKY ON DESKTOP until text ends and aligns */}
              <div className="md:col-span-5 md:sticky md:top-28 md:self-start space-y-4">
                <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden border border-[#E8DFD3] shadow-md bg-amber-50/30">
                  <Image
                    src="/images/agarwal/founder-ram-pratap-gupta.jpg"
                    alt="श्री रामप्रताप गुप्ता - संस्थापक अध्यक्ष"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Floating Badge at bottom (rounded-none, clean neutral border) */}
                  <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-xs rounded-none p-3 sm:p-4 shadow-lg border border-[#E8DFD3] text-center">
                    <h2 className="font-sans font-bold text-sm sm:text-base text-black uppercase tracking-wide">
                      RAM PRATAP GUPTA
                    </h2>
                    <p className="text-[11px] sm:text-xs font-bold text-[#7F160C] uppercase tracking-wider mt-0.5">
                      FOUNDER PRESIDENT
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Content: SCROLLS ALONGSIDE STICKY PHOTO */}
              <div className="md:col-span-7 space-y-5 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
                <div className="text-3xl sm:text-4xl text-[#7F160C] font-sans font-bold leading-none select-none">
                  “
                </div>

                <p className="font-sans text-lg md:text-xl font-medium text-[#7F160C]">
                  मेरे प्रिय समाजबंधुओं,
                </p>

                <p>
                  मेरा सदैव यह विश्वास रहा है कि किसी भी समाज की वास्तविक शक्ति उसकी <strong>एकता, संगठन और सामूहिक नेतृत्व</strong> में निहित होती है। समाज का विकास केवल कुछ व्यक्तियों की उपलब्धियों से नहीं, बल्कि प्रत्येक वर्ग की सक्रिय भागीदारी से संभव है।
                </p>

                <p>
                  इसी विचारधारा के साथ हमने <strong>अग्रवाल वैश्य विकास संगठन</strong> की स्थापना की है। हमारा उद्देश्य समाज को एक ऐसा मंच प्रदान करना है, जहां युवाओं को नेतृत्व के अवसर मिलें, महिलाएं आत्मनिर्भर बनें, समाज आर्थिक रूप से सशक्त हो और राजनीतिक क्षेत्र में उचित भागीदारी एवं प्रतिनिधित्व प्राप्त करे।
                </p>

                <p>
                  हमारे पाँच संकल्प – <strong>राजनीतिक सशक्तिकरण, नारी स्वावलंबन एवं उद्यमिता, युवा नेतृत्व निर्माण, आर्थिक आत्मनिर्भरता और संगठित समाज</strong> – केवल शब्द नहीं, बल्कि हमारे कार्यों की दिशा और भविष्य का आधार हैं।
                </p>

                <p>
                  मैं चाहता हूं कि यह संगठन किसी एक व्यक्ति या वर्ग तक सीमित न रहकर प्रत्येक समाजबंधु का अपना संगठन बने। इसमें हर व्यक्ति को सम्मान, सहभागिता और आगे बढ़ने का अवसर मिले।
                </p>

                <p>
                  मेरा आप सभी से आग्रह है कि इस अभियान से जुड़ें, अपने सुझाव दें और संगठन को मजबूत बनाने में अपना सक्रिय योगदान दें।
                </p>

                <p>
                  मेरा विश्वास है कि जब हम संगठित होंगे, तभी सशक्त होंगे और जब सशक्त होंगे, तभी विकास की नई ऊंचाइयों को प्राप्त करेंगे।
                </p>

                <p className="font-sans text-lg md:text-xl font-medium text-[#7F160C] pt-1">
                  आइए, मिलकर एक ऐसे समाज का निर्माण करें जिस पर आने वाली पीढ़ियां गर्व कर सकें।
                </p>

                <div className="pt-6 border-t border-[#E8DFD3] space-y-1">
                  <p className="font-medium text-black">आपका अपना,</p>
                  <p className="font-sans text-lg md:text-xl font-medium text-black">रामप्रताप गुप्ता</p>
                  <p className="text-sm font-medium text-[#7F160C]">
                    संस्थापक अध्यक्ष, अग्रवाल वैश्य विकास संगठन
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
