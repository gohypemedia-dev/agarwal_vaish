"use client";

import React, { useState } from "react";
import { FileText, Users } from "lucide-react";
import MembershipApplicationsManager, {
  MembershipRegistrationItem,
} from "./MembershipApplicationsManager";
import MemberManager, { AdminMemberItem } from "./MemberManager";

interface Props {
  initialMembers: AdminMemberItem[];
  initialRegistrations: MembershipRegistrationItem[];
}

export default function AdminMembersTabs({
  initialMembers,
  initialRegistrations,
}: Props) {
  const [activeTab, setActiveTab] = useState<"applications" | "directory">(
    "applications"
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Tab Switcher */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7D8C8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2B201A]">
            Membership Management
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
            Review membership applications, verify payments, and manage registered members.
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "applications"
                ? "bg-[#7F160C] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Applications ({initialRegistrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("directory")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "directory"
                ? "bg-[#7F160C] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Active Members ({initialMembers.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "applications" ? (
        <MembershipApplicationsManager
          initialRegistrations={initialRegistrations}
        />
      ) : (
        <MemberManager initialMembers={initialMembers} />
      )}
    </div>
  );
}
