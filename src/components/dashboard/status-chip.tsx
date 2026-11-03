import { cn } from "@/lib/utils";

const orderStyles: Record<string, string> = {
  new: "border-tomato/25 bg-tomato/10 text-tomato-deep",
  preparing: "border-butter/70 bg-butter/20 text-ink",
  ready: "border-moss/30 bg-moss/10 text-moss",
  served: "border-line bg-sand-deep text-muted",
  paid: "border-forest/20 bg-forest/10 text-forest",
};

const orderLabels: Record<string, string> = {
  new: "New",
  preparing: "Cooking",
  ready: "Ready",
  served: "Served",
  paid: "Paid",
};

const tableStyles: Record<string, string> = {
  open: "border-line bg-cream text-muted",
  seated: "border-butter/70 bg-butter/25 text-ink",
  ordered: "border-tomato/25 bg-tomato/10 text-tomato-deep",
  ready: "border-moss/30 bg-moss/10 text-moss",
  bill: "border-tomato/40 bg-tomato/15 text-tomato-deep",
  cleaning: "border-line bg-sand-deep text-muted",
};

const tableLabels: Record<string, string> = {
  open: "Open",
  seated: "Seated",
  ordered: "Order in",
  ready: "Food ready",
  bill: "Bill asked",
  cleaning: "Cleaning",
};

export function OrderChip({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.07em]",
        orderStyles[status] ?? orderStyles.served,
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {orderLabels[status] ?? status}
    </span>
  );
}

export function TableChip({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.07em]",
        tableStyles[status] ?? tableStyles.open,
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {tableLabels[status] ?? status}
    </span>
  );
}
