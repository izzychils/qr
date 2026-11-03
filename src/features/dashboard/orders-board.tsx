"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock,
  Search,
  Utensils,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { OrderChip } from "@/components/dashboard/status-chip";
import { Modal } from "@/components/ui/modal";
import {
  advanceOrder,
  payOrder,
  useOrders,
  type Order,
  type OrderStatus,
} from "@/lib/store";
import { cn, clockLabel, minutesSince, naira, shortDate } from "@/lib/utils";

const filters: { label: string; value: "all" | OrderStatus }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Cooking", value: "preparing" },
  { label: "Ready", value: "ready" },
  { label: "Served", value: "served" },
  { label: "Paid", value: "paid" },
];

export function OrdersBoard() {
  const [orders, ready] = useOrders();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return orders
      .filter((order) => (filter === "all" ? true : order.status === filter))
      .filter(
        (order) =>
          !term ||
          order.code.toLowerCase().includes(term) ||
          order.guest.toLowerCase().includes(term) ||
          String(order.table).includes(term),
      )
      .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime());
  }, [orders, filter, query]);

  const active = orders.find((order) => order.id === activeId) ?? null;
  const open = orders.filter((order) => !["served", "paid"].includes(order.status));
  const settled = orders.filter((order) => order.status === "paid");
  const sold = orders.reduce(
    (sum, order) => sum + order.items.reduce((itemSum, line) => itemSum + line.qty, 0),
    0,
  );

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Orders / Tonight"
        title="Every ticket, one board."
        description="QR orders and waiter orders land in the same list. Open a ticket to move it through the pass."
        action={
          <Link
            href="/dashboard/kitchen"
            className="flex h-9 items-center gap-1.5 rounded-[12px] bg-forest px-3 text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine"
          >
            <Utensils className="h-3.5 w-3.5" />
            Kitchen display
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {[
          { label: "Open tickets", value: String(open.length), note: "On the pass now" },
          { label: "Items sold", value: String(sold), note: "Across every ticket" },
          {
            label: "Settled tonight",
            value: naira(settled.reduce((sum, order) => sum + order.total, 0)),
            note: `${settled.length} ${settled.length === 1 ? "receipt" : "receipts"}`,
          },
          {
            label: "Average ticket",
            value: naira(
              Math.round(
                orders.reduce((sum, order) => sum + order.total, 0) / Math.max(1, orders.length),
              ),
            ),
            note: "Including service and VAT",
          },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[9px] border border-line bg-cream px-3.5 py-3">
            <p className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">
              {stat.label}
            </p>
            <p className="mt-2 font-serif text-[clamp(1.45rem,2.4vw,1.95rem)] font-semibold leading-none tracking-[-0.04em] text-forest">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[11.5px] text-muted/65">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2.5 xl:flex-row xl:items-center xl:justify-between">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {filters.map((entry) => (
            <button
              key={entry.value}
              type="button"
              onClick={() => setFilter(entry.value)}
              aria-pressed={filter === entry.value}
              className={cn(
                "h-8 shrink-0 rounded-[12px] border px-3 font-mono text-[11.5px] uppercase tracking-[0.06em] transition-colors",
                filter === entry.value
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-cream text-muted hover:border-forest/35 hover:text-forest",
              )}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <label className="relative block w-full xl:w-[260px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted/60" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search by order, guest or table"
            aria-label="Search orders"
            className="h-9 w-full rounded-[12px] border border-line bg-cream pl-9 pr-3 text-[12px] text-forest placeholder:text-muted/55 focus:border-forest focus:outline-none"
          />
        </label>
      </div>

      <section className="overflow-hidden rounded-[20px] border border-line bg-cream">
        <div className="hidden grid-cols-[96px_60px_1.3fr_80px_98px_96px_28px] items-center gap-3 border-b border-line px-4 py-2.5 font-mono text-[7px] uppercase tracking-[0.08em] text-muted/70 lg:grid">
          <span>Order</span>
          <span>Table</span>
          <span>Guest</span>
          <span>Time</span>
          <span>Total</span>
          <span>Status</span>
          <span />
        </div>

        {!ready ? (
          <div className="px-4 py-10 text-center font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">
            Reading the pass
          </div>
        ) : filtered.length ? (
          <div className="divide-y divide-line/80">
            {filtered.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setActiveId(order.id)}
                className="grid w-full grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-sand/60 lg:grid-cols-[96px_60px_1.3fr_80px_98px_96px_28px]"
              >
                <div className="flex items-center gap-2 lg:block">
                  <span className="font-mono text-[12px] font-medium text-forest">{order.code}</span>
                  <span className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.05em] text-muted lg:hidden">
                    T{order.table}
                  </span>
                </div>
                <span className="hidden font-serif text-[18px] font-semibold text-forest lg:block">
                  {order.table}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-forest">{order.guest}</p>
                  <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.06em] text-muted/60">
                    {order.channel} / {order.items.length} lines
                  </p>
                </div>
                <span className="hidden font-mono text-[11.5px] text-muted lg:block">
                  {clockLabel(order.placedAt)}
                </span>
                <span className="price hidden text-[11.5px] text-forest lg:block">
                  {naira(order.total)}
                </span>
                <span className="justify-self-end lg:justify-self-start">
                  <OrderChip status={order.status} />
                </span>
                <ChevronRight className="ml-auto hidden h-3.5 w-3.5 text-forest/25 lg:block" />
                <span className="price text-[12px] text-forest lg:hidden">{naira(order.total)}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="px-4 py-12 text-center">
            <p className="font-serif text-[22px] font-semibold text-forest">No tickets in that view.</p>
            <p className="mt-1.5 text-[11.5px] text-muted">Change the filter or clear the search.</p>
          </div>
        )}
      </section>

      <Modal open={Boolean(active)} onClose={() => setActiveId(null)} label={active?.code ?? "Order"} size="md">
        {active ? (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
                  {active.channel} order / {shortDate(active.placedAt)} {clockLabel(active.placedAt)}
                </p>
                <h2 className="mt-1.5 font-serif text-[30px] font-semibold leading-none tracking-[-0.04em] text-forest">
                  Table {active.table} / {active.guest}
                </h2>
              </div>
              <OrderChip status={active.status} />
            </div>

            <div className="mt-4 rounded-[14px] border border-line bg-white p-4">
              <ul className="divide-y divide-line/80">
                {active.items.map((line) => (
                  <li key={line.id} className="flex items-start justify-between gap-3 py-2.5">
                    <div>
                      <p className="text-[12.5px] font-semibold text-forest">
                        {line.qty} x {line.name}
                      </p>
                      {line.options.length ? (
                        <p className="mt-0.5 text-[12px] text-muted">{line.options.join(" / ")}</p>
                      ) : null}
                      {line.note ? (
                        <p className="mt-0.5 text-[12px] italic text-tomato-deep">{line.note}</p>
                      ) : null}
                    </div>
                    <span className="price shrink-0 text-[11.5px] text-forest">
                      {naira(line.unitPrice * line.qty)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 space-y-1 border-t border-line pt-2.5 text-[11.5px] text-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="price text-forest">{naira(active.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service and VAT</span>
                  <span className="price text-forest">{naira(active.service + active.vat)}</span>
                </div>
                <div className="flex justify-between border-t border-forest/20 pt-2 text-[12px]">
                  <span className="font-mono uppercase tracking-[0.07em] text-muted">Total</span>
                  <span className="price text-[13px] text-forest">{naira(active.total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {active.status === "new" ? (
                <TicketAction label="Start cooking" onClick={() => advanceOrder(active.id, "preparing")} />
              ) : null}
              {active.status === "preparing" ? (
                <TicketAction label="Mark ready" onClick={() => advanceOrder(active.id, "ready")} />
              ) : null}
              {active.status === "ready" ? (
                <TicketAction label="Mark served" onClick={() => advanceOrder(active.id, "served")} />
              ) : null}
              {active.status === "served" ? (
                <TicketAction label="Settle at counter" onClick={() => payOrder(active.id, "Counter")} />
              ) : null}
              {active.status === "paid" ? (
                <span className="flex h-9 items-center gap-1.5 rounded-[12px] bg-moss/10 px-3 text-[11.5px] font-semibold text-moss">
                  <Check className="h-3.5 w-3.5" />
                  Paid with {active.paidWith ?? "Paystack"}
                </span>
              ) : null}
              <Link
                href={`/order/table-${active.table}`}
                className="flex h-9 items-center gap-1.5 rounded-[12px] border border-line bg-white px-3 text-[11.5px] font-semibold text-forest"
              >
                Table menu
                <ArrowUpRight className="h-3 w-3" />
              </Link>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-muted/60">
                <Clock className="h-3 w-3" />
                {minutesSince(active.placedAt)} min
              </span>
            </div>

            {active.note ? (
              <p className="mt-3 rounded-[12px] border border-butter/60 bg-butter/15 px-3 py-2 text-[12px] leading-relaxed text-ink">
                <span className="font-mono text-[7.5px] uppercase tracking-[0.07em] text-muted">
                  Guest note /
                </span>{" "}
                {active.note}
              </p>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function TicketAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-9 rounded-[12px] bg-tomato px-3 text-[11.5px] font-semibold text-cream transition-colors hover:bg-tomato-deep"
    >
      {label}
    </button>
  );
}
