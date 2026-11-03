import Image from "next/image";
import {
  Armchair,
  BarChart3,
  ChefHat,
  Clock3,
  QrCode,
  Star,
  TrendingUp,
} from "lucide-react";
import { QrMark } from "@/components/ui/qr-mark";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const floor = [
  { table: 1, status: "open" },
  { table: 2, status: "seated" },
  { table: 3, status: "ordered" },
  { table: 4, status: "bill" },
  { table: 5, status: "cleaning" },
  { table: 6, status: "open" },
  { table: 7, status: "ordered" },
  { table: 8, status: "seated" },
  { table: 9, status: "ready" },
  { table: 10, status: "open" },
  { table: 11, status: "cleaning" },
  { table: 12, status: "ordered" },
  { table: 13, status: "open" },
  { table: 14, status: "seated" },
  { table: 15, status: "ready" },
  { table: 16, status: "open" },
  { table: 17, status: "seated" },
  { table: 18, status: "open" },
];

const floorStyles: Record<string, string> = {
  open: "border-line bg-sand/60 text-forest",
  seated: "border-butter/70 bg-butter/25 text-forest",
  ordered: "border-tomato/25 bg-tomato/10 text-forest",
  ready: "border-moss/25 bg-moss/10 text-forest",
  bill: "border-tomato/40 bg-tomato/15 text-forest",
  cleaning: "border-line bg-sand-deep/70 text-muted",
};

export function Product() {
  return (
    <section id="product" className="scroll-mt-20 pb-14 sm:pb-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">One system / four surfaces</p>
              <h2 className="mt-4 max-w-[720px] font-serif text-[clamp(2.3rem,4.6vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-forest">
                The floor and the pass, finally reading the same ticket.
              </h2>
            </div>
            <p className="max-w-[280px] text-[11px] leading-relaxed text-muted">
              Not a QR menu with a dashboard bolted on. One set of records behind every screen.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="flex h-full flex-col rounded-[12px] border border-line bg-cream p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-tomato">
                  Floor
                </span>
                <Armchair className="h-4 w-4 text-forest/25" />
              </div>
              <h3 className="mt-4 max-w-[430px] font-serif text-[30px] font-semibold leading-[1.02] tracking-[-0.045em] text-forest">
                A floor plan that tells the truth.
              </h3>
              <p className="mt-2 max-w-[450px] text-[11.5px] leading-relaxed text-muted">
                Which table is seated, which is waiting on the pass, which has asked for the
                bill. The room changes itself as the service moves.
              </p>

              <div className="mt-5 grid grid-cols-6 gap-1.5">
                {floor.map((entry) => (
                  <div
                    key={entry.table}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-[5px] border py-2",
                      floorStyles[entry.status],
                    )}
                  >
                    <span className="font-serif text-[15px] font-semibold leading-none">
                      {entry.table}
                    </span>
                    <span className="mt-1 h-1 w-1 rounded-full bg-current opacity-60" />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-3">
                {[
                  ["Open", "bg-moss"],
                  ["Seated", "bg-butter"],
                  ["Order in", "bg-tomato"],
                  ["Ready", "bg-moss/60"],
                  ["Bill", "bg-tomato-deep"],
                ].map(([label, color]) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.06em] text-muted"
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", color)} />
                    {label}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[12px] border border-line-dark bg-forest p-5 text-cream sm:p-6">
              <div className="dot-field absolute inset-0 opacity-25" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-butter">
                    The pass
                  </span>
                  <ChefHat className="h-4 w-4 text-cream/30" />
                </div>
                <h3 className="mt-4 max-w-[330px] font-serif text-[30px] font-semibold leading-[1.02] tracking-[-0.045em]">
                  The kitchen sees it first.
                </h3>
                <p className="mt-2 max-w-[340px] text-[11px] leading-relaxed text-cream/50">
                  One tap to start, one to send it ready. Late tickets turn red before anyone
                  has to walk to the pass and ask.
                </p>

                <div className="mt-5 rounded-[7px] bg-cream p-3 text-forest">
                  <div className="flex items-start justify-between gap-2 border-b border-line pb-2">
                    <div>
                      <p className="font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
                        Ticket #1043
                      </p>
                      <p className="mt-1 font-serif text-[19px] font-semibold leading-none">
                        Table 12
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-tomato px-1.5 py-0.5 font-mono text-[6.5px] text-cream">
                      <Clock3 className="h-2 w-2" />
                      22 min
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-[9px]">
                    <p>
                      <span className="font-mono text-[8px] text-tomato">2x</span> Jollof &amp;
                      peppered plantain
                    </p>
                    <p>
                      <span className="font-mono text-[8px] text-tomato">1x</span> Tandoori
                      chicken pizza
                    </p>
                    <p className="rounded-[3px] bg-tomato/10 px-1.5 py-0.5 text-[8px] italic text-tomato-deep">
                      No onions on the jollof
                    </p>
                  </div>
                  <div className="mt-2.5 grid grid-cols-2 gap-1">
                    <span className="flex h-6 items-center justify-center rounded-[3px] bg-forest font-mono text-[7px] uppercase tracking-[0.05em] text-cream">
                      Mark ready
                    </span>
                    <span className="flex h-6 items-center justify-center rounded-[3px] border border-line font-mono text-[7px] uppercase tracking-[0.05em] text-muted">
                      Note
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-4">
            <article className="flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-cream">
              <div className="relative h-[168px]">
                <Image
                  src="/menu/tandoori-pizza.jpg"
                  alt="Tandoori chicken pizza"
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-forest backdrop-blur">
                  86 in one tap
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-[26px] font-semibold leading-[1.02] tracking-[-0.04em] text-forest">
                  The menu is the shopfront.
                </h3>
                <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
                  Turn a dish off the moment it runs out. The guest menu hides it at every
                  table, before a waiter has to apologise for it.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={60} className="lg:col-span-4">
            <article className="flex h-full flex-col rounded-[12px] border border-line bg-cream p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-tomato">
                  Access
                </span>
                <QrCode className="h-4 w-4 text-forest/25" />
              </div>
              <h3 className="mt-4 font-serif text-[26px] font-semibold leading-[1.02] tracking-[-0.04em] text-forest">
                One code per table.
              </h3>
              <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
                Print it once. Change the menu whenever you like. The code never needs to be
                replaced.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {[9, 12, 15].map((table) => (
                  <div
                    key={table}
                    className="rounded-[5px] border border-line bg-white p-1.5 text-center"
                  >
                    <QrMark className="mx-auto h-9 w-9 text-forest" title={`Table ${table} code`} />
                    <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.08em] text-muted">
                      T{table}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <article className="flex h-full flex-col rounded-[12px] border border-line bg-cream p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-tomato">
                  Intelligence
                </span>
                <BarChart3 className="h-4 w-4 text-forest/25" />
              </div>
              <h3 className="mt-4 font-serif text-[26px] font-semibold leading-[1.02] tracking-[-0.04em] text-forest">
                The week, without the spreadsheet.
              </h3>
              <div className="mt-4 flex h-[66px] items-end gap-1">
                {[38, 44, 40, 55, 72, 84, 64].map((height, index) => (
                  <span
                    key={index}
                    className={cn(
                      "flex-1 rounded-t-[2px]",
                      index === 5 ? "bg-tomato" : "bg-sand-deep",
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
                <span className="flex items-center gap-1.5 text-[10.5px] text-muted">
                  <TrendingUp className="h-3 w-3 text-moss" />
                  Revenue up 12.4%
                </span>
                <span className="flex items-center gap-1 rounded-full bg-butter/25 px-1.5 py-0.5 font-mono text-[7.5px] text-forest">
                  <Star className="h-2 w-2 fill-forest" />
                  4.7
                </span>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
