import { redirect } from "next/navigation";
import { requireAdminPage } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string; q?: string; page?: string }>;
}) {
  await requireAdminPage();
  const sp = await searchParams;
  const p = new URLSearchParams();
  if (sp.type) p.set("type", sp.type);
  if (sp.status) p.set("status", sp.status);
  if (sp.q) p.set("q", sp.q);
  if (sp.page) p.set("page", sp.page);
  const qs = p.toString();

  if (qs) {
    redirect(`/admin/donations?${qs}`);
  }
  redirect("/admin/members");
}
