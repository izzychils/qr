"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  BellRing,
  Check,
  Clock,
  CreditCard,
  Landmark,
  LoaderCircle,
  Printer,
  ReceiptText,
  Smartphone,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Modal } from "@/components/ui/modal";
import { QrMark } from "@/components/ui/qr-mark";
import { findItem, restaurant } from "@/features/menu/data";
import {
  addRequest,
  advanceOrder,
  getRequests,
  payOrder,
  useOrders,
  type Order,
  type OrderStatus as Status,
} from "@/lib/store";
import { cn, clockLabel, naira, shortDate } from "@/lib/utils";

const steps: { status: Exclude<Status, "paid">; label: string; note: string }[] = [
  { status: "new", label: "Received", note: "The kitchen has your order" },
  { status: "preparing", label: "In the kitchen", note: "Cooking to order" },
  { status: "ready", label: "Ready", note: "A waiter is bringing it over" },
  { status: "served", label: "At the table", note: "Plates down, enjoy" },
];

const headlines: Record<Status, string> = {
  new: "Received. The pass has it.",
  preparing: "On the fire. Cooking now.",
  ready: "Ready. It is on the way.",
  served: "At the table. Enjoy it.",
  paid: "Settled. Thank you.",
};

const statusCopy = (status: Status, table: number) => {
  const copies: Record<Status, string> = {
    new: "The kitchen has your order. You can keep adding to the table whenever you like.",
    preparing:
      "The kitchen is working through your order. Your estimated time is above, and a waiter will bring everything over.",
    ready: `Everything is plated. A waiter is carrying it to table ${table}.`,
    served:
      "That is the whole order at the table. Add a drink or settle the bill whenever you are ready.",
    paid: "Your bill is closed and the receipt is saved below. Come back for the next one.",
  };
  return copies[status];
};

const questions = [
  {
    clue: "It is not an ingredient, but it is why the jollof tastes like the room.",
    question: "What gives our jollof its smoke?",
    options: ["Smoked paprika", "Firewood", "Brown sugar", "Soy sauce"],
    answer: "Firewood",
    note: "The rice is finished over firewood, which is why the smoke sits in the grain rather than on top.",
  },
  {
    clue: "It goes in green and comes out darker, softer and a little bitter.",
    question: "What makes efo riro green?",
    options: ["Basil", "Kale", "Spinach", "Parsley"],
    answer: "Spinach",
    note: "Efo is built on spinach, cooked down with roasted pepper, onion and palm oil.",
  },
  {
    clue: "It is the reason the drink is red, and it is not strawberry.",
    question: "What colours a Chapman?",
    options: ["Hibiscus", "Blackcurrant", "Grenadine", "Beetroot"],
    answer: "Blackcurrant",
    note: "Blackcurrant cordial gives the Chapman its deep red, with citrus and cucumber to keep it fresh.",
  },
];

type PayMethod = {
  id: string;
  label: string;
  note: string;
  icon: typeof CreditCard;
};

const payMethods: PayMethod[] = [
  { id: "Paystack", label: "Paystack", note: "Card, bank transfer or USSD", icon: CreditCard },
  { id: "Bank transfer", label: "Bank transfer", note: "Transfer to the restaurant account", icon: Landmark },
  { id: "USSD", label: "USSD", note: "Dial a short code from any phone", icon: Smartphone },
  { id: "Cash", label: "Cash to the waiter", note: "The waiter brings a printed receipt", icon: Banknote },
];

export function OrderStatus({
  table,
  initialOrderId,
}: {
  table: number;
  initialOrderId: string | null;
}) {
  const [orders, ready] = useOrders();
  const [now, setNow] = useState(Date.now());
  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState("Paystack");
  const [paying, setPaying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const order = useMemo(() => {
    if (!ready) return null;
    const byId = initialOrderId ? orders.find((entry) => entry.id === initialOrderId) : null;
    if (byId) return byId;
    return (
      orders
        .filter((entry) => entry.table === table && entry.status !== "paid")
        .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime())[0] ?? null
    );
  }, [orders, ready, initialOrderId, table]);

  const activeIndex = order
    ? order.status === "paid"
      ? 3
      : Math.max(0, steps.findIndex((step) => step.status === order.status))
    : 0;

  const elapsed = order
    ? Math.max(0, Math.round((now - new Date(order.placedAt).getTime()) / 60000))
    : 0;
  const eta = order
    ? Math.max(
        1,
        Math.max(...order.items.map((line) => findItem(line.itemId)?.prep ?? 12)) - elapsed,
      )
    : 0;
  const count = order ? order.items.reduce((sum, line) => sum + line.qty, 0) : 0;

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

  const activeQuestion = questions[question];

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tomato" />
          Reading the pass
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="hide-scroll min-h-screen bg-sand">
        <StatusHeader table={table} />
        <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-cream text-muted">
            <ReceiptText className="h-5 w-5" />
          </span>
          <h1 className="mt-5 font-serif text-[36px] font-semibold leading-none tracking-[-0.045em] text-forest">
            Nothing open at table {table}.
          </h1>
          <p className="mt-3 max-w-[360px] text-[13.5px] leading-relaxed text-muted">
            Once the table sends an order, the receipt and its live status will appear here.
          </p>
          <Link
            href={`/order/table-${table}`}
            className="mt-6 flex h-11 items-center gap-2 rounded-[14px] bg-forest px-5 text-[13px] font-semibold text-cream"
          >
            Open the menu
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const paid = order.status === "paid";

  return (
    <div className="hide-scroll min-h-screen bg-sand">
      <StatusHeader table={table} />

      <section className="shell pt-3 sm:pt-4">
        <div className="relative overflow-hidden rounded-[28px] bg-[#e7e7e7] px-5 py-7 sm:rounded-[36px] sm:px-9 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.08em]">
                <span className="rounded-full bg-white px-3 py-1.5 text-forest">
                  {order.code}
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-forest">
                  Table {table}
                </span>
                <span className="text-forest/40">
                  {clockLabel(order.placedAt)} / {shortDate(order.placedAt)}
                </span>
              </div>
              <h1 className="mt-5 max-w-[520px] text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold leading-[0.94] tracking-[-0.065em] text-forest">
                {headlines[order.status]}
              </h1>
              <p className="mt-4 max-w-[520px] text-[13px] leading-[1.7] text-forest/55 sm:text-[13.5px]">
                {statusCopy(order.status, table)}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Link
                  href={`/order/table-${table}`}
                  className="flex h-11 items-center gap-2 rounded-full bg-forest px-5 text-[12px] font-semibold text-cream transition-colors hover:bg-pine"
                >
                  Add more dishes
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
                <button
                  type="button"
                  onClick={callWaiter}
                  className="flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[12px] font-semibold text-forest transition-colors hover:bg-sand"
                >
                  <BellRing className="h-3.5 w-3.5" />
                  Call a waiter
                </button>
                <span className="ml-1 flex items-center gap-1.5 text-[11px] text-forest/40">
                  <Clock className="h-3.5 w-3.5" />
                  {order.status === "new" || order.status === "preparing"
                    ? `About ${eta} min to the table`
                    : order.status === "ready"
                      ? "Leaving the pass now"
                      : "Served at the table"}
                </span>
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-5 shadow-soft sm:p-6">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Live status
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-pink px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.08em] text-forest">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                  {paid ? "Closed" : "Open"}
                </span>
              </div>
              <ol className="mt-4 space-y-0">
                {steps.map((step, index) => {
                  const done = index < activeIndex || paid;
                  const current = index === activeIndex && !paid;
                  return (
                    <li key={step.status} className="relative flex gap-3 pb-4 last:pb-0">
                      {index < steps.length - 1 ? (
                        <span
                          className={cn(
                            "absolute left-[10px] top-5 h-[calc(100%-10px)] w-px",
                            done ? "bg-forest/25" : "bg-line",
                          )}
                        />
                      ) : null}
                      <span
                        className={cn(
                          "relative z-10 mt-0.5 flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full border",
                          done
                            ? "border-forest bg-forest text-cream"
                            : current
                              ? "border-tomato bg-white text-tomato"
                              : "border-line bg-white text-transparent",
                        )}
                      >
                        {done ? (
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        ) : current ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
                        ) : null}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "text-[12px] font-semibold leading-none",
                            done || current ? "text-forest" : "text-forest/35",
                          )}
                        >
                          {step.label}
                        </p>
                        <p className="mt-1 text-[10.5px] leading-relaxed text-muted">{step.note}</p>
                      </div>
                      <span className="ml-auto shrink-0 pt-0.5 text-[8px] font-semibold uppercase tracking-[0.07em] text-muted/40">
                        {done && index < activeIndex ? "Done" : current ? "Now" : ""}
                      </span>
                    </li>
                  );
                })}
              </ol>
              {paid ? (
                <div className="mt-2 flex items-center gap-2 rounded-[12px] bg-pink px-3 py-2">
                  <Check className="h-3 w-3 text-forest" strokeWidth={3} />
                  <p className="text-[9px] font-semibold uppercase tracking-[0.05em] text-forest">
                    Paid with {order.paidWith ?? "Paystack"}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <main className="shell py-7 sm:py-9">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <section className="receipt-print rounded-[24px] border border-line bg-cream">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2">
                  <ReceiptText className="h-3.5 w-3.5 text-tomato" />
                  <span className="label text-forest">The receipt</span>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-muted">
                  {count} {count === 1 ? "item" : "items"} / Receipt
                </span>
              </div>
              <div className="px-4 py-4 sm:px-5">
                <ul className="divide-y divide-line/80">
                  {order.items.map((line) => (
                    <li key={line.id} className="flex items-start justify-between gap-4 py-3">
                      <div className="min-w-0">
                        <p className="font-serif text-[17px] font-semibold leading-tight tracking-[-0.02em] text-forest">
                          {line.qty} x {line.name}
                        </p>
                        {line.options.length ? (
                          <p className="mt-1 text-[11px] leading-relaxed text-muted">
                            {line.options.join(" / ")}
                          </p>
                        ) : null}
                        {line.note ? (
                          <p className="mt-1 text-[11px] italic leading-relaxed text-tomato-deep">
                            &ldquo;{line.note}&rdquo;
                          </p>
                        ) : null}
                      </div>
                      <span className="price shrink-0 text-[12.5px] text-forest">
                        {naira(line.unitPrice * line.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
                {order.note ? (
                  <p className="mt-2 rounded-[12px] border border-butter/60 bg-butter/15 px-3 py-2 text-[11.5px] leading-relaxed text-ink">
                    <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
                      Note /
                    </span>{" "}
                    {order.note}
                  </p>
                ) : null}
                <div className="mt-3 space-y-1.5 border-t border-line pt-3.5 text-[11.5px] text-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="price text-forest">{naira(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service 7.5%</span>
                    <span className="price text-forest">{naira(order.service)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT 7.5%</span>
                    <span className="price text-forest">{naira(order.vat)}</span>
                  </div>
                  <div className="mt-2 flex items-end justify-between border-t border-forest/20 pt-2.5">
                    <span className="label text-muted">Total</span>
                    <span className="price text-[17px] text-forest">{naira(order.total)}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[24px] border border-line bg-cream">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-tomato" />
                  <span className="label text-forest">While you wait</span>
                </div>
                <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
                  Question {question + 1} / {questions.length}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-[11px] italic leading-relaxed text-muted">{activeQuestion.clue}</p>
                <h3 className="mt-2 font-serif text-[22px] font-semibold leading-tight tracking-[-0.03em] text-forest">
                  {activeQuestion.question}
                </h3>
                <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {activeQuestion.options.map((option) => {
                    const chosen = answer === option;
                    const correct = option === activeQuestion.answer;
                    const revealed = answer !== null;
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={revealed}
                        onClick={() => setAnswer(option)}
                        className={cn(
                          "flex h-9 items-center justify-between rounded-[12px] border px-3 text-left text-[12px] transition-colors",
                          !revealed && "border-line bg-white hover:border-forest/35",
                          revealed && correct && "border-moss bg-moss/10 text-forest",
                          revealed && chosen && !correct && "border-tomato/50 bg-tomato/10 text-tomato-deep",
                          revealed && !chosen && !correct && "border-line bg-white/50 text-muted/50",
                        )}
                      >
                        {option}
                        {revealed && correct ? (
                          <Check className="h-3 w-3 text-moss" strokeWidth={3} />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                {answer ? (
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                    <p className="max-w-[420px] text-[11.5px] leading-relaxed text-muted">
                      <span className="font-semibold text-forest">
                        {answer === activeQuestion.answer ? "Correct. " : "Not quite. "}
                      </span>
                      {activeQuestion.note}
                    </p>
                    {question < questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setQuestion((current) => current + 1);
                          setAnswer(null);
                        }}
                        className="h-8 rounded-[12px] border border-forest/20 px-3 text-[11.5px] font-semibold text-forest"
                      >
                        Next question
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </section>

            {!paid ? (
              <details className="group rounded-[20px] border border-dashed border-line bg-cream/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[11.5px] font-semibold text-muted">
                  Demo control / move this order through the kitchen
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-muted/60 group-open:hidden">
                    Open
                  </span>
                </summary>
                <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-3">
                  {[
                    { status: "preparing" as Status, label: "Start cooking" },
                    { status: "ready" as Status, label: "Mark ready" },
                    { status: "served" as Status, label: "Mark served" },
                  ].map((action) => (
                    <button
                      key={action.status}
                      type="button"
                      onClick={() => advanceOrder(order.id, action.status)}
                      className={cn(
                        "h-8 rounded-[12px] border px-3 text-[11.5px] font-semibold transition-colors",
                        order.status === action.status
                          ? "border-forest bg-forest text-cream"
                          : "border-line bg-white text-forest hover:border-forest/35",
                      )}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </details>
            ) : null}
          </div>

          <aside className="space-y-4">
            <section className="rounded-[24px] border border-line bg-cream p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="label text-muted">The bill</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-1 font-mono text-[8px] uppercase tracking-[0.07em]",
                    paid ? "bg-moss/15 text-moss" : "bg-tomato/10 text-tomato-deep",
                  )}
                >
                  {paid ? "Paid" : "Open"}
                </span>
              </div>
              <p className="mt-4 font-serif text-[38px] font-semibold leading-none tracking-[-0.05em] text-forest">
                {naira(order.total)}
              </p>
              <p className="mt-1.5 text-[11.5px] text-muted">
                Includes service and VAT. Table {table}, {count} {count === 1 ? "item" : "items"}.
              </p>

              {paid ? (
                <div className="mt-4">
                  <div className="flex items-center gap-2 rounded-[12px] border border-moss/25 bg-moss/[0.07] px-3 py-2.5">
                    <Check className="h-3.5 w-3.5 text-moss" strokeWidth={3} />
                    <div>
                      <p className="text-[11.5px] font-semibold text-forest">
                        Paid with {order.paidWith ?? "Paystack"}
                      </p>
                      <p className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted">
                        Receipt {order.code.replace("#", "R-")}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-[12px] border border-line bg-white text-[12px] font-semibold text-forest"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print the receipt
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setPayOpen(true)}
                    className="mt-4 flex h-12 w-full items-center justify-between rounded-full bg-forest px-5 text-[13px] font-semibold text-cream transition-colors hover:bg-pine"
                  >
                    <span>Settle the table</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  <p className="mt-2.5 text-center font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.05em] text-muted/70">
                    Paystack, transfer, USSD or cash. No account.
                  </p>
                </>
              )}
            </section>

            <section className="rounded-[24px] border border-line bg-cream p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <QrMark className="h-4 w-4 text-forest" title="Table code" />
                <span className="label text-forest">At the table</span>
              </div>
              <div className="mt-3 space-y-2.5 border-t border-line pt-3 text-[11.5px] text-muted">
                <div className="flex items-center justify-between gap-3">
                  <span>Restaurant</span>
                  <span className="font-semibold text-forest">{restaurant.name}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Table</span>
                  <span className="font-semibold text-forest">Table {table}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Waiter</span>
                  <span className="font-semibold text-forest">Ife B.</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Kitchen closes</span>
                  <span className="font-semibold text-forest">23:00</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-[12px] bg-sand px-3 py-2">
                <Utensils className="h-3.5 w-3.5 text-tomato" />
                <p className="text-[11px] leading-relaxed text-muted">
                  Still hungry? Add to the same bill from the menu.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Modal open={payOpen} onClose={() => setPayOpen(false)} label="Settle the table" size="sm">
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label text-muted">Amount due</p>
              <p className="mt-2 font-serif text-[38px] font-semibold leading-none tracking-[-0.05em] text-forest">
                {naira(order.total)}
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream">
              <CreditCard className="h-4 w-4" />
            </span>
          </div>

          <fieldset className="mt-5">
            <legend className="text-[12px] font-semibold text-forest">How would you like to pay?</legend>
            <div className="mt-2.5 space-y-1.5">
              {payMethods.map((option) => {
                const Icon = option.icon;
                const active = method === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMethod(option.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[14px] border px-3 py-2.5 text-left transition-colors",
                      active ? "border-forest bg-forest text-cream" : "border-line bg-white text-forest hover:border-forest/35",
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active ? "text-butter" : "text-tomato")} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] font-semibold">{option.label}</span>
                      <span className={cn("mt-0.5 block text-[9.5px]", active ? "text-cream/50" : "text-muted")}>
                        {option.note}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border",
                        active ? "border-butter bg-butter text-forest" : "border-line",
                      )}
                    >
                      {active ? <Check className="h-2 w-2" strokeWidth={4} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <p className="mt-3 text-[9.5px] leading-relaxed text-muted">
            Apple Pay and Google Pay appear only where the payment provider, device and country
            support them. In Nigeria, Paystack covers cards, bank transfer and USSD.
          </p>

          <button
            type="button"
            disabled={paying}
            onClick={() => {
              setPaying(true);
              window.setTimeout(() => {
                payOrder(order.id, method);
                setPaying(false);
                setPayOpen(false);
                setToast(`Payment received with ${method}.`);
              }, 900);
            }}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-forest text-[13px] font-semibold text-cream transition-colors hover:bg-pine disabled:opacity-60"
          >
            {paying ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : null}
            {paying ? "Confirming payment" : `Pay ${naira(order.total)}`}
          </button>
          <p className="mt-2.5 text-center font-mono text-[8px] uppercase tracking-[0.07em] text-muted/70">
            Demo payment. No money is taken.
          </p>
        </div>
      </Modal>

      {toast ? (
        <div className="fixed bottom-8 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-[12px] font-medium text-cream shadow-plate">
          <Check className="h-3 w-3 text-butter" strokeWidth={3} />
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function StatusHeader({ table }: { table: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-xl">
      <div className="shell flex h-[64px] items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden h-3.5 w-px bg-line sm:block" />
          <span className="hidden text-[11.5px] font-medium text-muted sm:block">
            Ember &amp; Rice / Table {table}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-[9px] font-semibold uppercase tracking-[0.08em] text-muted/60 md:block">
            Order status
          </span>
          <Link
            href={`/order/table-${table}`}
            className="flex h-9 items-center gap-1.5 rounded-full bg-[#f2f2f2] px-4 text-[11px] font-semibold text-forest transition-colors hover:bg-sand-deep"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Menu
          </Link>
        </div>
      </div>
    </header>
  );
}
