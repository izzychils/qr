"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BellRing,
  Check,
  ClipboardList,
  Search,
  ShoppingBag,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { Modal } from "@/components/ui/modal";
import { QrMark } from "@/components/ui/qr-mark";
import { MenuCard } from "@/components/order/menu-card";
import { ItemSheet } from "@/components/order/item-sheet";
import { CartSummary } from "@/components/order/cart-summary";
import { CheckoutModal } from "@/components/order/checkout-modal";
import { AiConcierge } from "@/components/order/ai-concierge";
import {
  categories,
  menu,
  restaurant,
  type MenuCategory,
  type MenuItem,
} from "@/features/menu/data";
import { seedTables } from "@/features/dashboard/tables-data";
import {
  addRequest,
  getRequests,
  placeOrder,
  useCart,
  useSoldOut,
} from "@/lib/store";
import { cn, naira } from "@/lib/utils";

type Diet = "All" | "Spicy" | "No dairy" | "Gluten free" | "Plant based";

const numberWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
];

function tableWord(table: number) {
  return numberWords[table] ?? String(table);
}

const diets: Diet[] = ["All", "Spicy", "No dairy", "Gluten free", "Plant based"];

const dietTest: Record<Diet, (item: MenuItem) => boolean> = {
  All: () => true,
  Spicy: (item) => item.tags.includes("spicy"),
  "No dairy": (item) => !item.tags.includes("contains dairy"),
  "Gluten free": (item) => item.tags.includes("gluten-free"),
  "Plant based": (item) => item.tags.includes("vegan") || item.tags.includes("vegetarian"),
};

export function OrderExperience({ table }: { table: number }) {
  const router = useRouter();
  const cart = useCart(table);
  const [soldOut] = useSoldOut();
  const [category, setCategory] = useState<"All" | MenuCategory>("All");
  const [diet, setDiet] = useState<Diet>("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const floorTable = useMemo(() => seedTables().find((row) => row.number === table), [table]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [wifiOpen, setWifiOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const count = cart.lines.reduce((sum, line) => sum + line.qty, 0);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return menu.filter((item) => {
      const inCategory = category === "All" || item.category === category;
      const inDiet = dietTest[diet](item);
      const inSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.blurb.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.includes(term));
      return inCategory && inDiet && inSearch;
    });
  }, [category, diet, query]);

  const grouped = categories
    .map((group) => ({
      ...group,
      items: filtered.filter((item) => item.category === group.label),
    }))
    .filter((group) => group.items.length);

  const add = (item: MenuItem, options: string[], note: string, qty: number, unitPrice: number) => {
    cart.add(item, options, note, qty, unitPrice);
    setActive(null);
    setCartOpen(false);
    setToast(`${item.name} added to table ${table}.`);
  };

  const quickAdd = (item: MenuItem) => {
    cart.add(item, [], "", 1, item.price);
    setToast(`${item.name} added to table ${table}.`);
  };

  const callWaiter = () => {
    const pending = getRequests().some(
      (request) => request.table === table && !request.resolved && request.type === "waiter",
    );
    if (pending) {
      setToast("A waiter is already on the way.");
      return;
    }
    addRequest(table, "waiter");
    setToast(`A waiter is on the way to table ${table}.`);
  };

  const confirmOrder = (guest: string, note: string) => {
    if (!cart.lines.length) return;
    const order = placeOrder({ table, guest, items: cart.lines, note });
    setCheckoutOpen(false);
    setCartOpen(false);
    router.push(`/order/table-${table}/status?order=${order.id}`);
  };

  return (
    <div className="hide-scroll min-h-screen bg-sand">
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-xl">
        <div className="shell flex h-[62px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] bg-forest text-cream">
              <QrMark className="h-[17px] w-[17px]" title="Table code" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-serif text-[21px] font-semibold leading-none tracking-[-0.045em] text-forest">
                {restaurant.name}
                <span className="text-tomato">.</span>
              </p>
              <p className="mt-1 hidden font-mono text-[8px] uppercase tracking-[0.12em] text-muted sm:block">
                Lekki / Dinner service
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            <span className="font-mono text-[8.5px] uppercase tracking-[0.09em] text-forest">
              Table {table}
            </span>
            <span className="h-3 w-px bg-line" />
            <span className="font-mono text-[8.5px] uppercase tracking-[0.09em] text-muted">
              Open until 23:00
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setWifiOpen(true)}
              className="hidden h-9 items-center gap-1.5 rounded-[12px] border border-line bg-cream px-3 text-[11.5px] font-semibold text-forest transition-colors hover:border-forest/35 sm:flex"
            >
              <Wifi className="h-3.5 w-3.5" />
              Wi-Fi
            </button>
            <button
              type="button"
              onClick={callWaiter}
              className="flex h-9 items-center gap-1.5 rounded-[12px] bg-forest px-3 text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine"
            >
              <BellRing className="h-3.5 w-3.5 text-butter" />
              <span className="hidden sm:inline">Call waiter</span>
              <span className="sm:hidden">Waiter</span>
            </button>
          </div>
        </div>
      </header>

      <main className="shell py-4 sm:py-6 lg:py-8">
        <section className="overflow-hidden rounded-[30px] bg-white shadow-soft">
          <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
            <div className="relative z-10 p-5 sm:p-8 lg:p-10 xl:p-12">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                <span className="h-1.5 w-1.5 bg-tomato" />
                Ember &amp; Rice / Table {table}
              </div>
              <h1 className="display mt-4 text-[clamp(2.65rem,5.4vw,4.55rem)] text-forest">
                Good evening,
                <br />
                <span className="display-italic text-tomato">table {tableWord(table)}.</span>
              </h1>
              <p className="mt-4 max-w-[460px] text-[13.5px] leading-relaxed text-muted sm:text-[13px]">
                The kitchen is open until 23:00. Order from the menu, add to the table
                through the night, and settle one bill when the plates are clear.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-muted">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-forest/45" />
                  {floorTable?.seats ?? 4} seats
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                  {floorTable?.waiter ?? "Ife B."} is looking after you
                </span>
                <span className="flex items-center gap-1.5">
                  <Wifi className="h-3.5 w-3.5 text-forest/45" />
                  Guest Wi-Fi
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <ActionButton href="/menu" variant="forest" size="md">
                  Browse the menu
                </ActionButton>
                <ActionButton
                  variant="cream"
                  size="md"
                  arrow={false}
                  onClick={() => setAiOpen(true)}
                >
                  <Sparkles className="h-3.5 w-3.5 text-tomato" />
                  Ask the menu
                </ActionButton>
              </div>

              <div className="mt-7 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-forest p-1.5 text-cream">
                  <QrMark className="h-full w-full" title="Scanned table code" />
                </span>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-forest">
                    Scanned at this table
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-muted">
                    No app, no account. Everyone can add to the shared bill.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[230px] lg:min-h-[430px]">
              <Image
                src="/menu/jollof-platter.jpg"
                alt="Jollof rice, peppered plantain and stewed chicken at Ember and Rice"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/15 to-transparent lg:bg-gradient-to-r lg:from-forest/55 lg:via-transparent lg:to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-[14px] border border-cream/20 bg-forest/80 p-3 text-cream backdrop-blur-md sm:left-auto sm:right-4 sm:w-[290px]">
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-butter">
                  Tonight&apos;s special
                </p>
                <div className="mt-1.5 flex items-end justify-between gap-3">
                  <p className="font-serif text-[18px] font-semibold leading-tight">
                    Jollof &amp; peppered plantain
                  </p>
                  <span className="price shrink-0 text-[12px]">₦10,500</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section id="menu" className="min-w-0 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
              <div>
                <p className="eyebrow text-muted">The dinner menu</p>
                <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-none tracking-[-0.045em] text-forest">
                  Cooked to order.
                </h2>
              </div>
              <div className="w-full sm:w-[250px]">
                <p className="text-[12.5px] leading-relaxed text-muted">
                  Prices in naira. Service and VAT are added to the table bill, never hidden
                  in the dish.
                </p>
                <label className="relative mt-2.5 block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted/60" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="search"
                    placeholder="Search the menu"
                    aria-label="Search the menu"
                    className="h-9 w-full rounded-[12px] border border-line bg-cream pl-9 pr-3 text-[12.5px] text-forest placeholder:text-muted/55 focus:border-forest focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <div className="sticky top-[62px] z-30 -mx-1 mt-4 bg-sand/95 px-1 py-2 backdrop-blur-md">
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
                {(["All", ...categories.map((item) => item.label)] as const).map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCategory(label)}
                    aria-pressed={category === label}
                    className={cn(
                      "h-9 shrink-0 rounded-[12px] border px-3 font-mono text-[9px] uppercase tracking-[0.07em] transition-colors",
                      category === label
                        ? "border-forest bg-forest text-cream"
                        : "border-line bg-cream text-muted hover:border-forest/35 hover:text-forest",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="no-scrollbar mt-2 flex items-center gap-1.5 overflow-x-auto">
                <span className="mr-1 shrink-0 font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted/70">
                  Filter
                </span>
                {diets.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDiet(item)}
                    aria-pressed={diet === item}
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-1 text-[11.5px] transition-colors",
                      diet === item
                        ? "border-tomato bg-tomato/10 text-tomato-deep"
                        : "border-line bg-cream text-muted hover:border-forest/30 hover:text-forest",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {grouped.length ? (
              <div>
                {grouped.map((group) => (
                  <section key={group.label} className="mt-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2.5">
                      <h3 className="font-serif text-[24px] font-semibold tracking-[-0.035em] text-forest">
                        {group.label}
                      </h3>
                      <span className="font-mono text-[9px] uppercase tracking-[0.09em] text-muted">
                        {group.note} / {group.items.length}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {group.items.map((item) => (
                        <MenuCard
                          key={item.id}
                          item={item}
                          index={menu.findIndex((entry) => entry.id === item.id)}
                          soldOut={soldOut.includes(item.id)}
                          onOpen={() => setActive(item)}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="mt-8 flex min-h-[240px] flex-col items-center justify-center rounded-[24px] border border-dashed border-line bg-cream/60 px-6 text-center">
                <Search className="h-5 w-5 text-muted/50" />
                <p className="mt-3 font-serif text-[22px] font-semibold text-forest">
                  Nothing matches that yet.
                </p>
                <p className="mt-1.5 max-w-[280px] text-[12px] leading-relaxed text-muted">
                  Try a shorter search, a different category or a wider diet filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                    setDiet("All");
                  }}
                  className="mt-4 h-9 rounded-[12px] border border-forest/25 px-4 text-[12px] font-semibold text-forest transition-colors hover:border-forest"
                >
                  Clear everything
                </button>
              </div>
            )}
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-[84px] space-y-3">
              <CartSummary
                table={table}
                lines={cart.lines}
                onQty={cart.setQty}
                onRemove={cart.remove}
                onCheckout={() => setCheckoutOpen(true)}
              />
              <div className="relative overflow-hidden rounded-[24px] bg-forest p-4 text-cream">
                <div className="dot-field absolute inset-0 opacity-25" />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-butter" />
                    <span className="label text-butter">Ask the menu</span>
                  </div>
                  <p className="mt-2 font-serif text-[19px] font-semibold leading-tight">
                    Not sure what the table wants?
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-cream/55">
                    Tell it a budget, a heat level or what to avoid. It reads tonight&apos;s
                    menu, not a generic list.
                  </p>
                  <button
                    type="button"
                    onClick={() => setAiOpen(true)}
                    className="mt-3 h-8 rounded-[12px] bg-butter px-3 text-[11.5px] font-semibold text-forest transition-colors hover:bg-cream"
                  >
                    Open the assistant
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="h-20 lg:hidden" />
      </main>

      {count > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-3 py-3 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex h-12 w-full items-center justify-between gap-3 rounded-[14px] bg-forest px-4 text-cream"
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold">
              <ShoppingBag className="h-4 w-4 text-butter" />
              View table order
            </span>
            <span className="price text-[12px] text-cream/80">
              {count} {count === 1 ? "item" : "items"} / {naira(cart.totals.total)}
            </span>
          </button>
        </div>
      ) : null}

      <ItemSheet
        item={active}
        soldOut={active ? soldOut.includes(active.id) : false}
        onClose={() => setActive(null)}
        onAdd={add}
      />

      <Modal open={cartOpen} onClose={() => setCartOpen(false)} label={`Table ${table} bill`} size="md">
        <div className="p-4 sm:p-5">
          <CartSummary
            compact
            table={table}
            lines={cart.lines}
            onQty={cart.setQty}
            onRemove={cart.remove}
            onCheckout={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}
            onAddMore={() => setCartOpen(false)}
          />
        </div>
      </Modal>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        table={table}
        lines={cart.lines}
        onConfirm={confirmOrder}
      />

      <AiConcierge
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onAdd={(item) => {
          quickAdd(item);
        }}
      />

      <Modal open={wifiOpen} onClose={() => setWifiOpen(false)} label="Guest Wi-Fi" size="sm">
        <div className="p-5 sm:p-6">
          <h2 className="font-serif text-[27px] font-semibold tracking-[-0.04em] text-forest">
            Stay a little longer.
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            The guest network is open while you are at the table.
          </p>
          <div className="mt-4 rounded-[14px] border border-line bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="label text-muted">Network</span>
              <span className="font-mono text-[12px] text-forest">emberguest</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
              <span className="label text-muted">Password</span>
              <span className="font-mono text-[12px] text-forest">welcome2026</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText("welcome2026");
              setToast("Wi-Fi password copied.");
              setWifiOpen(false);
            }}
            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-[14px] bg-forest text-[12.5px] font-semibold text-cream"
          >
            <ClipboardList className="h-3.5 w-3.5" />
            Copy the password
          </button>
        </div>
      </Modal>

      {toast ? (
        <div className="pointer-events-none fixed bottom-24 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-[12px] font-medium text-cream shadow-plate lg:bottom-8">
          <Check className="h-3 w-3 text-butter" strokeWidth={3} />
          {toast}
        </div>
      ) : null}
    </div>
  );
}
