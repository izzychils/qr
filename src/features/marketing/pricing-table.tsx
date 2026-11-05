"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { cn, naira } from "@/lib/utils";

const plans = [
  {
    name: "Table",
    tag: "One room",
    monthly: 45_000,
    annual: 450_000,
    copy: "For an independent restaurant putting its menu on every table.",
    features: [
      "Up to 20 tables",
      "QR menus and ordering",
      "Shared table bills",
      "Live order dashboard",
      "Kitchen display, one station",
      "Weekly service report",
    ],
    muted: ["Multi-branch intelligence", "Named onboarding"],
    cta: "Start with one room",
    href: "/login",
    highlight: false,
  },
  {
    name: "Service",
    tag: "Full service",
    monthly: 85_000,
    annual: 850_000,
    copy: "For a full-service restaurant running lunch and dinner every day.",
    features: [
      "Up to 60 tables",
      "Everything in Table",
      "Unlimited kitchen stations",
      "Waiter assignment and requests",
      "Paystack, transfer and USSD",
      "AI demand and waste briefings",
      "Menu, price and 86 controls",
    ],
    muted: ["Multi-branch intelligence"],
    cta: "Run a full service",
    href: "/login",
    highlight: true,
  },
  {
    name: "Group",
    tag: "Multi-branch",
    monthly: null,
    annual: null,
    copy: "For restaurant groups that need one view across every location.",
    features: [
      "Unlimited tables and branches",
      "Everything in Service",
      "Multi-branch intelligence",
      "Consolidated revenue and covers",
      "Staff roles and permissions",
      "Named onboarding and support",
      "Custom payment routing",
    ],
    muted: [],
    cta: "Talk to the team",
    href: "mailto:hello@sideplate.online",
    highlight: false,
  },
];

export function PricingTable() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      <div className="flex flex-col items-center gap-2.5">
        <div className="inline-flex rounded-full bg-[#f2f2f2] p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={cn(
              "h-9 rounded-full px-5 text-[11.5px] font-semibold transition-colors",
              !annual ? "bg-forest text-cream" : "text-muted hover:text-forest",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={cn(
              "flex h-9 items-center gap-2 rounded-full px-5 text-[11.5px] font-semibold transition-colors",
              annual ? "bg-forest text-cream" : "text-muted hover:text-forest",
            )}
          >
            Annual
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.05em]",
                annual ? "bg-pink text-forest" : "bg-white text-muted",
              )}
            >
              2 months free
            </span>
          </button>
        </div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-muted/55">
          Demo pricing / prices in naira
        </p>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = plan.monthly === null ? null : annual ? Math.round(plan.annual! / 12) : plan.monthly;
          return (
            <article
              key={plan.name}
              className={cn(
                "flex h-full flex-col rounded-[26px] border p-5 sm:p-6",
                plan.highlight
                  ? "border-line-dark bg-forest text-cream"
                  : "border-line bg-cream text-ink",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={cn(
                      "text-[9.5px] font-semibold uppercase tracking-[0.1em]",
                      plan.highlight ? "text-pink" : "text-muted",
                    )}
                  >
                    {plan.tag}
                  </p>
                  <h2 className="mt-2 text-[30px] font-bold leading-none tracking-[-0.055em]">
                    {plan.name}
                  </h2>
                </div>
                {plan.highlight ? (
                  <span className="rounded-full bg-pink px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.06em] text-forest">
                    Most chosen
                  </span>
                ) : null}
              </div>

              <p
                className={cn(
                  "mt-3 min-h-[46px] text-[12px] leading-relaxed",
                  plan.highlight ? "text-cream/50" : "text-muted",
                )}
              >
                {plan.copy}
              </p>

              <div className="mt-5">
                {price === null ? (
                  <p className="text-[38px] font-extrabold leading-none tracking-[-0.06em]">
                    Let&apos;s talk
                  </p>
                ) : (
                  <div className="flex items-end gap-1.5">
                    <p className="text-[42px] font-extrabold leading-none tracking-[-0.065em]">
                      {naira(price)}
                    </p>
                    <span
                      className={cn(
                        "mb-1 text-[10.5px]",
                        plan.highlight ? "text-cream/40" : "text-muted/70",
                      )}
                    >
                      / month
                    </span>
                  </div>
                )}
                <p
                  className={cn(
                    "mt-1.5 text-[9px] font-semibold uppercase tracking-[0.06em]",
                    plan.highlight ? "text-cream/35" : "text-muted/60",
                  )}
                >
                  {price === null
                    ? "Annual group agreement"
                    : annual
                      ? `Billed ${naira(plan.annual!)} yearly`
                      : "Billed monthly, cancel anytime"}
                </p>
              </div>

              <Link
                href={plan.href}
                className={cn(
                  "group mt-5 flex h-11 items-center justify-center gap-2 rounded-full text-[12px] font-semibold transition-colors",
                  plan.highlight
                    ? "bg-pink text-forest hover:bg-[#ffa1ba]"
                    : "border border-forest/20 text-forest hover:border-forest hover:bg-forest hover:text-cream",
                )}
              >
                {plan.cta}
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <div
                className={cn(
                  "mt-6 border-t pt-4",
                  plan.highlight ? "border-cream/10" : "border-line",
                )}
              >
                <p
                  className={cn(
                    "text-[9px] font-semibold uppercase tracking-[0.08em]",
                    plan.highlight ? "text-cream/35" : "text-muted/60",
                  )}
                >
                  What is included
                </p>
                <ul className="mt-3 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[11.5px] leading-snug">
                      <Check
                        className={cn("mt-0.5 h-3 w-3 shrink-0", plan.highlight ? "text-pink" : "text-tomato")}
                        strokeWidth={3}
                      />
                      <span className={plan.highlight ? "text-cream/70" : "text-forest/70"}>{feature}</span>
                    </li>
                  ))}
                  {plan.muted.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[11.5px] leading-snug opacity-40">
                      <Minus className="mt-0.5 h-3 w-3 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
