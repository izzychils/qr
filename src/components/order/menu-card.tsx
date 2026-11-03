import Image from "next/image";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/features/menu/data";
import { MenuArt } from "@/components/order/menu-art";
import { cn, naira } from "@/lib/utils";

export function MenuCard({
  item,
  index,
  soldOut,
  onOpen,
}: {
  item: MenuItem;
  index: number;
  soldOut: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-cream",
        soldOut && "opacity-70",
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.name}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-sand-deep text-left"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 90vw"
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-[1.035]",
              soldOut && "grayscale",
            )}
          />
        ) : item.art ? (
          <MenuArt art={item.art} />
        ) : null}
        <span className="absolute left-3 top-3 rounded-[10px] border border-cream/25 bg-forest/80 px-1.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-cream backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        {item.popular && !soldOut ? (
          <span className="absolute right-3 top-3 rounded-full bg-butter px-2 py-1 font-mono text-[8px] uppercase tracking-[0.09em] text-ink">
            Most ordered
          </span>
        ) : null}
        {soldOut ? (
          <span className="absolute inset-x-3 bottom-3 rounded-[12px] bg-forest px-2.5 py-2 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-cream">
            Sold out tonight
          </span>
        ) : null}
      </button>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={onOpen}
            className="text-left font-serif text-[18px] font-semibold leading-[1.1] tracking-[-0.035em] text-forest transition-colors hover:text-tomato"
          >
            {item.name}
          </button>
          <span className="price mt-0.5 shrink-0 text-[12px] text-forest">{naira(item.price)}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-muted">{item.blurb}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3.5">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpen}
            disabled={soldOut}
            aria-label={soldOut ? `${item.name} is sold out` : `Add ${item.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream disabled:cursor-not-allowed disabled:border-line disabled:text-muted/40 disabled:hover:bg-transparent"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </article>
  );
}
