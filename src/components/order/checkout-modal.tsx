"use client";

import { useEffect, useState } from "react";
import { ChefHat, LoaderCircle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { cartTotals, type CartLine } from "@/lib/store";
import { naira } from "@/lib/utils";

export function CheckoutModal({
  open,
  onClose,
  table,
  lines,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  table: number;
  lines: CartLine[];
  onConfirm: (guest: string, note: string) => void;
}) {
  const [guest, setGuest] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const totals = cartTotals(lines);

  useEffect(() => {
    if (open) {
      setGuest("");
      setNote("");
      setSending(false);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} label="Review the table order" size="md">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-[30px] font-semibold leading-none tracking-[-0.04em] text-forest">
              Send it to the pass.
            </h2>
            <p className="mt-2 max-w-[360px] text-[13px] leading-relaxed text-muted">
              The kitchen gets the order the moment you confirm. You can keep adding to the
              table, and settle the bill when you are ready.
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
            <ChefHat className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-5 rounded-[20px] border border-line bg-white p-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="label text-muted">Table {table}</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
              {lines.reduce((sum, line) => sum + line.qty, 0)} items
            </span>
          </div>
          <ul className="divide-y divide-line/80">
            {lines.map((line) => (
              <li key={line.lineId} className="flex items-start justify-between gap-4 py-2.5">
                <div>
                  <p className="text-[13px] font-semibold text-forest">
                    {line.qty} x {line.name}
                  </p>
                  {line.options.length ? (
                    <p className="mt-0.5 text-[9.5px] leading-relaxed text-muted">
                      {line.options.join(" / ")}
                    </p>
                  ) : null}
                </div>
                <span className="price shrink-0 text-[12px] text-forest">
                  {naira(line.unitPrice * line.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-end justify-between border-t border-line pt-3">
            <span className="label text-muted">Total with charges</span>
            <span className="price text-[15px] text-forest">{naira(totals.total)}</span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-semibold text-forest">A name for the table</span>
            <input
              value={guest}
              onChange={(event) => setGuest(event.target.value)}
              placeholder="Optional, first name"
              className="mt-2 h-11 w-full rounded-[14px] border border-line bg-white px-3 text-[13px] text-forest placeholder:text-muted/55 focus:border-forest focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-semibold text-forest">Note for the kitchen</span>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Allergies, timing, a birthday"
              className="mt-2 h-11 w-full rounded-[14px] border border-line bg-white px-3 text-[13px] text-forest placeholder:text-muted/55 focus:border-forest focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-[14px] border border-line px-4 text-[12px] font-semibold text-forest transition-colors hover:border-forest/40"
          >
            Keep browsing
          </button>
          <button
            type="button"
            disabled={!lines.length || sending}
            onClick={() => {
              setSending(true);
              onConfirm(guest.trim() || "Walk-in", note);
            }}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[14px] bg-tomato px-5 text-[13px] font-semibold text-cream transition-colors hover:bg-tomato-deep disabled:opacity-50"
          >
            {sending ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : null}
            {sending ? "Sending to the kitchen" : "Confirm and send order"}
          </button>
        </div>
        <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.07em] text-muted/70">
          Demo order. It appears on the dashboard kitchen board on this device.
        </p>
      </div>
    </Modal>
  );
}
