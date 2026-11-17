import React from "react";

interface HeadingDividerProps {
  align?: "center" | "left" | "right";
  className?: string;
}

export default function HeadingDivider({ align = "center", className = "" }: HeadingDividerProps) {
  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center";

  return (
    <div
      className={`flex items-center ${justifyClass} gap-2.5 py-1.5 ${className}`}
      aria-hidden="true"
    >
      <span className="w-10 sm:w-14 h-[2.5px] bg-[#7F160C] rounded-full" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#7F160C] shrink-0" />
      <span className="w-10 sm:w-14 h-[2.5px] bg-[#7F160C] rounded-full" />
    </div>
  );
}
