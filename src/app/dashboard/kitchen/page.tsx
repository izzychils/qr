import type { Metadata } from "next";
import { KitchenBoard } from "@/features/dashboard/kitchen-board";

export const metadata: Metadata = {
  title: "Kitchen display",
  description: "Live tickets by station, with prep times, notes and one tap to move each course.",
};

export default function KitchenPage() {
  return <KitchenBoard />;
}
