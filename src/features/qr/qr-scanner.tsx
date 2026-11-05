"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CameraOff,
  CheckCircle2,
  ImageUp,
  Loader2,
  ScanLine,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import type { Html5Qrcode } from "html5-qrcode";
import { restaurant } from "@/features/menu/data";
import { tablePath, tableUrl, parseTableCode } from "@/features/qr/table-code";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "starting" | "scanning" | "reading";
type Result = { table: number; raw: string; simulated: boolean };

const friendlyCameraError = (error: unknown) => {
  const message = String(
    (error as { message?: string } | undefined)?.message ?? error ?? "",
  ).toLowerCase();

  if (message.includes("permission") || message.includes("notallowed")) {
    return "Camera access was blocked. Allow the camera in your browser, or upload a screenshot of the code instead.";
  }
  if (message.includes("notfound") || message.includes("no camera") || message.includes("devices")) {
    return "No camera was found. You can upload a photo of the code or use the demo scan.";
  }
  if (message.includes("notsecure") || message.includes("secure")) {
    return "The camera needs HTTPS or localhost. Upload the code instead, or open the site on a secure origin.";
  }
  return "The camera could not start. Upload a screenshot of the code, or try the demo scan below.";
};

export function QrScanner({
  demoTable = 12,
  className,
  onDecoded,
}: {
  demoTable?: number;
  className?: string;
  onDecoded?: (table: number, raw: string) => void;
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const readerId = `qr-camera-${rawId}`;
  const fileReaderId = `qr-file-${rawId}`;
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const timerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [origin, setOrigin] = useState<string>(site.url);

  useEffect(() => {
    setOrigin(window.location.origin);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      const scanner = scannerRef.current;
      scannerRef.current = null;
      if (scanner) {
        const stop = scanner.isScanning ? scanner.stop() : Promise.resolve();
        void stop
          .catch(() => {})
          .finally(() => {
            try {
              scanner.clear();
            } catch {
              // The reader may already be gone on navigation.
            }
          });
      }
    };
  }, []);

  const stopCamera = async () => {
    const scanner = scannerRef.current;
    scannerRef.current = null;
    if (!scanner) return;
    try {
      if (scanner.isScanning) await scanner.stop();
      scanner.clear();
    } catch {
      // Stop errors are non-fatal; the UI still returns to idle.
    }
  };

  const accept = async (raw: string, simulated: boolean) => {
    const table = parseTableCode(raw, restaurant.tableCount);
    if (!table) {
      setError(
        `That code is not a Sideplate table code: “${raw.slice(0, 120)}”. Try a code from this demo.`,
      );
      setStatus((current) => (current === "scanning" ? "scanning" : "idle"));
      return;
    }

    await stopCamera();
    setResult({ table, raw, simulated });
    setError(null);
    setStatus("idle");
    onDecoded?.(table, raw);
  };

  const startCamera = async () => {
    if (status === "starting" || status === "scanning") return;
    setError(null);
    setResult(null);
    setStatus("starting");

    try {
      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import("html5-qrcode");
      const scanner = new Html5Qrcode(readerId, {
        verbose: false,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      });
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          void accept(decodedText, false);
        },
        () => {
          // A frame without a code is normal; keep the preview quiet.
        },
      );
      setStatus("scanning");
    } catch (cameraError) {
      await stopCamera();
      setError(friendlyCameraError(cameraError));
      setStatus("idle");
    }
  };

  const stop = async () => {
    await stopCamera();
    setStatus("idle");
  };

  const simulate = () => {
    if (status === "starting" || status === "scanning" || status === "reading") return;
    setError(null);
    setResult(null);
    setStatus("reading");

    timerRef.current = window.setTimeout(() => {
      void accept(tableUrl(demoTable, origin || site.url), true);
    }, 800) as unknown as number;
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("That file is not an image. Upload a PNG, JPG or screenshot of the code.");
      return;
    }

    setError(null);
    setResult(null);
    setStatus("reading");

    try {
      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import("html5-qrcode");
      const fileScanner = new Html5Qrcode(fileReaderId, {
        verbose: false,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      });
      const decoded = await fileScanner.scanFile(file, false);
      try {
        fileScanner.clear();
      } catch {
        // Ignore teardown errors.
      }
      await accept(decoded, false);
    } catch {
      setError(
        "No QR code could be read from that image. Try a sharper photo, crop closer to the code, or use the demo scan.",
      );
      setStatus("idle");
    }
  };

  const busy = status === "starting" || status === "reading";

  return (
    <div className={cn("rounded-[20px] border border-line bg-white p-4 sm:p-5", className)}>
      <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
        <div>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-tomato">
            <ScanLine className="h-3 w-3" />
            Live scanner
          </p>
          <h2 className="mt-1.5 font-serif text-[22px] font-semibold tracking-[-0.04em] text-forest">
            Scan a table code
          </h2>
        </div>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[8.5px] font-semibold uppercase tracking-[0.06em]",
            status === "scanning"
              ? "border-moss/30 bg-moss/10 text-moss"
              : "border-line bg-sand/50 text-muted",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              status === "scanning" ? "animate-pulse bg-moss" : "bg-muted/40",
            )}
          />
          {status === "scanning" ? "Camera live" : busy ? "Working" : "Ready"}
        </span>
      </div>

      <div className="mt-4">
        <div
          className={cn(
            "relative aspect-square overflow-hidden rounded-[16px] border border-line bg-[#0b0b0b]",
            status !== "scanning" && status !== "starting" && "bg-forest",
          )}
        >
          <div id={readerId} className="qr-reader h-full w-full" />

          {status !== "scanning" ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-forest px-6 text-center text-cream">
              {status === "starting" ? (
                <>
                  <Loader2 className="h-7 w-7 animate-spin text-butter" />
                  <p className="mt-3 text-[12px] font-medium">Starting the camera…</p>
                  <p className="mt-1 text-[10px] text-cream/45">Allow access when asked.</p>
                </>
              ) : (
                <>
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-[14px] border border-cream/20">
                    <ScanLine className="h-9 w-9 text-butter" />
                    <span className="absolute -left-px -top-px h-6 w-6 rounded-tl-[8px] border-l-2 border-t-2 border-butter" />
                    <span className="absolute -right-px -top-px h-6 w-6 rounded-tr-[8px] border-r-2 border-t-2 border-butter" />
                    <span className="absolute -bottom-px -left-px h-6 w-6 rounded-bl-[8px] border-b-2 border-l-2 border-butter" />
                    <span className="absolute -bottom-px -right-px h-6 w-6 rounded-br-[8px] border-b-2 border-r-2 border-butter" />
                  </div>
                  <p className="mt-4 text-[13px] font-semibold text-cream">
                    Point the camera at a table card
                  </p>
                  <p className="mt-1 max-w-[260px] text-[10.5px] leading-relaxed text-cream/50">
                    The code opens that table&apos;s menu. Nothing leaves this device.
                  </p>
                </>
              )}
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-3 rounded-[10px] border border-cream/15">
            <span className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-butter/60" />
          </div>

          <div id={fileReaderId} className="pointer-events-none fixed -left-[9999px] top-0 h-10 w-10 opacity-0" aria-hidden />
        </div>

        <div aria-live="polite">
          {error ? (
            <div className="mt-3 flex items-start gap-2 rounded-[10px] border border-tomato/25 bg-tomato/[0.06] px-3 py-2.5">
              <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tomato" />
              <p className="text-[11px] leading-relaxed text-forest/80">{error}</p>
            </div>
          ) : null}

          {result ? (
            <div className="mt-3 rounded-[14px] border border-moss/25 bg-moss/[0.06] p-3.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-moss" />
                <p className="text-[12.5px] font-semibold text-forest">
                  Table {result.table} detected
                </p>
                <span className="ml-auto rounded-full border border-moss/20 bg-white px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.06em] text-moss">
                  {result.simulated ? "Demo scan" : "Decoded"}
                </span>
              </div>
              <p className="mt-1.5 break-all font-mono text-[8.5px] leading-relaxed text-muted/80">
                {result.raw}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                <Link
                  href={tablePath(result.table)}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-forest text-[11px] font-semibold text-cream transition-colors hover:bg-pine"
                >
                  Open table {result.table}
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setError(null);
                  }}
                  className="flex h-9 items-center justify-center rounded-full border border-line bg-white text-[11px] font-semibold text-forest transition-colors hover:border-forest/30"
                >
                  Scan another
                </button>
              </div>
            </div>
          ) : null}

          {status === "reading" ? (
            <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-line bg-sand/40 px-3 py-2.5 text-[11px] text-muted">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-tomato" />
              Reading the code…
            </div>
          ) : null}
        </div>

        <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {status === "scanning" ? (
            <button
              type="button"
              onClick={() => void stop()}
              className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[11.5px] font-semibold text-forest transition-colors hover:border-forest/30"
            >
              <CameraOff className="h-3.5 w-3.5" />
              Stop camera
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void startCamera()}
              disabled={busy}
              className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-forest text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine disabled:opacity-50"
            >
              {status === "starting" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5" />
              )}
              {status === "starting" ? "Starting…" : "Use camera"}
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy || status === "scanning"}
            className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[11.5px] font-semibold text-forest transition-colors hover:border-forest/30 disabled:opacity-50"
          >
            <ImageUp className="h-3.5 w-3.5" />
            Upload a photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label="Upload a photo of a table QR code"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              void upload(file);
            }}
          />
        </div>

        <button
          type="button"
          onClick={simulate}
          disabled={busy || status === "scanning"}
          className="mt-1.5 flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-tomato/25 bg-tomato/[0.06] text-[11.5px] font-semibold text-tomato-deep transition-colors hover:bg-tomato/10 disabled:opacity-50"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Scan the demo code (no camera)
        </button>

        <p className="mt-2.5 text-center text-[9.5px] leading-relaxed text-muted/65">
          The camera feed is processed in your browser and never uploaded. On a phone, point it
          at the printed code or the demo code on another screen.
        </p>
      </div>
    </div>
  );
}

export { tablePath };
