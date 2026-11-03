import { coversByHour, demandForecast, revenueByCategory, weekRevenue } from "@/features/dashboard/data";
import { naira } from "@/lib/utils";

export function CoversChart() {
  const max = Math.max(...coversByHour.map((item) => item.covers));

  return (
    <div>
      <div className="mt-5 flex h-[168px] items-end gap-1.5 sm:gap-2">
        {coversByHour.map((item) => {
          const peak = ["19", "20", "21"].includes(item.hour);
          return (
            <div key={item.hour} className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="font-mono text-[7.5px] text-muted/70">{item.covers}</span>
              <div
                className={`w-full rounded-t-[3px] transition-colors ${peak ? "bg-tomato" : "bg-sand-deep group-hover:bg-moss/40"}`}
                style={{ height: `${Math.max(4, (item.covers / max) * 100)}%` }}
              />
              <span className="font-mono text-[7.5px] text-muted/55">{item.hour}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="font-mono text-[8px] uppercase tracking-[0.07em] text-muted/60">
          Covers by hour
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.07em] text-muted/60">
          <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
          Peak service
        </span>
      </div>
    </div>
  );
}

export function RevenueChart() {
  const width = 640;
  const height = 230;
  const padX = 40;
  const padTop = 24;
  const padBottom = 32;
  const values = weekRevenue.map((item) => item.value);
  const min = 800_000;
  const max = 2_600_000;
  const points = weekRevenue.map((item, index) => {
    const x = padX + (index * (width - padX * 2)) / (weekRevenue.length - 1);
    const y = padTop + (1 - (item.value - min) / (max - min)) * (height - padTop - padBottom);
    return { ...item, x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `M ${points[0].x} ${height - padBottom} L ${line.replaceAll(",", " ")} L ${points[points.length - 1].x} ${height - padBottom} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 w-full" role="img" aria-label="Revenue for the last seven days">
      <defs>
        <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9522c" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#d9522c" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[1_000_000, 1_500_000, 2_000_000, 2_500_000].map((value) => {
        const y = padTop + (1 - (value - min) / (max - min)) * (height - padTop - padBottom);
        return (
          <g key={value}>
            <line x1={padX} x2={width - padX} y1={y} y2={y} stroke="#ddd1bd" strokeDasharray="2 5" />
            <text x={padX - 8} y={y + 3} textAnchor="end" fontSize="8" fill="#8b9287" fontFamily="var(--font-dm-mono)">
              ₦{(value / 1_000_000).toFixed(1)}m
            </text>
          </g>
        );
      })}
      <path d={area} fill="url(#revenue-fill)" />
      <polyline points={line} fill="none" stroke="#d9522c" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((point) => (
        <g key={point.day}>
          <circle cx={point.x} cy={point.y} r={point.day === "Sat" ? 4.5 : 3} fill="#fffaf0" stroke="#d9522c" strokeWidth="1.5" />
          <text x={point.x} y={height - 10} textAnchor="middle" fontSize="8" fill="#8b9287" fontFamily="var(--font-dm-mono)">
            {point.day}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ForecastChart() {
  const max = Math.max(...demandForecast.map((item) => Math.max(item.forecast, item.lastWeek)));

  return (
    <div>
      <div className="mt-5 flex h-[150px] items-end gap-3">
        {demandForecast.map((item) => (
          <div key={item.label} className="flex h-full flex-1 items-end justify-center gap-1">
            <div
              className="w-1/2 rounded-t-[3px] bg-sand-deep"
              style={{ height: `${(item.lastWeek / max) * 100}%` }}
              title={`Last week ${item.lastWeek}`}
            />
            <div
              className="w-1/2 rounded-t-[3px] bg-tomato"
              style={{ height: `${(item.forecast / max) * 100}%` }}
              title={`Forecast ${item.forecast}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[7.5px] text-muted/60">
        {demandForecast.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4 border-t border-line pt-3 font-mono text-[8px] uppercase tracking-[0.06em] text-muted/60">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sand-deep" />
          Last week
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
          Forecast
        </span>
      </div>
    </div>
  );
}

export function CategoryBars({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-4 space-y-3">
      {revenueByCategory.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between gap-3 text-[11.5px]">
            <span className="text-forest">{item.label}</span>
            <span className="price text-muted">{compact ? `${item.value}%` : naira(item.amount)}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand-deep">
            <div className="h-full rounded-full bg-tomato" style={{ width: `${item.value * 2.4}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
