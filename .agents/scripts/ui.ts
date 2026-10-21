// ui.ts: Portable, dependency-free terminal UI formatting engine for Snapshot Portfolio (.agents/).
// Inspired by Laravel Artisan and Termwind. Houses ANSI escape sequences,
// Unicode box-drawing constants, pill badge formatters, tree views, and card renderers.

export const c = {
  reset: "\x1b[0m",
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  italic: (s: string) => `\x1b[3m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
  white: (s: string) => `\x1b[37m${s}\x1b[0m`,

  // Inverted pill backgrounds
  bgGreen: (s: string) => `\x1b[42m\x1b[30m\x1b[1m ${s} \x1b[0m`,
  bgYellow: (s: string) => `\x1b[43m\x1b[30m\x1b[1m ${s} \x1b[0m`,
  bgRed: (s: string) => `\x1b[41m\x1b[37m\x1b[1m ${s} \x1b[0m`,
  bgBlue: (s: string) => `\x1b[44m\x1b[37m\x1b[1m ${s} \x1b[0m`,
  bgMagenta: (s: string) => `\x1b[45m\x1b[37m\x1b[1m ${s} \x1b[0m`,
  bgCyan: (s: string) => `\x1b[46m\x1b[30m\x1b[1m ${s} \x1b[0m`,
  bgGray: (s: string) => `\x1b[100m\x1b[37m\x1b[1m ${s} \x1b[0m`,
  bgWhite: (s: string) => `\x1b[47m\x1b[30m\x1b[1m ${s} \x1b[0m`,
};

export const TREE = {
  BRANCH: "├── ",
  LEAF: "└── ",
  VERT: "│   ",
  EMPTY: "    ",
  H: "─",
} as const;

export type BadgeColor = keyof typeof c;

export interface TreeItem {
  category: string;
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  message: string;
}

export interface SummaryOptions {
  passCount: number;
  warnCount: number;
  failCount: number;
  subject: string;
  passAdvice: string;
  warnAdvice: string;
  failAdvice: string;
}

export function badge(text: string, color: BadgeColor = "bgRed"): string {
  const formatter = c[color] as (s: string) => string;
  return formatter ? formatter(text.toUpperCase()) : text;
}

export function statusBadge(status: string): string {
  switch (status.toLowerCase()) {
    case "in_progress":
    case "active":
      return c.bgYellow(" IN PROGRESS ");
    case "testing":
      return c.bgCyan(" TESTING ");
    case "review":
      return c.bgMagenta(" REVIEW ");
    case "live":
    case "shipped":
    case "done":
    case "pass":
      return c.bgGreen(" LIVE ");
    case "blocked":
    case "fail":
      return c.bgRed(" BLOCKED ");
    case "planning":
    default:
      return c.bgGray(" PLANNING ");
  }
}

export function priorityBadge(priority: "P0" | "P1" | "P2"): string {
  switch (priority) {
    case "P0":
      return c.bgRed(" P0 ");
    case "P1":
      return c.bgYellow(" P1 ");
    case "P2":
    default:
      return c.bgGray(" P2 ");
  }
}

export function domainBadge(domain: string): string {
  return c.cyan(`[${domain}]`);
}

export function renderBanner(title: string, subtitle?: string): void {
  console.log();
  console.log(`  ${c.bgRed(" SNAPSHOT ")}  ${c.bold(title)}`);
  if (subtitle) {
    console.log(`  ${c.dim(subtitle)}`);
  }
  console.log();
}

export function renderTree(heading: string, items: TreeItem[]): void {
  console.log(`  ${c.bold(heading)}`);
  const grouped = new Map<string, TreeItem[]>();
  for (const item of items) {
    const list = grouped.get(item.category) ?? [];
    list.push(item);
    grouped.set(item.category, list);
  }

  const categories = Array.from(grouped.keys());
  categories.forEach((cat, catIdx) => {
    const isLastCat = catIdx === categories.length - 1;
    const catPrefix = isLastCat ? TREE.LEAF : TREE.BRANCH;
    const childIndent = isLastCat ? TREE.EMPTY : TREE.VERT;
    console.log(`  ${catPrefix}${c.bold(c.white(cat))}`);

    const catItems = grouped.get(cat) ?? [];
    catItems.forEach((item, itemIdx) => {
      const isLastItem = itemIdx === catItems.length - 1;
      const itemPrefix = isLastItem ? TREE.LEAF : TREE.BRANCH;
      const statusPill =
        item.status === "PASS"
          ? c.green("[PASS]")
          : item.status === "WARN"
            ? c.yellow("[WARN]")
            : c.red("[FAIL]");
      console.log(
        `  ${childIndent}${itemPrefix}${statusPill} ${c.bold(item.name)} ${c.dim("—")} ${c.gray(item.message)}`
      );
    });
  });
}

export function renderSummary(opts: SummaryOptions): void {
  console.log();
  hr();
  console.log(
    `  ${c.green(`${opts.passCount} passed`)}  |  ${c.yellow(`${opts.warnCount} warnings`)}  |  ${c.red(`${opts.failCount} failed`)}  ${c.dim(`(${opts.subject})`)}`
  );
  if (opts.failCount > 0) {
    console.log(`  ${c.red("✖")} ${opts.failAdvice}`);
  } else if (opts.warnCount > 0) {
    console.log(`  ${c.yellow("!")} ${opts.warnAdvice}`);
  } else {
    console.log(`  ${c.green("✔")} ${opts.passAdvice}`);
  }
  console.log();
}

export function hr(length = 68): void {
  console.log(c.dim("─".repeat(length)));
}
