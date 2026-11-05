import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageShell, Section, Bullets } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles table sessions, orders and account details. This demo build keeps everything in your browser.`,
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy / what happens to your data"
      title="Your table, your browser, your data."
      intro={`${site.name} is currently a frontend demonstration with no backend, no analytics service and no payment processor connected. This page explains exactly what that means.`}
      meta={`Last updated ${site.lastUpdated}`}
    >
      <Section title="Who we are">
        <p>
          {site.name} is a product of {site.company}, {site.location}. For any privacy question,
          or to ask that something be removed, write to{" "}
          <a
            className="font-semibold text-forest underline decoration-tomato/40 underline-offset-2 hover:decoration-tomato"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>
      </Section>

      <Section title="What the demo stores">
        <p>
          Orders, table sessions, menu edits and staff sign-in state are kept in your browser's
          local storage on the device you used. Guest names typed at checkout stay on that device
          too.
        </p>
        <p>
          Nothing is sent to a {site.name} server. There is no account database to look up and no
          email is delivered by the demo.
        </p>
      </Section>

      <Section title="What we do not collect">
        <Bullets
          items={[
            "No analytics, advertising identifiers or tracking pixels.",
            "No card details. The demo never asks for a payment method and never charges one.",
            "No passwords are stored. The demo only keeps the signed-in profile.",
            "No uploaded files are transmitted or stored.",
            "No location data. The table code is read, not your GPS.",
          ]}
        />
      </Section>

      <Section title="Cookies and local storage">
        <p>
          {site.name} uses browser storage rather than tracking cookies. Clearing site data for
          this address removes your orders, table sessions and demo profile from the device.
        </p>
      </Section>

      <Section title="Guest data in a real deployment">
        <p>
          A live restaurant running {site.name} would process guest orders and payments on its own
          behalf, with payments handled by its provider (Paystack in Nigeria). When that backend
          is connected, this page will state what is stored on the server, why it is needed, how
          long it is kept and how a guest can request deletion.
        </p>
        <p>
          Restaurants remain responsible for the guest data they collect under applicable data
          protection law; {site.company} provides the tooling.
        </p>
      </Section>

      <Section title="Your choices">
        <p>
          Clear the site data for this address in your browser settings to remove everything the
          demo stored. To make a request about information you sent us by email, use the contact
          address above and we will respond within two working days.
        </p>
      </Section>

      <section className="rounded-xl border border-line bg-[#f2f2f2] p-4">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted/60">
          Demo note
        </p>
        <p className="mt-2 text-[10.5px] leading-relaxed text-muted">
          This policy describes a prototype build and is not legal advice. It should be reviewed
          before a production launch.
        </p>
      </section>
    </PageShell>
  );
}
