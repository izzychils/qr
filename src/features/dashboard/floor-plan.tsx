"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Armchair,
  Clock,
  ReceiptText,
  UserRound,
  Users,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { TableChip } from "@/components/dashboard/status-chip";
import { Modal } from "@/components/ui/modal";
import {
  statusMeta,
  waiters,
  zones,
  type TableRecord,
  type TableStatus,
} from "@/features/dashboard/tables-data";
import { useOrders, useTables, setTableStatus, assignWaiter, type Order } from "@/lib/store";
import { cn, minutesSince, naira } from "@/lib/utils";

const statuses: TableStatus[] = ["open", "seated", "ordered", "ready", "bill", "cleaning"];

export function FloorPlan() {
  const [tables, ready] = useTables();
  const [orders] = useOrders();
  const [zone, setZone] = useState<"All rooms" | (typeof zones)[number]>("All rooms");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const selected = tables.find((table) => table.id === selectedId) ?? null;

  const counts = useMemo(() => {
    return {
      open: tables.filter((table) => table.status === "open").length,
      guests: tables.reduce((sum, table) => sum + table.guests, 0),
      tickets: tables.filter((table) => table.status === "ordered").length,
      bill: tables.filter((table) => table.status === "bill").length,
    };
  }, [tables]);

  const visibleZones = zones.filter((entry) => zone === "All rooms" || entry === zone);

  if (!ready || !tables.length) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tomato" />
          Opening the floor
        </div>
      </div>
    );
  }

  const openTable = (table: TableRecord) => {
    setSelectedId(table.id);
    if (isMobile) setDetailOpen(true);
  };

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Floor plan / 18 tables"
        title="Where the night is sitting."
        description="Every table, its bill, its waiter and the next thing it needs. Tap a table to change its state."
        action={
          <Link
            href="/dashboard/orders"
            className="flex h-9 items-center gap-1.5 rounded-[12px] border border-line bg-cream px-3 text-[11.5px] font-semibold text-forest transition-colors hover:border-forest/35"
          >
            <ReceiptText className="h-3.5 w-3.5" />
            Open tickets
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {[
          { label: "Open tables", value: counts.open, icon: Armchair },
          { label: "Guests seated", value: counts.guests, icon: Users },
          { label: "Ordering now", value: counts.tickets, icon: ReceiptText },
          { label: "Waiting for bill", value: counts.bill, icon: Clock },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-[9px] border border-line bg-cream px-3.5 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">
                  {stat.label}
                </span>
                <Icon className="h-3.5 w-3.5 text-tomato/55" />
              </div>
              <p className="mt-2 font-serif text-[30px] font-semibold leading-none tracking-[-0.04em] text-forest">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {(["All rooms", ...zones] as const).map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setZone(entry)}
              aria-pressed={zone === entry}
              className={cn(
                "h-8 rounded-[12px] border px-3 font-mono text-[11.5px] uppercase tracking-[0.06em] transition-colors",
                zone === entry
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-cream text-muted hover:border-forest/35 hover:text-forest",
              )}
            >
              {entry}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {statuses.map((status) => (
            <span
              key={status}
              className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.05em] text-muted/70"
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", statusMeta[status].dot)} />
              {statusMeta[status].label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-4">
          {visibleZones.map((entry) => {
            const zoneTables = tables.filter((table) => table.zone === entry);
            return (
              <section key={entry} className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
                <div className="flex items-end justify-between gap-3 border-b border-line pb-3">
                  <div>
                    <h2 className="font-serif text-[22px] font-semibold tracking-[-0.04em] text-forest">
                      {entry}
                    </h2>
                    <p className="mt-1 text-[12px] text-muted">
                      {zoneTables.reduce((sum, table) => sum + table.guests, 0)} guests /{" "}
                      {zoneTables.length} tables
                    </p>
                  </div>
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-muted/60">
                    {zoneTables.filter((table) => table.status === "open").length} open
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                  {zoneTables.map((table) => {
                    const meta = statusMeta[table.status];
                    const active = selectedId === table.id;
                    return (
                      <button
                        key={table.id}
                        type="button"
                        onClick={() => openTable(table)}
                        className={cn(
                          "rounded-[14px] border p-3 text-left transition-colors hover:border-forest/40",
                          meta.card,
                          active && "ring-1 ring-forest/50",
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-serif text-[27px] font-semibold leading-none tracking-[-0.04em] text-forest">
                            {table.number}
                          </span>
                          <TableChip status={table.status} />
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.05em] text-muted/75">
                          <Users className="h-2.5 w-2.5" />
                          {table.seats} seats
                          <span className="h-2.5 w-px bg-line" />
                          {table.guests} in
                        </div>
                        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line/80 pt-2">
                          <span className="truncate font-mono text-[12px] uppercase tracking-[0.05em] text-muted/60">
                            {table.waiter}
                          </span>
                          <span className="price text-[12px] text-forest">
                            {table.total ? naira(table.total) : "No bill"}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.05em] text-muted/50">
                            <Clock className="h-2.5 w-2.5" />
                            {table.seatedAt ? `${minutesSince(table.seatedAt)} min` : "Available"}
                          </span>
                          <ArrowUpRight className="h-2.5 w-2.5 text-forest/25" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-[84px]">
            {selected ? (
              <TableDetail table={selected} orders={orders} />
            ) : (
              <div className="rounded-[20px] border border-line bg-cream p-5 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sand text-forest/50">
                  <Armchair className="h-5 w-5" />
                </span>
                <h2 className="mt-3 font-serif text-[22px] font-semibold tracking-[-0.035em] text-forest">
                  Pick a table.
                </h2>
                <p className="mx-auto mt-1.5 max-w-[220px] text-[11.5px] leading-relaxed text-muted">
                  Select any table to change its state, assign a waiter or read the open ticket.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <Modal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        label={selected ? `Table ${selected.number}` : "Table"}
        size="sm"
      >
        <div className="p-4">
          {selected ? (
            <TableDetail table={selected} orders={orders} />
          ) : (
            <p className="p-4 text-[13px] text-muted">No table selected.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}

function TableDetail({ table, orders }: { table: TableRecord; orders: Order[] }) {
  const order = orders
    .filter((entry) => entry.table === table.number && entry.status !== "paid")
    .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime())[0];

  return (
    <div className="rounded-[20px] border border-line bg-cream p-4">
      <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
        <div>
          <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-muted">
            {table.zone} / {table.seats} seats
          </p>
          <h2 className="mt-1 font-serif text-[30px] font-semibold leading-none tracking-[-0.04em] text-forest">
            Table {table.number}
          </h2>
        </div>
        <TableChip status={table.status} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
        <div className="rounded-[12px] bg-sand px-2.5 py-2">
          <p className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted">Guests</p>
          <p className="mt-1 font-serif text-[19px] font-semibold leading-none text-forest">
            {table.guests || 0}
          </p>
        </div>
        <div className="rounded-[12px] bg-sand px-2.5 py-2">
          <p className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted">At table</p>
          <p className="mt-1 font-serif text-[19px] font-semibold leading-none text-forest">
            {table.seatedAt ? `${minutesSince(table.seatedAt)}m` : "Open"}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <label className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-muted">
          <UserRound className="h-3 w-3" />
          Waiter
        </label>
        <select
          value={table.waiter}
          onChange={(event) => assignWaiter(table.id, event.target.value)}
          aria-label={`Assign a waiter to table ${table.number}`}
          className="mt-1.5 h-9 w-full rounded-[12px] border border-line bg-white px-2.5 text-[12px] text-forest focus:border-forest focus:outline-none"
        >
          {waiters.map((waiter) => (
            <option key={waiter} value={waiter}>
              {waiter}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <p className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-muted">Set status</p>
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setTableStatus(table.id, status)}
              className={cn(
                "h-7 rounded-[10px] border px-1 text-[11.5px] font-semibold transition-colors",
                table.status === status
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-white text-muted hover:border-forest/35 hover:text-forest",
              )}
            >
              {statusMeta[status].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 border-t border-line pt-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-muted">
            Open ticket
          </p>
          <span className="price text-[12px] text-forest">
            {order ? naira(order.total) : naira(table.total)}
          </span>
        </div>
        {order ? (
          <div className="mt-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12px] font-semibold text-forest">{order.code}</p>
              <span className="font-mono text-[7px] uppercase tracking-[0.06em] text-muted">
                {order.items.reduce((sum, line) => sum + line.qty, 0)} items
              </span>
            </div>
            <ul className="mt-1.5 space-y-1">
              {order.items.slice(0, 3).map((line) => (
                <li key={line.id} className="flex justify-between gap-2 text-[11.5px] text-muted">
                  <span className="truncate">
                    {line.qty} x {line.name}
                  </span>
                  <span className="price shrink-0 text-forest/70">
                    {naira(line.qty * line.unitPrice)}
                  </span>
                </li>
              ))}
            </ul>
            {order.items.length > 3 ? (
              <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.05em] text-muted/60">
                +{order.items.length - 3} more
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-2 text-[12px] leading-relaxed text-muted">
            No ticket yet. The guest can order from the QR menu, or a waiter can add one.
          </p>
        )}
      </div>

      <Link
        href={`/order/table-${table.number}`}
        className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-[12px] bg-forest text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine"
      >
        Open guest menu
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
