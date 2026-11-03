"use client";

import { useEffect, useMemo, useState } from "react";
import { ChefHat, Clock, Flame, Timer } from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { OrderChip } from "@/components/dashboard/status-chip";
import { findItem, type MenuCategory } from "@/features/menu/data";
import { advanceOrder, useOrders, type Order, type OrderStatus } from "@/lib/store";
import { cn, clockLabel, minutesSince } from "@/lib/utils";

type Station = "All" | "Grill" | "Rice" | "Fryer" | "Oven" | "Cold";

const stationFor: Record<MenuCategory, Exclude<Station, "All">> = {
  "Small plates": "Grill",
  "Rice & stew": "Rice",
  Grill: "Grill",
  Burgers: "Fryer",
  "Pasta & pizza": "Oven",
  Drinks: "Cold",
  Sweets: "Cold",
};

const columns: { status: OrderStatus; label: string; note: string; action: string | null }[] = [
  { status: "new", label: "New tickets", note: "Waiting to start", action: "Start cooking" },
  { status: "preparing", label: "On the fire", note: "Cooking now", action: "Ready to serve" },
  { status: "ready", label: "Ready", note: "Waiting for pickup", action: "Picked up" },
];

const nextStatus: Record<string, OrderStatus> = {
  new: "preparing",
  preparing: "ready",
  ready: "served",
};

export function KitchenBoard() {
  const [orders, ready] = useOrders();
  const [station, setStation] = useState<Station>("All");
  const [, setTick] = useState(0);
  const [now, setNow] = useState("");

  useEffect(() => {
    const update = () => {
      setTick((current) => current + 1);
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const live = orders.filter((order) => ["new", "preparing", "ready"].includes(order.status));
  const todaysServed = orders.filter((order) => ["served", "paid"].includes(order.status));

  const matchesStation = (order: Order) =>
    station === "All" ||
    order.items.some((line) => {
      const item = findItem(line.itemId);
      return item ? stationFor[item.category] === station : false;
    });

  const filtered = live.filter(matchesStation);
  const late = filtered.filter(
    (order) => order.status !== "ready" && minutesSince(order.placedAt) >= 20,
  ).length;

  const stationCounts = useMemo(() => {
    const counts: Record<Station, number> = { All: live.length, Grill: 0, Rice: 0, Fryer: 0, Oven: 0, Cold: 0 };
    live.forEach((order) => {
      const stations = new Set(
        order.items
          .map((line) => {
            const item = findItem(line.itemId);
            return item ? stationFor[item.category] : null;
          })
          .filter((value): value is Exclude<Station, "All"> => Boolean(value)),
      );
      stations.forEach((entry) => {
        counts[entry] += 1;
      });
    });
    return counts;
  }, [live]);

  const allDay = useMemo(() => {
    const totals = new Map<string, number>();
    live.forEach((order) => {
      order.items.forEach((line) => {
        totals.set(line.name, (totals.get(line.name) ?? 0) + line.qty);
      });
    });
    return Array.from(totals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [live]);

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Kitchen / Live pass"
        title="The pass, in real time."
        description="Every ticket, every station, one tap to move it forward. Late tickets turn red before a guest has to ask."
        action={
          <span className="flex h-9 items-center gap-2 rounded-[12px] border border-line bg-cream px-3 font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            Service open / {now || "--:--"}
          </span>
        }
      />

      <div className="relative overflow-hidden rounded-[24px] border border-line-dark bg-forest text-cream">
        <div className="poster-grid absolute inset-0 opacity-40" />
        <div className="relative">
          <div className="flex flex-col gap-4 border-b border-line-dark px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-tomato text-cream">
                <ChefHat className="h-4 w-4" />
              </span>
              <div>
                <p className="font-serif text-[21px] font-semibold leading-none">Kitchen display</p>
                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-cream/35">
                  Ember &amp; Rice / 2 stations live
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(["All", "Grill", "Rice", "Fryer", "Oven", "Cold"] as Station[]).map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setStation(entry)}
                  aria-pressed={station === entry}
                  className={cn(
                    "flex h-8 items-center gap-1.5 rounded-[10px] border px-2.5 font-mono text-[12px] uppercase tracking-[0.06em] transition-colors",
                    station === entry
                      ? "border-butter bg-butter text-forest"
                      : "border-cream/15 text-cream/45 hover:border-cream/35 hover:text-cream",
                  )}
                >
                  {entry}
                  <span className={cn("text-[7px]", station === entry ? "text-forest/60" : "text-cream/25")}>
                    {stationCounts[entry]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 border-b border-line-dark px-4 py-3 sm:grid-cols-4 sm:px-5">
            {[
              { label: "On the board", value: filtered.length, icon: ChefHat },
              { label: "Late", value: late, icon: Flame, alert: late > 0 },
              {
                label: "Ready",
                value: filtered.filter((order) => order.status === "ready").length,
                icon: Clock,
              },
              { label: "Served tonight", value: todaysServed.length, icon: Timer },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <Icon
                    className={cn("h-3.5 w-3.5", stat.alert ? "text-tomato" : "text-cream/30")}
                  />
                  <div>
                    <p
                      className={cn(
                        "font-serif text-[22px] font-semibold leading-none",
                        stat.alert ? "text-tomato" : "text-cream",
                      )}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.07em] text-cream/30">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {allDay.length ? (
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-line-dark px-4 py-2.5 sm:px-5">
              <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.1em] text-cream/30">
                All day
              </span>
              {allDay.map(([name, qty]) => (
                <span
                  key={name}
                  className="shrink-0 rounded-full border border-cream/12 bg-cream/[0.04] px-2.5 py-1 text-[12px] text-cream/60"
                >
                  {name} <span className="font-mono text-butter">x{qty}</span>
                </span>
              ))}
            </div>
          ) : null}

          <div className="grid gap-2 p-3 sm:p-4 lg:grid-cols-3">
            {columns.map((column) => {
              const tickets = filtered
                .filter((order) => order.status === column.status)
                .sort((a, b) => new Date(a.placedAt).getTime() - new Date(b.placedAt).getTime());

              return (
                <section key={column.status} className="rounded-[14px] border border-cream/10 bg-cream/[0.035]">
                  <div className="flex items-center justify-between gap-2 border-b border-cream/10 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] uppercase tracking-[0.09em] text-cream/70">
                        {column.label}
                      </span>
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-cream/10 px-1 font-mono text-[7.5px] text-cream/60">
                        {tickets.length}
                      </span>
                    </div>
                    <span className="font-mono text-[7px] uppercase tracking-[0.06em] text-cream/25">
                      {column.note}
                    </span>
                  </div>

                  <div className="min-h-[260px] space-y-2 p-2">
                    {ready && tickets.length ? (
                      tickets.map((order) => {
                        const minutes = minutesSince(order.placedAt);
                        const isLate = order.status !== "ready" && minutes >= 20;
                        return (
                          <article
                            key={order.id}
                            className={cn(
                              "rounded-[12px] border bg-cream p-3 text-forest",
                              isLate ? "border-tomato" : "border-line",
                            )}
                          >
                            <div className="flex items-start justify-between gap-2 border-b border-line pb-2">
                              <div>
                                <p className="font-mono text-[12px] font-medium">{order.code}</p>
                                <p className="mt-0.5 font-serif text-[19px] font-semibold leading-none">
                                  Table {order.table}
                                </p>
                              </div>
                              <div className="text-right">
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.05em]",
                                    isLate
                                      ? "bg-tomato text-cream"
                                      : minutes >= 12
                                        ? "bg-butter text-ink"
                                        : "bg-sand text-muted",
                                  )}
                                >
                                  <Clock className="h-2.5 w-2.5" />
                                  {minutes} min
                                </span>
                                <p className="mt-1 font-mono text-[6.5px] uppercase tracking-[0.05em] text-muted">
                                  {order.channel} / {clockLabel(order.placedAt)}
                                </p>
                              </div>
                            </div>

                            <ul className="mt-2 space-y-1.5">
                              {order.items.map((line) => (
                                <li key={line.id}>
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-[11.5px] font-semibold leading-tight">
                                      <span className="font-mono text-[12px] text-tomato">{line.qty}x</span>{" "}
                                      {line.name}
                                    </p>
                                  </div>
                                  {line.options.length ? (
                                    <p className="mt-0.5 text-[12px] leading-tight text-muted">
                                      {line.options.join(" / ")}
                                    </p>
                                  ) : null}
                                  {line.note ? (
                                    <p className="mt-0.5 rounded-[3px] bg-tomato/10 px-1.5 py-0.5 text-[12px] italic leading-tight text-tomato-deep">
                                      {line.note}
                                    </p>
                                  ) : null}
                                </li>
                              ))}
                            </ul>

                            {order.note ? (
                              <p className="mt-2 border-t border-dashed border-line pt-1.5 text-[11.5px] italic leading-snug text-tomato-deep">
                                Table note: {order.note}
                              </p>
                            ) : null}

                            {column.action && nextStatus[order.status] ? (
                              <button
                                type="button"
                                onClick={() => advanceOrder(order.id, nextStatus[order.status])}
                                className={cn(
                                  "mt-2.5 h-7 w-full rounded-[8px] font-mono text-[12px] uppercase tracking-[0.06em] transition-colors",
                                  isLate
                                    ? "bg-tomato text-cream hover:bg-tomato-deep"
                                    : "bg-forest text-cream hover:bg-pine",
                                )}
                              >
                                {column.action}
                              </button>
                            ) : null}
                          </article>
                        );
                      })
                    ) : (
                      <div className="flex min-h-[220px] flex-col items-center justify-center px-4 text-center">
                        <ChefHat className="h-4 w-4 text-cream/20" />
                        <p className="mt-2 text-[11.5px] text-cream/30">
                          {ready ? "No tickets here." : "Reading the pass."}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[9px] border border-line bg-cream p-4">
          <p className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">Station note</p>
          <p className="mt-2 font-serif text-[19px] font-semibold text-forest">
            Grill is the long pole tonight.
          </p>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
            Two tickets are over twenty minutes. Move one fryer hand to plating until the
            20:30 rush clears. Tickets update here as the pass moves them.
          </p>
        </div>
        <div className="rounded-[9px] border border-line bg-cream p-4">
          <p className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">How this works</p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
            New orders from the QR menu land in New. Starting a ticket moves it to On the fire,
            and marking it ready sends the guest status to &ldquo;Ready&rdquo; on their phone.
          </p>
          <div className="mt-3 flex gap-1.5">
            {["New", "Cooking", "Ready", "Served"].map((step, index) => (
              <span
                key={step}
                className={cn(
                  "rounded-full px-2 py-1 font-mono text-[7px] uppercase tracking-[0.05em]",
                  index === 0 ? "bg-tomato text-cream" : "bg-sand text-muted",
                )}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
