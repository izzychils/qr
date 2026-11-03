import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  href = "/",
  className,
}: {
  tone?: "light" | "dark";
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="QR home"
      className={cn(
        "group inline-flex items-baseline gap-1 leading-none transition-opacity hover:opacity-70",
        className,
      )}
    >
      <span
        className={cn(
          "font-serif text-[27px] font-extrabold leading-none tracking-[-0.08em]",
          tone === "dark" ? "text-cream" : "text-forest",
        )}
      >
        QR
      </span>
      <span className="mb-[3px] h-[6px] w-[6px] rounded-full bg-tomato transition-transform duration-300 group-hover:scale-125" />
    </Link>
  );
}
