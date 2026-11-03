import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Clock,
  Leaf,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { CategoryBars, ForecastChart } from "@/components/dashboard/charts";
import {
  aiBriefing,
  inventoryWatch,
  prepTimes,
  sentiment,
  topDishes,
  weekRevenue,
} from "@/features/dashboard/data";
import { cn, naira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights",
  description: "Demand, kitchen performance, sentiment and branch intelligence grounded in service data.",
};

const branches = [
  { name: "Ember & Rice, Lekki", revenue: 1_842_500, covers: 146, growth: 12.4, active: true },
  { name: "Ember VI", revenue: 1_214_000, covers: 98, growth: 4.1, active: false },
  { name: "Ember Ikoyi", revenue: 2_064_000, covers: 164, growth: 18.2, active: false },
];

const toneStyles = {
  butter: "border-butter/70 bg-butter/15",
  tomato: "border-tomato/25 bg-tomato/[0.06]",
  moss: "border-moss/25 bg-moss/[0.05]",
};

const toneLabels = {
  butter: "text-[#9a6b00]",
  tomato: "text-tomato-deep",
  moss: "text-moss",
};

export default function InsightsPage() {
  const totalWeek = weekRevenue.reduce((sum, day) => sum + day.value, 0);

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Intelligence / Week 45"
        title="Read the room, then the week."
        description="Demand, kitchen time, sentiment and branch performance, all read from the same records the service runs on."
        action={
          <span className="flex h-9 items-center gap-2 rounded-[12px] border border-line bg-cream px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            Updated 19:42
          </span>
        }
      />

      <div className="grid gap-3 lg:grid-cols-3">
        {aiBriefing.map((brief) => (
          <article
            key={brief.title}
            className={cn("rounded-[20px] border p-4", toneStyles[brief.tone])}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  "font-mono text-[7.5px] uppercase tracking-[0.1em]",
                  toneLabels[brief.tone],
                )}
              >
                {brief.tag}
              </span>
              <Sparkles className="h-3.5 w-3.5 text-forest/25" />
            </div>
            <h2 className="mt-3 font-serif text-[22px] font-semibold leading-[1.05] tracking-[-0.035em] text-forest">
              {brief.title}
            </h2>
            <p className="mt-2 text-[10.5px] leading-relaxed text-muted">{brief.body}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
            <div>
              <h2 className="font-serif text-[22px] font-semibold tracking-[-0.035em] text-forest">
                Tonight&apos;s demand
              </h2>
              <p className="mt-1 text-[11px] text-muted">
                Covers forecast against the same window last Tuesday.
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-butter/30 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.06em] text-[#7a5600]">
              <TrendingUp className="h-2.5 w-2.5" />
              +18%
            </span>
          </div>
          <ForecastChart />
          <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
            The 20:00 window is the peak. Twelve extra jollof portions and eight burger patties
            would cover it without over-prepping the fryer.
          </p>
        </section>

        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-tomato" />
              <h2 className="font-serif text-[22px] font-semibold tracking-[-0.035em] text-forest">
                Prep time by station
              </h2>
            </div>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted/60">
              Minutes
            </span>
          </div>
          <div className="mt-3 space-y-3.5">
            {prepTimes.map((station) => {
              const over = station.average > station.target;
              return (
                <div key={station.station}>
                  <div className="flex items-center justify-between gap-3 text-[10.5px]">
                    <span className="flex items-center gap-2 font-semibold text-forest">
                      {station.station}
                      <span className="font-mono text-[7.5px] font-normal uppercase tracking-[0.05em] text-muted/55">
                        {station.orders} orders
                      </span>
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10.5px]",
                        over ? "text-tomato" : "text-moss",
                      )}
                    >
                      {station.average} / {station.target}
                    </span>
                  </div>
                  <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand-deep">
                    <div
                      className={cn("h-full rounded-full", over ? "bg-tomato" : "bg-moss")}
                      style={{ width: `${Math.min(100, (station.average / 24) * 100)}%` }}
                    />
                    <span
                      className="absolute top-0 h-full w-px bg-forest/40"
                      style={{ left: `${(station.target / 24) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
            The grill is two minutes over target and carries two late tickets. Everything else
            is inside the window.
          </p>
        </section>
      </div>

      <div className="grid gap-3 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <h2 className="font-serif text-[22px] font-semibold tracking-[-0.035em] text-forest">
              Where the money sits
            </h2>
            <span className="price text-[11px] text-forest">{naira(totalWeek)}</span>
          </div>
          <CategoryBars />
          <p className="mt-3 border-t border-line pt-3 font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted/60">
            Share of revenue / last seven days
          </p>
        </section>

        <section className="rounded-[20px] border border-line bg-cream">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
            <h2 className="font-serif text-[22px] font-semibold tracking-[-0.035em] text-forest">
              The dishes doing the work
            </h2>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted/60">
              This week
            </span>
          </div>
          <div className="divide-y divide-line/80">
            {topDishes.map((dish, index) => (
              <div key={dish.name} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <span className="font-mono text-[11px] text-muted/50">0{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11.5px] font-semibold text-forest">{dish.name}</p>
                  <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.05em] text-muted/60">
                    {dish.sold} plates
                  </p>
                </div>
                <span className="price text-[10.5px] text-forest">{naira(dish.revenue)}</span>
                <span
                  className={cn(
                    "flex w-12 items-center justify-end gap-0.5 font-mono text-[11px]",
                    dish.trend >= 0 ? "text-moss" : "text-tomato",
                  )}
                >
                  {dish.trend >= 0 ? (
                    <ArrowUpRight className="h-2.5 w-2.5" />
                  ) : (
                    <ArrowDownRight className="h-2.5 w-2.5" />
                  )}
                  {Math.abs(dish.trend)}%
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
            <div>
              <h2 className="font-serif text-[22px] font-semibold tracking-[-0.035em] text-forest">
                What the room is saying
              </h2>
              <p className="mt-1 text-[11px] text-muted">
                {sentiment.reviews} reviews / last 30 days
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-butter/25 px-2 py-1 font-mono text-[11px] text-forest">
              <Star className="h-2.5 w-2.5 fill-forest" />
              {sentiment.score}
            </span>
          </div>
          <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-sand-deep">
            <span className="bg-moss" style={{ width: `${sentiment.positive}%` }} />
            <span className="bg-butter" style={{ width: `${sentiment.neutral}%` }} />
            <span className="bg-tomato" style={{ width: `${sentiment.negative}%` }} />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[7px] uppercase tracking-[0.05em] text-muted/60">
            <span>{sentiment.positive}% positive</span>
            <span>{sentiment.neutral}% mixed</span>
            <span>{sentiment.negative}% negative</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {sentiment.themes.map((theme) => (
              <span
                key={theme.label}
                className={cn(
                  "rounded-full border px-2 py-1 text-[10.5px]",
                  theme.tone === "positive"
                    ? "border-moss/25 bg-moss/[0.06] text-moss"
                    : "border-tomato/20 bg-tomato/[0.06] text-tomato-deep",
                )}
              >
                {theme.label}
                <span className="ml-1 font-mono text-[7px] opacity-60">{theme.mentions}</span>
              </span>
            ))}
          </div>
          <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
            Service is the strongest theme. The two recurring complaints are Friday wait times
            and music volume on the terrace.
          </p>
        </section>

        <section className="rounded-[20px] border border-line bg-cream p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-3.5 w-3.5 text-moss" />
              <h2 className="font-serif text-[22px] font-semibold tracking-[-0.035em] text-forest">
                Stock to watch
              </h2>
            </div>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted/60">
              Shift check
            </span>
          </div>
          <div className="mt-3 space-y-3">
            {inventoryWatch.map((entry) => (
              <div key={entry.item}>
                <div className="flex items-center justify-between gap-3 text-[10.5px]">
                  <span className="font-semibold text-forest">{entry.item}</span>
                  <span className="font-mono text-[11px] text-muted">{entry.left}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand-deep">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      entry.level < 30 ? "bg-tomato" : entry.level < 60 ? "bg-butter" : "bg-moss",
                    )}
                    style={{ width: `${entry.level}%` }}
                  />
                </div>
                <p className="mt-1 text-[10.5px] text-muted/65">{entry.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
            No stock level here is guessed from a recipe. These counts come from the closing
            check and the grill&apos;s prep list.
          </p>
        </section>
      </div>

      <section className="relative overflow-hidden rounded-[20px] border border-line-dark bg-forest p-4 text-cream sm:p-5">
        <div className="dot-field absolute inset-0 opacity-25" />
        <div className="relative">
          <div className="flex flex-col gap-3 border-b border-cream/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-butter" />
              <h2 className="font-serif text-[22px] font-semibold tracking-[-0.035em]">
                Three rooms, one read.
              </h2>
            </div>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-cream/30">
              Group / tonight
            </span>
          </div>
          <div className="mt-2 divide-y divide-cream/10">
            {branches.map((branch) => (
              <div key={branch.name} className="flex flex-wrap items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[11.5px] font-semibold text-cream">
                    {branch.name}
                    {branch.active ? (
                      <span className="rounded-full bg-butter px-1.5 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.05em] text-forest">
                        This room
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.05em] text-cream/30">
                    {branch.covers} covers
                  </p>
                </div>
                <span className="price text-[11px] text-cream/85">{naira(branch.revenue)}</span>
                <span
                  className={cn(
                    "flex w-14 items-center justify-end gap-0.5 font-mono text-[10.5px]",
                    branch.growth >= 0 ? "text-[#9dbb9f]" : "text-tomato",
                  )}
                >
                  <ArrowUpRight className="h-2.5 w-2.5" />
                  {branch.growth}%
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 border-t border-cream/10 pt-3 font-mono text-[7px] uppercase leading-relaxed tracking-[0.06em] text-cream/30">
            AI reads the records. It does not invent a number, a review or a stock count.
          </p>
        </div>
      </section>
    </div>
  );
}
