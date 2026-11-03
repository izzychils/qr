"use client";

import { useEffect, useState } from "react";
import { findItem, menu, restaurant, type MenuItem } from "@/features/menu/data";
import { seedTables, type TableRecord, type TableStatus } from "@/features/dashboard/tables-data";

export type OrderStatus = "new" | "preparing" | "ready" | "served" | "paid";

export type OrderLine = {
  id: string;
  itemId: string;
  name: string;
  qty: number;
  unitPrice: number;
  options: string[];
  note?: string;
};

export type Order = {
  id: string;
  code: string;
  table: number;
  tableId: string;
  guest: string;
  channel: "QR" | "Waiter";
  status: OrderStatus;
  items: OrderLine[];
  subtotal: number;
  service: number;
  vat: number;
  total: number;
  placedAt: string;
  note?: string;
  paidWith?: string;
};

export type ServiceRequest = {
  id: string;
  table: number;
  type: "waiter" | "bill" | "water";
  createdAt: string;
  resolved: boolean;
};

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  qty: number;
  unitPrice: number;
  options: string[];
  note?: string;
};

export type StaffUser = {
  name: string;
  email: string;
  role: "Manager" | "Kitchen" | "Waiter";
  restaurant: string;
};

const K = {
  seedDay: "qr.seed.day",
  orders: "qr.orders",
  tables: "qr.tables",
  requests: "qr.requests",
  soldOut: "qr.menu.soldOut",
  session: "qr.session",
  cart: "qr.cart.",
  lastOrder: "qr.last-order.",
  prefs: "qr.prefs",
};

const EVENT = "qr:store-change";

const demoUser: StaffUser = {
  name: "Amaka Okafor",
  email: "amaka@emberandrice.ng",
  role: "Manager",
  restaurant: restaurant.name,
};

function dayKey() {
  return new Date().toISOString().slice(0, 10);
}

function canStore() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!canStore()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!canStore()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // A blocked storage API should not break the demo.
  }
}

function emit() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

function orderId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return `order-${crypto.randomUUID()}`;
  return `order-${Date.now()}`;
}

function buildOrder(
  code: number,
  table: number,
  guest: string,
  status: OrderStatus,
  minutesAgo: number,
  itemSpecs: Array<[string, number]>,
  channel: Order["channel"] = "QR",
  now = Date.now(),
): Order {
  const items: OrderLine[] = itemSpecs.map(([itemId, qty], index) => {
    const item = findItem(itemId) as MenuItem;
    return {
      id: `line-${code}-${index}`,
      itemId,
      name: item.name,
      qty,
      unitPrice: item.price,
      options: [],
    };
  });
  const subtotal = items.reduce((sum, line) => sum + line.qty * line.unitPrice, 0);
  const service = Math.round(subtotal * restaurant.serviceCharge);
  const vat = Math.round(subtotal * restaurant.vat);
  return {
    id: `order-${code}`,
    code: `#${code}`,
    table,
    tableId: `t${table}`,
    guest,
    channel,
    status,
    items,
    subtotal,
    service,
    vat,
    total: subtotal + service + vat,
    placedAt: new Date(now - minutesAgo * 60000).toISOString(),
  };
}

function seedOrders(now: number): Order[] {
  return [
    buildOrder(1042, 3, "Walk-in", "new", 2, [["jollof-platter", 2], ["zobo", 2]], "QR", now),
    buildOrder(1041, 7, "Ade", "preparing", 8, [["double-smash", 2], ["chapman", 1]], "Waiter", now),
    buildOrder(
      1040,
      12,
      "Table 12",
      "preparing",
      13,
      [["tandoori-pizza", 1], ["creamy-pasta", 1], ["zobo", 2]],
      "QR",
      now,
    ),
    buildOrder(1039, 15, "Walk-in", "ready", 19, [["house-burger", 1], ["espresso-tonic", 1]], "QR", now),
    buildOrder(
      1038,
      9,
      "Chioma",
      "served",
      34,
      [["glazed-chicken", 2], ["honey-cheesecake", 1], ["chapman", 2]],
      "Waiter",
      now,
    ),
    buildOrder(1037, 4, "Walk-in", "paid", 55, [["arroz-con-pollo", 2], ["beef-shawarma", 2]], "QR", now),
    buildOrder(1036, 1, "Tunde", "served", 78, [["efo-pounded-yam", 2], ["coconut-water", 2]], "Waiter", now),
  ];
}

function seedRequests(now: number): ServiceRequest[] {
  return [
    { id: "req-1", table: 4, type: "bill", createdAt: new Date(now - 4 * 60000).toISOString(), resolved: false },
    { id: "req-2", table: 9, type: "water", createdAt: new Date(now - 7 * 60000).toISOString(), resolved: false },
    { id: "req-3", table: 14, type: "waiter", createdAt: new Date(now - 11 * 60000).toISOString(), resolved: false },
  ];
}

export function ensureSeed() {
  if (!canStore()) return;
  try {
    if (window.localStorage.getItem(K.seedDay) === dayKey()) return;
    const now = Date.now();
    window.localStorage.setItem(K.orders, JSON.stringify(seedOrders(now)));
    window.localStorage.setItem(K.tables, JSON.stringify(seedTables(now)));
    window.localStorage.setItem(K.requests, JSON.stringify(seedRequests(now)));
    window.localStorage.setItem(K.seedDay, dayKey());
  } catch {
    // Seed failures fall back to the static demo content.
  }
}

export function subscribeStore(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key?.startsWith("qr.")) callback();
  };
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

function useStoreValue<T>(reader: () => T, fallback: T): [T, boolean] {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => {
      ensureSeed();
      setValue(reader());
      setReady(true);
    };
    load();
    return subscribeStore(load);
    // The reader is a stable module-level function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, ready];
}

export function useOrders() {
  return useStoreValue(getOrders, [] as Order[]);
}

export function useTables() {
  return useStoreValue(getTables, [] as TableRecord[]);
}

export function useServiceRequests() {
  return useStoreValue(getRequests, [] as ServiceRequest[]);
}

export function useSoldOut() {
  return useStoreValue(getSoldOut, [] as string[]);
}

export function useSession() {
  return useStoreValue(getSession, null as StaffUser | null);
}

export function getOrders(): Order[] {
  ensureSeed();
  return read<Order[]>(K.orders, []);
}

export function getOrder(id: string): Order | null {
  return getOrders().find((order) => order.id === id) ?? null;
}

export function getTables(): TableRecord[] {
  ensureSeed();
  return read<TableRecord[]>(K.tables, seedTables());
}

export function getRequests(): ServiceRequest[] {
  ensureSeed();
  return read<ServiceRequest[]>(K.requests, []);
}

export function getSoldOut(): string[] {
  return read<string[]>(K.soldOut, []);
}

export function toggleSoldOut(itemId: string) {
  const current = getSoldOut();
  const next = current.includes(itemId)
    ? current.filter((id) => id !== itemId)
    : [...current, itemId];
  write(K.soldOut, next);
}

export function getSession(): StaffUser | null {
  return read<StaffUser | null>(K.session, null);
}

export function signIn(email: string, password: string): { ok: boolean; error?: string } {
  if (!email.includes("@")) return { ok: false, error: "Use a valid email address." };
  if (password.length < 6) return { ok: false, error: "Password must be at least six characters." };
  const name = email === demoUser.email ? demoUser.name : email.split("@")[0].replace(/[._-]/g, " ");
  const user: StaffUser = {
    ...demoUser,
    email,
    name: name.replace(/\b\w/g, (letter) => letter.toUpperCase()),
  };
  write(K.session, user);
  return { ok: true };
}

export function signInDemo() {
  write(K.session, demoUser);
}

export function signOut() {
  if (!canStore()) return;
  try {
    window.localStorage.removeItem(K.session);
    emit();
  } catch {
    // Ignore a blocked storage API.
  }
}

export function getCart(table: number): CartLine[] {
  return read<CartLine[]>(`${K.cart}${table}`, []);
}

function setCart(table: number, lines: CartLine[]) {
  write(`${K.cart}${table}`, lines);
}

export function addToCart(
  table: number,
  item: MenuItem,
  options: string[] = [],
  note = "",
  qty = 1,
  unitPrice = item.price,
) {
  const lines = getCart(table);
  const signature = `${item.id}|${[...options].sort().join(",")}|${note.trim()}`;
  const existing = lines.find(
    (line) => `${line.itemId}|${[...line.options].sort().join(",")}|${(line.note ?? "").trim()}` === signature,
  );
  if (existing) {
    setCart(
      table,
      lines.map((line) =>
        line.lineId === existing.lineId ? { ...line, qty: Math.min(20, line.qty + qty) } : line,
      ),
    );
    return;
  }
  const line: CartLine = {
    lineId: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `line-${Date.now()}`,
    itemId: item.id,
    name: item.name,
    qty,
    unitPrice,
    options,
    note: note.trim() || undefined,
  };
  setCart(table, [...lines, line]);
}

export function updateCartQty(table: number, lineId: string, qty: number) {
  const lines = getCart(table);
  if (qty <= 0) {
    setCart(table, lines.filter((line) => line.lineId !== lineId));
    return;
  }
  setCart(
    table,
    lines.map((line) => (line.lineId === lineId ? { ...line, qty: Math.min(20, qty) } : line)),
  );
}

export function removeCartLine(table: number, lineId: string) {
  setCart(table, getCart(table).filter((line) => line.lineId !== lineId));
}

export function clearCart(table: number) {
  setCart(table, []);
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  const service = Math.round(subtotal * restaurant.serviceCharge);
  const vat = Math.round(subtotal * restaurant.vat);
  return { subtotal, service, vat, total: subtotal + service + vat };
}

export function placeOrder(input: {
  table: number;
  guest: string;
  items: CartLine[];
  note?: string;
  channel?: Order["channel"];
}): Order {
  const orders = getOrders();
  const highest = orders.reduce((max, order) => {
    const value = Number(order.code.replace("#", ""));
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 1042);
  const subtotal = input.items.reduce((sum, line) => sum + line.qty * line.unitPrice, 0);
  const service = Math.round(subtotal * restaurant.serviceCharge);
  const vat = Math.round(subtotal * restaurant.vat);
  const order: Order = {
    id: orderId(),
    code: `#${highest + 1}`,
    table: input.table,
    tableId: `t${input.table}`,
    guest: input.guest.trim() || "Walk-in",
    channel: input.channel ?? "QR",
    status: "new",
    items: input.items.map((line) => ({
      id: `line-${Date.now()}-${line.lineId}`,
      itemId: line.itemId,
      name: line.name,
      qty: line.qty,
      unitPrice: line.unitPrice,
      options: line.options,
      note: line.note,
    })),
    subtotal,
    service,
    vat,
    total: subtotal + service + vat,
    placedAt: new Date().toISOString(),
    note: input.note?.trim() || undefined,
  };

  write(K.orders, [order, ...orders]);
  write(`${K.lastOrder}${input.table}`, order.id);

  const tables = getTables();
  write(
    K.tables,
    tables.map((table) =>
      table.number === input.table
        ? {
            ...table,
            status: "ordered" as TableStatus,
            guests: Math.max(table.guests, 1),
            seatedAt: table.seatedAt ?? new Date().toISOString(),
            total: table.total + order.total,
          }
        : table,
    ),
  );

  clearCart(input.table);
  return order;
}

export function getLastOrderId(table: number): string | null {
  return read<string | null>(`${K.lastOrder}${table}`, null);
}

export function advanceOrder(id: string, status: OrderStatus) {
  const orders = getOrders();
  const target = orders.find((order) => order.id === id);
  write(
    K.orders,
    orders.map((order) => (order.id === id ? { ...order, status } : order)),
  );

  if (status === "paid" && target) {
    write(
      K.tables,
      getTables().map((table) =>
        table.number === target.table ? { ...table, status: "cleaning" as TableStatus } : table,
      ),
    );
  }
}

export function payOrder(id: string, method: string) {
  const orders = getOrders();
  const target = orders.find((order) => order.id === id);
  if (!target) return;
  write(
    K.orders,
    orders.map((order) => (order.id === id ? { ...order, status: "paid" as OrderStatus, paidWith: method } : order)),
  );
  write(
    K.tables,
    getTables().map((table) =>
      table.number === target.table ? { ...table, status: "cleaning" as TableStatus } : table,
    ),
  );
}

export function setTableStatus(tableId: string, status: TableStatus) {
  const tables = getTables();
  const reset = status === "open" || status === "cleaning";
  write(
    K.tables,
    tables.map((table) =>
      table.id === tableId
        ? {
            ...table,
            status,
            guests: reset ? 0 : table.guests,
            seatedAt: reset ? null : table.seatedAt ?? new Date().toISOString(),
            total: reset ? 0 : table.total,
          }
        : table,
    ),
  );
}

export function assignWaiter(tableId: string, waiter: string) {
  write(
    K.tables,
    getTables().map((table) => (table.id === tableId ? { ...table, waiter } : table)),
  );
}

export function addRequest(table: number, type: ServiceRequest["type"]) {
  const requests = getRequests();
  if (requests.some((request) => !request.resolved && request.table === table && request.type === type)) {
    return;
  }
  const request: ServiceRequest = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `req-${Date.now()}`,
    table,
    type,
    createdAt: new Date().toISOString(),
    resolved: false,
  };
  write(K.requests, [request, ...requests]);
}

export function resolveRequest(id: string) {
  write(
    K.requests,
    getRequests().map((request) => (request.id === id ? { ...request, resolved: true } : request)),
  );
}

export function useCart(table: number) {
  const [lines, ready] = useStoreValue(() => getCart(table), [] as CartLine[]);
  return {
    lines,
    ready,
    add: (item: MenuItem, options: string[], note: string, qty: number, unitPrice: number) =>
      addToCart(table, item, options, note, qty, unitPrice),
    setQty: (lineId: string, qty: number) => updateCartQty(table, lineId, qty),
    remove: (lineId: string) => removeCartLine(table, lineId),
    clear: () => clearCart(table),
    totals: cartTotals(lines),
  };
}

export function menuIsSoldOut(itemId: string) {
  return getSoldOut().includes(itemId);
}

export const soldOutCount = () => getSoldOut().length;
export const menuCount = () => menu.length;
