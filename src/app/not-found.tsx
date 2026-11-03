import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { QrMark } from "@/components/ui/qr-mark";

export default function NotFound() {
  return (
    <div className="hide-scroll flex min-h-screen flex-col bg-sand">
      <div className="shell flex flex-1 flex-col">
        <div className="py-5">
          <Logo />
        </div>
        <div className="my-3 flex flex-1 flex-col justify-center rounded-[36px] bg-white px-6 py-14 sm:px-12">
          <span className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-pink p-3 text-forest">
            <QrMark className="h-full w-full" title="Empty table code" />
          </span>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.1em] text-tomato">
            404 / Table not set
          </p>
          <h1 className="mt-4 max-w-[620px] text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.94] tracking-[-0.065em] text-forest">
            This table is not set.
          </h1>
          <p className="mt-4 max-w-[430px] text-[13px] leading-[1.7] text-muted">
            The link may be old, or the table may have moved. The demo menu is still open at
            table 12.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/"
              className="flex h-11 items-center gap-2 rounded-full bg-forest px-5 text-[12px] font-semibold text-cream"
            >
              Back to the site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/order/table-12"
              className="flex h-11 items-center gap-2 rounded-full bg-pink px-5 text-[12px] font-semibold text-forest"
            >
              Open table 12
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
