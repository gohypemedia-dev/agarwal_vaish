"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Trash2,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  Briefcase,
  Hash,
  Download,
  AlertCircle,
  Loader2,
  X,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

export interface MembershipRegistrationItem {
  id: string;
  registrationNo: string;
  fullName: string;
  guardianName?: string | null;
  gender: string;
  caste?: string | null;
  gotra?: string | null;
  email?: string | null;
  phone: string;
  dob?: string | null;
  state: string;
  district: string;
  address: string;
  wardNumber?: string | null;
  pincode?: string | null;
  occupation?: string | null;
  occupationDetails?: string | null;
  photoUrl?: string | null;
  planId: string;
  planName: string;
  amount: number;
  status: "PENDING_PAYMENT" | "PENDING_VERIFICATION" | "VERIFIED" | "REJECTED";
  utr?: string | null;
  notes?: string | null;
  createdAt: string;
}

interface Props {
  initialRegistrations: MembershipRegistrationItem[];
}

export default function MembershipApplicationsManager({ initialRegistrations }: Props) {
  const [items, setItems] = useState<MembershipRegistrationItem[]>(initialRegistrations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [planFilter, setPlanFilter] = useState<string>("ALL");
  const [selectedItem, setSelectedItem] = useState<MembershipRegistrationItem | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // UTR & Notes edit in modal
  const [modalUtr, setModalUtr] = useState("");
  const [modalNotes, setModalNotes] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setModalUtr(selectedItem.utr || "");
      setModalNotes(selectedItem.notes || "");
    }
  }, [selectedItem]);

  // Filter items
  const filtered = items.filter((item) => {
    if (statusFilter !== "ALL" && item.status !== statusFilter) return false;
    if (planFilter !== "ALL" && item.planId !== planFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.registrationNo.toLowerCase().includes(q) ||
        item.fullName.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        item.district.toLowerCase().includes(q) ||
        (item.utr && item.utr.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Status updates
  const handleUpdateStatus = async (id: string, newStatus: string, utrVal?: string, notesVal?: string) => {
    try {
      setUpdatingId(id);
      const res = await fetch("/api/admin/memberships", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          utr: utrVal,
          notes: notesVal,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");

      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: newStatus as any, utr: utrVal ?? it.utr, notes: notesVal ?? it.notes } : it))
      );
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem((prev) => (prev ? { ...prev, status: newStatus as any, utr: utrVal ?? prev.utr, notes: notesVal ?? prev.notes } : null));
      }
      toast.success(
        newStatus === "VERIFIED"
          ? "Membership verified and approved successfully!"
          : `Status updated to ${newStatus}`
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this membership application?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/memberships?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems((prev) => prev.filter((it) => it.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
      toast.success("Application deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  // Stats Counters
  const totalCount = items.length;
  const pendingCount = items.filter((i) => i.status === "PENDING_VERIFICATION" || i.status === "PENDING_PAYMENT").length;
  const verifiedCount = items.filter((i) => i.status === "VERIFIED").length;
  const patronCount = items.filter((i) => i.planId === "patron").length;
  const coPatronCount = items.filter((i) => i.planId === "co_patron").length;
  const activeCount = items.filter((i) => i.planId === "active").length;

  return (
    <div className="space-y-6">
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E7D8C8] shadow-xs">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Applications</p>
          <p className="text-2xl font-black text-[#2B201A] mt-1">{totalCount}</p>
        </div>
        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 shadow-xs">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Pending Verification</p>
          <p className="text-2xl font-black text-amber-700 mt-1">{pendingCount}</p>
        </div>
        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 shadow-xs">
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Verified</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">{verifiedCount}</p>
        </div>
        <div className="bg-[#FFF9F2] p-4 rounded-xl border border-[#E8DFD3] shadow-xs">
          <p className="text-xs font-bold text-[#7F160C] uppercase tracking-wider">Patron (₹1L)</p>
          <p className="text-2xl font-black text-[#7F160C] mt-1">{patronCount}</p>
        </div>
        <div className="bg-[#FFF9F2] p-4 rounded-xl border border-[#E8DFD3] shadow-xs">
          <p className="text-xs font-bold text-[#7F160C] uppercase tracking-wider">Co-Patron (₹21k)</p>
          <p className="text-2xl font-black text-[#7F160C] mt-1">{coPatronCount}</p>
        </div>
        <div className="bg-[#FFF9F2] p-4 rounded-xl border border-[#E8DFD3] shadow-xs">
          <p className="text-xs font-bold text-[#7F160C] uppercase tracking-wider">Active (₹100)</p>
          <p className="text-2xl font-black text-[#7F160C] mt-1">{activeCount}</p>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="bg-white p-4 rounded-xl border border-[#E7D8C8] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, email, district, or reg no (AVVS-2026-XXXX)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-[#7F160C] focus:ring-1 focus:ring-[#7F160C] outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-gray-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING_VERIFICATION">Pending Verification</option>
              <option value="VERIFIED">Verified / Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-gray-500">Plan:</span>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 outline-none cursor-pointer"
            >
              <option value="ALL">All Plans</option>
              <option value="patron">Patron Member (₹100,000)</option>
              <option value="co_patron">Co Patron Member (₹21,000)</option>
              <option value="active">Active Member (₹100)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. APPLICATIONS TABLE */}
      <div className="bg-white rounded-xl border border-[#E7D8C8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E7D8C8] text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Reg No</th>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <User className="w-10 h-10 mx-auto text-gray-300 mb-2 stroke-[1.5]" />
                    <p className="font-medium text-sm">No membership applications found</p>
                    <p className="text-xs text-gray-400 mt-0.5">No applications match the selected criteria.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                    {/* Reg No */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#7F160C]">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="hover:underline text-left cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>{item.registrationNo}</span>
                      </button>
                      <span className="block text-[10px] text-gray-400 font-sans font-normal">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#1E293B]">{item.fullName}</p>
                      {item.guardianName && (
                        <p className="text-[11px] text-gray-500">Guardian: {item.guardianName}</p>
                      )}
                      {item.caste && (
                        <span className="inline-block text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded mt-0.5">
                          {item.caste} {item.gotra ? `(${item.gotra})` : ""}
                        </span>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-gray-700 font-medium">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{item.phone}</span>
                      </div>
                      {item.email && (
                        <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="truncate max-w-[140px]">{item.email}</span>
                        </div>
                      )}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-gray-800">{item.district}</p>
                      <p className="text-[11px] text-gray-500">{item.state}</p>
                    </td>

                    {/* Plan */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          item.planId === "patron"
                            ? "bg-purple-100 text-purple-800"
                            : item.planId === "co_patron"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.planId === "patron" ? "Patron (₹1L)" : item.planId === "co_patron" ? "Co-Patron (₹21k)" : "Active (₹100)"}
                      </span>
                      {item.utr && (
                        <span className="block text-[10px] text-gray-500 font-mono mt-0.5">
                          UTR: {item.utr}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {item.status === "VERIFIED" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : item.status === "REJECTED" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Rejected</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {item.status !== "VERIFIED" && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, "VERIFIED")}
                            disabled={updatingId === item.id}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition-colors shadow-2xs"
                            title="Verify & Approve"
                          >
                            {updatingId === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer transition-colors"
                          title="Delete"
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. APPLICATION DETAILS MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-gray-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#7F160C] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-amber-200 block">
                  Membership Registration Details
                </span>
                <h3 className="font-bold text-xl sm:text-2xl mt-0.5">
                  {selectedItem.fullName}
                </h3>
                <p className="text-xs text-white/80 mt-0.5 font-mono">
                  Reg No: {selectedItem.registrationNo}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Plan & Status Banner */}
              <div className="bg-[#FFF9F2] p-4 rounded-xl border border-[#E8DFD3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase block">Selected Plan</span>
                  <p className="text-lg font-black text-[#7F160C]">{selectedItem.planName}</p>
                  <p className="text-sm font-bold text-gray-800">Amount: ₹{selectedItem.amount.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedItem.status === "VERIFIED" ? (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(selectedItem.id, "VERIFIED", modalUtr, modalNotes)}
                      disabled={updatingId === selectedItem.id}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    >
                      {updatingId === selectedItem.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                      <span>Approve</span>
                    </button>
                  )}
                  {selectedItem.status !== "REJECTED" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedItem.id, "REJECTED", modalUtr, modalNotes)}
                      disabled={updatingId === selectedItem.id}
                      className="px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs cursor-pointer transition-colors"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>

              {/* Personal Details Grid */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-1.5">
                  1. Personal Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block text-[11px]">Full Name:</span>
                    <span className="font-bold text-gray-800">{selectedItem.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Father / Husband Name:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.guardianName || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Gender:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.gender}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Date of Birth:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.dob || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Caste &amp; Gotra:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedItem.caste || "Vaish"} {selectedItem.gotra ? `(Gotra: ${selectedItem.gotra})` : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Photo:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.photoUrl || "Not uploaded"}</span>
                  </div>
                </div>
              </div>

              {/* Contact & Address Grid */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-1.5">
                  2. Contact &amp; Address Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block text-[11px]">Mobile Number:</span>
                    <span className="font-bold text-[#7F160C]">{selectedItem.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Email:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.email || "—"}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500 block text-[11px]">Current Address:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.address}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">District:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.district}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">State:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.state}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Ward Number:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.wardNumber || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Pincode:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.pincode || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Occupation */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-1.5">
                  3. Occupation Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block text-[11px]">Occupation:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.occupation || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Details:</span>
                    <span className="font-semibold text-gray-800">{selectedItem.occupationDetails || "—"}</span>
                  </div>
                </div>
              </div>

              {/* UTR & Admin Notes Edit */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700">
                  Admin Verification Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      UPI UTR / Transaction No:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 431289123456"
                      value={modalUtr}
                      onChange={(e) => setModalUtr(e.target.value)}
                      className="w-full h-9 px-3 rounded bg-white border border-gray-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Admin Internal Note:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Paid via PhonePe, verified by admin"
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      className="w-full h-9 px-3 rounded bg-white border border-gray-300 text-xs"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleUpdateStatus(selectedItem.id, selectedItem.status, modalUtr, modalNotes)}
                    disabled={updatingId === selectedItem.id}
                    className="px-3.5 py-1.5 rounded-lg bg-[#7F160C] hover:bg-[#69120A] text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Save Details
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Registered Date: {new Date(selectedItem.createdAt).toLocaleString("en-IN")}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
