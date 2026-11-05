import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Check, Clock3, QrCode, ScanLine } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { QrMark } from "@/components/ui/qr-mark";
import { site } from "@/lib/site";

const promises = ["No guest app", "Paystack, transfer, USSD", "NFC optional"];

const stats = [
  { value: "18", label: "tables, one view" },
  { value: "0", label: "apps to install" },
  { value: "2", label: "taps to the pass" },
  { value: "1", label: "shared bill" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      <div className="poster-grid absolute inset-0 opacity-60" />
      <div className="absolute right-[-220px] top-[-260px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(217,82,44,0.32),transparent_64%)]" />
      <div className="absolute left-[-240px] top-[420px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(240,199,94,0.09),transparent_70%)]" />

      <div className="shell relative pb-8 pt-10 sm:pb-10 sm:pt-14 lg:pb-12 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-cream/55">Sideplate / QR ordering</span>
              <span className="hidden h-3 w-px bg-cream/15 sm:block" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.13em] text-cream/30">
                Built for restaurants, not apps
              </span>
            </div>

            <h1 className="display mt-6 text-[clamp(3.1rem,6.8vw,5.65rem)]">
              Your website
              <br />
              on every{" "}
              <span className="display-italic text-[#f2734b]">table.</span>
            </h1>

            <p className="mt-5 max-w-[500px] text-[13px] leading-[1.75] text-cream/55 sm:text-[14px]">
              The guest scans once. The menu opens, the order reaches the pass and the bill
              stays shared. No app, no account, no waving across the room for a waiter who is
              already busy.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <ActionButton href="/order/table-12" variant="tomato" size="lg">
                Open table 12
              </ActionButton>
              <ActionButton
                href="/login"
                variant="outline"
                size="lg"
                className="border-cream/25 text-cream hover:border-cream/60"
              >
                Walk the dashboard
              </ActionButton>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-cream/10 pt-4">
              {promises.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-[10.5px] font-medium text-cream/45"
                >
                  <Check className="h-3 w-3 text-butter" strokeWidth={3} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px] lg:mr-0">
            <div className="pointer-events-none absolute -right-12 -top-8 hidden h-[250px] w-[250px] rotate-6 border border-cream/10 p-5 text-cream/[0.08] sm:block">
              <QrMark className="h-full w-full" title="Decorative QR pattern" />
            </div>

            <div className="relative mx-auto w-[286px] sm:w-[310px]">
              <div className="relative rounded-[30px] border border-cream/20 bg-[#0b211a] p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
                <div className="overflow-hidden rounded-[23px] bg-cream text-forest">
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <div>
                      <p className="font-serif text-[16px] font-semibold leading-none tracking-[-0.04em]">
                        Ember &amp; Rice<span className="text-tomato">.</span>
                      </p>
                      <p className="mt-0.5 font-mono text-[5.5px] uppercase tracking-[0.12em] text-muted">
                        Lekki / Dinner service
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full border border-line px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.08em]">
                      <span className="h-1 w-1 rounded-full bg-moss" />
                      T12
                    </span>
                  </div>

                  <div className="relative h-[158px]">
                    <Image
                      src="/menu/jollof-platter.jpg"
                      alt="Jollof rice and peppered plantain"
                      fill
                      priority
                      sizes="310px"
                      className="object-cover"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-[4px] bg-forest/85 px-1.5 py-1 font-mono text-[5.5px] uppercase tracking-[0.1em] text-cream backdrop-blur-sm">
                      Table 12 / Tonight
                    </span>
                    <div className="absolute inset-x-2 bottom-2 rounded-[5px] bg-cream/95 p-2 backdrop-blur-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-serif text-[12.5px] font-semibold leading-tight">
                            Jollof &amp; peppered plantain
                          </p>
                          <p className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted">
                            House signature / 15 min
                          </p>
                        </div>
                        <span className="price shrink-0 text-[8px]">₦10,500</span>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-line/80 px-2.5">
                    {[
                      ["Street tacos", "3 pieces", "₦8,500"],
                      ["Zobo fizz", "Hibiscus / lime", "₦2,800"],
                      ["Burnt honey cheesecake", "For two", "₦5,500"],
                    ].map(([name, note, price]) => (
                      <div key={name} className="flex items-center justify-between gap-2 py-2">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-forest font-serif text-[7px] text-cream">
                            {name.charAt(0)}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-[8px] font-semibold leading-tight">{name}</p>
                            <p className="mt-0.5 font-mono text-[5.5px] uppercase tracking-[0.05em] text-muted">
                              {note}
                            </p>
                          </div>
                        </div>
                        <span className="price shrink-0 text-[6.5px]">{price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2">
                    <div className="flex items-center justify-between rounded-[5px] bg-tomato px-2.5 py-2 text-cream">
                      <span className="text-[7.5px] font-semibold">View table order</span>
                      <span className="font-mono text-[6.5px]">2 items / ₦24,150</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 border-t border-line py-1.5">
                    <span className="font-mono text-[5px] uppercase tracking-[0.1em] text-muted/60">
                      No app / No account / One bill
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-5 bottom-16 hidden w-[192px] -rotate-[5deg] rounded-[7px] border border-line bg-cream p-3 text-forest shadow-plate sm:block">
                <div className="flex items-center justify-between border-b border-dashed border-line pb-1.5">
                  <span className="font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                    Ticket
                  </span>
                  <span className="font-mono text-[6.5px] text-tomato">#1043</span>
                </div>
                <p className="mt-1.5 font-serif text-[16px] font-semibold leading-none">Table 12</p>
                <div className="mt-1.5 space-y-0.5 text-[7.5px] text-muted">
                  <p>2 x Jollof &amp; plantain</p>
                  <p>1 x Street tacos</p>
                  <p>2 x Zobo fizz</p>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-dashed border-line pt-1.5">
                  <span className="flex items-center gap-1 font-mono text-[5.5px] uppercase tracking-[0.08em] text-moss">
                    <span className="h-1 w-1 rounded-full bg-moss" />
                    On the pass
                  </span>
                  <span className="flex items-center gap-0.5 font-mono text-[5.5px] text-muted">
                    <Clock3 className="h-2 w-2" />2 min
                  </span>
                </div>
              </div>

              <div className="absolute -right-4 top-9 hidden w-[104px] rotate-[6deg] rounded-[7px] bg-butter p-2.5 text-forest shadow-plate sm:block">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[5.5px] uppercase tracking-[0.1em]">Table 12</span>
                  <ScanLine className="h-2.5 w-2.5" />
                </div>
                <div className="mt-1.5 flex justify-center bg-cream p-1.5">
                  <QRCodeSVG
                    value={`${site.url}/order/table-12`}
                    size={72}
                    level="M"
                    marginSize={0}
                    bgColor="#fffaf0"
                    fgColor="#0b0b0b"
                    title="Scan the table 12 menu"
                  />
                </div>
                <p className="mt-1 text-center font-mono text-[5px] uppercase tracking-[0.1em]">
                  Scan to order
                </p>
              </div>

              <div className="absolute -bottom-3 right-2 hidden items-center gap-1.5 rounded-full border border-cream/15 bg-forest/85 px-2 py-1 font-mono text-[5.5px] uppercase tracking-[0.08em] text-cream/55 backdrop-blur sm:flex">
                <QrCode className="h-2.5 w-2.5 text-butter" />
                NFC ready
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-y-5 border-t border-cream/10 pt-5 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2 sm:block">
              <p className="font-serif text-[26px] font-semibold leading-none tracking-[-0.04em] text-cream">
                {stat.value}
              </p>
              <p className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-cream/35 sm:mt-1.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
