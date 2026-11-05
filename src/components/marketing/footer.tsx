import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Everything included", href: "/products" },
      { label: "QR ordering", href: "/products" },
      { label: "Kitchen display", href: "/products" },
      { label: "Guest experience", href: "/order/table-12" },
      { label: "Scan a table code", href: "/scan" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/contact" },
      { label: "Staff sign in", href: "/login" },
    ],
  },
  {
    title: "The fine print",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Payments", href: "/#payments" },
      { label: "Common questions", href: "/#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-white">
      <div className="shell pt-12 sm:pt-16">
        <div className="grid gap-10 border-b border-line pb-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[300px] text-[12.5px] leading-relaxed text-muted">
              The menu, the order, the receipt and the bill, on every table. One calm system
              for the whole room.
            </p>
            <Link
              href="/order/table-12"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-pink px-4 py-2 text-[11.5px] font-semibold text-forest transition-colors hover:bg-[#ffa1ba]"
            >
              Try the guest menu
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <p className="mt-5 text-[10.5px] leading-relaxed text-muted/70">
              {site.companyLine}
              <br />
              <a
                href={`mailto:${site.email}`}
                className="text-forest/70 transition-colors hover:text-forest"
              >
                {site.email}
              </a>
              <br />
              {site.location}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted/60">
                {column.title}
              </p>
              <ul className="mt-3.5 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-forest/65 transition-colors hover:text-forest"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 py-5 text-[10.5px] text-muted/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company}. {site.name} is a product of {site.company}.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="transition-colors hover:text-forest">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-forest">
              Terms
            </Link>
            <span>{site.domain}</span>
          </div>
        </div>

        <p className="pointer-events-none select-none overflow-hidden pb-2 text-center text-[clamp(3.4rem,20vw,15rem)] font-extrabold leading-[0.72] tracking-[-0.06em] text-[#f0f0f0]">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
