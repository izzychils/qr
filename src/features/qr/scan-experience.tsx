"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  QrCode,
  ScanLine,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { QrScanner } from "@/features/qr/qr-scanner";
import { safeFileName, tablePath, tableUrl } from "@/features/qr/table-code";
import { site } from "@/lib/site";

const DEMO_TABLE = 12;

const steps = [
  {
    title: "The guest scans",
    copy: "The phone camera opens the code. No app, no account, no download.",
  },
  {
    title: "The table is known",
    copy: "The link carries the table number, so the order lands in the right place.",
  },
  {
    title: "The menu opens",
    copy: "That table's menu, shared bill and service requests are ready immediately.",
  },
];

export function ScanExperience() {
  const [origin, setOrigin] = useState<string>(site.url);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const demoLink = tableUrl(DEMO_TABLE, origin);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const copyDemo = async () => {
    try {
      await navigator.clipboard.writeText(demoLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      notify("Demo table link copied.");
    } catch {
      notify("Copy is blocked in this browser. Select the link instead.");
    }
  };

  const downloadSvg = () => {
    const source = document.querySelector("#demo-table-qr svg");
    if (!source) return;
    const clone = source.cloneNode(true) as SVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "600");
    clone.setAttribute("height", "600");
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeFileName(site.name)}-table-${DEMO_TABLE}-qr.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
    notify("Demo QR downloaded.");
  };

  return (
    <main className="pb-14 sm:pb-20">
      <section className="shell pt-3 sm:pt-4">
        <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-9 text-cream sm:rounded-[36px] sm:px-10 sm:py-12">
          <div className="poster-grid absolute inset-0 opacity-50" />
          <div className="absolute right-[-120px] top-[-160px] h-[380px] w-[380px] rounded-full border border-cream/10" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow text-cream/55">Scan / table access</p>
              <h1 className="mt-5 max-w-[620px] text-[clamp(2.5rem,5.4vw,4.4rem)] font-extrabold leading-[0.94] tracking-[-0.06em]">
                Point. Scan.
                <br />
                Sit down.
              </h1>
              <p className="mt-4 max-w-[440px] text-[13px] leading-[1.75] text-cream/55">
                Every Sideplate table has a real QR code. Scan one with your phone camera, or
                test the flow right here with the demo code — no camera required.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-cream/10 pt-4 text-[10.5px] text-cream/45">
                {["No app to install", "Processed on your device", "Real, scannable codes"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-butter" strokeWidth={3} />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 lg:justify-end">
              <div className="rotate-[-3deg] rounded-[14px] border border-cream/15 bg-[#10241c] p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <div className="rounded-[8px] bg-white p-2.5">
                  <div id="demo-table-qr">
                    <QRCodeSVG
                      value={demoLink}
                      size={132}
                      level="H"
                      marginSize={0}
                      bgColor="#ffffff"
                      fgColor="#0b0b0b"
                      title={`Demo QR code for table ${DEMO_TABLE}`}
                    />
                  </div>
                </div>
                <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[0.1em] text-cream/50">
                  Demo · Table {DEMO_TABLE}
                </p>
              </div>
              <div className="hidden max-w-[150px] flex-col gap-2 sm:flex">
                <span className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-butter/80">
                  <ScanLine className="h-3 w-3" />
                  The code is live
                </span>
                <p className="text-[10.5px] leading-relaxed text-cream/40">
                  Scan it with your phone and the Table 12 menu opens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-4">
        <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
          <QrScanner demoTable={DEMO_TABLE} />

          <div className="flex flex-col gap-3">
            <section className="rounded-[20px] border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
                <div>
                  <p className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">
                    <QrCode className="h-3 w-3" />
                    The dummy code
                  </p>
                  <h2 className="mt-1.5 font-serif text-[22px] font-semibold tracking-[-0.04em] text-forest">
                    Table {DEMO_TABLE}&apos;s real code
                  </h2>
                </div>
                <span className="rounded-full border border-line bg-sand/50 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Encoded on this device
                </span>
              </div>

              <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="rounded-[14px] border border-line bg-white p-3 shadow-ticket">
                  <QRCodeSVG
                    value={demoLink}
                    size={168}
                    level="H"
                    marginSize={1}
                    bgColor="#ffffff"
                    fgColor="#0b0b0b"
                    title={`QR code for ${demoLink}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] leading-relaxed text-muted">
                    This encodes the live URL for table {DEMO_TABLE}. Print it, open it on
                    another phone, or scan it with the camera above.
                  </p>
                  <p className="mt-2 break-all rounded-[8px] border border-line bg-sand/40 px-2.5 py-2 font-mono text-[8px] leading-relaxed text-forest/70">
                    {demoLink}
                  </p>
                  <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => void copyDemo()}
                      className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[10.5px] font-semibold text-forest transition-colors hover:border-forest/30"
                    >
                      {copied ? <Check className="h-3 w-3 text-moss" /> : <Copy className="h-3 w-3" />}
                      {copied ? "Copied" : "Copy link"}
                    </button>
                    <button
                      type="button"
                      onClick={downloadSvg}
                      className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[10.5px] font-semibold text-forest transition-colors hover:border-forest/30"
                    >
                      <Download className="h-3 w-3" />
                      Download SVG
                    </button>
                  </div>
                  <Link
                    href={tablePath(DEMO_TABLE)}
                    className="mt-1.5 flex h-8 items-center justify-center gap-1.5 rounded-full bg-tomato text-[10.5px] font-semibold text-cream transition-colors hover:bg-tomato-deep"
                  >
                    Open the table menu
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </section>

            <section className="rounded-[20px] border border-line bg-white p-5">
              <p className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-muted">
                What happens on a scan
              </p>
              <div className="mt-3 space-y-2.5">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sand text-[8px] font-semibold text-forest">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[11.5px] font-semibold text-forest">{step.title}</p>
                      <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted">{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {[
            {
              icon: Smartphone,
              title: "Phone camera",
              copy: "iOS and Android camera apps read the code without any extra app.",
            },
            {
              icon: ShieldCheck,
              title: "Private by default",
              copy: "Decoding happens in the browser. No frame or image is sent to a server.",
            },
            {
              icon: ScanLine,
              title: "Built for print",
              copy: "High-error-correction codes stay readable on a coaster or a table card.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-[14px] border border-line bg-white p-4">
              <card.icon className="h-4 w-4 text-tomato" />
              <p className="mt-2 text-[11.5px] font-semibold text-forest">{card.title}</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-muted">{card.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-[14px] border border-line bg-cream p-4 sm:flex-row sm:items-center">
          <p className="text-[11.5px] leading-relaxed text-muted">
            Staff can generate, print and download a code for every table from the dashboard.
          </p>
          <Link
            href="/dashboard/qr"
            className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-pink px-4 text-[11px] font-semibold text-forest transition-colors hover:bg-[#ffa1ba]"
          >
            Generate table codes
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      {toast ? (
        <div className="fixed bottom-8 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-[12px] font-medium text-cream shadow-plate">
          <Check className="h-3 w-3 text-butter" strokeWidth={3} />
          {toast}
        </div>
      ) : null}
    </main>
  );
}
