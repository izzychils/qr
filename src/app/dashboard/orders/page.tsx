import type { Metadata } from "next";
import { OrdersBoard } from "@/features/dashboard/orders-board";

export const metadata: Metadata = {
  title: "Orders",
  description: "Every open and settled ticket, from the QR menu and the floor.",
};

export default function OrdersPage() {
  return <OrdersBoard />;
}
