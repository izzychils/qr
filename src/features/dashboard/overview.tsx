"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Banknote,
  BellRing,
  Check,
  Grid2X2,
  ReceiptText,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { OrderChip } from "@/components/dashboard/status-chip";
import { RevenueChart } from "@/components/dashboard/charts";
import { aiBriefing, todayStats, topDishes } from "@/features/dashboard/data";
import { statusMeta } from "@/features/dashboard/tables-data";
import {
  resolveRequest,
  useOrders,
  useServiceRequests,
  useTables,
} from "@/lib/store";
import { cn, minutesSince, naira } from "@/lib/utils";

const requestLabels: Record<string, string> = {
  waiter: "Waiter needed",
  bill: "Bill requested",
  water: "Water for the table",
};

export function Overview() {
  const [orders] = useOrders();
  const [tables] = useTables();
  const [requests] = useServiceRequests();

  const openTables = tables.filter((table) => table.status === "open").length;
  const pending = requests.filter((request) => !request.resolved);
  const liveOrders = orders
    .filter((order) => ["new", "preparing", "ready"].includes(order.status))
    .sort((a, b) => new Date(a.placedAt).getTime() - new Date(b.placedAt).getTime());
  const revenue = todayStats.revenue;

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Tonight / Dinner service"
        title="The room, right now."
        description="Covers, tickets, tables and the small things that need a person before a guest has to ask twice."
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/tables"
              className="flex h-9 items-center gap-1.5 rounded-[12px] border border-line bg-cream px-3 text-[11.5px] font-semibold text-forest transition-colors hover:border-forest/35"
            >
              <Grid2X2 className="h-3.5 w-3.5" />
              Floor plan
            </Link>
            <Link
              href="/order/table-12"
              className="flex h-9 items-center gap-1.5 rounded-[12px] bg-forest px-3 text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine"
            >
              Guest menu
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {[
          {
            label: "Revenue today",
            value: naira(revenue),
            note: "+12.4% on last Tuesday",
            icon: Banknote,
            positive: true,
          },
          {
            label: "Covers",
            value: String(todayStats.covers),
            note: "42 still expected tonight",
            icon: Users,
            positive: true,
          },
          {
            label: "Open tables",
            value: String(openTables),
            note: `${tables.length} tables in service`,
            icon: Grid2X2,
            positive: true,
          },
          {
            label: "Average ticket",
            value: naira(todayStats.averageTicket),
            note: "Service and VAT included",
            icon: ReceiptText,
            positive: true,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-[20px] border border-line bg-cream p-3.5 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">
                  {stat.label}
                </p>
                <Icon className="h-3.5 w-3.5 text-tomato/60" strokeWidth={1.8} />
              </div>
              <p className="mt-3 font-serif text-[clamp(1.65rem,2.5vw,2.5rem)] font-semibold leading-none tracking-[-0.05em] text-forest">
                {stat.value}
              </p>
              <p className="mt-2 text-[12px] leading-tight text-muted/75">{stat.note}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.45fr_0.55fr]">
        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div>
              <h2 className="font-serif text-[21px] font-semibold tracking-[-0.035em] text-forest">
                Live floor
              </h2>
              <p className="mt-1 text-[12px] text-muted">Every table, before the next walk-in.</p>
            </div>
            <Link
              href="/dashboard/tables"
              className="flex items-center gap-1 text-[12px] font-semibold text-forest transition-colors hover:text-tomato"
            >
              Full plan
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-6 gap-1.5 sm:grid-cols-9">
            {tables.map((table) => {
              const meta = statusMeta[table.status];
              return (
                <Link
                  key={table.id}
                  href="/dashboard/tables"
                  title={`Table ${table.number} / ${meta.label}`}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-[12px] border py-2.5 transition-colors hover:border-forest/40",
                    meta.card,
                  )}
                >
                  <span className="font-serif text-[17px] font-semibold leading-none text-forest">
                    {table.number}
                  </span>
                  <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full", meta.dot)} />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-3">
            {Object.entries(statusMeta).map(([status, meta]) => (
              <span
                key={status}
                className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted"
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
                {meta.label}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <BellRing className="h-3.5 w-3.5 text-tomato" />
              <h2 className="font-serif text-[21px] font-semibold tracking-[-0.035em] text-forest">
                Needs a person
              </h2>
            </div>
            <span className="rounded-full bg-tomato/10 px-2 py-1 font-mono text-[12px] text-tomato-deep">
              {pending.length}
            </span>
          </div>

          {pending.length ? (
            <ul className="mt-1 divide-y divide-line/80">
              {pending.map((request) => (
                <li key={request.id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-forest">
                      Table {request.table} / {requestLabels[request.type]}
                    </p>
                    <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted/70">
                      {minutesSince(request.createdAt)} min ago
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => resolveRequest(request.id)}
                    className="flex h-7 items-center gap-1 rounded-[10px] border border-line px-2 text-[11.5px] font-semibold text-forest transition-colors hover:border-moss hover:bg-moss/10"
                  >
                    <Check className="h-2.5 w-2.5" />
                    Done
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-moss/10 text-moss">
                <Check className="h-4 w-4" />
              </span>
              <p className="mt-2.5 text-[12px] font-semibold text-forest">All clear.</p>
              <p className="mt-1 max-w-[180px] text-[11.5px] leading-relaxed text-muted">
                No guest is waiting on the floor right now.
              </p>
            </div>
          )}

          <p className="mt-2 border-t border-line pt-3 font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.05em] text-muted/60">
            Requests arrive here from the guest menu.
          </p>
        </section>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-serif text-[22px] font-semibold tracking-[-0.035em] text-forest">
                The week so far.
              </h2>
              <p className="mt-1 text-[12px] text-muted">Revenue, settled at the table.</p>
            </div>
            <Link
              href="/dashboard/insights"
              className="flex items-center gap-1 text-[12px] font-semibold text-forest transition-colors hover:text-tomato"
            >
              Insights
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <RevenueChart />
        </section>

        <section className="relative overflow-hidden rounded-[20px] border border-line-dark bg-forest p-4 text-cream sm:p-5">
          <div className="dot-field absolute inset-0 opacity-25" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3 border-b border-cream/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-butter" />
                <h2 className="font-serif text-[21px] font-semibold tracking-[-0.035em]">
                  Tonight&apos;s briefing
                </h2>
              </div>
              <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-cream/30">
                AI
              </span>
            </div>
            <div className="mt-2 divide-y divide-cream/10">
              {aiBriefing.slice(0, 2).map((brief) => (
                <div key={brief.title} className="py-3">
                  <span
                    className={cn(
                      "font-mono text-[7.5px] uppercase tracking-[0.09em]",
                      brief.tone === "butter"
                        ? "text-butter"
                        : brief.tone === "tomato"
                          ? "text-tomato"
                          : "text-[#9dbb9f]",
                    )}
                  >
                    {brief.tag}
                  </span>
                  <p className="mt-1.5 font-serif text-[17px] font-semibold leading-tight">
                    {brief.title}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-cream/45">{brief.body}</p>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/insights"
              className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold text-butter"
            >
              Read the full briefing
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </section>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-[20px] border border-line bg-cream">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
            <div>
              <h2 className="font-serif text-[21px] font-semibold tracking-[-0.035em] text-forest">
                Live tickets
              </h2>
              <p className="mt-1 text-[12px] text-muted">{liveOrders.length} on the board now</p>
            </div>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-1 text-[12px] font-semibold text-forest transition-colors hover:text-tomato"
            >
              All orders
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-line/80">
            {liveOrders.length ? (
              liveOrders.slice(0, 5).map((order) => (
                <Link
                  key={order.id}
                  href="/dashboard/orders"
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sand/60 sm:px-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-sand font-mono text-[12px] font-medium text-forest">
                    T{order.table}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-forest">
                      {order.code} / {order.guest}
                    </p>
                    <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted/70">
                      {order.items.reduce((sum, line) => sum + line.qty, 0)} items /{" "}
                      {minutesSince(order.placedAt)} min / {order.channel}
                    </p>
                  </div>
                  <span className="price hidden text-[11.5px] text-forest sm:block">
                    {naira(order.total)}
                  </span>
                  <OrderChip status={order.status} />
                </Link>
              ))
            ) : (
              <div className="px-5 py-9 text-center text-[12px] text-muted">
                No tickets on the board. The pass is clear.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <h2 className="font-serif text-[21px] font-semibold tracking-[-0.035em] text-forest">
              Moving tonight
            </h2>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.07em] text-muted/60">
              Sold
            </span>
          </div>
          <ul className="mt-1 divide-y divide-line/80">
            {topDishes.slice(0, 4).map((dish) => (
              <li key={dish.name} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold text-forest">{dish.name}</p>
                  <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted/65">
                    {naira(dish.revenue)}
                  </p>
                </div>
                <span className="font-serif text-[18px] font-semibold text-forest">{dish.sold}</span>
                <span
                  className={cn(
                    "font-mono text-[12px]",
                    dish.trend >= 0 ? "text-moss" : "text-tomato",
                  )}
                >
                  {dish.trend >= 0 ? "+" : ""}
                  {dish.trend}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
