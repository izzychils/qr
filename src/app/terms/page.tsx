import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageShell, Section, Bullets } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply to using ${site.name}, a product of ${site.company}.`,
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms / the plain version"
      title="What you can expect from us, and what we expect from you."
      intro={`These terms govern your use of ${site.name}, a restaurant ordering and table management product from ${site.company}. By using the site you accept them.`}
      meta={`Last updated ${site.lastUpdated}`}
    >
      <Section title="Who you are agreeing with">
        <p>
          {site.name} is operated by {site.company}, {site.location}. Where these terms say "we" or
          "us", that is {site.company}; "you" means the person or business using the site.
        </p>
      </Section>

      <Section title="This is a demonstration build">
        <p>
          The current site is a frontend demo. It has no backend, no payment processor and no
          connection to a real kitchen. Orders, tables and staff sessions exist only in your
          browser and can disappear if you clear site data.
        </p>
        <p>
          No fee is charged and no service obligation is created by using the demo. A paid
          relationship only begins under a separate written agreement.
        </p>
      </Section>

      <Section title="Acceptable use">
        <Bullets
          items={[
            "Use the site for its intended purpose: evaluating or running restaurant service.",
            "Do not attempt to disrupt, reverse engineer or overload the site or its infrastructure.",
            "Do not use it to place fraudulent orders or to misrepresent a restaurant you do not represent.",
            "Do not copy the design, content or code into another product without permission.",
          ]}
        />
      </Section>

      <Section title="Accounts and access">
        <p>
          Staff sign-in on this build is a local demo. Where real accounts exist, you are
          responsible for keeping credentials secure and for activity under your account, and you
          must tell us promptly if you believe access has been compromised.
        </p>
      </Section>

      <Section title="Payments">
        <p>
          {site.name} does not process payments on this build and never stores card details.
          Restaurants that take payments in a live deployment do so through their own provider
          (Paystack in Nigeria) under that provider's terms.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          The {site.name} name, design, copy and code belong to {site.company} or its licensors.
          Your menu content, prices and photographs remain yours; you grant us only the permission
          needed to display them to your guests.
        </p>
      </Section>

      <Section title="Availability and changes">
        <p>
          The demo is provided as is, without warranties of any kind. We may change, suspend or
          withdraw it at any time. We may update these terms; the date at the top of this page
          will change when we do.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the extent the law allows, {site.company} is not liable for indirect or consequential
          loss, lost profits or lost data arising from use of this demonstration. Nothing here
          limits liability that cannot lawfully be limited.
        </p>
      </Section>

      <Section title="Questions">
        <p>
          Contact{" "}
          <a
            className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>{" "}
          about these terms, or read the{" "}
          <a
            className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
            href="/privacy"
          >
            privacy policy
          </a>
          .
        </p>
      </Section>

      <section className="rounded-xl border border-line bg-[#f2f2f2] p-4">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted/60">
          Demo note
        </p>
        <p className="mt-2 text-[10.5px] leading-relaxed text-muted">
          These terms cover a prototype build and are not legal advice. They should be reviewed by
          a qualified lawyer before a production launch.
        </p>
      </section>
    </PageShell>
  );
}
