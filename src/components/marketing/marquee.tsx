const phrases = [
  "Scan the table",
  "Order without an app",
  "Send it to the pass",
  "Add to the same bill",
  "Split it",
  "Settle the table",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-butter/40 bg-butter py-3">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {phrases.map((phrase) => (
              <span
                key={`${copy}-${phrase}`}
                className="flex shrink-0 items-center gap-5 px-5 font-mono text-[9px] uppercase tracking-[0.14em] text-forest/80"
              >
                {phrase}
                <span className="h-1.5 w-1.5 rotate-45 bg-tomato" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
