import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderStatus } from "@/features/order/order-status";
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
    title: `Table ${number} order`,
    description: `Follow the order and settle the bill at ${restaurant.name}, table ${number}.`,
  };
}

export default async function TableStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ table: string }>;
  searchParams: Promise<{ order?: string }>;
}) {
  const { table } = await params;
  const { order } = await searchParams;
  const number = tableNumber(table);
  if (!number) notFound();
  return <OrderStatus table={number} initialOrderId={order ?? null} />;
}
