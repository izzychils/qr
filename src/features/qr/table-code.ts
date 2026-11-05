export const TABLE_COUNT = 18;

export const tablePath = (table: number) => `/order/table-${table}`;

export function tableUrl(table: number, origin: string) {
  return `${origin.replace(/\/+$/, "")}${tablePath(table)}`;
}

/**
 * Accepts the formats a real printed card can produce: a full URL, a path,
 * a "Table 12" label, or a bare table number from an older card.
 */
export function parseTableCode(raw: string, tableCount = TABLE_COUNT): number | null {
  const value = raw.trim();
  if (!value || value.length > 500) return null;

  const inUrl = value.match(/order\/table[-/]?(\d+)/i);
  const labelled = value.match(/table[\s\-_#]*(\d+)/i);
  const bare = /^\d{1,3}$/.test(value) ? Number(value) : Number.NaN;
  const table = Number(inUrl?.[1] ?? labelled?.[1] ?? bare);

  if (!Number.isInteger(table) || table < 1 || table > tableCount) return null;
  return table;
}

export function safeFileName(value: string) {
  return value.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}
