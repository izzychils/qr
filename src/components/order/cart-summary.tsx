"use client";

import { Minus, Plus, Receipt, Trash2 } from "lucide-react";
import type { CartLine } from "@/lib/store";
import { cartTotals } from "@/lib/store";
import { cn, naira } from "@/lib/utils";

export function CartSummary({
  table,
  lines,
  onQty,
  onRemove,
  onCheckout,
  onAddMore,
  compact = false,
}: {
  table: number;
  lines: CartLine[];
  onQty: (lineId: string, qty: number) => void;
  onRemove: (lineId: string) => void;
  onCheckout: () => void;
  onAddMore?: () => void;
  compact?: boolean;
}) {
  const totals = cartTotals(lines);
  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  return (
    <div className={cn("flex flex-col", compact ? "" : "rounded-[24px] border border-line bg-cream")}>
      {!compact ? (
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Receipt className="h-3.5 w-3.5 text-tomato" />
            <span className="label text-forest">Your table</span>
          </div>
          <span className="rounded-full border border-line px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
            Table {table}
          </span>
        </div>
      ) : null}

      <div className={cn("px-4", compact ? "pt-1" : "pt-4")}>
        {lines.length === 0 ? (
          <div className="pb-5 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted/60">
              <Receipt className="h-4.5 w-4.5" />
            </span>
            <p className="mt-3 font-serif text-[20px] font-semibold tracking-[-0.03em] text-forest">
              The table is empty.
            </p>
            <p className="mx-auto mt-1.5 max-w-[230px] text-[12px] leading-relaxed text-muted">
              Add a plate to start the bill. Everyone at the table can add to it.
            </p>
            {onAddMore ? (
              <button
                type="button"
                onClick={onAddMore}
                className="mt-4 h-9 rounded-[12px] border border-forest/20 px-4 text-[12px] font-semibold text-forest transition-colors hover:border-forest"
              >
                Browse the menu
              </button>
            ) : null}
          </div>
        ) : (
          <ul className="space-y-3.5 pb-4">
            {lines.map((line) => (
              <li key={line.lineId} className="border-b border-line/80 pb-3.5 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif text-[15.5px] font-semibold leading-tight tracking-[-0.02em] text-forest">
                      {line.name}
                    </p>
                    {line.options.length ? (
                      <p className="mt-1 text-[9.5px] leading-relaxed text-muted">
                        {line.options.join(" / ")}
                      </p>
                    ) : null}
                    {line.note ? (
                      <p className="mt-1 text-[9.5px] italic leading-relaxed text-tomato-deep">
                        &ldquo;{line.note}&rdquo;
                      </p>
                    ) : null}
                  </div>
                  <span className="price shrink-0 text-[12px] text-forest">
                    {naira(line.unitPrice * line.qty)}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex h-7 items-center rounded-[12px] border border-line bg-white">
                    <button
                      type="button"
                      onClick={() => onQty(line.lineId, line.qty - 1)}
                      aria-label={`Decrease ${line.name}`}
                      className="flex h-full w-7 items-center justify-center text-forest/70"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center font-mono text-[11px]">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => onQty(line.lineId, line.qty + 1)}
                      aria-label={`Increase ${line.name}`}
                      className="flex h-full w-7 items-center justify-center text-forest/70"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(line.lineId)}
                    aria-label={`Remove ${line.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-[12px] text-muted/50 transition-colors hover:bg-sand-deep hover:text-tomato"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {lines.length ? (
        <div className="mt-auto px-4 pb-4">
          <div className="space-y-1.5 border-t border-line pt-3.5 text-[11.5px] text-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="price text-forest">{naira(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service 7.5%</span>
              <span className="price text-forest">{naira(totals.service)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT 7.5%</span>
              <span className="price text-forest">{naira(totals.vat)}</span>
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between border-t border-forest/20 pt-3">
            <span className="label text-muted">Total</span>
            <span className="price text-[17px] text-forest">{naira(totals.total)}</span>
          </div>
          <button
            type="button"
            onClick={onCheckout}
            className="mt-4 flex h-11 w-full items-center justify-between rounded-[14px] bg-tomato px-4 text-[13px] font-semibold text-cream transition-colors hover:bg-tomato-deep"
          >
            <span>Review and send</span>
            <span className="price text-[13px]">{count} {count === 1 ? "item" : "items"}</span>
          </button>
          <p className="mt-2.5 text-center font-mono text-[8px] uppercase leading-relaxed tracking-[0.06em] text-muted/70">
            Pay after the meal. No account needed.
          </p>
        </div>
      ) : null}
    </div>
  );
}
