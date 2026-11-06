import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Globe2, QrCode, ReceiptText, Wifi } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { ActionButton } from "@/components/ui/action-button";
import { QrMark } from "@/components/ui/qr-mark";
import { PricingTable } from "@/features/marketing/pricing-table";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing for one room, a full service or a restaurant group. Start with a free demo, no card needed.",
};

const includes = [
  { icon: QrCode, title: "QR and NFC access", copy: "One code per table, printed once." },
  { icon: ReceiptText, title: "Shared table bills", copy: "Every phone adds to the same receipt." },
  { icon: Wifi, title: "No guest app", copy: "Opens in the browser, no account." },
  { icon: Globe2, title: "Local payments first", copy: "Paystack, transfer, USSD, cash." },
];

const faqs = [
  {
    question: "Is there a setup fee?",
    answer:
      "No setup fee on Table or Service. The QR cards are a PDF you print yourself, or we can quote for printed table cards if you want them made.",
  },
  {
    question: "Can we pay yearly?",
    answer:
      "Yes. Annual billing gives you two months free. Group agreements are annual and include named onboarding.",
  },
  {
    question: "What happens after the demo?",
    answer:
      "This build is frontend only. A real deployment would connect the menu, staff accounts and payments to a backend and a Paystack account. Nothing is charged here.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <section className="shell pt-3 sm:pt-4">
          <div className="relative overflow-hidden rounded-[28px] bg-white px-6 py-9 sm:rounded-[36px] sm:px-10 sm:py-14">
            <div className="grid items-center gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <p className="eyebrow text-muted">Pricing / every room has a size</p>
                <h1 className="mt-5 max-w-[620px] text-[clamp(2.6rem,5.2vw,4.4rem)] font-extrabold leading-[0.95] tracking-[-0.065em] text-forest">
                  Priced for one room,
                  <br />
                  or the <span className="text-tomato">whole group.</span>
                </h1>
                <p className="mt-4 max-w-[480px] text-[13.5px] leading-[1.7] text-muted">
                  Start with a free demo on table 12. Pay when the room is already using it. No
                  card for the demo, no setup fee on the first two plans.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Free demo", "Cancel anytime", "Naira pricing"].map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 rounded-full bg-[#f2f2f2] px-3 py-1.5 text-[10.5px] font-medium text-forest/70"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] bg-[#f2f2f2] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-muted">
                    The honest test
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink text-forest">
                    <QrMark className="h-4 w-4" title="Table code" />
                  </span>
                </div>
                <p className="mt-4 max-w-[280px] text-[24px] font-bold leading-[1.04] tracking-[-0.05em] text-forest">
                  Put the code on 18 tables. Run one weekend.
                </p>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-muted">
                  If the pass is calmer and the bills settle faster, the plan pays for itself. If
                  not, take the cards off the table.
                </p>
                <Link
                  href="/order/table-12"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-[11px] font-semibold text-cream transition-colors hover:bg-pine"
                >
                  Try table 12
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="shell py-6 sm:py-8">
          <div className="rounded-[28px] bg-white px-4 py-8 sm:rounded-[36px] sm:px-8 sm:py-10">
            <PricingTable />
          </div>
        </section>

        <section className="shell pb-4">
          <div className="rounded-[28px] bg-white px-6 py-8 sm:rounded-[36px] sm:px-9 sm:py-10">
            <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-[26px] font-bold leading-none tracking-[-0.05em] text-forest">
                Every plan includes
              </h2>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted/55">
                The basics are not an upsell
              </span>
            </div>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {includes.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[20px] bg-[#f2f2f2] p-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-forest">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <p className="mt-3 text-[12px] font-semibold text-forest">{item.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted">{item.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="shell py-8 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-muted">Before you pay</p>
              <h2 className="mt-4 max-w-[390px] text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-forest">
                The small print, in plain words.
              </h2>
              <div className="mt-4 rounded-[20px] border border-line bg-white p-4">
                <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-muted">
                  <Globe2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tomato" />
                  Apple Pay and Google Pay are surfaced only when the provider, device and country
                  support them. In Nigeria, Paystack covers cards, transfer and USSD. The QR menu
                  never depends on a wallet.
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <ActionButton href="/order/table-12" variant="forest" size="md">
                  Open the demo
                </ActionButton>
                <ActionButton href="/faq" variant="outline" size="md">
                  Common questions
                </ActionButton>
              </div>
            </div>

            <div className="space-y-2">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-[18px] bg-white px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-[16px] font-bold leading-snug tracking-[-0.03em] text-forest sm:text-[18px]">
                      {faq.question}
                    </span>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2] text-forest transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2.5 max-w-[540px] text-[12px] leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
