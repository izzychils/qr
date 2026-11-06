"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const links = [
  { label: "Products", href: "/products" },
  { label: "How it works", href: "/how" },
  { label: "For guests", href: "/order/table-12" },
  { label: "Scan a code", href: "/scan" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-xl">
        <div className="shell flex h-[62px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12.5px] font-medium text-forest/65 transition-colors hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="hidden items-center gap-1.5 text-[10.5px] font-medium text-muted xl:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" />
              Lagos / Dinner service
            </span>
            <Link
              href="/login"
              className="text-[12.5px] font-medium text-forest/65 transition-colors hover:text-forest"
            >
              Staff sign in
            </Link>
            <Link
              href="/order/table-12"
              className="flex h-9 items-center gap-2 rounded-full bg-forest px-4 text-[12px] font-semibold text-cream transition-colors hover:bg-pine"
            >
              Open the demo
              <span className="h-1.5 w-1.5 rounded-full bg-pink" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/order/table-12"
              className="flex h-9 items-center rounded-full bg-forest px-3.5 text-[11.5px] font-semibold text-cream"
            >
              Open demo
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-forest"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-forest/30 backdrop-blur-sm"
          />
          <div className="absolute inset-x-3 top-3 rounded-[28px] border border-line bg-white p-6 shadow-plate">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-forest"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-5 flex items-center gap-1.5 text-[10.5px] font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" />
              Lagos / Dinner service
            </p>

            <nav className="mt-4 grid gap-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-3.5 text-[26px] font-bold tracking-[-0.045em] text-forest"
                >
                  {link.label}
                  <span className="text-[18px] text-forest/30">↗</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 grid gap-2">
              <Link
                href="/order/table-12"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-pink text-[13px] font-semibold text-forest"
              >
                Open table 12
              </Link>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-full border border-line text-[13px] font-semibold text-forest"
              >
                Staff sign in
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
