"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChefHat,
  Clock3,
  CreditCard,
  Globe2,
  Grid2X2,
  Landmark,
  Plus,
  QrCode,
  ReceiptText,
  Smartphone,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { QrMark } from "@/components/ui/qr-mark";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { restaurant } from "@/features/menu/data";

const slides = [
  {
    eyebrow: "Sideplate / QR ordering",
    title: "Your website",
    accent: "on every table.",
    copy: "The guest scans once. The menu opens, the order reaches the pass and the bill stays shared. No app, no account, no waving across the room.",
    image: "/menu/jollof-platter.jpg",
    alt: "Jollof rice, peppered plantain and stewed chicken at Ember and Rice",
    chipTitle: "Jollof & peppered plantain",
    chipMeta: "Table 12 / House signature",
    chipPrice: "₦10,500",
    cta: "Open table 12",
    href: "/order/table-12",
    secondary: "See how it works",
    secondaryHref: "#how",
  },
  {
    eyebrow: "Kitchen display / live pass",
    title: "The pass,",
    accent: "wide awake.",
    copy: "Every ticket lands once, grouped by station and timed from the first tap. Start cooking, mark it ready, and the guest sees it move on the same second.",
    image: "/menu/glazed-chicken.jpg",
    alt: "Glazed chicken with mash and pepper sauce on the pass",
    chipTitle: "Glazed chicken / Table 12",
    chipMeta: "On the pass / mash and pepper sauce",
    chipPrice: "2 min",
    cta: "Walk the dashboard",
    href: "/login",
    secondary: "Open the guest menu",
    secondaryHref: "/order/table-12",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  const step = (direction: number) =>
    setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="shell pt-3 sm:pt-4">
      <div className="relative overflow-hidden rounded-[28px] bg-[#e7e7e7] sm:rounded-[36px]">
        <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative z-10 flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 lg:min-h-[590px] lg:px-12 lg:py-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-[11px] font-semibold tracking-[-0.01em] text-forest backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
                {slide.eyebrow}
              </span>

              <h1 className="mt-6 text-[clamp(2.9rem,4.8vw,4.5rem)] font-extrabold leading-[0.93] tracking-[-0.065em] text-forest">
                {slide.title}
                <br />
                <span className="text-tomato">{slide.accent}</span>
              </h1>

              <p className="mt-5 max-w-[440px] text-[13.5px] leading-[1.7] text-forest/60 sm:text-[14.5px]">
                {slide.copy}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <ActionButton href={slide.href} variant="tomato" size="lg">
                  {slide.cta}
                </ActionButton>
                <ActionButton href={slide.secondaryHref} variant="cream" size="lg" className="bg-white/80">
                  {slide.secondary}
                </ActionButton>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                {["No guest app", "No account", "One shared bill"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-[11.5px] font-medium text-forest/55">
                    <Check className="h-3 w-3 text-forest" strokeWidth={3} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 bg-white/70 text-forest transition-colors hover:bg-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 bg-white/70 text-forest transition-colors hover:bg-white"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <div className="ml-2 flex items-center gap-1.5">
                  {slides.map((entry, index) => (
                    <button
                      key={entry.eyebrow}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Slide ${index + 1}: ${entry.title}`}
                      aria-current={active === index}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        active === index ? "w-7 bg-forest" : "w-3 bg-forest/20 hover:bg-forest/40",
                      )}
                    />
                  ))}
                </div>
              </div>
              <span className="text-[11px] font-semibold tabular-nums tracking-[0.08em] text-forest/40">
                0{active + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          <div className="relative min-h-[320px] px-3 pb-3 sm:min-h-[380px] sm:px-4 sm:pb-4 lg:min-h-[590px] lg:py-4 lg:pl-0 lg:pr-4">
            <div className="relative h-full min-h-[300px] overflow-hidden rounded-[22px] sm:min-h-[360px] lg:min-h-[558px]">
              {slides.map((entry, index) => (
                <Image
                  key={entry.image}
                  src={entry.image}
                  alt={entry.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className={cn(
                    "object-cover transition-all duration-700 ease-out",
                    active === index ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent" />

              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-forest/75 px-2.5 py-1.5 text-[10px] font-semibold text-cream backdrop-blur">
                <QrCode className="h-3 w-3" />
                Table 12 / Tonight
              </span>

              <div className="absolute inset-x-4 bottom-4 rounded-[18px] bg-white/95 p-4 shadow-soft backdrop-blur sm:left-auto sm:right-4 sm:w-[300px]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-tomato">
                      Live from the table
                    </p>
                    <p className="mt-1.5 text-[15px] font-bold leading-tight tracking-[-0.03em] text-forest">
                      {slide.chipTitle}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">{slide.chipMeta}</p>
                  </div>
                  <span className="price shrink-0 text-[13px] text-forest">{slide.chipPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrustBar />
    </section>
  );
}

function TrustBar() {
  const stats = [
    { value: "4.8", label: "guest rating" },
    { value: "18", label: "tables / one view" },
    { value: "12m", label: "scan to first order" },
    { value: "0", label: "apps to install" },
  ];

  return (
    <div className="flex flex-col gap-6 border-b border-line py-8 sm:flex-row sm:items-end sm:justify-between sm:py-10">
      <h2 className="max-w-[300px] text-[26px] font-bold leading-[1.05] tracking-[-0.055em] text-forest sm:text-[30px]">
        Trusted by <span className="bg-pink px-1.5">rooms</span>
        <br />
        that move.
      </h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 sm:gap-x-10">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-[30px] font-extrabold leading-none tracking-[-0.06em] text-forest">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] font-medium text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type Scene = {
  front: { src: string; alt: string; label: string; meta: string };
  back: { src: string; alt: string; label: string; meta: string };
};

const features: { title: string; copy: string; scene: Scene }[] = [
  {
    title: "Order from the table",
    copy: "The guest scans, browses the live menu and sends the order. No app, no account, no queue at the pass.",
    scene: {
      front: {
        src: "/menu/glazed-chicken.jpg",
        alt: "Glazed chicken and mash served at the table",
        label: "Table 12 / Main",
        meta: "Added to the shared bill",
      },
      back: {
        src: "/menu/jollof-platter.jpg",
        alt: "Jollof rice and peppered plantain",
        label: "Guest menu / Table 12",
        meta: "Cooked to order / 15 min",
      },
    },
  },
  {
    title: "The pass sees it first",
    copy: "A ticket lands in the kitchen the moment it is sent, grouped by station with the guest's note attached.",
    scene: {
      front: {
        src: "/menu/street-tacos.jpg",
        alt: "Street tacos on the pass",
        label: "Ticket #1043 / New",
        meta: "Start cooking / 2 min",
      },
      back: {
        src: "/menu/double-smash.jpg",
        alt: "Double smash burger",
        label: "Grill station / 04",
        meta: "2 patties / no onion",
      },
    },
  },
  {
    title: "One bill, every phone",
    copy: "Everyone adds to the same table bill. Split it or settle it in one go when the plates are clear.",
    scene: {
      front: {
        src: "/menu/jollof-platter.jpg",
        alt: "A table order of jollof and plantain",
        label: "Shared bill / 4 phones",
        meta: "₦43,120 / open",
      },
      back: {
        src: "/menu/creamy-pasta.jpg",
        alt: "Creamy chicken pasta",
        label: "Receipt / Table 12",
        meta: "Paid with transfer",
      },
    },
  },
  {
    title: "Every table has a code",
    copy: "Print a code once. It never needs replacing when the menu, the prices or the kitchen hours change.",
    scene: {
      front: {
        src: "/menu/tandoori-pizza.jpg",
        alt: "Tandoori chicken pizza",
        label: "Table 9 / QR",
        meta: "Scanned 9 times tonight",
      },
      back: {
        src: "/menu/beef-stew.jpg",
        alt: "Smoked beef stew and rice",
        label: "Table 4 / QR",
        meta: "Same code / new menu",
      },
    },
  },
  {
    title: "Read the room after",
    copy: "Demand, prep times, best sellers and slow dishes, read from the same service records the floor uses.",
    scene: {
      front: {
        src: "/menu/arroz-con-pollo.jpg",
        alt: "Arroz con pollo",
        label: "Best seller / 42 plates",
        meta: "Revenue up 12.4%",
      },
      back: {
        src: "/menu/house-burger.jpg",
        alt: "The house burger",
        label: "Insights / Week 45",
        meta: "Peak 20:00 / 36 covers",
      },
    },
  },
];

export function FeatureSwitch() {
  const [active, setActive] = useState(0);
  const feature = features[active];

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="shell">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-forest">
            One system for the whole service.
          </h2>
          <p className="mx-auto mt-4 max-w-[470px] text-[13.5px] leading-[1.7] text-muted sm:text-[14.5px]">
            The menu, the pass, the bill and the read after service. Move through it and watch
            the two surfaces change.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          <Reveal className="relative h-[360px] sm:h-[440px] lg:h-[510px]">
            <div
              key={`back-${active}`}
              className="absolute right-0 top-0 h-[58%] w-[64%] animate-swap overflow-hidden rounded-[24px] border-[5px] border-white bg-sand shadow-soft sm:rounded-[28px]"
              style={{ animationDelay: "60ms" }}
            >
              <Image
                src={feature.scene.back.src}
                alt={feature.scene.back.alt}
                fill
                sizes="(min-width: 1024px) 420px, 60vw"
                className="object-cover"
              />
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-forest">
                  {feature.scene.back.label}
                </p>
              </div>
            </div>

            <div
              key={`front-${active}`}
              className="absolute bottom-0 left-0 h-[64%] w-[76%] animate-swap overflow-hidden rounded-[24px] border-[5px] border-white bg-sand shadow-plate sm:rounded-[28px]"
            >
              <Image
                src={feature.scene.front.src}
                alt={feature.scene.front.alt}
                fill
                sizes="(min-width: 1024px) 480px, 72vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent" />
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-[16px] bg-white/95 p-3.5 backdrop-blur">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-tomato">
                    {feature.scene.front.label}
                  </p>
                  <p className="mt-1 text-[12px] font-semibold leading-snug text-forest">
                    {feature.scene.front.meta}
                  </p>
                </div>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </div>

            <span className="absolute -left-1 top-[44%] hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-forest shadow-soft sm:inline-flex">
              Surface 0{active + 1}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <div className="border-t border-line">
              {features.map((entry, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={entry.title}
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    aria-pressed={isActive}
                    className="group flex w-full items-start gap-3 border-b border-line py-4 text-left sm:gap-4 sm:py-5"
                  >
                    <span
                      className={cn(
                        "mt-2.5 h-2 w-2 shrink-0 rounded-full transition-colors sm:mt-3",
                        isActive ? "bg-tomato" : "bg-line group-hover:bg-forest/25",
                      )}
                    />
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-[24px] font-bold leading-[1.05] tracking-[-0.05em] transition-colors sm:text-[30px]",
                          isActive ? "text-forest" : "text-forest/25 group-hover:text-forest/45",
                        )}
                      >
                        {entry.title}
                      </span>
                      <span
                        className={cn(
                          "mt-1.5 block max-w-[430px] overflow-hidden text-[12.5px] leading-relaxed transition-all duration-300",
                          isActive
                            ? "max-h-24 text-muted opacity-100"
                            : "max-h-0 text-transparent opacity-0 sm:max-h-24 sm:text-muted/40 sm:opacity-100",
                        )}
                      >
                        {entry.copy}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ActionButton href="/order/table-12" variant="forest" size="md">
                Try the guest menu
              </ActionButton>
              <span className="text-[11.5px] text-muted">Same records on both surfaces</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/order/table-12"
            aria-label="Open the demo menu"
            className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-pink text-forest transition-transform hover:-translate-y-0.5"
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="shell scroll-mt-20 py-14 sm:py-20">
      <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-muted">The whole loop</p>
          <h2 className="mt-4 max-w-[560px] text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-forest">
            Three moves.
            <br />
            No new hardware.
          </h2>
        </div>
        <p className="max-w-[270px] text-[13px] leading-relaxed text-muted">
          The phone is already on the table. The QR card is the only thing you print.
        </p>
      </Reveal>

      <div className="mt-9 grid gap-3 lg:grid-cols-3">
        {[
          {
            number: "01",
            title: "The table opens the menu.",
            copy: "A QR card or an NFC tag opens the restaurant's own page for that exact table. No app, no account, no new hardware.",
            visual: <QrCard />,
          },
          {
            number: "02",
            title: "The order reaches the pass.",
            copy: "Guests build the order, customise it and send it. The ticket lands on the kitchen board in the same second, with the note attached.",
            visual: <TicketCard />,
          },
          {
            number: "03",
            title: "One receipt, settled their way.",
            copy: "Everyone adds to the same table. Split it across phones, pay with transfer, card or cash, and keep the receipt.",
            visual: <ReceiptCard />,
          },
        ].map((step, index) => (
          <Reveal key={step.number} delay={index * 70}>
            <article className="flex h-full flex-col rounded-[28px] border border-line bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink text-[11px] font-bold text-forest">
                  {step.number}
                </span>
                <span className="h-px w-10 bg-line" />
              </div>
              <h3 className="mt-6 max-w-[250px] text-[24px] font-bold leading-[1.06] tracking-[-0.045em] text-forest">
                {step.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.7] text-muted">{step.copy}</p>
              <div className="mt-auto pt-7">{step.visual}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function QrCard() {
  return (
    <div className="flex items-center gap-3 rounded-[16px] bg-[#f2f2f2] p-3.5">
      <span className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-[12px] bg-forest p-2 text-cream">
        <QrMark className="h-full w-full" title="Sample table QR" />
      </span>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">Table 12</p>
        <p className="mt-1 text-[15px] font-bold leading-none tracking-[-0.03em] text-forest">Scan to order</p>
        <p className="mt-1.5 text-[10.5px] text-muted">/order/table-12</p>
      </div>
    </div>
  );
}

function TicketCard() {
  return (
    <div className="rounded-[16px] bg-[#f2f2f2] p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-tomato">Ticket #1043</span>
        <span className="rounded-full bg-tomato/10 px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-[0.06em] text-tomato-deep">
          New
        </span>
      </div>
      <p className="mt-1.5 text-[15px] font-bold leading-none tracking-[-0.03em] text-forest">Table 12</p>
      <div className="mt-2 space-y-0.5 text-[10.5px] text-muted">
        <p>2 x Jollof &amp; plantain</p>
        <p>1 x Street tacos</p>
        <p>2 x Zobo fizz</p>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
        <span className="flex items-center gap-1 text-[8.5px] font-semibold uppercase tracking-[0.06em] text-moss">
          <span className="h-1 w-1 rounded-full bg-moss" />
          On the pass
        </span>
        <span className="flex items-center gap-1 text-[8.5px] text-muted">
          <Clock3 className="h-2.5 w-2.5" />2 min
        </span>
      </div>
    </div>
  );
}

function ReceiptCard() {
  return (
    <div className="rounded-[16px] bg-[#f2f2f2] p-3.5">
      <div className="flex items-center justify-between border-b border-dashed border-line pb-2">
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">Table 12 / Receipt</span>
        <span className="flex items-center gap-1 text-[8.5px] font-semibold text-moss">
          <Check className="h-2.5 w-2.5" strokeWidth={3} /> Paid
        </span>
      </div>
      <div className="mt-2 space-y-1 text-[10px] text-muted">
        <p className="flex justify-between"><span>2 x Jollof &amp; plantain</span><span className="text-forest">₦21,000</span></p>
        <p className="flex justify-between"><span>1 x Street tacos</span><span className="text-forest">₦8,500</span></p>
        <p className="flex justify-between"><span>2 x Zobo fizz</span><span className="text-forest">₦5,600</span></p>
      </div>
      <div className="mt-2 flex items-end justify-between border-t border-line pt-2">
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-muted">Total</span>
        <span className="price text-[14px] text-forest">₦43,120</span>
      </div>
    </div>
  );
}

export function Surfaces() {
  return (
    <section id="product" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="shell">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-muted">One system / four surfaces</p>
            <h2 className="mt-4 max-w-[620px] text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-forest">
              The floor and the pass,
              <br />
              finally reading the same thing.
            </h2>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:decoration-forest"
          >
            Walk the dashboard
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <div className="mt-9 grid gap-3 lg:grid-cols-2">
          <Reveal className="lg:col-span-2">
            <article className="grid overflow-hidden rounded-[28px] border border-line bg-[#f2f2f2] md:grid-cols-[1fr_0.9fr]">
              <div className="p-6 sm:p-9">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10.5px] font-semibold text-forest">
                  <QrCode className="h-3 w-3" />
                  Guest menu
                </span>
                <h3 className="mt-5 max-w-[380px] text-[30px] font-extrabold leading-[1] tracking-[-0.055em] text-forest sm:text-[38px]">
                  The menu is the shopfront.
                </h3>
                <p className="mt-3 max-w-[390px] text-[13px] leading-[1.7] text-muted">
                  Turn a dish off the moment it runs out. Every table sees the same menu, the
                  same price and the same honest availability.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Dish options", "Allergens", "Shared bill"].map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1.5 text-[10.5px] font-medium text-forest/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[280px] overflow-hidden md:min-h-[360px]">
                <Image
                  src="/menu/street-tacos.jpg"
                  alt="Street tacos plated"
                  fill
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-[18px] bg-white/95 p-4 backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-tomato">Most ordered</p>
                      <p className="mt-1 text-[16px] font-bold tracking-[-0.03em] text-forest">Street Tacos</p>
                      <p className="mt-0.5 text-[10.5px] text-muted">Three corn tortillas / chipotle crema</p>
                    </div>
                    <span className="price text-[13px] text-forest">₦8,500</span>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {[
            {
              icon: Grid2X2,
              title: "Floor and tables",
              copy: "Who is seated, who is waiting and what needs a person, before the next walk around the room.",
              visual: <FloorMini />,
            },
            {
              icon: ChefHat,
              title: "Kitchen display",
              copy: "Tickets grouped by station and timed from the first tap. New, on the fire, ready for pickup.",
              visual: <KitchenMini />,
            },
            {
              icon: BarChart3,
              title: "Service intelligence",
              copy: "Demand, prep times, best sellers and slow dishes, read from the same records the floor uses.",
              visual: <InsightMini />,
            },
            {
              icon: Sparkles,
              title: "The assistant",
              copy: "Guest questions answered from tonight's menu, the sold-out list and the table bill. Never invented.",
              visual: <AssistantMini />,
            },
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 50}>
                <article className="flex h-full flex-col rounded-[28px] border border-line bg-white p-6 sm:p-7">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink text-forest">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[22px] font-bold leading-[1.08] tracking-[-0.045em] text-forest">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-[1.65] text-muted">{card.copy}</p>
                  <div className="mt-5">{card.visual}</div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FloorMini() {
  const statuses = ["open", "seated", "order", "ready", "open", "seated", "order", "bill", "open", "cleaning", "seated", "ready"];
  const colors: Record<string, string> = {
    open: "bg-[#e8f2ec] text-moss",
    seated: "bg-[#fff0f4] text-tomato-deep",
    order: "bg-[#ffe5ed] text-tomato-deep",
    ready: "bg-[#e7f5ee] text-moss",
    bill: "bg-[#f5eaff] text-[#7c4d9e]",
    cleaning: "bg-[#f0f0f0] text-muted",
  };

  return (
    <div className="rounded-[18px] bg-[#f2f2f2] p-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-muted">Main room</span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-tomato">4 need a person</span>
      </div>
      <div className="mt-2 grid grid-cols-6 gap-1">
        {statuses.map((status, index) => (
          <div key={`${status}-${index}`} className={cn("rounded-[7px] px-1 py-2 text-center", colors[status])}>
            <span className="block text-[12px] font-bold leading-none">{index + 1}</span>
            <span className="mt-1 block text-[6px] font-semibold uppercase tracking-[0.04em]">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KitchenMini() {
  return (
    <div className="rounded-[18px] bg-forest p-3 text-cream">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-cream/45">New tickets / 2</span>
        <span className="rounded-full bg-pink px-2 py-0.5 text-[8px] font-bold text-forest">LIVE</span>
      </div>
      <div className="mt-2 rounded-[10px] bg-cream p-2.5 text-forest">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold tracking-[-0.02em]">Table 12 / #1043</span>
          <span className="text-[8px] font-semibold text-tomato">2 MIN</span>
        </div>
        <p className="mt-1 text-[9.5px] text-muted">2x Jollof / 1x Street tacos</p>
        <div className="mt-1.5 flex items-center justify-between rounded-[5px] bg-forest px-2 py-1 text-[7.5px] font-semibold uppercase tracking-[0.08em] text-cream">
          Start cooking
          <span className="h-1 w-1 rounded-full bg-pink" />
        </div>
      </div>
    </div>
  );
}

function InsightMini() {
  const bars = [42, 68, 54, 82, 74, 58, 48];
  return (
    <div className="rounded-[18px] bg-[#f2f2f2] p-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-muted">Tonight / covers</span>
        <span className="text-[9px] font-semibold text-moss">+12.4%</span>
      </div>
      <div className="mt-2 flex h-[62px] items-end gap-1.5">
        {bars.map((height, index) => (
          <span
            key={height}
            className={cn("flex-1 rounded-t-[3px]", index === 3 ? "bg-tomato" : "bg-forest/15")}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[8px] text-muted">
        <span>18:00</span>
        <span>20:00</span>
        <span>22:00</span>
      </div>
    </div>
  );
}

function AssistantMini() {
  return (
    <div className="rounded-[18px] bg-[#f2f2f2] p-3">
      <div className="flex justify-end">
        <span className="max-w-[85%] rounded-[10px] rounded-br-[4px] bg-forest px-2.5 py-2 text-[9.5px] leading-snug text-cream">
          Something spicy under ₦10,000, for two.
        </span>
      </div>
      <div className="mt-1.5 flex justify-start">
        <span className="max-w-[90%] rounded-[10px] rounded-bl-[4px] bg-white px-2.5 py-2 text-[9.5px] leading-snug text-forest">
          Street tacos and beef shawarma both stay under ₦10,000. One of each covers the table.
        </span>
      </div>
      <div className="mt-1.5 flex items-center justify-between rounded-[7px] bg-white px-2.5 py-1.5">
        <span className="text-[8.5px] font-semibold text-forest">2 dishes / ₦16,000</span>
        <span className="text-[8px] font-semibold uppercase tracking-[0.06em] text-tomato">Add both</span>
      </div>
    </div>
  );
}

export function GuestStory() {
  return (
    <section className="shell py-14 sm:py-20">
      <div className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <Reveal className="relative">
          <div className="relative aspect-[4/4.2] overflow-hidden rounded-[32px] sm:aspect-[4/3.4]">
            <Image
              src="/menu/street-tacos.jpg"
              alt="Street tacos at the table"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-4 w-[230px] rounded-[20px] bg-white p-4 shadow-plate sm:right-6 sm:w-[270px]">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink text-forest">
                <ReceiptText className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[11px] font-bold text-forest">Shared table bill</p>
                <p className="text-[9.5px] text-muted">4 phones / one receipt</p>
              </div>
            </div>
            <div className="mt-3 flex items-end justify-between border-t border-line pt-2.5">
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.07em] text-muted">Total</span>
              <span className="price text-[16px] text-forest">₦43,120</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <p className="eyebrow text-muted">Guest experience</p>
          <h2 className="mt-4 max-w-[520px] text-[clamp(2rem,4.2vw,3.3rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-forest">
            They never download a thing.
          </h2>
          <p className="mt-4 max-w-[480px] text-[13.5px] leading-[1.7] text-muted">
            No app store, no password, no account. The menu, the order, the waiter and the bill
            all live behind the same small code.
          </p>

          <div className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {[
              ["No app, no account", "The menu opens in the browser. A name at checkout is optional."],
              ["The bill belongs to the table", "Every phone adds to the same order, not four separate tabs."],
              ["Split it, or pay it whole", "Transfer, card, USSD or cash. A receipt is kept."],
              ["A person, in one tap", "The waiter request lands on the floor dashboard, not in a void."],
            ].map(([title, copy], index) => (
              <div key={title} className="border-t border-line pt-3">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-tomato">0{index + 1}</span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-forest">{title}</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ActionButton href="/order/table-12" variant="forest" size="md">
              Open the guest menu
            </ActionButton>
            <span className="text-[11px] text-muted">Working demo / table 12</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AiBand() {
  return (
    <section id="ai" className="shell scroll-mt-20 py-4 sm:py-6">
      <div className="relative overflow-hidden rounded-[32px] bg-forest px-6 py-10 text-cream sm:rounded-[36px] sm:px-10 sm:py-14">
        <div className="dot-field absolute inset-0 opacity-20" />
        <div className="absolute right-[-160px] top-[-180px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,79,135,0.32),transparent_65%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="eyebrow text-pink">The AI layer / grounded in the restaurant</p>
            <h2 className="mt-4 max-w-[520px] text-[clamp(2rem,4.2vw,3.3rem)] font-extrabold leading-[0.98] tracking-[-0.06em]">
              An assistant that has read the menu.
            </h2>
            <p className="mt-4 max-w-[430px] text-[13px] leading-[1.7] text-cream/55">
              It knows the dish, the price, the prep time and the note the kitchen already wrote.
              It does not invent a special, a stock count or an allergen.
            </p>
            <div className="mt-7 space-y-3">
              {[
                ["A menu assistant, not a search box", "Reads tonight's menu, the price, the heat and the allergens."],
                ["Demand before the rush", "Sales history and time of day become a prep number the manager can act on."],
                ["The slow dish, named early", "Low-stock ingredients and long station times are flagged while there is still time."],
              ].map(([title, copy]) => (
                <div key={title} className="flex gap-3 border-t border-cream/10 pt-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                  <div>
                    <p className="text-[13px] font-semibold text-cream">{title}</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-cream/45">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[10px] leading-relaxed text-cream/30">
              Suggestions need a manager&apos;s approval. Guest-facing allergen information always
              comes from the menu record, never from a model.
            </p>
          </div>

          <div className="rounded-[26px] border border-cream/12 bg-cream/[0.05] p-4 backdrop-blur-sm sm:p-5">
            <div className="flex items-center justify-between border-b border-cream/10 pb-3">
              <span className="flex items-center gap-2 text-[11px] font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink text-forest">
                  <Sparkles className="h-3 w-3" />
                </span>
                Ember assistant
              </span>
              <span className="rounded-full border border-cream/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-cream/45">
                Live menu
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-[14px] rounded-br-[5px] bg-pink px-3 py-2.5 text-[11.5px] leading-relaxed text-forest">
                  Something spicy under ₦10,000, for two.
                </p>
              </div>
              <div className="flex">
                <div className="max-w-[92%] rounded-[14px] rounded-bl-[5px] bg-cream/[0.07] px-3 py-2.5 text-[11.5px] leading-relaxed text-cream/70">
                  <p>
                    The street tacos and the beef shawarma both stay under ₦10,000 and carry real
                    heat. Order one of each and the table is covered for ₦16,000 before service.
                  </p>
                  <div className="mt-2 grid gap-1.5">
                    {[
                      ["Street tacos", "₦8,500"],
                      ["Beef shawarma", "₦7,500"],
                    ].map(([name, price]) => (
                      <div key={name} className="flex items-center justify-between rounded-[7px] bg-cream/[0.05] px-2.5 py-1.5">
                        <span className="text-[10px]">{name}</span>
                        <span className="price text-[10px] text-pink">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-cream/10 pt-3 text-[8.5px] uppercase tracking-[0.07em] text-cream/30">
              <span>Source / Menu, 17 dishes, 20:40</span>
              <span>Ask the pass</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Payments() {
  const methods = [
    { icon: CreditCard, name: "Paystack", note: "Card, bank transfer or USSD in one checkout." },
    { icon: Landmark, name: "Bank transfer", note: "A dedicated account for the table, confirmed at the pass." },
    { icon: Smartphone, name: "USSD", note: "Dial a short code from any phone, no data needed." },
    { icon: Wallet, name: "Cash", note: "The waiter marks it settled and the receipt is saved." },
  ];

  return (
    <section id="payments" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow text-muted">Payments / Nigeria first</p>
          <h2 className="mt-4 max-w-[450px] text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-forest">
            Pay the way the room pays.
          </h2>
          <p className="mt-4 max-w-[400px] text-[13px] leading-[1.7] text-muted">
            The bill is not one method. The table can split between a card, a transfer and cash,
            and the pass still sees one settled receipt.
          </p>

          <div className="mt-6 rounded-[24px] bg-[#f2f2f2] p-5">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-tomato" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-forest">
                Wallets, honestly
              </p>
            </div>
            <p className="mt-3 text-[12.5px] leading-[1.7] text-muted">
              Apple Pay and Google Pay are shown only when the provider, device and country
              support them. In Nigeria, Paystack covers cards, transfer and USSD first. The QR
              menu never depends on a wallet.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5">
              <span className="price text-[22px] text-forest">7.5%</span>
              <p className="text-[10.5px] leading-snug text-muted">
                Service and VAT shown as separate lines before paying.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={65}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {methods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.name} className="rounded-[22px] border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink text-forest">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[8.5px] font-semibold uppercase tracking-[0.08em] text-muted/60">
                      Supported
                    </span>
                  </div>
                  <p className="mt-4 text-[19px] font-bold tracking-[-0.035em] text-forest">{method.name}</p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">{method.note}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-[20px] bg-[#f2f2f2] p-4">
            <ReceiptText className="h-4 w-4 shrink-0 text-tomato" />
            <p className="text-[11px] leading-relaxed text-muted">
              Demo only. No payment is collected and no wallet is promised.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Proof() {
  const stories = [
    {
      quote:
        "The QR menu paid for itself in the first weekend. Guests order a second drink without flagging anyone down, and the pass finally sees every ticket in one place.",
      name: "Amaka O.",
      role: "Owner / Ember & Rice",
      initials: "AO",
    },
    {
      quote:
        "We run three rooms and two kitchens. The table board tells me where the night is stuck before a guest has to tell me.",
      name: "Femi A.",
      role: "General manager / The Yellow Room",
      initials: "FA",
    },
    {
      quote:
        "The best part is what it does not do. No app, no account for the guest, no new hardware. They scan, order, and the kitchen gets it.",
      name: "Nadia K.",
      role: "Operations lead / Cedar Kitchen",
      initials: "NK",
    },
  ];

  return (
    <section className="shell py-14 sm:py-20">
      <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-muted">From the rooms / demo stories</p>
          <h2 className="mt-4 max-w-[540px] text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-forest">
            The quieter service is the point.
          </h2>
        </div>
        <p className="max-w-[240px] text-[11.5px] leading-relaxed text-muted">
          Illustrative stories from the demo, not paid testimonials.
        </p>
      </Reveal>

      <div className="mt-9 grid gap-3 lg:grid-cols-3">
        {stories.map((story, index) => (
          <Reveal key={story.name} delay={index * 60}>
            <figure className="flex h-full flex-col rounded-[28px] border border-line bg-white p-6 sm:p-7">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-3 w-3 fill-forest text-forest" />
                ))}
              </div>
              <blockquote className="mt-5 text-[15px] font-medium leading-[1.55] tracking-[-0.02em] text-forest">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-2.5 border-t border-line pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-[9px] font-semibold text-cream">
                  {story.initials}
                </span>
                <span>
                  <span className="block text-[11.5px] font-semibold text-forest">{story.name}</span>
                  <span className="mt-0.5 block text-[9px] uppercase tracking-[0.06em] text-muted/70">
                    {story.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="shell pb-4 pt-4 sm:pb-6 sm:pt-6">
      <div className="relative overflow-hidden rounded-[32px] bg-pink px-6 py-9 sm:rounded-[36px] sm:px-10 sm:py-12">
        <div className="absolute right-[-120px] top-[-160px] h-[420px] w-[420px] rounded-full bg-white/20" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="eyebrow text-forest/70">Start small</p>
            <h2 className="mt-4 max-w-[520px] text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.065em] text-forest">
              Start with
              <br />
              one room.
            </h2>
            <p className="mt-4 max-w-[430px] text-[13px] leading-[1.7] text-forest/65">
              Put the code on every table, run a weekend and watch the pass. If the room is
              calmer, keep it. If not, take the cards off the tables.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["No setup fee", "Cancel anytime", "Naira pricing"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 rounded-full bg-white/45 px-3 py-1.5 text-[10.5px] font-medium text-forest/75">
                  <Check className="h-3 w-3" strokeWidth={3} />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <ActionButton href="/pricing" variant="forest" size="lg">
                See the plans
              </ActionButton>
              <ActionButton href="/order/table-12" variant="cream" size="lg" className="border-forest/15">
                Try the demo
              </ActionButton>
            </div>
          </div>

          <div className="rounded-[24px] bg-white/85 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-muted">Table plan</span>
              <span className="rounded-full bg-pink px-2 py-1 text-[8.5px] font-bold uppercase tracking-[0.06em] text-forest">
                Most chosen
              </span>
            </div>
            <p className="mt-4 text-[40px] font-extrabold leading-none tracking-[-0.065em] text-forest">
              ₦37,500
              <span className="ml-1 align-middle text-[11px] font-medium tracking-normal text-muted">
                / month
              </span>
            </p>
            <p className="mt-1.5 text-[10px] text-muted">Billed ₦450,000 yearly / save ₦90,000</p>
            <ul className="mt-4 space-y-2 border-t border-line pt-4">
              {["Up to 20 tables", "QR menus and shared bills", "Kitchen display, one station"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[11.5px] text-forest/75">
                  <Check className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className="mt-5 flex h-10 items-center justify-center gap-2 rounded-full bg-forest text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine"
            >
              Choose this plan
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const faqs = [
    {
      question: "Does a guest need to download anything?",
      answer:
        "No. Scanning the code opens the restaurant's own web page. There is no app, no account and no password. A name at checkout is optional.",
    },
    {
      question: "Which payments can we take?",
      answer:
        "In Nigeria the demo presents Paystack card, bank transfer, USSD and cash. Apple Pay and Google Pay are only surfaced where the provider, device and country support them. This build collects no money.",
    },
    {
      question: "We already have a POS. Does this replace it?",
      answer:
        "The platform is built to sit beside the kitchen and the floor, not to rip out a working POS. The menu, table state and service requests can stay here while payments settle through your existing provider.",
    },
    {
      question: "What happens when the internet drops?",
      answer:
        "In this frontend demo, state lives in the browser, so nothing leaves the device. A real deployment needs a local queue and a clear offline state before it can promise service without a connection.",
    },
    {
      question: "Is the AI deciding prices?",
      answer:
        "No. The assistant reads the menu, availability and the table bill. It can suggest a dish or a prep number, but a manager approves changes and it never invents an ingredient, an allergen or a price.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-14 sm:py-20">
      <div className="shell grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-muted">Questions</p>
          <h2 className="mt-4 max-w-[400px] text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-forest">
            Before you put a code on the table.
          </h2>
          <p className="mt-4 max-w-[300px] text-[12.5px] leading-[1.7] text-muted">
            The short answers. The longer ones are a conversation with the team.
          </p>
          <a
            href="mailto:hello@sideplate.online"
            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-forest underline underline-offset-4"
          >
            hello@sideplate.online
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </Reveal>

        <Reveal delay={60}>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[18px] bg-[#f2f2f2] px-5 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="text-[16px] font-bold leading-snug tracking-[-0.03em] text-forest sm:text-[18px]">
                    {faq.question}
                  </span>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-forest transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-3 w-3" />
                  </span>
                </summary>
                <p className="mt-2.5 max-w-[580px] text-[12.5px] leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function RoomNote() {
  return (
    <div className="shell flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-2 text-[11.5px] text-muted">
        <UtensilsCrossed className="h-3.5 w-3.5 text-tomato" />
        Built for the room, not the app store.
      </p>
      <p className="text-[11px] text-muted/70">{restaurant.name} / {restaurant.address}</p>
    </div>
  );
}
