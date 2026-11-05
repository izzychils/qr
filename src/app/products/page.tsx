import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The three surfaces of Sideplate: QR ordering for guests, the kitchen display for the pass, and one dashboard for the whole room.",
};

const products = [
  {
    name: "QR ordering",
    audience: "For guests at the table",
    copy: "One code per table opens the live menu in the browser. Guests order, add to the same bill and track their order without installing anything or creating an account.",
    points: ["No app, no account", "Shared table bill", "Waiter call and order status"],
    href: "/order/table-12",
    cta: "Try table 12",
  },
  {
    name: "Kitchen display",
    audience: "For the pass and the kitchen",
    copy: "Every ticket arrives in one queue the moment it is placed. Courses are marked, ready orders are cleared, and nothing is shouted across the room or re-keyed from paper.",
    points: ["Live ticket queue", "Course and timing control", "Marked ready, cleared once"],
    href: "/login",
    cta: "Open the dashboard",
  },
  {
    name: "Service dashboard",
    audience: "For owners, managers and the front desk",
    copy: "The whole room in one place: which tables are seated, what each owes, how the service is pacing, and the menu edits that apply to every table at once.",
    points: ["Table and bill overview", "Menu and price control", "Service pace at a glance"],
    href: "/login",
    cta: "See the dashboard",
  },
];

export default function ProductsPage() {
  return (
    <PageShell
      eyebrow="Products / one system, three surfaces"
      title="The menu, the pass and the front desk — on the same order."
      intro="Sideplate is one product made of three surfaces that read the same data. Pick the one you are responsible for; the others already agree with it."
      meta={`${site.companyLine} Pricing starts with a free demo.`}
    >
      <div className="grid gap-3 not-prose">
        {products.map((product) => (
          <div key={product.name} className="rounded-[20px] bg-[#f2f2f2] p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-[18px] font-bold tracking-[-0.04em] text-forest">
                {product.name}
              </h2>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted/60">
                {product.audience}
              </span>
            </div>
            <p className="mt-2 max-w-[560px] text-[12px] leading-relaxed text-muted">
              {product.copy}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {product.points.map((point) => (
                <li
                  key={point}
                  className="rounded-full bg-white px-3 py-1.5 text-[10.5px] font-medium text-forest/70"
                >
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href={product.href}
              className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-forest transition-colors hover:text-tomato"
            >
              {product.cta}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-[16px] font-bold tracking-[-0.03em] text-forest">
          Who Sideplate serves
        </h2>
        <p className="mt-2">
          Independent restaurants and small groups, front-of-house and kitchen teams, and the
          guests sitting at the table. If your service runs on a paper pad and a shout across the
          room, Sideplate replaces both with one shared order.
        </p>
        <p className="mt-3">
          Want the plans and the honest small print?{" "}
          <Link
            href="/pricing"
            className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
          >
            See pricing
          </Link>
          . Curious who builds it?{" "}
          <Link
            href="/about"
            className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
          >
            Read about {site.company}
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
