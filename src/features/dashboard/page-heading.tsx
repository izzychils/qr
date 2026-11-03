export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow text-muted">{eyebrow}</p>
        <h1 className="mt-3 max-w-[760px] font-serif text-[clamp(2.15rem,4vw,3.35rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-forest">
          {title}
        </h1>
        <p className="mt-2 max-w-[580px] text-[13px] leading-relaxed text-muted">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
