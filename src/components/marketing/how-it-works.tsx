import { Check, CreditCard, ScanLine } from "lucide-react";
import { QrMark } from "@/components/ui/qr-mark";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    number: "01",
    title: "The table opens the menu.",
    copy: "A QR card or an NFC tag opens the restaurant's own page for that exact table. No app, no account, no menu to wipe down.",
  },
  {
    number: "02",
    title: "The order reaches the pass.",
    copy: "Guests build the order, customise it and send it. The ticket lands on the kitchen board in the same second, with the table and the note attached.",
  },
  {
    number: "03",
    title: "One bill, settled their way.",
    copy: "Everyone adds to the same table. Split it across phones, pay with Paystack, transfer, USSD or cash, and keep the receipt.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-14 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">The whole loop</p>
              <h2 className="mt-4 max-w-[640px] font-serif text-[clamp(2.3rem,4.6vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-forest">
                Three moves, no new hardware.
              </h2>
            </div>
            <p className="max-w-[280px] text-[11px] leading-relaxed text-muted">
              The phone is already on the table. The QR card is the only thing you print.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 80}>
              <article className="flex h-full flex-col rounded-[12px] border border-line bg-cream p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[9px] tracking-[0.1em] text-tomato">{step.number}</span>
                  <span className="h-px w-10 bg-line" />
                </div>
                <h3 className="mt-5 max-w-[250px] font-serif text-[26px] font-semibold leading-[1.02] tracking-[-0.04em] text-forest">
                  {step.title}
                </h3>
                <p className="mt-3 text-[11.5px] leading-relaxed text-muted">{step.copy}</p>
                <div className="mt-auto pt-6">
                  {index === 0 ? <QrCard /> : null}
                  {index === 1 ? <Ticket /> : null}
                  {index === 2 ? <Receipt /> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function QrCard() {
  return (
    <div className="flex items-center gap-3 rounded-[8px] border border-line bg-white p-3">
      <span className="flex h-[62px] w-[62px] shrink-0 items-center justify-center bg-forest p-1.5 text-cream">
        <QrMark className="h-full w-full" title="Sample table QR" />
      </span>
      <div>
        <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">Table 12</p>
        <p className="mt-1 font-serif text-[15px] font-semibold leading-none text-forest">
          Scan to order
        </p>
        <p className="mt-1 flex items-center gap-1 font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted/65">
          <ScanLine className="h-2.5 w-2.5" />
          QR or NFC
        </p>
      </div>
    </div>
  );
}

function Ticket() {
  return (
    <div className="rounded-[8px] border border-line bg-white p-3">
      <div className="flex items-center justify-between border-b border-dashed border-line pb-1.5">
        <span className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-muted">Ticket #1043</span>
        <span className="font-mono text-[6.5px] text-tomato">TABLE 12</span>
      </div>
      <div className="mt-2 space-y-1 text-[9px] text-forest">
        <p>2 x Jollof &amp; plantain</p>
        <p>1 x Street tacos</p>
        <p className="italic text-tomato-deep">No onions on the tacos</p>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-line pt-1.5">
        <span className="flex items-center gap-1 font-mono text-[6.5px] uppercase tracking-[0.07em] text-moss">
          <span className="h-1 w-1 rounded-full bg-moss" />
          On the pass
        </span>
        <span className="font-mono text-[6.5px] text-muted">2 min</span>
      </div>
    </div>
  );
}

function Receipt() {
  return (
    <div className="rounded-[8px] border border-line bg-white p-3">
      <div className="flex items-center justify-between border-b border-dashed border-line pb-1.5">
        <span className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-muted">Table 12 / Bill</span>
        <span className="flex items-center gap-1 font-mono text-[6.5px] uppercase tracking-[0.07em] text-moss">
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
          Paid
        </span>
      </div>
      <div className="mt-2 space-y-1 font-mono text-[7.5px] text-muted">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-forest">₦36,300</span>
        </div>
        <div className="flex justify-between">
          <span>Service + VAT</span>
          <span className="text-forest">₦5,445</span>
        </div>
        <div className="flex justify-between border-t border-line pt-1 text-[8.5px] font-medium text-forest">
          <span>Total</span>
          <span>₦41,745</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-[4px] bg-sand px-2 py-1">
        <CreditCard className="h-2.5 w-2.5 text-tomato" />
        <span className="font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted">
          Paystack / transfer / USSD
        </span>
      </div>
    </div>
  );
}
