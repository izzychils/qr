"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { MenuArt } from "@/components/order/menu-art";
import { tagLabels, type MenuItem } from "@/features/menu/data";
import { cn, naira } from "@/lib/utils";

export function ItemSheet({
  item,
  soldOut,
  onClose,
  onAdd,
}: {
  item: MenuItem | null;
  soldOut: boolean;
  onClose: () => void;
  onAdd: (item: MenuItem, options: string[], note: string, qty: number, unitPrice: number) => void;
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!item) return;
    const defaults: Record<string, string[]> = {};
    item.options?.forEach((option) => {
      if (option.required) defaults[option.id] = [option.choices[0].label];
    });
    setSelected(defaults);
    setQty(1);
    setNote("");
  }, [item]);

  const unitPrice = useMemo(() => {
    if (!item) return 0;
    let total = item.price;
    item.options?.forEach((option) => {
      selected[option.id]?.forEach((label) => {
        const choice = option.choices.find((entry) => entry.label === label);
        if (choice) total += choice.price;
      });
    });
    return total;
  }, [item, selected]);

  const optionLabels = useMemo(() => {
    if (!item) return [];
    return (item.options ?? []).flatMap((option) =>
      (selected[option.id] ?? []).map((label) =>
        option.id === "portion" || option.id === "heat" || option.id === "cook" || option.id === "sides"
          ? `${option.label}: ${label}`
          : label,
      ),
    );
  }, [item, selected]);

  if (!item) return null;

  const toggleChoice = (optionId: string, label: string, required: boolean) => {
    setSelected((current) => {
      const active = current[optionId] ?? [];
      if (required) return { ...current, [optionId]: [label] };
      return {
        ...current,
        [optionId]: active.includes(label)
          ? active.filter((entry) => entry !== label)
          : [...active, label],
      };
    });
  };

  return (
    <Modal open={Boolean(item)} onClose={onClose} label="Add to the table" size="md">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand-deep">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill sizes="(min-width: 640px) 560px, 100vw" className="object-cover" />
        ) : item.art ? (
          <MenuArt art={item.art} />
        ) : null}
        {item.popular ? (
          <span className="absolute left-4 top-4 rounded-full bg-butter px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-ink">
            Most ordered
          </span>
        ) : null}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-[28px] font-semibold leading-none tracking-[-0.04em] text-forest">
              {item.name}
            </h2>
            <p className="price mt-2 text-[13px] text-muted">{naira(item.price)}</p>
          </div>
          <span className="rounded-full border border-line px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
            {item.prep} min
          </span>
        </div>

        <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{item.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.07em]",
                tag === "spicy"
                  ? "border-tomato/25 bg-tomato/10 text-tomato-deep"
                  : "border-line text-muted",
              )}
            >
              {tagLabels[tag]}
            </span>
          ))}
        </div>

        {item.options?.map((option) => (
          <fieldset key={option.id} className="mt-6">
            <legend className="flex w-full items-center justify-between gap-3 text-[12px] font-semibold text-forest">
              <span>{option.label}</span>
              <span className="font-mono text-[8px] font-normal uppercase tracking-[0.1em] text-muted">
                {option.required ? "Choose one" : "Optional"}
              </span>
            </legend>
            <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
              {option.choices.map((choice) => {
                const active = (selected[option.id] ?? []).includes(choice.label);
                return (
                  <button
                    key={choice.label}
                    type="button"
                    onClick={() => toggleChoice(option.id, choice.label, Boolean(option.required))}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-[14px] border px-3 py-2.5 text-left text-[12px] transition-colors",
                      active
                        ? "border-forest bg-forest text-cream"
                        : "border-line bg-white text-forest hover:border-forest/35",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-3.5 w-3.5 items-center justify-center rounded-full border",
                          active ? "border-cream/60 bg-cream text-forest" : "border-line",
                        )}
                      >
                        {active ? <Check className="h-2 w-2" strokeWidth={4} /> : null}
                      </span>
                      {choice.label}
                    </span>
                    {choice.price > 0 ? (
                      <span className={cn("font-mono text-[11px]", active ? "text-cream/70" : "text-muted")}>
                        +{naira(choice.price)}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <label className="mt-6 block">
          <span className="text-[12px] font-semibold text-forest">Note for the kitchen</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={2}
            placeholder="No onions, extra sauce, allergy note"
            className="mt-2 w-full resize-y rounded-[14px] border border-line bg-white px-3 py-2.5 text-[13px] leading-relaxed text-forest placeholder:text-muted/60 focus:border-forest focus:outline-none"
          />
        </label>

        <div className="mt-5 flex items-center gap-3 border-t border-line pt-5">
          <div className="flex h-11 items-center rounded-[14px] border border-line bg-white">
            <button
              type="button"
              onClick={() => setQty((current) => Math.max(1, current - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="flex h-full w-9 items-center justify-center text-forest disabled:opacity-30"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center font-mono text-[13px]">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((current) => Math.min(10, current + 1))}
              aria-label="Increase quantity"
              className="flex h-full w-9 items-center justify-center text-forest"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => onAdd(item, optionLabels, note, qty, unitPrice)}
            className="flex h-11 flex-1 items-center justify-between gap-3 rounded-[14px] bg-tomato px-4 text-[13px] font-semibold text-cream transition-colors hover:bg-tomato-deep disabled:cursor-not-allowed disabled:bg-muted/40"
          >
            <span>{soldOut ? "Sold out tonight" : "Add to the table"}</span>
            <span className="price text-[13px]">{naira(unitPrice * qty)}</span>
          </button>
        </div>
        <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.08em] text-muted/70">
          Allergen notes come from the kitchen record. Tell a waiter about severe allergies.
        </p>
      </div>
    </Modal>
  );
}
