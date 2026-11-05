import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

/**
 * Shared layout for the marketing detail pages (about, products, contact,
 * privacy, terms) so they inherit the same navbar, hero and footer as the
 * landing page and pricing page.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <section className="shell pt-3 sm:pt-4">
          <div className="rounded-[28px] bg-white px-6 py-9 sm:rounded-[36px] sm:px-10 sm:py-14">
            <p className="eyebrow text-muted">{eyebrow}</p>
            <h1 className="mt-5 max-w-[760px] text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.065em] text-forest">
              {title}
            </h1>
            <p className="mt-4 max-w-[580px] text-[13.5px] leading-[1.7] text-muted">{intro}</p>
            {meta ? (
              <p className="mt-5 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted/55">
                {meta}
              </p>
            ) : null}
          </div>
        </section>

        <section className="shell py-6 sm:py-8">
          <div className="rounded-[28px] bg-white px-6 py-8 sm:rounded-[36px] sm:px-10 sm:py-10">
            <div className="max-w-[760px] space-y-7 text-[12.5px] leading-[1.8] text-muted">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[16px] font-bold tracking-[-0.03em] text-forest">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tomato" />
          {item}
        </li>
      ))}
    </ul>
  );
}
