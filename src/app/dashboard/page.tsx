import type { Metadata } from "next";
import { Overview } from "@/features/dashboard/overview";

export const metadata: Metadata = {
  title: "Service overview",
  description: "Revenue, covers, floor status and open tickets for tonight's service.",
};

export default function DashboardPage() {
  return <Overview />;
}
