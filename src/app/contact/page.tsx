import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { PageShell, Section } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${site.company} about Sideplate — demos, pricing, printed table cards or a real deployment.`,
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact / talk to a person"
      title="Tell us about your room."
      intro="How many tables, how many sittings, and what the pass looks like on a Friday. That is usually enough for us to tell you whether Sideplate fits."
      meta={`${site.companyLine} ${site.location}.`}
    >
      <Section title="Email us">
        <p>
          Write to{" "}
          <a
            className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>{" "}
          and a person reads it. Tell us the restaurant name, the city and roughly how many tables
          you run, and you will not need to repeat yourself later.
        </p>
      </Section>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: Mail,
            label: "Email",
            value: site.email,
            href: `mailto:${site.email}`,
          },
          { icon: MapPin, label: "Based in", value: site.location },
          { icon: Clock, label: "We reply", value: "Within two working days" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-[20px] bg-[#f2f2f2] p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-forest">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <p className="mt-3 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted/60">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-1 block text-[12px] font-semibold text-forest hover:text-tomato"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-[12px] font-semibold text-forest">{item.value}</p>
              )}
            </div>
          );
        })}
      </div>

      <Section title="What to include">
        <p>
          Questions about plans, printed table cards, onboarding a group, or a data request can
          all go to the same address. If your question is about something already happening at
          your tables, mention the restaurant and the date and we can look at it with you.
        </p>
      </Section>

      <Section title="Before you write">
        <p>
          This site is a frontend demonstration, so table 12 is a sample room and no real order is
          ever received. Anything you send by email is read by {site.company}, not stored by the
          demo.
        </p>
      </Section>

      <p>
        Privacy questions are answered in full on the{" "}
        <a
          className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
          href="/privacy"
        >
          privacy page
        </a>
        .
      </p>
    </PageShell>
  );
}
