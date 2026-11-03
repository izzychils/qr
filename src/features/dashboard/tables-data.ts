export type TableStatus = "open" | "seated" | "ordered" | "ready" | "bill" | "cleaning";

export type TableRecord = {
  id: string;
  number: number;
  zone: "Main room" | "Terrace" | "Bar";
  seats: number;
  status: TableStatus;
  waiter: string;
  guests: number;
  seatedAt: string | null;
  total: number;
};

export const waiters = ["Tola A.", "Ife B.", "Nneka O.", "Seyi K."];

export const zones = ["Main room", "Terrace", "Bar"] as const;

export const statusMeta: Record<
  TableStatus,
  { label: string; dot: string; chip: string; card: string }
> = {
  open: {
    label: "Open",
    dot: "bg-moss",
    chip: "border-line bg-cream text-muted",
    card: "border-line bg-cream",
  },
  seated: {
    label: "Seated",
    dot: "bg-butter",
    chip: "border-butter/70 bg-butter/20 text-ink",
    card: "border-butter/60 bg-cream",
  },
  ordered: {
    label: "Order in",
    dot: "bg-tomato",
    chip: "border-tomato/25 bg-tomato/10 text-tomato-deep",
    card: "border-tomato/35 bg-cream",
  },
  ready: {
    label: "Food ready",
    dot: "bg-pine",
    chip: "border-line bg-forest text-cream",
    card: "border-forest/30 bg-cream",
  },
  bill: {
    label: "Bill asked",
    dot: "bg-tomato-deep",
    chip: "border-tomato/35 bg-tomato/15 text-tomato-deep",
    card: "border-tomato/50 bg-cream",
  },
  cleaning: {
    label: "Cleaning",
    dot: "bg-line",
    chip: "border-line bg-sand-deep text-muted",
    card: "border-line bg-sand-deep/60",
  },
};

const base: Array<{
  number: number;
  zone: "Main room" | "Terrace" | "Bar";
  seats: number;
  status: TableStatus;
  waiter: string;
  guests: number;
  minutesAgo: number;
  total: number;
}> = [
  { number: 1, zone: "Main room", seats: 2, status: "open", waiter: "Tola A.", guests: 0, minutesAgo: 0, total: 0 },
  { number: 2, zone: "Main room", seats: 2, status: "seated", waiter: "Tola A.", guests: 2, minutesAgo: 12, total: 0 },
  { number: 3, zone: "Main room", seats: 4, status: "ordered", waiter: "Ife B.", guests: 4, minutesAgo: 38, total: 48200 },
  { number: 4, zone: "Main room", seats: 4, status: "bill", waiter: "Ife B.", guests: 3, minutesAgo: 71, total: 61500 },
  { number: 5, zone: "Main room", seats: 6, status: "cleaning", waiter: "Nneka O.", guests: 0, minutesAgo: 0, total: 0 },
  { number: 6, zone: "Main room", seats: 4, status: "open", waiter: "Nneka O.", guests: 0, minutesAgo: 0, total: 0 },
  { number: 7, zone: "Main room", seats: 2, status: "ordered", waiter: "Seyi K.", guests: 2, minutesAgo: 26, total: 29700 },
  { number: 8, zone: "Main room", seats: 6, status: "seated", waiter: "Seyi K.", guests: 5, minutesAgo: 6, total: 0 },
  { number: 9, zone: "Terrace", seats: 4, status: "ready", waiter: "Tola A.", guests: 4, minutesAgo: 47, total: 54800 },
  { number: 10, zone: "Terrace", seats: 2, status: "open", waiter: "Tola A.", guests: 0, minutesAgo: 0, total: 0 },
  { number: 11, zone: "Terrace", seats: 4, status: "cleaning", waiter: "Ife B.", guests: 0, minutesAgo: 0, total: 0 },
  { number: 12, zone: "Terrace", seats: 4, status: "ordered", waiter: "Ife B.", guests: 4, minutesAgo: 19, total: 43900 },
  { number: 13, zone: "Terrace", seats: 2, status: "open", waiter: "Nneka O.", guests: 0, minutesAgo: 0, total: 0 },
  { number: 14, zone: "Terrace", seats: 6, status: "seated", waiter: "Nneka O.", guests: 6, minutesAgo: 9, total: 0 },
  { number: 15, zone: "Bar", seats: 2, status: "ready", waiter: "Seyi K.", guests: 2, minutesAgo: 33, total: 21300 },
  { number: 16, zone: "Bar", seats: 2, status: "open", waiter: "Seyi K.", guests: 0, minutesAgo: 0, total: 0 },
  { number: 17, zone: "Bar", seats: 2, status: "seated", waiter: "Tola A.", guests: 2, minutesAgo: 4, total: 0 },
  { number: 18, zone: "Bar", seats: 4, status: "open", waiter: "Tola A.", guests: 0, minutesAgo: 0, total: 0 },
];

export function seedTables(now = Date.now()): TableRecord[] {
  return base.map((table) => ({
    id: `t${table.number}`,
    number: table.number,
    zone: table.zone,
    seats: table.seats,
    status: table.status,
    waiter: table.waiter,
    guests: table.guests,
    seatedAt: table.minutesAgo ? new Date(now - table.minutesAgo * 60000).toISOString() : null,
    total: table.total,
  }));
}
