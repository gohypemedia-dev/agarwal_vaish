import { redirect } from "next/navigation";
import { requireAdminPage } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  await requireAdminPage();
  redirect("/admin/members");
}
