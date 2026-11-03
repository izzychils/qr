import { ArrowUpRight, ChefHat, Leaf, Sparkles, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const features = [
  {
    icon: Sparkles,
    title: "A menu assistant, not a search box",
    copy: "It reads tonight's menu, the price, the heat and the allergens. It recommends from what the kitchen can actually serve.",
  },
  {
    icon: TrendingUp,
    title: "Demand before the rush",
    copy: "Sales history, time of day and the day of the week turn into a prep number a manager can act on, not a dashboard to admire.",
  },
  {
    icon: Leaf,
    title: "The slow dish, named early",
    copy: "Low-stock ingredients, slow sellers and long station times are flagged while there is still time to change the prep list.",
  },
];

export function AiSection() {
  return (
    <section id="ai" className="scroll-mt-20 pb-14 sm:pb-20">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[14px] border border-line-dark bg-forest p-5 text-cream sm:p-8 lg:p-10">
            <div className="poster-grid absolute inset-0 opacity-40" />
            <div className="absolute right-[-160px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(217,82,44,0.28),transparent_65%)]" />

            <div className="relative grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow text-butter">The AI layer</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-cream/30">
                    Grounded in the restaurant
                  </span>
                </div>
                <h2 className="mt-5 max-w-[560px] font-serif text-[clamp(2.4rem,4.4vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                  An assistant that has read the menu.
                </h2>
                <p className="mt-4 max-w-[480px] text-[12px] leading-relaxed text-cream/50">
                  It knows the dish, the price, the prep time and the note the kitchen already
                  wrote. It does not invent a special, a stock count or an allergen.
                </p>

                <div className="mt-6 rounded-[10px] border border-cream/12 bg-cream/[0.04] p-3 sm:p-4">
                  <div className="flex items-center justify-between border-b border-cream/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tomato text-cream">
                        <Sparkles className="h-3 w-3" />
                      </span>
                      <span className="font-serif text-[15px] font-semibold">Ember assistant</span>
                    </div>
                    <span className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-cream/25">
                      Live menu
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    <div className="flex justify-end">
                      <p className="max-w-[85%] rounded-[8px] border border-tomato/25 bg-tomato/15 px-3 py-2.5 text-[11.5px] leading-relaxed text-cream/85">
                        Something spicy under ₦10,000, for two.
                      </p>
                    </div>
                    <div className="flex">
                      <div className="max-w-[92%] rounded-[8px] border border-cream/10 bg-cream/[0.05] px-3 py-2.5 text-[11.5px] leading-relaxed text-cream/70">
                        <p>
                          The street tacos and the beef shawarma both stay under ₦10,000 and
                          carry real heat. Order one of each and the table is covered for
                          ₦16,000 before service.
                        </p>
                        <div className="mt-2 grid gap-1.5">
                          {[
                            ["Street tacos", "₦8,500", "12 min"],
                            ["Beef shawarma", "₦7,500", "10 min"],
                          ].map(([name, price, time]) => (
                            <div
                              key={name}
                              className="flex items-center justify-between gap-2 rounded-[4px] border border-cream/10 bg-forest/60 px-2 py-1.5"
                            >
                              <span className="text-[8.5px] font-medium">{name}</span>
                              <span className="ml-auto font-mono text-[7px] text-cream/35">{time}</span>
                              <span className="font-mono text-[7.5px] text-butter">{price}</span>
                              <span className="rounded-full bg-tomato px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.05em] text-cream">
                                Add
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-cream/10 pt-2.5">
                    <span className="font-mono text-[6.5px] uppercase tracking-[0.06em] text-cream/25">
                      Source / menu, 17 dishes, 18:40
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-cream/15 px-2 py-1 font-mono text-[6px] uppercase tracking-[0.08em] text-cream/35">
                      <ChefHat className="h-2.5 w-2.5" />
                      Ask the pass
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-2.5">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="rounded-[8px] border border-cream/10 bg-cream/[0.035] p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-butter/15 text-butter">
                          <Icon className="h-3 w-3" />
                        </span>
                        <p className="font-serif text-[17px] font-semibold leading-tight">
                          {feature.title}
                        </p>
                      </div>
                      <p className="mt-2 text-[11px] leading-relaxed text-cream/50">{feature.copy}</p>
                    </div>
                  );
                })}

                <p className="mt-1 flex items-start gap-2 border-t border-cream/10 pt-3 text-[10px] leading-relaxed text-cream/40">
                  <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0 text-butter/60" />
                  Suggestions need a manager&apos;s approval. Guest-facing allergen information
                  always comes from the menu record, never from a model.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
