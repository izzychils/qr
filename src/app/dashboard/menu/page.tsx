import type { Metadata } from "next";
import { MenuManager } from "@/features/dashboard/menu-manager";

export const metadata: Metadata = {
  title: "Menu",
  description: "Manage the live menu, availability and the dishes the kitchen has run out of.",
};

export default function MenuPage() {
  return <MenuManager />;
}
