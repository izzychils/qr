"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  ChefHat,
  ChevronDown,
  Grid2X2,
  LayoutDashboard,
  LogOut,
  Menu,
  QrCode,
  ReceiptText,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useServiceRequests, useSession, signOut } from "@/lib/store";
import { restaurant } from "@/features/menu/data";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Floor plan", href: "/dashboard/tables", icon: Grid2X2 },
  { label: "Orders", href: "/dashboard/orders", icon: ReceiptText },
  { label: "Kitchen display", href: "/dashboard/kitchen", icon: ChefHat },
  { label: "Menu", href: "/dashboard/menu", icon: UtensilsCrossed },
  { label: "Table codes", href: "/dashboard/qr", icon: QrCode },
  { label: "Insights", href: "/dashboard/insights", icon: BarChart3 },
];

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/tables": "Floor plan",
  "/dashboard/orders": "Orders",
  "/dashboard/kitchen": "Kitchen display",
  "/dashboard/menu": "Menu",
  "/dashboard/qr": "Table codes",
  "/dashboard/insights": "Insights",
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, ready] = useSession();
  const [requests] = useServiceRequests();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!profileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [profileOpen]);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const interval = window.setInterval(tick, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const title = titles[pathname] ?? "Service";
  const pending = requests.filter((request) => !request.resolved).length;
  const active = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-5">
          <Logo />
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tomato" />
            Opening service
          </div>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const logOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <div className="hide-scroll min-h-screen bg-sand">
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-forest/25 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <aside
        aria-label="Restaurant navigation"
        className={cn(
          "no-scrollbar fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col overflow-y-auto border-r border-line bg-white transition-transform duration-300 lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between px-5">
          <Logo href="/dashboard" />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-sand lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-3">
          <div className="rounded-[18px] bg-[#f2f2f2] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted/70">
                Branch
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.05em] text-moss">
                <span className="h-1 w-1 rounded-full bg-moss" />
                Open
              </span>
            </div>
            <p className="mt-2 text-[17px] font-bold leading-tight tracking-[-0.04em] text-forest">
              {restaurant.name}
            </p>
            <p className="mt-1 text-[10px] text-muted">Lekki Phase 1 / 18 tables</p>
          </div>
        </div>

        <nav className="mt-6 flex-1 px-3">
          <div className="space-y-0.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = active(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-full px-3 py-2.5 text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-pink text-forest"
                      : "text-forest/60 hover:bg-[#f2f2f2] hover:text-forest",
                  )}
                >
                  <Icon
                    className={cn("h-4 w-4", isActive ? "text-forest" : "text-forest/40")}
                    strokeWidth={1.9}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="px-3">
          <Link
            href="/order/table-12"
            className="group flex items-center justify-between gap-2 rounded-[18px] bg-pink px-3.5 py-3 transition-colors hover:bg-[#ffa1ba]"
          >
            <span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-forest/60">
                Guest view
              </span>
              <span className="mt-0.5 block text-[12px] font-semibold text-forest">
                Open table 12
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-forest/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-3 border-t border-line p-3">
          <button
            type="button"
            onClick={logOut}
            className="flex w-full items-center gap-2.5 rounded-full px-3 py-2.5 text-left text-[12px] font-medium text-forest/60 transition-colors hover:bg-sand hover:text-forest"
          >
            <LogOut className="h-4 w-4 text-forest/45" />
            Log out
          </button>
        </div>
      </aside>

      <div className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 border-b border-line bg-white/92 backdrop-blur-xl">
          <div className="flex h-[68px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-forest lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="flex min-w-0 items-center gap-2 text-[13px]">
              <span className="hidden text-[11px] font-medium text-muted sm:inline">
                {restaurant.name}
              </span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span className="truncate font-semibold text-forest">{title}</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full border border-line bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                Live service / {now || "--:--"}
              </span>
              <Link
                href="/dashboard"
                aria-label={`${pending} open service requests`}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-forest/60 transition-colors hover:border-forest/30"
              >
                <Bell className="h-3.5 w-3.5" />
                {pending ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-tomato px-1 text-[8px] font-semibold text-cream">
                    {pending}
                  </span>
                ) : null}
              </Link>
              <Link
                href="/order/table-12"
                className="hidden h-9 items-center gap-1.5 rounded-full bg-forest px-4 text-[11.5px] font-semibold text-cream transition-colors hover:bg-pine sm:flex"
              >
                Guest menu
                <ArrowUpRight className="h-3 w-3" />
              </Link>
              <button
                type="button"
                onClick={() => setProfileOpen((current) => !current)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                aria-label="Account menu"
                className="flex h-9 items-center gap-1.5 rounded-full border border-line bg-white pl-1 pr-2.5 text-forest transition-colors hover:border-forest/25"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink text-[9px] font-semibold text-forest">
                  {initials}
                </span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 text-muted transition-transform",
                    profileOpen && "rotate-180",
                  )}
                />
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>

        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-4 text-[9px] font-semibold uppercase tracking-[0.08em] text-muted/50 sm:px-6 lg:px-8">
          <span>QR / demo service</span>
          <span>{restaurant.name} / Lekki</span>
        </div>
      </div>

      {profileOpen ? (
        <>
          <button
            type="button"
            aria-label="Close account menu"
            onClick={() => setProfileOpen(false)}
            className="fixed inset-0 z-[55] cursor-default"
          />
          <div
            role="menu"
            aria-label="Account menu"
            className="fixed right-4 top-[74px] z-[60] w-[268px] rounded-[22px] border border-line bg-white p-2 shadow-plate sm:right-6 lg:right-8"
          >
            <div className="flex items-start gap-3 border-b border-line px-3 pb-3 pt-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink text-[10px] font-semibold text-forest">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-forest">{user.name}</p>
                <p className="truncate text-[10.5px] text-muted">{user.email}</p>
                <p className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.08em] text-forest/40">
                  {user.role} / {restaurant.name}
                </p>
              </div>
            </div>

            <div className="mt-1.5 grid gap-0.5">
              <Link
                href="/order/table-12"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-[12px] font-medium text-forest transition-colors hover:bg-sand"
              >
                <QrCode className="h-4 w-4 text-forest/45" />
                Guest menu
                <span className="ml-auto text-[9px] font-semibold uppercase tracking-[0.06em] text-muted/60">
                  Table 12
                </span>
              </Link>
              <Link
                href="/"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-[12px] font-medium text-forest transition-colors hover:bg-sand"
              >
                <ArrowUpRight className="h-4 w-4 text-forest/45" />
                Back to the site
              </Link>
            </div>

            <div className="mt-1.5 border-t border-line pt-1.5">
              <button
                type="button"
                onClick={logOut}
                className="flex w-full items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-left text-[12px] font-medium text-forest transition-colors hover:bg-[#fff0f4] hover:text-tomato-deep"
              >
                <LogOut className="h-4 w-4 text-forest/45" />
                Log out
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
