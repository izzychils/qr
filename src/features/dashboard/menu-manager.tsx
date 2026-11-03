"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal, UtensilsCrossed } from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { Modal } from "@/components/ui/modal";
import { MenuArt } from "@/components/order/menu-art";
import {
  categories,
  menu,
  tagLabels,
  type MenuCategory,
  type MenuItem,
} from "@/features/menu/data";
import { toggleSoldOut, useSoldOut } from "@/lib/store";
import { cn, naira } from "@/lib/utils";

export function MenuManager() {
  const [soldOut] = useSoldOut();
  const [category, setCategory] = useState<"All" | MenuCategory>("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return menu.filter((item) => {
      const inCategory = category === "All" || item.category === category;
      const inSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.includes(term));
      return inCategory && inSearch;
    });
  }, [category, query]);

  const out = menu.filter((item) => soldOut.includes(item.id));
  const activeIsOut = active ? soldOut.includes(active.id) : false;

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Menu / 17 items"
        title="What the kitchen can actually serve."
        description="Turn a dish off the moment it runs out. The guest menu updates with it, so no one orders something the pass cannot make."
        action={
          <Link
            href="/order/table-12"
            className="flex h-9 items-center gap-1.5 rounded-[12px] bg-forest px-3 text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine"
          >
            View guest menu
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {[
          { label: "On the menu", value: String(menu.length), note: "Seven categories" },
          { label: "Available now", value: String(menu.length - out.length), note: "Ready to order" },
          { label: "86'd tonight", value: String(out.length), note: "Hidden from the guest menu" },
          { label: "Average price", value: naira(Math.round(menu.reduce((sum, item) => sum + item.price, 0) / menu.length)), note: "Before service and VAT" },
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

      <div className="flex flex-col gap-2.5 xl:flex-row xl:items-center xl:justify-between">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {(["All", ...categories.map((item) => item.label)] as const).map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setCategory(label)}
              aria-pressed={category === label}
              className={cn(
                "h-8 shrink-0 rounded-[12px] border px-2.5 font-mono text-[11.5px] uppercase tracking-[0.06em] transition-colors",
                category === label
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-cream text-muted hover:border-forest/35 hover:text-forest",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="relative block w-full xl:w-[260px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted/60" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search dishes or dietary tags"
            aria-label="Search the menu"
            className="h-9 w-full rounded-[12px] border border-line bg-cream pl-9 pr-3 text-[12px] text-forest placeholder:text-muted/55 focus:border-forest focus:outline-none"
          />
        </label>
      </div>

      <section className="overflow-hidden rounded-[20px] border border-line bg-cream">
        <div className="hidden grid-cols-[1.5fr_0.9fr_90px_1fr_130px] items-center gap-3 border-b border-line px-4 py-2.5 font-mono text-[7px] uppercase tracking-[0.08em] text-muted/70 lg:grid">
          <span>Dish</span>
          <span>Category</span>
          <span>Price</span>
          <span>Dietary</span>
          <span className="text-right">Guest menu</span>
        </div>
        <div className="divide-y divide-line/80">
          {filtered.map((item) => {
            const isOut = soldOut.includes(item.id);
            return (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2.5 transition-colors hover:bg-sand/50 sm:px-4 lg:grid-cols-[1.5fr_0.9fr_90px_1fr_130px]"
              >
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="flex min-w-0 items-center gap-3 text-left"
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px] bg-sand-deep">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className={cn("object-cover", isOut && "grayscale")}
                      />
                    ) : item.art ? (
                      <MenuArt art={item.art} />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-serif text-[17px] font-semibold leading-tight tracking-[-0.02em] text-forest">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[11.5px] text-muted">{item.blurb}</span>
                  </span>
                </button>
                <span className="hidden font-mono text-[12px] uppercase tracking-[0.05em] text-muted lg:block">
                  {item.category}
                </span>
                <span className="price hidden text-[11.5px] text-forest lg:block">{naira(item.price)}</span>
                <div className="hidden flex-wrap gap-1 lg:flex">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.04em] text-muted"
                    >
                      {tagLabels[tag]}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span
                    className={cn(
                      "hidden font-mono text-[7.5px] uppercase tracking-[0.05em] sm:block",
                      isOut ? "text-tomato" : "text-moss",
                    )}
                  >
                    {isOut ? "86'd" : "Live"}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={!isOut}
                    aria-label={`${item.name} availability`}
                    onClick={() => toggleSoldOut(item.id)}
                    className={cn(
                      "relative h-5 w-9 rounded-full border transition-colors",
                      isOut ? "border-line bg-sand-deep" : "border-forest bg-forest",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-cream transition-all",
                        isOut ? "left-0.5" : "left-[18px] bg-butter",
                      )}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex flex-col gap-2 rounded-[9px] border border-dashed border-line bg-cream/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-[12px] leading-relaxed text-muted">
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-tomato" />
          Availability is saved in this browser and applies to the guest menu at every table.
        </p>
        <p className="font-mono text-[7.5px] uppercase tracking-[0.07em] text-muted/60">
          Demo data / no POS sync
        </p>
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} label={active?.category ?? "Dish"} size="md">
        {active ? (
          <div>
            <div className="relative aspect-[16/8] w-full overflow-hidden bg-sand-deep">
              {active.image ? (
                <Image src={active.image} alt={active.name} fill sizes="560px" className="object-cover" />
              ) : active.art ? (
                <MenuArt art={active.art} />
              ) : null}
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-[28px] font-semibold leading-none tracking-[-0.04em] text-forest">
                    {active.name}
                  </h2>
                  <p className="price mt-2 text-[13px] text-muted">{naira(active.price)}</p>
                </div>
                <span className="rounded-full border border-line px-2 py-1 font-mono text-[12px] uppercase tracking-[0.07em] text-muted">
                  {active.prep} min
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{active.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.05em] text-muted"
                  >
                    {tagLabels[tag]}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 rounded-[14px] border border-line bg-white px-3.5 py-3">
                <div>
                  <p className="text-[12px] font-semibold text-forest">Available on the guest menu</p>
                  <p className="mt-0.5 text-[11.5px] text-muted">
                    {activeIsOut ? "Hidden until you switch it back on." : "Guests can order this now."}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={!activeIsOut}
                  aria-label={`${active.name} availability`}
                  onClick={() => toggleSoldOut(active.id)}
                  className={cn(
                    "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
                    activeIsOut ? "border-line bg-sand-deep" : "border-forest bg-forest",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream transition-all",
                      activeIsOut ? "left-0.5" : "left-[23px] bg-butter",
                    )}
                  />
                </button>
              </div>

              <Link
                href="/order/table-12"
                className="mt-3 flex h-10 items-center justify-center gap-2 rounded-[12px] border border-line text-[11.5px] font-semibold text-forest transition-colors hover:border-forest/35"
              >
                <UtensilsCrossed className="h-3.5 w-3.5" />
                See it on the guest menu
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
