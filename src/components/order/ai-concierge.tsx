"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Sparkles, X } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { MenuArt } from "@/components/order/menu-art";
import { menu, type MenuItem } from "@/features/menu/data";
import { cn, naira } from "@/lib/utils";

type Message = {
  role: "assistant" | "guest";
  text: string;
  picks?: MenuItem[];
};

const starters = [
  "Something spicy",
  "Feed four people",
  "Under ₦10,000",
  "No dairy",
  "A drink to start",
];

function buildReply(prompt: string): { text: string; picks: MenuItem[] } {
  const value = prompt.toLowerCase();
  const available = menu.filter((item) => item.category !== "Drinks" && item.category !== "Sweets");

  if (/spicy|hot|pepper|suya/.test(value)) {
    const picks = available.filter((item) => item.tags.includes("spicy")).slice(0, 3);
    return {
      text: "Three plates carry real heat tonight: the street tacos, the jollof platter and the tandoori pizza. The tacos are the quickest at about 12 minutes, so they are a good first order while the kitchen starts the mains.",
      picks,
    };
  }

  if (/no dairy|dairy free|dairy-free|lactose/.test(value)) {
    const picks = available.filter((item) => !item.tags.includes("contains dairy")).slice(0, 3);
    return {
      text: "These are the mains with no dairy in the recipe on tonight's menu. The kitchen is small, so it cannot promise zero cross contact. If the allergy is serious, tell your waiter before the order goes in.",
      picks,
    };
  }

  if (/gluten|coeliac|celiac/.test(value)) {
    const picks = available.filter((item) => item.tags.includes("gluten-free")).slice(0, 3);
    return {
      text: "Four dishes are tagged gluten free tonight. The jollof and beef stew are the safest place to start. The fryer also handles breaded chicken, so a severe gluten allergy needs a word with the kitchen first.",
      picks,
    };
  }

  if (/vegetarian|vegan|plant/.test(value)) {
    const picks = [menu.find((item) => item.id === "creamy-pasta")!, menu.find((item) => item.id === "zobo")!, menu.find((item) => item.id === "honey-cheesecake")!];
    return {
      text: "There is no main tagged vegetarian on tonight's menu. The kitchen can leave the chicken out of the creamy pasta and add charred peppers, but a waiter has to confirm that swap before it is sent. The zobo and the cheesecake are vegetarian as written.",
      picks,
    };
  }

  if (/under|budget|cheap|₦|naira|10000|10,000/.test(value)) {
    const picks = available.filter((item) => item.price <= 10000).slice(0, 4);
    return {
      text: "Four plates stay under ₦10,000 before service and VAT. The shawarma and the house burger are the two most ordered in that range. Add a zobo and the table is still under ₦14,000.",
      picks,
    };
  }

  if (/four|4 people|group|share|table/.test(value)) {
    const picks = ["tandoori-pizza", "jollof-platter", "street-tacos"].map(
      (id) => menu.find((item) => item.id === id)!,
    );
    return {
      text: "For four, order the pizza and the jollof as the centre, then one small plate to start. That is enough food for four without a pile of leftovers. Add two zobos and the table is covered.",
      picks,
    };
  }

  if (/drink|cocktail|wine|juice|beer/.test(value)) {
    const picks = menu.filter((item) => item.category === "Drinks").slice(0, 3);
    return {
      text: "The bar is pouring four house drinks tonight. The zobo is the driest, the Chapman is the sweetest, and the espresso tonic is the one to order if you plan to stay a while.",
      picks,
    };
  }

  if (/sweet|dessert|pudding|cake|chocolate/.test(value)) {
    const picks = menu.filter((item) => item.category === "Sweets");
    return {
      text: "Two desserts are on tonight: a burnt honey cheesecake and a dark chocolate tart. The tart is the smaller finish, the cheesecake is made for two forks.",
      picks,
    };
  }

  const picks = menu.filter((item) => item.popular).slice(0, 3);
  return {
    text: "Tell me a budget, a heat level, a group size or anything you are avoiding, and I will narrow tonight's menu. Tonight the room is ordering the jollof, the double smash and the tandoori pizza.",
    picks,
  };
}

export function AiConcierge({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Good evening. I can read tonight's menu with you. Tell me what you feel like, a budget, or anything you are avoiding. I only recommend dishes that are on the menu right now.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [added, setAdded] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const send = (value: string) => {
    const prompt = value.trim();
    if (!prompt || thinking) return;
    setDraft("");
    setMessages((current) => [...current, { role: "guest", text: prompt }]);
    setThinking(true);
    timer.current = setTimeout(() => {
      const reply = buildReply(prompt);
      setMessages((current) => [
        ...current,
        { role: "assistant", text: reply.text, picks: reply.picks },
      ]);
      setThinking(false);
    }, 520);
  };

  return (
    <Modal open={open} onClose={onClose} label="Ask the menu" size="lg" tone="forest">
      <div className="flex items-center gap-3 border-b border-line-dark px-5 py-4 sm:px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tomato text-cream">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="font-serif text-[19px] font-semibold leading-none">The menu assistant</p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-cream/40">
            Grounded in tonight&apos;s menu
          </p>
        </div>
      </div>

      <div className="no-scrollbar max-h-[54dvh] space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={cn("flex", message.role === "guest" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[92%] rounded-[24px] border px-4 py-3 text-[13.5px] leading-relaxed sm:max-w-[82%]",
                message.role === "guest"
                  ? "border-tomato/30 bg-tomato/15 text-cream"
                  : "border-line-dark bg-cream/[0.055] text-cream/85",
              )}
            >
              {message.text}
              {message.picks?.length ? (
                <div className="mt-3 grid gap-2">
                  {message.picks.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 rounded-[14px] border border-line-dark bg-forest/70 p-2"
                    >
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px] bg-pine">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill sizes="44px" className="object-cover" />
                        ) : item.art ? (
                          <MenuArt art={item.art} />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-serif text-[15px] font-semibold leading-tight">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block font-mono text-[9px] text-cream/45">{naira(item.price)}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onAdd(item);
                          setAdded((current) => [...current, item.id]);
                        }}
                        className={cn(
                          "flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 font-mono text-[8px] uppercase tracking-[0.06em] transition-colors",
                          added.includes(item.id)
                            ? "bg-cream/15 text-cream/70"
                            : "bg-tomato text-cream hover:bg-tomato-deep",
                        )}
                      >
                        {added.includes(item.id) ? (
                          <>
                            <Check className="h-2.5 w-2.5" /> Added
                          </>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {thinking ? (
          <div className="flex items-center gap-1.5 rounded-[20px] border border-line-dark bg-cream/[0.04] px-3 py-2.5 w-fit">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-cream/45"
                style={{ animationDelay: `${index * 120}ms` }}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="border-t border-line-dark px-5 py-4 sm:px-6">
        <div className="no-scrollbar mb-3 flex gap-1.5 overflow-x-auto">
          {starters.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => send(starter)}
              className="shrink-0 rounded-full border border-line-dark px-2.5 py-1.5 text-[11px] text-cream/60 transition-colors hover:border-cream/40 hover:text-cream"
            >
              {starter}
            </button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(draft);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="What do you feel like tonight?"
            aria-label="Ask the menu assistant"
            className="h-11 flex-1 rounded-[14px] border border-line-dark bg-cream/[0.06] px-3.5 text-[13px] text-cream placeholder:text-cream/30 focus:border-butter focus:outline-none"
          />
          <button
            type="submit"
            disabled={!draft.trim() || thinking}
            aria-label="Send question"
            className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-butter text-forest transition-colors hover:bg-cream disabled:opacity-40"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-3 flex items-start gap-1.5 font-mono text-[8px] uppercase leading-relaxed tracking-[0.05em] text-cream/30">
          <X className="mt-0.5 h-2.5 w-2.5 shrink-0" />
          Never invents a dish or an allergen. Confirm severe allergies with a waiter.
        </p>
      </div>
    </Modal>
  );
}
