import { cn } from "@/lib/utils";

const SIZE = 29;

function random(seed: number) {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGrid() {
  const grid = Array.from({ length: SIZE }, () => Array<boolean>(SIZE).fill(false));
  const next = random(20261103);

  const finder = (x: number, y: number) => {
    for (let row = 0; row < 7; row += 1) {
      for (let col = 0; col < 7; col += 1) {
        const edge = row === 0 || row === 6 || col === 0 || col === 6;
        const core = row >= 2 && row <= 4 && col >= 2 && col <= 4;
        grid[y + row][x + col] = edge || core;
      }
    }
    for (let row = -1; row < 8; row += 1) {
      for (let col = -1; col < 8; col += 1) {
        if (row < 0 || row > 6 || col < 0 || col > 6) {
          const gy = y + row;
          const gx = x + col;
          if (gy >= 0 && gy < SIZE && gx >= 0 && gx < SIZE) grid[gy][gx] = false;
        }
      }
    }
  };

  finder(1, 1);
  finder(SIZE - 8, 1);
  finder(1, SIZE - 8);

  for (let index = 8; index < SIZE - 8; index += 1) {
    grid[6][index] = index % 2 === 0;
    grid[index][6] = index % 2 === 0;
  }

  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const inFinder =
        (row < 8 && col < 8) ||
        (row < 8 && col > SIZE - 9) ||
        (row > SIZE - 9 && col < 8);
      if (inFinder || row === 6 || col === 6) continue;
      grid[row][col] = next() > 0.5;
    }
  }

  return grid;
}

const GRID = buildGrid();

export function QrMark({
  className,
  title = "Table QR code",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={cn("block", className)}
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
    >
      {GRID.map((row, rowIndex) =>
        row.map((filled, colIndex) =>
          filled ? (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex}
              y={rowIndex}
              width={1}
              height={1}
              fill="currentColor"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
