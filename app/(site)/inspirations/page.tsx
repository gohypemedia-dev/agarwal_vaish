"use client";

import React, { useState } from "react";
import Image from "next/image";
import HeadingDivider from "@/components/HeadingDivider";
import { allInspirations, type InspirationItem } from "@/data/inspirations";

export default function InspirationsPage() {
  const [selectedFigure, setSelectedFigure] = useState<InspirationItem | null>(null);

  return (
    <div className="w-full min-h-screen bg-[#FFF9F2] text-[#000000] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">
      {/* 1. PAGE HEADER */}
      <section className="pt-10 sm:pt-14 pb-2 sm:pb-3 bg-[#FFF9F2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            Our Inspiration
          </h1>
          <HeadingDivider className="mt-2.5" />
        </div>
      </section>

      {/* 2. SYMMETRIC GRID (ALL INSPIRATIONS - 6 COLUMNS DESKTOP MATCHING AVSHARYANA.COM) */}
      <section className="pt-4 sm:pt-6 pb-12 sm:pb-16 bg-[#FFF9F2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {allInspirations.map((fig) => (
              <div
                key={fig.id}
                onClick={() => setSelectedFigure(fig)}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFD3] shadow-xs hover:shadow-lg hover:border-[#7F160C] transition-all duration-300 flex flex-col items-center justify-between cursor-pointer group text-center min-h-[210px] select-none"
              >
                {/* Circular Portrait Photo */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#E8DFD3] group-hover:border-[#7F160C] group-hover:scale-105 transition-all duration-300 shadow-xs bg-[#FAF7F2] shrink-0 mx-auto">
                  <Image
                    src={fig.image || "/images/agarwal/logo.png"}
                    alt={fig.name}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Name */}
                <div className="mt-3 w-full flex-1 flex items-center justify-center">
                  <h3 className="font-sans font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#7F160C] transition-colors leading-snug line-clamp-2 px-1">
                    {fig.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MODAL FOR DETAILED BIO */}
      {selectedFigure && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedFigure(null)}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 relative animate-in fade-in zoom-in-95 duration-150 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedFigure(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black font-bold text-lg flex items-center justify-center cursor-pointer transition-colors z-10"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 border-[#7F160C]/40 shadow-md shrink-0 bg-[#FAF7F2]">
                <Image
                  src={selectedFigure.image || "/images/agarwal/logo.png"}
                  alt={selectedFigure.name}
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              </div>

              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <span className="inline-block text-[11px] font-bold text-[#7F160C] uppercase tracking-wider bg-[#FFF9F2] px-3 py-1 rounded-full border border-[#7F160C]/20">
                  वैश्य समाज प्रेरणास्रोत
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-black">
                  {selectedFigure.name}
                </h3>
              </div>
            </div>

            {/* Divider line */}
            <div className="border-t border-[#E8DFD3] pt-4" />

            {/* Bio / Description */}
            <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 font-sans text-justify max-h-[50vh] overflow-y-auto pr-2">
              {selectedFigure.description ? (
                selectedFigure.description.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx} className="whitespace-pre-line">
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 italic text-center">विवरण शीघ्र उपलब्ध कराया जाएगा।</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedFigure(null)}
                className="px-6 py-2 rounded-xl bg-[#7F160C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#69120A] cursor-pointer transition-colors shadow-xs"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
