import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "tomato" | "forest" | "cream" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  tomato: "bg-pink text-forest hover:bg-[#ffa1ba]",
  forest: "bg-forest text-cream hover:bg-pine",
  cream: "border border-line bg-cream text-forest hover:border-forest/30 hover:bg-sand",
  outline: "border border-forest/20 bg-transparent text-forest hover:border-forest/50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-2 px-4 text-[12px]",
  md: "h-11 gap-2.5 px-5 text-[13px]",
  lg: "h-12 gap-3 px-6 text-[14px]",
};

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function ActionButton({
  children,
  href,
  variant = "tomato",
  size = "md",
  className,
  arrow = true,
  onClick,
  type = "button",
  disabled,
}: Props) {
  const classes = cn(
    "group inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.01em] transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
