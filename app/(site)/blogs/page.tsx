import type { Metadata } from "next";
import HeadingDivider from "@/components/HeadingDivider";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "ब्लॉग एवं विचार | Blogs - Aggarwal Vaish Samaj Haryana",
  description: "अग्रवाल वैश्य समाज हरियाणा के सामाजिक, सांस्कृतिक एवं प्रेरणादायक लेख व विचार।",
};

export default function BlogsPage() {
  return (
    <div className="w-full bg-[#FFF9F2] min-h-screen py-12 sm:py-20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-[#1E1612]">ब्लॉग एवं </span>
            <span className="text-[#7F160C]">विचार</span>
          </h1>
          <HeadingDivider className="!py-1" />
          <p className="text-sm sm:text-base text-[#5C4D43] leading-relaxed font-sans">
            समाज, संस्कृति, इतिहास एवं भावी पीढ़ी के मार्गदर्शन से संबंधित विशेष वैचारिक लेख।
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E7D8C8] p-12 sm:p-16 text-center space-y-4 shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF6F0] border border-[#E7D8C8] text-[#7F160C] flex items-center justify-center mx-auto shadow-xs">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#1E1612]">
            शीघ्र ही प्रकाशित होंगे
          </h3>
          <p className="text-xs sm:text-sm text-[#5C4D43] leading-relaxed">
            हमारे विद्वानों और विचारकों द्वारा समाज हित में लिखे गए प्रेरक ब्लॉग और आलेख शीघ्र ही इस पृष्ठ पर साझा किए जाएंगे।
          </p>
        </div>
      </div>
    </div>
  );
}
