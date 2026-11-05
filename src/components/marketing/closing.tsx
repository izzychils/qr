import { ArrowUpRight, Plus } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/features/dashboard/data";

export function Closing() {
  return (
    <section className="pb-14 sm:pb-20">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[14px] bg-tomato p-5 text-cream sm:p-8 lg:p-10">
            <div className="absolute right-[-120px] top-[-140px] h-[420px] w-[420px] rounded-full border border-cream/15" />
            <div className="absolute right-[-60px] top-[-80px] h-[300px] w-[300px] rounded-full border border-cream/10" />
            <div className="relative grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div>
                <span className="eyebrow text-cream/65">Start small</span>
                <h2 className="mt-4 max-w-[560px] font-serif text-[clamp(2.6rem,5vw,4.4rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
                  Start with one room.
                </h2>
                <p className="mt-3 max-w-[470px] text-[12px] leading-relaxed text-cream/70">
                  Put the code on every table, run a weekend and watch the pass. If the room is
                  calmer, keep it. If not, take the cards off the tables.
                </p>
              </div>

              <div className="rounded-[10px] border border-cream/25 bg-forest/15 p-4 backdrop-blur-sm">
                <div className="flex items-end justify-between gap-3 border-b border-cream/20 pb-3">
                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-cream/55">
                      Table plan
                    </p>
                    <p className="mt-1.5 font-serif text-[34px] font-semibold leading-none tracking-[-0.05em]">
                      ₦37,500
                    </p>
                  </div>
                  <p className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-cream/55">
                    per month
                  </p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {["Up to 20 tables", "QR menus and shared bills", "Kitchen display, one station"].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-1.5 text-[11px] text-cream/80">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cream/50" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-1.5">
                  <ActionButton href="/pricing" variant="cream" size="sm" arrow={false}>
                    See the plans
                  </ActionButton>
                  <ActionButton
                    href="/order/table-12"
                    variant="outline"
                    size="sm"
                    className="border-cream/40 text-cream hover:border-cream"
                  >
                    Try the demo
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div id="faq" className="mt-14 scroll-mt-20 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <p className="eyebrow text-muted">Questions</p>
            <h2 className="mt-4 max-w-[380px] font-serif text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-forest">
              Before you put a code on the table.
            </h2>
            <p className="mt-3 max-w-[320px] text-[11px] leading-relaxed text-muted">
              The short answers. The longer ones are a conversation with the team.
            </p>
            <a
              href="mailto:hello@sideplate.online"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-forest transition-colors hover:text-tomato"
            >
              hello@sideplate.online
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>

          <div className="space-y-1.5">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[8px] border border-line bg-cream px-4 py-3.5 open:bg-cream"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="font-serif text-[18px] font-semibold leading-snug tracking-[-0.02em] text-forest">
                    {faq.question}
                  </span>
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-forest/50 transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-2.5 w-2.5" />
                  </span>
                </summary>
                <p className="mt-2.5 max-w-[620px] text-[12px] leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
