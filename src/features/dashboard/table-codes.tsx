"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileImage,
  Nfc,
  QrCode,
  ScanLine,
  Smartphone,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { useTables } from "@/lib/store";
import { site } from "@/lib/site";
import { safeFileName, tableUrl } from "@/features/qr/table-code";

export function TableCodes() {
  const [tables, ready] = useTables();
  const [origin, setOrigin] = useState<string>(site.url);
  const [selected, setSelected] = useState(12);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  };

  const tableLink = (number: number) => tableUrl(number, origin);

  const copyLink = async (number: number) => {
    try {
      await navigator.clipboard.writeText(tableLink(number));
      notify(`Table ${number} link copied.`);
    } catch {
      notify("Copy is blocked in this browser.");
    }
  };

  const downloadSvg = (number: number, targetId = `qr-t${number}`) => {
    const source = document.querySelector(`#${targetId} svg`);
    if (!source) {
      notify("The code is still rendering. Try again in a moment.");
      return;
    }
    const clone = source.cloneNode(true) as SVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "900");
    clone.setAttribute("height", "900");
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeFileName(site.name)}-table-${number}-qr.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
    notify(`Table ${number} QR downloaded as SVG.`);
  };

  const downloadPng = async (number: number, targetId = `qr-t${number}`) => {
    const source = document.querySelector(`#${targetId} svg`);
    if (!source) {
      notify("The code is still rendering. Try again in a moment.");
      return;
    }
    try {
      const clone = source.cloneNode(true) as SVGElement;
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clone.setAttribute("width", "900");
      clone.setAttribute("height", "900");
      const data = new XMLSerializer().serializeToString(clone);
      const image = new Image();
      image.decoding = "sync";
      const url = URL.createObjectURL(new Blob([data], { type: "image/svg+xml;charset=utf-8" }));
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("QR image could not be drawn."));
        image.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = 900;
      canvas.height = 900;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is unavailable.");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, 900, 900);
      context.drawImage(image, 0, 0, 900, 900);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = pngUrl;
      anchor.download = `${safeFileName(site.name)}-table-${number}-qr.png`;
      anchor.click();
      notify(`Table ${number} QR downloaded as PNG.`);
    } catch {
      notify("PNG export failed in this browser. The SVG download still works.");
    }
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
    anchor.download = "sideplate-table-links.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    notify("All table links downloaded.");
  };

  const selectedTable = tables.find((table) => table.number === selected);

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Access / QR and NFC"
        title="Generate, test and print every table code."
        description="Each card below carries a real QR code that opens that table's menu. Scan one with a phone, download it for print, or generate a fresh code in the studio."
        action={
          <div className="flex flex-wrap gap-1.5">
            <Link
              href="/scan"
              className="flex h-9 items-center gap-1.5 rounded-[12px] bg-pink px-3 text-[11.5px] font-semibold text-forest transition-colors hover:bg-[#ffa1ba]"
            >
              <ScanLine className="h-3.5 w-3.5" />
              Scan a code
            </Link>
            <button
              type="button"
              onClick={downloadLinks}
              className="flex h-9 items-center gap-1.5 rounded-[12px] border border-line bg-white px-3 text-[11.5px] font-semibold text-forest transition-colors hover:border-forest/30"
            >
              <Download className="h-3.5 w-3.5" />
              All links
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {[
          { label: "Tables with a code", value: String(tables.length || 18), note: "Real, scannable codes" },
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
                Every code is generated from the table&apos;s live link. Print, test, then set
                them on the tables.
              </p>
            </div>
            <span className="hidden items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.07em] text-muted/60 sm:flex">
              <QrCode className="h-3 w-3" />
              Real QR · not artwork
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
                      <span className="flex h-[104px] w-[104px] items-center justify-center rounded-[8px] border border-line bg-white p-2">
                        <QRCodeSVG
                          value={tableLink(table.number)}
                          size={88}
                          level="M"
                          marginSize={0}
                          bgColor="#ffffff"
                          fgColor="#0b0b0b"
                          title={`QR code for table ${table.number}`}
                          className="h-full w-full"
                        />
                      </span>
                    </div>
                    <p className="mt-2.5 text-center font-mono text-[7px] uppercase tracking-[0.06em] text-muted/70">
                      /order/table-{table.number}
                    </p>

                    <div className="mt-2.5 flex gap-1">
                      <button
                        type="button"
                        onClick={() => copyLink(table.number)}
                        className="flex h-7 flex-1 items-center justify-center gap-1 rounded-[8px] border border-line bg-white text-[11px] font-semibold text-forest transition-colors hover:border-forest/35"
                      >
                        <Copy className="h-2.5 w-2.5" />
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadSvg(table.number)}
                        aria-label={`Download table ${table.number} QR as SVG`}
                        title="Download SVG"
                        className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-line bg-white text-forest transition-colors hover:border-forest/35"
                      >
                        <Download className="h-2.5 w-2.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void downloadPng(table.number)}
                        aria-label={`Download table ${table.number} QR as PNG`}
                        title="Download PNG"
                        className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-line bg-white text-forest transition-colors hover:border-forest/35"
                      >
                        <FileImage className="h-2.5 w-2.5" />
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
                    className="h-[234px] animate-pulse rounded-[14px] border border-line bg-sand/40"
                  />
                ))}
          </div>
        </section>

        <aside className="space-y-3">
          <section className="rounded-[20px] border border-line bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
              <div>
                <p className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">
                  Generator
                </p>
                <h2 className="mt-1.5 font-serif text-[21px] font-semibold tracking-[-0.035em] text-forest">
                  Test one table
                </h2>
              </div>
              <QrCode className="h-4 w-4 text-tomato" />
            </div>

            <label className="mt-3 block">
              <span className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-muted">
                Table
              </span>
              <select
                value={selected}
                onChange={(event) => setSelected(Number(event.target.value))}
                className="mt-1.5 h-9 w-full rounded-[8px] border border-line bg-white px-2.5 text-[11.5px] font-medium text-forest outline-none focus:border-forest/40"
              >
                {Array.from({ length: 18 }, (_, index) => index + 1).map((number) => (
                  <option key={number} value={number}>
                    Table {number} · {tables.find((table) => table.number === number)?.zone ?? "Main room"}
                  </option>
                ))}
              </select>
            </label>

            <div id="qr-generator" className="mt-3 flex justify-center rounded-[14px] border border-line bg-sand/40 p-4">
              <span className="rounded-[10px] border border-line bg-white p-3 shadow-ticket">
                <QRCodeSVG
                  value={tableLink(selected)}
                  size={148}
                  level="H"
                  marginSize={1}
                  bgColor="#ffffff"
                  fgColor="#0b0b0b"
                  title={`QR code for table ${selected}`}
                />
              </span>
            </div>

            <p className="mt-2 break-all rounded-[8px] border border-line bg-sand/40 px-2.5 py-2 font-mono text-[8px] leading-relaxed text-forest/70">
              {tableLink(selected)}
            </p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-muted/70">
              {selectedTable?.seats ?? 4} seats · {selectedTable?.zone ?? "Main room"} · error
              correction level H for print.
            </p>

            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => downloadSvg(selected, "qr-generator")}
                className="flex h-8 items-center justify-center gap-1.5 rounded-[8px] border border-line bg-white text-[10.5px] font-semibold text-forest transition-colors hover:border-forest/35"
              >
                <Download className="h-3 w-3" />
                SVG
              </button>
              <button
                type="button"
                onClick={() => void downloadPng(selected, "qr-generator")}
                className="flex h-8 items-center justify-center gap-1.5 rounded-[8px] border border-line bg-white text-[10.5px] font-semibold text-forest transition-colors hover:border-forest/35"
              >
                <FileImage className="h-3 w-3" />
                PNG
              </button>
              <button
                type="button"
                onClick={() => copyLink(selected)}
                className="flex h-8 items-center justify-center gap-1.5 rounded-[8px] border border-line bg-white text-[10.5px] font-semibold text-forest transition-colors hover:border-forest/35"
              >
                <Copy className="h-3 w-3" />
                Copy link
              </button>
              <Link
                href={`/order/table-${selected}`}
                className="flex h-8 items-center justify-center gap-1.5 rounded-[8px] bg-forest text-[10.5px] font-semibold text-cream transition-colors hover:bg-pine"
              >
                Open
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[20px] border border-line bg-cream p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-tomato" />
              <h2 className="font-serif text-[21px] font-semibold tracking-[-0.035em] text-forest">
                Test a scan
              </h2>
            </div>
            <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
              Open the scanner, point a camera at any code on this page, or upload a screenshot.
              There is also a demo scan that needs no camera.
            </p>
            <Link
              href="/scan"
              className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-full bg-tomato text-[11px] font-semibold text-cream transition-colors hover:bg-tomato-deep"
            >
              <ScanLine className="h-3.5 w-3.5" />
              Open the scanner
            </Link>
            <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[0.06em] text-muted/60">
              /scan · works on phone and desktop
            </p>
          </section>

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
