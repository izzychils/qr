"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Nfc,
  QrCode,
  ScanLine,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { QrMark } from "@/components/ui/qr-mark";
import { useTables } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TableCodes() {
  const [tables, ready] = useTables();
  const [toast, setToast] = useState<string | null>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  };

  const tableLink = (number: number) =>
    typeof window === "undefined" ? `/order/table-${number}` : `${window.location.origin}/order/table-${number}`;

  const copyLink = async (number: number) => {
    try {
      await navigator.clipboard.writeText(tableLink(number));
      notify(`Table ${number} link copied.`);
    } catch {
      notify("Copy is blocked in this browser.");
    }
  };

  const downloadSvg = (number: number) => {
    const source = document.querySelector(`#qr-t${number} svg`);
    if (!source) return;
    const clone = source.cloneNode(true) as SVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "600");
    clone.setAttribute("height", "600");
    clone.setAttribute("style", "color:#112f25;background:#fffaf0");
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ember-table-${number}-qr.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
    notify(`Table ${number} QR downloaded.`);
  };

  const downloadLinks = () => {
    const rows = [
      ["table", "zone", "seats", "link"],
      ...tables.map((table) => [
        String(table.number),
        table.zone,
        String(table.seats),
        tableLink(table.number),
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ember-and-rice-table-links.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    notify("All table links downloaded.");
  };

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Access / QR and NFC"
        title="One code per table, nothing to install."
        description="The QR opens the guest menu for that exact table. The NFC tag does the same with a tap. Both stay useful even when the menu changes."
        action={
          <button
            type="button"
            onClick={downloadLinks}
            className="flex h-9 items-center gap-1.5 rounded-[12px] bg-forest px-3 text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine"
          >
            <Download className="h-3.5 w-3.5" />
            All table links
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {[
          { label: "Tables with a code", value: String(tables.length || 18), note: "Every seat covered" },
          { label: "Scans tonight", value: "214", note: "+18% on last Tuesday" },
          { label: "NFC tags live", value: "14", note: "4 left to program" },
          { label: "Last scan", value: "2 min", note: "Table 9 / terrace" },
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

      <div className="grid gap-3 xl:grid-cols-[1.45fr_0.55fr]">
        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div>
              <h2 className="font-serif text-[22px] font-semibold tracking-[-0.04em] text-forest">
                The table codes
              </h2>
              <p className="mt-1 text-[12px] text-muted">
                Print, test, then set them on the tables.
              </p>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.07em] text-muted/60">
              <ScanLine className="h-3 w-3" />
              Guest view
            </span>
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {ready
              ? tables.map((table) => (
                  <article
                    key={table.id}
                    className="rounded-[14px] border border-line bg-sand/40 p-3"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-dashed border-line pb-2">
                      <div>
                        <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted/70">
                          {table.zone}
                        </p>
                        <p className="mt-1 font-serif text-[19px] font-semibold leading-none text-forest">
                          Table {table.number}
                        </p>
                      </div>
                      <span className="font-mono text-[7px] uppercase tracking-[0.06em] text-muted/60">
                        {table.seats} seats
                      </span>
                    </div>

                    <div id={`qr-t${table.number}`} className="mt-3 flex justify-center">
                      <span className="flex h-[92px] w-[92px] items-center justify-center rounded-[8px] border border-line bg-white p-2 text-forest">
                        <QrMark className="h-full w-full" title={`Table ${table.number} QR code`} />
                      </span>
                    </div>
                    <p className="mt-2.5 text-center font-mono text-[7px] uppercase tracking-[0.06em] text-muted/70">
                      /order/table-{table.number}
                    </p>

                    <div className="mt-2.5 flex gap-1">
                      <button
                        type="button"
                        onClick={() => copyLink(table.number)}
                        className="flex h-7 flex-1 items-center justify-center gap-1 rounded-[8px] border border-line bg-white text-[12px] font-semibold text-forest transition-colors hover:border-forest/35"
                      >
                        <Copy className="h-2.5 w-2.5" />
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadSvg(table.number)}
                        aria-label={`Download table ${table.number} QR`}
                        className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-line bg-white text-forest transition-colors hover:border-forest/35"
                      >
                        <Download className="h-2.5 w-2.5" />
                      </button>
                      <Link
                        href={`/order/table-${table.number}`}
                        aria-label={`Open table ${table.number} menu`}
                        className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-forest text-cream transition-colors hover:bg-pine"
                      >
                        <ArrowUpRight className="h-2.5 w-2.5" />
                      </Link>
                    </div>
                  </article>
                ))
              : Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[218px] animate-pulse rounded-[14px] border border-line bg-sand/40"
                  />
                ))}
          </div>
        </section>

        <aside className="space-y-3">
          <section className="relative overflow-hidden rounded-[20px] border border-line-dark bg-forest p-4 text-cream sm:p-5">
            <div className="dot-field absolute inset-0 opacity-25" />
            <div className="relative">
              <div className="flex items-center justify-between gap-3 border-b border-cream/10 pb-3">
                <div className="flex items-center gap-2">
                  <Nfc className="h-4 w-4 text-butter" />
                  <h2 className="font-serif text-[21px] font-semibold tracking-[-0.035em]">
                    NFC tags
                  </h2>
                </div>
                <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-cream/30">
                  14 / 18
                </span>
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-cream/50">
                A tap opens the same table menu as the QR. Four tags are ready to be written
                when the next batch arrives.
              </p>
              <div className="mt-4 space-y-2">
                {[
                  ["Main room", "8 active"],
                  ["Terrace", "4 active"],
                  ["Bar", "2 active"],
                ].map(([zone, status]) => (
                  <div
                    key={zone}
                    className="flex items-center justify-between gap-3 border-b border-cream/10 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-[12px] text-cream/65">{zone}</span>
                    <span className="font-mono text-[7.5px] uppercase tracking-[0.05em] text-butter/80">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-[12px] border border-cream/10 bg-cream/[0.04] px-2.5 py-2">
                <QrCode className="h-3.5 w-3.5 shrink-0 text-butter" />
                <p className="text-[12px] leading-relaxed text-cream/40">
                  NFC is a convenience, not a requirement. The QR always works.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
            <p className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">
              Before a code goes live
            </p>
            <ul className="mt-3 space-y-2.5">
              {[
                "Open the link on a phone and order a drink.",
                "Check that the table number is printed on the card.",
                "Set the card in a holder that does not cover the code.",
                "Wipe the code when a table is moved.",
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
                  <span className="mt-0.5 font-mono text-[7.5px] text-tomato">0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {toast ? (
        <div className="fixed bottom-8 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-[12px] font-medium text-cream shadow-plate">
          <Check className="h-3 w-3 text-butter" strokeWidth={3} />
          {toast}
        </div>
      ) : null}
    </div>
  );
}
