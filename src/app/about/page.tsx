import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageShell, Section, Bullets } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sideplate is restaurant software from Ivents: the menu, the order, the receipt and the bill on every table.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About / the company behind the plate"
      title="A calmer dining room, one table at a time."
      intro={`Sideplate is a restaurant ordering and table management system from ${site.company}. It replaces the walk-and-wait loop of taking orders by hand with one shared system for guests, the pass and the front desk.`}
      meta={`${site.companyLine} Registered in ${site.location}.`}
    >
      <Section title="What Sideplate does">
        <p>
          Every table carries a code. A guest scans it, the menu opens in their browser, and
          their order lands at the pass as one ticket. No app download, no account, no waiter
          walking back and forth to confirm a dish.
        </p>
        <p>
          Staff get one dashboard for the whole room: live tickets, table status, the bill for
          each table and the menu behind all of it. The guest, the kitchen and the front desk
          read from the same order instead of three separate versions of it.
        </p>
      </Section>

      <Section title="Who it is for">
        <Bullets
          items={[
            "Independent restaurants that run one room and cannot absorb a slow, mis-keyed pass.",
            "Restaurant groups that want the same service standard and menu controls across sites.",
            "Front-of-house and kitchen teams who need one shared view of every open table.",
            "Guests who would rather order from their own phone than flag someone down.",
          ]}
        />
      </Section>

      <Section title="How we build">
        <p>
          Sideplate is built local-first for Nigerian service: Naira pricing, Paystack-first
          payments, transfer and USSD support, and a menu that works on a cheap phone over a
          weak connection. The AI layer proposes, it never invents — every suggestion sits in
          front of a person who can accept or ignore it.
        </p>
      </Section>

      <Section title="The build you are looking at">
        <p>
          This site is a frontend demonstration. Orders, tables and staff sessions are stored in
          your browser; no payment is ever taken and no kitchen is actually watching.
        </p>
        <p>
          Sideplate is a product of {site.company}. For anything commercial, or to talk through a
          real deployment, write to{" "}
          <a
            className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>
      </Section>

      <p>
        <Link
          href="/contact"
          className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
        >
          Contact the team
        </Link>{" "}
        — or{" "}
        <Link
          href="/products"
          className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
        >
          see what Sideplate includes
        </Link>
        .
      </p>
    </PageShell>
  );
}
