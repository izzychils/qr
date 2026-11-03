import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderExperience } from "@/features/order/order-experience";
import { restaurant } from "@/features/menu/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: restaurant.tableCount }, (_, index) => ({
    table: `table-${index + 1}`,
  }));
}

function tableNumber(value: string) {
  const match = value.match(/(\d+)/);
  if (!match) return null;
  const number = Number(match[1]);
  if (!Number.isInteger(number) || number < 1 || number > restaurant.tableCount) return null;
  return number;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ table: string }>;
}): Promise<Metadata> {
  const { table } = await params;
  const number = tableNumber(table) ?? 12;
  return {
    title: `Table ${number} menu`,
    description: `Order from ${restaurant.name} at table ${number}. No app, no account, one shared bill.`,
  };
}

export default async function TableOrderPage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const number = tableNumber(table);
  if (!number) notFound();
  return <OrderExperience table={number} />;
}
