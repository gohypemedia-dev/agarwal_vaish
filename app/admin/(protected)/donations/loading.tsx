import { TableSkeleton } from "@/components/admin/AdminSkeleton";

export default function DonationsLoading() {
  return <TableSkeleton label="Loading donations and contributions..." stats={true} />;
}
