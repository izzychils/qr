import Image from "next/image";
import { ArrowUpRight, BellRing, QrCode, Users, Wifi } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { QrMark } from "@/components/ui/qr-mark";
import { Reveal } from "@/components/ui/reveal";

const points = [
  {
    title: "No app, no account",
    copy: "The menu opens in the browser. A name at checkout is optional.",
  },
  {
    title: "The bill belongs to the table",
    copy: "Every phone adds to the same order, not four separate tabs.",
  },
  {
    title: "Split it, or pay it whole",
    copy: "Paystack, bank transfer, USSD or cash. A receipt is kept.",
  },
  {
    title: "A person, in one tap",
    copy: "The waiter request lands on the floor dashboard, not in a void.",
  },
];

export function Guest() {
  return (
    <section className="pb-14 sm:pb-20">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
              <div className="arch relative h-[390px] overflow-hidden bg-sand-deep sm:h-[470px]">
                <Image
                  src="/menu/glazed-chicken.jpg"
                  alt="Glazed chicken with mash and cranberry jus"
                  fill
                  sizes="(min-width: 1024px) 440px, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-forest/10" />
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-cream/25 bg-forest/60 px-2.5 py-1.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-cream backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-butter" />
                  Table 12 / ife b.
                </span>

                <div className="absolute inset-x-4 bottom-4 rounded-[8px] border border-cream/20 bg-cream/95 p-3 text-forest backdrop-blur">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-muted">
                      Shared table bill
                    </span>
                    <span className="font-mono text-[7px] text-moss">4 phones</span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[9px]">
                      <span>2 x Glazed chicken &amp; mash</span>
                      <span className="price text-forest">₦34,100</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[9px]">
                      <span>1 x Burnt honey cheesecake</span>
                      <span className="price text-forest">₦6,050</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
                      Total
                    </span>
                    <span className="price text-[12px] text-forest">₦43,120</span>
                  </div>
                  <span className="mt-2 flex h-7 items-center justify-center rounded-[4px] bg-tomato font-mono text-[7.5px] uppercase tracking-[0.06em] text-cream">
                    Settle the table
                  </span>
                </div>
              </div>

              <div className="absolute -right-3 top-16 hidden w-[105px] rotate-[5deg] rounded-[6px] bg-butter p-2 text-forest shadow-plate sm:block">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[5.5px] uppercase tracking-[0.1em]">Re-order</span>
                  <QrCode className="h-2.5 w-2.5" />
                </div>
                <div className="mt-1.5 bg-cream p-1.5">
                  <QrMark className="h-full w-full" title="Table 12 reorder code" />
                </div>
              </div>

              <div className="absolute -left-3 top-8 hidden items-center gap-2 rounded-full border border-line bg-cream px-2.5 py-1.5 shadow-ticket sm:flex">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tomato text-cream">
                  <BellRing className="h-2.5 w-2.5" />
                </span>
                <span className="text-[8.5px] font-semibold text-forest">
                  Waiter on the way
                </span>
              </div>

              <div className="absolute -bottom-4 right-6 hidden items-center gap-1.5 rounded-full border border-line bg-cream px-2.5 py-1.5 font-mono text-[7px] uppercase tracking-[0.06em] text-muted shadow-ticket sm:flex">
                <Wifi className="h-2.5 w-2.5 text-tomato" />
                Guest Wi-Fi on the table
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow text-muted">Guest experience</p>
            <h2 className="mt-4 font-serif text-[clamp(2.3rem,4.6vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-forest">
              They never download a thing.
            </h2>
            <p className="mt-3 max-w-[520px] text-[12px] leading-relaxed text-muted">
              No app store, no password, no table account. The menu, the order, the waiter and
              the bill all live behind the same small code.
            </p>

            <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {points.map((point, index) => (
                <div key={point.title} className="border-t border-line pt-3">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[7.5px] text-tomato">0{index + 1}</span>
                    <div>
                      <p className="text-[11.5px] font-semibold text-forest">{point.title}</p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{point.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ActionButton href="/order/table-12" variant="forest">
                Open the guest menu
              </ActionButton>
              <span className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.07em] text-muted/70">
                <Users className="h-3 w-3 text-tomato" />
                Working demo / table 12
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-[7px] border border-line bg-cream px-3 py-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-forest p-1 text-cream">
                <QrMark className="h-full w-full" title="Table code" />
              </span>
              <p className="text-[11px] leading-relaxed text-muted">
                While they wait, there is a small science-of-the-kitchen quiz and the Wi-Fi
                password. Nothing that needs an account.
              </p>
              <ArrowUpRight className="ml-auto h-3 w-3 shrink-0 text-forest/30" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
