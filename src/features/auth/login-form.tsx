"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { QrMark } from "@/components/ui/qr-mark";
import { signIn, signInDemo, useSession } from "@/lib/store";

const photos = [
  { src: "/menu/tandoori-pizza.jpg", alt: "Tandoori chicken pizza" },
  { src: "/menu/glazed-chicken.jpg", alt: "Glazed chicken and mash" },
  { src: "/menu/street-tacos.jpg", alt: "Street tacos" },
];

export function LoginForm() {
  const router = useRouter();
  const [session, ready] = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && session) router.replace("/dashboard");
  }, [ready, session, router]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const result = signIn(email.trim(), password);
    if (!result.ok) {
      setBusy(false);
      setError(result.error ?? "Could not sign in.");
      return;
    }
    router.push("/dashboard");
  };

  const demo = () => {
    setBusy(true);
    signInDemo();
    router.push("/dashboard");
  };

  return (
    <div className="hide-scroll min-h-screen bg-sand lg:flex">
      <aside className="relative hidden overflow-hidden rounded-[32px] bg-[#e7e7e7] p-9 text-forest lg:m-3 lg:flex lg:w-[48%] lg:flex-col xl:p-12">
        <Logo />

        <div className="mt-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-forest/50">
            Staff access / Ember &amp; Rice
          </p>
          <h1 className="mt-4 max-w-[520px] text-[clamp(2.6rem,4vw,4.2rem)] font-extrabold leading-[0.94] tracking-[-0.065em]">
            The room runs better when the table can order.
          </h1>
          <p className="mt-4 max-w-[400px] text-[13px] leading-[1.7] text-forest/55">
            One dashboard for the floor, the pass and the receipt. Sign in to see tonight&apos;s
            service exactly as the team does.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                className={`relative overflow-hidden rounded-[20px] ${
                  index === 1 ? "h-[168px]" : "h-[136px] self-end"
                }`}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="200px" className="object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-start gap-3 border-t border-forest/10 pt-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink p-2 text-forest">
              <QrMark className="h-full w-full" title="QR table mark" />
            </span>
            <div>
              <p className="text-[12px] leading-relaxed text-forest/60">
                &ldquo;We stopped printing menus on a Friday night. The QR menu does the work, and
                the pass sees the receipt before the guest puts the phone down.&rdquo;
              </p>
              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-forest/35">
                Amaka O. / Owner
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen flex-1 flex-col bg-white lg:m-3 lg:ml-0 lg:rounded-[32px]">
        <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <Link
            href="/"
            className="ml-auto flex items-center gap-1.5 text-[11.5px] font-medium text-muted transition-colors hover:text-forest"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8">
          <div className="w-full max-w-[392px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-tomato">
              Welcome back
            </p>
            <h1 className="mt-3 text-[clamp(2.3rem,4vw,3.05rem)] font-extrabold leading-[0.95] tracking-[-0.065em] text-forest">
              Sign in to service.
            </h1>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Use your restaurant email. The demo account opens the full Ember &amp; Rice
              workspace.
            </p>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <label className="block">
                <span className="text-[11px] font-semibold text-forest">Email address</span>
                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@emberandrice.ng"
                    autoComplete="email"
                    className="h-12 w-full rounded-[14px] border border-transparent bg-[#f2f2f2] pl-11 pr-4 text-[13px] text-forest placeholder:text-muted/45 focus:border-forest/30 focus:bg-white focus:outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="flex items-center justify-between gap-3 text-[11px] font-semibold text-forest">
                  Password
                  <span className="font-normal text-muted/60">6+ characters</span>
                </span>
                <div className="relative mt-2">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/60" />
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-[14px] border border-transparent bg-[#f2f2f2] pl-11 pr-12 text-[13px] text-forest placeholder:text-muted/45 focus:border-forest/30 focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((current) => !current)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted/60 transition-colors hover:bg-white hover:text-forest"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-[11px] text-muted">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded-[4px] border-line accent-forest"
                  />
                  Keep me signed in
                </label>
                <span className="text-[9px] font-semibold uppercase tracking-[0.07em] text-muted/50">
                  Demo build
                </span>
              </div>

              {error ? (
                <p role="alert" className="rounded-[12px] bg-tomato/10 px-3 py-2 text-[11px] text-tomato-deep">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-forest text-[13px] font-semibold text-cream transition-colors hover:bg-pine disabled:opacity-60"
              >
                {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                {busy ? "Opening service" : "Sign in"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-line" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.09em] text-muted/50">or</span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <button
              type="button"
              onClick={demo}
              disabled={busy}
              className="flex min-h-[64px] w-full items-center justify-between gap-3 rounded-[20px] bg-pink px-4 py-3 text-left transition-colors hover:bg-[#ffa1ba] disabled:opacity-60"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest p-2 text-cream">
                  <QrMark className="h-full w-full" title="Demo workspace" />
                </span>
                <span>
                  <span className="block text-[12px] font-semibold text-forest">
                    Enter the demo workspace
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-forest/55">
                    Seeded service, no credentials needed
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-forest/45" />
            </button>

            <p className="mt-5 text-center text-[10.5px] leading-relaxed text-muted/70">
              This is a frontend demo. The session and service data stay in this browser.
              <br />
              Need access for a real restaurant?{" "}
              <Link href="/pricing" className="font-semibold text-forest underline underline-offset-2">
                Talk to the team
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 sm:px-8">
          <span className="text-[9px] font-semibold uppercase tracking-[0.07em] text-muted/50">
            QR / 2026
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.07em] text-muted/50">
            Ember &amp; Rice, Lekki
          </span>
        </div>
      </main>
    </div>
  );
}
