import type { Metadata } from "next";
import { FloorPlan } from "@/features/dashboard/floor-plan";

export const metadata: Metadata = {
  title: "Floor plan",
  description: "See every table, its status, guests, waiter and open bill.",
};

export default function TablesPage() {
  return <FloorPlan />;
}
