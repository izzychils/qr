import { Banknote, CreditCard, Globe2, Landmark, Smartphone, Wallet } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const methods = [
  {
    icon: CreditCard,
    name: "Paystack",
    note: "Card, bank transfer and USSD in one checkout.",
  },
  {
    icon: Landmark,
    name: "Bank transfer",
    note: "A dedicated account for the table, confirmed at the pass.",
  },
  {
    icon: Smartphone,
    name: "USSD",
    note: "For guests who would rather dial than type a card.",
  },
  {
    icon: Banknote,
    name: "Cash",
    note: "The waiter marks it settled and the receipt is saved.",
  },
];

export function Payments() {
  return (
    <section id="payments" className="scroll-mt-20 pb-14 sm:pb-20">
      <div className="shell">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div>
              <p className="eyebrow text-muted">Payments / Nigeria first</p>
              <h2 className="mt-4 max-w-[560px] font-serif text-[clamp(2.3rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-forest">
                Pay the way the room pays.
              </h2>
              <p className="mt-3 max-w-[520px] text-[12px] leading-relaxed text-muted">
                A bill is not one method. The table can split between a card, a transfer and
                cash, and the pass still sees one settled ticket.
              </p>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {methods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.name}
                      className="rounded-[8px] border border-line bg-cream p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-sand text-tomato">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-mono text-[6.5px] uppercase tracking-[0.09em] text-muted/55">
                          Supported
                        </span>
                      </div>
                      <p className="mt-2.5 font-serif text-[18px] font-semibold leading-none text-forest">
                        {method.name}
                      </p>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{method.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-[12px] border border-line-dark bg-forest p-5 text-cream sm:p-6">
                <div className="dot-field absolute inset-0 opacity-25" />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-butter" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-butter">
                      Wallets, honestly
                    </span>
                  </div>
                  <h3 className="mt-4 max-w-[340px] font-serif text-[28px] font-semibold leading-[1.02] tracking-[-0.045em]">
                    Apple Pay and Google Pay are not a promise.
                  </h3>
                  <p className="mt-2.5 text-[11.5px] leading-relaxed text-cream/60">
                    Wallet availability depends on the payment provider, the guest&apos;s device,
                    the country and the integration. We only surface a wallet when all four
                    support it. The QR menu never relies on one.
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-[6px] border border-cream/10 bg-cream/[0.04] px-2.5 py-2">
                    <Wallet className="h-3.5 w-3.5 shrink-0 text-butter/70" />
                    <p className="font-mono text-[7px] uppercase leading-relaxed tracking-[0.05em] text-cream/35">
                      In Nigeria, Paystack covers cards, transfer and USSD first.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-[8px] border border-line bg-cream px-4 py-3">
                <span className="font-serif text-[30px] font-semibold leading-none text-forest">
                  7.5%
                </span>
                <p className="text-[11px] leading-relaxed text-muted">
                  Service and VAT are shown as separate lines on the bill. The guest sees the
                  arithmetic before paying, not after.
                </p>
              </div>

              <p className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted/55">
                Demo only / no payment is collected
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
